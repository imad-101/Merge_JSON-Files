import React from "react";
import JsonlToJsonConverter from "./main";
import JsonlToJsonBlog from "./JsonToJsonBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Upload,
  Download,
  Loader,
  FileText,
  CheckCircle,
  LinkIcon,
} from "lucide-react";

const howItWorks = [
  {
    title: "Upload or Paste",
    description:
      "Choose a JSONL file via drag & drop or paste JSONL text directly.",
    icon: Upload,
  },
  {
    title: "Process",
    description: "Our converter reads and validates your JSONL input.",
    icon: FileText,
  },
  {
    title: "Convert",
    description: "Instantly convert your JSONL data to structured JSON format.",
    icon: Loader,
  },
  {
    title: "Download",
    description: "Save or copy your JSON output for seamless integration.",
    icon: Download,
  },
];

const faqs = [
  {
    question: "What is a JSONL to JSON converter and how does it work?",
    answer:
      "A JSONL to JSON converter is a tool that transforms JSONL (JSON Lines) data into standard JSON (JavaScript Object Notation) format. JSONL consists of individual JSON objects on separate lines, ideal for streaming and big data. Our online JSONL to JSON converter combines these lines into a single, structured JSON array or object, making it compatible with applications requiring traditional JSON. Simply upload or paste your JSONL data, and our tool processes it instantly, producing clean JSON output without any software installation.",
  },
  {
    question: "How do I convert JSONL to JSON online?",
    answer:
      "To convert JSONL to JSON online, copy and paste your JSONL content or upload a JSONL file into our free JSONL to JSON converter tool. The tool processes each line, validates the JSON objects, and combines them into a unified JSON structure, typically an array. The converted JSON can then be downloaded or copied for use in applications, APIs, or databases. This is ideal for developers and data analysts needing structured JSON for further processing.",
  },
  {
    question: "Why should I convert JSONL to JSON format?",
    answer:
      "Converting JSONL to JSON is useful when you need a single, structured JSON object or array for applications that don’t support line-delimited formats. JSON is widely used in APIs, web applications, and databases that expect a cohesive data structure. Our JSONL to JSON converter ensures your data is reorganized into a compact, readable format, making it easier to integrate with tools like MongoDB, REST APIs, or JavaScript frameworks, without losing data integrity.",
  },
  {
    question: "Can I convert large JSONL files to JSON using your tool?",
    answer:
      "Yes, our JSONL to JSON converter is designed to handle large JSONL files efficiently. Whether you have hundreds or thousands of JSON objects in your JSONL file, our tool processes them quickly, combining them into a single JSON structure. It supports complex and nested objects, ensuring accurate conversion for use in data pipelines, analytics platforms, or API integrations, all while maintaining performance and reliability.",
  },
  {
    question:
      "What types of JSONL structures are supported in your JSONL to JSON converter?",
    answer:
      "Our JSONL to JSON converter supports a variety of JSONL structures, including files with flat objects, nested objects, or mixed data types on each line. The tool intelligently validates each line as a standalone JSON object and combines them into a cohesive JSON array or object, preserving all nested fields and data relationships. This makes the output suitable for applications requiring standard JSON, such as web development or database ingestion.",
  },
  {
    question: "Is the JSONL to JSON conversion tool free to use?",
    answer:
      "Yes, our JSONL to JSON converter is completely free to use, with no hidden costs or software downloads required. Accessible from any modern web browser, it requires no registration, making it ideal for developers, data scientists, students, or anyone needing quick JSONL to JSON conversion. We aim to provide a fast, secure, and accessible tool for all users, regardless of technical or financial constraints.",
  },
  {
    question: "Does converting JSONL to JSON change the data structure?",
    answer:
      "Converting JSONL to JSON reorganizes the data from a line-separated format into a single JSON array or object, but it does not alter the content of the individual objects. Each JSON object from the JSONL file is preserved, including nested fields and key-value pairs. Our tool ensures the output is a valid, structured JSON format, maintaining data integrity while making it compatible with systems that require standard JSON input.",
  },
  {
    question: "What are common use cases for JSON files after conversion?",
    answer:
      "JSON files are widely used in web development, APIs, databases, and configuration files. After converting JSONL to JSON, the output is ideal for integrating with REST APIs, storing data in NoSQL databases like MongoDB, or powering JavaScript applications. The structured JSON format is also useful for data visualization, testing, or sharing data with systems that don’t support JSONL’s line-delimited structure, ensuring broad compatibility and ease of use.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSONL to JSON Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seamlessly convert your JSONL files to structured JSON format for
            enhanced compatibility and data processing.
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

        {/* Main Converter Section */}
        <div className="mb-20 border rounded-lg">
          <div className="sm:p-8 border-b">
            <JsonlToJsonConverter />
          </div>
          {/* Next Steps Section */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-700 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/json-flattener">
                <div className="p-4 bg-white border rounded-md hover:border-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Flatten JSON</p>
                      <p className="text-sm text-gray-600">
                        Flatten deeply nested JSON files
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/json-file-splitter">
                <div className="p-4 bg-white border rounded-md hover:border-gray-400">
                  <div className="flex items-center">
                    <LinkIcon className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Split JSON</p>
                      <p className="text-sm text-gray-600">
                        Split JSON files into chunks
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
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
            <h2 className="text-xl font-semibold text-center px-5 py-4 text-gray-800">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="p-8">
            <FaqSection faqs={faqs} />
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-20 border rounded-md p-8 bg-white">
          <JsonlToJsonBlog />
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-gray-300">
              <Link
                href="/blog/jsonl-to-json-best-practices"
                className="text-gray-700"
              >
                Read More on JSONL to JSON
              </Link>
            </Button>
          </div>
        </div>

        {/* Tools Grid Section */}
        <div className="border rounded-md p-8 bg-white">
          <ToolsGrid />
        </div>
      </div>
    </div>
  );
};

export default Page;
