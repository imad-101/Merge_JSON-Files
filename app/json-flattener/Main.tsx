"use client";

import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
  prefix: string = "",
  currentDepth: number = 0,
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

  const resetInputs = () => {
    setFile(null);
    setPastedInput("");
    setFlattenedContent("");
    setProgress(0);
    toast({
      title: "Reset Complete",
      description: "Input and output have been reset.",
    });
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
    <div className="mt-4 space-y-4 p-4 bg-gray-800 rounded-sm">
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">Advanced Flattening Options</Label>
        <Switch
          checked={showAdvancedOptions}
          onCheckedChange={setShowAdvancedOptions}
          className="data-[state=checked]:bg-green-500"
        />
      </div>
      {showAdvancedOptions && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-gray-300">Delimiter</Label>
            <Input
              value={advancedOptions.delimiter}
              onChange={(e) =>
                setAdvancedOptions((prev) => ({
                  ...prev,
                  delimiter: e.target.value,
                }))
              }
              placeholder="e.g., ."
              className="bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label className="text-gray-300">Flatten Arrays</Label>
            <Switch
              checked={advancedOptions.flattenArrays}
              onCheckedChange={(checked) =>
                setAdvancedOptions((prev) => ({
                  ...prev,
                  flattenArrays: checked,
                }))
              }
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Max Flatten Depth</Label>
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
              className="bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="container mx-auto sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-7xl rounded-lg relative"
      id="flatten"
    >
      <Card className="sm:mb-2 bg-gray-950 text-white">
        <CardHeader>
          <CardTitle>JSON File Flattener</CardTitle>
          <CardDescription className="text-gray-100">
            Advanced JSON flattening with file & paste support
          </CardDescription>
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
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-gray-950 hover:border-gray-100 transition"
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-lg font-semibold rounded-lg">
                    Drop file here
                  </div>
                )}
                <Upload className="h-8 w-8 mb-2 text-gray-100" />
                <p className="text-sm text-gray-100">
                  Drag & drop file or click to upload
                </p>
              </div>
            )}
          </Dropzone>

          {file && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center bg-gray-800 p-2 rounded-md">
                <span className="text-sm text-gray-200 truncate max-w-[70%]">
                  {file.name}
                </span>
                <Trash2
                  className="h-5 w-5 text-red-500 cursor-pointer"
                  onClick={removeFile}
                />
              </div>
            </div>
          )}

          {/* Pasted JSON input */}
          <div className="mt-6">
            <Label className="text-gray-300">Or Paste JSON Here</Label>
            <textarea
              value={pastedInput}
              onChange={handlePastedInputChange}
              placeholder="Paste your JSON text here..."
              rows={6}
              className="w-full rounded-md border-gray-300 bg-gray-800 text-gray-200 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {renderAdvancedOptions()}

          <div className="flex gap-4 mt-4">
            <Button
              onClick={flattenInput}
              disabled={(!file && !pastedInput.trim()) || isFlattening}
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 disabled:opacity-50"
            >
              {isFlattening ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Flattening ({progress}%)
                </>
              ) : (
                "Flatten Input"
              )}
            </Button>
            <Button
              onClick={downloadFlattenedFile}
              disabled={!flattenedContent}
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100"
            >
              Download
            </Button>
          </div>

          {flattenedContent && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-200">
                  Flattened Result{" "}
                  {flattenedContent.length > MAX_SAFE_SIZE &&
                    "(Large file - rendering optimized)"}
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={resetInputs}
                    variant="outline"
                    className="text-gray-700"
                    size="sm"
                  >
                    Reset
                  </Button>
                  {flattenedContent.length > MAX_SAFE_SIZE ? (
                    <p className="text-sm text-gray-400">
                      Content is too large to copy. Please download.
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
                {flattenedContent.length > MAX_SAFE_SIZE
                  ? "Content too large to display. Please download the file."
                  : flattenedContent}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonFlattener;
