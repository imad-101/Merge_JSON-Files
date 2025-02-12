import type { Metadata } from "next";

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Merge JSON Files Online - Free JSON File Merger Tool",
  description:
    "Merge JSON files online quickly and easily. Free tool to combine multiple JSON files with perfect structure preservation. No signup required.",
  keywords:
    "merge json files, merge json files online, merge json files online free, json merger, combine json files, json file combiner, merge json files free , combine json files online",
  metadataBase: new URL("https://merge-json-files.com"),
  alternates: {
    canonical: "/",
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
    title: "Merge JSON Files Online - Free JSON File Combiner",
    description:
      "Merge JSON files online quickly and easily. Free tool to combine multiple JSON files with perfect structure preservation. No signup required.",
    url: "https://merge-json-files.com",
    siteName: "Merge JSON Files Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Online JSON File Merger Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge JSON Files Online - Free JSON File Combiner",
    description:
      "Merge JSON files online quickly and easily. Free tool to combine multiple JSON files with perfect structure preservation. No signup required.",
    site: "@imaduddin_101",
    creator: "@imaduddin_101",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="Merge" second="JSON" third="Files" />
      <main className="flex-grow">{children}</main>

      <Footer name="Merge JSON Files" />
    </>
  );
}
