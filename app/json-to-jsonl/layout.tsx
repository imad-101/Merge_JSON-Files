import type { Metadata } from "next";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title:
    "Convert JSON to JSONL Instantly | Free Online JSON to JSONL Converter",
  description:
    "Convert standard JSON to JSONL format online in one click. Fast, free, and secure JSON to JSONL converter — no signup or install required!",
  keywords:
    "convert JSON to JSONL, JSON to JSONL online, JSONL converter, free JSON to JSONL, JSON lines format, JSON to JSONL tool, JSON formatter",
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
    title: "Convert JSON to JSONL Instantly | Free & Secure Converter",
    description:
      "Easily convert JSON to JSONL format online. Use our secure and free JSON to JSONL converter — perfect for machine learning and data processing.",
    url: "https://merge-json-files.com/json-to-jsonl",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/jsonl.png",
        width: 1200,
        height: 630,
        alt: "Free JSON to JSONL Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JSON to JSONL Instantly | Free & Secure Converter",
    description:
      "Convert standard JSON to line-delimited JSONL format online. A fast, secure, and free converter — no login required.",
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
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "JSON to JSONL Converter",
            url: "https://merge-json-files.com/json-to-jsonl",
            description:
              "Convert JSON to JSONL (JSON Lines) format quickly and easily. Use our free online converter — no signups, no software needed.",
            publisher: {
              "@type": "Organization",
              name: "Merge JSON Files",
              url: "https://merge-json-files.com",
              logo: {
                "@type": "ImageObject",
                url: "https://merge-json-files.com/jsonl.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://merge-json-files.com/json-to-jsonl?query={search_term_string}",
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
