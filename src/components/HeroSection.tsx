import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Tagline */}
          <p className="text-gold font-semibold tracking-widest text-sm md:text-base uppercase animate-fade-up">
            Smart Business Solutions
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-up animation-delay-100">
            Driving Strategic Transformation and Sustainable Growth
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up animation-delay-200">
            We provide innovative solutions to navigate the complex business
            landscape and unlock your organization's full potential.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-up animation-delay-300">
            <Button
              size="lg"
              onClick={() => scrollToSection("#projects")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#about")}
              className="border-gold text-gold hover:bg-gold/10 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("#stats")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground animate-bounce transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}