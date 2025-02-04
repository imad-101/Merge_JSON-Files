import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const myFont = localFont({ src: "./fonts/sansFont.ttf" });

export const metadata: Metadata = {
  title: "JSON File Merger - Fast & Secure JSON Merging Tool",
  description:
    "Easily merge multiple JSON files into one with our fast and secure online tool. No data storage, 100% privacy-focused.",
  keywords:
    "JSON merger, merge JSON files, online JSON tool, secure JSON processing, combine JSON files",
  openGraph: {
    title: "JSON File Merger - Fast & Secure JSON Merging Tool",
    description:
      "Easily merge multiple JSON files into one with our fast and secure online tool. No data storage, 100% privacy-focused.",
    url: "https://merge-json-files.com",
    siteName: "JSON File Merger",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON File Merger - Fast & Secure JSON Merging Tool",
    description:
      "Easily merge multiple JSON files into one with our fast and secure online tool. No data storage, 100% privacy-focused.",
    site: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <head>
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Merge JSON Files" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://merge-json-files.com" />

          <link rel="icon" href="/favicon.png" type="image/png" />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
        </head>
      </head>
      <body className={`${myFont.className}  antialiased bg-yellow-50`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
