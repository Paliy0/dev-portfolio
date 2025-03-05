import { defineCollection, z } from "astro:content";

export const collections = {
  github: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string().nullable(),
      repoUrl: z.string(),
      homepage: z.string().nullable(),
      topics: z.array(z.string()),
      stars: z.number(),
      language: z.string().nullable(),
      owner: z.string(),
      repo: z.string(),
      updatedAt: z.string(),
      createdAt: z.string(),
    }),
  }),
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).optional(),
      readingTime: z.number().optional(),
    }),
  }),
};
