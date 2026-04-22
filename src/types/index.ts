// types/index.ts

export interface SocialLinks {
  github: string | null;
  linkedin: string | null;
  email: string | null;
  instagram: string | null;
  twitter?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  dribbble?: string | null;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  nickname: string;
  logoUrl: string | null;
  philosophy: string | null;
  aboutDescription: string;
  profilePictureUrl: string | null;
  resumeUrl: string | null;
  techStack: string[];
  socialLinks: SocialLinks;
}

// Define the shape of the Sanity array object
export interface GithubLink {
  _key: string; 
  label: string;
  url: string;
}

export interface ProjectData {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string | null;
  mediaContentType: string | null;
  projectTechStack: string[];
  githubLinks: GithubLink[] | null;
  liveUrl: string | null;
  appLogoUrl: string | null;
}

export interface ExperienceData {
  _id: string;
  category: string;
  title: string;
  company: string | null;
  logoUrl: string | null;
  description: string;
  startDate: string | null;
  endDate: string | null;
}