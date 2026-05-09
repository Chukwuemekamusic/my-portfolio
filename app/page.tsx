"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Code,
  Users,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
} from "lucide-react";
import { myConfig } from "@/lib/my-config";
import { techSkills } from "@/data/skills";
import { SplitText } from "@/components/split-text";
import { MagneticButton } from "@/components/magnetic-button";
import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Developer",
  "Blockchain Engineer",
  "Smart Contract Auditor",
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-start pt-16 sm:justify-center sm:pt-0 min-h-[70vh] sm:min-h-[90vh]">
        {/* Radial glow */}
        <div
          className="absolute left-0 top-0 sm:top-1/4 w-full sm:w-[600px] h-[300px] sm:h-[400px] pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse, var(--brand-accent-glow) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10">
          <h1
            className="font-display font-black leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
          >
            <SplitText text="Joseph" className="block" />
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--brand-accent), #a78bfa)",
              }}
            >
              <SplitText text="Anyaegbunam" />
            </span>
          </h1>

          {/* Role rotator */}
          <div className="h-9 overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-xl text-slate-600 dark:text-slate-400"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl"
          >
            Software developer specializing in blockchain solutions, smart
            contracts, and full-stack web development. Based in Aberdeen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 flex-wrap items-center"
          >
            <MagneticButton>
              <Button
                asChild
                className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
              >
                <Link href="/projects" className="gap-2">
                  View Projects
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </MagneticButton>

            <Button
              variant="outline"
              className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <a
                href={myConfig.cvUrl}
                download="Joseph E Anyaegbunam CV.pdf"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 mt-6"
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Cards */}
      <section className="my-12 md:my-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 hover:shadow-lg transition-all duration-300 cursor-default group-hover:border-slate-400 dark:group-hover:border-slate-600">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-semibold">Education</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                MSc IT (Distinction) @ Robert Gordon
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                BSc Electrical Engineering @ Igbinedion
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="px-6 py-5 border rounded-lg bg-white/50 dark:bg-slate-800/50 hover:shadow-lg transition-all duration-300 cursor-default group-hover:border-slate-400 dark:group-hover:border-slate-600">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-semibold">Expertise</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Full-Stack Development, Data Analysis, Blockchain, AI/ML
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 pt-1">
                {techSkills.map((tech) => (
                  <div
                    key={tech.name}
                    className="hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    {tech.icon}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group"
          >
            <div className="p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 hover:shadow-lg transition-all duration-300 cursor-default group-hover:border-slate-400 dark:group-hover:border-slate-600">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-semibold">Community</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Youth Mentor @ Livingstone Initiative
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Choir Director | Producer | Recording Artist
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
