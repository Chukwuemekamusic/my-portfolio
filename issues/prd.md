# PRD: Reposition Portfolio & CV from Blockchain-First to Backend-First Identity

## Problem Statement

Joseph's portfolio site and CV tell contradictory stories. The CV headline already reads as backend-first ("Backend Engineer | Full-Stack | Data Pipelines | Python | Distributed Systems"), but the portfolio hero tagline leads with "specializing in blockchain solutions, smart contracts, and full-stack web development." The role rotator cycles through "Full-Stack Developer → Blockchain Engineer → Smart Contract Auditor," and four of six featured projects are blockchain-only.

This mismatch confuses recruiters who see both surfaces. Joseph is actively applying to backend and full-stack roles — a much larger market than blockchain-specific roles — and wants to cast a wider net while keeping blockchain visible as a differentiator. The current framing filters him out of backend roles before he is read.

## Solution

Align both the CV and portfolio around a single, consistent identity: **Backend Engineer first, full-stack second, blockchain as a depth signal, DevOps as an emerging capability**. This means updating copy, reordering projects to surface backend and full-stack work earlier, and adding DevOps tools to the skills display. The CV also has a factual error (location listed as Glasgow instead of Aberdeen) that is fixed as part of this work.

## User Stories

1. As a backend engineering recruiter, I want to see "Backend Engineer" as the first identity in the headline, so that I immediately know this candidate is relevant to my role.
2. As a full-stack recruiter, I want to see "Full-Stack Developer" in the role rotator, so that I consider this candidate for frontend-inclusive roles.
3. As a blockchain team hiring manager, I want blockchain to remain visible in the positioning, so that I can still shortlist this candidate for smart contract roles.
4. As any recruiter, I want the CV and portfolio to tell the same story, so that I don't become confused about the candidate's primary identity.
5. As a backend recruiter skimming the portfolio, I want the first project I see to be a backend/data engineering project, so that my first impression matches the headline claim.
6. As a full-stack recruiter, I want the second project to be a full-stack application, so that I see evidence of product delivery beyond pure infrastructure.
7. As a recruiter assessing DevOps awareness, I want to see Docker, Linux, and Kubernetes in the skills marquee, so that I know this candidate understands deployment and infrastructure.
8. As a recruiter reading the CV profile, I want the academic achievement (MSc Distinction, Best Graduating Student) to be visible but not the centrepiece, so that I focus on engineering output first.
9. As a recruiter checking the candidate's location, I want to see a consistent and correct city (Aberdeen), so that I can assess commute or relocation requirements accurately.
10. As a visitor reading the hero tagline, I want a single sentence that captures backend, full-stack, and blockchain in plain language, so that I understand the candidate's full range without reading the whole page.
11. As a future employer reading the about page, I want to understand Joseph's non-traditional background (music production → engineering) in one sentence, so that I find it interesting rather than alarming.
12. As a visitor to the portfolio, I want the projects section to not be dominated by blockchain-only smart contract demos, so that I don't conclude this is exclusively a blockchain developer.

## Implementation Decisions

### CV (`public/CV/cv.md`)

- **Headline**: Replace `Backend Engineer | Full-Stack | Data Pipelines | Python | Distributed Systems` with `Backend Engineer | Full-Stack | Blockchain | DevOps`.
- **Location**: Fix `Glasgow, UK` → `Aberdeen, UK`.
- **Profile paragraph**: Restructure to lead with engineering output. Trim the MSc/award parenthetical from its current long em-dash clause to a compact inline reference — `(MSc with Distinction, Best Graduating Student)` — so it does not dominate the opening sentence. The profile should open with what Joseph builds, not how he got here.

### Portfolio Hero (`app/page.tsx`)

- **Role rotator**: Change the `roles` array from `["Full-Stack Developer", "Blockchain Engineer", "Smart Contract Auditor"]` to `["Backend Engineer", "Full-Stack Developer", "Blockchain Engineer"]`.
- **Tagline**: Replace the current tagline string with `"Backend and full-stack engineer with a track record in production APIs, data pipelines, and smart contract systems."` Remove the `"Based in Aberdeen."` location sentence entirely from the hero.

### Project Order (`data/projects.ts`)

- **New order**: ReportFlow → LOTSI (NGO Management Platform) → Isolated Lending Market Protocol → Decentralised Crowdfunding Platform → Smart Lottery Contract.
- **Remove**: Diamond Storage Subscription Proxy entry deleted entirely.
- No changes to project content, descriptions, or metadata — order only, plus the deletion.

### Skills Marquee (`data/skills.tsx`)

- **Add three skills**: Docker (`SiDocker`), Linux (`SiLinux`), Kubernetes (`SiKubernetes`) from `react-icons/si`.
- Append them after the existing entries. No existing skills are removed.
- Use consistent icon sizing and colour conventions already present in the file.

### About Page (`app/about/page.tsx`)

- **Rewrite** the page body to three sentences covering: (1) backend-first engineering identity and areas of work, (2) the music production pivot — brief, humanising, (3) current DevOps trajectory toward CKA.
- This page is **not currently linked or rendered** in the live portfolio. The update is purely to future-proof it for when the user decides to surface it.

## Testing Decisions

There is no test framework installed. `npm run build` is the primary correctness check — it runs TypeScript compilation and ESLint.

**What constitutes a good check for this change:**

- `npm run build` passes with no type errors or lint warnings after all edits.
- The three new `react-icons/si` icon imports (`SiDocker`, `SiLinux`, `SiKubernetes`) exist in the installed package — verify by checking the import compiles cleanly.
- The `roles` array length and string values in `app/page.tsx` match the agreed rotator order exactly.
- The projects array in `data/projects.ts` has exactly 5 entries and Diamond Storage is absent.

## Out of Scope

- Adding a new backend or DevOps project to the portfolio (user plans to build one within ~2 weeks; it will be slotted after LOTSI when ready).
- Changes to any project card content, descriptions, tech tags, or links.
- Changes to the CV body sections (experience, projects, education, certifications) — only the headline, location, and profile paragraph are in scope.
- Routing or navigation changes (the about page remains unlinked).
- Any visual/design changes — this is a content-only update.
- The `app/dashboard/` route (excluded from portfolio scope per CLAUDE.md).

## Further Notes

- The CV is a plain markdown file at `public/CV/cv.md`. It is served for download via `lib/my-config.ts`. No build step is needed for CV changes.
- When the new backend/DevOps project is ready, it should slot at position 3 (after LOTSI), shifting the blockchain projects one position down each.
- "Smart Contract Auditor" is retired from all visible surfaces with this change. It should not reappear in future copy.
- The location removal from the hero tagline is intentional — location context is available on the CV and in contact details; it does not need to appear in the portfolio hero.
