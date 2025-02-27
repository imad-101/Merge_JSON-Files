"use client";
import React, { useState, useCallback } from "react";
import { Upload, Trash2, Copy, Loader } from "lucide-react";
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

const JsonMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedContent, setMergedContent] = useState<string>("");
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const handleFileUpload = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      toast({
        title: "Files Added",
        description: `Successfully added ${acceptedFiles.length} file(s).`,
      });
    },
    [toast]
  );

  const removeFile = (index: number) => {
    const fileName = files[index].name;
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    toast({
      title: "File Removed",
      description: `Removed ${fileName} from the list.`,
    });
  };

  const resetFiles = () => {
    setFiles([]);
    setMergedContent("");
    setProgress(0);
    toast({
      title: "Reset Complete",
      description: "All fields have been reset to default values.",
    });
  };

  // Function to read large files in chunks
  const readFileInChunks = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const chunkSize = 2 * 1024 * 1024; // 2MB chunks
      const fileSize = file.size;
      let offset = 0;
      let result = "";

      const reader = new FileReader();

      reader.onerror = () => {
        reject(new Error(`Error reading file: ${file.name}`));
      };

      function readNextChunk() {
        const slice = file.slice(offset, offset + chunkSize);
        reader.readAsText(slice);
      }

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          result += e.target.result as string;
          offset += chunkSize;

          if (offset < fileSize) {
            // Read the next chunk after a small delay to allow UI updates
            setTimeout(readNextChunk, 0);
          } else {
            // Finished reading the file
            resolve(result);
          }
        }
      };

      // Start reading the first chunk
      readNextChunk();
    });
  };

  const mergeFiles = async () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No Files Selected",
        description: "Please upload at least one JSON file to merge.",
      });
      return;
    }

    setIsMerging(true);
    setProgress(0);

    try {
      // Create worker for handling the merge process
      const workerCode = `
        self.onmessage = function(e) {
          const { action, data } = e.data;
          
          if (action === 'merge') {
            const jsonObjects = data;
            let mergedObject = {};
            
            const deepMerge = function(target, source) {
              for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                  if (!target[key]) target[key] = {};
                  deepMerge(target[key], source[key]);
                } else if (Array.isArray(source[key])) {
                  target[key] = (target[key] || []).concat(source[key]);
                } else {
                  target[key] = source[key];
                }
              }
              return target;
            };
            
            // Process each JSON object in chunks to avoid UI blocking
            let currentIndex = 0;
            
            function processNext() {
              const chunkSize = 5; // Process 5 objects at a time
              const endIndex = Math.min(currentIndex + chunkSize, jsonObjects.length);
              
              for (let i = currentIndex; i < endIndex; i++) {
                try {
                  deepMerge(mergedObject, jsonObjects[i]);
                } catch (err) {
                  self.postMessage({ 
                    type: 'error', 
                    message: 'Error merging JSON object: ' + err.message 
                  });
                  return;
                }
                
                // Update progress
                const progress = Math.round(((i + 1) / jsonObjects.length) * 100);
                self.postMessage({ type: 'progress', progress });
              }
              
              currentIndex = endIndex;
              
              if (currentIndex < jsonObjects.length) {
                // Continue processing after a small delay to allow UI updates
                setTimeout(processNext, 0);
              } else {
                // All done, return the merged result
                try {
                  const result = JSON.stringify(mergedObject, null, 2);
                  self.postMessage({ type: 'complete', result });
                } catch (err) {
                  self.postMessage({
                    type: 'error',
                    message: 'Error stringifying result: ' + err.message
                  });
                }
              }
            }
            
            // Start processing
            processNext();
          }
        };
      `;

      const blob = new Blob([workerCode], { type: "application/javascript" });
      const workerURL = URL.createObjectURL(blob);
      const worker = new Worker(workerURL);

      worker.onmessage = (event: MessageEvent) => {
        const { type, progress, result, message } = event.data;

        if (type === "progress") {
          setProgress(progress);
        } else if (type === "complete") {
          setMergedContent(result);
          toast({
            title: "Merge Successful",
            description: `Successfully merged ${files.length} JSON file(s).`,
          });
          setIsMerging(false);
          setProgress(100);
          worker.terminate();
          URL.revokeObjectURL(workerURL);
        } else if (type === "error") {
          toast({
            variant: "destructive",
            title: "Merge Failed",
            description: message,
          });
          setMergedContent("");
          setIsMerging(false);
          worker.terminate();
          URL.revokeObjectURL(workerURL);
        }
      };

      worker.onerror = (error: ErrorEvent) => {
        toast({
          variant: "destructive",
          title: "Merge Failed",
          description: "Worker encountered an error: " + error.message,
        });
        setIsMerging(false);
        worker.terminate();
        URL.revokeObjectURL(workerURL);
      };

      // Process files in chunks to avoid memory issues
      const jsonObjects: any[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const fileContent = await readFileInChunks(file);
          try {
            const jsonObject = JSON.parse(fileContent);
            jsonObjects.push(jsonObject);

            // Update progress for file reading phase
            const readingProgress = Math.round(((i + 1) / files.length) * 50);
            setProgress(readingProgress);
          } catch (e) {
            throw new Error(
              `Error parsing JSON in file ${file.name}: ${(e as Error).message}`
            );
          }
        } catch (e) {
          toast({
            variant: "destructive",
            title: "File Reading Failed",
            description: (e as Error).message,
          });
          setIsMerging(false);
          worker.terminate();
          URL.revokeObjectURL(workerURL);
          return;
        }
      }

      // Start the merge process in the worker
      worker.postMessage({ action: "merge", data: jsonObjects });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Merge Failed",
        description:
          (error as Error).message ||
          "An unknown error occurred during file processing.",
      });
      setIsMerging(false);
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
    <div className="container mx-auto p-3 sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative">
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
            accept={{ "application/json": [".json"], "text/json": [".json"] }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-gray-900 hover:border-gray-100 transition"
              >
                <input {...getInputProps()} />
                {isDragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 text-white text-lg font-semibold rounded-lg">
                    Drop your files here
                  </div>
                )}
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
                  className="flex justify-between items-center bg-gray-800 p-2 rounded-md"
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
              disabled={files.length === 0 || isMerging}
              className="w-full bg-gray-300 text-gray-900 disabled:bg-gray-300 disabled:text-black hover:bg-gray-100 flex items-center justify-center"
            >
              {isMerging ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Merging...
                </>
              ) : (
                "Merge Files"
              )}
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

          {isMerging && (
            <div className="mt-4">
              <p className="text-gray-300 mb-1">
                Merging Progress: {progress}%
              </p>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: progress + "%" }}
                ></div>
              </div>
            </div>
          )}

          {mergedContent && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-200">
                  Merged JSON:
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={resetFiles}
                    variant="outline"
                    className="text-red-700 bg-gray-200 hover:bg-gray-200 "
                    size="sm"
                  >
                    Reset
                  </Button>
                  <Copy
                    className="h-5 w-5 text-gray-300 cursor-pointer hover:text-gray-100"
                    onClick={copyToClipboard}
                  />
                </div>
              </div>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                {mergedContent}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonMerger;
