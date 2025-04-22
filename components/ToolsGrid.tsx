import type React from "react";
import Link from "next/link";
import {
  FileJson,
  Split,
  ArrowDownUp,
  FileSearch,
  FileCode,
  FileCog,
  FileText,
  ArrowRight,
  Layers,
} from "lucide-react";
// import AdUnit from "./AdUnit";

interface Tool {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const tools: Tool[] = [
  {
    title: "JSON Merger",
    description: "Combine multiple JSON files into a single structured output",
    icon: Layers,
    href: "/",
    isPopular: true,
  },
  {
    title: "JSON to JSONL",
    description: "Convert JSON arrays to JSON Lines format",
    icon: ArrowDownUp,
    href: "/json-to-jsonl",
  },
  {
    title: "JSON Splitter",
    description: "Split large JSON files into smaller chunks",
    icon: Split,
    href: "/json-file-splitter",
  },
  {
    title: "JSON Validator",
    description: "Validate and format your JSON data",
    icon: FileSearch,
    href: "/json-validator",
    isNew: true,
  },
  {
    title: "JSON to CSV",
    description: "Convert JSON data to CSV format",
    icon: FileText,
    href: "/json-to-csv",
  },
  {
    title: "JSON to XML",
    description: "Transform JSON data to XML format",
    icon: FileCode,
    href: "/json-to-xml",
  },
  {
    title: "JSON Schema Generator",
    description: "Generate JSON schema from your data",
    icon: FileCog,
    href: "/json-schema-generator",
  },
  {
    title: "JSON Beautifier",
    description: "Format and beautify your JSON data",
    icon: FileJson,
    href: "/json-beautifier",
    isPopular: true,
  },
];

const ToolsGrid = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.slice(0, 4).map((tool, index) => (
          <Link key={index} href={tool.href} className="group">
            <div className="h-full p-5 bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px] flex flex-col">
              <div className="flex items-center mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mr-3 group-hover:bg-green-200 transition-colors shadow-sm">
                  <tool.icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-slate-800 group-hover:text-green-600 transition-colors flex items-center">
                  {tool.title}
                  {tool.isNew && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full shadow-sm">
                      New
                    </span>
                  )}
                  {tool.isPopular && !tool.isNew && (
                    <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full shadow-sm">
                      Popular
                    </span>
                  )}
                </h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 flex-grow">
                {tool.description}
              </p>
              <div className="flex items-center text-sm text-green-600 font-medium mt-auto">
                <span>Use Tool</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad in the middle of tools grid - high engagement */}
      <div className="w-full flex justify-center my-6">
        {/* ADSENSE_IN_TOOLS_GRID */}
        {/* <div className="hidden md:block">
          <AdUnit type="leaderboard" />
        </div>
        <div className="md:hidden mx-auto">
          <AdUnit type="rectangle" />
        </div> */}
        {/* END_ADSENSE_IN_TOOLS_GRID */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.slice(4).map((tool, index) => (
          <Link key={index} href={tool.href} className="group">
            <div className="h-full p-5 bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all duration-200 group-hover:translate-y-[-2px] flex flex-col">
              <div className="flex items-center mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mr-3 group-hover:bg-green-200 transition-colors shadow-sm">
                  <tool.icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-slate-800 group-hover:text-green-600 transition-colors flex items-center">
                  {tool.title}
                  {tool.isNew && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full shadow-sm">
                      New
                    </span>
                  )}
                  {tool.isPopular && !tool.isNew && (
                    <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full shadow-sm">
                      Popular
                    </span>
                  )}
                </h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 flex-grow">
                {tool.description}
              </p>
              <div className="flex items-center text-sm text-green-600 font-medium mt-auto">
                <span>Use Tool</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
