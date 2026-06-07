"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Project } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/api";
import Link from "next/link";

const projects = [
  {
    title: "Strategic Expansion Project",
    description:
      "Helped a leading retail company expand into 5 new markets with a comprehensive go-to-market strategy.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Digital Transformation Initiative",
    description:
      "Led end-to-end digital transformation for a traditional manufacturing firm, increasing efficiency by 40%.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Operational Excellence Program",
    description:
      "Redesigned core operations for a logistics company, resulting in 30% cost reduction and improved delivery times.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  },
];

interface ProjectsSectionProps {
  data?: Project[] | null;
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const displayProjects = data && data.length > 0 ? data : projects as any;

  return (
    <section id="projects" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className="text-center mb-16 opacity-0"
          style={{
            animation: isVisible ? "fadeUp 0.6s ease-out forwards" : "none",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Key <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how we've helped organizations achieve remarkable results
            through strategic partnerships.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project: any, index: number) => (
            <Link href={`/projects/${project.slug || '#'}`} key={project.title}>
              <Card
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 opacity-0 cursor-pointer h-full"
                style={{
                  animation: isVisible
                    ? `fadeUp 0.6s ease-out ${0.1 + index * 0.15}s forwards`
                    : "none",
                }}
              >
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={project.coverImage ? getStrapiMedia(project.coverImage.url) : project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </AspectRatio>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3">{project.summary || project.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}