// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           // <-- static export
  images: { unoptimized: true },
  trailingSlash: true,        // helpful for GH Pages
  // basePath/assetPrefix NOT needed for a user site repo (root domain)
};

export default nextConfig;
