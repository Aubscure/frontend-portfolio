// app/types/profile.ts

export interface ProfileData {
  firstName: string;
  lastName: string;
  nickname: string;
  logoUrl: string;
  philosophy: string;
  aboutDescription: string;
  profilePictureUrl: string;
  resumeUrl: string;
  techStack: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    instagram: string;
  };
}
