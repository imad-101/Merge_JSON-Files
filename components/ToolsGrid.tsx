import Link from "next/link";

const allTools = [
  {
    name: "JSON Merger",
    description: "Merge multiple JSON files into one",

    href: "https://www.merge-json-files.com/",
  },

  {
    name: "JSON File Splitter",
    description: "Split any JSON file into multiple files",

    href: "https://www.merge-json-files.com/json-file-splitter",
  },
];

export default function ToolsGrid() {
  return (
    <div id="tools">
      <p className="text-center text-3xl text-gray-700 font-semibold my-11">
        Browse More JSON related tools
      </p>
      <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6 sm:px-3 justify-center mx-auto gap-7 mb-10">
        {allTools.map((tool, index) => (
          <Link href={tool.href} key={index} target="blank">
            <div className="bg-[#fdf7dd]  rounded-md p-6 transition-all hover:shadow-md  ">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-light text-gray-700">
                  {tool.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{tool.description}</p>

              <button className="text-sm text-amber-700 hover:text-amber-900 transition-colors underline focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                Use {tool.name}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
