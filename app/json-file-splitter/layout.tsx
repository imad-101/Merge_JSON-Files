import type { Metadata } from "next";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Split JSON Files Instantly | Free Online JSON Splitter Tool",
  description:
    "Easily split large JSON files into smaller parts with our free online JSON Splitter. Fast, secure, and no signup required — just paste and split!",
  keywords:
    "split JSON files, JSON splitter online, break JSON file, free JSON splitter, divide JSON, split large JSON, online JSON tool",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "https://merge-json-files.com/json-file-splitter",
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
    title: "Split JSON Files Instantly | Free & Secure JSON Splitter",
    description:
      "Split large JSON files online with one click. Our fast, free, and secure JSON Splitter helps you break files into smaller chunks easily.",
    url: "https://merge-json-files.com/json-file-splitter",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/split.png",
        width: 1200,
        height: 630,
        alt: "Free JSON Splitter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split JSON Files Instantly | Free & Secure JSON Splitter",
    description:
      "Use our online tool to split large JSON files into parts easily. Free, safe, and fast — no login or install needed.",
    site: "https://merge-json-files.com/json-file-splitter",
    creator: "@imaduddin_101",
    images: ["/split.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "JSON File Splitter",
            url: "https://merge-json-files.com/json-file-splitter",
            description:
              "Split large JSON files into multiple smaller chunks using our free online JSON Splitter. Fast, safe, and user-friendly with no signup.",
            publisher: {
              "@type": "Organization",
              name: "Merge JSON Files",
              url: "https://merge-json-files.com",
              logo: {
                "@type": "ImageObject",
                url: "https://merge-json-files.com/split.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://merge-json-files.com/json-file-splitter?query={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <main className="flex-grow">{children}</main>
      <Toaster />
    </>
  );
}
