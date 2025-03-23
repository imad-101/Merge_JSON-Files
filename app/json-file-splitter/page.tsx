import React from "react";
import JsonSplitter from "./Splitter";
import HowItWorks from "../../components/HowItWorks";
import ToolsGrid from "@/components/ToolsGrid";
import { Card, CardContent } from "@/components/ui/card";
import FaqSection from "@/components/Faq";

import { CheckCircle, FilePlus, Settings, Download } from "lucide-react";
const faqs = [
  {
    question: "What is JSON splitting and how does it work online?",
    answer:
      "JSON splitting is the process of dividing a large JSON file into smaller, more manageable chunks. This is especially useful for developers and data analysts who need to process or transmit large datasets more efficiently. Our online JSON splitter tool uses advanced algorithms to accurately divide JSON data based on specific criteria such as file size, keys, or array elements. The process is completely automated and requires no software installation, ensuring a fast and seamless user experience while preserving the integrity of the original data.",
  },
  {
    question: "How to split a large JSON file into smaller parts online?",
    answer:
      "To split a large JSON file online, simply paste or upload your JSON data into our free JSON splitter tool. The tool offers multiple splitting methods including splitting by file size, key, or specific array elements, allowing you to customize the output according to your needs. Once you select your preferred method, click the 'Split' button, and the tool will process your file almost instantly, generating several smaller JSON files. This method is ideal for optimizing data processing workflows, enhancing performance, and facilitating easier integration with databases or APIs.",
  },
  {
    question: "Why should I split large JSON files?",
    answer:
      "Splitting large JSON files into smaller parts can significantly improve performance and manageability when dealing with extensive datasets. By breaking down a massive JSON file, you can reduce memory consumption, simplify data processing tasks, and make it easier to upload, download, or share data. Additionally, working with smaller files reduces the likelihood of errors during data transmission and allows for more efficient debugging and testing. Our online JSON splitter tool is designed to maintain the logical integrity and structure of your data, ensuring that no critical information is lost during the splitting process.",
  },
  {
    question: "Can your online JSON splitter handle large JSON files?",
    answer:
      "Yes, our online JSON splitter tool is specifically optimized to handle large JSON files of virtually any size. It leverages efficient chunking techniques and robust error handling to process complex JSON structures without compromising on speed or accuracy. Whether you're dealing with several megabytes or gigabytes of data, our tool ensures that each split file retains the original structure and meaning, making it a reliable solution for high-volume data processing in real-time applications.",
  },
  {
    question: "What are the different ways to split JSON files online?",
    answer:
      "Our JSON splitter tool offers several customizable methods to split your JSON files. You can choose to split by file size, which divides the data into evenly sized chunks, or by specific keys within the JSON structure. Additionally, the tool can split arrays into individual elements or groups of elements, providing flexibility depending on your processing requirements. These options enable you to tailor the splitting process to suit various scenarios such as batch processing, parallel data handling, or preparing data for APIs and microservices.",
  },
  {
    question: "Is your JSON splitter tool free to use?",
    answer:
      "Absolutely! Our online JSON splitter tool is completely free to use with no hidden costs or software installations required. Simply upload your JSON data, select your preferred splitting method, and let the tool do the rest. We are committed to providing a user-friendly, efficient, and secure solution for splitting JSON files, making it accessible to developers, data analysts, and businesses without any financial investment.",
  },
  {
    question: "Does splitting JSON affect the original data structure?",
    answer:
      "No, splitting your JSON files with our online tool does not affect the original data structure. The tool is designed to maintain the integrity of your JSON data by preserving all key-value pairs, nested objects, and arrays in each of the split files. Whether you are splitting by size, key, or array elements, our JSON splitter ensures that each resulting file is a valid JSON file that reflects the same hierarchical structure as the original data, ensuring seamless integration with your applications and systems.",
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
    <div>
      <h1 className="text-center text-5xl my-7 font-bold text-gray-800 ">
        Json Splitter Online
      </h1>
      <p className="text-gray-600 mb-10 text-center px-3">
        Seamlessly Split any <span className="font-semibold">JSON file</span> in
        just a few clicks and instantly{" "}
        <span className="font-semibold">download or copy</span> the splitted
        chunks.
      </p>
      <JsonSplitter />

      <p className="text-gray-600 text-center my-10 px-3">
        No Ads, No sign up. Split Your Files Within A Few Clicks.
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
        <p className="text-gray-600 text-center my-10 px-3">
          {" "}
          Easily split large JSON files online into smaller, manageable chunks
          with our online JSON splitter tool. Perfect for developers and data
          analysts, our free tool efficiently breaks down complex JSON data
          while preserving its structure, making it simple to organize and
          integrate your data seamlessly.
        </p>
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

      <ToolsGrid />
    </div>
  );
};

export default page;
