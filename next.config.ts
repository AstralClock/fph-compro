import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan pengecekan TypeScript pas build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;