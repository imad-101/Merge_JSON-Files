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
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined" || !adContainerRef.current) return;

    // Create required elements
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130";
    script.crossOrigin = "anonymous";

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";

    // Set ad-specific attributes based on type
    switch (type) {
      case "in-feed-1":
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-layout-key", "-ek-w-3b-bz+yi");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "6217909042");
        break;
      case "in-feed-2":
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-layout-key", "-ek-w-3b-bz+yi");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "3459883765");
        break;
      case "in-article-1":
        ins.setAttribute("data-ad-layout", "in-article");
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "8193319788");
        break;
      case "in-article-2":
        ins.setAttribute("data-ad-layout", "in-article");
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "2972782696");
        break;
      case "in-article-3":
        ins.setAttribute("data-ad-layout", "in-article");
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "9729762739");
        break;
      case "display-1":
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "1819483121");
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        break;
      case "responsive-2":
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "6974547394");
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        break;
      case "responsive":
      default:
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "7151700858");
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        break;
    }

    // Clear container before adding elements
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = "";
      adContainerRef.current.appendChild(script);
      adContainerRef.current.appendChild(ins);

      // Initialize the ad
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }

    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = "";
      }
    };
  }, [type]);

  return (
    <div className="ad-container w-full my-4">
      {/* Container for dynamically inserted ad code */}
      <div ref={adContainerRef}></div>

      {/* Display ad type label */}
    </div>
  );
}
