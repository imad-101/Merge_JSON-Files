import React from "react";
import JsonSplitter from "./Splitter";
import HowItWorks from "../../../components/HowItWorks";
import ToolsGrid from "@/components/ToolsGrid";
import { Card, CardContent } from "@/components/ui/card";
import FaqSection from "@/components/Faq";
import {
  CheckCircle,
  FilePlus,
  Settings,
  Download,
  FileJson,
  FileJson2,
} from "lucide-react";

const faqs = [
  {
    question: "What is JSON splitting and how does it work online?",
    answer:
      "JSON splitting is the process of dividing a large JSON file into smaller, manageable chunks. Our online JSON splitter tool allows you to split JSON data into multiple smaller files based on size, key, or array elements—no software installation required.",
  },
  {
    question: "How to split a large JSON file into smaller parts online?",
    answer:
      "To split a large JSON file online, simply paste or upload your JSON data into our free JSON splitter tool. Choose your preferred splitting method (by size, key, or array elements), then click 'Split' to generate multiple smaller JSON files instantly.",
  },
  {
    question: "Why should I split large JSON files?",
    answer:
      "Splitting large JSON files improves performance, simplifies data processing, and makes it easier to work with JSON in databases, APIs, or data analysis tools. Our JSON splitter tool efficiently divides large datasets while maintaining data integrity.",
  },
  {
    question: "Can your online JSON splitter handle large JSON files?",
    answer:
      "Yes, our JSON splitter tool is optimized to handle large JSON files of any size. It efficiently processes complex structures and ensures quick splitting without compromising data accuracy.",
  },
  {
    question: "What are the different ways to split JSON files online?",
    answer:
      "Our JSON splitter tool allows you to split JSON files by file size, chunk size, or array element distribution. These options let you customize the splitting process to match your data processing requirements.",
  },
  {
    question: "Is your JSON splitter tool free to use?",
    answer:
      "Yes, our JSON splitter tool is completely free to use online. There’s no need to install software—just upload your JSON, choose your splitting method, and download the smaller files instantly.",
  },
  {
    question: "Does splitting JSON affect the original data structure?",
    answer:
      "No, our online JSON splitter ensures that each split file maintains the original data structure. Whether splitting by size, key, or array, the tool preserves the logical integrity of your JSON data.",
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
const howItWorks = [
  {
    title: "Upload / Paste JSON File",
    description: "Choose or drag & drop the JSON file you want to split.",
    icon: FilePlus,
  },
  {
    title: "Select Chunk Size",
    description:
      "Choose the number of records or size per chunk to split your JSON file accordingly.",
    icon: CheckCircle,
  },
  {
    title: "Split JSON",
    description:
      "Click the 'Split' button to divide your JSON file into multiple smaller JSON files.",
    icon: Settings,
  },
  {
    title: "Download Split JSON Files",
    description: "Save the split JSON files to your device for further use.",
    icon: Download,
  },
];

const page = () => {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800 ">
        JSON Files Splitter
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Seamlessly Split any <span className="font-semibold">JSON file</span> in
        just a few clicks and instantly{" "}
        <span className="font-semibold">download or copy</span> the splitted
        chunks.
      </p>
      <JsonSplitter />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads, No sign up. Get Your File Splitted Within A Few Clicks.
      </p>

      {/* -------------------------------------------------------------------------------------------------- */}
      <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
        <p className="text-center text-2xl text-gray-700 font-bold mb-5 mt-3">
          How To Split JSON Files
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
            Frequently Asked Questions About Splitting JSON Files
          </h2>
          <FaqSection faqs={faqs} />
        </CardContent>
      </Card>
      {/* ---------------------------------------------------------------------------- */}

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
