import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 // output: 'export', 
 // Matikan pengecekan TypeScript pas build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "103.93.134.74",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  // Proxy /strapi-uploads/* ke Strapi internal supaya browser tidak langsung
  // akses HTTP Strapi (yang error kalau lewat Cloudflare HTTPS)
  async rewrites() {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
    return [
      {
        source: "/strapi-uploads/:path*",
        destination: `${strapiUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
