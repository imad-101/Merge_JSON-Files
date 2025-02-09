import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card className=" mx-auto max-w-6xl border rounded-xl my-5 sm:my-14 px-9 bg-yellow-50">
      <CardContent>
        <h2 className="mt-10 text-2xl font-bold text-center mb-10 text-gray-700">
          Frequently Asked Questions About Merging JSON Files
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`value , ${index}`}>
              <AccordionTrigger className="text-left  text-lg hover:no-underline text-gray-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FaqSection;
