import Link from "next/link";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.title} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}

            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                className="text-sm text-slate-600 dark:text-slate-400 hover:underline"
              >
                GitHub →
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
