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

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full-stack developer — precision engineering for the web.",
};

/**
 * SectionDivider
 *
 * A hairline rule with a centered label — mimics instrument cluster
 * segment separators. No component file needed; it's trivially small.
 */
function SectionDivider() {
  return (
    <div
      className="max-w-[1280px] mx-auto px-8"
      style={{ borderTop: "1px solid var(--color-border)" }}
    />
  );
}

export default async function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    jobTitle: "Software Engineer",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Your University Name", // Highly recommended for local SEO context
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
      tags: ["experience"], // Crucial for the webhook
      revalidate: 3600,
    }),
  ]);

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

      <ContactSection socialLinks={profile.socialLinks} />

      <Footer profile={profile} />
    </>
  );
}
