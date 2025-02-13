"use client";
import { useState, useCallback, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Download, Trash2, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FlattenedObject = {
  [key: string]: string | number | boolean | null | FlattenedObject;
};

export default function JSONFlattener() {
  const [inputJSON, setInputJSON] = useState<string>("");
  const [flattenedJSON, setFlattenedJSON] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const [delimiter, setDelimiter] = useState<string>(".");
  const { toast } = useToast();

  const flattenJSON = useCallback(
    (
      obj: Record<string, unknown> | unknown[],
      parentKey: string = "",
      result: FlattenedObject = {}
    ): FlattenedObject => {
      if (typeof obj !== "object" || obj === null) {
        result[parentKey] = obj;
        return result;
      }

      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          flattenJSON(
            obj[i] as unknown[] | Record<string, unknown>,
            `${parentKey}[${i}]`,
            result
          );
        }
      } else {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}${delimiter}${key}` : key;
            flattenJSON(
              obj[key] as unknown[] | Record<string, unknown>,
              newKey,
              result
            );
          }
        }
      }
      return result;
    },
    [delimiter]
  );

  const handleFlatten = () => {
    try {
      if (!inputJSON.trim()) {
        toast({
          title: "Failed",
          description: "Input field is empty, please provide a valid JSON",
          variant: "destructive",
        });
        return; // Added return statement
      }

      const parsedJSON = JSON.parse(inputJSON);
      if (typeof parsedJSON !== "object" || parsedJSON === null) {
        throw new Error("Input must be a valid JSON object.");
      }

      const flattened = flattenJSON(parsedJSON);
      setFlattenedJSON(JSON.stringify(flattened, null, 2));

      toast({
        title: "Success",
        description: "JSON flattened successfully!",
        variant: "default",
      });
    } catch (err) {
      setFlattenedJSON("");
      toast({
        title: "Error",
        description: "Failed to flatten JSON. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          setInputJSON(JSON.stringify(content, null, 2));
          setFileName(file.name);

          toast({
            title: "Success",
            description: "File uploaded successfully!",
            variant: "default",
          });
        } catch {
          toast({
            title: "Error",
            description: "Invalid JSON file.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    },
    [toast]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];
      if (file && file.type === "application/json") {
        handleFileUpload(file);
      } else {
        toast({
          title: "Error",
          description: "Invalid file type.",
          variant: "destructive",
        });
      }
    },
    [handleFileUpload, toast]
  );

  // Remove global event listeners to prevent hydration errors
  useEffect(() => {
    // No need for global event listeners as we're handling drag and drop on the div
    return () => {
      // Cleanup not needed anymore
    };
  }, []);

  const handleCopy = () => {
    if (!flattenedJSON) {
      toast({
        title: "Error",
        description: "No flattened JSON to copy.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard
      .writeText(flattenedJSON)
      .then(() => {
        toast({
          title: "Success",
          description: "Copied to clipboard!",
          variant: "default",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard.",
          variant: "destructive",
        });
      });
  };

  const handleDownload = () => {
    if (!flattenedJSON) {
      toast({
        title: "Error",
        description: "No flattened JSON to download.",
        variant: "destructive",
      });
      return;
    }
    const blob = new Blob([flattenedJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName ? `flattened_${fileName}` : "flattened.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Success",
      description: "Download started!",
      variant: "default",
    });
  };

  const handleClear = () => {
    setInputJSON("");
    setFlattenedJSON("");
    setFileName("");

    toast({
      title: "Success",
      description: "Cleared input and output!",
      variant: "default",
    });
  };

  const handleDelimiterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelimiter(e.target.value);
  };

  const loadSampleJSON = () => {
    const sampleJSON = {
      name: "John",
      address: {
        city: "New York",
        zip: "10001",
      },
      hobbies: ["reading", "traveling"],
    };
    setInputJSON(JSON.stringify(sampleJSON, null, 2));
    toast({
      title: "Success",
      description: "Sample JSON loaded!",
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-[25rem] sm:max-w-xl md:max-w-6xl rounded-xl relative">
      <Card className="bg-gray-900 border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ml-1 text-gray-200">
            JSON Flattener Tool
          </CardTitle>
          <CardDescription className="ml-1 text-gray-300">
            Flatten your JSON objects easily with our free online tool.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Drag and Drop Area */}
          <div
            className="border-2 border-dashed border-gray-400 hover:border-gray-100 rounded-lg p-6 text-center bg-gray-900 mb-6 cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <UploadCloud className="w-8 h-8 mx-auto mb-4 text-gray-400" />
            <p className="mb-4 text-gray-400">
              Drag and drop a JSON file here or click to upload
            </p>
            <Input
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload(e.target.files?.[0])}
              className="hidden"
              id="fileInput"
            />
            {fileName && (
              <p className="mt-4 text-sm text-gray-600">
                Uploaded file: {fileName}
              </p>
            )}
          </div>

          <div className="delimeter flex flex-col sm:flex-row sm:gap-4 gap-2 my-6">
            <p className="text-2xl text-gray-200">Delimiter</p>
            <Input
              type="text"
              value={delimiter}
              onChange={handleDelimiterChange}
              placeholder="Delimiter"
              className="w-52 border-gray-400 text-gray-200 placeholder:text-gray-400"
            />
          </div>

          <Textarea
            rows={10}
            placeholder="Or paste your JSON here..."
            value={inputJSON}
            onChange={(e) => setInputJSON(e.target.value)}
            className="mb-6 border-gray-400 text-gray-200 placeholder:text-gray-400"
          />

          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <div className="flex-1 flex gap-2">
              <Button
                onClick={handleFlatten}
                className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Flatten JSON
              </Button>
            </div>
            <Button
              onClick={loadSampleJSON}
              variant="secondary"
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Load Sample
            </Button>
            <Button
              onClick={handleClear}
              variant="destructive"
              className="flex-1 bg-gray-200 text-red-700 hover:bg-red-100"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>

          {flattenedJSON && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-200 hidden sm:block">
                  Flattened JSON:
                </h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleCopy}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleDownload}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
              <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto text-gray-900 border border-gray-200">
                {flattenedJSON}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
