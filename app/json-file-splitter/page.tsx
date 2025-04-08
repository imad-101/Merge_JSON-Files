import React from "react";
import JsonSplitter from "./Splitter";
import SplitterBlog from "./SplitterBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilePlus, Settings, Download, CheckCircle, Merge } from "lucide-react";

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
    title: "Upload JSON",
    description: "Drag & drop or paste your file",
    icon: FilePlus,
  },
  {
    title: "Set Parameters",
    description: "Choose chunk size or criteria",
    icon: Settings,
  },
  {
    title: "Process Data",
    description: "Instant structure-preserving split",
    icon: Download,
  },
  {
    title: "Download Results",
    description: "Get organized JSON chunks",
    icon: CheckCircle,
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSON Splitter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Split large JSON files into organized, manageable chunks with
            precision
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <span className="px-4 py-2 bg-blue-100 text-gray-700 rounded-md text-sm hidden sm:block">
              No installation required
            </span>
            <span className="px-4 py-2 bg-blue-100 text-gray-700 rounded-md text-sm hidden sm:block">
              Completely Free
            </span>
            <span className="px-4 py-2 bg-blue-100 text-gray-700 rounded-md text-sm hidden sm:block">
              No signup needed
            </span>
          </div>
        </div>

        {/* Main Tool Section */}
        <div className="mb-20 border rounded-lg">
          <JsonSplitter />

          <div className="p-8 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-700 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/">
                <div className="p-4 bg-white border rounded-md hover:border-gray-400">
                  <div className="flex items-center">
                    <Merge className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Merge JSON</p>
                      <p className="text-sm text-gray-500">
                        Combine multiple files
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/json-flattener">
                <div className="p-4 bg-white border rounded-md hover:border-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Flatten JSON</p>
                      <p className="text-sm text-gray-500">
                        Simplify nested structures
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
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
        <div className="mb-20 border rounded-md">
          <div className="p-8 border-b">
            <h2 className="text-xl font-semibold text-center text-gray-800">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="p-8">
            <FaqSection faqs={faqs} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 border rounded-md bg-white">
              <div className="w-10 h-10 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Data Integrity</h3>
              <p className="text-gray-600 text-sm">
                Preserve original structure
              </p>
            </div>
            <div className="p-6 border rounded-md bg-white">
              <div className="w-10 h-10 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">
                Flexible Options
              </h3>
              <p className="text-gray-600 text-sm">
                Multiple splitting criteria
              </p>
            </div>
            <div className="p-6 border rounded-md bg-white">
              <div className="w-10 h-10 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <Download className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">
                Instant Processing
              </h3>
              <p className="text-gray-600 text-sm">
                Fast browser-based results
              </p>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-20 border rounded-md p-8 bg-white">
          <SplitterBlog />
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-gray-300">
              <Link href="/blog/json-tips" className="text-gray-700">
                Read JSON Guides
              </Link>
            </Button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="border rounded-md p-8 bg-white">
          <ToolsGrid />
        </div>
      </div>
    </div>
  );
};

export default Page;
