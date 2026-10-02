// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
const { PUBLIC_SITE_URL, MODE } = loadEnv(import.meta.env.MODE, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL || 'http://localhost:4321',
  base: MODE === 'production' ? '/ruta-dev' : "/",
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',  // paleta VS Code
      wrap: false,         // no romper líneas largas
      langs: [],           // autodetecta por el fence del Markdown
    },
  },
});
