# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack at localhost:3000
npm run build    # Production build (also runs type-check and lint)
npm run lint     # ESLint via next lint
npm run start    # Serve the production build
```

There is no test framework installed. `npm run build` is the primary correctness check — it runs TypeScript and lint.

## Architecture

**Next.js 15 App Router** — all routes live under `app/`. No Pages Router. The `app/dashboard/` route exists but is excluded from the portfolio redesign scope.

### Data Layer

Content is defined in three places:

- `data/projects.json` — the project list (array order = display order). Edited by the `/admin` section, so keep it plain JSON; don't move content back into TS.
- `data/projects.ts` — loads the JSON; exports `allProjects` (drafts included), `projects` (published, featured pinned first) and `featuredProjects`. Server-only in practice: client components import types from `data/project-types.ts` so drafts never reach the browser bundle. `image` is optional; cards with no `image` skip the hover-reveal feature.
- `data/skills.tsx` — `techSkills` array of `{ name, icon }` used in the hero expertise card. Icons come from `react-icons/si`.
- `data/experience.ts` — currently unused (ExperienceTimeline component is commented out in `app/page.tsx`).
- `posts/*.mdx` — blog posts read at build time via `gray-matter` + `next-mdx-remote`. Required frontmatter: `title`, `date`, `description`, `readingTime`.

### Admin (`app/admin/`)

Single-user admin for projects. Auth is a hand-rolled GitHub OAuth flow (`app/api/admin/auth/*`) that issues an HMAC-signed cookie (`lib/admin/session.ts`); `middleware.ts` guards `/admin/*`, and every server action in `app/admin/actions.ts` re-checks with `requireAdmin()`. Saves go through `lib/admin/project-store.ts`: one commit via the GitHub Git Data API in production (Vercel redeploys), or direct file writes in local dev. "Generate with AI" (`lib/admin/generate.ts`) sends repo context from `lib/admin/repo-context.ts` to the Claude API with a structured-output schema. Env vars are documented in `.env.example`.

### Design Token System

Brand tokens are defined in `app/globals.css` and are the source of truth for all accent colours:

| Token | Usage |
|---|---|
| `--brand-accent` | Full-intensity purple (#7c5cfc dark / #5b3fcf light) |
| `--brand-accent-dim` | 15% opacity — card/indicator backgrounds |
| `--brand-accent-glow` | 40% opacity — radial glow effects |
| `--brand-accent-border` | 20% opacity — header border, card borders |

The shadcn `--accent` token is remapped to the brand purple so shadcn components inherit the identity. The `.dark` class is placed on `<html>` by `next-themes`.

### Typography

Loaded via `next/font/google` in `app/layout.tsx`:

- `--font-display` → Instrument Serif (weight 400 only) — applied globally to `h1`, `h2` via `@layer base` in `globals.css`. Use the Tailwind class `font-display`.
- `--font-mono` → IBM Plex Mono (400/500/700) — default body font. Use `font-mono`.

### Animation Conventions

**All section-entrance animations use the clip-path unfold pattern:**
```tsx
initial={{ clipPath: "inset(0 0 100% 0)" }}
whileInView={{ clipPath: "inset(0 0 0% 0)" }}  // or animate for above-fold
viewport={{ once: true }}
transition={{ duration: 0.5 }}
```
Never use `{ opacity: 0, y: 20 }` for section entrances — that is the old pattern.

For hover-triggered child animations (e.g., project card image reveal), use Framer Motion variant propagation: the parent carries `whileHover="hover"` and children declare `variants` with `initial` / `hover` keys.

Framer Motion v12 is the animation library. The `layoutId="active-nav"` shared element in the header animates the active nav indicator across route changes.

### CSS Utilities

Two custom CSS classes in `globals.css` power the skills marquee:
- `.marquee-container` — the overflow-hidden track wrapper; hover pauses its child
- `.marquee-track` — the duplicated flex row; has `animation-play-state: running` by default, paused on `.marquee-container:hover`

Keyframes `scroll-left` and `scroll-right` are also defined in `globals.css`.

The `body::after` pseudo-element adds a fixed-position SVG noise grain overlay (z-index 9, pointer-events none).

### Component Conventions

- **shadcn components** live in `components/ui/`. Add new ones with `npx shadcn@latest add <component>`. Always compose classes with `cn()` from `lib/utils.ts`.
- **Tech brand icons** in `ProjectCard` come from `react-icons/si`. The `techMap` lookup in `lib/tech-map.ts` maps tech name → `{ color, bg, icon? }`. Icons are optional — unknown techs render text-only badges with a fallback grey colour. Its keys are also the canonical tech names the AI draft generator is steered towards.
- `components/split-text.tsx` — animates a string character-by-character with staggered entrance. Works with `bg-clip-text text-transparent` parents for gradient text.
- `components/magnetic-button.tsx` — spring-driven cursor-follow; degrades gracefully on touch devices.

### Site Configuration

`lib/my-config.ts` holds the CV download URL. Update it there rather than inlining the path.
