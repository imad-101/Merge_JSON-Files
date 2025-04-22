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
    | "display-1"
    | "fixed-desktop"
    | "fixed-mobile"; // Added new ad unit types
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

    // Set ad-specific attributes based on type
    switch (type) {
      case "fixed-desktop":
        // Ad Unit For Merger (728x90)
        ins.style.display = "inline-block";
        ins.style.width = "728px";
        ins.style.height = "90px";
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "1445746909");
        break;
      case "fixed-mobile":
        // Ad unit (300x225)
        ins.style.display = "inline-block";
        ins.style.width = "300px";
        ins.style.height = "225px";
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "5193420226");
        break;
      case "in-feed-1":
        ins.style.display = "block";
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-layout-key", "-ek-w-3b-bz+yi");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "6217909042");
        break;
      case "in-feed-2":
        ins.style.display = "block";
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-layout-key", "-ek-w-3b-bz+yi");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "3459883765");
        break;
      case "in-article-1":
        ins.style.display = "block";
        ins.setAttribute("data-ad-layout", "in-article");
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "8193319788");
        break;
      case "in-article-2":
        ins.style.display = "block";
        ins.setAttribute("data-ad-layout", "in-article");
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "2972782696");
        break;
      case "in-article-3":
        ins.style.display = "block";
        ins.setAttribute("data-ad-layout", "in-article");
        ins.setAttribute("data-ad-format", "fluid");
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "9729762739");
        break;
      case "display-1":
        ins.style.display = "block";
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "1819483121");
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        break;
      case "responsive-2":
        ins.style.display = "block";
        ins.setAttribute("data-ad-client", "ca-pub-6334971938249130");
        ins.setAttribute("data-ad-slot", "6974547394");
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        break;
      case "responsive":
      default:
        ins.style.display = "block";
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

  // Add responsive wrapper for fixed-size ads
  const getContainerClass = () => {
    let baseClass = "ad-container w-full my-4 ";

    if (type === "fixed-desktop") {
      return baseClass + "hidden md:flex justify-center"; // Hide on mobile, center on desktop
    } else if (type === "fixed-mobile") {
      return baseClass + "flex md:hidden justify-center"; // Show on mobile, hide on desktop
    }

    return baseClass;
  };

  return (
    <div className={getContainerClass()}>
      {/* Container for dynamically inserted ad code */}
      <div ref={adContainerRef}></div>
    </div>
  );
}
