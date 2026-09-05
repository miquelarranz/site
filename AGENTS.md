# miquelarranz.com — project conventions

## Stack
Astro 5 + TypeScript strict + Tailwind CSS v4 + MDX. Static output, deployed on Netlify.

## Key rules
- Posts: `src/content/posts/<slug>.mdx`. Slug = URL path (`post.id`, not `post.slug` — Astro 5 Content Layer).
- Import `z` from `zod`, not `astro:content` (deprecated in Astro 5).
- Tailwind: via `@tailwindcss/vite` plugin, NOT `@astrojs/tailwind`.
- Theme tokens: CSS custom properties in `src/styles/global.css`. Dark mode = `.dark` class on `<html>`.
- Layout: `.container` class = max 68ch, 1.5rem gutters.
- Fonts: Newsreader Variable (serif) + `ui-monospace`. Self-hosted — no third-party font requests.
- Accent `#9a5b34` light / `#c98a5e` dark. Warm bg: `#fcfbf8` / `#12110f`.
- OG images: built at compile time via satori + resvg-js in `src/pages/og/[...slug].png.ts`.
- All pages use `src/layouts/BaseLayout.astro`.

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
