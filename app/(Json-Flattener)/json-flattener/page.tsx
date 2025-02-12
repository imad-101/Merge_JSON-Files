import React from "react";
import JSONFlattener from "./Flattener";
import HowItWorks from "../../../components/HowItWorks";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  FilePlus,
  Settings,
  Download,
  FileJson,
  FileJson2,
} from "lucide-react";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";

const faqs = [
  {
    question: "What is JSON flattening and how does it work online?",
    answer:
      "JSON flattening is the process of converting nested JSON structures into a flat, single-level format. Our online JSON flattener tool automatically converts complex nested JSON into a flattened structure with dot notation, making it easier to process and analyze your data without any software installation.",
  },
  {
    question: "How to flatten nested JSON objects quickly online?",
    answer:
      "To flatten nested JSON objects online, simply paste your JSON into our free JSON flattener tool. Click the 'Flatten' button to instantly convert nested structures into a flat format. Our tool handles complex nested objects and arrays efficiently through your web browser.",
  },
  {
    question: "What are the benefits of flattening JSON structures?",
    answer:
      "Flattening JSON structures simplifies data analysis, makes JSON more readable, and enables easier data processing. Our JSON flattener online tool converts nested objects into a flat structure while preserving all data relationships, making it perfect for data analysis and integration tasks.",
  },
  {
    question: "Can your online JSON flattener handle large nested files?",
    answer:
      "Yes, our JSON flattener tool efficiently processes large nested JSON files. The tool is optimized for flattening complex JSON structures of any size while maintaining fast processing speeds and ensuring data accuracy in the flattened output.",
  },
  {
    question: "How does dot notation work in flattened JSON?",
    answer:
      "When flattening JSON online, nested object properties are combined using dot notation (e.g., 'user.address.city'). Our JSON flattener tool automatically creates these dot-separated paths, making it easy to reference deeply nested values in your flattened JSON structure.",
  },
  {
    question: "Is it possible to customize JSON flattening options?",
    answer:
      "Our online JSON flattener tool offers customization options for handling arrays, delimiter characters, and nested object separation. You can adjust these settings to control how your nested JSON structures are flattened, ensuring the output matches your specific needs.",
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
    description: "Choose or drag & drop the JSON file you want to flatten.",
    icon: FilePlus,
  },
  {
    title: "Validate & Parse",
    description:
      "The tool will automatically validate and parse your JSON file.",
    icon: CheckCircle,
  },
  {
    title: "Flatten JSON",
    description:
      "Click the 'Flatten' button to convert nested structures into a flat JSON format.",
    icon: Settings,
  },
  {
    title: "Download Flattened JSON",
    description: "Save the flattened JSON file to your device for further use.",
    icon: Download,
  },
];

const page = () => {
  return (
    <div className="">
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800 ">
        JSON Flattener Online
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Seamlessly flatten any type of{" "}
        <span className="font-semibold">JSON file</span> in just a few clicks
        and instantly <span className="font-semibold">download or copy</span>{" "}
        the flattened JSON data.
      </p>
      <JSONFlattener />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads, No sign up. Get Your Files Flattened Within A Few Clicks.
      </p>

      {/* -------------------------------------------------------------------------------------------------- */}
      <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
        <p className="text-center text-2xl text-gray-700 font-bold mb-5 mt-3">
          How To Flatten JSON Files
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
            Frequently Asked Questions About Flattening JSON Files
          </h2>
          <FaqSection faqs={faqs} />
        </CardContent>
      </Card>

      {/* --------------------------------------------------------------------------------------------- */}

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
