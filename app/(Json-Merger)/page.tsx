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
    question: "How do I merge JSON files online?",
    answer:
      "To merge JSON files online, simply upload your files to our tool and click 'Merge'. Our online tool makes it easy to merge JSON files while maintaining data structure—no software installation required.",
  },
  {
    question: "What is the best way to merge JSON files?",
    answer:
      "The easiest way to merge JSON files is through our online tool. Upload your JSON files, and our tool will merge them instantly while preserving all data structures and relationships.",
  },
  {
    question: "Can I merge JSON files online without signing up?",
    answer:
      "Yes, our tool allows you to merge JSON files online instantly without any registration. Simply upload your files and merge them right away.",
  },
  {
    question: "How does your online JSON file merger work?",
    answer:
      "Our tool makes it simple to merge JSON files online. Upload your JSON data, and the tool will automatically merge your files while maintaining all nested structures and data integrity.",
  },
  {
    question: "Can I merge large JSON files online?",
    answer:
      "Yes, our tool is optimized to merge JSON files online regardless of size. The system efficiently processes complex JSON files while ensuring accurate results.",
  },
  {
    question: "What happens to nested structures when merging JSON files?",
    answer:
      "When you merge JSON files online, our tool preserves all nested structures. The merger ensures your JSON files are combined properly while maintaining the original data hierarchy.",
  },
  {
    question: "Is it safe to merge JSON files online?",
    answer:
      "Yes, it's completely safe to merge JSON files online with our tool. We ensure data integrity throughout the process of merging your JSON files.",
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
