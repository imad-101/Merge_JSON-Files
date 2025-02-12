import { LucideIcon } from "lucide-react";

import Link from "next/link";

interface ToolsGridProps {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
}
export default function ToolsGrid({
  name,
  description,
  icon: Icon,
  href,
}: ToolsGridProps) {
  return (
    <div className="bg-amber-100  rounded-md p-6 transition-all hover:shadow-md ">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-amber-900 mr-2" aria-hidden="true" />
        <h3 className="text-xl font-light text-gray-700">{name}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={href} target="blank">
        <button className="text-sm text-amber-700 hover:text-amber-900 transition-colors underline focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Use {name}
        </button>
      </Link>
    </div>
  );
}
