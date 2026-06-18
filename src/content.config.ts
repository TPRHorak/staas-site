import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    author: z.string(),
    authorRole: z.string(),
    authorPhoto: z.string(),
    publishedAt: z.string(),
    readingTime: z.string(),
    excerpt: z.string(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    hero: z.string(),
    partnership: z.string(),
    oneLine: z.string(),
    awards: z.array(z.string()),
    icp: z.string(),
    order: z.number(),
    // When true, the hero is a square brand/app icon rather than a wide
    // product shot — render it contained on a navy backdrop instead of
    // cropping it to fill.
    iconOnly: z.boolean().optional(),
    // Optional: if set, the work card on /work links out to this URL
    // and the inner /work/[slug] page is still generated but acts as a
    // light landing that points to this external case study.
    external: z.string().optional(),
  }),
});

export const collections = { notes, work };
