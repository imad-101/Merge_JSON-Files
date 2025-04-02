import JsonMerger from "./Main";
import MergerBlog from "./MergeBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks";

import { Upload, FilePlus, Settings, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const howItWorks = [
  {
    title: "Select Files",
    description: "Choose or drag & drop JSON files you want to combine.",
    icon: FilePlus,
  },
  {
    title: "Upload",
    description: "Upload your selected files for automatic validation.",
    icon: Upload,
  },
  {
    title: "Merge",
    description: "One click to combine all files into a single structure.",
    icon: Settings,
  },
  {
    title: "Download",
    description: "Save or copy your merged JSON data instantly.",
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

const Page = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 px-3 sm:px-7 py-4 rounded-md mb-6 inline-block">
            JSON Merger Online
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-6">
            Combine multiple JSON files into one structured output.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              <span className="w-2 h-2 mr-2 bg-gray-600 rounded-full"></span>
              No signup
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              <span className="w-2 h-2 mr-2 bg-gray-600 rounded-full"></span>
              Browser-based
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              <span className="w-2 h-2 mr-2 bg-gray-600 rounded-full"></span>
              100% free
            </span>
          </div>
        </div>

        {/* Main Tool */}
        <div className=" rounded-lg  mb-24 overflow-hidden">
          <JsonMerger />
        </div>

        {/* How It Works Section */}
        <div className="mb-24 ">
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
                <h3 className="font-medium text-lg mb-2">Effortless Merging</h3>
                <p className="text-gray-500 text-sm">
                  Merge complex JSON structures with a single click, no coding
                  required.
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
                  All processing happens in your browser—your data never leaves
                  your device.
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
                  Maintains nested objects and arrays without corrupting your
                  data structure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Brief Description */}
        <div className="mb-24 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our JSON merger preserves data integrity while combining multiple
            files into one clean output. Built for developers and data
            professionals—simple, secure, and efficient.
          </p>
        </div>

        {/* Blog Section */}
        <div className="mb-24">
          <MergerBlog />
        </div>

        {/* Tools Grid */}
        <div className="border-2 rounded-lg p-2 sm:px-6">
          <ToolsGrid />
        </div>
      </div>
    </div>
  );
};

export default Page;
