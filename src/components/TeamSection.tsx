"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TeamMember } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";

const fallbackTeam = [
  { name: "Monica", role: "President Director", initials: "M" },
  { name: "Horas", role: "Director of Operations", initials: "H" },
  { name: "Giovanny", role: "Director of Strategy", initials: "G" },
];

interface TeamSectionProps {
  title?: string;
  description?: string;
  data?: TeamMember[] | null;
}

export function TeamSection({ title, description, data }: TeamSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const teamMembers = data && data.length > 0 ? data : fallbackTeam;

  return (
    <section id="team" className="py-24 bg-section-alt" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className="text-center mb-16 opacity-0"
          style={{
            animation: isVisible ? "fadeUp 0.6s ease-out forwards" : "none",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title || (
              <>
                Meet Our <span className="text-primary">Leadership</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description || "Experienced professionals dedicated to driving your success."}
          </p>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {teamMembers.map((member: any, index: number) => {
            const photoUrl = member.photo ? getStrapiMedia(member.photo.url) : null;
            const content = (
              <>
                {/* Photo placeholder or image */}
                <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden bg-muted flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative border-4 border-background group-hover:border-primary/20">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <span className="text-5xl md:text-6xl font-bold text-primary/60 group-hover:text-primary transition-colors">
                      {member.initials || member.name.charAt(0)}
                    </span>
                  )}
                </div>
                
                {/* Name */}
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 group-hover:text-foreground transition-colors">
                  {member.name}
                </h3>
                
                {/* Title */}
                <p className="text-muted-foreground mb-4">{member.role || member.title}</p>
                
                {/* Gold separator */}
                <div className="w-12 h-0.5 bg-gold mx-auto rounded-full group-hover:w-24 transition-all duration-300" />
              </>
            );

            return (
              <div
                key={member.name + index}
                className="text-center opacity-0 group"
                style={{
                  animation: isVisible
                    ? `fadeUp 0.6s ease-out ${0.1 + index * 0.15}s forwards`
                    : "none",
                }}
              >
                {member.linkedinUrl ? (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                    {content}
                  </a>
                ) : (
                  <div className="block w-full h-full">
                    {content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}