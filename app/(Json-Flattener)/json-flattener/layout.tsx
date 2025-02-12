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
  metadataBase: new URL("https://json-flattener.com"),
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
    title: "JSON Flattener Online - Free JSON Flattener Tool",
    description:
      "Flatten nested JSON files online quickly and easily. Free tool to convert complex JSON structures into flat key-value pairs. No signup required.",
    url: "https://json-flattener.com",
    siteName: "JSON Flattener Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image-flattener.png",
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
    site: "@imaduddin_101",
    creator: "@imaduddin_101",
    images: ["/twitter-image-flattener.png"],
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
