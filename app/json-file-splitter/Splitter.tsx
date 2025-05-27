"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdUnit from "@/components/AdUnit";
import {
  UploadCloud,
  Loader2,
  Info,
  Trash2,
  ChevronRight,
  FileJson,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Virtuoso } from "react-virtuoso";
import { Progress } from "@/components/ui/progress";

type Chunk = Array<unknown> | Record<string, unknown>;
type SplitMethod = "item" | "chunkCount" | "size";

export default function JSONSplitter() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [chunkSize, setChunkSize] = useState<number>(2);
  const [maxSizeValue, setMaxSizeValue] = useState<number>(1);
  const [sizeUnit, setSizeUnit] = useState<"B" | "KB" | "MB">("MB");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("item");
  const [targetPath, setTargetPath] = useState<string>("");
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { toast } = useToast();
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const workerCode = `
      self.onmessage = (event) => {
        const { jsonInput, splitMethod, chunkSize, maxSizeValue, sizeUnit, targetPath } = event.data;
        try {
          const json = JSON.parse(jsonInput);
          let target = json;
          if (targetPath) {
            const pathParts = targetPath.split('.');
            for (const part of pathParts) {
              if (part.includes('[')) {
                const [key, indexStr] = part.split('[');
                const index = parseInt(indexStr.replace(']', ''), 10);
                if (!target[key] || !Array.isArray(target[key]) || isNaN(index)) {
                  throw new Error('Invalid target path');
                }
                target = target[key][index];
              } else {
                if (!target[part]) {
                  throw new Error('Invalid target path');
                }
                target = target[part];
              }
            }
          }
          if (!Array.isArray(target)) {
            throw new Error('Target path does not point to an array');
          }
          const array = target;

          if (splitMethod === 'size') {
            const maxSize = maxSizeValue * (sizeUnit === 'KB' ? 1024 : sizeUnit === 'MB' ? 1024 * 1024 : 1);
            const maxItemSize = array.reduce((max, item) => Math.max(max, JSON.stringify(item).length), 0);
            if (maxItemSize > maxSize) {
              throw new Error('Some items exceed the maximum chunk size');
            }
          }

          let chunks;
          if (splitMethod === 'item') {
            chunks = splitByItems(array, chunkSize);
          } else if (splitMethod === 'chunkCount') {
            chunks = splitByChunkCount(array, chunkSize);
          } else if (splitMethod === 'size') {
            const maxSize = maxSizeValue * (sizeUnit === 'KB' ? 1024 : sizeUnit === 'MB' ? 1024 * 1024 : 1);
            chunks = splitBySize(array, maxSize);
          }

          self.postMessage({ chunks });
        } catch (error) {
          self.postMessage({ error: error.message });
        }
      };

      function splitByItems(array, itemsPerChunk) {
        const chunks = [];
        for (let i = 0; i < array.length; i += itemsPerChunk) {
          chunks.push(array.slice(i, i + itemsPerChunk));
          self.postMessage({ progress: (i / array.length) * 100 });
        }
        return chunks;
      }

      function splitByChunkCount(array, chunkCount) {
        const itemsPerChunk = Math.ceil(array.length / chunkCount);
        return splitByItems(array, itemsPerChunk);
      }

      function splitBySize(array, maxSize) {
        const chunks = [];
        let currentChunk = [];
        let currentSize = 2; // Account for []

        let processed = 0;
        for (const item of array) {
          const itemSize = JSON.stringify(item).length + 1; // +1 for comma
          if (currentSize + itemSize > maxSize && currentChunk.length > 0) {
            chunks.push(currentChunk);
            currentChunk = [item];
            currentSize = 2 + JSON.stringify(item).length;
          } else {
            currentChunk.push(item);
            currentSize += itemSize;
          }
          processed++;
          self.postMessage({ progress: (processed / array.length) * 100 });
        }
        if (currentChunk.length > 0) {
          chunks.push(currentChunk);
        }
        return chunks;
      }
    `;

    const worker = new Worker(
      URL.createObjectURL(
        new Blob([workerCode], { type: "application/javascript" })
      )
    );
    worker.onmessage = (event) => {
      if (event.data.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: event.data.error,
        });
        setIsProcessing(false);
      } else if (event.data.chunks) {
        setChunks(event.data.chunks);
        setIsProcessing(false);
        setCurrentStep(3);
        toast({ title: `Created ${event.data.chunks.length} chunks` });
      } else if (event.data.progress !== undefined) {
        setProgress(event.data.progress);
      }
    };
    workerRef.current = worker;
    return () => worker.terminate();
  }, [toast]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          JSON.parse(content); // Validate JSON
          setJsonInput(content);
          setFileName(file.name);
          setCurrentStep(2);
          toast({ title: "File loaded successfully" });
        } catch {
          toast({ variant: "destructive", title: "Invalid JSON" });
          setFileName("");
        }
      };

      reader.onerror = () => {
        toast({ variant: "destructive", title: "File read error" });
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
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  const validateInput = useCallback(() => {
    if (!jsonInput.trim()) {
      throw new Error("Please upload a JSON file");
    }
    try {
      JSON.parse(jsonInput);
    } catch {
      throw new Error("Invalid JSON format");
    }

    if (splitMethod === "chunkCount") {
      if (chunkSize < 1 || !Number.isInteger(chunkSize)) {
        throw new Error("Number of chunks must be a whole number ≥ 1");
      }
    }

    if (splitMethod === "item") {
      if (chunkSize < 1 || !Number.isInteger(chunkSize)) {
        throw new Error("Items per chunk must be a whole number ≥ 1");
      }
    }

    if (splitMethod === "size") {
      if (maxSizeValue <= 0) {
        throw new Error("Maximum size must be greater than 0");
      }
    }
  }, [jsonInput, splitMethod, chunkSize, maxSizeValue]);

  const splitJson = useCallback(() => {
    if (isProcessing) return; // Prevent multiple splits
    setIsProcessing(true);
    setProgress(0);
    try {
      validateInput();
      workerRef.current?.postMessage({
        jsonInput,
        splitMethod,
        chunkSize,
        maxSizeValue,
        sizeUnit,
        targetPath,
      });
    } catch (err: any) {
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: err.message,
      });
    }
  }, [
    jsonInput,
    splitMethod,
    chunkSize,
    maxSizeValue,
    sizeUnit,
    targetPath,
    validateInput,
    toast,
    isProcessing,
  ]);

  const resetState = () => {
    setJsonInput("");
    setFileName("");
    setChunks([]);
    setProgress(0);
    setCurrentStep(1);
    setIsProcessing(false);
    toast({ title: "Reset complete" });
  };

  const ChunkComponent = ({
    chunk,
    index,
  }: {
    chunk: Chunk;
    index: number;
  }) => (
    <Card className="bg-white mb-4 border border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-slate-800 flex flex-col sm:flex-row justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Chunk {index + 1}
            </span>
            <span className="text-slate-600 text-sm">
              {typeof chunk === "object" &&
                (Array.isArray(chunk)
                  ? `${chunk.length} items`
                  : `${Object.keys(chunk).length} properties`)}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(chunk, null, 2));
                toast({ title: `Copied chunk ${index + 1} to clipboard` });
              }}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Copy
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const blob = new Blob([JSON.stringify(chunk, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${fileName}_chunk_${index + 1}.json`;
                a.click();
                URL.revokeObjectURL(url);
                toast({ title: `Downloaded chunk ${index + 1}` });
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-slate-50 p-4 rounded-lg overflow-x-auto text-slate-800 text-sm max-h-[200px] border border-slate-200">
          {JSON.stringify(chunk, null, 2).slice(0, 1000)}
          {JSON.stringify(chunk, null, 2).length > 1000 && "..."}
        </pre>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto sm:p-6 max-w-7xl" id="split">
      <Card className="bg-white shadow-none border-none">
        <CardHeader className="pb-2  ">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
              <FileJson className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                JSON Splitter
                <span className="text-sm font-normal text-slate-600 ml-2 hidden sm:block">
                  Step {currentStep} of 3
                </span>
              </CardTitle>
              <CardDescription className="text-slate-700">
                Easily split large JSON files with intuitive controls and
                real-time preview
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Controls */}
            <div className="space-y-6">
              {/* Step 1: Upload */}
              {currentStep === 1 && (
                <div
                  {...getRootProps()}
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 cursor-pointer transition-all duration-200 ${
                    isDragActive
                      ? "border-green-500 bg-green-50"
                      : "border-slate-400 bg-slate-50 hover:border-green-400 hover:bg-slate-100"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-50 bg-opacity-90 text-green-700 text-lg font-semibold rounded-lg">
                      Drop JSON file here
                    </div>
                  )}
                  <UploadCloud className="h-12 w-12 mb-4 text-green-600" />
                  <p className="text-slate-800 font-medium mb-1">
                    Drag & drop JSON file or click to upload
                  </p>
                  <p className="text-sm text-slate-600">
                    Supports files up to 500MB
                  </p>
                </div>
              )}

              {/* Step 2: Configuration */}
              {currentStep >= 2 && (
                <div className="space-y-6">
                  <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium">
                        2
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Split Configuration
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-700 mb-2 block flex items-center gap-2">
                          Split Method
                          <Info className="text-slate-500" size={16} />
                        </Label>
                        <select
                          value={splitMethod}
                          onChange={(e) =>
                            setSplitMethod(e.target.value as SplitMethod)
                          }
                          className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        >
                          <option value="item">Items Per Chunk</option>
                          <option value="chunkCount">Number of Chunks</option>
                          <option value="size">Maximum File Size</option>
                        </select>
                      </div>

                      {splitMethod === "size" ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-700 mb-2 block">
                              Maximum Chunk Size
                            </Label>
                            <div className="flex gap-3">
                              <Input
                                type="number"
                                value={maxSizeValue}
                                onChange={(e) =>
                                  setMaxSizeValue(
                                    Math.max(0.1, Number(e.target.value))
                                  )
                                }
                                className="bg-white border-slate-300 text-slate-800 focus:border-green-400 focus:ring-green-400"
                                step="0.1"
                                min="0.1"
                              />
                              <select
                                value={sizeUnit}
                                onChange={(e) =>
                                  setSizeUnit(
                                    e.target.value as "B" | "KB" | "MB"
                                  )
                                }
                                className="bg-white border-slate-300 text-slate-800 rounded-lg px-4 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                              >
                                <option value="B">Bytes</option>
                                <option value="KB">KB</option>
                                <option value="MB">MB</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Label className="text-slate-700 mb-2 block">
                            {splitMethod === "item"
                              ? "Items Per Chunk"
                              : "Number of Chunks"}
                          </Label>
                          <Input
                            type="number"
                            value={chunkSize}
                            onChange={(e) =>
                              setChunkSize(Math.max(1, Number(e.target.value)))
                            }
                            className="bg-white border-slate-300 text-slate-800 focus:border-green-400 focus:ring-green-400"
                            min="1"
                            step="1"
                          />
                        </div>
                      )}

                      <div>
                        <Label className="text-slate-700 mb-2 block flex items-center gap-2">
                          Target Path (Optional)
                          <span
                            className="cursor-help"
                            title="Use dot notation to specify nested data (e.g., 'data.results[0].items')"
                          >
                            <Info className="text-slate-500" size={16} />
                          </span>
                        </Label>
                        <Input
                          value={targetPath}
                          onChange={(e) => setTargetPath(e.target.value)}
                          placeholder="e.g., data.results[0].items"
                          className="bg-white border-slate-300 text-slate-800 focus:border-green-400 focus:ring-green-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={splitJson}
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2 h-12 text-base font-medium"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ChevronRight className="mr-2" />
                          Split Now
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetState}
                      variant="outline"
                      className="text-slate-700 border-slate-300 hover:bg-slate-100 h-12 text-base font-medium"
                    >
                      <Trash2 className="mr-2" size={16} />
                      Reset All
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <AdUnit name="responsive1" />

            {/* Preview/Results */}
            <div
              className={`bg-white rounded-lg border border-slate-200 p-4 ${
                currentStep >= 2 ? "h-[600px]" : ""
              } relative`}
            >
              {currentStep === 1 && (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <Info className="text-slate-400 mb-2" size={24} />
                  <h3 className="text-slate-700 text-base mb-1">
                    No file selected
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Upload a JSON file to get started
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Preview
                    </h3>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg flex-1 overflow-auto border border-slate-200">
                    <pre className="text-slate-800 text-sm">
                      {jsonInput.slice(0, 1000)}
                      {jsonInput.length > 1000 && "..."}
                    </pre>
                    {jsonInput.length > 1000 && (
                      <p className="text-slate-500 text-sm mt-2">
                        Showing first 1000 characters -{" "}
                        {Math.round(jsonInput.length / 1024)}KB total
                      </p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium">
                        3
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Split Results
                      </h3>
                    </div>
                    <span className="text-slate-600 text-sm font-medium">
                      {chunks.length} chunks generated
                    </span>
                  </div>

                  {chunks.length > 0 ? (
                    <Virtuoso
                      data={chunks}
                      itemContent={(index, chunk) => (
                        <ChunkComponent chunk={chunk} index={index} />
                      )}
                      className="flex-1"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500">
                      No chunks generated - check your split parameters
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-6 bg-slate-100 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700">Processing {fileName}</span>
                <span className="text-slate-600 font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2 bg-slate-200" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
