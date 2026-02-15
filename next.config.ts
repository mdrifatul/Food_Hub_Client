import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.AUTH_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
