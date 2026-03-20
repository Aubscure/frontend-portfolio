// app/api/revalidate/route.ts
// On-demand ISR endpoint.
// Configure a Sanity webhook to POST to /api/revalidate?secret=YOUR_SECRET
// when any document is published. This gives instant cache busting in addition
// to the hourly time-based revalidate on page.tsx.

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  // 1. Validate secret token
  const secret = req.nextUrl.searchParams.get("secret");

  if (!REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set." },
      { status: 500 },
    );
  }

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Invalid revalidation secret." },
      { status: 401 },
    );
  }

  // 2. Parse the Sanity webhook body to determine which tags to bust
  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    // Body may be empty for a test ping — revalidate all
  }

  // 3. Revalidate only the affected cache tag (or both for safety)
  const docType = body._type;
  if (docType === "profile") {
    revalidateTag("profile", "max");
  } else if (docType === "project") {
    revalidateTag("project", "max");
  } else {
    // Unknown type or no body — bust everything
    revalidateTag("profile", "max");
    revalidateTag("project", "max");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
