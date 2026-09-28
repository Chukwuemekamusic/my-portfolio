"use client";
import { motion } from "framer-motion";
import type { Project } from "@/data/project-types";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { techMap } from "@/lib/tech-map";

function TechBadge({ tech }: { tech: string }) {
  const info = techMap[tech];
  const color = info?.color ?? "#6b7280";
  const bg = info?.bg ?? "rgba(107,114,128,0.10)";
  const Icon = info?.icon;

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border font-mono"
      style={{ color, background: bg, borderColor: color + "40" }}
    >
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      {tech}
    </span>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <motion.div
        className="group relative overflow-hidden border rounded-lg bg-white/50 dark:bg-slate-800/50 hover:shadow-lg transition-shadow min-h-[280px]"
        initial="initial"
        whileHover="hover"
      >
        {/* Background image reveal */}
        {project.image && (
          <motion.div
            className="absolute inset-0 z-0 bg-white dark:bg-slate-900"
            variants={{
              initial: { clipPath: "inset(0 100% 0 0)" },
              hover: {
                clipPath: "inset(0 0% 0 0)",
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-25 dark:opacity-20"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}

        {/* Card content */}
        <div className="relative z-10 p-6 flex flex-col h-full">
          {/* Title & Links */}
          <div className="flex justify-between items-start mb-4">
            <div className="pr-2">
              {project.featured && (
                <span
                  className="inline-block mb-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full font-mono"
                  style={{
                    color: "var(--brand-accent)",
                    background: "var(--brand-accent-dim)",
                  }}
                >
                  Featured
                </span>
              )}
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {project.title}
              </h3>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <Github className="w-5 h-5" />
                </Link>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
