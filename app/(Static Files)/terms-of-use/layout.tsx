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
    "Read the terms of use of Merge JSON Files. Learn how you can use our JSON merger , flattener , splitter , and other tools to combine multiple JSON files into one.",
  keywords:
    "Terms Of Use, merge json files, json merger tool, json files, json files online",
};
const TermsLayout: React.FC<TermsLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header first="Merge" second="JSON" third="Files" />
      <main>{children}</main>
      <Footer name="Merge JSON Files" />
    </div>
  );
};

export default TermsLayout;
