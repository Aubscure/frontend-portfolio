import { createClient, type QueryParams } from "next-sanity";

// ─── Environment Validation ───────────────────────────────────────────────────
// Fail fast at build time if critical env vars are missing.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) throw new Error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing env: NEXT_PUBLIC_SANITY_DATASET");

// ─── Client ──────────────────────────────────────────────────────────────────
export const client = createClient({
  projectId,
  dataset,
  // Hardcoded API version prevents silent breakage when Sanity releases new APIs.
  apiVersion: "2024-03-20",
  // Use Sanity's global CDN in production for edge-cached reads.
  // Set to false in dev to always get the latest unpublished content.
  useCdn: process.env.NODE_ENV === "production",
});

// ─── Typed Fetch Wrapper ──────────────────────────────────────────────────────
// Wraps client.fetch with strict generics and enforces environment-aware caching.
interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  /** Cache tags for on-demand revalidation via webhook. */
  tags?: string[];
  /** Seconds until revalidation. Defaults to 1 hour. Pass `false` to opt out. */
  revalidate?: number | false;
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 3600,
}: SanityFetchOptions): Promise<T> {
  // Determine if we are running the local development server
  const isDevelopment = process.env.NODE_ENV === "development";

  return client.fetch<T>(query, params, {
    // In local development, bypass the cache entirely for instant feedback.
    cache: isDevelopment ? "no-store" : "force-cache",
    next: {
      // Apply Next.js revalidation rules ONLY in production
      ...(isDevelopment ? {} : { revalidate, ...(tags ? { tags } : {}) }),
    },
  });
}
