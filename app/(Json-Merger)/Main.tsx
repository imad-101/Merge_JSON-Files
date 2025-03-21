"use client";
import React, { useState, useCallback, useEffect } from "react";
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

type MergeOptions = {
  arrayStrategy: "concat" | "overwrite" | "merge";
  conflictResolution: "merge" | "overwrite";
  numericHandling: "sum" | "keep";
  depth: number;
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
    depth: -1,
  });
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dummy, setDummy] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isMerging) {
      interval = window.setInterval(() => {
        setDummy((prev) => prev + 1);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMerging]);

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
      const chunkSize = 4 * 1024 * 1024;
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
              JSON.parse(result);
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
            merge: (a, b) => [...new Set([...a, ...b])]
          },
          numeric: {
            sum: (a, b) => Number(a) + Number(b),
            keep: (a, b) => b
          }
        };

        function handleRootValue(target, source, options) {
          try {
            if (Array.isArray(source)) {
              if (!Array.isArray(target)) target = [];
              return mergeStrategies.array[options.arrayStrategy](target, source);
            }
            if (typeof source === 'object' && source !== null) {
              return deepMerge(target, source, options);
            }
            return source;
          } catch (err) {
            throw new Error('Root value handling failed: ' + err.message);
          }
        }

        function deepMerge(target, source, options, currentDepth = 0) {
          if (options.depth !== -1 && currentDepth > options.depth) return target;

          try {
            if (Array.isArray(source)) {
              if (!Array.isArray(target)) target = [];
              return mergeStrategies.array[options.arrayStrategy](target, source);
            }

            for (const key in source) {
              const sourceVal = source[key];
              const targetVal = target[key];

              if (typeof sourceVal === 'object' && sourceVal !== null) {
                if (Array.isArray(sourceVal)) {
                  target[key] = mergeStrategies.array[options.arrayStrategy](
                    targetVal || [],
                    sourceVal
                  );
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
                  } else {
                    target[key] = sourceVal;
                  }
                } else {
                  target[key] = sourceVal;
                }
              }
            }
            return target;
          } catch (err) {
            throw new Error(\`Deep merge failed at depth \${currentDepth}: \${err.message}\`);
          }
        }

        let mergedResult = null;
        let filesProcessed = 0;

        self.onmessage = async (e) => {
          const { action, data, totalFiles, options, fileName } = e.data;

          if (action === 'process') {
            try {
              if (!data) throw new Error('Empty file content');
              const json = JSON.parse(data);
              
              if (mergedResult === null) {
                mergedResult = json;
              } else {
                mergedResult = handleRootValue(mergedResult, json, options);
              }

              filesProcessed++;
              const progress = Math.round((filesProcessed / totalFiles) * 90);
              self.postMessage({ type: 'progress', progress });
            } catch (err) {
              const errorMessage = \`Error processing \${fileName || 'unknown file'}: \${err.message}\`;
              self.postMessage({ 
                type: 'error',
                message: errorMessage
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
              self.postMessage({
                type: 'error',
                message: 'Error creating final JSON: ' + err.message
              });
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
    <div className="mt-4 space-y-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">Merge Options ( Optional )</Label>
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
              onValueChange={(v: "concat" | "overwrite" | "merge") =>
                setOptions((prev) => ({ ...prev, arrayStrategy: v }))
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Array Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-200">
                <SelectItem value="concat">Concatenate</SelectItem>
                <SelectItem value="overwrite">Overwrite</SelectItem>
                <SelectItem value="merge">Merge Unique</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative">
      <Card className="mb-4 sm:mb-8 bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>JSON File Merger</CardTitle>
          <CardDescription className="text-gray-300">
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
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-gray-900 hover:border-gray-100 transition"
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 text-white text-lg font-semibold rounded-lg">
                    Drop files here
                  </div>
                )}
                <Upload className="h-8 w-8 mb-2 text-gray-300" />
                <p className="text-sm text-gray-300">
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
                  {mergedContent.length > 1e6 &&
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
                  <Copy
                    className="h-7 w-7 text-gray-300 cursor-pointer hover:text-gray-100"
                    onClick={copyToClipboard}
                  />
                </div>
              </div>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words max-h-96 overflow-auto">
                {mergedContent.length > 1e6
                  ? "Content too large to display safely"
                  : mergedContent}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonMerger;
