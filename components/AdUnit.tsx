"use client";
import { useEffect, useRef } from "react";

// Type definition for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// Props type for the component
interface AdUnitProps {
  type?:
    | "responsive"
    | "responsive-2"
    | "in-feed-1"
    | "in-feed-2"
    | "in-article-1"
    | "in-article-2"
    | "in-article-3"
    | "display-1";
}

export default function AdUnit({ type = "responsive" }: AdUnitProps) {
  const adRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      try {
        // Initialize adsbygoogle if not already initialized
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("Error initializing AdSense:", error);
      }
    }
  }, []);

  const getAdConfig = () => {
    const baseConfig = {
      className: "adsbygoogle",
      ref: adRef,
    };

    switch (type) {
      case "in-feed-1":
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-format": "fluid",
          "data-ad-layout-key": "-ek-w-3b-bz+yi",
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "6217909042",
        };
      case "in-feed-2":
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-format": "fluid",
          "data-ad-layout-key": "-ek-w-3b-bz+yi",
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "3459883765",
        };
      case "in-article-1":
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-layout": "in-article",
          "data-ad-format": "fluid",
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "8193319788",
        };
      case "in-article-2":
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-layout": "in-article",
          "data-ad-format": "fluid",
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "2972782696",
        };
      case "in-article-3":
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-layout": "in-article",
          "data-ad-format": "fluid",
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "9729762739",
        };
      case "display-1":
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "1819483121",
          "data-ad-format": "auto",
          "data-full-width-responsive": "true",
        };
      case "responsive-2":
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "6974547394",
          "data-ad-format": "auto",
          "data-full-width-responsive": "true",
        };
      case "responsive":
      default:
        return {
          ...baseConfig,
          style: { display: "block" },
          "data-ad-client": "ca-pub-6334971938249130",
          "data-ad-slot": "7151700858",
          "data-ad-format": "auto",
          "data-full-width-responsive": "true",
        };
    }
  };

  // Using dangerouslySetInnerHTML for script and ins elements to bypass TypeScript issues
  const scriptTag = `
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
      crossorigin="anonymous">
    </script>
  `;

  // Create the ins element HTML based on the selected type
  const createInsTag = () => {
    const config = getAdConfig();
    let attributes = "";

    // Build attributes string
    for (const [key, value] of Object.entries(config)) {
      if (key === "ref") continue; // Skip ref
      if (key === "style") {
        const styleString = Object.entries(value as Record<string, string>)
          .map(([styleKey, styleVal]) => `${styleKey}:${styleVal}`)
          .join(";");
        attributes += ` style="${styleString}"`;
      } else if (key === "className") {
        attributes += ` class="${value}"`;
      } else {
        attributes += ` ${key}="${value}"`;
      }
    }

    return `<ins ${attributes}></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`;
  };

  return (
    <div className="ad-container w-full my-4">
      {/* Using dangerouslySetInnerHTML to bypass TypeScript issues with custom elements */}
      <div dangerouslySetInnerHTML={{ __html: scriptTag + createInsTag() }} />

      {/* Display the ad type label */}
      <div className="text-xs text-gray-400 text-center mt-1">Ad: {type}</div>
    </div>
  );
}
