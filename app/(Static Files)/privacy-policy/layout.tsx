import React from "react";
import "../../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
interface PrivacyPolicyLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Privacy Policy - Merge JSON Files",
  description:
    "Read the privacy policy of Merge JSON Files. Learn how we collect, use, and protect your data while processing your JSON files.",
  keywords:
    "privacy policy, merge json files, json merger tool, json files, json files online",
};
const PrivacyPolicyLayout: React.FC<PrivacyPolicyLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header first="Merge" second="JSON" third="Files" href="/" />
        <main>{children}</main>
        <Footer name="Merge JSON Files" />
      </body>
    </>
  );
};

export default PrivacyPolicyLayout;
