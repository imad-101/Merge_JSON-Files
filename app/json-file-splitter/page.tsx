import React from "react";
import JsonSplitter from "./Splitter";
import HowItWorks from "../../components/HowItWorks";
import ToolsGrid from "@/components/ToolsGrid";
import { Card, CardContent } from "@/components/ui/card";
import FaqSection from "@/components/Faq";
import SplitterBlog from "./SplitterBlog";

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

const Page = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white bg-gray-950 px-3 sm:px-7 py-4 rounded-md mb-6 inline-block">
            JSON Splitter Online
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-6">
            Seamlessly split any{" "}
            <span className="font-semibold">JSON file</span> into smaller chunks
            and easily download them.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              <span className="w-2 h-2 mr-2 bg-gray-600 rounded-full"></span>
              No Ads
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              <span className="w-2 h-2 mr-2 bg-gray-600 rounded-full"></span>
              Browser-based
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              <span className="w-2 h-2 mr-2 bg-gray-600 rounded-full"></span>
              100% Free
            </span>
          </div>
        </div>

        {/* Main Tool */}
        <div className="rounded-lg mb-24 overflow-hidden">
          <JsonSplitter />
        </div>

        {/* How It Works Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-black text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {/* Connection lines (visible on desktop only) */}
            <div className="hidden md:block absolute top-8 left-[25%] right-[25%] h-px bg-gray-200"></div>
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center mb-4 md:mb-0">
                  <div className="z-10">
                    <HowItWorks
                      {...step}
                      className="transform transition-all duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-white bg-gray-950 rounded-md px-5 py-3 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Card className="border border-gray-100">
            <CardContent className="p-6">
              <FaqSection faqs={faqs} />
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-white bg-gray-950 px-5 py-3 rounded-md text-center mb-12">
            Why Use Our Tool
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-black font-bold">1</span>
                </div>
                <h3 className="font-medium text-lg mb-2">
                  Effortless Splitting
                </h3>
                <p className="text-gray-500 text-sm">
                  Split large JSON files into manageable parts with ease.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-black font-bold">2</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Data Privacy</h3>
                <p className="text-gray-500 text-sm">
                  All processing is done in your browser, ensuring your data
                  remains private.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-black font-bold">3</span>
                </div>
                <h3 className="font-medium text-lg mb-2">
                  Structure Preservation
                </h3>
                <p className="text-gray-500 text-sm">
                  Ensures your JSON structure is maintained without any data
                  loss.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Brief Description */}
        <div className="mb-24 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our JSON splitter breaks down complex JSON files into smaller, more
            manageable chunks while preserving the original structure. Perfect
            for developers and data professionals.
          </p>
        </div>

        {/* Blog Section */}
        <div className="mb-24">
          <SplitterBlog />
        </div>

        {/* Tools Grid */}
        <div className="border-2 rounded-lg p-2 sm:p-4">
          <ToolsGrid />
        </div>
      </div>
    </div>
  );
};

export default Page;
