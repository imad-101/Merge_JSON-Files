// app/blog/slug/ProgressBar.tsx
"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setWidth(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 w-full bg-gray-100 z-50">
      <div
        className="h-full bg-blue-500 transition-all duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
