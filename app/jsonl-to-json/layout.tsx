import type { Metadata } from "next";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title:
    "Convert JSONL to JSON Instantly | Free Online JSONL to JSON Converter",
  description:
    "Convert JSONL (JSON Lines) to standard JSON format online. Free, secure, and fast JSONL to JSON converter — no login or installation needed!",
  keywords:
    "convert JSONL to JSON, JSONL to JSON online, JSONL to JSON converter, JSONL parser, JSON lines to JSON, free JSONL tool, JSON converter online",
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
    title: "Convert JSONL to JSON Instantly | Free & Secure Converter",
    description:
      "Easily convert JSON Lines (JSONL) into structured JSON format online. Use our secure, fast, and free JSONL to JSON converter tool — no signup required.",
    url: "https://merge-json-files.com/jsonl-to-json",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/jsonl-to-json.png",
        width: 1200,
        height: 630,
        alt: "Free JSONL to JSON Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JSONL to JSON Instantly | Free & Secure Converter",
    description:
      "Turn JSONL files into standard JSON format easily with our free, fast, and secure online converter. No account needed.",
    site: "https://merge-json-files.com/jsonl-to-json",
    creator: "@imaduddin_101",
    images: ["/jsonl-to-json.png"],
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
            name: "JSONL to JSON Converter",
            url: "https://merge-json-files.com/jsonl-to-json",
            description:
              "Convert JSON Lines (JSONL) to standard JSON format in seconds using our fast and free JSONL to JSON converter. No signup required.",
            publisher: {
              "@type": "Organization",
              name: "Merge JSON Files",
              url: "https://merge-json-files.com",
              logo: {
                "@type": "ImageObject",
                url: "https://merge-json-files.com/jsonl-to-json.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://merge-json-files.com/jsonl-to-json?query={search_term_string}",
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
