import JsonFlattener from "./Main";
import FlattenerBlog from "./FlattenerBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Upload,
  FilePlus,
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
    <div className="min-h-screen ">
      <Header
        first="JSON"
        second="Flattener"
        third="Online"
        href="/json-flattener"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[#e76f51]/10 text-[#e76f51] text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful JSON Tools
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            JSON <span className="text-[#e76f51]">Flattener</span> Online
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">
            Convert nested JSON files into a flat structure for easier
            processing and analysis
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-white shadow-md border border-slate-200 text-slate-700 rounded-full text-sm font-medium flex items-center hover:border-[#e76f51]/20 transition-colors">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              No installation required
            </span>
            <span className="px-4 py-2 bg-white shadow-md border border-slate-200 text-slate-700 rounded-full text-sm font-medium flex items-center hover:border-[#e76f51]/20 transition-colors">
              <Zap className="h-4 w-4 mr-2 text-amber-500" />
              Completely Free
            </span>
            <span className="px-4 py-2 bg-white shadow-md border border-slate-200 text-slate-700 rounded-full text-sm font-medium flex items-center hover:border-[#e76f51]/20 transition-colors">
              <CheckCircle className="h-4 w-4 mr-2 text-[#e76f51]" />
              No signup needed
            </span>
          </div>
        </div>

        {/* Main Tool Section */}
        <div className="mb-16 rounded-xl overflow-hidden border-2 border-[#e76f51] bg-white">
          <div className="sm:p-8 border-b border-slate-200">
            <JsonFlattener />
          </div>
          <div className="p-8 bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe]">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/json-to-jsonl" className="group">
                <div className="p-5 bg-white border border-[#bae6fd] rounded-lg hover:border-[#0ea5e9]/30 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] mr-4 group-hover:bg-[#0ea5e9]/20 transition-colors">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-[#0ea5e9] transition-colors">
                        Convert To JSONL
                      </p>
                      <p className="text-sm text-slate-600">
                        Convert your JSON to JSONL format
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-[#0ea5e9] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
              <Link href="/" className="group">
                <div className="p-5 bg-white border border-[#bae6fd] rounded-lg hover:border-[#0ea5e9]/30 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] mr-4 group-hover:bg-[#0ea5e9]/20 transition-colors">
                      <SquareStack className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-[#0ea5e9] transition-colors">
                        Merge JSON
                      </p>
                      <p className="text-sm text-slate-600">
                        Combine multiple files
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-[#0ea5e9] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works and Key Features */}
        <div className="mb-16">
          {/* How It Works */}
          <div className="mb-16 p-8 bg-[#dee2ff] rounded-xl border border-slate-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Our JSON flattener tool is designed to be intuitive and
                efficient, allowing you to flatten files in just a few steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative md:pb-12">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    <div className="z-10 mb-6">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-[#dee2ff]/60 text-[#8b8fcc] shadow-md group-hover:scale-110 group-hover:border-[#dee2ff] group-hover:text-[#6b70a6] transition-all duration-300">
                        <step.icon className="h-7 w-7" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-[#6b70a6] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Key Features */}
          <div className="mb-16 p-8 md:px-16 bg-[#e7ecef] rounded-xl border border-slate-200">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-[#e7ecef]/30 text-[#6b7280] text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Key Features
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Our JSON flattener tool offers powerful capabilities to handle
                all your data needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-[#6b7280]/20 group">
                <div className="w-14 h-14 bg-[#e7ecef]/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#e7ecef]/50 transition-colors">
                  <Settings className="w-7 h-7 text-[#6b7280]" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-[#6b7280] transition-colors">
                  Smart Flattening
                </h3>
                <p className="text-slate-600">
                  Converts nested JSON into flat, key-based structures with
                  precision and efficiency
                </p>
              </div>
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-[#6b7280]/20 group">
                <div className="w-14 h-14 bg-[#e7ecef]/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#e7ecef]/50 transition-colors">
                  <Download className="w-7 h-7 text-[#6b7280]" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-[#6b7280] transition-colors">
                  Instant Processing
                </h3>
                <p className="text-slate-600">
                  Lightning-fast browser-based processing for even large JSON
                  files
                </p>
              </div>
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-[#6b7280]/20 group">
                <div className="w-14 h-14 bg-[#e7ecef]/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#e7ecef]/50 transition-colors">
                  <LinkIcon className="w-7 h-7 text-[#6b7280]" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-[#6b7280] transition-colors">
                  Full Integration
                </h3>
                <p className="text-slate-600">
                  Seamlessly works with our other JSON tools for a complete
                  workflow
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16 rounded-xl overflow-hidden border border-[#f0abfc] bg-white">
          <div className="p-8 border-b border-[#f0abfc] bg-gradient-to-r from-[#fdf4ff] to-[#fef7ff]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-[#c084fc]/10 text-[#c084fc] text-sm font-medium shadow-sm">
                <Zap className="h-4 w-4 mr-2" />
                Common Questions
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Find answers to common questions about our JSON flattener tool
              </p>
            </div>
          </div>
          <div className="p-8 bg-[#fdf4ff]/30">
            <FaqSection faqs={faqs} />
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-16 rounded-xl overflow-hidden border border-[#fed7aa] bg-[#fffbeb]">
          <div className="p-8 border-b border-[#fed7aa] bg-gradient-to-r from-[#fffbeb] to-[#fef3c7]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Expert Knowledge
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Flattening JSON files online : A Comprehensive Guide
              </h2>
              <p className="mt-7 text-md sm:text-lg text-center">
                Discover how to <strong>flatten JSON</strong> effortlessly using
                our powerful <strong>Online JSON flattener</strong> tool and
                explore best practices for handling nested data.
              </p>
            </div>
          </div>
          <FlattenerBlog />
          <div className="mt-8 text-center p-8 border-t border-[#fed7aa] bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]">
            <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/blog" className="flex items-center">
                Read JSON Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        {/* Tools Grid */}
        <div className="rounded-xl overflow-hidden border border-[#bbf7d0] bg-white mb-16">
          <div className="p-8 border-b border-[#bbf7d0] bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-[#10b981]/10 text-[#10b981] text-sm font-medium shadow-sm">
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
          <div className="p-8 bg-[#f0fdf4]/30">
            <ToolsGrid />
          </div>
        </div>
      </div>

      <Footer name="JSON Flattener" />
    </div>
  );
};

export default Page;
