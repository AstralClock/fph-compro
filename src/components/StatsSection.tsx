"use client";
import * as Icons from "lucide-react";
import { Briefcase, Users, Award, Building2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { StatComponent } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/api";

const fallbackStats = [
  { icon: Briefcase, value: 150, suffix: "+", label: "Projects Completed" },
  { icon: Award, value: 12, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 200, suffix: "+", label: "Happy Clients" },
  { icon: Building2, value: 8, suffix: "", label: "Industries Served" },
];

function StatCard({
  icon: Icon,
  iconUrl,
  number,
  label,
  isVisible,
  delay,
}: {
  icon?: any;
  iconUrl?: string | null;
  number: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  // If we wanted to animate we could parse the number, but since it could contain suffixes directly from Strapi like "150+"
  return (
    <div
      className="text-center p-6 opacity-0"
      style={{
        animation: isVisible ? `fadeUp 0.6s ease-out ${delay}ms forwards` : "none",
      }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4 overflow-hidden">
        {iconUrl ? (
          <img src={iconUrl} alt={label} className="h-8 w-8 object-contain" />
        ) : Icon ? (
          <Icon className="h-8 w-8 text-gold" />
        ) : null}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {number}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

interface StatsSectionProps {
  data?: any[]; // Set ke any dulu biar gak bentrok sama interface lama di src/types/strapi.ts
}

export function StatsSection({ data }: StatsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  });

  const displayStats = data && data.length > 0
    ? data.map(s => {
      const DynamicIcon = (Icons as any)[s.iconName] || Icons.HelpCircle;

      return {
        number: s.number || "0",
        label: s.label,
        icon: DynamicIcon,
        iconUrl: null,
      };
    })
    : fallbackStats.map(s => ({
      ...s,
      number: `${s.value}${s.suffix}`,
    }));

  return (
    <section id="stats" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <StatCard
              key={stat.label + index}
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