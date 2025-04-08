import JsonFlattener from "./Main";
import FlattenerBlog from "./FlattenerBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks";

import Link from "next/link";
import {
  Upload,
  FilePlus,
  Settings,
  Download,
  CheckCircle,
  SquareStack,
  LinkIcon,
} from "lucide-react";

const howItWorks = [
  {
    title: "Select File",
    description: "Choose or drag & drop a JSON file you want to flatten.",
    icon: FilePlus,
  },
  {
    title: "Upload",
    description: "Upload your selected file for automatic validation.",
    icon: Upload,
  },
  {
    title: "Flatten",
    description: "One click to convert nested JSON into a flat structure.",
    icon: Settings,
  },
  {
    title: "Download",
    description: "Save or copy your flattened JSON data instantly.",
    icon: Download,
  },
];
const faqs = [
  {
    question: "How do I flatten JSON files online?",
    answer:
      "To flatten JSON files online, simply upload your JSON file to our easy-to-use tool using the drag-and-drop feature or file selection option. Once uploaded, click the 'Flatten' button, and our advanced JSON flattener will instantly convert complex nested JSON structures into a simpler, flat format for easier processing and analysis.",
  },
  {
    question: "What is the best way to flatten JSON files?",
    answer:
      "The best way to flatten JSON files is by using a reliable online tool like ours. Instead of spending hours writing custom code to iterate over deeply nested objects, you can upload your JSON file to our platform and let our automated JSON flattener handle the entire process efficiently and accurately.",
  },
  {
    question: "Can I flatten JSON files online without signing up?",
    answer:
      "Yes, you can flatten JSON files online instantly without the need for registration or login. Our free JSON flattener tool allows you to upload your data, flatten it with a single click, and download the results seamlessly, all without any signup requirements.",
  },
  {
    question: "How does your online JSON flattener work?",
    answer:
      "Our online JSON flattener processes your uploaded JSON file directly in your browser, ensuring maximum security and privacy. It converts nested keys into a flat key-value structure, making even deeply nested data accessible and easier to work with. This browser-based approach ensures fast and efficient processing.",
  },
  {
    question: "Can I flatten large JSON files online?",
    answer:
      "Yes, our tool is optimized to handle and flatten large JSON files efficiently. Whether you have a small JSON file or a massive dataset, our advanced JSON flattener processes it quickly while maintaining high performance and accuracy, making it ideal for large-scale data processing tasks.",
  },
  {
    question: "What happens to nested structures when flattening JSON files?",
    answer:
      "When flattening JSON files, our tool intelligently converts nested objects and arrays into a flat key-value format. The process generates keys that represent the nested paths, ensuring no data is lost while making the structure more accessible and easier to analyze for various use cases.",
  },
  {
    question: "Is it safe to flatten JSON files online?",
    answer:
      "Absolutely. Our JSON flattener tool processes your data directly in your browser, meaning your file is never uploaded to external servers. This guarantees complete security and privacy, making it a safe and reliable solution for flattening JSON files online.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSON Flattener
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert nested JSON files into a flat structure for easier
            processing
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
          <div className="sm:p-8 border-b ">
            <JsonFlattener />
          </div>

          {/* Post-Flatten CTAs */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-700 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/json-to-jsonl">
                <div className="p-4 bg-white border rounded-md hover:border-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">
                        Convert To JSONL
                      </p>
                      <p className="text-sm text-gray-500">
                        Convert your JSON to JSONL format
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/">
                <div className="p-4 bg-white border rounded-md hover:border-gray-400">
                  <div className="flex items-center">
                    <SquareStack className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Merge JSON</p>
                      <p className="text-sm text-gray-500">
                        Combine multiple files
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
            <h2 className="text-xl font-semibold text-center px-5 py-4  text-gray-800">
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
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">
                Smart Flattening
              </h3>
              <p className="text-gray-600 text-sm">
                Converts nested JSON into flat, key-based structures
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
                Fast browser-based flattening for improved performance
              </p>
            </div>
            <div className="p-6 border rounded-md bg-white">
              <div className="w-10 h-10 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">
                Full Integration
              </h3>
              <p className="text-gray-600 text-sm">
                Easily combine with other JSON tools for complete workflows
              </p>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-20 border rounded-md p-8 bg-white">
          <FlattenerBlog />
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
