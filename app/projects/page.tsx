"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const allTechs = [
    ...new Set(projects.flatMap((p) => [...p.tech, ...p.majorTech])),
  ];

  useEffect(() => {
    const trimmedInput = input.trim().toLowerCase();
    setFilteredProjects(
      projects.filter(
        (project) =>
          project.tech.some((tech) =>
            tech.toLowerCase().includes(trimmedInput)
          ) ||
          project.majorTech.some((major) =>
            major.toLowerCase().includes(trimmedInput)
          )
      )
    );
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim().length > 0) {
      setSuggestions(
        allTechs.filter((tech) =>
          tech.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex > -1) {
          setInput(suggestions[selectedIndex]);
          setSuggestions([]);
          setSelectedIndex(-1);
        }
        break;
      case "Escape":
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          Projects
        </h1>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Filter by technology..."
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded mb-4"
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="bg-white shadow-md rounded border mt-1 absolute w-full">
              {suggestions.map((tech, index) => (
                <div
                  key={tech}
                  onClick={() => {
                    setInput(tech);
                    setSuggestions([]);
                  }}
                  className={`p-2 hover:bg-gray-100 cursor-pointer ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                >
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))
          ) : (
            <p className="text-center col-span-2">No projects found.</p>
          )}
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
