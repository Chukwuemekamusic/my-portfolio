// components/header.tsx
"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 flex justify-end items-center p-4 ">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <nav className="flex justify-between items-center py-4">
          {/* Left Side: Navigation Links */}
          <div className="flex gap-4 items-center">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="sm:hidden text-slate-900 dark:text-slate-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Links */}
            <div className="hidden sm:flex gap-4 items-center">
              <Link
                href="/projects"
                className="text-sm hover:underline text-slate-900 dark:text-slate-100"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-sm hover:underline text-slate-900 dark:text-slate-100"
              >
                About
              </Link>
            </div>
          </div>

          {/* Right Side: Theme Toggle */}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t z-40">
            <div className="flex flex-col gap-2 p-4">
              <Link
                href="/projects"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm hover:underline text-slate-900 dark:text-slate-100"
              >
                Projects
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm hover:underline text-slate-900 dark:text-slate-100"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
