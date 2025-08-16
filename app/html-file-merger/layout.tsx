import type { Metadata } from "next";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Merge HTML Files Instantly | Free Online HTML Merger Tool",
  description:
    "Easily merge HTML files online with our fast, free, and secure HTML Merger. Combine multiple HTML files into one — no signup, no hassle!",
  keywords:
    "merge HTML files, combine HTML files online, free HTML merger, online HTML combiner, merge HTML tool, HTML file merger, join HTML files",
  metadataBase: new URL("https://merge-html-files.com"),
  alternates: {
    canonical: "https://merge-html-files.com/",
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
    title: "Merge HTML Files Instantly | Free & Secure HTML Merger",
    description:
      "Combine HTML files with our free online tool. Merge multiple HTML files into one structured file quickly and securely — no signup required.",
    url: "https://merge-html-files.com",
    siteName: "Merge HTML Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/merge.png",
        width: 1200,
        height: 630,
        alt: "Free HTML Merger Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge HTML Files Instantly | Free & Secure HTML Merger",
    description:
      "Combine HTML files online with one click. Fast, reliable, and free HTML merger with no login required.",
    site: "https://merge-html-files.com",
    creator: "@imaduddin_101",
    images: ["/merge.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Merge HTML Files Online",
            url: "https://merge-html-files.com",
            description:
              "Easily merge multiple HTML files into one with our free, fast, and secure HTML Merger tool. No login required.",
            publisher: {
              "@type": "Organization",
              name: "Merge HTML Files",
              url: "https://merge-html-files.com",
              logo: {
                "@type": "ImageObject",
                url: "https://merge-html-files.com/merge.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://merge-html-files.com/?query={search_term_string}",
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