import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sova-shop.com.ua",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
