import Link from "next/link";
import { FileJson, FileJson2 } from "lucide-react";
const allTools = [
  {
    name: "JSON to JSONL Converter",
    description: "Convert JSON to JSONL format instantly",
    icon: FileJson,
    href: "https://www.merge-json-files.com/json-to-jsonl",
  },
  {
    name: "JSON File Splitter",
    description: "Split any JSON file into multiple files",
    icon: FileJson2,
    href: "https://www.merge-json-files.com/json-file-splitter",
  },
  {
    name: "JSON Merger",
    description: "Merge multiple JSON files into one",
    icon: FileJson,
    href: "https://www.merge-json-files.com/",
  },
  {
    name: "JSON Flattener",
    description: "Flatten any JSON file with ease",
    icon: FileJson,
    href: "https://www.merge-json-files.com/json-flattener",
  },
  {
    name: "JSONL to JSON Converter",
    description: "Convert JSONL to JSON format instantly",
    icon: FileJson,
    href: "https://www.merge-json-files.com/jsonl-to-json",
  },
];

export default function ToolsGrid() {
  return (
    <div>
      <p className="text-center text-3xl text-gray-700 font-semibold my-11">
        Browse More JSON related tools
      </p>
      <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6 sm:px-3 justify-center mx-auto gap-7 mb-10">
        {allTools.map((tool, index) => (
          <div
            className="bg-[#fdf7dd]  rounded-md p-6 transition-all hover:shadow-md  "
            key={index}
          >
            <div className="flex items-center mb-4">
              <tool.icon />
              <h3 className="text-xl font-light text-gray-700">{tool.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <Link href={tool.href} target="blank">
              <button className="text-sm text-amber-700 hover:text-amber-900 transition-colors underline focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                Use {tool.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
