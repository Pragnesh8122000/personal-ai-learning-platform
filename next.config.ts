import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // YouTube serves video thumbnails from this CDN.
    // Allow next/image to optimize them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
