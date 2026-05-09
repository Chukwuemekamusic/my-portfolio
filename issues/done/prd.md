# PRD: Portfolio Visual Identity Redesign

## Problem Statement

The portfolio is technically well-built but visually indistinguishable from thousands of auto-generated developer portfolios. Every visual decision — the Geist Sans font, the pure slate monochrome palette (shadcn defaults, unchanged), the `opacity: 0, y: 20` stagger animations, and the hero → card grid → footer layout — is the default output of a code generator. The site communicates no distinctive visual identity and fails to reflect the level of craft evident in the projects themselves (isolated lending protocols, ETL pipelines, Web3 dApps). Recruiters and collaborators who land on the portfolio cannot distinguish the developer's identity from the generic template within the first 3–5 seconds.

## Solution

Redesign the visual identity and interactive layer of the portfolio across all pages to create a memorable, distinctive experience that reflects the developer's blockchain/full-stack background. The redesign delivers:

1. A new typographic identity: Instrument Serif for display headings, IBM Plex Mono for body — deliberate tension between editorial elegance and technical utility.
2. A bold electric purple accent color system (`#7c5cfc`) applied consistently across light and dark modes, replacing shadcn monochrome defaults.
3. A redesigned hero section with a viewport-scaled heading, animated role rotator, radial background glow, and scroll indicator.
4. A CSS noise grain texture layer and section-level depth decorations throughout the site.
5. A glass-morphism navigation header with an animated active-link indicator and an "available for work" status dot.
6. Project cards with image-on-hover reveal (clip-path animation), brand-colored tech badges, and clip-path entrance animations.
7. A horizontally scrolling skills marquee replacing the static grid.
8. A character-split hero text entrance animation and a magnetic hover effect on the primary CTA button.

All changes maintain support for both light and dark modes.

## User Stories

1. As a recruiter visiting the portfolio, I want to immediately recognize a distinctive visual identity, so that the developer stands out from the hundreds of similar portfolios I review.
2. As a recruiter, I want to understand the developer's specializations (blockchain, full-stack) at a glance, so that I can quickly assess relevance for a role.
3. As a visitor, I want to see an impressively large, typographically bold hero heading, so that the site feels intentional and confident rather than templated.
4. As a visitor, I want to see the developer's different roles cycle through in the hero, so that I understand the breadth of their expertise without reading walls of text.
5. As a visitor, I want the page typography to feel distinctive and carefully chosen, so that I associate design care with the developer's work quality.
6. As a visitor reading in dark mode, I want the electric purple accent color to create visual hierarchy and warmth, so that the site feels immersive rather than flat.
7. As a visitor reading in light mode, I want the accent color to remain consistent and readable, so that the experience is equally polished in both modes.
8. As a visitor, I want a subtle grain texture overlay on the page, so that flat solid colors are replaced with visual depth.
9. As a visitor, I want a radial glow behind the hero heading, so that the most important content has visual presence.
10. As a visitor, I want the navigation header to use glass morphism (blur + semi-transparency), so that it feels modern and layered over the content beneath it.
11. As a visitor, I want to see an animated underline or highlight that slides between active navigation links, so that navigation feels responsive and polished.
12. As a visitor, I want to see a pulsing "available for work" status dot in the header, so that I know immediately whether the developer is open to opportunities.
13. As a recruiter hovering over a project card, I want to see a project screenshot revealed with a clip-path animation, so that I can preview the project without navigating away.
14. As a visitor, I want tech tags on project cards to display the correct brand color for each technology, so that I can scan the tech stack visually at a glance.
15. As a visitor, I want project cards to enter the viewport via a clip-path unfold animation rather than a generic fade, so that the scroll experience feels fresh and intentional.
16. As a visitor viewing the skills section, I want skills to scroll horizontally as marquee tickers, so that the page feels dynamic and distinct from a static table.
17. As a visitor, I want alternating scroll directions on the skills marquee rows, so that the visual rhythm is engaging rather than repetitive.
18. As a visitor, I want the hero heading to animate in letter-by-letter, so that the first impression feels crafted and memorable.
19. As a visitor hovering over the primary CTA button, I want it to respond subtly to my cursor position, so that interactive elements feel alive and responsive.
20. As a visitor on mobile, I want all redesigned components to remain functional and visually coherent, so that the experience is not degraded on smaller screens.
21. As a visitor, I want the site to load without layout shift caused by font swapping, so that the typography is stable from first paint.

