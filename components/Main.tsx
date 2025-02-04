"use client";

import React, { useState } from "react";
import { Upload, Trash2, Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dropzone from "react-dropzone";

const JsonMerger = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedContent, setMergedContent] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setError("");
    setMergedContent("");
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergeFiles = async () => {
    try {
      const mergedObject = {};
      for (const file of files) {
        const text = await file.text();
        const json = JSON.parse(text);
        Object.assign(mergedObject, json);
      }
      setMergedContent(JSON.stringify(mergedObject, null, 2));
      setError("");
    } catch (err) {
      setError("Error processing files. Ensure all files are valid JSON.");
      setMergedContent("");
    }
  };

  const clearAndRemerge = () => {
    setFiles([]);
    setMergedContent("");
    setError("");
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

  const copyToClipboard = () => {
    if (mergedContent) {
      navigator.clipboard.writeText(mergedContent);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl bg-gray-800 rounded-xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>JSON File Merger</CardTitle>
          <CardDescription>
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
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition"
              >
                <input {...getInputProps()} />
                <Upload className="h-8 w-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
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
                  className="flex justify-between bg-gray-50 p-2 rounded-md"
                >
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <Trash2
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    onClick={() => removeFile(index)}
                  />
                </div>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4 mt-4">
            <Button
              onClick={mergeFiles}
              disabled={files.length === 0}
              className="w-full bg-gray-800"
            >
              Merge Files
            </Button>
            <Button
              onClick={downloadMergedFile}
              disabled={!mergedContent}
              variant="outline"
              className="w-full"
            >
              Download
            </Button>
          </div>

          {mergedContent && (
            <div className="mt-4 relative">
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-gray-700">
                {mergedContent}
              </pre>
              <Button
                size="sm"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}

          {mergedContent && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={clearAndRemerge}
                className="bg-gray-800 hover:bg-gray-900 mt-10"
              >
                Merge Other Files
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonMerger;
