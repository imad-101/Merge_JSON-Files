import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>

      <body className={` antialiasedmin-h-screen flex flex-col `}>
        <main>{children}</main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
