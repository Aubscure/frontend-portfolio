import { client } from "@/src/sanity/client";
import { ProjectData } from "@/src/types/project"; // Adjust path if necessary
import Image from "next/image";

const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  "mediaUrl": media.asset->url,
  projectTechStack,
  linkChoice,
  url,
  "appLogoUrl": appLogo.asset->url
}`;

export default async function ProjectsSection() {
  const projects: ProjectData[] = await client.fetch(projectsQuery);

  if (!projects || projects.length === 0) {
    return null; // Render nothing if there are no projects in the database
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-3xl font-semibold mb-8">Featured Projects</h2>

      <div className="space-y-12">
        {projects.map((project) => (
          <div
            key={project._id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            {/* Project Media */}
            <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {project.mediaUrl ? (
                // If it is an MP4, you would use a <video> tag here.
                // For simplicity with images/gifs, we use the Image component.
                <Image
                  src={project.mediaUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <span className="text-gray-400 text-sm">No media uploaded</span>
              )}
            </div>

            {/* Project Details */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.projectTechStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-xs font-mono rounded border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Conditional Link Logic */}
              <div className="mt-auto">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {project.linkChoice === "domain" && project.appLogoUrl ? (
                    <>
                      <Image
                        src={project.appLogoUrl}
                        alt="App Logo"
                        width={24}
                        height={24}
                        className="rounded-sm"
                      />
                      Visit Live Domain
                    </>
                  ) : (
                    "View GitHub Repository"
                  )}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
