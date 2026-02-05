import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const team = [
  {
    name: "Monica",
    title: "President Director",
    initials: "M",
  },
  {
    name: "Horas",
    title: "Director of Operations",
    initials: "H",
  },
  {
    name: "Giovanny",
    title: "Director of Strategy",
    initials: "G",
  },
];

export function TeamSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

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
            Meet Our <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experienced professionals dedicated to driving your success.
          </p>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="text-center opacity-0"
              style={{
                animation: isVisible
                  ? `fadeUp 0.6s ease-out ${0.1 + index * 0.15}s forwards`
                  : "none",
              }}
            >
              {/* Photo placeholder */}
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center shadow-lg group cursor-pointer hover:shadow-xl transition-shadow">
                <span className="text-5xl md:text-6xl font-bold text-primary/60 group-hover:text-primary transition-colors">
                  {member.initials}
                </span>
              </div>
              
              {/* Name */}
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                {member.name}
              </h3>
              
              {/* Title */}
              <p className="text-muted-foreground mb-4">{member.title}</p>
              
              {/* Gold separator */}
              <div className="w-12 h-0.5 bg-gold mx-auto rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}