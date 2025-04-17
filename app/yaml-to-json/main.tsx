"use client";

import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { Upload, Trash2, Copy, Loader, Download } from "lucide-react";
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
import * as yaml from "js-yaml"; // Import the yaml library

const MAX_SAFE_SIZE = 1e6; // 1 million characters

// Function to convert YAML to JSON
const convertToJSON = (data: any): string => {
  return JSON.stringify(data, null, 2); // Convert to pretty JSON format
};

const YamlToJsonConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pastedInput, setPastedInput] = useState<string>("");
  const [outputContent, setOutputContent] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const handleFileUpload = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast({
          variant: "destructive",
          title: "Multiple Files Detected",
          description: "Please upload only one YAML file.",
        });
        return;
      }
      setFile(acceptedFiles[0]);
      setPastedInput(""); // Clear pasted input to use file content
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
    setOutputContent("");
  };

  const resetInputs = () => {
    setFile(null);
    setPastedInput("");
    setOutputContent("");
    setProgress(0);
    toast({
      title: "Reset Complete",
      description: "All fields have been reset to their default values.",
    });
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
              yaml.load(result); // Validate YAML syntax
              resolve(result);
            } catch (err) {
              reject(
                new Error(
                  `Invalid YAML in ${file.name}: ${(err as Error).message}`
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

  // Handle pasted YAML input
  const handlePastedInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPastedInput(e.target.value);
    setFile(null); // Clear file input so pasted takes priority
  };

  // Process input (from file or pasted text) and convert to JSON
  const processInput = async () => {
    let yamlText = "";
    if (pastedInput.trim()) {
      yamlText = pastedInput;
    } else if (file) {
      try {
        yamlText = await readFileInChunks(file);
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
        description: "Please either upload a file or paste YAML text.",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const yamlData = yaml.load(yamlText); // Parse the YAML
      const jsonOutput = convertToJSON(yamlData);
      setOutputContent(jsonOutput);
      setProgress(100);
      toast({
        title: "Conversion Successful",
        description: "YAML has been converted to JSON successfully.",
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

  // Download output as a .json file.
  const downloadOutputFile = () => {
    if (!outputContent) return;
    const blob = new Blob([outputContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "Your JSON file is being downloaded.",
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
        description: "JSON copied successfully.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy the JSON output.",
      });
    }
  };

  return (
    <div
      className="container mx-auto sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-7xl rounded-lg relative"
      id="yaml-to-json"
    >
      <Card className="sm:mb-2 bg-gray-950 text-white">
        <CardHeader>
          <CardTitle>YAML to JSON Converter</CardTitle>
          <CardDescription className="text-gray-100">
            Convert your YAML files to JSON format quickly and efficiently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Dropzone for file upload */}
          <Dropzone
            onDrop={handleFileUpload}
            accept={{ "application/x-yaml": [".yaml", ".yml"] }}
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

          {/* Pasted YAML input */}
          <div className="mt-6">
            <Label className="text-gray-300">Or Paste YAML Here</Label>
            <textarea
              value={pastedInput}
              onChange={handlePastedInputChange}
              placeholder="Paste your YAML text here..."
              rows={6}
              className="w-full rounded-md border-gray-300 bg-gray-800 text-gray-200 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              onClick={processInput}
              disabled={(!file && !pastedInput.trim()) || isProcessing}
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Processing ({progress}%)
                </>
              ) : (
                "Convert to JSON"
              )}
            </Button>
            <Button
              onClick={downloadOutputFile}
              disabled={!outputContent}
              className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100"
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>

          {outputContent && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-200">
                  JSON Output{" "}
                  {outputContent.length > MAX_SAFE_SIZE &&
                    "(Large file - output optimized)"}
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
                  {outputContent.length > MAX_SAFE_SIZE ? (
                    <p className="text-sm text-gray-400">
                      Output is too large to copy. Please download.
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
                {outputContent.length > MAX_SAFE_SIZE
                  ? "Output is too large to display. Please download the file."
                  : outputContent}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default YamlToJsonConverter;
