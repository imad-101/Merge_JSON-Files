"use client";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

const AdUnit = ({ type }: { type: "leaderboard" | "rectangle" }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (err) {
        console.error("Ad initialization error:", err);
      }
    }
  }, []);

  return (
    <div className="w-full text-center">
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      {type === "leaderboard" ? (
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "728px", height: "90px" }}
          data-ad-client="ca-pub-6334971938249130"
          data-ad-slot="9890007857"
        />
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "250px" }}
          data-ad-client="ca-pub-6334971938249130"
          data-ad-slot="5751452296"
        />
      )}
    </div>
  );
};

export default AdUnit;
