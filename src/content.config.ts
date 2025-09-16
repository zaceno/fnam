import { z, defineCollection } from "astro:content"
import { glob } from "astro/loaders"

const articleCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    image: z.string().optional(),
  }),
})

const lodgesCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/lodges" }),
  schema: z.object({
    name: z.string(),
    number: z.number(),
    seal: z.string(),
    schedule: z.array(
      z.object({
        date: z.date(),
        degree: z.enum(["1°", "2°", "3°", "Installation"]),
        extra: z.string(),
      }),
    ),
  }),
})

export const collections = {
  articles: articleCollection,
  lodges: lodgesCollection,
}
