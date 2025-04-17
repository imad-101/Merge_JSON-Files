import React from "react";
import JsonFlattener from "./main";
import YamlToJsonBlog from "./YamlToJsonBlog";
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
      "Choose a YAML file via drag & drop or paste YAML text directly.",
    icon: Upload,
  },
  {
    title: "Process",
    description: "Our converter reads and validates your YAML input.",
    icon: FileText,
  },
  {
    title: "Convert",
    description: "Instantly convert your YAML data to structured JSON format.",
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
    question: "What is a YAML to JSON converter and how does it work?",
    answer:
      "A YAML to JSON converter is a tool that transforms YAML (YAML Ain't Markup Language) data into JSON (JavaScript Object Notation) format. YAML is a human-readable data serialization format, often used for configuration files, while JSON is widely used in APIs and databases. Our online YAML to JSON converter parses your YAML input, validates its structure, and converts it into a structured JSON object or array, ensuring compatibility with JSON-based systems. Simply upload or paste your YAML data, and get JSON output instantly, no software required.",
  },
  {
    question: "How do I convert YAML to JSON online?",
    answer:
      "To convert YAML to JSON online, paste your YAML content or upload a YAML file into our free converter tool. The tool processes the input, validates the YAML syntax, and generates a structured JSON output. You can then download or copy the JSON for use in applications, APIs, or databases. This is ideal for developers, DevOps engineers, and data analysts needing JSON for web development or data integration.",
  },
  {
    question: "Why should I convert YAML to JSON format?",
    answer:
      "Converting YAML to JSON is essential when you need a format compatible with JSON-based systems, such as REST APIs, NoSQL databases, or JavaScript applications. JSON is a universal data format supported across platforms, making it ideal for data exchange and storage. Our YAML to JSON converter ensures your data is transformed into a structured, machine-readable JSON format, preserving all fields and hierarchies, ready for seamless integration.",
  },
  {
    question: "Can I convert large YAML files to JSON using your tool?",
    answer:
      "Yes, our YAML to JSON converter is optimized to handle large YAML files efficiently. Whether you have complex configurations or extensive datasets, our tool processes them quickly, converting nested structures into JSON without data loss. It supports large files and intricate YAML hierarchies, making it suitable for enterprise-level data pipelines and configuration migrations.",
  },
  {
    question:
      "What types of YAML structures are supported in your YAML to JSON converter?",
    answer:
      "Our converter supports all valid YAML structures, including scalars, sequences, mappings, nested objects, and arrays. It handles complex YAML configurations with anchors, aliases, and multi-document streams, ensuring accurate conversion to JSON. The tool validates each YAML element, preserving data integrity and producing JSON output compatible with applications requiring structured data.",
  },
  {
    question: "Is the YAML to JSON conversion tool free to use?",
    answer:
      "Absolutely, our YAML to JSON converter is 100% free, with no hidden fees or software downloads required. Accessible from any modern browser, it requires no registration, making it perfect for developers, students, and data professionals. Convert YAML to JSON effortlessly, anytime, anywhere, without financial or technical barriers.",
  },
  {
    question: "Does converting YAML to JSON change the data structure?",
    answer:
      "Converting YAML to JSON preserves the data’s structure and content, transforming YAML’s human-readable format into JSON’s structured format. All scalars, sequences, and mappings are maintained, with nested objects and arrays accurately represented in JSON. Our tool ensures no data loss, making the JSON output equivalent to the YAML input, ready for use in JSON-compatible systems.",
  },
  {
    question: "What are common use cases for JSON files after conversion?",
    answer:
      "JSON files are used in web development, APIs, databases, and configuration management. After converting YAML to JSON, the output is ideal for REST APIs, NoSQL databases like MongoDB, JavaScript applications, and data visualization tools. JSON’s structured format supports seamless data exchange, making it perfect for application development, data integration, and configuration migrations.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YAML to JSON Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seamlessly convert your YAML files to structured JSON format for
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
            <JsonFlattener />
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
          <YamlToJsonBlog />
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-gray-300">
              <Link
                href="/blog/yaml-to-json-best-practices"
                className="text-gray-700"
              >
                Read More on YAML to JSON
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
