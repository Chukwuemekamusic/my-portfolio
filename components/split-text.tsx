"use client";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface SplitTextProps {
  text: string;
  className?: string;
}

export function SplitText({ text, className }: SplitTextProps) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