## Implementation Decisions

### Design Token System
- Replace the current shadcn default CSS custom properties in `globals.css` with an accent-color-aware token system. New tokens coexist with shadcn component tokens to avoid breaking existing UI components.
- Define a `--brand-accent` token family: `--brand-accent`, `--brand-accent-dim` (15% opacity), `--brand-accent-glow` (40% opacity), `--brand-accent-border` (20% opacity).
- Light mode: accent applies with reduced intensity (higher lightness, lower saturation) to remain accessible against white backgrounds.
- Dark mode: full-intensity electric purple (`#7c5cfc`) with glow utilities enabled.
- The existing `--accent` shadcn token is remapped to use the brand accent so that shadcn components inherit the new identity without per-component overrides.

### Typography Module
- Add Instrument Serif (400, 700 weights) and IBM Plex Mono (400, 500, 700 weights) from `next/font/google` in `app/layout.tsx`.
- Expose as CSS variables `--font-display` and `--font-mono`, wired into `tailwind.config.ts` as `fontFamily.display` and `fontFamily.mono`.
- Apply `font-display` to `h1` and `h2` via a global base layer rule; apply `font-mono` as the default body font.
- Font `display: swap` to prevent layout blocking; only subset required Unicode ranges.

### Hero Section
- Replace the current `text-4xl sm:text-5xl` heading with `clamp(3rem, 12vw, 10rem)` responsive sizing and `font-black` weight.
- Split the name into two lines: first name plain, last name styled with an accent gradient (`bg-clip-text text-transparent bg-gradient-to-r`).
- Add an animated role rotator below the tagline using Framer Motion `AnimatePresence`, cycling through: "Full-Stack Developer", "Blockchain Engineer", "Smart Contract Auditor".
- Add a radial gradient glow `div` positioned absolutely behind the heading: `pointer-events-none`, `blur` filter, using `--brand-accent-glow`.
- Add a character-split entrance animation: decompose the hero name into individual `<span>` characters, stagger their `opacity` + `y` entrance at 0.03s per character using Framer Motion `staggerChildren`.
- Add a subtle animated scroll indicator (line or chevron) at the bottom of the hero viewport.

### Noise Texture Layer
- Add a `body::after` pseudo-element in `globals.css` with a base64-encoded SVG noise pattern. Fixed position, `pointer-events: none`, above page content but below interactive elements (z-index management required).
- Opacity: `0.03` in dark mode, `0.02` in light mode.
- Implemented as a pure CSS change — no JavaScript, no new assets.

### Navigation Header
- Apply glass morphism: semi-transparent `background` + `backdrop-filter: blur(20px) saturate(180%)` + 1px bottom border using `--brand-accent-border`.
- Add a `layoutId`-based Framer Motion shared element to animate an underline or pill that tracks the active nav link across route changes.
- Add a pulsing "available for work" status dot: 8px circle, green (`#22c55e`), CSS `animation: pulse 2s infinite`, placed adjacent to a minimal `JA` monospace logo mark in the header left slot.
- The `JA` logo mark is a new element — styled with the accent color, no image asset required.

### Project Card
- Restore the commented-out `<Image>` element inside each card. Position it absolutely behind the card content, revealed on hover via `clip-path: inset(0 100% 0 0)` → `clip-path: inset(0 0% 0 0)` using Framer Motion `whileHover`.
- Cards with no `image` field in `data/projects.ts` skip the reveal and retain the current text-only layout.
- Replace plain `<Badge>` tech tags with branded versions: a static lookup maps known tech names to a hex color and a react-icons `si` icon. The badge uses that color for border and a tinted background.
- Replace card entrance animation: `initial: { clipPath: "inset(0 0 100% 0)" }` → `animate: { clipPath: "inset(0 0 0% 0)" }`. No more `opacity: 0, y: 20`.
- The projects page layout wrapper must not have `overflow: hidden` set during the entrance animation, or the unfold will be clipped incorrectly.

