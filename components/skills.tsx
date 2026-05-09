"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  GitBranch,
  Brain,
  BarChart3,
  Blocks,
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="w-5 h-5" />,
    skills: ["Python", "JavaScript", "TypeScript", "Solidity", "SQL", "Java", "C"],
    labelColor: "#3b82f6",
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    skills: ["PostgreSQL", "MongoDB", "SQL", "Redis", "MinIO"],
    labelColor: "#22c55e",
  },
  {
    title: "DevOps & Tools",
    icon: <GitBranch className="w-5 h-5" />,
    skills: ["Docker", "Git", "Agile/Scrum", "CI/CD", "AWS", "GitHub Actions"],
    labelColor: "#f97316",
  },
  {
    title: "Data & ML",
    icon: <Brain className="w-5 h-5" />,
    skills: [
      "pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "TensorFlow",
    ],
    labelColor: "#a855f7",
  },
  {
    title: "Frameworks",
    icon: <BarChart3 className="w-5 h-5" />,
    skills: ["Django", "React", "Redux", "Node.js", "Next.js", "Express", "FastAPI"],
    labelColor: "#ec4899",
  },
  {
    title: "Blockchain",
    icon: <Blocks className="w-5 h-5" />,
    skills: [
      "Smart Contracts",
      "Web3.js",
      "Hardhat",
      "Foundry",
      "ethers.js",
      "The Graph",
      "Chainlink",
      "OpenZeppelin",
    ],
    labelColor: "#eab308",
  },
];

export default function SkillsSection() {
  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            A comprehensive toolkit for building modern web applications
          </motion.p>
        </div>

        <div className="space-y-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="flex items-center gap-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              <div
                className="flex-shrink-0 flex items-center gap-2 w-40"
                style={{ color: category.labelColor }}
              >
                {category.icon}
                <span className="text-sm font-medium hidden sm:inline">
                  {category.title}
                </span>
              </div>

              <div
                className="flex-1 overflow-hidden marquee-container"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                }}
              >
                <div
                  className="marquee-track flex gap-3"
                  style={{
                    width: "max-content",
                    animation: `${
                      index % 2 === 0 ? "scroll-left" : "scroll-right"
                    } 25s linear infinite`,
                  }}
                >
                  {[...category.skills, ...category.skills].map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 text-sm rounded-full whitespace-nowrap
                        bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
                        text-slate-700 dark:text-slate-300
                        border border-slate-200 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
