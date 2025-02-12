import type { Metadata } from "next";
import "../../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JSON File Splitter Online - Free JSON Splitter Tool",
  description:
    "Split large JSON files online quickly and easily. Free tool to divide JSON files into smaller parts with perfect structure preservation. No signup required.",
  keywords:
    "JSON Splitter, JSON File Splitter, Split JSON Files, JSON Splitter Online, JSON Splitter Free, Split JSON, JSON File Splitter Online, JSON Splitter Tool",
  metadataBase: new URL("https://json-splitter.com"),
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
    title: "JSON File Splitter Online - Free JSON Splitter Tool",
    description:
      "Split large JSON files online quickly and easily. Free tool to divide JSON files into smaller parts with perfect structure preservation. No signup required.",
    url: "https://json-splitter.com",
    siteName: "JSON File Splitter Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image-splitter.png",
        width: 1200,
        height: 630,
        alt: "Free Online JSON File Splitter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON File Splitter Online - Free JSON Splitter Tool",
    description:
      "Split large JSON files online quickly and easily. Free tool to divide JSON files into smaller parts with perfect structure preservation. No signup required.",
    site: "@imaduddin_101",
    creator: "@imaduddin_101",
    images: ["/twitter-image-splitter.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="JSON" second="Splitter" third="Online" />
      <main className="flex-grow">{children}</main>
      <Footer name="JSON Splitter" />
    </>
  );
}
