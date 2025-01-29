"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import SkillsSection from "@/components/skills";

const technologies = [
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Django",
  "Solidity",
  "Next.js",
  "PostgreSQL",
  "TailwindCSS",
];

export default function EnhancedHero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this runs only on the client side
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
      <section className="flex flex-col justify-center min-h-[80vh] relative">
        {/* Floating Tech Stack Background */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {technologies.map((tech) => (
              <motion.div
                key={tech}
                className="absolute text-sm font-mono text-sky-700"
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0,
                }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                  ],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Joseph Anyaegbunam.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 mb-6"
          >
            I build things for the web.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl"
          >
            I'm a software developer specializing in building exceptional
            digital experiences. Currently focused on full-stack development,
            data analysis, and blockchain solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 flex-wrap mb-12"
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
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <Link
              href="https://github.com/Chukwuemekamusic"
              target="_blank"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/joseph-anyaegbunam-b1a430253"
              target="_blank"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="mailto:e.anyaegbunam@outlook.com"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <Mail className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
      <SkillsSection />
    </main>
  );
}
