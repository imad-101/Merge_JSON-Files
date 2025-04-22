"use client";
import type React from "react";
import { useState, useCallback } from "react";

import {
  Upload,
  Trash2,
  Copy,
  Loader,
  FileJson,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Dropzone from "react-dropzone";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MergeOptions = {
  arrayStrategy: "concat" | "overwrite" | "merge" | "mergeByKey";
  conflictResolution: "merge" | "overwrite";
  numericHandling: "sum" | "keep";
  stringHandling: "keep" | "concatenate";
  mergeKey: string;
  depth: number;
  allowMixedRoots: boolean;
};

const JsonMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedContent, setMergedContent] = useState<string>("");
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<MergeOptions>({
    arrayStrategy: "concat",
    conflictResolution: "merge",
    numericHandling: "keep",
    stringHandling: "keep",
    mergeKey: "id",
    depth: -1,
    allowMixedRoots: false,
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();
  const MAX_SAFE_SIZE = 1e6; // 1 million characters

  const handleFileUpload = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      toast({
        title: "Files Added",
        description: `Successfully added ${acceptedFiles.length} file(s).`,
        variant: "default",
      });
    },
    [toast]
  );

  const removeFile = (index: number) => {
    const fileName = files[index].name;
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    toast({
      title: "File Removed",
      description: `Removed ${fileName} from the list.`,
    });
  };

  const resetFiles = () => {
    setFiles([]);
    setMergedContent("");
    setProgress(0);
    toast({
      title: "Reset Complete",
      description: "All fields have been reset to default values.",
    });
  };

  const readFileInChunks = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const chunkSize = 4 * 1024 * 1024; // 4MB chunks
      const fileSize = file.size;
      let offset = 0;
      let result = "";

      const reader = new FileReader();
      reader.onerror = () =>
        reject(new Error(`Error reading file: ${file.name}`));

      const readNextChunk = () => {
        const slice = file.slice(offset, offset + chunkSize);
        reader.readAsText(slice);
      };

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          result += e.target.result as string;
          offset += chunkSize;

          if (offset >= fileSize) {
            try {
              JSON.parse(result); // Validate JSON
              resolve(result);
            } catch (err) {
              reject(
                new Error(
                  `Invalid JSON in ${file.name}: ${(err as Error).message}`
                )
              );
            }
          } else {
            setTimeout(readNextChunk, 0);
          }
        }
      };

      readNextChunk();
    });
  };

  const mergeFiles = async () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No Files Selected",
        description: "Please upload at least one JSON file to merge.",
      });
      return;
    }

    setIsMerging(true);
    setProgress(0);

    try {
      const workerCode = `
        const mergeStrategies = {
          array: {
            concat: (a, b) => a.concat(b),
            overwrite: (a, b) => b,
            merge: (a, b) => [...new Set([...a, ...b])],
            mergeByKey: (a, b, key) => {
              const map = new Map();
              [...a, ...b].forEach(item => {
                if (typeof item === 'object' && item !== null && key in item) {
                  map.set(item[key], { ...map.get(item[key]) || {}, ...item });
                } else {
                  map.set(Symbol(), item);
                }
              });
              return Array.from(map.values());
            }
          },
          numeric: {
            sum: (a, b) => Number(a) + Number(b),
            keep: (a, b) => b
          },
          string: {
            concatenate: (a, b) => String(a) + String(b),
            keep: (a, b) => b
          }
        };

        function handleRootValue(target, source, options) {
          if (Array.isArray(source)) {
            if (!Array.isArray(target)) target = [];
            return options.arrayStrategy === 'mergeByKey' 
              ? mergeStrategies.array.mergeByKey(target, source, options.mergeKey)
              : mergeStrategies.array[options.arrayStrategy](target, source);
          }
          if (typeof source === 'object' && source !== null) {
            return deepMerge(target, source, options);
          }
          return source;
        }

        function deepMerge(target, source, options, currentDepth = 0) {
          if (options.depth !== -1 && currentDepth > options.depth) return target;
          if (Array.isArray(source)) {
            if (!Array.isArray(target)) target = [];
            return options.arrayStrategy === 'mergeByKey' 
              ? mergeStrategies.array.mergeByKey(target, source, options.mergeKey)
              : mergeStrategies.array[options.arrayStrategy](target, source);
          }

          for (const key in source) {
            const sourceVal = source[key];
            const targetVal = target[key];

            if (typeof sourceVal === 'object' && sourceVal !== null) {
              if (Array.isArray(sourceVal)) {
                target[key] = options.arrayStrategy === 'mergeByKey'
                  ? mergeStrategies.array.mergeByKey(targetVal || [], sourceVal, options.mergeKey)
                  : mergeStrategies.array[options.arrayStrategy](targetVal || [], sourceVal);
              } else {
                target[key] = deepMerge(
                  targetVal || {},
                  sourceVal,
                  options,
                  currentDepth + 1
                );
              }
            } else {
              if (targetVal !== undefined && options.conflictResolution === 'merge') {
                if (typeof targetVal === 'number' && typeof sourceVal === 'number') {
                  target[key] = mergeStrategies.numeric[options.numericHandling](
                    targetVal,
                    sourceVal
                  );
                } else if (typeof targetVal === 'string' && typeof sourceVal === 'string') {
                  target[key] = mergeStrategies.string[options.stringHandling](
                    targetVal,
                    sourceVal
                  );
                } else {
                  target[key] = sourceVal;
                }
              } else {
                target[key] = sourceVal;
              }
            }
          }
          return target;
        }

        let mergedResult = null;
        let filesProcessed = 0;
        let rootTypes = new Set();

        self.onmessage = async (e) => {
          const { action, data, totalFiles, options, fileName } = e.data;

          if (action === 'process') {
            try {
              if (!data) throw new Error('Empty file content');
              const json = JSON.parse(data);

              const currentType = Array.isArray(json) ? 'array' : 
                (typeof json === 'object' && json !== null) ? 'object' : 'primitive';
              rootTypes.add(currentType);

              if (options.allowMixedRoots || rootTypes.size === 1) {
                if (options.allowMixedRoots) {
                  if (mergedResult === null) mergedResult = {};
                  mergedResult["file" + (filesProcessed + 1)] = json;
                } else {
                  if (mergedResult === null) {
                    mergedResult = json;
                  } else {
                    mergedResult = handleRootValue(mergedResult, json, options);
                  }
                }
              } else {
                self.postMessage({ type: 'rootTypeMismatch' });
                return;
              }

              filesProcessed++;
              const progress = Math.round((filesProcessed / totalFiles) * 90);
              self.postMessage({ type: 'progress', progress });
            } catch (err) {
              self.postMessage({ 
                type: 'error',
                message: \`Error processing \${fileName || 'unknown file'}: \${err.message}\`
              });
            }
          }

          if (action === 'finalize') {
            try {
              self.postMessage({ type: 'progress', progress: 95 });
              const result = JSON.stringify(mergedResult, null, 2);
              self.postMessage({ type: 'progress', progress: 100 });
              self.postMessage({ type: 'complete', result });
            } catch (err) {
              if (err.message.includes('string length')) {
                self.postMessage({
                  type: 'error',
                  message: 'The merged JSON is too large to process. Try merging fewer files or reducing the size of the input files.'
                });
              } else {
                self.postMessage({
                  type: 'error',
                  message: 'Error creating final JSON: ' + err.message
                });
              }
            }
          }
        };
      `;

      const worker = new Worker(
        URL.createObjectURL(
          new Blob([workerCode], { type: "application/javascript" })
        )
      );

      worker.onmessage = (e) => {
        switch (e.data.type) {
          case "progress":
            setProgress(e.data.progress);
            break;
          case "complete":
            setMergedContent(e.data.result);
            setIsMerging(false);
            toast({
              title: "Merge Successful",
              description: `Merged ${files.length} files successfully.`,
              variant: "default",
            });
            worker.terminate();
            break;
          case "error":
            toast({
              variant: "destructive",
              title: "Merge Error",
              description: e.data.message,
            });
            setIsMerging(false);
            worker.terminate();
            break;
          case "rootTypeMismatch":
            setShowConfirmDialog(true);
            setIsMerging(false);
            worker.terminate();
            break;
        }
      };

      for (const file of files) {
        try {
          const content = await readFileInChunks(file);
          worker.postMessage({
            action: "process",
            data: content,
            options,
            totalFiles: files.length,
            fileName: file.name,
          });
        } catch (err) {
          toast({
            variant: "destructive",
            title: "File Error",
            description: (err as Error).message,
          });
          setIsMerging(false);
          worker.terminate();
          return;
        }
      }

      worker.postMessage({ action: "finalize" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Merge Failed",
        description: (error as Error).message || "Unknown error occurred",
      });
      setIsMerging(false);
    }
  };

  const confirmMergeAnyway = () => {
    setOptions((prev) => ({ ...prev, allowMixedRoots: true }));
    setShowConfirmDialog(false);
    mergeFiles(); // Retry merge with allowMixedRoots enabled
  };

  const cancelMerge = () => {
    setShowConfirmDialog(false);
    toast({
      variant: "destructive",
      title: "Merge Canceled",
      description: "Merge operation was canceled due to root type mismatch.",
    });
  };

  const downloadMergedFile = () => {
    if (!mergedContent) return;
    const blob = new Blob([mergedContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `merged-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "Merged JSON is being downloaded.",
      variant: "default",
    });
  };

  const copyToClipboard = async () => {
    if (!mergedContent) return;
    if (mergedContent.length > MAX_SAFE_SIZE) {
      toast({
        variant: "destructive",
        title: "Cannot Copy",
        description:
          "Content is too large to be copied. Please download instead.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(mergedContent);
      toast({
        title: "Copied to Clipboard",
        description: "Merged JSON copied successfully.",
        variant: "default",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
      });
    }
  };

  const renderOptions = () => (
    <div className="mt-6 space-y-4 p-6 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex items-center justify-between">
        <Label className="text-slate-800 font-medium">
          Advanced Merge Options
        </Label>
        <Switch
          checked={showOptions}
          onCheckedChange={setShowOptions}
          className="data-[state=checked]:bg-green-600"
        />
      </div>

      {showOptions && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="space-y-2">
            <Label className="text-slate-700">Array Handling</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select
                      value={options.arrayStrategy}
                      onValueChange={(
                        v: "concat" | "overwrite" | "merge" | "mergeByKey"
                      ) =>
                        setOptions((prev) => ({ ...prev, arrayStrategy: v }))
                      }
                    >
                      <SelectTrigger className="bg-white border-slate-200 text-slate-800">
                        <SelectValue placeholder="Array Strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-800">
                        <SelectItem value="concat">Concatenate</SelectItem>
                        <SelectItem value="overwrite">Overwrite</SelectItem>
                        <SelectItem value="merge">Merge Unique</SelectItem>
                        <SelectItem value="mergeByKey">Merge by Key</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Choose how to handle arrays when merging. Concatenate joins
                    arrays, Overwrite replaces them, Merge Unique combines
                    unique values, and Merge by Key combines objects with
                    matching keys.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {options.arrayStrategy === "mergeByKey" && (
            <div className="space-y-2">
              <Label className="text-slate-700">Merge Key</Label>
              <Input
                value={options.mergeKey}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, mergeKey: e.target.value }))
                }
                placeholder="e.g., id"
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-slate-700">Conflict Resolution</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select
                      value={options.conflictResolution}
                      onValueChange={(v: "merge" | "overwrite") =>
                        setOptions((prev) => ({
                          ...prev,
                          conflictResolution: v,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-white border-slate-200 text-slate-800">
                        <SelectValue placeholder="Conflict Strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-800">
                        <SelectItem value="merge">Merge Values</SelectItem>
                        <SelectItem value="overwrite">
                          Overwrite Existing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Choose how to handle conflicts when the same key exists in
                    multiple files. Merge attempts to combine values, while
                    Overwrite replaces with the latest value.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Number Handling</Label>
              <Select
                value={options.numericHandling}
                onValueChange={(v: "sum" | "keep") =>
                  setOptions((prev) => ({ ...prev, numericHandling: v }))
                }
              >
                <SelectTrigger className="bg-white border-slate-200 text-slate-800">
                  <SelectValue placeholder="Number Strategy" />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-800">
                  <SelectItem value="sum">Sum Values</SelectItem>
                  <SelectItem value="keep">Keep Latest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700">String Handling</Label>
              <Select
                value={options.stringHandling}
                onValueChange={(v: "keep" | "concatenate") =>
                  setOptions((prev) => ({ ...prev, stringHandling: v }))
                }
              >
                <SelectTrigger className="bg-white border-slate-200 text-slate-800">
                  <SelectValue placeholder="String Strategy" />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-800">
                  <SelectItem value="keep">Keep Latest</SelectItem>
                  <SelectItem value="concatenate">Concatenate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              checked={options.allowMixedRoots}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, allowMixedRoots: checked }))
              }
              className="data-[state=checked]:bg-green-600"
            />
            <div>
              <Label className="text-slate-700">
                Allow merging different root types
              </Label>
              <p className="text-sm text-slate-500 mt-1">
                When enabled, each file's content will be placed under a unique
                key (e.g., "file1", "file2") in an object, allowing different
                root types to be merged.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="container mx-auto sm:p-6 max-w-full rounded-lg relative"
      id="merge"
    >
      <Card className="sm:mb-2 bg-white border-0 shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <FileJson className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                JSON File Merger
              </CardTitle>
              <CardDescription className="text-slate-600">
                Advanced JSON merging with large file support
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Dropzone
            onDrop={handleFileUpload}
            accept={{ "application/json": [".json"] }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? "border-green-400 bg-green-50"
                    : "border-slate-300 bg-slate-50 hover:border-green-300 hover:bg-slate-100"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-50 bg-opacity-90 text-green-700 text-lg font-semibold rounded-lg">
                    Drop JSON files here
                  </div>
                )}
                <Upload className="h-12 w-12 mb-4 text-green-500" />
                <p className="text-slate-700 font-medium mb-1">
                  Drag & drop JSON files or click to upload
                </p>
                <p className="text-sm text-slate-500">
                  Supports multiple files and large JSON structures
                </p>
              </div>
            )}
          </Dropzone>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-800">
                  Selected Files ({files.length})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFiles}
                  className="text-slate-600 border-slate-200 hover:bg-slate-50"
                >
                  Clear All
                </Button>
              </div>
              <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200 group hover:border-green-200 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FileJson className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-slate-700 truncate max-w-[70%]">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderOptions()}

          <div className="flex gap-4 mt-6">
            <Button
              onClick={mergeFiles}
              disabled={files.length === 0 || isMerging}
              className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md disabled:opacity-50 h-12 text-base"
            >
              {isMerging ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Merging ({progress}%)
                </>
              ) : (
                "Merge Files"
              )}
            </Button>
            <Button
              onClick={downloadMergedFile}
              disabled={!mergedContent}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white shadow-md h-12 text-base disabled:opacity-50"
            >
              Download Result
            </Button>
          </div>

          {mergedContent && (
            <div className="mt-8 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Merged Result
                  {mergedContent.length > MAX_SAFE_SIZE && (
                    <span className="ml-2 text-sm font-normal text-slate-500">
                      (Large file - rendering optimized)
                    </span>
                  )}
                </h3>
                <div className="flex gap-2">
                  {mergedContent.length <= MAX_SAFE_SIZE ? (
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="text-slate-700 border-slate-200 hover:bg-slate-50 flex items-center"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-slate-400 border-slate-200 cursor-not-allowed"
                            disabled
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            Content is too large to be copied. Please download
                            instead.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <Button
                    onClick={downloadMergedFile}
                    variant="outline"
                    size="sm"
                    className="text-slate-700 border-slate-200 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap break-words max-h-96 overflow-auto p-4 bg-white rounded-lg border border-slate-200">
                  {mergedContent.length > MAX_SAFE_SIZE
                    ? "Content too large to display safely. You can download the merged file using the button above."
                    : mergedContent}
                </pre>
              </div>
            </div>
          )}

          {showConfirmDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg  max-w-md w-full">
                <div className="flex items-center text-amber-500 mb-4">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Root Type Mismatch
                  </h3>
                </div>
                <p className="text-slate-700 mb-6">
                  The uploaded JSON files have different root types (e.g., some
                  are arrays, some are objects). Do you want to merge them
                  anyway? Each file's content will be placed under a unique key
                  (e.g., "file1", "file2") in an object.
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={cancelMerge}
                    variant="outline"
                    className="border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmMergeAnyway}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Merge Anyway
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonMerger;
