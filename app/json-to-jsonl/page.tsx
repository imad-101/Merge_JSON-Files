import React from "react";
import JsonToJsonlConverter from "./Main";
import JsonToJsonlBlog from "./JsonToJsonlBlog";
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
      "Choose a JSON file via drag & drop or paste JSON text directly.",
    icon: Upload,
  },
  {
    title: "Process",
    description: "Our converter reads and validates your JSON input.",
    icon: FileText,
  },
  {
    title: "Convert",
    description:
      "Instantly convert your JSON data to JSONL (JSON Lines) format.",
    icon: Loader,
  },
  {
    title: "Download",
    description: "Save or copy your JSONL output for seamless integration.",
    icon: Download,
  },
];

const faqs = [
  {
    question: "What is a JSON to JSONL converter and how does it work?",
    answer:
      "A JSON to JSONL converter is a tool that transforms standard JSON (JavaScript Object Notation) data into JSONL (JSON Lines) format. JSONL is a format where each line is a separate, valid JSON object. This format is particularly useful for handling large datasets, especially in data streaming and machine learning workflows. Our online JSON to JSONL converter simplifies this process by automatically parsing your multi-object JSON structure and writing each object to its own line, ensuring compatibility with tools like Elasticsearch, TensorFlow, and big data platforms. There’s no software installation required—just paste or upload your JSON data and get your JSONL output in seconds.",
  },
  {
    question: "How do I convert JSON to JSONL online?",
    answer:
      "To convert JSON to JSONL online, simply copy and paste your JSON content or upload your JSON file into our free JSON to JSONL converter tool. The tool instantly processes the input, flattens the array structure (if applicable), and outputs each JSON object on a new line, compliant with JSONL standards. You can then download or copy the converted content. This is especially useful for developers, data scientists, and analysts who need to work with line-delimited JSON formats for tools that require line-by-line processing or ingestion.",
  },
  {
    question: "Why should I convert JSON to JSONL format?",
    answer:
      "Converting JSON to JSONL is beneficial when working with large datasets or systems that process data in streams or batches. JSONL (JSON Lines) is more efficient for parsing and memory usage, especially when handling big data files or logs. Each line in a JSONL file is a separate JSON object, which makes it easier to append, stream, and read incrementally. Many modern data platforms, including Elasticsearch, Apache Spark, and AWS services, prefer or require data in JSONL format. By using our online converter, you can ensure your data is in the optimal format for such systems without the need for manual reformatting.",
  },
  {
    question: "Can I convert large JSON files to JSONL using your tool?",
    answer:
      "Yes, our online JSON to JSONL converter is built to handle large JSON files efficiently. Whether you're working with a few hundred records or thousands of entries, our tool is optimized to process the conversion quickly and accurately. It supports deeply nested JSON structures and large arrays, ensuring each object is correctly extracted and placed on its own line. This allows for scalable data processing and seamless integration into data pipelines or log management systems that require JSONL input.",
  },
  {
    question:
      "What types of JSON structures are supported in your JSON to JSONL converter?",
    answer:
      "Our JSON to JSONL converter supports a wide range of JSON structures including arrays of objects, nested objects, and complex hierarchical data. The tool is designed to intelligently detect the core structure of your JSON input and convert it into a line-delimited JSONL format without breaking the data integrity. Whether your data is an array of flat objects or contains deeply nested elements, the output will maintain each object’s completeness while adhering to JSONL syntax, making it ready for streaming, indexing, or bulk processing tasks.",
  },
  {
    question: "Is the JSON to JSONL conversion tool free to use?",
    answer:
      "Absolutely! Our JSON to JSONL converter is 100% free to use with no hidden fees or software installations required. It’s a fully online tool, accessible from any modern web browser, and requires no registration. Whether you’re a developer, analyst, student, or data enthusiast, you can take advantage of this fast and secure tool to convert JSON to JSONL effortlessly. We believe in making powerful data tools accessible to everyone without financial or technical barriers.",
  },
  {
    question: "Does converting JSON to JSONL change the data structure?",
    answer:
      "Converting JSON to JSONL does not alter the core structure of your data. Instead, it re-organizes the data into a line-separated format, where each line represents a valid JSON object. This format is functionally equivalent but more suitable for certain use cases like streaming, batch processing, and indexing. Our tool ensures that all key-value pairs, nested fields, and object hierarchies are preserved in each line, so the meaning and data relationships remain intact. This makes the JSONL output both human-readable and machine-parsable while maintaining data integrity.",
  },
  {
    question: "What are common use cases for JSONL files after conversion?",
    answer:
      "JSONL files are commonly used in big data analytics, machine learning pipelines, log aggregation systems, and search engine indexing. Platforms like Elasticsearch, Google Cloud, and Python-based tools such as pandas or TensorFlow often expect or perform better with JSONL input. The line-by-line format is ideal for streaming data or processing records incrementally without loading the entire dataset into memory. By converting your JSON data into JSONL format with our tool, you're making it more compatible with these high-performance, scalable systems, enabling faster ingestion and smoother data workflows.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSON to JSONL Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Effortlessly convert your JSON files to JSONL format for streamlined
            data processing.
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
            <JsonToJsonlConverter />
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
                      <p className="font-medium text-gray-800">Flatten JSON </p>
                      <p className="text-sm text-gray-500">
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
                      <p className="text-sm text-gray-500">
                        Split JSON files in chunks
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
          <JsonToJsonlBlog />
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-gray-300">
              <Link
                href="/blog/json-to-jsonl-best-practices"
                className="text-gray-700"
              >
                Read More on JSONL
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
