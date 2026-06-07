"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AboutComponent } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/api";

interface AboutSectionProps {
  data?: AboutComponent;
}

export function AboutSection({ data }: AboutSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const imageUrl = data?.image?.url
    ? getStrapiMedia(data.image.url)
    : "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className="relative opacity-0"
            style={{
              animation: isVisible ? "slideInLeft 0.8s ease-out forwards" : "none",
            }}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={imageUrl!}
                alt={data?.title || "Strategic Partnership"}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary/20 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div
            className="space-y-6 opacity-0"
            style={{
              animation: isVisible ? "slideInRight 0.8s ease-out 0.2s forwards" : "none",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {data?.title ? (
                // Use a simple split if title has Fortis Prima Hanami, else just show it
                <span dangerouslySetInnerHTML={{ __html: data.title }} />
              ) : (
                <>
                  About <span className="text-primary">Fortis Prima Hanami</span>
                </>
              )}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {data?.description && Array.isArray(data.description) ? (
                // Simplistic extraction of Strapi 5 block text (assumes paragraph -> text structure)
                data.description.map((block: any, index: number) => {
                  const text = block?.children?.[0]?.text || "";
                  return text ? <p key={index}>{text}</p> : null;
                })
              ) : data?.description && typeof data.description === 'string' ? (
                // Fallback if it's just a string
                (data.description as string).split('\n').map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    Fortis Prima Hanami is your strategic partner in navigating the
                    complex and ever-evolving business landscape. We specialize in
                    delivering transformative solutions that address your most
                    pressing challenges while unlocking new opportunities for
                    sustainable growth.
                  </p>
                  <p>
                    Our team of seasoned experts combines deep industry knowledge
                    with innovative methodologies to create customized strategies
                    that drive measurable results. We believe in building long-term
                    partnerships founded on trust, transparency, and mutual success.
                  </p>
                  <p>
                    From strategic planning to operational excellence, we empower
                    organizations to achieve their full potential and thrive in
                    today's competitive environment.
                  </p>
                </>
              )}
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-gold rounded-full" />
                <span className="text-sm font-semibold text-gold uppercase tracking-wide">
                  Transformative Partnership
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}