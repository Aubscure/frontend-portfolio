import type { ProjectData } from "@/src/types";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: ProjectData[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="work" className="py-[7rem] px-10 max-w-[1200px] mx-auto">
      <div className="flex items-baseline gap-6 mb-14">
        <span
          className="text-[0.68rem] tracking-[0.14em] uppercase pl-4 border-l-2"
          style={{
            borderColor: "var(--color-hanko)",
            color: "var(--color-muted)",
          }}
        >
          Selected Work
        </span>
        <h2
          className="text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-[1.2]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Projects
        </h2>
      </div>

      {projects.length === 0 ? (
        <p className="text-[0.88rem]" style={{ color: "var(--color-muted)" }}>
          No projects yet — check back soon.
        </p>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "1.5px", background: "var(--color-border)" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
