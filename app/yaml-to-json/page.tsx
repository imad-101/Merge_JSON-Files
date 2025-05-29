import YamlToJsonConverter from "./main";
import YamlToJsonBlog from "./YamlToJsonBlog";
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
      "Converting YAML to JSON preserves the data's structure and content, transforming YAML's human-readable format into JSON's structured format. All scalars, sequences, and mappings are maintained, with nested objects and arrays accurately represented in JSON. Our tool ensures no data loss, making the JSON output equivalent to the YAML input, ready for use in JSON-compatible systems.",
  },
  {
    question: "What are common use cases for JSON files after conversion?",
    answer:
      "JSON files are used in web development, APIs, databases, and configuration management. After converting YAML to JSON, the output is ideal for REST APIs, NoSQL databases like MongoDB, JavaScript applications, and data visualization tools. JSON's structured format supports seamless data exchange, making it perfect for application development, data integration, and configuration migrations.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header first="YAML" second="to" third="JSON" href="/yaml-to-json" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful JSON Tools
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Convert <span className="text-emerald-600">YAML TO JSON</span>{" "}
            Online
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">
            Seamlessly convert your YAML files to structured JSON format for
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
            <YamlToJsonConverter />
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Our YAML to JSON converter tool is designed to be intuitive and
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
          <AdUnit name="article1" />
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
                Our YAML to JSON converter tool offers powerful capabilities to
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
                  large YAML files with ease and efficiency
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
                Find answers to common questions about our YAML to JSON
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
                Convert YAML to JSON Online: The Ultimate Guide to Structured
                JSON
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-center">
                Discover how to effortlessly{" "}
                <strong>convert YAML to JSON</strong> using our online converter
                and learn why structured JSON is critical for APIs, databases,
                and modern applications.
              </p>
            </div>
          </div>

          <YamlToJsonBlog />
          <div className="mt-8 text-center p-8 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/blog" className="flex items-center">
                Read YAML to JSON Guides
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

      <Footer name="YAML to JSON Converter" />
    </div>
  );
};

export default Page;
