import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Convert YAML to JSON Online - Free YAML Converter Tool",
  description:
    "Convert YAML to JSON quickly and easily with our free online converter tool. Transform YAML files into structured JSON format without any software installation.",
  keywords:
    "convert YAML to JSON, YAML to JSON converter, YAML to JSON online, YAML converter, free YAML to JSON tool, YAML to JSON conversion, data conversion tool",
  metadataBase: new URL("https://merge-json-files.com/yaml-to-json"),
  alternates: {
    canonical: "https://merge-json-files.com/yaml-to-json",
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
    title: "Convert YAML to JSON Online - Professional YAML Converter",
    description:
      "Effortlessly convert YAML files to JSON format using our professional online converter. Fast, secure, and free to use.",
    url: "https://merge-json-files.com/yaml-to-json",
    siteName: "Convert YAML to JSON Online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/json.png",
        width: 1200,
        height: 630,
        alt: "Professional YAML to JSON Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert YAML to JSON Online - Professional YAML Converter",
    description:
      "Transform your YAML files into JSON format seamlessly with our online converter. Fast, secure, and free to use.",
    site: "https://merge-json-files.com/yaml-to-json",
    creator: "@imaduddin_101",
    images: ["/json.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header first="YAML" second="to" third="JSON" href="/yaml-to-json" />
      <main className="flex-grow">{children}</main>
      <Toaster />
      <Footer name="YAML to JSON Converter" />
    </>
  );
}
