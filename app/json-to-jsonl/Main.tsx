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
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MAX_SAFE_SIZE = 1e6; // 1 million characters

// Function to convert JSON to JSONL
const convertToJSONL = (data: any): string => {
  // If the JSON is an array, output each element as a JSON string per line.
  if (Array.isArray(data)) {
    return data.map((item) => JSON.stringify(item)).join("\n");
  }
  // If the input is a single object then output a single line.
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data);
  }
  // For any other types, wrap in an array.
  return JSON.stringify([data]);
};

const JsonToJsonlConverter: React.FC = () => {
  // Either file upload or pasted input will be used.
  const [file, setFile] = useState<File | null>(null);
  const [pastedInput, setPastedInput] = useState<string>("");
  const [outputContent, setOutputContent] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  // Handle file upload using Dropzone.
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
      setPastedInput(""); // Clear pasted input to use file content
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
    setOutputContent("");
  };

  // Read file content in chunks to support large files.
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
          // Set progress up to 90% before processing
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

  // Handle pasted JSON input
  const handlePastedInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPastedInput(e.target.value);
    setFile(null); // Clear file input so pasted takes priority
  };

  // Process input (from file or pasted text) and convert to JSONL
  const processInput = async () => {
    let jsonText = "";
    if (pastedInput.trim()) {
      jsonText = pastedInput;
    } else if (file) {
      try {
        jsonText = await readFileInChunks(file);
      } catch (error) {
        setOutputContent("");
        toast({
          variant: "destructive",
          title: "File Error",
          description: (error as Error).message,
        });
        setIsProcessing(false);
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

    setIsProcessing(true);
    setProgress(0);

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const jsonData = JSON.parse(jsonText);
      const jsonlOutput = convertToJSONL(jsonData);
      setOutputContent(jsonlOutput);
      setProgress(100);
      toast({
        title: "Conversion Successful",
        description: "JSON has been converted to JSONL successfully.",
        variant: "default",
      });
    } catch (error) {
      setOutputContent("");
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description:
          (error as Error).message || "An error occurred during conversion.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Download output as a .jsonl file.
  const downloadOutputFile = () => {
    if (!outputContent) return;
    const blob = new Blob([outputContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-${Date.now()}.jsonl`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "Your JSONL file is being downloaded.",
      variant: "default",
    });
  };

  // Copy output content to clipboard.
  const copyToClipboard = async () => {
    if (!outputContent) return;
    if (outputContent.length > MAX_SAFE_SIZE) {
      toast({
        variant: "destructive",
        title: "Cannot Copy",
        description:
          "Output is too large to be copied. Please download instead.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(outputContent);
      toast({
        title: "Copied to Clipboard",
        description: "JSONL copied successfully.",
        variant: "default",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy the JSONL output.",
      });
    }
  };

  return (
    <div
      className="container mx-auto sm:p-6 max-w-full rounded-lg relative"
      id="json-to-jsonl"
    >
      <Card className="sm:mb-2 bg-white border-0 shadow-none">
        <CardHeader className="pb-2 border-b border-slate-200">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[#edf6f9] flex items-center justify-center mr-3">
              <FileJson className="w-5 h-5 text-[#4a90a4]" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                JSON to JSONL Converter
              </CardTitle>
              <CardDescription className="text-slate-700">
                Convert your JSON files to JSON Lines format quickly and
                efficiently.
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
                    ? "border-[#4a90a4] bg-[#edf6f9]/30"
                    : "border-slate-400 bg-[#edf6f9]/10 hover:border-[#4a90a4] hover:bg-[#edf6f9]/20"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#edf6f9] bg-opacity-90 text-[#4a90a4] text-lg font-semibold rounded-lg">
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
                  className="text-slate-700 border-slate-300 hover:bg-slate-100"
                >
                  Clear
                </Button>
              </div>
              <div className="flex justify-between items-center bg-[#edf6f9]/20 p-3 rounded-lg border border-[#edf6f9] group hover:border-[#4a90a4] hover:bg-[#edf6f9]/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileJson className="h-5 w-5 text-[#4a90a4] flex-shrink-0" />
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
              className="w-full mt-2 rounded-lg border border-[#edf6f9] bg-white text-slate-800 p-3 shadow-sm focus:border-[#4a90a4] focus:ring-[#4a90a4] focus:ring-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              onClick={processInput}
              disabled={(!file && !pastedInput.trim()) || isProcessing}
              className="w-full bg-[#4a90a4] hover:bg-[#4a90a4]/90 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-medium"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Processing ({progress}%)
                </>
              ) : (
                "Convert to JSONL"
              )}
            </Button>
            <Button
              onClick={downloadOutputFile}
              disabled={!outputContent}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white shadow-md h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Result
            </Button>
          </div>

          {outputContent && (
            <div className="mt-8 bg-[#edf6f9]/10 rounded-lg border border-[#edf6f9] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-[#edf6f9] bg-white">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4a90a4] mr-2" />
                  JSONL Output
                  {outputContent.length > MAX_SAFE_SIZE && (
                    <span className="ml-2 text-sm font-normal text-slate-600">
                      (Large file - rendering optimized)
                    </span>
                  )}
                </h3>
                <div className="flex gap-2">
                  {outputContent.length <= MAX_SAFE_SIZE ? (
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
                    onClick={downloadOutputFile}
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
                <pre className="text-sm text-slate-800 whitespace-pre-wrap break-words max-h-96 overflow-auto p-4 bg-white rounded-lg border border-[#edf6f9]">
                  {outputContent.length > MAX_SAFE_SIZE
                    ? "Content too large to display safely. You can download the file using the button above."
                    : outputContent}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonToJsonlConverter;
