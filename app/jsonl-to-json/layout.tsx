import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "JSONL to JSON - Free Online JSONL to JSON Converter",
  description:
    "Convert JSONL to JSON online with our free converter tool. Transform JSONL files to JSON format instantly while preserving data structure. Fast, secure, and no signup needed.",
  keywords:
    "jsonl to json, convert jsonl to json, jsonl to json converter, jsonl to json online, convert jsonl to json online, free jsonl to json converter , how to convert JSONL to JSON",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "https://merge-json-files.com/jsonl-to-json",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "JSONL to JSON Converter Online - Free JSONL Lines Converter",
    description:
      "Convert JSONL to JSON online with our professional converter. Transform JSONL files to JSON format instantly while preserving data structure. Fast, secure, and no signup needed.",
    url: "https://merge-json-files.com/jsonl-to-json",
    siteName: "JSONL to JSON Converter Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/jsonl-to-json.png",
        width: 1200,
        height: 630,
        alt: "Professional JSONL to JSON Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONL to JSON Converter Online - Free JSONL Lines Converter",
    description:
      "Convert JSONL to JSON online with our professional converter. Transform JSONL files to JSON format instantly while preserving data structure. Fast, secure, and no signup needed.",
    site: "https://merge-json-files.com",
    creator: "@imaduddin_101",
    images: ["/jsonl-to-json.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="JSONL" second="to" third="JSON" />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="JSONL to JSON Converter" />
    </>
  );
}
