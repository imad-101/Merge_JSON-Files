"use client";

import React, { useState, useCallback } from "react";
import { Upload, Trash2, Copy, Loader } from "lucide-react";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ConversionMode = "jsonToJsonl" | "jsonlToJson";

const JsonJsonlConverter: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedContent, setConvertedContent] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [conversionMode, setConversionMode] =
    useState<ConversionMode>("jsonToJsonl");
  const { toast } = useToast();

  // Handle file selection
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

  // Remove file from the list
  const removeFile = (index: number) => {
    const fileName = files[index].name;
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    toast({
      title: "File Removed",
      description: `Removed ${fileName} from the list.`,
    });
  };

  // Reset all fields
  const resetAll = () => {
    setFiles([]);
    setConvertedContent("");
    setProgress(0);
    setIsConverting(false);
    toast({
      title: "Reset Complete",
      description: "All fields have been reset.",
    });
  };

  // Reads file in chunks for large file support
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
            resolve(result);
          } else {
            // Slight delay to avoid blocking the UI
            setTimeout(readNextChunk, 0);
          }
        }
      };

      readNextChunk();
    });
  };

  // Perform the conversion in a Web Worker
  const convertFiles = async () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No Files Selected",
        description: "Please upload at least one file to convert.",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setConvertedContent("");

    // Inline worker code
    const workerCode = `
      let filesProcessed = 0;
      let totalFiles = 0;
      let conversionMode = "jsonToJsonl";

      // Convert JSON (array or object) to JSONL string
      function jsonToJsonl(jsonData) {
        if (Array.isArray(jsonData)) {
          return jsonData.map(item => JSON.stringify(item)).join("\\n");
        } else {
          return JSON.stringify(jsonData);
        }
      }

      // Convert JSONL string to JSON (array)
      function jsonlToJson(jsonlString) {
        const lines = jsonlString.split(/\\r?\\n/).filter(line => line.trim() !== "");
        const arrayOfObjects = lines.map(line => JSON.parse(line));
        return JSON.stringify(arrayOfObjects, null, 2);
      }

      self.onmessage = async (e) => {
        const { action, data, fileName, mode, fileIndex, fileCount } = e.data;

        if (action === "initialize") {
          conversionMode = mode;
          totalFiles = fileCount;
        }

        if (action === "process") {
          filesProcessed++;
          try {
            if (!data) throw new Error("Empty file content for " + fileName);

            let result = "";
            if (conversionMode === "jsonToJsonl") {
              const parsed = JSON.parse(data);
              result = jsonToJsonl(parsed);
            } else if (conversionMode === "jsonlToJson") {
              result = jsonlToJson(data);
            }

            const progress = Math.round((filesProcessed / totalFiles) * 80);
            self.postMessage({ type: "progress", progress });

            self.postMessage({
              type: "fileConverted",
              content: result,
              fileIndex
            });

          } catch (err) {
            self.postMessage({
              type: "error",
              message: \`Error processing \${fileName}: \${err.message}\`
            });
          }
        }

        if (action === "finalize") {
          self.postMessage({ type: "complete" });
        }
      };
    `;

    // Create a worker from the above code
    const worker = new Worker(
      URL.createObjectURL(
        new Blob([workerCode], { type: "application/javascript" })
      )
    );

    const resultsArray: string[] = Array(files.length).fill("");

    worker.onmessage = (e) => {
      const msg = e.data;
      switch (msg.type) {
        case "progress":
          setProgress(msg.progress);
          break;
        case "fileConverted":
          resultsArray[msg.fileIndex] = msg.content;
          break;
        case "error":
          toast({
            variant: "destructive",
            title: "Conversion Error",
            description: msg.message,
          });
          setIsConverting(false);
          worker.terminate();
          break;
        case "complete":
          const finalOutput = resultsArray.join("\n\n");
          setConvertedContent(finalOutput);
          setIsConverting(false);
          toast({
            title: "Conversion Successful",
            description: "Your file(s) have been converted.",
          });
          worker.terminate();
          break;
      }
    };

    worker.postMessage({
      action: "initialize",
      mode: conversionMode,
      fileCount: files.length,
    });

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const content = await readFileInChunks(file);
        worker.postMessage({
          action: "process",
          data: content,
          fileName: file.name,
          mode: conversionMode,
          fileIndex: i,
          fileCount: files.length,
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "File Error",
          description: (err as Error).message,
        });
        setIsConverting(false);
        worker.terminate();
        return;
      }
    }

    // Finalize
    worker.postMessage({ action: "finalize" });
  };

  // Download the converted file
  const downloadConvertedFile = () => {
    if (!convertedContent) return;
    const extension = conversionMode === "jsonToJsonl" ? "jsonl" : "json";
    const blob = new Blob([convertedContent], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-${Date.now()}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: `Your converted file is being downloaded as .${extension}.`,
    });
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!convertedContent) return;
    try {
      await navigator.clipboard.writeText(convertedContent);
      toast({
        title: "Copied to Clipboard",
        description: "Converted text copied successfully.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
      });
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative">
      <Card className="mb-4 sm:mb-8 bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>JSON ↔ JSONL Converter</CardTitle>
          <CardDescription className="text-gray-300">
            Easily convert between JSON and JSONL (with large file support)
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Dropzone */}
          <Dropzone
            onDrop={handleFileUpload}
            accept={{
              "application/json": [".json", ".jsonl"], // Accept JSON and JSONL
              "text/plain": [".jsonl"],
            }}
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

          {/* List of uploaded files */}
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

          {/* Conversion Mode */}
          <div className="mt-6 mb-4">
            <Label className="text-gray-300">Conversion Mode</Label>
            <Select
              value={conversionMode}
              onValueChange={(value: ConversionMode) =>
                setConversionMode(value)
              }
            >
              <SelectTrigger className="mt-2 bg-gray-700 border-gray-600 text-gray-200 w-full">
                <SelectValue placeholder="Select conversion type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-200">
                <SelectItem value="jsonToJsonl">JSON → JSONL</SelectItem>
                <SelectItem value="jsonlToJson">JSONL → JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Convert + Download buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              onClick={convertFiles}
              disabled={files.length === 0 || isConverting}
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 disabled:opacity-50"
            >
              {isConverting ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Converting ({progress}%)
                </>
              ) : (
                "Convert Files"
              )}
            </Button>
            <Button
              onClick={downloadConvertedFile}
              disabled={!convertedContent}
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100"
            >
              Download
            </Button>
          </div>

          {/* Result display */}
          {convertedContent && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-200">
                  Converted Result
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={resetAll}
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

              {/* Preview logic */}
              {convertedContent.length > 1e6 ? (
                // If the file is over 1 MB, show a warning
                <p className="text-sm text-gray-300">
                  Content too large to display. Please download the result.
                </p>
              ) : (
                // Otherwise, show up to the first 1000 characters
                <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words max-h-96 overflow-auto">
                  {convertedContent.length <= 1000
                    ? convertedContent
                    : convertedContent.slice(0, 1000) +
                      "... (truncated preview) ..."}
                </pre>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonJsonlConverter;
