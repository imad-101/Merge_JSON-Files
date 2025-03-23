import React from "react";
import JsonJsonlConverter from "./converter";

import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/Faq";
import ToolsGrid from "@/components/ToolsGrid";

import { Upload, FilePlus, Settings, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const howItWorks = [
  {
    title: "Select Your JSON Files",
    description:
      "Choose or drag & drop the JSON files that you want to convert into JSONL format. Our tool accepts both .json and .jsonl files.",
    icon: FilePlus,
  },
  {
    title: "Upload Files",
    description:
      "Upload your JSON files with our user-friendly drag-and-drop interface. The tool reads and validates your files quickly, even when they are large.",
    icon: Upload,
  },
  {
    title: "Convert to JSONL",
    description:
      "Click the 'Convert' button to instantly transform your JSON files into JSONL format. Enjoy precise and error-free conversion with advanced file handling.",
    icon: Settings,
  },
  {
    title: "Download JSONL File",
    description:
      "Download the converted JSONL file or copy the content to your clipboard. It’s that simple and efficient for developers and data analysts alike.",
    icon: Download,
  },
];

const faqs = [
  {
    question: "How do I convert JSON to JSONL online?",
    answer:
      "Our online JSON to JSONL converter makes it simple to transform your JSON files into JSONL format without the need for any software installations. Just upload your JSON files using the intuitive drag-and-drop interface, and the tool will automatically convert the data. The process is fast and secure, ensuring that even large JSON files are handled smoothly. This solution is perfect for developers who need to integrate JSON data into systems that require JSONL format.",
  },
  {
    question: "What is JSONL and why should I convert my JSON to JSONL?",
    answer:
      "JSONL (JSON Lines) is a format where each line is a separate JSON object, making it highly suitable for streaming large datasets and processing line-by-line. Converting JSON to JSONL can be beneficial for log processing, data pipelines, and machine learning tasks where incremental data handling is required. Our converter ensures that your JSON data is accurately transformed into JSONL format, maintaining data integrity and structure while optimizing performance for downstream processing.",
  },
  {
    question: "Can I convert large JSON files to JSONL without any issues?",
    answer:
      "Yes, our tool is specifically optimized for converting large JSON files to JSONL. By reading files in chunks and offloading processing to a Web Worker, the converter ensures that even very large files are processed efficiently without freezing your browser. This makes it an ideal choice for developers and data analysts who work with extensive datasets, ensuring a smooth and reliable conversion process every time.",
  },
  {
    question:
      "Is my data secure when using the online JSON to JSONL converter?",
    answer:
      "Absolutely. Our converter processes files entirely within your browser, which means that your data is never uploaded to an external server. This in-browser processing guarantees that your sensitive data remains secure and private. Whether you are working with confidential information or large-scale datasets, our tool prioritizes data security and privacy throughout the conversion process.",
  },
  {
    question: "Do I need to install any software to use this converter?",
    answer:
      "No installation is required to use our JSON to JSONL converter. It is an online tool that works directly in your browser. Simply upload your JSON files, and the conversion is handled instantly. This makes it a hassle-free solution for anyone who needs to quickly convert JSON files to JSONL format without the complexities of installing or configuring additional software.",
  },
  {
    question: "Can I also convert JSONL back to JSON?",
    answer:
      "Yes, our converter supports bidirectional conversion, allowing you to convert both JSON to JSONL and JSONL to JSON. However, our main focus is on providing an exceptional JSON to JSONL conversion experience, with an emphasis on speed, reliability, and ease of use. Whether you need to switch formats for data processing or compatibility reasons, our tool can handle the conversion with precision.",
  },
];

const Page = () => {
  return (
    <>
      <div className="">
        <h1 className="text-center text-5xl my-7 font-bold text-gray-800">
          Convert JSON to JSONL Online
        </h1>
        <p className="text-gray-600 mb-10 text-center px-3">
          Easily convert your <span className="font-semibold">JSON files</span>{" "}
          into <span className="font-semibold">JSONL format</span> with our
          fast, secure, and efficient online converter.
        </p>
        <JsonJsonlConverter />

        <p className="text-gray-600 text-center my-10 px-3">
          No Ads, No Signup. Convert Your JSON Files to JSONL with Just a Few
          Clicks.
        </p>

        {/* How It Works Section */}
        <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-10">
          <p className="text-center text-2xl text-gray-700 font-bold mb-5 mt-3">
            How To Convert JSON to JSONL
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-yellow-50 p-6 rounded-xl">
            {howItWorks.map((work, index) => (
              <HowItWorks key={index} {...work} />
            ))}
          </div>
          <p className="mt-6 text-gray-600 text-center px-3">
            Convert your JSON files online quickly with our free JSON to JSONL
            converter. It transforms your data into a line-delimited JSON format
            while preserving every detail—ideal for developers and data analysts
            seeking a reliable and secure solution.
          </p>
        </div>

        {/* FAQ Section */}
        <Card className="mx-auto max-w-6xl border rounded-xl my-5 sm:my-14 px-9 bg-yellow-50">
          <CardContent>
            <h2 className="mt-10 text-2xl font-bold text-center mb-10 text-gray-700">
              Frequently Asked Questions About Converting JSON to JSONL
            </h2>
            <FaqSection faqs={faqs} />
          </CardContent>
        </Card>

        {/* Additional Tools or Grid Section */}
        <ToolsGrid />
      </div>
    </>
  );
};

export default Page;
