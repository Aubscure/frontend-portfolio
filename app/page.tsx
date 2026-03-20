import type { Metadata } from "next";
import { sanityFetch } from "@/src/sanity/client";
import { profileQuery, projectsQuery } from "@/src/sanity/queries";
import type { ProfileData, ProjectData } from "@/src/types";

import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full-stack developer and interface designer.",
};

export default async function HomePage() {
  const [profile, projects] = await Promise.all([
    sanityFetch<ProfileData>({
      query: profileQuery,
      tags: ["profile"],
      revalidate: 3600,
    }),
    sanityFetch<ProjectData[]>({
      query: projectsQuery,
      tags: ["project"],
      revalidate: 3600,
    }),
  ]);

  return (
    <>
      <HeroSection profile={profile} />

      <div
        className="max-w-[1200px] mx-auto px-10"
        style={{ borderTop: "1px solid var(--color-border)" }}
      />

      <ProjectsSection projects={projects} />

      <div
        className="max-w-[1200px] mx-auto px-10"
        style={{ borderTop: "1px solid var(--color-border)" }}
      />

      <AboutSection profile={profile} />

      <ContactSection socialLinks={profile.socialLinks} />

      <Footer profile={profile} />
    </>
  );
}
