import type { Metadata } from "next";
import Script from "next/script";
import { sanityFetch } from "@/src/sanity/client";
import {
  profileQuery,
  projectsQuery,
  experiencesQuery,
} from "@/src/sanity/queries";
import type { ProfileData, ProjectData, ExperienceData } from "@/src/types";

import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";

// Note: Replaced the forbidden punctuation in the description.
export const metadata: Metadata = {
  title: "Crystal Aubrey J Amante | Backend Software Engineer",
  description: "Backend software developer: precision engineering and robust system architecture.",
};

function SectionDivider() { 
  return (
    <div
      className="max-w-[1280px] mx-auto px-8"
      style={{ borderTop: "1px solid var(--color-border)" }}
    />
  );
}

export default async function HomePage() {
  const [profile, projects, experiences] = await Promise.all([
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
    sanityFetch<ExperienceData[]>({
      query: experiencesQuery,
      tags: ["experience"], 
      revalidate: 3600,
    }),
  ]);

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "Crystal Aubrey J Amante";

  // Dynamically populate the structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: "Backend Software Developer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://crystal-aubrey-j-amante.vercel.app/",
    sameAs: profile?.socialLinks || [
      "https://github.com/Aubscure",
      "https://www.linkedin.com/in/aubrey-amante-588785257/",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "STI College of Davao", 
    },
    knowsAbout: [
      "Backend Development",
      "Laravel",
      "PHP",
      "Python",
      "System Architecture",
      "API Integration",
    ],
  };

  return (
    <>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection profile={profile} />
      <SectionDivider />
      <AboutSection profile={profile} />
      <SectionDivider />
      <ProjectsSection projects={projects} />
      <SectionDivider />
      <ExperienceSection experiences={experiences} />
      <SectionDivider />
      <ContactSection socialLinks={profile?.socialLinks} />
      <Footer profile={profile} />
    </>
  );
}