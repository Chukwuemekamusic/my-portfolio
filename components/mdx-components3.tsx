import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

const customTheme = {
  ...nightOwl,
  'pre[class*="language-"]': {
    ...nightOwl['pre[class*="language-"]'],
    backgroundColor: "rgb(1, 22, 39)",
    margin: 0,
    padding: "1.5rem",
    borderRadius: "0.5rem",
  },
  'code[class*="language-"]': {
    ...nightOwl['code[class*="language-"]'],
    backgroundColor: "transparent",
    textShadow: "none",
  },
};

export const components = {
  pre: ({ children }: { children: React.ReactNode }) => {
    return <div className="relative my-6">{children}</div>;
  },

  code: ({ className, children }: { className?: string; children: string }) => {
    const language = className?.replace("language-", "");

    if (!className) {
      return (
        <code className="bg-slate-100 dark:bg-slate-800 rounded px-1 py-0.5 text-sm">
          {children}
        </code>
      );
    }

    return (
      <div className="relative group">
        <div className="absolute right-2 top-2 text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400">
          {language}
        </div>
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          showLineNumbers={true}
          wrapLines={true}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
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
