import React from "react";

export const components = {
  pre: ({ children }: { children: React.ReactNode }) => {
    return <pre className="relative">{children}</pre>;
  },

  code: ({
    className,
    children,
  }: {
    className?: string;
    children: string | string[];
  }) => {
    const language = className?.replace("language-", "");

    if (!className) {
      return (
        <code className="bg-slate-100 dark:bg-slate-800 rounded px-1 py-0.5">
          {children}
        </code>
      );
    }

    return (
      <div className="relative my-4">
        <div className="absolute right-2 top-2 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
          {language}
        </div>
        <code
          className={`block overflow-x-auto p-4 bg-slate-800 text-slate-50 rounded-lg ${className}`}
        >
          {children}
        </code>
      </div>
    );
  },
};
