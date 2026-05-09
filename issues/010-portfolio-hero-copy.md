## Parent PRD

`issues/prd.md`

## What to build

Update the hero section in `app/page.tsx` to reflect the backend-first positioning. Two targeted edits: the `roles` array (role rotator) and the tagline string.

- `roles` array changes from `["Full-Stack Developer", "Blockchain Engineer", "Smart Contract Auditor"]` to `["Backend Engineer", "Full-Stack Developer", "Blockchain Engineer"]`
- Tagline changes from `"Software developer specializing in blockchain solutions, smart contracts, and full-stack web development. Based in Aberdeen."` to `"Backend and full-stack engineer with a track record in production APIs, data pipelines, and smart contract systems."` — location is removed entirely from the hero.

## Acceptance criteria

- [ ] Role rotator cycles: Backend Engineer → Full-Stack Developer → Blockchain Engineer
- [ ] "Smart Contract Auditor" does not appear anywhere in the rotator
- [ ] Hero tagline reads exactly: "Backend and full-stack engineer with a track record in production APIs, data pipelines, and smart contract systems."
- [ ] No location string appears in the hero section
- [ ] `npm run build` passes

## Blocked by

None — can start immediately.

## User stories addressed

- User story 1 (backend identity leads)
- User story 2 (full-stack visible)
- User story 3 (blockchain remains visible)
- User story 4 (CV and portfolio aligned)
- User story 10 (single tagline covers full range)
