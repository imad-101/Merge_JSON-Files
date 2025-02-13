import React from "react";
import "../../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
interface AboutUsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "About Us - Merge JSON Files",
  description:
    "Learn more about Merge JSON Files, the ultimate tool for merging JSON files online. Our mission is to provide a seamless and efficient solution for combining multiple JSON files into one, saving you time and effort.",
  keywords:
    "about us, merge json files, json merger tool, json files, json files online",
};
const AboutUsLayout: React.FC<AboutUsLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header first="Merge" second="JSON" third="Files" />
      <main>{children}</main>
      <Footer name="Merge JSON Files" />
    </div>
  );
};

export default AboutUsLayout;
