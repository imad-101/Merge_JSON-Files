"use client";

import React, { useState, useEffect } from "react";
import { Upload, Trash2, Copy } from "lucide-react";
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

// Deep merge function for JSON objects
const deepMerge = (
  target: Record<string, unknown>,
  source: Record<string, unknown>
): void => {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) target[key] = {};
      deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else if (Array.isArray(source[key])) {
      target[key] = [
        ...((target[key] as unknown[]) || []),
        ...(source[key] as unknown[]),
      ];
    } else {
      target[key] = source[key];
    }
  }
};

const JsonMerger = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedContent, setMergedContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    toast({
      title: "Files Added",
      description: `Successfully added ${acceptedFiles.length} file(s).`,
    });
  };

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer?.files) {
        handleFileUpload(Array.from(event.dataTransfer.files));
      }
    };

    const handleDragLeave = (event: DragEvent) => {
      if (event.relatedTarget === null) {
        setIsDragging(false);
      }
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);
    document.addEventListener("dragleave", handleDragLeave);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  const removeFile = (index: number) => {
    const fileName = files[index].name;
    setFiles(files.filter((_, i) => i !== index));
    toast({
      title: "File Removed",
      description: `Removed ${fileName} from the list.`,
    });
  };

  const resetFiles = () => {
    setFiles([]);
    setMergedContent("");
    toast({
      title: "Reset Complete",
      description: "All files and merged content have been cleared.",
    });
  };

  const mergeFiles = async () => {
    try {
      if (files.length === 0) {
        toast({
          variant: "destructive",
          title: "No Files Selected",
          description: "Please upload at least one JSON file to merge.",
        });
        return;
      }

      const fileContents = await Promise.all(files.map((file) => file.text()));
      const jsonObjects = fileContents.map((content) => JSON.parse(content));

      const mergedObject = {};
      jsonObjects.forEach((obj) => deepMerge(mergedObject, obj));

      setMergedContent(JSON.stringify(mergedObject, null, 2));
      toast({
        title: "Merge Successful",
        description: `Successfully merged ${files.length} JSON file(s).`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Merge Failed",
        description: "Error processing files. Ensure all files are valid JSON.",
      });
      setMergedContent("");
    }
  };

  const downloadMergedFile = () => {
    if (!mergedContent) return;
    try {
      const blob = new Blob([mergedContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Download Started",
        description: "Your merged JSON file is being downloaded.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download the merged JSON file.",
      });
    }
  };

  const copyToClipboard = async () => {
    if (!mergedContent) return;
    try {
      await navigator.clipboard.writeText(mergedContent);
      toast({
        title: "Copied to Clipboard",
        description: "Merged JSON content has been copied to your clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
      });
    }
  };

  return (
    <div
      className={`container mx-auto p-3 sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative ${
        isDragging ? "backdrop-blur-md bg-gray-900" : ""
      }`}
    >
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 text-white text-lg font-semibold rounded-xl">
          Drop your files here
        </div>
      )}
      <Card className="mb-4 sm:mb-8 bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>JSON File Merger</CardTitle>
          <CardDescription className="text-gray-300">
            Upload multiple JSON files and merge them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dropzone
            onDrop={handleFileUpload}
            accept={{ "application/json": [".json"] }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-gray-900 hover:border-gray-100 transition"
              >
                <input {...getInputProps()} />
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
                  className="flex justify-between bg-gray-800 p-2 rounded-md"
                >
                  <span className="text-sm text-gray-200">{file.name}</span>
                  <Trash2
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    onClick={() => removeFile(index)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <Button
              onClick={mergeFiles}
              disabled={files.length === 0}
              className="w-full bg-gray-300 text-gray-900 disabled:bg-gray-300 disabled:text-black hover:bg-gray-100"
            >
              Merge Files
            </Button>
            <Button
              onClick={downloadMergedFile}
              disabled={!mergedContent}
              variant="outline"
              className="w-full text-gray-900 border-gray-800 disabled:text-black bg-gray-300 hover:bg-gray-100"
            >
              Download
            </Button>
          </div>

          {mergedContent && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-200">
                  Merged JSON:
                </h3>
                <Copy
                  className="h-5 w-5 text-gray-300 cursor-pointer hover:text-gray-100"
                  onClick={copyToClipboard}
                />
              </div>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                {mergedContent}
              </pre>
              <Button
                onClick={resetFiles}
                variant="outline"
                className="mt-4 w-full text-red-600 hover:bg-red-100"
              >
                Reset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonMerger;