### Skills Marquee
- Replace the static `grid` in `components/skills.tsx` with horizontal marquee rows.
- Each skill category becomes one row: a fixed left label with the category icon, followed by a horizontally scrolling track of skill pill elements.
- Items within each track are duplicated (two copies) to create a seamless CSS loop: `animation: scroll-left linear infinite` / `animation: scroll-right linear infinite`.
- Even-indexed rows scroll left-to-right; odd-indexed rows scroll right-to-left.
- Hovering any row pauses scrolling via `animation-play-state: paused`.

### Magnetic CTA Button
- Extract the "View Projects" CTA into a reusable `MagneticButton` component.
- Uses `onMouseMove` to compute cursor offset relative to the button bounding rect, applied as a Framer Motion spring `x/y` transform (max ±10px travel).
- Resets to `x: 0, y: 0` with a spring on `onMouseLeave`.
- Degrades gracefully on touch devices (no transform applied).

### Animation System
- A reusable `SplitText` component accepts a string, splits it into per-character `<span>` elements, and wraps them in a Framer Motion container variant with `staggerChildren`.
- All existing section-entrance animations across the codebase migrate from `{ opacity: 0, y: 20 }` to `{ clipPath: "inset(0 0 100% 0)" }` → `{ clipPath: "inset(0 0 0% 0)" }`.

## Testing Decisions

Good tests in this codebase verify user-observable behavior, not implementation details (animation keyframes, CSS class names, Framer Motion internal state). A test should break only when the user-observable behavior changes.

There are currently no tests in this codebase. A test framework (Vitest + React Testing Library) would need to be added as a prerequisite. The following modules are worth testing:

- **Tech tag color lookup** — the static map from tech name to color/icon is a pure function. Unit test with known tech names (e.g. "Solidity", "React", "Django") and assert correct color codes are returned. This is pure logic, isolated from DOM rendering, and is the most reliable candidate for a unit test.
- **SplitText component** — render with a known string and assert that the correct number of character spans are produced and that each has the expected Framer Motion `custom` index prop.
- **MagneticButton** — simulate `mousemove` events and assert that the `x`/`y` transform props are non-zero after movement and reset to zero after `mouseleave`.
- **SkillsMarquee** — render the component and assert that each category row is present, that skill items appear twice (confirming the seamless-loop duplication), and that row count matches the number of skill categories.

## Out of Scope

- Metric strip in the hero (excluded per user decision)
- Editorial numbered list layout for project cards (user chose grid + hover reveal)
- Scroll-linked parallax on the hero text
- Radial SVG skill chart
- Any backend, API, or data changes
- Changes to blog post content or MDX rendering
- The experience timeline section (currently commented out in `app/page.tsx`)
- The about page (`app/about/page.tsx`)
- Dashboard route (`app/dashboard/`)
- WCAG accessibility audit (out of scope for this redesign pass)
- Test framework setup (noted as a prerequisite but not delivered in this PRD's scope)

## Further Notes

- Framer Motion v12 is already installed and used throughout the codebase. No new animation library is needed.
- `react-icons` v5.4 is already installed. Tech brand icons are available from the `si` (Simple Icons) subset within the package.
- `next/font` is available via Next.js 15. No external font CDN link or `<link>` tag is required.
- The noise texture SVG should be generated as a base64 data URI to avoid an additional network request.
- The clip-path card entrance animation requires that no ancestor element has `overflow: hidden` active during the animation, or the unfold will be clipped. Audit the projects page layout wrapper before implementing.
- Glass morphism requires `backdrop-filter` CSS support (>96% browser coverage as of 2025). It should degrade gracefully to a solid background for unsupported browsers.
- Switching from Geist to Instrument Serif will shift hero layout — test the `clamp()` heading at narrow mobile breakpoints to confirm no overflow before considering the work done.
- Some projects in `data/projects.ts` have no `image` field (e.g. ReportFlow). The image-reveal card variant must handle this gracefully; the fallback is the existing card layout.
