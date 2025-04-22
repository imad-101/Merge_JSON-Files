// components/AdUnit.tsx
"use client";
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  type:
    | "responsive-header"
    | "responsive-2"
    | "in-article-1"
    | "in-article-2"
    | "in-article-3"
    | "in-feed"
    | "in-feed-2"
    | "display-2";
}

const adConfigs = {
  "responsive-header": {
    "data-ad-slot": "7151700858",
    style: { display: "block" },
    "data-ad-format": "auto",
  },
  "responsive-2": {
    "data-ad-slot": "6974547394",
    style: { display: "block" },
    "data-ad-format": "auto",
  },
  "in-article-1": {
    "data-ad-slot": "9729762739",
    style: { display: "block", textAlign: "center" },
    "data-ad-format": "fluid",
    "data-ad-layout": "in-article",
  },
  "in-article-2": {
    "data-ad-slot": "2972782696",
    style: { display: "block", textAlign: "center" },
    "data-ad-format": "fluid",
    "data-ad-layout": "in-article",
  },
  "in-article-3": {
    "data-ad-slot": "8193319788",
    style: { display: "block", textAlign: "center" },
    "data-ad-format": "fluid",
    "data-ad-layout": "in-article",
  },
  "in-feed": {
    "data-ad-slot": "3459883765",
    style: { display: "block" },
    "data-ad-format": "fluid",
    "data-ad-layout-key": "-ek-w-3b-bz+yi",
  },
  "in-feed-2": {
    "data-ad-slot": "6217909042",
    style: { display: "block" },
    "data-ad-format": "fluid",
    "data-ad-layout-key": "-ek-w-3b-bz+yi",
  },
  "display-2": {
    "data-ad-slot": "1819483121",
    style: { display: "block" },
    "data-ad-format": "auto",
  },
} as const;

const AdUnit: React.FC<AdUnitProps> = ({ type }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const initAd = () => {
      if (initialized.current) return;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    const handleLoad = () => initAd();

    if (document.readyState === "complete") initAd();
    else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [type]);

  const config = adConfigs[type];

  return config ? (
    <div className="my-8 flex justify-center" ref={adRef}>
      <ins
        className="adsbygoogle"
        {...config}
        data-ad-client="ca-pub-6334971938249130"
        data-full-width-responsive="true"
      />
    </div>
  ) : null;
};

export default AdUnit;
