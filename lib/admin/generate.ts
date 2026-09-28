import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod/v4";
import { MAJOR_TECH, type Project } from "@/data/projects";
import { knownTechNames } from "@/lib/tech-map";
import type { RepoContext } from "./repo-context";

const DraftSchema = z.object({
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  majorTech: z.array(z.enum(MAJOR_TECH)),
});

export type ProjectDraft = z.infer<typeof DraftSchema>;

function buildSystemPrompt(examples: Project[]): string {
  const exampleText = examples
    .filter((p) => !p.draft)
    .slice(0, 4)
    .map(
      (p) =>
        `Title: ${p.title}\nDescription: ${p.description}\nTech: ${p.tech.join(", ")}\nCategories: ${p.majorTech.join(", ")}`
    )
    .join("\n\n");

  return `You write project entries for a software engineer's portfolio site. The reader is a technical hiring manager skimming a grid of project cards.

Given a GitHub repository's metadata, README and dependency manifests, produce:
- title: the project name, optionally followed by " — " and a short descriptor of what it is (e.g. "ReportFlow — ETL Data Processing & Reporting Pipeline"). Use the project's own name, not the repo slug, when the README gives one.
- description: one dense paragraph of 2-4 sentences (roughly 50-90 words). Lead with what the system does, then the most notable engineering decisions: architecture, reliability or security measures, performance work, testing, deployment. Only state what the repository evidences; never invent metrics, users or outcomes. No marketing adjectives, no first person, no emoji.
- tech: 4-9 technologies actually used, most important first. When a technology appears in the canonical list below, use that exact spelling. Leave out trivial libraries (linters, formatters, type packages).
- majorTech: 1-3 broad categories from the allowed set that best describe the project.

Canonical tech names: ${knownTechNames.join(", ")}

Existing entries, for tone, length and density:

${exampleText}`;
}

export async function generateProjectDraft(
  context: RepoContext,
  opts: { demoUrl?: string; notes?: string; examples: Project[] }
): Promise<ProjectDraft> {
  const userContent = [
    `<repository>\n${context.text}\n</repository>`,
    opts.demoUrl ? `Live demo: ${opts.demoUrl}` : null,
    opts.notes ? `<author_notes>\n${opts.notes}\n</author_notes>\nThe author's notes are first-hand context about the project; weigh them alongside the repository.` : null,
    "Write the portfolio entry for this repository.",
  ]
    .filter(Boolean)
    .join("\n\n");

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY isn't configured, so AI drafts are unavailable.");
  }
  const client = new Anthropic();
  const response = await client.beta.messages
    .parse({
      model: "claude-opus-5",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: buildSystemPrompt(opts.examples),
      messages: [{ role: "user", content: userContent }],
      output_config: { format: betaZodOutputFormat(DraftSchema) },
    })
    .catch((err: unknown) => {
      if (err instanceof Anthropic.AuthenticationError) {
        throw new Error("ANTHROPIC_API_KEY was rejected. Check the key in your environment variables.");
      }
      if (err instanceof Anthropic.RateLimitError) {
        throw new Error("Claude API rate limit hit. Wait a moment and try again.");
      }
      throw err;
    });

  if (response.stop_reason === "refusal") {
    throw new Error("Claude declined to generate a description for this repository.");
  }
  if (response.stop_reason === "max_tokens" || !response.parsed_output) {
    throw new Error("Claude's response was incomplete. Try again.");
  }
  return response.parsed_output;
}
