import JsonMerger from "./Main";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";
import { FileJson, FileJson2, Calculator } from "lucide-react";
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
    href: "/",
  },
  {
    name: "JSON File Splitter",
    description: "Split any JSON file into multiple files",
    icon: FileJson2,
    href: "/json-file-splitter",
  },
  {
    name: "JSON Flattener",
    description: "Flatten any JSON file with ease",
    icon: FileJson,
    href: "/json-flattener",
  },
];

const faqs = [
  {
    question: "How to merge JSON files online quickly?",
    answer:
      "To merge JSON files online, simply upload your files to our free JSON file merger tool. Click the 'Merge' button, and instantly download your combined JSON file. Our tool makes merging JSON files effortless with no software installation needed.",
  },
  {
    question: "What's the best way to merge multiple JSON files?",
    answer:
      "The fastest way to merge multiple JSON files is using our online JSON merger tool. It handles both simple and complex JSON structures, preserves data integrity, and combines files instantly - all through your web browser.",
  },
  {
    question: "Can I merge large JSON files online?",
    answer:
      "Yes, our JSON file merger efficiently handles large JSON files. The tool is optimized for merging JSON files of any size while maintaining fast processing speeds and data accuracy.",
  },
  {
    question: "Is JSON file merging safe for data structure?",
    answer:
      "Our JSON file merger tool guarantees data integrity during the merging process. When you merge JSON files using our tool, all nested structures, arrays, and objects remain intact and properly formatted.",
  },
  {
    question: "Do I need special software to merge JSON files?",
    answer:
      "No software installation needed - our online JSON file merger works directly in your browser. Simply visit our website to merge JSON files instantly without downloading any additional tools.",
  },
  {
    question: "How to combine multiple JSON arrays into one file?",
    answer:
      "Our JSON file merger makes combining multiple JSON arrays simple. Upload your files containing JSON arrays, and our tool will merge them while maintaining array structure and data accuracy in the final merged JSON file.",
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
