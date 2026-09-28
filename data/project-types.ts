// Project types, safe to import from client components (no project data).
export const MAJOR_TECH = [
  "Fullstack",
  "Frontend",
  "Backend",
  "Blockchain",
  "Data Science",
  "Machine Learning",
  "AI",
  "Game dev",
] as const;

export type MajorTech = (typeof MAJOR_TECH)[number];

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  majorTech: MajorTech[]; // Broad categories
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  draft?: boolean;
}
