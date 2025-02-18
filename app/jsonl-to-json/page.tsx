import Converter from "./converter";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";

import { Upload, FilePlus, Settings, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ConversionBlog from "./JsonlBlog";

const howItWorks = [
  {
    title: "Select Your JSONL File",
    description:
      "Choose or drag & drop the JSONL file you want to convert to JSON format.",
    icon: FilePlus,
  },
  {
    title: "Upload File",
    description:
      "Upload your selected JSONL file. The tool will validate it automatically.",
    icon: Upload,
  },
  {
    title: "Convert Format",
    description:
      "Click the 'Convert' button to transform your JSONL file into a structured JSON output.",
    icon: Settings,
  },
  {
    title: "Download JSON",
    description: "Save the converted JSON file to your device for further use.",
    icon: Download,
  },
];

const faqs = [
  {
    question: "How to convert JSONL to JSON online?",
    answer:
      "To convert JSONL to JSON online, simply upload your JSONL file to our tool using the drag-and-drop feature or file selection option. Once uploaded, click 'Convert', and our tool will instantly transform your JSONL file into a structured JSON format. Our online JSONL to JSON converter requires no software installation, making it a fast and efficient solution.",
  },
  {
    question: "What is JSONL and why convert JSONL to JSON?",
    answer:
      "JSONL (JSON Lines) is a format where each line contains a valid JSON object. Converting JSONL to JSON is useful when you need to work with tools that expect traditional JSON format, or when you want to combine multiple JSON Lines into a single JSON array. Our JSONL to JSON converter makes this process simple and efficient.",
  },
  {
    question: "How does your JSONL to JSON converter work?",
    answer:
      "Our JSONL to JSON converter reads each line of your JSONL file, validates that each line is a proper JSON object, and combines them into a single JSON array. The process maintains data integrity and handles nested structures properly. You can convert JSONL to JSON online instantly without any technical knowledge.",
  },
  {
    question: "Can I convert large JSONL files to JSON online?",
    answer:
      "Yes, our tool is optimized to handle large JSONL files efficiently. Whether you're dealing with small data sets or extensive JSONL files, our system processes them smoothly. The converter ensures quick transformation without lag, making it ideal for developers and data analysts working with large datasets.",
  },
  {
    question: "Is there a Python script to convert JSONL to JSON?",
    answer:
      "Yes, you can convert JSONL to JSON using Python. While our online converter is the easiest solution, you can also use Python with a simple script. The basic approach involves reading the JSONL file line by line, parsing each line as JSON, and combining them into a list. Check our tutorial section for a detailed Python script example.",
  },
  {
    question: "How can I use jq to convert JSONL to JSON?",
    answer:
      "You can use jq to convert JSONL to JSON from the command line. The command 'jq -s '.' input.jsonl > output.json' will combine all JSON Lines into a JSON array. However, our online JSONL to JSON converter offers a more user-friendly approach without requiring command-line knowledge.",
  },
  {
    question: "Is it safe to use your JSONL to JSON converter online?",
    answer:
      "Yes, it's completely safe to convert JSONL to JSON online using our tool. We process all files directly in your browser, meaning your data never leaves your device or gets uploaded to external servers. This ensures complete privacy and security while providing a seamless conversion experience.",
  },
];

const page = () => {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800">
        Convert JSONL to JSON Online
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Instantly transform your{" "}
        <span className="font-semibold">JSONL files</span> to JSON format with
        our free <span className="font-semibold">JSONL to JSON converter</span>.
      </p>
      <Converter />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads, No sign up. Convert JSONL to JSON Within Seconds.
      </p>

      <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
        <p className="text-center text-2xl text-gray-700 font-bold mb-5 mt-3">
          How To Convert JSONL to JSON
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-yellow-50 p-6 rounded-xl">
          {howItWorks.map((work, index) => (
            <HowItWorks key={index} {...work} />
          ))}
        </div>
      </div>

      <Card className="mx-auto max-w-6xl border rounded-xl my-5 sm:my-14 px-9 bg-yellow-50">
        <CardContent>
          <h2 className="mt-10 text-2xl font-bold text-center mb-10 text-gray-700">
            Frequently Asked Questions About JSONL to JSON Conversion
          </h2>
          <FaqSection faqs={faqs} />
        </CardContent>
      </Card>
      <ConversionBlog />
      <ToolsGrid />
    </div>
  );
};

export default page;
