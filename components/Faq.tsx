"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How can I merge JSON files online?",
    answer:
      "Merging JSON files is simple and free with our tool. Just upload your JSON files, click 'Merge,' and download the combined JSON file in seconds—no software required.",
  },
  {
    question: "Is your JSON merger tool free to use?",
    answer:
      "Yes, our online JSON file merger is completely free to use with no registration required.",
  },
  {
    question: "Does this tool support large JSON files?",
    answer:
      "Yes, our JSON combiner can handle large JSON files efficiently without performance issues.",
  },
  {
    question: "Will my JSON structure remain intact after merging?",
    answer:
      "Absolutely! Our tool ensures that the integrity and structure of your JSON data remain unchanged after merging.",
  },
  {
    question: "Do I need to install any software to merge JSON files?",
    answer:
      "No, you don’t need any software installation. Our tool works directly in your browser, making JSON merging quick and hassle-free.",
  },
  {
    question: "Can I merge multiple JSON arrays into one?",
    answer:
      "Yes! Our tool allows you to merge multiple JSON arrays seamlessly while preserving data accuracy.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl border rounded-xl my-5 sm:my-14">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Frequently Asked Questions
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
    </div>
  );
};

export default FaqSection;
