// lib/ga.ts

export const GA_MEASUREMENT_ID = "G-FJPP455G2L";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
export const pageview = (url: string) => {
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  params,
}: {
  action: string;
  params: Record<string, any>;
}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};
