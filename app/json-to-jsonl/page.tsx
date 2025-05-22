import JsonToJsonlConverter from "./Main";
import JsonToJsonlBlog from "./JsonToJsonlBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
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
    icon: Settings,
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
      "A JSON to JSONL converter is a tool that transforms standard JSON (JavaScript Object Notation) data into JSONL (JSON Lines) format. JSONL is a format where each line is a separate, valid JSON object. This format is particularly useful for handling large datasets, especially in data streaming and machine learning workflows. Our online JSON to JSONL converter simplifies this process by automatically parsing your multi-object JSON structure and writing each object to its own line, ensuring compatibility with tools like Elasticsearch, TensorFlow, and big data platforms. There's no software installation required—just paste or upload your JSON data and get your JSONL output in seconds.",
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
      "Our JSON to JSONL converter supports a wide range of JSON structures including arrays of objects, nested objects, and complex hierarchical data. The tool is designed to intelligently detect the core structure of your JSON input and convert it into a line-delimited JSONL format without breaking the data integrity. Whether your data is an array of flat objects or contains deeply nested elements, the output will maintain each object's completeness while adhering to JSONL syntax, making it ready for streaming, indexing, or bulk processing tasks.",
  },
  {
    question: "Is the JSON to JSONL conversion tool free to use?",
    answer:
      "Our JSON to JSONL converter is 100% free to use with no hidden fees or software installations required. It's a fully online tool, accessible from any modern web browser, and requires no registration. Whether you're a developer, analyst, student, or data enthusiast, you can take advantage of this fast and secure tool to convert JSON to JSONL effortlessly. We believe in making powerful data tools accessible to everyone without financial or technical barriers.",
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
      <Header first="JSON" second="to" third="JSONL" href="/json-to-jsonl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful JSON Tools
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Convert<span className="text-emerald-600"> JSON to JSONL </span>{" "}
            Online
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">
            Effortlessly convert your JSON files to JSONL format for streamlined
            data processing
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

        <div className="mb-16 rounded-xl overflow-hidden border-2 border-emerald-500 bg-white">
          <div className="sm:p-8 border-b border-slate-200">
            <JsonToJsonlConverter />
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/jsonl-to-json" className="group">
                <div className="p-5 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4 group-hover:bg-emerald-200 transition-colors">
                      <SquareStack className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                        JSONL to JSON
                      </p>
                      <p className="text-sm text-slate-600">
                        Convert JSONL back to JSON
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
                        Flatten deeply nested JSON files
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
                Our JSON to JSONL converter tool is designed to be intuitive and
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
                Our JSON to JSONL converter tool offers powerful capabilities to
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
                  structure while converting to JSONL format
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
                  large JSON files with ease and efficiency
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
                Find answers to common questions about our JSON to JSONL
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
                Full Guide to Converting JSON to JSONL Online
              </h2>
            </div>
          </div>

          <JsonToJsonlBlog />
          <div className="mt-8 text-center p-8 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/blog" className="flex items-center">
                Read JSON Guides and Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

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

      <Footer name="JSON to JSONL Converter" />
    </div>
  );
};

export default Page;
