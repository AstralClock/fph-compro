"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/types/strapi";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";

interface TestimonialsSectionProps {
  data?: Testimonial[] | null;
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = data && data.length > 0 ? data : [
    {
      id: 1,
      documentId: "fallback-1",
      quote: "Fortis Prima Hanami transformed our approach to business strategy. Their insights and dedication helped us achieve growth we never thought possible. A truly invaluable partnership.",
      authorName: "John Doe",
      authorRole: "CEO, Alpha Corp",
    }
  ];

  const getInitials = (name: string) => {
    if (!name) return "JD";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="py-20 bg-background overflow-hidden relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div 
          className="max-w-4xl mx-auto text-center relative opacity-0"
          style={{
            animation: isVisible ? "fadeUp 0.6s ease-out forwards" : "none",
          }}
        >
          <Quote className="h-12 w-12 text-gold/30 mx-auto mb-8" />
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4 md:px-12">
                  <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    {testimonial.avatar ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={getStrapiMedia(testimonial.avatar.url)!} 
                          alt={testimonial.authorName || "Avatar"} 
                          width={48} 
                          height={48} 
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">
                          {getInitials(testimonial.authorName)}
                        </span>
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{testimonial.authorName}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.authorRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 w-10 h-10 rounded-full bg-background shadow-md border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 w-10 h-10 rounded-full bg-background shadow-md border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
