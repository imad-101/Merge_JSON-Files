import Converter from "./converter";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";
import { Upload, FilePlus, Download, Repeat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
      "Click convert to transform between JSON and JSONL. Toggle between conversion directions as needed.",
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
    question: "How do I convert between JSON and JSONL formats?",
    answer:
      "Our bidirectional converter effortlessly handles both JSON to JSONL and JSONL to JSON conversions. Simply upload your file or paste your content, select the desired conversion direction, and click convert. The tool automatically detects the input format, ensuring that every nested structure and array is preserved. This robust process makes it ideal for developers and data analysts who need a secure, reliable way to manage data transformations.",
  },
  {
    question: "What is the difference between JSON and JSONL?",
    answer:
      "JSON is a versatile data format that organizes information into structured arrays or objects, making it easy to work with complex, nested data. JSONL (JSON Lines) stores one JSON object per line, which is particularly useful for processing streaming data or handling large log files. Converting JSON to JSONL online allows you to break down large datasets for incremental processing, while converting JSONL to JSON aggregates individual objects into a cohesive structure for easier analysis.",
  },
  {
    question: "Can I convert large JSONL files back to JSON?",
    answer:
      "Yes, our tool is engineered to handle large JSONL files and convert them back to properly formatted JSON arrays. The browser-based processing efficiently manages multi-GB files without the need for server uploads. This not only ensures fast performance but also maintains the security and integrity of your data during the JSONL to JSON conversion.",
  },
  {
    question: "Will my nested data be preserved during conversion?",
    answer:
      "Absolutely. Whether converting from JSON to JSONL or vice versa, our converter is designed to maintain every detail of your nested data. Each JSONL line is accurately transformed back into its corresponding JSON object, ensuring that hierarchical relationships and data types remain intact. This meticulous approach is essential for users who rely on the precision of their data for application development or detailed analysis.",
  },
  {
    question: "How does the JSONL to JSON conversion work for API use?",
    answer:
      "When converting JSONL to JSON for API integration, our tool converts each line of your JSONL file into a valid JSON object, and then aggregates these objects into a well-structured JSON array. This ensures that the output is compatible with APIs, databases, and configuration files, saving you time and ensuring that the data is ready for immediate use in your applications.",
  },
  {
    question: "Are both conversions completely free and without limitations?",
    answer:
      "Yes! Our converter is completely free to use with no file size limits, watermarks, or sign-up requirements. You can convert JSON to JSONL and JSONL to JSON online as often as you need, making it the perfect tool for developers, data analysts, and anyone working with structured data. Enjoy a seamless, reliable conversion process every time.",
  },
];

const Page = () => {
  return (
    <div>
      <h1 className="text-center text-5xl my-12 font-bold text-gray-800">
        Free Online JSON/JSONL Converter
      </h1>
      <p className="text-gray-600 mb-16 text-center px-3 md:mx-28">
        Instantly transform between{" "}
        <span className="font-semibold">JSON and JSONL formats</span> with our
        free bidirectional converter. Whether you need to convert{" "}
        <span className="font-semibold">JSON to JSONL</span> for big data
        projects or <span className="font-semibold">JSONL to JSON</span> for
        structured analysis, our tool offers a seamless, secure, and efficient
        solution online.
      </p>
      <Converter />
      <p className="text-gray-600 text-center my-10 px-3">
        No Ads • No Limits • Secure & Fast Conversions
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
        <p className="mt-6 text-gray-600 text-center px-3">
          Our process is built for efficiency and clarity. Whether converting
          JSON to JSONL online for streamlined data streaming or transforming
          JSONL to JSON for in-depth analysis, every step is designed to
          preserve your data’s integrity while delivering fast, reliable
          results.
        </p>
      </div>
      <Card className="mx-auto max-w-6xl border rounded-xl my-5 sm:my-14 px-9 bg-yellow-50">
        <CardContent>
          <h2 className="mt-10 text-2xl font-bold text-center mb-10 text-gray-700">
            Frequently Asked Questions About JSON ↔ JSONL Conversion
          </h2>
          <FaqSection faqs={faqs} />
        </CardContent>
      </Card>

      <ToolsGrid />
    </div>
  );
};

export default Page;
