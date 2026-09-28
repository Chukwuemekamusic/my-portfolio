import { ProjectsBrowser } from "@/components/projects-browser";
import { projects } from "@/data/projects";

// Server component so only published projects reach the client bundle.
export default function ProjectsPage() {
  return <ProjectsBrowser projects={projects} />;
}
