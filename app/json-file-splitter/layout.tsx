import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// ... metadata stays the same ...

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header
          first="JSON"
          second="Splitter"
          third="Online"
          href="/json-file-splitter"
        />
        <main className="flex-grow">{children}</main>
        <Toaster />
        <Footer name="JSON Splitter" />
      </body>
    </html>
  );
}
