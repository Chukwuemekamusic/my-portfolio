"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Code,
  Users,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { myConfig } from "@/lib/my-config";
import SkillsSection from "@/components/skills";

const technologies = [
  { name: "Python", initialX: 10, initialY: 20 },
  { name: "JavaScript", initialX: 30, initialY: 70 },
  { name: "React", initialX: 80, initialY: 40 },
  { name: "Node.js", initialX: 60, initialY: 10 },
  { name: "Django", initialX: 20, initialY: 50 },
  { name: "Solidity", initialX: 70, initialY: 80 },
  { name: "Next.js", initialX: 40, initialY: 30 },
  { name: "PostgreSQL", initialX: 90, initialY: 60 },
  { name: "TailwindCSS", initialX: 50, initialY: 90 },
  { name: "Gen AI", initialX: 15, initialY: 85 },
  { name: "Langchain", initialX: 85, initialY: 15 },
  { name: "Java", initialX: 45, initialY: 65 },
  { name: "Web3", initialX: 25, initialY: 90 },
];

const floatingAnimation = {
  animate: {
    y: ["0%", "10%", "0%"],
    x: ["0%", "5%", "0%"],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror" as const,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center min-h-[60vh]">
        {/* Floating Tech Stack Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              className="absolute text-sm font-mono text-slate-400 dark:text-slate-400 opacity-40"
              initial={{
                x: `${tech.initialX}%`,
                y: `${tech.initialY}%`,
              }}
              variants={floatingAnimation}
              animate="animate"
              custom={Math.random()}
              style={{
                left: `${tech.initialX}%`,
                top: `${tech.initialY}%`,
              }}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
        >
          Joseph Anyaegbunam
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl"
        >
          Software developer and data analyst based in Aberdeen, building
          scalable web applications and blockchain solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 flex-wrap"
        >
          <Button
            asChild
            className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
          >
            <Link href="/projects" className="gap-2">
              View Projects
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <a
              href={myConfig.cvUrl}
              download="Joseph E Anyaegbunam CV.pdf"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </Button>
        </motion.div>
      </section>

      {/* About Cards */}
      <section className="my-12 md:my-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div
              className="p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 
              hover:shadow-lg transition-all duration-300 cursor-default
              group-hover:border-slate-400 dark:group-hover:border-slate-600"
            >
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-semibold">Education</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                MSc IT (Distinction) @ Robert Gordon University
                <br />
                BSc Electrical Engineering
              </p>
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div
              className="p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 
              hover:shadow-lg transition-all duration-300 cursor-default
              group-hover:border-slate-400 dark:group-hover:border-slate-600"
            >
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-semibold">Expertise</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Full-Stack Development, Data Analysis, Blockchain, AI/ML
              </p>
            </div>
          </motion.div>

          {/* Community Card */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <div
              className="p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 
              hover:shadow-lg transition-all duration-300 cursor-default
              group-hover:border-slate-400 dark:group-hover:border-slate-600"
            >
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-semibold">Community</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Youth Mentor @ Livingstone Initiative
                <br />
                Choir Director & Keyboardist
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
