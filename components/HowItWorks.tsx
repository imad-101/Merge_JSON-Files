import React from "react";
type HowItWorksProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string; // Add className as an optional property
};
const HowItWorks = ({ title, icon: Icon, description }: HowItWorksProps) => {
  return (
    <div className="flex flex-col items-center text-center ">
      <div className=" p-4 rounded-full">
        <Icon className="text-gray-500 w-8 h-8" />
      </div>
      <h3 className="font-semibold mt-4 text-gray-700">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
};

export default HowItWorks;
