import type { Metadata } from "next";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Merge JSON Files Instantly | Free Online JSON Merger Tool",
  description:
    "Easily merge JSON files online with our fast, free, and secure JSON Merger. Combine multiple JSON files into one — no signup, no hassle!",
  keywords:
    "merge JSON files, combine JSON files online, free JSON merger, online JSON combiner, merge JSON tool, JSON file merger, join JSON files",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "https://merge-json-files.com/",
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
    title: "Merge JSON Files Instantly | Free & Secure JSON Merger",
    description:
      "Combine JSON files with our free online tool. Merge multiple JSON files into one structured file quickly and securely — no signup required.",
    url: "https://merge-json-files.com",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/merge.png",
        width: 1200,
        height: 630,
        alt: "Free JSON Merger Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge JSON Files Instantly | Free & Secure JSON Merger",
    description:
      "Combine JSON files online with one click. Fast, reliable, and free JSON merger with no login required.",
    site: "https://merge-json-files.com",
    creator: "@imaduddin_101",
    images: ["/merge.png"],
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
            "@type": "WebSite",
            name: "Merge JSON Files Online",
            url: "https://merge-json-files.com",
            description:
              "Easily merge multiple JSON files into one with our free, fast, and secure JSON Merger tool. No login required.",
            publisher: {
              "@type": "Organization",
              name: "Merge JSON Files",
              url: "https://merge-json-files.com",
              logo: {
                "@type": "ImageObject",
                url: "https://merge-json-files.com/merge.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://merge-json-files.com/?query={search_term_string}",
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
