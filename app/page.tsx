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
} from "lucide-react";
import { myConfig } from "@/lib/my-config";
import { techSkills } from "@/data/skills";
import { SplitText } from "@/components/split-text";
import { MagneticButton } from "@/components/magnetic-button";
import { useEffect, useState } from "react";

const roles = [
  "Backend Engineer",
  "Full-Stack Developer",
  "Blockchain Engineer",
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
          <div className="h-10 overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-flex flex-col gap-1 items-start"
              >
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                  {roles[roleIndex]}
                </p>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
                  className="block h-px w-full origin-left"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl"
          >
            Backend and full-stack engineer with a track record in production
            APIs, data pipelines, and smart contract systems.
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

        {/* Scroll indicator — mouse icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <svg
            width="22"
            height="36"
            viewBox="0 0 22 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "var(--brand-accent)", opacity: 0.55 }}
          >
            <rect x="1" y="1" width="20" height="34" rx="10" stroke="currentColor" strokeWidth="1.5" />
            <motion.rect
              x={9.5}
              y={8}
              width={3}
              height={6}
              rx={1.5}
              fill="currentColor"
              animate={{ y: [8, 16, 8], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </section>

      {/* About Cards */}
      <section className="my-12 md:my-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Education */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              whileHover={{
                borderColor: "var(--brand-accent)",
                boxShadow: "0 4px 20px var(--brand-accent-dim)",
              }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 cursor-default h-full"
              style={{ borderColor: "var(--brand-accent-border)" }}
            >
              <span className="absolute -bottom-1 right-3 text-8xl font-display font-black leading-none select-none pointer-events-none opacity-[0.04] dark:opacity-[0.06]">
                01
              </span>
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 opacity-40"
                style={{ backgroundColor: "var(--brand-accent)" }}
              />
              <div className="flex items-center gap-2.5 mb-4 pl-3">
                <div
                  className="p-1.5 rounded-md"
                  style={{ backgroundColor: "var(--brand-accent-dim)" }}
                >
                  <GraduationCap
                    className="w-4 h-4"
                    style={{ color: "var(--brand-accent)" }}
                  />
                </div>
                <h3 className="font-mono font-semibold text-xs uppercase tracking-widest">
                  Education
                </h3>
              </div>
              <div className="pl-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  MSc IT (Distinction) @ Robert Gordon
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  BSc Electrical Engineering @ Igbinedion
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Expertise */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{
                borderColor: "var(--brand-accent)",
                boxShadow: "0 4px 20px var(--brand-accent-dim)",
              }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 cursor-default h-full"
              style={{ borderColor: "var(--brand-accent-border)" }}
            >
              <span className="absolute -bottom-1 right-3 text-8xl font-display font-black leading-none select-none pointer-events-none opacity-[0.04] dark:opacity-[0.06]">
                02
              </span>
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 opacity-40"
                style={{ backgroundColor: "var(--brand-accent)" }}
              />
              <div className="flex items-center gap-2.5 mb-3 pl-3">
                <div
                  className="p-1.5 rounded-md"
                  style={{ backgroundColor: "var(--brand-accent-dim)" }}
                >
                  <Code
                    className="w-4 h-4"
                    style={{ color: "var(--brand-accent)" }}
                  />
                </div>
                <h3 className="font-mono font-semibold text-xs uppercase tracking-widest">
                  Expertise
                </h3>
              </div>
              <div className="pl-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Full-Stack · Data Analysis · Blockchain · AI/ML
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {techSkills.map((tech) => (
                    <div
                      key={tech.name}
                      title={tech.name}
                      className="p-1.5 rounded-md transition-colors duration-150 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    >
                      {tech.icon}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              whileHover={{
                borderColor: "var(--brand-accent)",
                boxShadow: "0 4px 20px var(--brand-accent-dim)",
              }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden p-6 border rounded-lg bg-white/50 dark:bg-slate-800/50 cursor-default h-full"
              style={{ borderColor: "var(--brand-accent-border)" }}
            >
              <span className="absolute -bottom-1 right-3 text-8xl font-display font-black leading-none select-none pointer-events-none opacity-[0.04] dark:opacity-[0.06]">
                03
              </span>
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 opacity-40"
                style={{ backgroundColor: "var(--brand-accent)" }}
              />
              <div className="flex items-center gap-2.5 mb-4 pl-3">
                <div
                  className="p-1.5 rounded-md"
                  style={{ backgroundColor: "var(--brand-accent-dim)" }}
                >
                  <Users
                    className="w-4 h-4"
                    style={{ color: "var(--brand-accent)" }}
                  />
                </div>
                <h3 className="font-mono font-semibold text-xs uppercase tracking-widest">
                  Community
                </h3>
              </div>
              <div className="pl-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Youth Mentor @ Livingstone Initiative
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Choir Director | Producer | Recording Artist
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
