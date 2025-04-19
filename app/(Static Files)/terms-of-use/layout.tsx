import React from "react";
import "../../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
interface TermsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Terms Of Use - Merge JSON Files",
  description:
    "Read the terms of use of Merge JSON Files. Learn how you can use our tools to simplify your workflow.",
  keywords: "Terms Of Use, merge json files ",
};
const TermsLayout: React.FC<TermsLayoutProps> = ({ children }) => {
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

export default TermsLayout;
