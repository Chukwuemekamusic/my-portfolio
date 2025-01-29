"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
    skills: ["Python", "JavaScript", "Solidity", "SQL", "Java", "C"],
    color:
      "from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20",
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    skills: ["PostgreSQL", "MongoDB", "SQL", "Redis"],
    color:
      "from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20",
  },
  {
    title: "DevOps & Tools",
    icon: <GitBranch className="w-5 h-5" />,
    skills: ["Docker", "Git", "Agile/Scrum", "CI/CD", "AWS"],
    color:
      "from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20",
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
    color:
      "from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20",
  },
  {
    title: "Frameworks",
    icon: <BarChart3 className="w-5 h-5" />,
    skills: ["Django", "React", "Redux", "Node.js", "Next.js", "Express"],
    color:
      "from-pink-500/10 to-pink-600/10 dark:from-pink-500/20 dark:to-pink-600/20",
  },
  {
    title: "Blockchain",
    icon: <Blocks className="w-5 h-5" />,
    skills: ["Smart Contracts", "Web3.js", "Hardhat", "ethers.js", "The Graph"],
    color:
      "from-yellow-500/10 to-yellow-600/10 dark:from-yellow-500/20 dark:to-yellow-600/20",
  },
];

export default function SkillsSection() {
  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            A comprehensive toolkit for building modern web applications
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent
                  className={`p-6 bg-gradient-to-br ${category.color}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-slate-700 dark:text-slate-300">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1 text-sm rounded-full
                        bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
                        text-slate-700 dark:text-slate-300
                        border border-slate-200 dark:border-slate-700
                        hover:bg-white dark:hover:bg-slate-800 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
