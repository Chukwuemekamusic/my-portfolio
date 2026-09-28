This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin: managing projects

`/admin` lets you add, edit, delete, reorder, feature and unpublish projects without touching code.
Paste a GitHub URL (and a live URL if there is one), click **Generate with AI**, and Claude
reads the repo's README, language mix and dependency manifests to draft the title, description,
tech list and categories. You review and edit the draft, then save.

**How saving works:** projects live in `data/projects.json`. In production each save is a single
commit to `GITHUB_BRANCH` through the GitHub API (image uploads land in `public/projects/` in the
same commit), and Vercel redeploys, so changes go live in about a minute. In local dev without a
`GITHUB_TOKEN`, saves write straight to the working tree instead.

### Setup (Vercel)

1. Create a GitHub OAuth app (GitHub → Settings → Developer settings → OAuth Apps).
   Callback URL: `https://<your-domain>/api/admin/auth/callback`.
2. Create a fine-grained personal access token with **Contents: Read and write** on this repo.
   To draft descriptions for private repos, also give it read access to those.
3. Add the variables from `.env.example` in Vercel → Project → Settings → Environment Variables.
4. Deploy, then visit `/admin`.

Locally, copy `.env.example` to `.env.local`, set `ADMIN_SESSION_SECRET`, and leave
`GITHUB_CLIENT_ID` empty to get a one-click local login.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
