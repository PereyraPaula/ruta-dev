// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
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