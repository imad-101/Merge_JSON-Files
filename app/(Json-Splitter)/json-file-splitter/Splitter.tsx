"use client";
import { useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Chunk = Array<unknown> | Record<string, unknown>;

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [chunkSize, setChunkSize] = useState<number>(2);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const { toast } = useToast();

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContent = event.target?.result as string;
      setJsonInput(fileContent);
      toast({
        title: "File loaded successfully",
        description:
          "Your JSON file has been loaded and is ready to be processed.",
      });
    };

    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Error loading file",
        description: "Please ensure it is a valid JSON file.",
      });
    };

    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/json": [".json"] },
  });

  const validateInput = () => {
    if (!jsonInput.trim()) {
      throw new Error("Input field is empty. Please provide a JSON input.");
    }

    if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
      throw new Error("Chunk size must be a positive integer.");
    }
  };

  const splitJson = () => {
    try {
      validateInput();
      const parsedData = JSON.parse(jsonInput);

      if (!Array.isArray(parsedData) && typeof parsedData !== "object") {
        throw new Error("Input must be a JSON array or object.");
      }

      const result: Chunk[] = [];

      if (Array.isArray(parsedData)) {
        for (let i = 0; i < parsedData.length; i += chunkSize) {
          result.push(parsedData.slice(i, i + chunkSize));
        }
      } else {
        const keys = Object.keys(parsedData);
        for (let i = 0; i < keys.length; i += chunkSize) {
          result.push(
            Object.fromEntries(
              keys.slice(i, i + chunkSize).map((key) => [key, parsedData[key]])
            )
          );
        }
      }

      setChunks(result);
      toast({
        title: "JSON Split Successfully",
        description: `Created ${result.length} chunks from your JSON data.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error splitting JSON",
        description: err instanceof Error ? err.message : "Invalid JSON input",
      });
      setChunks([]);
    }
  };

  const loadSampleData = (type: "array" | "object" = "object") => {
    const sampleData = {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      object: {
        name: "John Doe",
        age: 30,
        city: "New York",
        country: "USA",
        occupation: "Developer",
        hobbies: ["reading", "coding", "gaming"],
      },
    };

    setJsonInput(JSON.stringify(sampleData[type], null, 2));
    setChunkSize(2);
    setChunks([]);
    toast({
      title: "Sample Data Loaded",
      description: `Loaded sample ${type} data into the editor.`,
    });
  };

  const resetState = () => {
    setJsonInput("");
    setChunkSize(2);
    setChunks([]);
    toast({
      title: "Reset Complete",
      description: "All fields have been reset to their default values.",
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "The JSON chunk has been copied to your clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy JSON chunk to clipboard.",
      });
    }
  };

  const downloadChunk = (chunk: Chunk, index: number) => {
    try {
      const blob = new Blob([JSON.stringify(chunk, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `chunk_${index + 1}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({
        title: "Download Started",
        description: `Chunk ${index + 1} is being downloaded as JSON file.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download the JSON chunk.",
      });
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative">
      <Card className="bg-gray-900">
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
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                isDragActive
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-gray-400 hover:border-gray-100"
              }`}
            >
              <input {...getInputProps()} />
              <UploadCloud
                size={32}
                className={`mx-auto mb-3 ${
                  isDragActive ? "text-blue-400" : "text-gray-400"
                }`}
              />
              <p className="text-gray-400">
                {isDragActive
                  ? "Drop the JSON file here"
                  : "Drag & drop a JSON file here, or click to upload"}
              </p>
            </div>

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
                className="mt-2 border-gray-400 placeholder:text-gray-400 text-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="chunkSize" className="text-gray-200">
                Chunk Size:
              </Label>
              <Input
                id="chunkSize"
                type="number"
                value={chunkSize}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setChunkSize(Math.max(1, isNaN(value) ? 1 : value));
                }}
                min="1"
                className="mt-2 text-gray-200 border-gray-400"
              />
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                onClick={splitJson}
                className="w-full bg-gray-200 hover:bg-gray-100 text-gray-700"
              >
                Split JSON
              </Button>
              <Button
                onClick={() => loadSampleData("object")}
                variant="outline"
                className="w-full bg-gray-300 hover:bg-gray-100 text-gray-700"
              >
                Load Object Sample
              </Button>
              <Button
                onClick={() => loadSampleData("array")}
                variant="outline"
                className="w-full bg-gray-300 hover:bg-gray-100 text-gray-700"
              >
                Load Array Sample
              </Button>
              <Button
                onClick={resetState}
                variant="outline"
                className="w-full bg-gray-300 hover:bg-red-50 text-red-700"
              >
                Reset
              </Button>
            </div>

            {chunks.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-200">
                  Result: {chunks.length} chunks created
                </h2>
                {chunks.map((chunk, index) => (
                  <Card key={index} className="bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-200">
                        Chunk {index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-200">
                        {JSON.stringify(chunk, null, 2)}
                      </pre>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          onClick={() =>
                            copyToClipboard(JSON.stringify(chunk, null, 2))
                          }
                          className=" bg-gray-300 hover:bg-gray-100 text-gray-700"
                        >
                          Copy
                        </Button>
                        <Button
                          onClick={() => downloadChunk(chunk, index)}
                          className=" bg-gray-300 hover:bg-gray-100 text-gray-700"
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
