import JsonMerger from "./Main";
import MergerBlog from "./MergeBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSON Merger Online
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combine multiple JSON files into a single structured output
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
            <JsonMerger />
          </div>

          {/* Post-Merge CTAs */}
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
              <Link href="/json-file-splitter">
                <div className="p-4 bg-white border rounded-md hover:border-gray-400">
                  <div className="flex items-center">
                    <SquareStack className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Split JSON</p>
                      <p className="text-sm text-gray-500">
                        Split your JSON files into chunks
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
            <h2 className="text-xl font-semibold text-center  px-5 py-4  text-gray-800">
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
              <h3 className="font-medium text-gray-800 mb-2">Smart Merging</h3>
              <p className="text-gray-600 text-sm">
                Automatic conflict resolution
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
            <div className="p-6 border rounded-md bg-white">
              <div className="w-10 h-10 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">
                Full Integration
              </h3>
              <p className="text-gray-600 text-sm">
                Works with other JSON tools
              </p>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-20 border rounded-md p-8 bg-white">
          <MergerBlog />
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-gray-300">
              <Link href="/blog/json-best-practices" className="text-gray-700">
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
