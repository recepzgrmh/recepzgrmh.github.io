import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sourceSchema = z.object({
  label: z.string(),
  url: z.string().url(),
  note: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(180),
    slug: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).min(1),
    category: z.string(),
    heroImage: z.string(),
    heroAlt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    sources: z.array(sourceSchema).min(1),
  }),
});

export const collections = { blog };
