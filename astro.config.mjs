import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkSimplePlantUML from '@akebifiky/remark-simple-plantuml';

export default defineConfig({
  site: 'https://miquelarranz.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // remarkPlugins is deprecated in Astro 5 but functional.
    // TODO: migrate to unified() processor API when Astro docs stabilise.
    remarkPlugins: [remarkSimplePlantUML],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
