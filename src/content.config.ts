import { z, defineCollection } from "astro:content"
import { glob } from "astro/loaders"

const articleCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
})

export const collections = {
  articles: articleCollection,
}
