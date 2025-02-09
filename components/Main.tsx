"use client";

import React, { useState, useEffect } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setError("");
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
    setFiles(files.filter((_, i) => i !== index));
  };

  const resetFiles = () => {
    setFiles([]);
    setMergedContent("");
    setError("");
  };

  const mergeFiles = async () => {
    try {
      if (files.length === 0) {
        setError("No files selected.");
        return;
      }

      const fileContents = await Promise.all(files.map((file) => file.text()));
      const jsonObjects = fileContents.map((content) => JSON.parse(content));

      const mergedObject = {};
      jsonObjects.forEach((obj) => deepMerge(mergedObject, obj));

      setMergedContent(JSON.stringify(mergedObject, null, 2));
      setError("");
    } catch (error) {
      setError("Error processing files. Ensure all files are valid JSON.");
      setMergedContent("");
    }
  };

  const downloadMergedFile = () => {
    if (!mergedContent) return;
    const blob = new Blob([mergedContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`container mx-auto p-3 sm:p-6 max-w-[20rem] sm:max-w-xl md:max-w-6xl rounded-xl relative ${
        isDragging ? "backdrop-blur-md bg-gray-900/50" : ""
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
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer bg-gray-800 hover:bg-gray-700 transition"
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
              className="w-full bg-gray-800 hover:bg-gray-600"
            >
              Merge Files
            </Button>
            <Button
              onClick={downloadMergedFile}
              disabled={!mergedContent}
              variant="outline"
              className="w-full text-gray-800 border-gray-800 hover:bg-gray-300"
            >
              Download
            </Button>
          </div>

          {mergedContent && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-200">
                Merged JSON:
              </h3>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                {mergedContent}
              </pre>
              {/* Reset button appears only when merged content exists */}
              <Button
                onClick={resetFiles}
                variant="outline"
                className="mt-4 w-full text-red-600 border-red-500 border-dotted hover:bg-red-300 hover:text-white"
              >
                Reset
              </Button>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-500 p-3 rounded-md text-white">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonMerger;
