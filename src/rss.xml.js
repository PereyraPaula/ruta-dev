// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog'); // 'blog' es el nombre de tu colección

  return rss({
    title: 'Mi Blog Astro',
    description: 'Un blog sobre desarrollo web',
    site: context.site, // Obtiene la URL desde astro.config.mjs
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Asumiendo que tus posts viven en /blog/[slug]/
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>es-ES</language>`,
  });
}
