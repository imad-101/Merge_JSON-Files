"use client";
import type React from "react";
import { useState, useCallback } from "react";

import {
  Upload,
  Trash2,
  Copy,
  Loader,
  FileCode,
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
  mergeStrategy: "concat" | "overwrite" | "mergeByTag";
  conflictResolution: "merge" | "overwrite";
  attributeHandling: "keep" | "merge";
  tagMergeKey: string;
  allowMixedStructures: boolean;
};

const HtmlMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedContent, setMergedContent] = useState<string>("");
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<MergeOptions>({
    mergeStrategy: "concat",
    conflictResolution: "merge",
    attributeHandling: "keep",
    tagMergeKey: "id",
    allowMixedStructures: false,
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
              const parser = new DOMParser();
              const doc = parser.parseFromString(result, "text/html");
              if (doc.querySelector("parsererror")) {
                throw new Error(`Invalid HTML in ${file.name}`);
              }
              resolve(result);
            } catch (err) {
              reject(
                new Error(
                  `Invalid HTML in ${file.name}: ${(err as Error).message}`
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
        description: "Please upload at least one HTML file to merge.",
      });
      return;
    }

    setIsMerging(true);
    setProgress(0);

    try {
      const workerCode = `
        const mergeStrategies = {
          concat: (target, source) => {
            const parser = new DOMParser();
            const targetDoc = parser.parseFromString(target, "text/html");
            const sourceDoc = parser.parseFromString(source, "text/html");
            const targetBody = targetDoc.body;
            const sourceBody = sourceDoc.body;
            targetBody.append(...sourceBody.childNodes);
            return targetDoc.documentElement.outerHTML;
          },
          overwrite: (target, source) => source,
          mergeByTag: (target, source, key) => {
            const parser = new DOMParser();
            const targetDoc = parser.parseFromString(target, "text/html");
            const sourceDoc = parser.parseFromString(source, "text/html");
            const targetElements = targetDoc.querySelectorAll(\`[data-merge-key="\${key}"]\`);
            const sourceElements = sourceDoc.querySelectorAll(\`[data-merge-key="\${key}"]\`);
            sourceElements.forEach((sourceEl, index) => {
              if (targetElements[index]) {
                targetElements[index].innerHTML = sourceEl.innerHTML;
                sourceEl.getAttributeNames().forEach(attr => {
                  targetElements[index].setAttribute(attr, sourceEl.getAttribute(attr));
                });
              } else {
                targetDoc.body.appendChild(sourceEl.cloneNode(true));
              }
            });
            return targetDoc.documentElement.outerHTML;
          }
        };

        function mergeAttributes(targetEl, sourceEl, options) {
          if (options.attributeHandling === "merge") {
            sourceEl.getAttributeNames().forEach(attr => {
              if (!targetEl.hasAttribute(attr)) {
                targetEl.setAttribute(attr, sourceEl.getAttribute(attr));
              }
            });
          } else {
            sourceEl.getAttributeNames().forEach(attr => {
              targetEl.setAttribute(attr, sourceEl.getAttribute(attr));
            });
          }
        }

        function deepMerge(target, source, options) {
          const parser = new DOMParser();
          const targetDoc = parser.parseFromString(target, "text/html");
          const sourceDoc = parser.parseFromString(source, "text/html");
          const targetBody = targetDoc.body;
          const sourceBody = sourceDoc.body;

          if (options.mergeStrategy === "mergeByTag") {
            return mergeStrategies.mergeByTag(target, source, options.tagMergeKey);
          }

          sourceBody.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const targetNode = targetDoc.querySelector(\`[data-merge-key="\${node.getAttribute("data-merge-key") || ""}"]\`);
              if (targetNode && options.conflictResolution === "merge") {
                mergeAttributes(targetNode, node, options);
                targetNode.innerHTML = node.innerHTML;
              } else {
                targetBody.appendChild(node.cloneNode(true));
              }
            }
          });
          return targetDoc.documentElement.outerHTML;
        }

        let mergedResult = null;
        let filesProcessed = 0;

        self.onmessage = async (e) => {
          const { action, data, totalFiles, options, fileName } = e.data;

          if (action === "process") {
            try {
              if (!data) throw new Error('Empty file content');
              const parser = new DOMParser();
              const doc = parser.parseFromString(data, "text/html");
              if (doc.querySelector("parsererror")) {
                throw new Error(\`Invalid HTML in \${fileName}\`);
              }

              if (mergedResult === null) {
                mergedResult = data;
              } else {
                mergedResult = deepMerge(mergedResult, data, options);
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

          if (action === "finalize") {
            try {
              self.postMessage({ type: 'progress', progress: 95 });
              const result = mergedResult;
              self.postMessage({ type: 'progress', progress: 100 });
              self.postMessage({ type: 'complete', result });
            } catch (err) {
              self.postMessage({
                type: 'error',
                message: 'Error creating final HTML: ' + err.message
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
    const blob = new Blob([mergedContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `merged-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "Merged HTML is being downloaded.",
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
        description: "Merged HTML copied successfully.",
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
    <div className="mt-6 space-y-4 p-6 bg-[#edf6f9]/15 rounded-lg border border-[#edf6f9]">
      <div className="flex items-center justify-between">
        <Label className="text-slate-900 font-semibold">
          Advanced Merge Options
        </Label>
        <Switch
          checked={showOptions}
          onCheckedChange={setShowOptions}
          className="data-[state=checked]:bg-[#4a90a4]"
        />
      </div>

      {showOptions && (
        <div className="space-y-4 pt-4 border-t border-[#edf6f9]">
          <div className="space-y-2">
            <Label className="text-slate-800 font-medium">Merge Strategy</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select
                      value={options.mergeStrategy}
                      onValueChange={(
                        v: "concat" | "overwrite" | "mergeByTag"
                      ) =>
                        setOptions((prev) => ({ ...prev, mergeStrategy: v }))
                      }
                    >
                      <SelectTrigger className="bg-white border-[#edf6f9] text-slate-800 focus:ring-2 focus:ring-[#4a90a4] focus:border-[#4a90a4]">
                        <SelectValue placeholder="Merge Strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-800 border-[#edf6f9]">
                        <SelectItem value="concat">Concatenate</SelectItem>
                        <SelectItem value="overwrite">Overwrite</SelectItem>
                        <SelectItem value="mergeByTag">Merge by Tag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 text-white">
                  <p className="text-xs max-w-xs">
                    Choose how to handle HTML elements when merging. Concatenate appends content, Overwrite replaces it, and Merge by Tag combines elements with matching keys.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {options.mergeStrategy === "mergeByTag" && (
            <div className="space-y-2">
              <Label className="text-slate-800 font-medium">Tag Merge Key</Label>
              <Input
                value={options.tagMergeKey}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, tagMergeKey: e.target.value }))
                }
                placeholder="e.g., data-merge-key"
                className="bg-white border-[#edf6f9] text-slate-800 focus:ring-2 focus:ring-[#4a90a4] focus:border-[#4a90a4]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-slate-800 font-medium">
              Conflict Resolution
            </Label>
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
                      <SelectTrigger className="bg-white border-[#edf6f9] text-slate-800 focus:ring-2 focus:ring-[#4a90a4] focus:border-[#4a90a4]">
                        <SelectValue placeholder="Conflict Strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-800 border-[#edf6f9]">
                        <SelectItem value="merge">Merge Values</SelectItem>
                        <SelectItem value="overwrite">
                          Overwrite Existing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 text-white">
                  <p className="text-xs max-w-xs">
                    Choose how to handle conflicts when the same tag exists in
                    multiple files. Merge combines attributes, while Overwrite
                    replaces with the latest values.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-800 font-medium">
              Attribute Handling
            </Label>
            <Select
              value={options.attributeHandling}
              onValueChange={(v: "keep" | "merge") =>
                setOptions((prev) => ({ ...prev, attributeHandling: v }))
              }
            >
              <SelectTrigger className="bg-white border-[#edf6f9] text-slate-800 focus:ring-2 focus:ring-[#4a90a4] focus:border-[#4a90a4]">
                <SelectValue placeholder="Attribute Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-800 border-[#edf6f9]">
                <SelectItem value="keep">Keep Latest</SelectItem>
                <SelectItem value="merge">Merge Attributes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              checked={options.allowMixedStructures}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, allowMixedStructures: checked }))
              }
              className="data-[state=checked]:bg-[#4a90a4]"
            />
            <div>
              <Label className="text-slate-800 font-medium">
                Allow merging different structures
              </Label>
              <p className="text-sm text-slate-600 mt-1">
                When enabled, each file's content will be placed under a unique
                div (e.g., "file1", "file2") in the body, allowing different
                HTML structures to be merged.
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
        <CardHeader className="pb-2 border-b border-slate-200">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[#edf6f9] flex items-center justify-center mr-3">
              <FileCode className="w-5 h-5 text-[#4a90a4]" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                HTML File Merger
              </CardTitle>
              <CardDescription className="text-slate-700">
                Advanced HTML merging with large file support
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Dropzone
            onDrop={handleFileUpload}
            accept={{ "text/html": [".html"] }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? "border-[#4a90a4] bg-[#edf6f9]/30"
                    : "border-slate-400 bg-[#edf6f9]/10 hover:border-[#4a90a4] hover:bg-[#edf6f9]/20"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#edf6f9]/50 bg-opacity-90 text-[#4a90a4] text-lg font-semibold rounded-lg">
                    Drop HTML files here
                  </div>
                )}
                <Upload className="h-12 w-12 mb-4 text-[#4a90a4]" />
                <p className="text-slate-800 font-medium mb-1">
                  Drag & drop HTML files or click to upload
                </p>
                <p className="text-sm text-slate-600">
                  Supports multiple files and large HTML structures
                </p>
              </div>
            )}
          </Dropzone>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-900">
                  Selected Files ({files.length})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFiles}
                  className="text-slate-700 border-slate-300 hover:bg-slate-100"
                >
                  Clear All
                </Button>
              </div>
              <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#edf6f9]/20 p-3 rounded-lg border border-[#edf6f9] group hover:border-[#4a90a4] hover:bg-[#edf6f9]/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FileCode className="h-5 w-5 text-[#4a90a4] flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-800 truncate max-w-[70%]">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-600">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderOptions()}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              onClick={mergeFiles}
              disabled={files.length === 0 || isMerging}
              className="w-full bg-[#4a90a4] hover:bg-[#3d7a8c] text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-medium"
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
              className="w-full bg-slate-800 hover:bg-slate-900 text-white shadow-md h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Result
            </Button>
          </div>

          {mergedContent && (
            <div className="mt-8 bg-[#edf6f9]/15 rounded-lg border border-[#edf6f9] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-[#edf6f9] bg-white">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4a90a4] mr-2" />
                  Merged Result
                  {mergedContent.length > MAX_SAFE_SIZE && (
                    <span className="ml-2 text-sm font-normal text-slate-600">
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
                      className="text-slate-800 border-[#edf6f9] hover:bg-[#edf6f9]/20 flex items-center"
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
                            className="text-slate-400 border-[#edf6f9] cursor-not-allowed"
                            disabled
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-white">
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
                    className="text-slate-800 border-[#edf6f9] hover:bg-[#edf6f9]/20"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <pre className="text-sm text-slate-800 whitespace-pre-wrap break-words max-h-96 overflow-auto p-4 bg-white rounded-lg border border-[#edf6完整文档
f6f9]">
                  {mergedContent.length > MAX_SAFE_SIZE
                    ? "Content too large to display safely. You can download the merged file using the button above."
                    : mergedContent}
                </pre>
              </div>
            </div>
          )}

          {showConfirmDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-70 z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
                <div className="flex items-center text-amber-600 mb-4">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Structure Mismatch
                  </h3>
                </div>
                <p className="text-slate-800 mb-6">
                  The uploaded HTML files have different structures (e.g., different root elements). Do you want to merge them anyway? Each file's content will be placed under a unique div (e.g., "file1", "file2") in the body.
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setShowConfirmDialog(false)}
                    variant="outline"
                    className="border-[#edf6f9] text-slate-800 hover:bg-[#edf6f9]/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setOptions((prev) => ({ ...prev, allowMixedStructures: true }));
                      setShowConfirmDialog(false);
                      mergeFiles();
                    }}
                    className="bg-[#4a90a4] text-white hover:bg-[#3d7a8c]"
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

export default HtmlMerger;