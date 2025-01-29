"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
            className="w-full p-2 border rounded mb-4 pr-10"
          />

          {input && (
            <button
              onClick={() => {
                setInput("");
                setSuggestions([]);
              }}
              className="absolute right-2 top-2 p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-slate-800 shadow-md rounded border mt-1 absolute w-full z-10"
              >
                {suggestions.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => {
                      setInput(tech);
                      setSuggestions([]);
                    }}
                    className={`p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer ${
                      index === selectedIndex
                        ? "bg-gray-100 dark:bg-slate-700"
                        : ""
                    }`}
                  >
                    {tech}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center col-span-2 text-slate-600 dark:text-slate-400"
            >
              No projects found. Try another search term!
            </motion.div>
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
