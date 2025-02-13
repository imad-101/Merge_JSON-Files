import type { Metadata } from "next";

import "../../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JSON Flattener Online - Free JSON Flattener Tool",
  description:
    "Flatten nested JSON files online quickly and easily. Free tool to convert complex JSON structures into flat key-value pairs. No signup required.",
  keywords:
    "JSON Flattener, JSON Flattener Online, Flattening JSON Files, Flattening JSON, JSON Flattener Free, JSON File Flattener, Flatten JSON Online",
  metadataBase: new URL("https://merge-json-files.com/json-flattener"),
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
    title: "JSON Flattener Online - Free JSON Flattener Tool",
    description:
      "Flatten nested JSON files online quickly and easily. Free tool to convert complex JSON structures into flat key-value pairs. No signup required.",
    url: "https://merge-json-files.com/json-flattener",
    siteName: "JSON Flattener Tool",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/flattener.png",
        width: 1200,
        height: 630,
        alt: "Free Online JSON Flattener Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Flattener Online - Free JSON Flattener Tool",
    description:
      "Flatten nested JSON files online quickly and easily. Free tool to convert complex JSON structures into flat key-value pairs. No signup required.",
    site: "https://merge-json-files.com/json-flattener",
    creator: "@imaduddin_101",
    images: ["/flattener.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="JSON" second="Flattener" third="Online" />
      <main className="flex-grow">{children}</main>
      <Footer name="JSON Flattener" />
    </>
  );
}
