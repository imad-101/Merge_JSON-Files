import HtmlMerger from "./Main";
import MergerBlog from "./MergerBlog";
import ToolsGrid from "@/components/ToolsGrid";
import FaqSection from "@/components/Faq";

import Header from "@/components/Header";
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
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";

const howItWorks = [
  {
    title: "Select Files",
    description: "Choose or drag & drop HTML files you want to combine.",
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
    description: "Save or copy your merged HTML data instantly.",
    icon: Download,
  },
];

const faqs = [
  {
    question: "How do I merge HTML files online?",
    answer:
      "To merge HTML files online, upload your HTML files using the drag-and-drop feature or file selection option. Click 'Merge', and our tool will combine the HTML files into a single structured output while preserving markup integrity. This online HTML merger requires no software installation, offering a fast and efficient solution.",
  },
  {
    question: "What is the best way to merge HTML files?",
    answer:
      "The best way to merge HTML files is by using an online HTML file merger like ours. Instead of manually combining markup or using complex scripts, upload multiple HTML files, and our tool will handle the merging process, ensuring all elements, attributes, and structures are properly combined without data loss.",
  },
  {
    question: "Can I merge HTML files online without signing up?",
    answer:
      "Yes, our tool allows you to merge HTML files online instantly without registration or login. Start merging HTML files by uploading your data, making it a hassle-free solution for quick HTML file merging.",
  },
  {
    question: "How does your online HTML file merger work?",
    answer:
      "Our online HTML file merger combines multiple HTML files into one seamlessly. Upon uploading, the system validates and merges the files while preserving their structure, including tags, attributes, and nested elements, ensuring an accurate and well-formed HTML output.",
  },
  {
    question: "Can I merge large HTML files online?",
    answer:
      "Yes, our tool is optimized to merge large HTML files efficiently. Whether you're working with small or extensive HTML files, our system processes them smoothly, ensuring quick merging without performance issues, ideal for developers and web designers.",
  },
  {
    question: "What happens to nested structures when merging HTML files?",
    answer:
      "When merging HTML files online, our tool preserves all nested structures, including tags and attributes. The merging process intelligently combines markup without breaking the original structure, ensuring a well-formed HTML output that retains all hierarchical relationships.",
  },
  {
    question: "Is it safe to merge HTML files online?",
    answer:
      "Yes, merging HTML files online with our tool is completely safe. We process files directly in your browser, ensuring your data is never stored or uploaded to external servers, guaranteeing privacy and security during the merging process.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen ">
      <Header first="HTML" second="Merger" third="Online" href="/" />

      <div className="flex justify-center"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[#e76f51]/10 text-[#e76f51] text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful HTML Tools
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Merge <span className="text-[#e76f51]"> & </span> Combine
            <span className="text-[#e76f51]"> HTML </span> Files Online
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">
            Combine multiple HTML files into a single structured output with our
            advanced merging tool
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
        <div className="mb-16 rounded-xl overflow-hidden border-2 bg-white">
          <div className="sm:p-8 border-b border-slate-200">
            <HtmlMerger />
          </div>

          <div className="p-8 bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe]">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/html-file-splitter" className="group">
                <div className="p-5 bg-white border border-[#bae6fd] rounded-lg hover:border-[#0ea5e9]/30 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] mr-4 group-hover:bg-[#0ea5e9]/20 transition-colors">
                      <SquareStack className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-[#0ea5e9] transition-colors">
                        Split HTML
                      </p>
                      <p className="text-sm text-slate-600">
                        Split your HTML files into chunks
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-[#0ea5e9] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>

              <Link href="/html-minifier" className="group">
                <div className="p-5 bg-white border border-[#bae6fd] rounded-lg hover:border-[#0ea5e9]/30 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] mr-4 group-hover:bg-[#0ea5e9]/20 transition-colors">
                      <SquareStack className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-[#0ea5e9] transition-colors">
                        Minify HTML
                      </p>
                      <p className="text-sm text-slate-600">
                        Minify your HTML files
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-[#0ea5e9] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-16 p-8 bg-[#edf6f9] rounded-xl border border-slate-200">
            <div className="text-center mb-12">
              
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Our HTML merger tool is designed to be intuitive and efficient,
                allowing you to combine files in just a few steps
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
                Our HTML merger tool offers powerful capabilities to handle all
                your markup needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 border border-slate-200 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:border-[#6b7280]/20 group">
                <div className="w-14 h-14 bg-[#e7ecef]/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#e7ecef]/50 transition-colors">
                  <Settings className="w-7 h-7 text-[#6b7280]" />
                </div>
                <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-[#6b7280] transition-colors">
                  Smart Merging
                </h3>
                <p className="text-slate-600">
                  Intelligent conflict resolution that preserves markup integrity
                  and structure while combining multiple files
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
                  Lightning-fast browser-based processing that handles even
                  large HTML files with ease and efficiency
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
                  Seamlessly works with our other HTML tools to create a
                  complete workflow for all your markup manipulation needs
                </p>
              </div>
            </div>
          </div>
        </div>

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
                Find answers to common questions about our HTML merger tool
              </p>
            </div>
          </div>
          <div className="p-8 bg-[#fdf4ff]/30">
            <FaqSection faqs={faqs} />
          </div>
        </div>

        <div className="mb-16 rounded-xl overflow-hidden border border-[#fed7aa] bg-[#fffbeb]">
          <div className="p-8 border-b border-[#fed7aa] bg-gradient-to-r from-[#fffbeb] to-[#fef3c7]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Expert Knowledge
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Full Guide To Merging HTML Files Online
              </h2>
            </div>
          </div>

          <MergerBlog />
          <div className="mt-8 text-center p-8 border-t border-[#fed7aa] bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]">
            <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/blog" className="flex items-center">
                Read HTML Guide and Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-[#bbf7d0] bg-white mb-16">
          <div className="p-8 border-b border-[#bbf7d0] bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-[#10b981]/10 text-[#10b981] text-sm font-medium shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                More Tools
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Explore Our Toolkit
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Discover our complete suite of HTML and JSON tools to enhance your
                workflow
              </p>
            </div>
          </div>
          <div className="p-8 bg-[#f0fdf4]/30">
            <ToolsGrid />
          </div>
        </div>
      </div>

      <Footer name="HTML Merger" />
    </div>
  );
};

export default Page;