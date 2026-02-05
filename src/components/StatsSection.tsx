import { Briefcase, Users, Award, Building2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { icon: Briefcase, value: 150, suffix: "+", label: "Projects Completed" },
  { icon: Award, value: 12, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 200, suffix: "+", label: "Happy Clients" },
  { icon: Building2, value: 8, suffix: "", label: "Industries Served" },
];

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  isVisible,
  delay,
}: {
  icon: typeof Briefcase;
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div
      className="text-center p-6 opacity-0"
      style={{
        animation: isVisible ? `fadeUp 0.6s ease-out ${delay}ms forwards` : "none",
      }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
        <Icon className="h-8 w-8 text-gold" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section id="stats" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}