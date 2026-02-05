import { Compass, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const missionPoints = [
  "Delivering high-quality professional services that exceed expectations",
  "Developing innovative solutions tailored to each client's unique needs",
  "Building long-term partnerships based on trust and mutual success",
  "Upholding the highest standards of ethical conduct and integrity",
  "Fostering a culture of continuous improvement and excellence",
];

export function VisionMissionSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="vision" className="py-24 bg-section-alt" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Vision */}
          <div
            className="bg-background rounded-xl p-8 md:p-12 shadow-lg opacity-0"
            style={{
              animation: isVisible ? "fadeUp 0.6s ease-out forwards" : "none",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-gold/10">
                <Compass className="h-8 w-8 text-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Our Vision
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              To be a premier strategic solutions provider, recognized for
              driving sustainable growth and fostering innovation across
              industries. We envision a future where every organization we
              partner with achieves unprecedented levels of success and makes a
              lasting positive impact on their stakeholders and communities.
            </p>
            <div className="mt-8 h-1 w-24 bg-gold rounded-full" />
          </div>

          {/* Mission */}
          <div
            className="bg-background rounded-xl p-8 md:p-12 shadow-lg opacity-0"
            style={{
              animation: isVisible ? "fadeUp 0.6s ease-out 0.2s forwards" : "none",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <ul className="space-y-4">
              {missionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}