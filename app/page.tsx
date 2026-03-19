import { client } from "@/src/sanity/client";
import { ProfileData } from "@/src/types/profile";
import Image from "next/image";

// 1. The GROQ Query
// We fetch the first document of type "profile" and expand the asset URLs
const profileQuery = `*[_type == "profile"][0]{
  firstName,
  lastName,
  nickname,
  "logoUrl": logo.asset->url,
  aboutDescription,
  "profilePictureUrl": profilePicture.asset->url,
  "resumeUrl": resume.asset->url,
  techStack,
  socialLinks
}`;

// 2. The Server Component
// Notice the 'async' keyword. This runs securely on the server.
export default async function Home() {
  // Fetch the data and enforce our TypeScript interface
  const profile: ProfileData = await client.fetch(profileQuery);

  // Fallback UI if the CMS is empty to prevent application crashes
  if (!profile) {
    return (
      <div className="p-8 text-center text-red-500">
        Please publish your profile in the CMS first.
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans text-gray-800">
      {/* Header Section */}
      <header className="flex justify-between items-center py-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          {profile.logoUrl && (
            <Image
              src={profile.logoUrl}
              alt="Logo"
              width={50}
              height={50}
              className="rounded-md"
            />
          )}
          <h1 className="text-2xl font-bold tracking-tight">
            {profile.firstName} {profile.lastName}{" "}
            <span className="text-gray-400 font-normal">
              ({profile.nickname})
            </span>
          </h1>
        </div>
      </header>

      {/* About Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-semibold">About Me</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            {profile.aboutDescription}
          </p>

          <div className="pt-4">
            <h3 className="text-xl font-medium mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {profile.techStack?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-sm font-mono rounded-md border border-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="md:col-span-1">
          {profile.profilePictureUrl && (
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
              <Image
                src={profile.profilePictureUrl}
                alt={`${profile.firstName}'s Profile Picture`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
