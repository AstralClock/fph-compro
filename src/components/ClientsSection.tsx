import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";

const clients = [
  "Client Alpha Corp",
  "Beta Industries",
  "Gamma Holdings",
  "Delta Group",
  "Epsilon Partners",
  "Zeta Ventures",
];

export function ClientsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

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
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've partnered with organizations across diverse sectors to deliver
            transformative results.
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
            <div className="flex animate-marquee">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 px-8 py-4 bg-section-alt rounded-lg"
                >
                  <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Testimonial */}
        <div
          className="max-w-3xl mx-auto text-center opacity-0"
          style={{
            animation: isVisible ? "fadeUp 0.6s ease-out 0.4s forwards" : "none",
          }}
        >
          <Quote className="h-12 w-12 text-gold/30 mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-6">
            "Fortis Prima Hanami transformed our approach to business strategy.
            Their insights and dedication helped us achieve growth we never
            thought possible. A truly invaluable partnership."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-primary">JD</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">John Doe</p>
              <p className="text-sm text-muted-foreground">CEO, Alpha Corp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}