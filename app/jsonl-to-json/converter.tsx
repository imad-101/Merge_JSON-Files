"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Copy, Download, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SAMPLE_DATA = `{"id": 1, "name": "John Doe", "email": "john@example.com"}
{"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
{"id": 3, "name": "Bob Wilson", "email": "bob@example.com"}`;

export default function Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/jsonl": [".jsonl", ".ndjson"] },
  });

  const convert = () => {
    try {
      const jsonArray = input
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => JSON.parse(line));

      const jsonOutput = JSON.stringify(jsonArray, null, 2);
      setOutput(jsonOutput);
      toast({
        title: "Conversion successful",
        description: "Converted to JSON format",
      });
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion failed",
        description: "Invalid JSONL format",
        variant: "destructive",
      });
    }
  };

  const loadSample = () => {
    setInput(SAMPLE_DATA);
    setOutput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to Clipboard",
      description: "The converted content has been copied.",
    });
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.json";
    link.click();
    toast({
      title: "Download Started",
      description: "The file is being downloaded as output.json",
    });
  };

  const clearInput = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="mx-5">
      <div className="max-w-6xl bg-gray-900 text-gray-200 mx-auto py-8 rounded-xl">
        <div className="mx-auto px-7 space-y-6">
          <h1 className="text-2xl font-bold text-gray-200">
            JSONL to JSON Converter
          </h1>
          <p className="text-gray-300">
            Convert JSONL format to JSON array easily.
          </p>

          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-700 hover:border-gray-400 rounded-lg p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 text-gray-400 mb-4" />
            <p className="text-gray-400">
              {isDragActive
                ? "Drop your file here..."
                : "Drag & drop a JSONL file here, or click to upload"}
            </p>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 rounded-lg bg-gray-900 border border-gray-500 p-4 font-mono text-sm resize-none focus:outline-none"
            placeholder="Enter JSONL here..."
          />

          <div className="buttons flex flex-col gap-3 sm:flex-row ">
            <Button
              onClick={loadSample}
              className="bg-gray-300 hover:bg-gray-100 text-gray-700 flex-1"
            >
              Load Sample JSONL
            </Button>
            <Button
              onClick={convert}
              className="bg-gray-300 hover:bg-gray-100 text-gray-700 flex-1"
            >
              Convert
            </Button>
            <Button
              onClick={clearInput}
              className="bg-gray-300 hover:bg-gray-100 text-red-700 flex-1"
            >
              <Trash className="mr-2" /> Clear
            </Button>
          </div>

          {output && (
            <div className="space-y-2">
              <label className="text-sm text-gray-200">Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-56 rounded-lg bg-gray-900 border border-gray-800 p-4 font-mono text-sm resize-none"
              />
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={copyToClipboard}
                  className="bg-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  <Copy className="mr-2" /> Copy
                </Button>
                <Button
                  onClick={downloadFile}
                  className="bg-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  <Download className="mr-2" /> Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
