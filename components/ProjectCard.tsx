"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import TechIcon from "@/components/icons/TechIcon";
import type { ProjectData } from "@/src/types";

interface Props {
  project: ProjectData;
  index: number;
}

const ease = [0.4, 0, 0.2, 1] as const;

function ProjectMedia({
  mediaUrl,
  mediaContentType,
  title,
}: Pick<ProjectData, "mediaUrl" | "mediaContentType" | "title">) {
  if (!mediaUrl) {
    return (
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: "16/9", background: "var(--color-peach-dim)" }}
      >
        <span
          className="select-none text-[2rem]"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-hanko)",
            opacity: 0.25,
          }}
        >
          ◻
        </span>
      </div>
    );
  }

  const isVideo = mediaContentType?.startsWith("video/");

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{ aspectRatio: "16/9" }}
    >
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={mediaUrl}
          alt={title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}

export default function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [4, -4]), {
    stiffness: 180,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-4, 4]), {
    stiffness: 180,
    damping: 28,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const href = project.url ?? "#";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="hanko-line group relative overflow-hidden cursor-pointer"
    >
      <div
        className="p-8 h-full transition-transform duration-250 group-hover:-translate-y-0.5"
        style={{ background: "var(--color-canvas)" }}
      >
        <p
          className="text-[0.68rem] mb-6"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
          }}
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(index + 1).padStart(2, "0")}
        </p>

        <ProjectMedia
          mediaUrl={project.mediaUrl}
          mediaContentType={project.mediaContentType}
          title={project.title}
        />

        <div className="flex flex-wrap gap-1.5 mt-5 mb-4">
          {project.projectTechStack.map((tag) => (
            <TechIcon key={tag} name={tag} size={12} showLabel />
          ))}
        </div>

        <h3
          className="text-[1.1rem] font-semibold leading-[1.35] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>

        <p
          className="text-[0.8rem] leading-[1.7]"
          style={{ color: "var(--color-muted)" }}
        >
          {project.description}
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.7rem] tracking-widest uppercase mt-5 no-underline transition-all duration-200 group-hover:gap-3"
          style={{ color: "var(--color-hanko)" }}
        >
          {project.linkChoice === "github" ? "View on GitHub" : "Visit Project"}{" "}
          &rarr;
        </a>
      </div>
    </motion.div>
  );
}
