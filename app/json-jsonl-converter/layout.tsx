import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "JSON ↔ JSONL Converter - Bidirectional Online Conversion Tool",
  description:
    "Free online tool to convert JSON to JSONL and JSONL to JSON format. Transform JSON Lines to regular JSON and back instantly. No installation required, easy to use.",
  keywords:
    "json to jsonl, jsonl to json, convert json to jsonl, convert jsonl to json, json jsonl converter, json to jsonl online, jsonl to json online, bidirectional json converter, json lines converter",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "https://merge-json-files.com/json-jsonl-converter",
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
    title: "JSON ↔ JSONL Converter Online - Bidirectional Conversion Tool",
    description:
      "Convert between JSON and JSONL formats instantly. Handle both JSON to JSONL conversions for big data and JSONL to JSON transformations for structured data analysis. Free, secure, and no installation required.",
    url: "https://merge-json-files.com/json-jsonl-converter",
    siteName: "JSON ↔ JSONL Converter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/json-jsonl.png",
        width: 1200,
        height: 630,
        alt: "Bidirectional JSON to JSONL and JSONL to JSON Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON ↔ JSONL Converter - Free Online Conversion Tool",
    description:
      "Convert JSON to JSONL and back with our professional tool. Handle both conversion directions with perfect data preservation. Works directly in your browser - no signup needed!",
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
      <Header first="JSON" second="↔" third="JSONL Converter" />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="JSON ↔ JSONL Converter" />
    </>
  );
}
