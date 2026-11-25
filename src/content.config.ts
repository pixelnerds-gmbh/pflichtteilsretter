import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string(),
    cluster: z.enum(['grundlagen', 'berechnung', 'durchsetzung', 'schenkungen', 'erblasser', 'sonderfaelle']),
    pillar: z.boolean().default(false),
    kurzantwort: z.string(),
    stand: z.coerce.date(),
    lesezeit: z.number(),
    order: z.number().default(50),
    cta: z.enum(['rechner', 'quickcheck', 'anfrage']).default('anfrage'),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    verwandt: z.array(z.string()).default([]),
  }),
});

export const collections = { artikel };
