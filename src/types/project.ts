// app/types/project.ts

export interface ProjectData {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string;
  projectTechStack: string[];
  linkChoice: "github" | "domain";
  url: string;
  appLogoUrl: string | null;
}
