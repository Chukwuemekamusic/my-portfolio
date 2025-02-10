"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
        Blog
      </h1>
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="group border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white/50 dark:bg-slate-800/50"
        >
          <Link href={`/blog/${post.slug}`} className="">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {post.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {post.date}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {post.description}
            </p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
