-import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Convert JSONL to JSON Online - Free JSON Converter Tool",
  description:
    "Convert JSONL (JSON Lines) to JSON quickly and easily with our free online converter tool. Transform JSONL files into structured JSON format without any software installation.",
  keywords:
    "convert JSONL to JSON, JSONL to JSON converter, JSONL to JSON online, JSON Lines to JSON, free JSON converter, JSONL to JSON tool, data conversion tool",
  metadataBase: new URL("https://merge-json-files.com/jsonl-to-json"),
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
    title: "Convert JSONL to JSON Online - Professional JSON Converter",
    description:
      "Effortlessly convert JSONL files to JSON format using our professional online converter. Fast, secure, and free to use.",
    url: "https://merge-json-files.com/jsonl-to-json",
    siteName: "Convert JSONL to JSON Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/json.png",
        width: 1200,
        height: 630,
        alt: "Professional JSONL to JSON Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JSONL to JSON Online - Professional JSON Converter",
    description:
      "Transform your JSONL files into JSON format seamlessly with our online converter. Fast, secure, and free to use.",
    site: "https://merge-json-files.com/jsonl-to-json",
    creator: "@imaduddin_101",
    images: ["/json.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="JSONL" second="to" third="JSON" href="/jsonl-to-json" />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="JSONL to JSON Converter" />
    </>
  );
}