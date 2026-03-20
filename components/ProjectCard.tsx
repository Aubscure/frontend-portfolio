"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import TechIcon from "@/components/icons/TechIcon";
import StatusLED from "@/components/ui/StatusLED";
import { EASE_MECH } from "@/lib/constants";
import type { ProjectData } from "@/src/types";

interface Props {
  project: ProjectData;
  index: number;
}

function ProjectMedia({
  mediaUrl,
  mediaContentType,
  title,
}: Pick<ProjectData, "mediaUrl" | "mediaContentType" | "title">) {
  if (!mediaUrl) {
    return (
      <div
        className="w-full flex items-center justify-center stripe-bg overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "var(--color-surface-hi)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "4rem",
            fontWeight: 900,
            color: "var(--color-red)",
            opacity: 0.1,
            letterSpacing: "-0.05em",
          }}
        >
          NULL
        </span>
      </div>
    );
  }

  const isVideo = mediaContentType?.startsWith("video/");

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        aspectRatio: "16/9",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <Image
          src={mediaUrl}
          alt={title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      )}

      {/* Scan-line overlay on image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          opacity: 0,
          transition: "opacity 0.15s",
        }}
      />
    </div>
  );
}

export default function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [3, -3]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-3, 3]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const unitId = `UNIT_${String(index + 1).padStart(3, "0")}`;
  const href = project.url ?? "#";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: EASE_MECH, delay: index * 0.07 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      className="panel group relative overflow-hidden cursor-pointer"
    >
      {/* Header bar — unit ID + status */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: "var(--color-surface-hi)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="flex items-center gap-2">
          <StatusLED variant="amber" />
          <span
            className="telem-label"
            style={{ fontSize: "0.58rem", color: "var(--color-amber)" }}
          >
            {unitId}
          </span>
        </div>
        <span
          className="telem-label"
          style={{ fontSize: "0.55rem", opacity: 0.4 }}
        >
          {project.linkChoice === "github" ? "SRC_AVAILABLE" : "LIVE_DEPLOY"}
        </span>
      </div>

      {/* Media */}
      <ProjectMedia
        mediaUrl={project.mediaUrl}
        mediaContentType={project.mediaContentType}
        title={project.title}
      />

      {/* Content */}
      <div className="p-5">
        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.projectTechStack.map((tag) => (
            <TechIcon key={tag} name={tag} size={11} showLabel />
          ))}
        </div>

        {/* Title */}
        <h3
          className="mb-2 leading-[1.2] uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.3rem",
            letterSpacing: "0.01em",
            color: "var(--color-ink)",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-[0.8rem] leading-[1.7] mb-5"
          style={{ color: "var(--color-ink-dim)" }}
        >
          {project.description}
        </p>

        {/* CTA link */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 no-underline transition-all duration-150 group-hover:gap-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-red)",
          }}
        >
          {project.linkChoice === "github" ? "VIEW_SRC" : "VISIT_UNIT"}
          <span style={{ fontSize: "0.8rem" }}>→</span>
        </a>
      </div>

      {/* Bottom accent line — grows on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "var(--color-red)",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.2s var(--ease-mech)",
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.closest(".group") as HTMLElement;
          if (!parent) return;
          parent.addEventListener("mouseenter", () => {
            el.style.transform = "scaleX(1)";
          });
          parent.addEventListener("mouseleave", () => {
            el.style.transform = "scaleX(0)";
          });
        }}
      />
    </motion.div>
  );
}
