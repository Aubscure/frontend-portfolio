import { createClient } from "next-sanity";

// We assign these to variables so we can use environment variables later for security
const projectId = "ty4j04l8"; // We will replace this shortly
const dataset = "production";
const apiVersion = "2024-01-01"; // Use today's date or the date you started the project

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if you want to ensure fresh data during development
});
