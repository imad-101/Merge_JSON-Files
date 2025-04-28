"use client";

import type React from "react";
import { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import {
  Upload,
  Trash2,
  Copy,
  Loader,
  FileJson,
  CheckCircle,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MAX_SAFE_SIZE = 1e6; // 1 million characters

// Advanced flattening options.
interface FlattenOptions {
  delimiter: string; // Delimiter for joining nested keys (e.g. ".")
  flattenArrays: boolean;
  maxDepth: number; // -1 for unlimited depth
}

// Default advanced options.
const defaultOptions: FlattenOptions = {
  delimiter: ".",
  flattenArrays: true,
  maxDepth: -1,
};

/**
 * A recursive function to flatten nested JSON.
 *
 * - Uses the user-defined delimiter for joining keys.
 * - Optionally flattens arrays based on the advanced options.
 * - Stops recursing once the maxDepth is reached (if maxDepth !== -1).
 */
const flattenJSON = (
  data: any,
  options: FlattenOptions,
  prefix = "",
  currentDepth = 0,
  result: Record<string, any> = {}
): Record<string, any> => {
  if (options.maxDepth !== -1 && currentDepth >= options.maxDepth) {
    result[prefix] = data;
    return result;
  }

  // Handle primitives
  if (typeof data !== "object" || data === null) {
    result[prefix] = data;
    return result;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    if (!options.flattenArrays) {
      result[prefix] = data;
      return result;
    }
    data.forEach((item: any, index: number) => {
      const newKey = prefix ? `${prefix}[${index}]` : `[${index}]`;
      flattenJSON(item, options, newKey, currentDepth + 1, result);
    });
  } else {
    // Handle objects
    Object.keys(data).forEach((key) => {
      const newKey = prefix ? `${prefix}${options.delimiter}${key}` : key;
      flattenJSON(data[key], options, newKey, currentDepth + 1, result);
    });
  }
  return result;
};

const JsonFlattener: React.FC = () => {
  // Either a file or pasted input may be used.
  const [file, setFile] = useState<File | null>(null);
  const [pastedInput, setPastedInput] = useState<string>("");
  const [flattenedContent, setFlattenedContent] = useState<string>("");
  const [isFlattening, setIsFlattening] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);
  const [advancedOptions, setAdvancedOptions] =
    useState<FlattenOptions>(defaultOptions);
  const { toast } = useToast();

  // Handle file upload via Dropzone.
  const handleFileUpload = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast({
          variant: "destructive",
          title: "Multiple Files Detected",
          description: "Please upload only one JSON file.",
        });
        return;
      }
      setFile(acceptedFiles[0]);
      // Clear any pasted input so file takes priority.
      setPastedInput("");
      toast({
        title: "File Added",
        description: `Successfully added ${acceptedFiles[0].name}.`,
        variant: "default",
      });
    },
    [toast]
  );

  const removeFile = () => {
    if (file) {
      toast({
        title: "File Removed",
        description: `Removed ${file.name}.`,
      });
    }
    setFile(null);
    setFlattenedContent("");
  };

  // Read file content in chunks to support large files.
  const readFileInChunks = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const chunkSize = 4 * 1024 * 1024; // 4MB per chunk
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
          // Update progress (up to 90% before processing)
          setProgress(Math.min(90, Math.round((offset / fileSize) * 90)));

          if (offset >= fileSize) {
            try {
              JSON.parse(result); // Validate JSON syntax
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

  // Handle pasted JSON text.
  const handlePastedInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPastedInput(e.target.value);
    // Clear file so pasted input takes precedence.
    setFile(null);
  };

  // Process input (from file or pasted text) by reading, flattening, and setting output.
  const flattenInput = async () => {
    let jsonText = "";
    if (pastedInput.trim()) {
      jsonText = pastedInput;
    } else if (file) {
      try {
        jsonText = await readFileInChunks(file);
      } catch (error) {
        setFlattenedContent("");
        toast({
          variant: "destructive",
          title: "File Error",
          description: (error as Error).message,
        });
        setIsFlattening(false);
        return;
      }
    } else {
      toast({
        variant: "destructive",
        title: "No Input Provided",
        description: "Please either upload a file or paste JSON text.",
      });
      return;
    }

    setIsFlattening(true);
    setProgress(0);

    try {
      // Yield control to avoid blocking long operations.
      await new Promise((resolve) => setTimeout(resolve, 0));
      const jsonData = JSON.parse(jsonText);
      const flattened = flattenJSON(jsonData, advancedOptions);
      const output = JSON.stringify(flattened, null, 2);
      setFlattenedContent(output);
      setProgress(100);
      toast({
        title: "Flatten Successful",
        description: "JSON flattened successfully.",
        variant: "default",
      });
    } catch (error) {
      setFlattenedContent("");
      toast({
        variant: "destructive",
        title: "Flatten Failed",
        description:
          (error as Error).message || "An error occurred during flattening.",
      });
    } finally {
      setIsFlattening(false);
    }
  };

  // Download the flattened JSON as a file.
  const downloadFlattenedFile = () => {
    if (!flattenedContent) return;
    const blob = new Blob([flattenedContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flattened-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "Flattened JSON is being downloaded.",
      variant: "default",
    });
  };

  // Copy flattened JSON to the clipboard.
  const copyToClipboard = async () => {
    if (!flattenedContent) return;
    if (flattenedContent.length > MAX_SAFE_SIZE) {
      toast({
        variant: "destructive",
        title: "Cannot Copy",
        description:
          "Content is too large to be copied. Please download instead.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(flattenedContent);
      toast({
        title: "Copied to Clipboard",
        description: "Flattened JSON copied successfully.",
        variant: "default",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy flattened JSON.",
      });
    }
  };

  // Render the advanced options section.
  const renderAdvancedOptions = () => (
    <div className="mt-6 space-y-4 p-6 bg-slate-100 rounded-lg border border-slate-300">
      <div className="flex items-center justify-between">
        <Label className="text-slate-800 font-semibold">
          Advanced Flattening Options
        </Label>
        <Switch
          checked={showAdvancedOptions}
          onCheckedChange={setShowAdvancedOptions}
          className="data-[state=checked]:bg-green-600"
        />
      </div>
      {showAdvancedOptions && (
        <div className="space-y-4 pt-4 border-t border-slate-300">
          <div className="space-y-2">
            <Label className="text-slate-700">Delimiter</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Input
                      value={advancedOptions.delimiter}
                      onChange={(e) =>
                        setAdvancedOptions((prev) => ({
                          ...prev,
                          delimiter: e.target.value,
                        }))
                      }
                      placeholder="e.g., ."
                      className="bg-white border-slate-300 text-slate-800 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Character used to separate nested keys in the flattened
                    output.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              checked={advancedOptions.flattenArrays}
              onCheckedChange={(checked) =>
                setAdvancedOptions((prev) => ({
                  ...prev,
                  flattenArrays: checked,
                }))
              }
              className="data-[state=checked]:bg-green-600"
            />
            <div>
              <Label className="text-slate-700">Flatten Arrays</Label>
              <p className="text-sm text-slate-500 mt-1">
                When enabled, arrays will be flattened with index notation
                (e.g., key[0], key[1]).
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700">Max Flatten Depth</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Input
                      type="number"
                      value={advancedOptions.maxDepth}
                      onChange={(e) =>
                        setAdvancedOptions((prev) => ({
                          ...prev,
                          maxDepth: Number(e.target.value),
                        }))
                      }
                      placeholder="-1 for unlimited"
                      className="bg-white border-slate-300 text-slate-800 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Maximum depth to flatten. Use -1 for unlimited depth.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="container mx-auto sm:p-6 max-w-full rounded-lg relative"
      id="flatten"
    >
      <Card className="sm:mb-2 bg-white border-0 shadow-none">
        <CardHeader className="pb-2 border-b border-slate-200">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
              <FileJson className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                JSON File Flattener
              </CardTitle>
              <CardDescription className="text-slate-700">
                Advanced JSON flattening with file & paste support
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Dropzone for file upload */}
          <Dropzone
            onDrop={handleFileUpload}
            accept={{ "application/json": [".json"] }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? "border-green-500 bg-green-50"
                    : "border-slate-400 bg-slate-50 hover:border-green-400 hover:bg-slate-100"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-50 bg-opacity-90 text-green-700 text-lg font-semibold rounded-lg">
                    Drop JSON file here
                  </div>
                )}
                <Upload className="h-12 w-12 mb-4 text-green-600" />
                <p className="text-slate-800 font-medium mb-1">
                  Drag & drop JSON file or click to upload
                </p>
                <p className="text-sm text-slate-600">
                  Supports large JSON structures
                </p>
              </div>
            )}
          </Dropzone>

          {file && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-800">Selected File</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                  className="text-slate-600 border-slate-200 hover:bg-slate-50"
                >
                  Clear
                </Button>
              </div>
              <div className="flex justify-between items-center bg-slate-100 p-3 rounded-lg border border-slate-300 group hover:border-green-300 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileJson className="h-5 w-5 text-green-600 flex-shrink-0" />
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
                  onClick={removeFile}
                  className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Pasted JSON input */}
          <div className="mt-6">
            <Label className="text-slate-700 font-medium">
              Or Paste JSON Here
            </Label>
            <textarea
              value={pastedInput}
              onChange={handlePastedInputChange}
              placeholder="Paste your JSON text here..."
              rows={6}
              className="w-full mt-2 rounded-lg border border-slate-300 bg-white text-slate-800 p-3 shadow-sm focus:border-green-400 focus:ring-green-400 focus:ring-2 focus:outline-none"
            />
          </div>

          {renderAdvancedOptions()}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              onClick={flattenInput}
              disabled={(!file && !pastedInput.trim()) || isFlattening}
              className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-medium"
            >
              {isFlattening ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Flattening ({progress}%)
                </>
              ) : (
                "Flatten JSON"
              )}
            </Button>
            <Button
              onClick={downloadFlattenedFile}
              disabled={!flattenedContent}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white shadow-md h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Result
            </Button>
          </div>

          {flattenedContent && (
            <div className="mt-8 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-slate-300 bg-white">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Flattened Result
                  {flattenedContent.length > MAX_SAFE_SIZE && (
                    <span className="ml-2 text-sm font-normal text-slate-600">
                      (Large file - rendering optimized)
                    </span>
                  )}
                </h3>
                <div className="flex gap-2">
                  {flattenedContent.length <= MAX_SAFE_SIZE ? (
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="text-slate-800 border-slate-300 hover:bg-slate-100 flex items-center"
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
                            className="text-slate-400 border-slate-300 cursor-not-allowed"
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
                    onClick={downloadFlattenedFile}
                    variant="outline"
                    size="sm"
                    className="text-slate-800 border-slate-300 hover:bg-slate-100"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <pre className="text-sm text-slate-800 whitespace-pre-wrap break-words max-h-96 overflow-auto p-4 bg-white rounded-lg border border-slate-300">
                  {flattenedContent.length > MAX_SAFE_SIZE
                    ? "Content too large to display safely. You can download the flattened file using the button above."
                    : flattenedContent}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonFlattener;
