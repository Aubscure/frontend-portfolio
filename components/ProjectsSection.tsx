import type { ProjectData } from "@/src/types";
import ProjectCard from "@/components/ProjectCard";

interface Props {
  projects: ProjectData[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="work" className="py-24 px-8 max-w-[1280px] mx-auto">
      {/* Section header */}
      <div
        className="flex items-end justify-between mb-12 pb-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div>
          <p
            className="telem-label mb-2"
            style={{ color: "var(--color-red)", fontSize: "0.62rem" }}
          >
            MODULE_02 // SELECTED_WORK
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "var(--color-ink)",
            }}
          >
            Featured Units
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2 self-end mb-1">
          <span
            className="telem-label"
            style={{ fontSize: "0.6rem", color: "var(--color-ink-dim)" }}
          >
            {projects.length} UNIT{projects.length !== 1 ? "S" : ""}_INDEXED
          </span>
        </div>
      </div>

      {projects.length === 0 ? (
        <div
          className="flex items-center justify-center py-24 border stripe-bg"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p className="telem-label" style={{ color: "var(--color-ink-dim)" }}>
            NO_UNITS_FOUND — CHECK_BACK_SOON
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "1px", background: "var(--color-border)" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
