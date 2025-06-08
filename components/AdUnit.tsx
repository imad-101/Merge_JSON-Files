// components/AdUnit.js
"use client";
import { useEffect, useRef } from "react";

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
  responsive1: {
    className: "adsbygoogle",
    style: { display: "block" },
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
    "data-ad-client": "ca-pub-6334971938249130",
    "data-ad-slot": "8260109256",
  },
  fixedHorizontal: {
    className: "adsbygoogle",
    style: {
      display: "inline-block",
      width: "728px",
      height: "90px",
    },
    "data-ad-client": "ca-pub-6334971938249130",
    "data-ad-slot": "3884253112",
  },
};

interface AdUnitProps {
  name: keyof typeof adUnits;
}

export default function AdUnit({ name }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adProps = adUnits[name];

  useEffect(() => {
    // Wait for adsbygoogle to be available
    const loadAd = () => {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        try {
          // Only push if the ad element exists
          if (adRef.current) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (e) {
          console.error("Adsense error:", e);
        }
      } else {
        // If adsbygoogle is not available, retry after a short delay
        setTimeout(loadAd, 100);
      }
    };

    loadAd();
  }, [name]);

  if (!adProps) return null;

  return (
    <ins
      ref={adRef}
      {...(adProps as React.InsHTMLAttributes<HTMLModElement>)}
    />
  );
}
