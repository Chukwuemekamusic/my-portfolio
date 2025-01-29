"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { useState } from "react";

export default function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string>("all");

  const filteredProjects = projects.filter(
    (project) => selectedTech === "all" || project.tech.includes(selectedTech)
  );
  const uniqueTechs = [...new Set(projects.flatMap((project) => project.tech))];

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-12">
      <select
        onChange={(e) => setSelectedTech(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="all">All</option>
        {uniqueTechs.map((tech, index) => (
          <option key={index} value={tech}>
            {tech}
          </option>
        ))}
        {/* Add more options */}
      </select>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex justify-center"
        >
          <Button asChild variant="outline">
            <Link href="/" className="gap-2">
              ← Back to Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
