import Converter from "./converter";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";

import { Upload, FilePlus, Settings, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import JsonToJsonlBlog from "./ConverterBlog";

const howItWorks = [
  {
    title: "Select Your JSON File",
    description:
      "Choose or drag & drop the JSON file you want to convert to JSONL format.",
    icon: FilePlus,
  },
  {
    title: "Upload File",
    description:
      "Upload your selected JSON file. The tool will validate it automatically.",
    icon: Upload,
  },
  {
    title: "Convert Format",
    description:
      "Click the 'Convert' button to transform your JSON into JSONL format.",
    icon: Settings,
  },
  {
    title: "Download JSONL",
    description:
      "Save the converted JSONL file to your device for further use.",
    icon: Download,
  },
];

const faqs = [
  {
    question: "How to convert JSON to JSONL online?",
    answer:
      "To convert JSON to JSONL online, simply upload your JSON file using our tool's drag-and-drop feature or file selection option. Once uploaded, click 'Convert', and our tool will instantly transform your JSON into JSONL format. This process separates each JSON object onto its own line, making it perfect for streaming and large-scale data processing.",
  },
  {
    question: "What is JSONL and why should I convert JSON to JSONL?",
    answer:
      "JSONL (JSON Lines) is a format where each line is a valid JSON object, making it ideal for processing large datasets and streaming data. Converting JSON to JSONL is beneficial when working with big data tools, log processing, or when you need to process data line by line. Our online JSON to JSONL converter makes this conversion process simple and efficient.",
  },
  {
    question: "Can I convert large JSON files to JSONL format?",
    answer:
      "Yes, our tool is optimized to handle large JSON files efficiently. The conversion from JSON to JSONL happens directly in your browser, ensuring quick processing even for substantial datasets. This makes it an ideal solution for developers and data analysts working with large JSON files that need to be converted to JSONL format.",
  },
  {
    question: "Is it safe to convert JSON to JSONL online?",
    answer:
      "Yes, it's completely safe to use our online JSON to JSONL converter. We process your files directly in your browser, meaning your data never leaves your device or gets uploaded to external servers. This ensures complete privacy and security while providing a seamless conversion experience.",
  },
  {
    question: "What happens to nested JSON structures during JSONL conversion?",
    answer:
      "When converting JSON to JSONL online, our tool maintains all nested structures within each JSON object. Each line in the resulting JSONL file will contain a complete, valid JSON object with all its nested elements intact, ensuring no data or structure is lost during the conversion process.",
  },
  {
    question: "Do I need to sign up to convert JSON to JSONL online?",
    answer:
      "No, our JSON to JSONL converter is completely free to use and requires no registration or login. You can start converting your JSON files to JSONL format immediately, making it the perfect tool for quick and hassle-free conversions.",
  },
];

const page = () => {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800">
        Convert JSON to JSONL Online
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Instantly transform your{" "}
        <span className="font-semibold">JSON files</span> to JSONL format with
        our free online{" "}
        <span className="font-semibold">JSON to JSONL converter</span>.
      </p>
      <Converter />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads, No sign up. Convert JSON to JSONL Within Seconds.
      </p>

      <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
        <p className="text-center text-2xl text-gray-700 font-bold mb-5 mt-3">
          How To Convert JSON to JSONL
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
            Frequently Asked Questions About JSON to JSONL Conversion
          </h2>
          <FaqSection faqs={faqs} />
        </CardContent>
      </Card>

      <JsonToJsonlBlog />

      <ToolsGrid />
    </div>
  );
};

export default page;
