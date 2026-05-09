// components/header.tsx
"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Grid, Menu, X, Home, Book, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Grid },
  { href: "/blog", label: "Blog", icon: Book },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 flex justify-end items-center p-4"
      style={{
        background: "hsl(var(--background) / 0.75)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid var(--brand-accent-border)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <nav className="flex justify-between items-center py-4">
          {/* Left: logo mark + status dot */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span
              className="font-mono font-bold text-sm tracking-tight select-none"
              style={{ color: "var(--brand-accent)" }}
            >
              JA
            </span>
          </div>

          {/* Center: desktop nav */}
          <div className="hidden sm:flex gap-1 items-center">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <div key={href} className="relative">
                {pathname === href && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--brand-accent-dim)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Link
                  href={href}
                  className="relative z-10 flex items-center gap-2 text-sm px-3 py-2 rounded-lg text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile toggle button (visible on mobile) */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="sm:hidden text-slate-900 dark:text-slate-100"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Right: theme toggle (desktop only) */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden absolute top-full left-0 w-full border-b shadow-sm z-50"
              style={{
                background: "hsl(var(--background) / 0.95)",
                backdropFilter: "blur(20px)",
                borderColor: "var(--brand-accent-border)",
              }}
            >
              <div className="flex flex-col gap-2 p-4 space-y-1">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 transition-colors text-slate-900 dark:text-slate-100 ${
                      pathname === href
                        ? "bg-[var(--brand-accent-dim)]"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
                <div
                  className="mt-1 pt-2"
                  style={{ borderTop: "1px solid var(--brand-accent-border)" }}
                >
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-2 text-sm rounded-lg px-3 py-2 w-full transition-colors text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
