import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "../../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const myFont = localFont({ src: "../../fonts/sansFont.ttf" });

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
    <html lang="en">
      <head>
        <meta name="author" content="JSON Flattener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fefce8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "JSON Flattener Online",
              headline: "Free Online JSON Flattener",
              description:
                "Flatten nested JSON files online for free. Easily convert complex JSON structures into flat key-value pairs with our fast, secure tool.",
              url: "https://json-flattener.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              keywords:
                "JSON Flattener, JSON Flattener Online, Flattening JSON Files, Flattening JSON, JSON Flattener Free, JSON File Flattener, Flatten JSON Online",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://json-flattener.com",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${myFont.className} antialiased bg-yellow-50 min-h-screen flex flex-col`}
      >
        <Header first="JSON" second="Flattener" third="Online" />
        <main className="flex-grow">{children}</main>
        <SpeedInsights />
        <Analytics />
        <Footer name="JSON Flattener" />
      </body>
    </html>
  );
}
