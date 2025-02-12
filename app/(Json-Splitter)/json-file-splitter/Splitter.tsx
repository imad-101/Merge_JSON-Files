"use client";
import { useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type Chunk = Array<any> | Record<string, any>;

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [chunkSize, setChunkSize] = useState<number>(2);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [error, setError] = useState<string>("");
  const [copyMessage, setCopyMessage] = useState<string>(""); // For displaying copy success message

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const fileContent = event.target?.result as string;
        setJsonInput(fileContent);
        setError("");
      } catch (err) {
        setError("Error reading file. Please ensure it is a valid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
  });

  const splitJson = () => {
    try {
      // Validate if input is empty
      if (!jsonInput.trim()) {
        throw new Error("Input field is empty. Please provide a JSON input.");
      }

      // Validate chunk size
      if (chunkSize <= 0) {
        throw new Error("Chunk size must be a positive integer.");
      }

      // Parse the JSON input
      const parsedData = JSON.parse(jsonInput);

      // Check if the input is an array or object
      if (!Array.isArray(parsedData) && typeof parsedData !== "object") {
        throw new Error("Input must be a JSON array or object.");
      }

      let result: Chunk[] = [];

      if (Array.isArray(parsedData)) {
        // Split the array into chunks
        for (let i = 0; i < parsedData.length; i += chunkSize) {
          result.push(parsedData.slice(i, i + chunkSize));
        }
      } else if (typeof parsedData === "object") {
        // Split the object into chunks
        const keys = Object.keys(parsedData);
        for (let i = 0; i < keys.length; i += chunkSize) {
          const chunkKeys = keys.slice(i, i + chunkSize);
          const chunk: Record<string, any> = {};
          chunkKeys.forEach((key) => {
            chunk[key] = parsedData[key];
          });
          result.push(chunk);
        }
      }

      // Update the state with the chunks
      setChunks(result);
      setError("");
    } catch (err) {
      setError(
        `Error: ${err instanceof Error ? err.message : "Invalid JSON input"}`
      );
      setChunks([]);
    }
  };

  const loadSampleData = () => {
    const sampleData = {
      arraySample: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      objectSample: {
        name: "John Doe",
        age: 30,
        city: "New York",
        country: "USA",
        occupation: "Developer",
        hobbies: ["reading", "coding", "gaming"],
      },
    };

    setJsonInput(JSON.stringify(sampleData.objectSample, null, 2)); // Default to object sample
    setChunkSize(2);
    setError("");
    setChunks([]);
  };

  const resetState = () => {
    setJsonInput("");
    setChunkSize(2);
    setChunks([]);
    setError("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyMessage("Copied to clipboard!"); // Set success message
        setTimeout(() => setCopyMessage(""), 2000); // Clear message after 2 seconds
      })
      .catch(() => {
        setCopyMessage("Failed to copy!"); // Set error message
        setTimeout(() => setCopyMessage(""), 2000); // Clear message after 2 seconds
      });
  };

  const downloadChunk = (chunk: Chunk, index: number) => {
    const blob = new Blob([JSON.stringify(chunk, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chunk_${index + 1}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-200">
            JSON Splitter Tool
          </CardTitle>
          <CardDescription className="text-gray-300">
            Split Any JSON File Into Smaller Chunks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Drag-and-drop file upload */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">
                Drag & drop a JSON file here, or click to upload
              </p>
            </div>

            {/* JSON Input */}
            <div>
              <Label htmlFor="jsonInput" className="text-gray-200">
                JSON Input (Array or Object):
              </Label>
              <Textarea
                id="jsonInput"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
                placeholder="Enter JSON array or object here..."
                className="mt-2 placeholder:text-gray-400 text-gray-200"
              />
            </div>

            {/* Chunk Size Input */}
            <div>
              <Label htmlFor="chunkSize" className="text-gray-200">
                Chunk Size:
              </Label>
              <Input
                id="chunkSize"
                type="number"
                value={chunkSize}
                onChange={(e) =>
                  setChunkSize(Math.max(1, Number(e.target.value)))
                }
                min="1"
                className="mt-2 text-gray-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-10">
              <Button
                onClick={splitJson}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Split JSON
              </Button>
              <Button
                onClick={loadSampleData}
                variant="outline"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Load Sample Data
              </Button>
              <Button
                onClick={resetState}
                variant="outline"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Reset
              </Button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Copy Success Message */}
            {copyMessage && (
              <p className="text-green-500 text-sm">{copyMessage}</p>
            )}

            {/* Result */}
            {chunks.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-200">Result:</h2>
                {chunks.map((chunk, index) => (
                  <Card key={index} className="bg-gray-200">
                    <CardHeader>
                      <CardTitle>Chunk {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-300 p-4 rounded-lg">
                        {JSON.stringify(chunk, null, 2)}
                      </pre>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          onClick={() =>
                            copyToClipboard(JSON.stringify(chunk, null, 2))
                          }
                          className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                        >
                          Copy
                        </Button>
                        <Button
                          onClick={() => downloadChunk(chunk, index)}
                          className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                        >
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
