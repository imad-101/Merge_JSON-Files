"use client";
import { useState, useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, Loader2, Info } from "lucide-react";
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
type SplitMethod = "item" | "size";

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [chunkSize, setChunkSize] = useState<number>(2);
  const [maxSizeMB, setMaxSizeMB] = useState<number>(1);
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("item");
  const [targetPath, setTargetPath] = useState<string>("");
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      setFileName(file.name);

      reader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const fileContent = event.target?.result as string;
          const parsedJson = JSON.parse(fileContent);
          setJsonInput(JSON.stringify(parsedJson, null, 2));
          toast({
            title: "File loaded successfully",
            description: "JSON is valid and ready to process.",
          });
        } catch {
          toast({
            variant: "destructive",
            title: "Invalid JSON File",
            description: "The uploaded file contains invalid JSON.",
          });
          setFileName("");
        }
      };

      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "Error loading file",
          description: "Could not read the file contents.",
        });
        setFileName("");
      };

      reader.readAsText(file);
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/json": [".json"] },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
  });

  const validateInput = () => {
    if (!jsonInput.trim()) throw new Error("Please provide JSON input.");

    try {
      JSON.parse(jsonInput);
    } catch {
      throw new Error("Invalid JSON format in input.");
    }

    if (splitMethod === "item") {
      if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
        throw new Error("Item count must be ≥1");
      }
    } else {
      if (isNaN(maxSizeMB)) throw new Error("Invalid size value");
      if (maxSizeMB < 0.1 || maxSizeMB > 10) {
        throw new Error("Size must be between 0.1MB and 10MB");
      }
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => {
      const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
      if (arrayMatch) {
        const arrName = arrayMatch[1];
        const index = parseInt(arrayMatch[2], 10);
        return acc?.[arrName]?.[index];
      }
      return acc?.[part];
    }, obj);
  };

  const splitArray = (arr: any[], method: SplitMethod, size: number) => {
    const result = [];
    if (method === "item") {
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
    } else {
      const maxBytes = size * 1024 * 1024;
      let currentChunk: any[] = [];
      let currentSize = 0;

      for (const item of arr) {
        const itemSize = new Blob([JSON.stringify(item)]).size;
        if (currentSize + itemSize > maxBytes && currentChunk.length > 0) {
          result.push(currentChunk);
          currentChunk = [];
          currentSize = 0;
        }
        currentChunk.push(item);
        currentSize += itemSize;
      }
      if (currentChunk.length > 0) result.push(currentChunk);
    }
    return result;
  };

  const splitJson = async () => {
    setIsProcessing(true);
    try {
      validateInput();
      const parsedData = JSON.parse(jsonInput);
      let targetArray = parsedData;

      if (targetPath) {
        targetArray = getNestedValue(parsedData, targetPath);
        if (!Array.isArray(targetArray)) {
          throw new Error(`Path '${targetPath}' does not point to an array`);
        }
      } else if (!Array.isArray(parsedData)) {
        throw new Error(
          "Root element must be an array when no path is specified"
        );
      }

      const result = splitArray(
        targetArray,
        splitMethod,
        splitMethod === "item" ? chunkSize : maxSizeMB
      );

      setChunks(result);
      toast({
        title: `Created ${result.length} chunks`,
        description: `Split ${targetPath || "root array"} using ${
          splitMethod === "item"
            ? `${chunkSize} items/chunk`
            : `${maxSizeMB}MB limit`
        }`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: err instanceof Error ? err.message : "Invalid operation",
      });
      setChunks([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const loadArraySample = () => {
    const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    setJsonInput(JSON.stringify(sampleData, null, 2));
    setFileName("sample-array.json");
    setTargetPath("");
    setChunkSize(3);
    setChunks([]);
    toast({
      title: "Array Sample Loaded",
      description: "Loaded sample array data",
    });
  };

  const loadObjectSample = () => {
    const sampleData = {
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ],
    };
    setJsonInput(JSON.stringify(sampleData, null, 2));
    setFileName("sample-object.json");
    setTargetPath("users");
    setChunkSize(2);
    setChunks([]);
    toast({
      title: "Object Sample Loaded",
      description: "Loaded sample object with nested array",
    });
  };

  const loadComplexSample = () => {
    const sampleData = {
      result: [
        "repeat(1,2)",
        {
          nestedArray: Array.from({ length: 10 }, (_, i) => ({ id: i + 1 })),
        },
      ],
    };
    setJsonInput(JSON.stringify(sampleData, null, 2));
    setFileName("sample-complex.json");
    setTargetPath("result.1.nestedArray");
    setChunkSize(3);
    setChunks([]);
    toast({
      title: "Complex Sample Loaded",
      description: "Loaded complex nested sample data",
    });
  };

  const resetState = () => {
    setJsonInput("");
    setFileName("");
    setChunkSize(2);
    setMaxSizeMB(1);
    setSplitMethod("item");
    setTargetPath("");
    setChunks([]);
    toast({
      title: "Reset Complete",
      description: "All fields have been reset to default values.",
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "JSON chunk copied successfully.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
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
        description: `Chunk ${index + 1} downloaded successfully.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download chunk.",
      });
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative">
      <Card className="bg-gray-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-200">
            Universal JSON Splitter
          </CardTitle>
          <CardDescription className="text-gray-300">
            Split any JSON structure including deep nested arrays
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
                JSON Input {fileName && `(${fileName})`}
              </Label>
              <Textarea
                id="jsonInput"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
                placeholder="Enter JSON array or object here..."
                className="mt-2 border-gray-400 placeholder:text-gray-400 text-gray-200 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="splitMethod" className="text-gray-200 mb-1">
                  Split Method:
                </Label>
                <select
                  id="splitMethod"
                  value={splitMethod}
                  onChange={(e) =>
                    setSplitMethod(e.target.value as SplitMethod)
                  }
                  className=" border-gray-400 text-gray-200 bg-gray-800 rounded p-2 w-full "
                >
                  <option value="item">By Item Count</option>
                  <option value="size">By File Size (MB)</option>
                </select>
              </div>

              <div>
                <Label
                  htmlFor="targetPath"
                  className="text-gray-200 flex items-center gap-1"
                >
                  Target Path (Optional , only for very complex JSON files)
                  <span
                    className="cursor-help "
                    title="Use dot notation for nested arrays. Example: 'users[0].contacts'. Array indexes supported with [n] syntax."
                  >
                    <Info size={16} />
                  </span>
                </Label>
                <Input
                  id="targetPath"
                  value={targetPath}
                  onChange={(e) => setTargetPath(e.target.value)}
                  placeholder="path.to.array"
                  className="  text-gray-200 bg-gray-800 rounded mt-2 border-none"
                />
              </div>
            </div>

            {splitMethod === "item" ? (
              <div>
                <Label htmlFor="chunkSize" className="text-gray-200">
                  Items per Chunk:
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
                  className="mt-2 text-gray-200 border-none bg-gray-800"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="maxSizeMB" className="text-gray-200">
                  Max Chunk Size (MB):
                </Label>
                <Input
                  id="maxSizeMB"
                  type="number"
                  value={maxSizeMB}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setMaxSizeMB(Math.max(0.1, isNaN(value) ? 1 : value));
                  }}
                  min="0.1"
                  step="0.1"
                  className="mt-2 text-gray-200 border-gray-400"
                />
              </div>
            )}

            {!jsonInput ? (
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  onClick={loadArraySample}
                  variant="outline"
                  className="w-full bg-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  Load Array Sample
                </Button>
                <Button
                  onClick={loadObjectSample}
                  variant="outline"
                  className="w-full bg-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  Load Object Sample
                </Button>
                <Button
                  onClick={loadComplexSample}
                  variant="outline"
                  className="w-full bg-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  Load Complex Sample
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  onClick={splitJson}
                  disabled={isProcessing}
                  className="w-full bg-gray-200 hover:bg-gray-100 text-gray-700"
                >
                  {isProcessing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Split JSON"
                  )}
                </Button>
                <Button
                  onClick={resetState}
                  variant="outline"
                  className="w-full bg-gray-300 hover:bg-red-50 text-red-700"
                >
                  Reset
                </Button>
              </div>
            )}

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
