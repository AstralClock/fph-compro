import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";
import { ClientsSection } from "@/components/ClientsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TeamSection } from "@/components/TeamSection";
import { ContactSection } from "@/components/ContactSection";
import { getHomepageData, getTestimonialsData, getProjects, getTeamMembersData } from "@/lib/api";

const Index = async () => {
  const { data: homepageData } = await getHomepageData();
  const { data: testimonialsData } = await getTestimonialsData();
  const { data: projectsData } = await getProjects();
  const { data: teamMembersData } = await getTeamMembersData();

  return (
    <main>
      <HeroSection data={homepageData?.hero} />
      <StatsSection data={homepageData?.stats} />
      <AboutSection data={homepageData?.about} />
      <VisionMissionSection data={homepageData?.visionMission} />
      <ClientsSection 
        title={homepageData?.clientsTitle} 
        description={homepageData?.clientsDescription} 
        data={homepageData?.trustedClients} 
      />
      <TestimonialsSection data={testimonialsData} />
      <ProjectsSection data={projectsData} />
      <TeamSection 
        title={homepageData?.teamTitle}
        description={homepageData?.teamDescription}
        data={teamMembersData}
      />
      <ContactSection />
    </main>
  );
};

export default Index;
