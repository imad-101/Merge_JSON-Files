import React from "react";
import JsonSplitter from "./Splitter";
import SplitterBlog from "./SplitterBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FilePlus,
  Settings,
  Download,
  CheckCircle,
  Merge,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

const howItWorks = [
  {
    title: "Upload JSON",
    description: "Drag & drop or paste your JSON file.",
    icon: FilePlus,
  },
  {
    title: "Set Parameters",
    description: "Choose chunk size or splitting criteria.",
    icon: Settings,
  },
  {
    title: "Split Data",
    description: "Instantly split into structured chunks.",
    icon: Download,
  },
  {
    title: "Download Results",
    description: "Save your organized JSON chunks.",
    icon: CheckCircle,
  },
];

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

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        first="JSON"
        second="Splitter"
        third="Online"
        href="/json-file-splitter"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful JSON Tools
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            JSON <span className="text-emerald-600">Splitter</span> Online
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">
            Split large JSON files into organized, manageable chunks with our
            advanced splitting tool
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-white shadow-md border border-slate-200 text-slate-700 rounded-full text-sm font-medium flex items-center hover:border-emerald-200 transition-colors">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              No installation required
            </span>
            <span className="px-4 py-2 bg-white shadow-md border border-slate-200 text-slate-700 rounded-full text-sm font-medium flex items-center hover:border-emerald-200 transition-colors">
              <Zap className="h-4 w-4 mr-2 text-amber-500" />
              Completely Free
            </span>
            <span className="px-4 py-2 bg-white shadow-md border border-slate-200 text-slate-700 rounded-full text-sm font-medium flex items-center hover:border-emerald-200 transition-colors">
              <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
              No signup needed
            </span>
          </div>
        </div>

        {/* Main Tool Section */}
        <div className="mb-16 rounded-xl overflow-hidden border-2 border-emerald-500 bg-white">
          <div className="sm:p-8 border-b border-slate-200">
            <JsonSplitter />
          </div>
          <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/" className="group">
                <div className="p-5 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4 group-hover:bg-emerald-200 transition-colors">
                      <Merge className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                        Merge JSON
                      </p>
                      <p className="text-sm text-slate-600">
                        Merge multiple JSON files inot a single file
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>

              <Link href="/json-flattener" className="group">
                <div className="p-5 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4 group-hover:bg-emerald-200 transition-colors">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                        Flatten JSON
                      </p>
                      <p className="text-sm text-slate-600">
                        Flatten your nested JSON files
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works & Key Features */}
        <div className="mb-16">
          <div className="mb-16 p-8 bg-white rounded-xl border border-slate-200">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
                <Zap className="h-4 w-4 mr-2" />
                Simple Process
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Our JSON splitter tool is designed to be intuitive and
                efficient, allowing you to divide files in just a few steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative md:pb-12">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    <div className="z-10 mb-6">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-emerald-200 text-emerald-600 shadow-md group-hover:scale-110 group-hover:border-emerald-400 group-hover:text-emerald-700 transition-all duration-300">
                        <step.icon className="h-7 w-7" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 p-8 md:px-16 bg-white rounded-xl border border-slate-200">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Key Features
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Our JSON splitter tool offers powerful capabilities to handle
                all your data needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  Data Integrity
                </h3>
                <p className="text-slate-600">
                  Preserves original JSON structure and ensures valid output
                  files
                </p>
              </div>
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Settings className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  Flexible Splitting
                </h3>
                <p className="text-slate-600">
                  Supports multiple criteria like size, keys, or array elements
                </p>
              </div>
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Download className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  Instant Processing
                </h3>
                <p className="text-slate-600">
                  Fast browser-based splitting for even large JSON files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16 rounded-xl overflow-hidden border border-emerald-500 bg-white">
          <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
                <Zap className="h-4 w-4 mr-2" />
                Common Questions
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Find answers to common questions about our JSON splitter tool
              </p>
            </div>
          </div>
          <div className="p-8">
            <FaqSection faqs={faqs} />
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-16 rounded-xl overflow-hidden border border-slate-200 bg-white">
          <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Expert Knowledge
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                How to Split JSON files - A Comprehensive Guide
              </h2>
              <p className="mt-7 text-md sm:text-lg  text-center">
                Discover how to <strong>split JSON files</strong> efficiently
                with our advanced <strong>online JSON splitter</strong> tool,
                and learn expert tips on{" "}
                <strong>how to split JSON files</strong> for your data
                management needs.
              </p>
            </div>
          </div>
          <div className="p-8">
            <SplitterBlog />
          </div>
          <div className="mt-8 text-center p-8 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/blog" className="flex items-center">
                Read JSON Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white mb-16">
          <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                More Tools
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Explore Our JSON Toolkit
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Discover our complete suite of JSON tools to enhance your
                workflow
              </p>
            </div>
          </div>
          <div className="p-8">
            <ToolsGrid />
          </div>
        </div>
      </div>

      <Footer name="JSON Splitter" />
    </div>
  );
};

export default Page;
