// components/blog/CommunityCodeIllustration.tsx
"use client";
import { motion } from "framer-motion";

export function CommunityCodeIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto mb-12"
    >
      <svg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Background */}
        <rect width="800" height="400" fill="none" />

        {/* Code Section */}
        <g className="code-section">
          <rect
            x="100"
            y="100"
            width="200"
            height="20"
            rx="2"
            className="fill-slate-200 dark:fill-slate-700"
          />
          <rect
            x="120"
            y="130"
            width="160"
            height="20"
            rx="2"
            className="fill-slate-300 dark:fill-slate-600"
          />
          <rect
            x="140"
            y="160"
            width="120"
            height="20"
            rx="2"
            className="fill-slate-400 dark:fill-slate-500"
          />
          <rect
            x="120"
            y="190"
            width="160"
            height="20"
            rx="2"
            className="fill-slate-300 dark:fill-slate-600"
          />
          <rect
            x="100"
            y="220"
            width="200"
            height="20"
            rx="2"
            className="fill-slate-200 dark:fill-slate-700"
          />
        </g>

        {/* Connecting Elements */}
        <g className="connection">
          <path
            d="M 350 200 C 400 200, 400 200, 450 200"
            className="stroke-slate-400 dark:stroke-slate-500"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
        </g>

        {/* Community Section */}
        <g className="community">
          <circle
            cx="550"
            cy="160"
            r="30"
            className="fill-slate-200 dark:fill-slate-700"
          />
          <circle
            cx="600"
            cy="200"
            r="40"
            className="fill-slate-300 dark:fill-slate-600"
          />
          <circle
            cx="530"
            cy="240"
            r="35"
            className="fill-slate-400 dark:fill-slate-500"
          />

          <line
            x1="550"
            y1="160"
            x2="600"
            y2="200"
            className="stroke-slate-400 dark:stroke-slate-500"
            strokeWidth="2"
          />
          <line
            x1="600"
            y1="200"
            x2="530"
            y2="240"
            className="stroke-slate-400 dark:stroke-slate-500"
            strokeWidth="2"
          />
          <line
            x1="530"
            y1="240"
            x2="550"
            y2="160"
            className="stroke-slate-400 dark:stroke-slate-500"
            strokeWidth="2"
          />
        </g>

        {/* Decorative Elements */}
        <g className="decorative-elements">
          <circle
            cx="150"
            cy="150"
            r="3"
            className="fill-slate-400 dark:fill-slate-500"
          />
          <circle
            cx="650"
            cy="150"
            r="3"
            className="fill-slate-400 dark:fill-slate-500"
          />
          <circle
            cx="400"
            cy="250"
            r="3"
            className="fill-slate-400 dark:fill-slate-500"
          />
        </g>
      </svg>
    </motion.div>
  );
}
