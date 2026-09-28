import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Admin project form uploads images (capped at 4 MB in the action).
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
