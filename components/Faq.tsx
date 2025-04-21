import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

const FaqSection = ({ faqs }: FaqProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-slate-200 last:border-0"
        >
          <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-emerald-600 py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-slate-600 pb-4 pt-1">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqSection;
