## Parent PRD

`issues/prd.md`

## What to build

Add Docker, Linux, and Kubernetes to the `techSkills` array in `data/skills.tsx`. Icons come from `react-icons/si` (already installed) — use `SiDocker`, `SiLinux`, `SiKubernetes`. Follow the existing icon sizing and colour conventions in the file (`w-5 h-5` with an appropriate brand colour).

No existing skills are removed or reordered.

## Acceptance criteria

- [ ] Docker appears in the skills marquee with a `SiDocker` icon
- [ ] Linux appears in the skills marquee with a `SiLinux` icon
- [ ] Kubernetes appears in the skills marquee with a `SiKubernetes` icon
- [ ] All three icons use `w-5 h-5` sizing consistent with existing entries
- [ ] No existing skills are removed or reordered
- [ ] Imports for the three new icons are added to the file
- [ ] `npm run build` passes with no type errors

## Blocked by

None — can start immediately.

## User stories addressed

- User story 7 (Docker, Linux, Kubernetes visible in skills)
