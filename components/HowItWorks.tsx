import React from "react";
import { Upload, FilePlus, Settings, Download } from "lucide-react";

interface HowItWorksProps {
  title: string;
  icon: any;
  description: string;
}
const HowItWorks = ({ title, icon: Icon, description }: HowItWorksProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-red-100 p-4 rounded-full">
        <Icon className="text-red-500 w-8 h-8" />
      </div>
      <h3 className="font-semibold mt-4 text-gray-700">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
};

export default HowItWorks;
