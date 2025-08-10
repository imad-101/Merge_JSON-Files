import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import "./globals.css";
import Providers from "./providers";
import { GA_MEASUREMENT_ID } from "@/lib/ga";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <meta name="yandex-verification" content="84dca52e46053335" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334971938249130"
          crossOrigin="anonymous"
        ></script>

        {process.env.NODE_ENV === "production" && (
          <>
            {/* Google Analytics */}
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />

            
          </>
        )}
      </head>

      <body className="antialiased min-h-screen flex flex-col ">
        <Providers>
          <main>{children}</main>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
