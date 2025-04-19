import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Convert JSON to JSONL Online - Free JSONL Converter Tool",
  description:
    "Convert JSON to JSONL (JSON Lines) quickly and easily with our free online converter tool. Transform nested JSON files into JSONL format with no installation required.",
  keywords:
    "convert JSON to JSONL, JSONL converter, JSON to JSONL online, JSON Lines, free JSONL converter, convert JSON file to JSONL",
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
    title: "Convert JSON to JSONL Online - Professional JSONL Converter",
    description:
      "Effortlessly convert JSON files to JSONL format using our professional online converter. Quick, secure, and free to use.",
    url: "https://merge-json-files.com/json-to-jsonl",
    siteName: "Convert JSON to JSONL Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/jsonl.png",
        width: 1200,
        height: 630,
        alt: "Professional JSON to JSONL Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JSON to JSONL Online - Professional JSONL Converter",
    description:
      "Transform your JSON files into JSONL format seamlessly with our online converter. Fast, secure, and free to use.",
    site: "https://merge-json-files.com/json-to-jsonl",
    creator: "@imaduddin_101",
    images: ["/jsonl.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header first="JSON" second="to" third="JSONL" href="/json-to-jsonl" />
        <main className="flex-grow">{children}</main>
        <Toaster />
        <Footer name="JSON to JSONL Converter" />
      </body>
    </>
  );
}
