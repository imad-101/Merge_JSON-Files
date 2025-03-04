// app/page.tsx
"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UploadCloud, Loader2, Info, Trash2, ChevronRight } from "lucide-react";
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
type WorkerMessage = {
  chunks?: Chunk[];
  error?: string;
  progress?: number;
};

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
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker("./split-worker.js");
    workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
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

    return () => workerRef.current?.terminate();
  }, [toast]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          JSON.parse(content);
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
    maxSize: 500 * 1024 * 1024,
  });

  const validateInput = useCallback(() => {
    if (!jsonInput.trim())
      throw new Error("Please upload or paste JSON content");
    if (!JSON.parse(jsonInput)) throw new Error("Invalid JSON format");

    if (
      splitMethod === "chunkCount" &&
      (chunkSize < 1 || !Number.isInteger(chunkSize))
    ) {
      throw new Error("Number of chunks must be a whole number ≥ 1");
    }

    if (
      splitMethod === "item" &&
      (chunkSize < 1 || !Number.isInteger(chunkSize))
    ) {
      throw new Error("Items per chunk must be a whole number ≥ 1");
    }

    if (splitMethod === "size" && maxSizeValue <= 0) {
      throw new Error("Size must be greater than 0");
    }
  }, [jsonInput, splitMethod, chunkSize, maxSizeValue]);

  const splitJson = useCallback(() => {
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
      setCurrentStep(3);
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
  ]);

  const resetState = () => {
    setJsonInput("");
    setFileName("");
    setChunks([]);
    setProgress(0);
    setCurrentStep(1);
    toast({ title: "Reset complete" });
  };

  const ChunkComponent = ({
    chunk,
    index,
  }: {
    chunk: Chunk;
    index: number;
  }) => (
    <Card className="bg-gray-800 mb-4">
      <CardHeader>
        <CardTitle className="text-gray-200 flex flex-col sm:flex-row justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-gray-400 px-3 py-1 rounded-full text-sm">
              Chunk {index + 1}
            </span>
            <span className="text-gray-400 text-sm">
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
              className="bg-gray-700 hover:bg-gray-600"
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
                a.download = `chunk_${index + 1}.json`;
                a.click();
                URL.revokeObjectURL(url);
                toast({ title: `Downloaded chunk ${index + 1}` });
              }}
              className="bg-gray-400 hover:bg-gray-400"
            >
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-200 text-sm max-h-[200px]">
          {JSON.stringify(chunk, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-7xl">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-100 flex items-center gap-3">
            <UploadCloud className="text-gray-400" />
            JSON Splitter Online
            <span className="text-sm font-normal text-gray-400 ml-2">
              Step {currentStep} of 3
            </span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Easily split large JSON files with intuitive controls and real-time
            preview
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Left Side - Controls */}
            <div className="space-y-6">
              {/* Step 1: Upload */}
              {currentStep === 1 && (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-gray-400 bg-gray-400/20"
                      : "border-gray-700 hover:border-gray-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <UploadCloud
                    className={`mx-auto mb-4 ${
                      isDragActive ? "text-gray-400" : "text-gray-500"
                    }`}
                    size={40}
                  />
                  <p className="text-gray-400 text-lg">
                    {isDragActive
                      ? "Drop your JSON file"
                      : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports files up to 500MB
                  </p>
                </div>
              )}

              {/* Step 2: Configuration */}
              {currentStep >= 2 && (
                <div className="space-y-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gray-400 w-8 h-8 rounded-full flex items-center justify-center">
                        2
                      </div>
                      <h3 className="text-lg font-semibold text-gray-200">
                        Split Configuration
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-300 mb-2 block flex items-center gap-2">
                          Split Method
                          <Info className="text-gray-400" size={16} />
                        </Label>
                        <select
                          value={splitMethod}
                          onChange={(e) =>
                            setSplitMethod(e.target.value as SplitMethod)
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-300 focus:ring-2 focus:ring-gray-400"
                        >
                          <option value="item">Items Per Chunk</option>
                          <option value="chunkCount">Number of Chunks</option>
                          <option value="size">Maximum File Size</option>
                        </select>
                      </div>

                      {splitMethod === "size" ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-gray-300 mb-2 block">
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
                                className="bg-gray-800 border-gray-700 text-gray-300"
                                step="0.1"
                                min="0.1"
                              />
                              <select
                                value={sizeUnit}
                                onChange={(e) =>
                                  setSizeUnit(e.target.value as any)
                                }
                                className="bg-gray-800 border-gray-700 text-gray-300 rounded-lg px-4"
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
                          <Label className="text-gray-300 mb-2 block">
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
                            className="bg-gray-800 border-gray-700 text-gray-300"
                            min="1"
                          />
                        </div>
                      )}

                      <div>
                        <Label className="text-gray-300 mb-2 block flex items-center gap-2">
                          Target Path (Optional)
                          <span
                            className="cursor-help"
                            title="Use dot notation to specify nested data (e.g., 'data.results[0].items')"
                          >
                            <Info className="text-gray-400" size={16} />
                          </span>
                        </Label>
                        <Input
                          value={targetPath}
                          onChange={(e) => setTargetPath(e.target.value)}
                          placeholder="e.g., data.results[0].items"
                          className="bg-gray-800 border-gray-700 text-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={splitJson}
                      disabled={isProcessing}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-black gap-2"
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
                      className="text-black border-gray-700 hover:bg-gray-200"
                    >
                      <Trash2 className="mr-2" size={16} />
                      Reset All
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Preview/Results */}
            <div className="bg-gray-800 rounded-xl p-4 h-[600px] relative">
              {currentStep === 1 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <Info className="text-gray-500 mb-4" size={40} />
                  <h3 className="text-gray-400 mb-2">No file selected</h3>
                  <p className="text-gray-500">
                    Upload a JSON file to get started
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gray-400 w-8 h-8 rounded-full flex items-center justify-center">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200">
                      Preview
                    </h3>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg flex-1 overflow-auto">
                    <pre className="text-gray-300 text-sm">
                      {jsonInput.slice(0, 1000)}
                      {jsonInput.length > 1000 && "..."}
                    </pre>
                    {jsonInput.length > 1000 && (
                      <p className="text-gray-500 text-sm mt-2">
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
                      <div className="bg-gray-400 w-8 h-8 rounded-full flex items-center justify-center">
                        3
                      </div>
                      <h3 className="text-lg font-semibold text-gray-200">
                        Split Results
                      </h3>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {chunks.length} chunks generated
                    </span>
                  </div>

                  {chunks.length > 0 ? (
                    <Virtuoso
                      data={chunks}
                      itemContent={(index, chunk) => (
                        <ChunkComponent chunk={chunk} index={index} />
                      )}
                      className="flex-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No chunks generated - check your split parameters
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Processing {fileName}</span>
                <span className="text-gray-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
