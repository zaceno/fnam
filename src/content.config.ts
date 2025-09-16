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

export const collections = {
  articles: articleCollection,
}
