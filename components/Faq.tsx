"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How to merge JSON files online quickly?",
    answer:
      "To merge JSON files online, simply upload your files to our free JSON file merger tool. Click the 'Merge' button, and instantly download your combined JSON file. Our tool makes merging JSON files effortless with no software installation needed.",
  },
  {
    question: "What's the best way to merge multiple JSON files?",
    answer:
      "The fastest way to merge multiple JSON files is using our online JSON merger tool. It handles both simple and complex JSON structures, preserves data integrity, and combines files instantly - all through your web browser.",
  },
  {
    question: "Can I merge large JSON files online?",
    answer:
      "Yes, our JSON file merger efficiently handles large JSON files. The tool is optimized for merging JSON files of any size while maintaining fast processing speeds and data accuracy.",
  },
  {
    question: "Is JSON file merging safe for data structure?",
    answer:
      "Our JSON file merger tool guarantees data integrity during the merging process. When you merge JSON files using our tool, all nested structures, arrays, and objects remain intact and properly formatted.",
  },
  {
    question: "Do I need special software to merge JSON files?",
    answer:
      "No software installation needed - our online JSON file merger works directly in your browser. Simply visit our website to merge JSON files instantly without downloading any additional tools.",
  },
  {
    question: "How to combine multiple JSON arrays into one file?",
    answer:
      "Our JSON file merger makes combining multiple JSON arrays simple. Upload your files containing JSON arrays, and our tool will merge them while maintaining array structure and data accuracy in the final merged JSON file.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-14">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Frequently Asked Questions About Merging JSON Files
      </h2>
      <div className="bg-yellow-50 p-6 rounded-xl">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              className="w-full text-left py-4 text-gray-700 font-semibold flex justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="text-gray-600 pb-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
