// sanity/queries.ts
// Single source of truth for all GROQ queries.
// Importing from here keeps page.tsx lean and makes queries independently testable.

export const profileQuery = `
  *[_type == "profile"][0]{
    firstName,
    lastName,
    nickname,
    "logoUrl":           logo.asset->url,
    aboutDescription,
    "profilePictureUrl": profilePicture.asset->url,
    "resumeUrl":         resume.asset->url,
    techStack,
    socialLinks
  }
`;

export const projectsQuery = `
  *[_type == "project"] | order(_createdAt asc) {
    _id,
    title,
    description,
    "mediaUrl":         media.asset->url,
    "mediaContentType": media.asset->mimeType,
    projectTechStack,
    linkChoice,
    url,
    "appLogoUrl":       appLogo.asset->url
  }
`;

export const experiencesQuery = `
  *[_type == "experience"] | order(startDate desc) {
    _id,
    category,
    title,
    company,
    "logoUrl": logo.asset->url,
    description,
    startDate,
    endDate
  }
`;
