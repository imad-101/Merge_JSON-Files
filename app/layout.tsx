import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const myFont = localFont({ src: "./fonts/sansFont.ttf" });

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
  verification: {
    google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Merge JSON Files" />
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
              name: "Merge JSON Files Online",
              headline: "Free Online JSON File Merger",
              description:
                "Merge JSON files online for free. Easily combine multiple JSON files with our fast, secure tool.",
              url: "https://merge-json-files.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              keywords:
                "merge json files, merge json files online, merge json files online free",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://merge-json-files.com",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${myFont.className} antialiased bg-yellow-50 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          <h1 className="sr-only">Merge JSON Files Online Free</h1>
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
