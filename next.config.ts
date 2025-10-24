import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    "@tailwindcss/node",
    "@tailwindcss/oxide",
    "lightningcss",
  ],
};

export default nextConfig;
