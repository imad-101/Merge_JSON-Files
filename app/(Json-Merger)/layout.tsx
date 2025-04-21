import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Merge JSON Files Online - Free JSON Merger Tool",
  description:
    "Merge JSON files online with our Free tool. Upload and merge JSON files instantly while preserving structure. Fast, secure, and no signup needed.",
  keywords:
    "merge JSON files, merge JSON files online , merge JSON files free , combine JSON files , combine JSON files online , JSON merger tool, how to merge json files",
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
    title: "Merge JSON Files Online - Professional JSON Merger",
    description:
      "Merge JSON files online with our professional tool. Upload and merge JSON files instantly while preserving structure. Fast, secure, and no signup needed.",
    url: "https://merge-json-files.com",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/merge.png",
        width: 1200,
        height: 630,
        alt: "Professional JSON File Merger Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge JSON Files Online - Professional JSON Merger",
    description:
      "Merge JSON files online with our professional tool. Upload and merge JSON files instantly while preserving structure. Fast, secure, and no signup needed.",
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
      <Header
        first="JSON"
        second="Merger"
        third="Online"
        href="/json-file-merger"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
        crossOrigin="anonymous"
      ></script>

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6334971938249130"
        data-ad-slot="8500156139"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="JSON Merger" />
    </>
  );
}
