# miquelarranz.com

Personal writing site. Built with Astro 5, TypeScript, Tailwind CSS v4, and MDX.

## How to add a post

1. Create `src/content/posts/your-slug.mdx` with this frontmatter:

```mdx
---
title: "Your title"
description: "One-sentence summary used in OG images and RSS."
pubDate: 2026-09-05
---

Your content here.
```

2. Run `git add . && git commit -m "post: your title"` and push to `main`.

3. Netlify builds automatically. Live in ~30 seconds.

**Optional frontmatter fields:**
- `updatedDate: 2026-09-10` — shows "Updated" date on the post
- `draft: true` — visible in dev, excluded from production build
- `tags: ["engineering", "teams"]` — stored but no tag pages yet

## Development

```bash
npm run dev      # localhost:4321
npm run build    # production build
npm run preview  # preview production build locally
npx astro check  # TypeScript type check
```

## Deploy

Connected to Netlify. Push to `main` = deploy. Domain: `miquelarranz.com`.
