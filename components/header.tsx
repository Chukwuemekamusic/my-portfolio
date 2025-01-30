// components/header.tsx
"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Grid, Menu, X, Home, Book } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex justify-end items-center p-4  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 ">
        <nav className="flex justify-between items-center py-4">
          {/* Left Side: Navigation Links */}
          <div className="flex gap-4 items-center">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="sm:hidden text-slate-900 dark:text-slate-100"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Desktop Links */}
            <div className="hidden sm:flex gap-6 items-center">
              <Link
                href="/"
                className={`flex items-center gap-2 text-sm text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group ${
                  pathname === "/"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="relative">
                  Home
                  <span className="absolute left-0 bottom-0 h-px w-0 bg-slate-900 dark:bg-slate-100 transition-all group-hover:w-full" />
                </span>
              </Link>
              <Link
                href="/projects"
                className={`flex items-center gap-2 text-sm text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group ${
                  pathname === "/projects"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="relative">
                  Projects
                  <span className="absolute left-0 bottom-0 h-px w-0 bg-slate-900 dark:bg-slate-100 transition-all group-hover:w-full" />
                </span>
              </Link>
              <Link
                href="/blog"
                className={`flex items-center gap-2 text-sm text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group ${
                  pathname === "/blog"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Book className="w-4 h-4" />
                <span className="relative">
                  Blog
                  <span className="absolute left-0 bottom-0 h-px w-0 bg-slate-900 dark:bg-slate-100 transition-all group-hover:w-full" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side: Theme Toggle */}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b shadow-sm z-50"
            >
              <div className="flex flex-col gap-2 p-4 space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center text-sm hover:underline text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group ${
                    pathname === "/"
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center text-sm hover:underline text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group ${
                    pathname === "/projects"
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Grid className="w-4 h-4 mr-2" />
                  <span className="relative">
                    Projects
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-slate-900 dark:bg-slate-100 transition-all group-hover:w-full" />
                  </span>
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center text-sm hover:underline text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group ${
                    pathname === "/blog"
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Book className="w-4 h-4 mr-2" />
                  Blog
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
