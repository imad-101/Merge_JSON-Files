import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Free Online JSON/JSONL Converter",
  description:
    "Free online JSON to JSONL and JSONL to JSON converter. Easily convert between JSON and JSONL formats for data processing and storage. Fast and reliable.",
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
    title: "Free Online JSON/JSONL Converter",
    description:
      "Free online JSON to JSONL and JSONL to JSON converter. Easily convert between JSON and JSONL formats for data processing and storage. Fast and reliable.",
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
    title: "Free Online JSON/JSONL Converter",
    description:
      "Free online JSON to JSONL and JSONL to JSON converter. Easily convert between JSON and JSONL formats for data processing and storage. Fast and reliable.",
    site: "https://merge-json-files.com/json-jsonl-converter",
    creator: "@imaduddin_101",
    images: ["/json-jsonl.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="JSON" second="/" third="JSONL Converter" />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="JSON/JSONL Converter" />
    </>
  );
}
