import JsonMerger from "./Main";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";

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

const faqs = [
  {
    question: "How do I merge JSON files online?",
    answer:
      "To merge JSON files online, simply upload your JSON files to our tool using the drag-and-drop feature or file selection option. Once uploaded, click 'Merge', and our tool will instantly merge the JSON files into a single structured JSON output while preserving data integrity. This online JSON merger requires no software installation, making it a fast and efficient solution.",
  },
  {
    question: "What is the best way to merge JSON files?",
    answer:
      "The best way to merge JSON files is by using an online JSON file merger like ours. Instead of manually writing scripts or using complex software, you can simply upload multiple JSON files and let our tool handle the merging process. It ensures that all data structures, including nested objects and arrays, are properly merged without any loss of information.",
  },
  {
    question: "Can I merge JSON files online without signing up?",
    answer:
      "Yes, our tool allows you to merge JSON files online instantly without requiring registration or login. You can start merging JSON files right away by uploading your data. Our platform is designed for ease of use, making it the perfect choice for quick and hassle-free JSON file merging.",
  },
  {
    question: "How does your online JSON file merger work?",
    answer:
      "Our online JSON file merger is built to combine multiple JSON files into one seamlessly. When you upload your files, our system automatically processes and merges them while maintaining their original structure. This means all key-value pairs, arrays, and nested elements remain intact, ensuring an accurate and well-formatted output.",
  },
  {
    question: "Can I merge large JSON files online?",
    answer:
      "Yes, our tool is optimized to merge large JSON files online efficiently. Whether you're dealing with small data sets or extensive JSON files, our system processes them smoothly. The tool ensures quick merging without lag, making it a reliable solution for developers and data analysts working with JSON.",
  },
  {
    question: "What happens to nested structures when merging JSON files?",
    answer:
      "When you merge JSON files online, our tool ensures that all nested structures, including objects and arrays, are preserved. The merging process intelligently combines data without breaking the original format, ensuring a properly structured JSON output that retains all hierarchical relationships.",
  },
  {
    question: "Is it safe to merge JSON files online?",
    answer:
      "Yes, it is completely safe to merge JSON files online using our tool. We process the files directly in your browser, meaning your data is never stored or uploaded to external servers. This guarantees privacy and security while ensuring a seamless JSON file merging experience.",
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
        <p className="mt-6 text-gray-600 text-center px-3">
          Merge your JSON files online quickly with our free JSON merger tool.
          It combines multiple JSON files into a single, well-structured output
          while preserving every detail—ideal for developers and data analysts
          seeking a fast, secure solution.
        </p>
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

      {/* --------------------------------------------------------------------------- */}
      <ToolsGrid />
    </div>
  );
};

export default page;
