## Parent PRD

`issues/prd.md`

## What to build

Replace the static 3-column skills grid in `components/skills.tsx` with horizontally scrolling marquee rows — one row per skill category. This transforms the skills page from a static table into a dynamic, distinctive experience rarely seen in developer portfolios.

**Structure:** Each row has a fixed left label (category icon + category name) followed by an infinitely scrolling track of skill pill elements. The track contains the skill list duplicated twice (two copies side by side) to create a seamless CSS loop with no JavaScript.

**Scroll directions:** Even-indexed rows scroll left-to-right; odd-indexed rows scroll right-to-left. Implemented via two CSS keyframe animations (`scroll-left`, `scroll-right`) in `globals.css`.

**Pause on hover:** When a user hovers any row, `animation-play-state: paused` so they can read the skills without the content moving.

**Styling:** Skill pills retain the rounded-full, backdrop-blur style from the current implementation. Category label colors use the existing per-category color values from `skillCategories` in `components/skills.tsx`.

## Acceptance criteria

- [ ] Each skill category is displayed as a horizontally scrolling row
- [ ] Even-indexed rows scroll left; odd-indexed rows scroll right
- [ ] Scrolling is seamless (no visible jump or gap at the loop boundary)
- [ ] Hovering any row pauses scrolling for that row only
- [ ] The category label and icon are visible and fixed (not scrolling) on the left of each row
- [ ] All skills from the original grid are present in the marquee
- [ ] The section renders correctly in both light and dark mode
- [ ] No horizontal overflow on the page; the marquee is contained within its track

## Blocked by

- Blocked by `issues/001-design-token-system.md` (category color tokens)

## User stories addressed

- User story 16
- User story 17
