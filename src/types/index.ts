// types/index.ts — Single source of truth for all CMS-derived types.
// No `any` types. All nullable fields are explicitly typed.

// ─── Profile ──────────────────────────────────────────────────────────────────
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
  aboutDescription: string;
  profilePictureUrl: string | null;
  resumeUrl: string | null;
  techStack: string[];
  socialLinks: SocialLinks;
}

// ─── Project ─────────────────────────────────────────────────────────────────
export interface ProjectData {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string | null;
  mediaContentType: string | null; // e.g. 'video/mp4', 'image/gif', 'image/png'
  projectTechStack: string[];
  linkChoice: "github" | "domain";
  url: string;
  appLogoUrl: string | null;
}
