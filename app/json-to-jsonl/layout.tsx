import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Convert JSON to JSONL Online - Free JSON to JSONL Converter Tool",
  description:
    "Easily convert your JSON files to JSONL format with our free online converter. Fast, secure, and no signup required. Perfect for developers and data analysts.",
  keywords:
    "json to jsonl, convert json to jsonl, json to jsonl online, free json to jsonl converter, json to jsonl tool, convert json to jsonl format , jsonl to json , jsonl to json online , jsonl to json converter",
  metadataBase: new URL("https://merge-json-files.com/json-to-jsonl"),
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
    title: "Convert JSON to JSONL Online - Free JSON to JSONL Converter Tool",
    description:
      "Easily convert your JSON files to JSONL format with our fast, secure, and easy-to-use online converter. No signup required!",
    url: "https://merge-json-files.com/json-to-jsonl",
    siteName: "JSON to JSONL Converter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/json-jsonl.png",
        width: 1200,
        height: 630,
        alt: "Free JSON to JSONL Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JSON to JSONL Online - Free JSON to JSONL Converter Tool",
    description:
      "Convert your JSON files to JSONL format online instantly with our secure and efficient converter tool. No signup required!",
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
      <Header first="Convert" second="JSON" third="to JSONL" href="/" />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="Convert JSON to JSONL" />
    </>
  );
}
