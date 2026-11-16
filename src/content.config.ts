import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.string(), // short label, e.g. "Mobile · Offline-first POS"
    stack: z.array(z.string()),
    order: z.number().default(99),
    repos: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    live: z.url().optional(),
    // Paths relative to /public, e.g. "/projects/possum/checkout.png"
    images: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
  }),
});

export const collections = { projects };
