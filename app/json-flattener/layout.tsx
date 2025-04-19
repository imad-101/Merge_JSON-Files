import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "JSON Flattener Online - Free JSON Flattener Tool",
  description:
    "Flatten nested JSON structures online with our free tool. Upload your JSON file and instantly convert nested objects into a flat key-value format. Fast, secure, and no signup needed.",
  keywords:
    "flatten JSON, flatten JSON online, flatten JSON tool, flatten JSON file, free JSON flattener, , JSON flattener , nested JSON tool , nested JSON flattener, JSON converter",
  metadataBase: new URL("https://merge-json-files.com/json-to-jsonl"),
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
    title: "Flatten JSON Online - Professional JSON Flattener Tool",
    description:
      "Flatten nested JSON structures into a flat key-value format instantly with our professional JSON flattener. Fast, secure, and free to use.",
    url: "https://merge-json-files.com/json-flattener",
    siteName: "Flatten JSON Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/flatten.png",
        width: 1200,
        height: 630,
        alt: "Professional JSON Flattener Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flatten JSON Online - Professional JSON Flattener Tool",
    description:
      "Flatten nested JSON structures into a flat key-value format instantly with our professional JSON flattener. Fast, secure, and free to use.",
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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header
          first="Flatten"
          second="JSON"
          third="Online"
          href="/json-flattener"
        />
        <main className="flex-grow">{children}</main>
        <Toaster />
        <Footer name="Flatten JSON" />
      </body>
    </>
  );
}
