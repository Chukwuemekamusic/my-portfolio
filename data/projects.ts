// data/projects.ts
// Project content lives in projects.json so the admin section can rewrite it
// (via a GitHub commit in production, or on disk in local dev). Array order
// in the JSON is the display order.
import projectsData from "./projects.json";
import type { Project } from "./project-types";

export { MAJOR_TECH } from "./project-types";
export type { MajorTech, Project } from "./project-types";

/** Every project, drafts included, in saved order. */
export const allProjects = projectsData as Project[];

/** Published projects for the public site. Featured projects are pinned first. */
export const projects: Project[] = [
  ...allProjects.filter((p) => !p.draft && p.featured),
  ...allProjects.filter((p) => !p.draft && !p.featured),
];

export const featuredProjects = projects.filter((p) => p.featured);
