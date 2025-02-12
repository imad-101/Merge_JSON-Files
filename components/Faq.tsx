import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Faq {
  faqs: { question: string; answer: string }[];
}
const FaqSection = ({ faqs }: Faq) => {
  return (
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
  );
};

export default FaqSection;
