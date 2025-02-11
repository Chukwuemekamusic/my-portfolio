import React from "react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import { CommunityCodeIllustration } from "./blog/CommunityCodeIllustration";

// Custom link component that handles both internal and external links
const CustomLink = ({
  href = "",
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return <Link href={href}>{children}</Link>;
  }

  if (isAnchorLink) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export const components = {
  // Add the CommunityCodeIllustration component
  CommunityCodeIllustration: CommunityCodeIllustration,

  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mt-12 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-6 list-disc list-inside space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-6 list-decimal list-inside space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 my-6 italic text-slate-600 dark:text-slate-400">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }: { src: string; alt?: string }) => (
    <Image
      src={src}
      alt={alt || ""}
      width={800}
      height={450}
      className="rounded-lg shadow-md my-6"
      layout="responsive"
    />
  ),
  a: CustomLink,
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="relative my-6 overflow-hidden rounded-lg">{children}</pre>
  ),
  code: ({ className, children }: { className?: string; children: string }) => {
    const language = className?.replace("language-", "");

    if (!className) {
      return (
        <code className="relative rounded bg-slate-100 dark:bg-slate-800 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900 dark:text-slate-400">
          {children}
        </code>
      );
    }

    return (
      <div className="relative group">
        <div className="absolute right-2 top-2 z-10 text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400">
          {language}
        </div>
        <SyntaxHighlighter
          language={language}
          style={nightOwl}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            lineHeight: 1.7,
          }}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            textAlign: "right",
            userSelect: "none",
            opacity: 0.5,
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
  },
};
