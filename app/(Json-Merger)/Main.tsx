"use client";
import React, { useState, useCallback } from "react";
import { Upload, Trash2, Copy, Loader } from "lucide-react";
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
    <div className="mt-4 space-y-4 p-4 bg-gray-800 rounded-sm">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">Merge Options (Optional)</Label>
        <Switch
          checked={showOptions}
          onCheckedChange={setShowOptions}
          className="data-[state=checked]:bg-green-500"
        />
      </div>

      {showOptions && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-gray-300">Array Handling</Label>
            <Select
              value={options.arrayStrategy}
              onValueChange={(
                v: "concat" | "overwrite" | "merge" | "mergeByKey"
              ) => setOptions((prev) => ({ ...prev, arrayStrategy: v }))}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Array Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-200">
                <SelectItem value="concat">Concatenate</SelectItem>
                <SelectItem value="overwrite">Overwrite</SelectItem>
                <SelectItem value="merge">Merge Unique</SelectItem>
                <SelectItem value="mergeByKey">Merge by Key</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {options.arrayStrategy === "mergeByKey" && (
            <div className="space-y-2">
              <Label className="text-gray-300">Merge Key</Label>
              <Input
                value={options.mergeKey}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, mergeKey: e.target.value }))
                }
                placeholder="e.g., id"
                className="bg-gray-700 border-gray-600 text-gray-200"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-gray-300">Conflict Resolution</Label>
            <Select
              value={options.conflictResolution}
              onValueChange={(v: "merge" | "overwrite") =>
                setOptions((prev) => ({ ...prev, conflictResolution: v }))
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Conflict Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-200">
                <SelectItem value="merge">Merge Values</SelectItem>
                <SelectItem value="overwrite">Overwrite Existing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Number Handling</Label>
            <Select
              value={options.numericHandling}
              onValueChange={(v: "sum" | "keep") =>
                setOptions((prev) => ({ ...prev, numericHandling: v }))
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Number Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-200">
                <SelectItem value="sum">Sum Values</SelectItem>
                <SelectItem value="keep">Keep Latest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">String Handling</Label>
            <Select
              value={options.stringHandling}
              onValueChange={(v: "keep" | "concatenate") =>
                setOptions((prev) => ({ ...prev, stringHandling: v }))
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="String Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-200">
                <SelectItem value="keep">Keep Latest</SelectItem>
                <SelectItem value="concatenate">Concatenate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 space-x-2">
            <Label className="text-gray-300">
              Allow merging different root types
            </Label>
            <Switch
              checked={options.allowMixedRoots}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, allowMixedRoots: checked }))
              }
              className="data-[state=checked]:bg-green-500"
            />
            <p className="text-sm text-gray-400">
              When enabled, each file's content will be placed under a unique
              key (e.g., "file1", "file2") in an object, allowing different root
              types to be merged.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="container mx-auto sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative"
      id="merge"
    >
      <Card className=" sm:mb-2 bg-gray-950 text-white">
        <CardHeader>
          <CardTitle>JSON File Merger</CardTitle>
          <CardDescription className="text-gray-100">
            Advanced JSON merging with large file support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dropzone
            onDrop={handleFileUpload}
            accept={{ "application/json": [".json"] }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-gray-950 hover:border-gray-100 transition"
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-lg font-semibold rounded-lg">
                    Drop files here
                  </div>
                )}
                <Upload className="h-8 w-8 mb-2 text-gray-100" />
                <p className="text-sm text-gray-100">
                  Drag & drop files or click to upload
                </p>
              </div>
            )}
          </Dropzone>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-800 p-2 rounded-md"
                >
                  <span className="text-sm text-gray-200 truncate max-w-[70%]">
                    {file.name}
                  </span>
                  <Trash2
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    onClick={() => removeFile(index)}
                  />
                </div>
              ))}
            </div>
          )}

          {renderOptions()}

          <div className="flex gap-4 mt-4">
            <Button
              onClick={mergeFiles}
              disabled={files.length === 0 || isMerging}
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 disabled:opacity-50"
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
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100"
            >
              Download
            </Button>
          </div>

          {mergedContent && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-200">
                  Merged Result{" "}
                  {mergedContent.length > MAX_SAFE_SIZE &&
                    "(Large file - rendering optimized)"}
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={resetFiles}
                    variant="outline"
                    className="text-gray-700"
                    size="sm"
                  >
                    Reset
                  </Button>
                  {mergedContent.length > MAX_SAFE_SIZE ? (
                    <p className="text-sm text-gray-400">
                      Content is too large to be copied. Please download
                      instead.
                    </p>
                  ) : (
                    <Copy
                      className="h-7 w-7 text-gray-300 cursor-pointer hover:text-gray-100"
                      onClick={copyToClipboard}
                    />
                  )}
                </div>
              </div>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words max-h-96 overflow-auto">
                {mergedContent.length > MAX_SAFE_SIZE
                  ? "Content too large to display safely. You can download merged file"
                  : mergedContent}
              </pre>
            </div>
          )}

          {showConfirmDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">
                  Root Type Mismatch
                </h3>
                <p className="text-gray-300 mb-4">
                  The uploaded JSON files have different root types (e.g., some
                  are arrays, some are objects). Do you want to merge them
                  anyway? Each file’s content will be placed under a unique key
                  (e.g., "file1", "file2") in an object.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={confirmMergeAnyway}
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Merge Anyway
                  </Button>
                  <Button
                    onClick={cancelMerge}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Cancel
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
