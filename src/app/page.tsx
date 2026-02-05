"use client";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TeamSection } from "@/components/TeamSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <VisionMissionSection />
        <ClientsSection />
        <ProjectsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
