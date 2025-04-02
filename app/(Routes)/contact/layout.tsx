import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us - Merge JSON Files",
  description: "Get in touch with us through our Contact Us page.",
};

const ContactLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Header first="Merge " second="JSON " third="Files" href="/" />
      <main>{children}</main>
      <Footer name="Merge JSON Files" />
    </div>
  );
};

export default ContactLayout;
