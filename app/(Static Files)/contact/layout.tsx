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
    <>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header first="Merge " second="JSON " third="Files" href="/" />
        <main>{children}</main>
        <Footer name="Merge JSON Files" />
      </body>
    </>
  );
};

export default ContactLayout;
