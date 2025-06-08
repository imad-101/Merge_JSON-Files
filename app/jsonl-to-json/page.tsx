import JsonlToJsonConverter from "./main";
import JsonlToJsonBlog from "./JsonToJsonBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import {
  Upload,
  FileText,
  Settings,
  Download,
  CheckCircle,
  SquareStack,
  LinkIcon,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";

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
    icon: Settings,
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
      "Converting JSONL to JSON is useful when you need a single, structured JSON object or array for applications that don't support line-delimited formats. JSON is widely used in APIs, web applications, and databases that expect a cohesive data structure. Our JSONL to JSON converter ensures your data is reorganized into a compact, readable format, making it easier to integrate with tools like MongoDB, REST APIs, or JavaScript frameworks, without losing data integrity.",
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
      "JSON files are widely used in web development, APIs, databases, and configuration files. After converting JSONL to JSON, the output is ideal for integrating with REST APIs, storing data in NoSQL databases like MongoDB, or powering JavaScript applications. The structured JSON format is also useful for data visualization, testing, or sharing data with systems that don't support JSONL's line-delimited structure, ensuring broad compatibility and ease of use.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header first="JSONL" second="to" third="JSON" href="/jsonl-to-json" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful JSON Tools
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Convert <span className="text-emerald-600">JSONL TO JSON</span>{" "}
            Online
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">
            Seamlessly convert your JSONL files to structured JSON format for
            enhanced compatibility and data processing
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

        <AdUnit name="responsive1" />

        <div className="mb-16 rounded-xl overflow-hidden border-2 border-emerald-500 bg-white">
          <div className="sm:p-8 border-b border-slate-200">
            <JsonlToJsonConverter />
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/json-to-jsonl" className="group">
                <div className="p-5 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4 group-hover:bg-emerald-200 transition-colors">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                        JSON to JSONL
                      </p>
                      <p className="text-sm text-slate-600">
                        Convert JSON back to JSONL format
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
              <Link href="/json-file-splitter" className="group">
                <div className="p-5 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4 group-hover:bg-emerald-200 transition-colors">
                      <SquareStack className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                        Split JSON
                      </p>
                      <p className="text-sm text-slate-600">
                        Split your JSON files into chunks
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

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
                Our JSONL to JSON converter tool is designed to be intuitive and
                efficient, allowing you to convert files in just a few steps
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

          {/* <AdUnit name="article1" /> */}

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
                Our JSONL to JSON converter tool offers powerful capabilities to
                handle all your data needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Settings className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  Smart Conversion
                </h3>
                <p className="text-slate-600">
                  Intelligent processing that preserves data integrity and
                  structure while converting to JSON format
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
                  Lightning-fast browser-based processing that handles even
                  large JSONL files with ease and efficiency
                </p>
              </div>
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl mb-6 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <LinkIcon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  Full Integration
                </h3>
                <p className="text-slate-600">
                  Seamlessly works with our other JSON tools to create a
                  complete workflow for all your data manipulation needs
                </p>
              </div>
            </div>
          </div>
        </div>

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
                Find answers to common questions about our JSONL to JSON
                converter tool
              </p>
            </div>
          </div>
          <div className="p-8">
            <FaqSection faqs={faqs} />
          </div>
        </div>

        <div className="mb-16 rounded-xl overflow-hidden border border-slate-200 bg-white">
          <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Expert Knowledge
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Online JSONL to JSON Conversion Guide
              </h2>

              <p className="mt-6 text-lg sm:text-xl text-center">
                Learn how to seamlessly <strong>convert JSONL to JSON</strong>{" "}
                with our online converter and discover why structured JSON is
                essential for APIs, databases, and web applications.
              </p>
            </div>
          </div>

          <JsonlToJsonBlog />
          <div className="mt-8 text-center p-8 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/blog" className="flex items-center">
                Read JSON Articles and Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* <AdUnit name="article2" /> */}
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

      <Footer name="JSONL to JSON Converter" />
    </div>
  );
};

export default Page;
