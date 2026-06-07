import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fortis Prima Hanami - Smart Business Solutions",
  description: "Driving Strategic Transformation and Sustainable Growth.",
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getGlobalData, getStrapiMedia } from "@/lib/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: globalData } = await getGlobalData();
  const logoUrl = globalData?.logo ? getStrapiMedia(globalData.logo.url) : null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <div className="min-h-screen bg-background">
          <Header logoUrl={logoUrl} />
          {children}
          <Footer logoUrl={logoUrl} data={globalData || null} />
        </div>
      </body>
    </html>
  );
}