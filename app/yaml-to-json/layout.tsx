import type { Metadata } from "next";
import "../globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Convert YAML to JSON Instantly | Free Online YAML to JSON Converter",
  description:
    "Easily convert YAML to JSON format online with our free, secure, and instant YAML to JSON converter. No signup, no hassle!",
  keywords:
    "YAML to JSON, convert YAML to JSON online, YAML to JSON converter, free YAML tool, YAML parser, online YAML formatter, JSON output",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "https://merge-json-files.com/yaml-to-json",
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
    title: "Convert YAML to JSON Instantly | Free & Secure Converter",
    description:
      "Convert YAML data to JSON format online in one click. Use our secure and free YAML to JSON converter — fast, reliable, and no login required.",
    url: "https://merge-json-files.com/yaml-to-json",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/yaml-to-json.png",
        width: 1200,
        height: 630,
        alt: "Free YAML to JSON Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert YAML to JSON Instantly | Free & Secure Converter",
    description:
      "Quickly convert YAML files to JSON format with our free and easy online YAML to JSON converter. No account or download required.",
    site: "https://merge-json-files.com/yaml-to-json",
    creator: "@imaduddin_101",
    images: ["/yaml-to-json.png"],
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
            name: "YAML to JSON Converter",
            url: "https://merge-json-files.com/yaml-to-json",
            description:
              "Convert YAML to JSON online in seconds. Our free YAML to JSON converter is fast, secure, and easy to use — no signups or installations needed.",
            publisher: {
              "@type": "Organization",
              name: "Merge JSON Files",
              url: "https://merge-json-files.com",
              logo: {
                "@type": "ImageObject",
                url: "https://merge-json-files.com/yaml-to-json.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://merge-json-files.com/yaml-to-json?query={search_term_string}",
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
