import React from "react";
import { Upload, FilePlus, Settings, Download } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        How to Merge JSON Files?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-yellow-50 p-6 rounded-xl ">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full">
            <FilePlus className="text-red-500 w-8 h-8" />
          </div>
          <h3 className="font-semibold mt-4 text-gray-700">
            Select Your JSON Files
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            Choose or drag & drop the JSON files you want to merge.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full">
            <Upload className="text-red-500 w-8 h-8" />
          </div>
          <h3 className="font-semibold mt-4 text-gray-700">Upload Files</h3>
          <p className="text-gray-600 text-sm mt-2">
            Upload your selected JSON files. The tool will validate them
            automatically.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full">
            <Settings className="text-red-500 w-8 h-8" />
          </div>
          <h3 className="font-semibold mt-4 text-gray-700">Merge Files</h3>
          <p className="text-gray-600 text-sm mt-2">
            Click the &quot;Merge&quot; button to combine all files into a
            single JSON output.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full">
            <Download className="text-red-500 w-8 h-8" />
          </div>
          <h3 className="font-semibold mt-4 text-gray-700">
            Download Merged JSON
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            Save the merged JSON file to your device for further use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
