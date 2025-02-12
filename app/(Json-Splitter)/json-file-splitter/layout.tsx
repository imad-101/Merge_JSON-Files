import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "../../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const myFont = localFont({ src: "../../fonts/sansFont.ttf" });

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
    <html lang="en">
      <head>
        <meta name="author" content="JSON Splitter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fefce8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "JSON File Splitter Online",
              headline: "Free Online JSON File Splitter",
              description:
                "Split large JSON files online for free. Easily divide JSON files into smaller parts with our fast, secure tool.",
              url: "https://json-splitter.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              keywords:
                "JSON Splitter, JSON File Splitter, Split JSON Files, JSON Splitter Online, JSON Splitter Free, Split JSON, JSON File Splitter Online, JSON Splitter Tool",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://json-splitter.com",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${myFont.className} antialiased bg-yellow-50 min-h-screen flex flex-col`}
      >
        <Header first="JSON" second="Splitter" third="Online" />
        <main className="flex-grow">{children}</main>
        <SpeedInsights />
        <Analytics />
        <Footer name="JSON Splitter" />
      </body>
    </html>
  );
}
