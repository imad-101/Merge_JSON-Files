import JsonMerger from "./Main";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";
import { FileJson, FileJson2 } from "lucide-react";
import { Upload, FilePlus, Settings, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const howItWorks = [
  {
    title: "Select Your JSON Files",
    description: "Choose or drag & drop the JSON files you want to merge.",
    icon: FilePlus,
  },
  {
    title: "Upload Files",
    description:
      "Upload your selected JSON files. The tool will validate them automatically.",
    icon: Upload,
  },
  {
    title: "Merged Files",
    description:
      "Click the 'Merge' button to combine all files into a single JSON output.",
    icon: Settings,
  },
  {
    title: "Download Merged JSON",
    description: "Save the merged JSON file to your device for further use.",
    icon: Download,
  },
];
const allTools = [
  {
    name: "JSON File Merger",
    description: "Merge Multiple JSON file with ease",
    icon: FileJson,
    href: "https://www.merge-json-files.com",
  },
  {
    name: "JSON File Splitter",
    description: "Split any JSON file into multiple files",
    icon: FileJson2,
    href: "https://www.merge-json-files.com/json-file-splitter",
  },
  {
    name: "JSON Flattener",
    description: "Flatten any JSON file with ease",
    icon: FileJson,
    href: "https://www.merge-json-files.com/json-flattener",
  },
];

const faqs = [
  {
    question: "What is JSON merging and how does it work online?",
    answer:
      "JSON merging is the process of combining multiple JSON files into a single structured file. Our online JSON merger tool allows you to merge JSON files easily while maintaining nested structures and data integrity—no software installation required.",
  },
  {
    question: "How to merge multiple JSON files into one online?",
    answer:
      "To merge multiple JSON files online, simply upload your JSON data into our free JSON file merger tool. Click 'Merge' to instantly combine JSON files into a single structured output. No coding or software is needed.",
  },
  {
    question: "Why should I merge JSON files?",
    answer:
      "Merging JSON files simplifies data management, makes API responses easier to process, and helps consolidate structured data. Our JSON file merger tool efficiently combines multiple JSON datasets while preserving all key-value relationships.",
  },
  {
    question: "Can your online JSON merger handle large JSON files?",
    answer:
      "Yes, our JSON merger tool is optimized to handle large JSON files of any size. It efficiently processes complex structures and ensures quick merging without compromising data accuracy.",
  },
  {
    question: "What happens to nested structures when merging JSON files?",
    answer:
      "Our JSON file merger ensures that all nested structures, arrays, and objects are properly combined. The tool intelligently integrates JSON files without data loss, keeping the original hierarchy intact.",
  },
  {
    question: "Is your JSON merger tool free to use?",
    answer:
      "Yes, our JSON merger tool is completely free to use online. You can merge JSON files instantly without downloading any software or signing up.",
  },
  {
    question: "Does merging JSON files affect the original data format?",
    answer:
      "No, our online JSON merger preserves the original data format. Whether merging structured objects or combining JSON arrays, the tool ensures all data remains properly formatted and accessible.",
  },
];

const page = () => {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800 ">
        Merge JSON Files
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Seamlessly merge multiple{" "}
        <span className="font-semibold">JSON files</span> in just a few clicks
        and instantly <span className="font-semibold">download or copy</span>{" "}
        the combined data.
      </p>
      <JsonMerger />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads, No sign up. Get Your Files Merged Within A Few Clicks.
      </p>

      {/* -------------------------------------------------------------------------------------------------- */}
      <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
        <p className="text-center text-2xl text-gray-700 font-bold mb-5 mt-3">
          How To Merge JSON Files
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-yellow-50 p-6 rounded-xl ">
          {howItWorks.map((work, index) => (
            <HowItWorks key={index} {...work} />
          ))}
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------- */}

      <Card className=" mx-auto max-w-6xl border rounded-xl my-5 sm:my-14 px-9 bg-yellow-50">
        <CardContent>
          <h2 className="mt-10 text-2xl font-bold text-center mb-10 text-gray-700">
            Frequently Asked Questions About Merging JSON Files
          </h2>
          <FaqSection faqs={faqs} />
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------------------- */}
      <div className="my-16">
        <p className="text-center text-3xl text-gray-700 font-bold mb-12">
          Browse More JSON Related Tools
        </p>
        <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6 sm:px-3 justify-center mx-auto gap-7">
          {allTools.map((tool, index) => (
            <ToolsGrid key={index} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
