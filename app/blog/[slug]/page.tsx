//app/blog/[slug]
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx-components2";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const mdPath = path.join(process.cwd(), "posts", `${slug}.md`);
  const mdxPath = path.join(process.cwd(), "posts", `${slug}.mdx`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <article className="min-h-screen bg-white dark:bg-slate-900">
      <Link href={"/blog"} className="max-w-3xl mx-auto  flex items-center">
        <ArrowLeft className="w-5 h-5 mr-2" />
      </Link>

      {/* Reading container with optimal width */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            {data.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <time className="text-sm">
              {new Date(data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {data.readingTime && (
              <>
                <span>•</span>
                <span className="text-sm">{data.readingTime} min read</span>
              </>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-slate dark:prose-invert 
          max-w-none
          prose-headings:font-semibold
          prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-base prose-p:leading-7
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-a:no-underline hover:prose-a:underline
          prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-white
          prose-ul:my-6 prose-li:my-2
          prose-blockquote:border-l-4 prose-blockquote:border-slate-300
          dark:prose-blockquote:border-slate-700 prose-blockquote:pl-4
          prose-blockquote:italic prose-blockquote:text-slate-600
          dark:prose-blockquote:text-slate-400
          prose-img:rounded-lg prose-img:shadow-md"
        >
          <MDXRemote source={content} components={components} />
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-12 flex justify-center py-5"
        >
          <Link href="/blog" className="gap-2 hover:scale-x-105">
            ← Back to Blog Page
          </Link>
        </Button>
      </div>
    </article>
  );
}
