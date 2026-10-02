import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

/*
Formato:
title: "Configurar un dominio de NIC.ar con Cloudflare y GitHub Pages"
date: 2026-03-25
tags: [github]
*/

export const collections = { posts };
