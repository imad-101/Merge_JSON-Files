import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "JSON to JSONL - Free Online JSON to JSONL Converter",
  description:
    "Convert JSON to JSONL online with our free tool. Transform JSON files to JSONL format instantly while preserving data structure. Fast, secure, and no signup needed.",
  keywords:
    "json to jsonl, convert json to jsonl, json to jsonl online, convert json to jsonl online, how to convert json to jsonl, json to jsonl free",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "https://merge-json-files.com/json-to-jsonl",
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
    title: "JSON to JSONL Converter Online - Free JSON Lines Converter",
    description:
      "Convert JSON to JSONL online with our professional converter. Transform JSON files to JSONL format instantly while preserving data structure. Fast, secure, and no signup needed.",
    url: "https://merge-json-files.com/json-to-jsonl",
    siteName: "JSON to JSONL Converter Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/json-jsonl.png",
        width: 1200,
        height: 630,
        alt: "Professional JSON to JSONL Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to JSONL Converter Online - Free JSON Lines Converter",
    description:
      "Convert JSON to JSONL online with our professional converter. Transform JSON files to JSONL format instantly while preserving data structure. Fast, secure, and no signup needed.",
    site: "https://merge-json-files.com/json-to-jsonl",
    creator: "@imaduddin_101",
    images: ["/json-jsonl.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="JSON" second="to" third="JSONL" />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="JSON to JSONL Converter" />
    </>
  );
}
