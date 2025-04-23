import type { Metadata } from "next";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Flatten JSON Files Instantly | Free Online JSON Flattener Tool",
  description:
    "Easily flatten nested JSON structures into a single-level format using our fast, free, and secure online JSON Flattener. No login needed!",
  keywords:
    "flatten JSON, JSON flattener, flatten nested JSON, convert JSON to flat structure, online JSON flattener, free JSON tool, JSON parser",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "https://merge-json-files.com/json-flattener",
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
    title: "Flatten JSON Files Instantly | Free & Secure JSON Flattener",
    description:
      "Convert complex, nested JSON into a flat format online. Try our JSON Flattener tool — simple, free, and secure with no signup required.",
    url: "https://merge-json-files.com/json-flattener",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/flatten.png",
        width: 1200,
        height: 630,
        alt: "Free JSON Flattener Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flatten JSON Files Instantly | Free & Secure JSON Flattener",
    description:
      "Flatten nested JSON structures online instantly. A fast, free, and secure JSON Flattener tool — no login or installation required.",
    site: "https://merge-json-files.com/json-flattener",
    creator: "@imaduddin_101",
    images: ["/flatten.png"],
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
            name: "JSON Flattener",
            url: "https://merge-json-files.com/json-flattener",
            description:
              "Flatten nested JSON into a flat key-value structure using our online JSON Flattener. Fast, free, and easy to use with no signup.",
            publisher: {
              "@type": "Organization",
              name: "Merge JSON Files",
              url: "https://merge-json-files.com",
              logo: {
                "@type": "ImageObject",
                url: "https://merge-json-files.com/flatten.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://merge-json-files.com/json-flattener?query={search_term_string}",
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
