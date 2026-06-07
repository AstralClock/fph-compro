"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TrustedClientItem } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";

const fallbackClients = [
  { name: "Client Alpha Corp", logoUrl: null },
  { name: "Beta Industries", logoUrl: null },
  { name: "Gamma Holdings", logoUrl: null },
  { name: "Delta Group", logoUrl: null },
  { name: "Epsilon Partners", logoUrl: null },
  { name: "Zeta Ventures", logoUrl: null },
];

interface ClientsSectionProps {
  title?: string;
  description?: string;
  data?: TrustedClientItem[];
}

export function ClientsSection({ title, description, data }: ClientsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const clients = data && data.length > 0
    ? data.map(client => ({
        name: client.title || "Client",
        logoUrl: client.logos && client.logos.length > 0 ? getStrapiMedia(client.logos[0].url) : null,
      }))
    : fallbackClients;

  const sectionTitle = title || "Trusted by Industry Leaders";
  const sectionDesc = description || "We've partnered with organizations across diverse sectors to deliver transformative results.";

  return (
    <section className="py-20 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className="text-center mb-12 opacity-0"
          style={{
            animation: isVisible ? "fadeUp 0.6s ease-out forwards" : "none",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {sectionDesc}
          </p>
        </div>

        {/* Logo marquee */}
        <div
          className="relative mb-16 opacity-0"
          style={{
            animation: isVisible ? "fadeUp 0.6s ease-out 0.2s forwards" : "none",
          }}
        >
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee shrink-0">
              {clients.map((client, index) => (
                <div
                  key={`marquee-1-${index}`}
                  className="flex-shrink-0 mx-8 px-8 py-4 bg-section-alt rounded-lg flex items-center justify-center min-w-[200px]"
                >
                  {client.logoUrl ? (
                    <Image 
                      src={client.logoUrl} 
                      alt={client.name} 
                      width={160}
                      height={60}
                      className="max-h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      unoptimized
                    />
                  ) : (
                    <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex animate-marquee shrink-0" aria-hidden="true">
              {clients.map((client, index) => (
                <div
                  key={`marquee-2-${index}`}
                  className="flex-shrink-0 mx-8 px-8 py-4 bg-section-alt rounded-lg flex items-center justify-center min-w-[200px]"
                >
                  {client.logoUrl ? (
                    <Image 
                      src={client.logoUrl} 
                      alt={client.name} 
                      width={160}
                      height={60}
                      className="max-h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      unoptimized
                    />
                  ) : (
                    <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}