"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/data/projects";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white/50 dark:bg-slate-800/50"
    >
      <div className="flex flex-col h-full">
        {/* Title & Links */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {project.title}
          </h3>
          <div className="flex gap-2">
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
        {/* {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={630}
              className="rounded-lg mb-4"
            />
          </motion.div>
        )} */}

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs font-medium text-slate-600 dark:text-slate-400 cursor-default"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
