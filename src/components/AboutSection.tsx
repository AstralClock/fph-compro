import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

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
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="Strategic Partnership"
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
              About <span className="text-primary">Fortis Prima Hanami</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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