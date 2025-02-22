import Converter from "./converter";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";
import { Upload, FilePlus, Download, Repeat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import JsonToJsonlBlog from "./ConverterBlog";

const howItWorks = [
  {
    title: "Choose Your File Format",
    description:
      "Select either JSON or JSONL file for conversion. Drag & drop or browse files from your device.",
    icon: FilePlus,
  },
  {
    title: "Upload File",
    description:
      "Securely upload your file. Automatic format detection ensures proper conversion handling.",
    icon: Upload,
  },
  {
    title: "Convert Between Formats",
    description:
      "Click convert to transform JSON ↔ JSONL. Toggle between conversion directions as needed.",
    icon: Repeat,
  },
  {
    title: "Download Results",
    description:
      "Get formatted output in desired format. Copy to clipboard or download directly.",
    icon: Download,
  },
];

const faqs = [
  {
    question: "How to convert between JSON and JSONL formats?",
    answer:
      "Our bidirectional converter handles both JSON to JSONL and JSONL to JSON conversions. Simply upload your file or paste content, select the conversion direction, and get instant results. The tool automatically detects the input format and converts accordingly.",
  },
  {
    question: "What's the difference between JSON and JSONL?",
    answer:
      "JSON organizes data in structured arrays/objects, while JSONL (JSON Lines) stores one JSON object per line. Convert JSON to JSONL for streaming/big data, and JSONL to JSON for structured analysis. Our converter preserves data integrity in both directions.",
  },
  {
    question: "Can I convert large JSONL files back to JSON?",
    answer:
      "Yes, our tool efficiently converts large JSONL files to formatted JSON arrays. The browser-based processing handles multi-GB files without server uploads, maintaining complete data security during JSONL to JSON conversion.",
  },
  {
    question: "Is nested data preserved in both conversion directions?",
    answer:
      "Absolutely. Whether converting JSON to JSONL or vice versa, all nested structures, arrays, and data types remain intact. Each JSONL line becomes a proper JSON object when converted back.",
  },
  {
    question: "How to handle JSONL to JSON conversion for API use?",
    answer:
      "Convert JSONL to JSON arrays using our tool to create web-ready structured data. The output JSON validates perfectly for APIs, databases, and configuration files while maintaining original data hierarchy.",
  },
  {
    question: "Are both conversions free without limitations?",
    answer:
      "Yes! Convert JSON to JSONL and back without restrictions. No file size limits, watermarks, or required signups - just instant bidirectional conversion.",
  },
];

const page = () => {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800">
        JSON ↔ JSONL Converter Online
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Instantly transform between{" "}
        <span className="font-semibold">JSON and JSONL formats</span> with our
        free bidirectional converter. Handle{" "}
        <span className="font-semibold">JSON to JSONL</span> for big data and{" "}
        <span className="font-semibold">JSONL to JSON</span> for structured
        analysis.
      </p>
      <Converter />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads • No Limits • Convert Between Formats Securely
      </p>

      <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
        <p className="text-center text-2xl text-gray-700 font-bold mb-5 mt-3">
          How Conversion Works
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
            Frequently Asked Questions About JSON ↔ JSONL Conversion
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
