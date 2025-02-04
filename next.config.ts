import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
