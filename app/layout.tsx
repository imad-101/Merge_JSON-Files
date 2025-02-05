import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const myFont = localFont({ src: "./fonts/sansFont.ttf" });

export const metadata: Metadata = {
  title: "Merge JSON Files Online - Free, Fast & No Signup Required",
  description:
    "Merge multiple JSON files instantly with our free online tool. No ads, no signup, secure , clean UI. Download merged JSON files in seconds with perfect structure.",
  keywords:
    "merge json files, combine json files, combine json files online , json merger online, merge json files online, free json merger, merge multiple json files, json file combiner, merge json arrays, json merge tool no signup, secure json merger, combine json files python, combine json data, merge json files javascript, merge json files free",
  openGraph: {
    title: "Merge JSON Files Online - Free, Instant & Secure Tool",
    description:
      "Instantly merge multiple JSON files online. No signup, no ads, clean interface. Process JSON files securely with perfect data structure preservation.",
    url: "https://merge-json-files.com",
    siteName: "Merge JSON Files",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge JSON Files Online - Free, Instant & Secure",
    description:
      "Instantly merge multiple JSON files online. No signup, no ads, clean interface. Process JSON files securely with perfect data structure preservation.",
    site: "@imaduddin_101",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Merge JSON Files" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="your-verification-code"
        />
        <link rel="canonical" href="https://merge-json-files.com" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${myFont.className} antialiased bg-yellow-50`}>
        <Header />
        {children}
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
