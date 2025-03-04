import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Free Online JSON Splitter Tool",
  description:
    "Split large JSON files online quickly and easily. Free tool to divide JSON files into smaller parts with perfect structure preservation. No signup required.",
  keywords:
    "JSON Splitter, JSON File Splitter, Split JSON Files, JSON Splitter Online, JSON Splitter Free, Split JSON, JSON File Splitter Online, JSON Splitter Tool",
  metadataBase: new URL("https://merge-json-files.com/json-file-splitter"),
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
    title: "JSON File Splitter Online - Free Online JSON Splitter Tool",
    description:
      "Split large JSON files online quickly and easily. Free tool to divide JSON files into smaller parts with perfect structure preservation. No signup required.",
    url: "https://merge-json.com/json-file-splitter",
    siteName: "JSON File Splitter Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/splitter.png",
        width: 1200,
        height: 630,
        alt: "Free Online JSON File Splitter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON File Splitter Online - Free Online JSON Splitter Tool",
    description:
      "Split large JSON files online quickly and easily. Free tool to divide JSON files into smaller parts with perfect structure preservation. No signup required.",
    site: "https://merge-json.com/json-file-splitter",
    creator: "@imaduddin_101",
    images: ["/splitter.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header
        first="JSON"
        second="Splitter"
        third="Online"
        href="/json-file-splitter"
      />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="JSON Splitter" />
    </>
  );
}
