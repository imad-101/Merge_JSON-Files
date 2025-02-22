"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Copy, Download, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SAMPLE_JSON = JSON.stringify(
  [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com" },
  ],
  null,
  2
);

const SAMPLE_JSONL = [
  JSON.stringify({ id: 1, name: "John Doe", email: "john@example.com" }),
  JSON.stringify({ id: 2, name: "Jane Smith", email: "jane@example.com" }),
  JSON.stringify({ id: 3, name: "Bob Wilson", email: "bob@example.com" }),
].join("\n");

export default function Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isJsonToJsonl, setIsJsonToJsonl] = useState(true);
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
    accept: isJsonToJsonl
      ? { "application/json": [".json"] }
      : { "text/plain": [".jsonl"] },
  });

  const convert = () => {
    try {
      if (isJsonToJsonl) {
        const jsonObj = JSON.parse(input);
        const jsonl = Array.isArray(jsonObj)
          ? jsonObj.map((item) => JSON.stringify(item)).join("\n")
          : JSON.stringify(jsonObj);
        setOutput(jsonl);
        toast({
          title: "Conversion successful",
          description: "Converted to JSONL format",
        });
      } else {
        const lines = input.split("\n").filter((line) => line.trim() !== "");
        const jsonArray = lines.map((line) => JSON.parse(line));
        const json = JSON.stringify(jsonArray, null, 2);
        setOutput(json);
        toast({
          title: "Conversion successful",
          description: "Converted to JSON format",
        });
      }
    } catch {
      toast({
        title: "Conversion failed",
        description: isJsonToJsonl
          ? "Invalid JSON format"
          : "Invalid JSONL format",
        variant: "destructive",
      });
    }
  };

  const loadSample = () => {
    setInput(isJsonToJsonl ? SAMPLE_JSON : SAMPLE_JSONL);
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
    const extension = isJsonToJsonl ? "jsonl" : "json";
    const filename = `output.${extension}`;
    const blob = new Blob([output], {
      type: isJsonToJsonl ? "text/plain" : "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    toast({
      title: "Download Started",
      description: `The file is being downloaded as ${filename}`,
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
          <div className="flex gap-2">
            <Button
              className={`${
                isJsonToJsonl
                  ? "bg-gray-700 hover:bg-gray-700"
                  : "bg-gray-900 hover:bg-gray-900"
              } `}
              onClick={() => setIsJsonToJsonl(true)}
            >
              JSON to JSONL
            </Button>
            <Button
              className={`${
                !isJsonToJsonl
                  ? "bg-gray-700 hover:bg-gray-700"
                  : "bg-gray-900 hover:bg-gray-900"
              } `}
              onClick={() => setIsJsonToJsonl(false)}
            >
              JSONL to JSON
            </Button>
          </div>

          <h1 className="text-2xl font-bold text-gray-200">
            {isJsonToJsonl
              ? "JSON to JSONL Converter"
              : "JSONL to JSON Converter"}
          </h1>
          <p className="text-gray-300">
            {isJsonToJsonl
              ? "Convert JSON arrays to JSONL format easily."
              : "Convert JSONL format to JSON arrays easily."}
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
                : `Drag & drop a ${
                    isJsonToJsonl ? "JSON" : "JSONL"
                  } file here, or click to upload`}
            </p>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 rounded-lg bg-gray-900 border border-gray-500 p-4 font-mono text-sm resize-none focus:outline-none"
            placeholder={
              isJsonToJsonl ? "Enter JSON here..." : "Enter JSONL here..."
            }
          />

          <div className="buttons flex flex-col gap-3 sm:flex-row ">
            <Button
              onClick={loadSample}
              className="bg-gray-300 hover:bg-gray-100 text-gray-700 flex-1"
            >
              Load Sample {isJsonToJsonl ? "JSON" : "JSONL"}
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
