// components/AdUnit.js
"use client";
import { useEffect } from "react";

// Add this block to declare adsbygoogle on window
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// Define all your ad units here
const adUnits: Record<
  string,
  {
    className: string;
    style: React.CSSProperties;
    [key: string]: any;
  }
> = {
  article1: {
    className: "adsbygoogle",
    style: { display: "block", textAlign: "center" },
    "data-ad-layout": "in-article",
    "data-ad-format": "fluid",
    "data-ad-client": "ca-pub-6334971938249130",
    "data-ad-slot": "4453690219",
  },
  article2: {
    className: "adsbygoogle",
    style: { display: "block", textAlign: "center" },
    "data-ad-layout": "in-article",
    "data-ad-format": "fluid",
    "data-ad-client": "ca-pub-6334971938249130",
    "data-ad-slot": "2179489471",
  },
  responsive1: {
    className: "adsbygoogle",
    style: { display: "block" },
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
    "data-ad-client": "ca-pub-6334971938249130",
    "data-ad-slot": "5310642160",
  },
  responsive2: {
    className: "adsbygoogle",
    style: { display: "block" },
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
    "data-ad-client": "ca-pub-6334971938249130",
    "data-ad-slot": "5386679695",
  },
};

interface AdUnitProps {
  name: keyof typeof adUnits;
}

export default function AdUnit({ name }: AdUnitProps) {
  const adProps = adUnits[name];

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsense error:", e);
      }
    }
  }, [name]);

  if (!adProps) return null;

  return <ins {...(adProps as React.InsHTMLAttributes<HTMLModElement>)} />;
}
