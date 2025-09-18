import fs from "node:fs/promises"
import { z, defineCollection } from "astro:content"
import { glob, type LoaderContext, type Loader } from "astro/loaders"

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
    meetingInfo: z.string(),
    email: z.string(),
    streetAddress: z.string(),
    city: z.string(),
    schedule: z.array(
      z.object({
        date: z.date(),
        work: z.string(),
      }),
    ),
  }),
})

const FRONT_PAGE_SECTIONS_SOURCE = "./src/content/framsidan.json"
const frontPageSections = defineCollection({
  loader: {
    name: "frontPageSections-loader",
    async load({ store, renderMarkdown }: LoaderContext) {
      store.clear()
      const rawJSON = await fs.readFile(FRONT_PAGE_SECTIONS_SOURCE, "utf-8")
      const { sections } = JSON.parse(rawJSON) as {
        sections: { body: string; image?: string; link?: string }[]
      }
      sections.forEach(async ({ link, image, body }, index) => {
        store.set({
          id: "" + index,
          data: { link, image },
          rendered: await renderMarkdown(body),
        })
      })
    },
  },
  schema: z.object({
    image: z.string().optional(),
    link: z.string().optional(),
  }),
})

export const collections = {
  frontPageSections,
  articles: articleCollection,
  lodges: lodgesCollection,
}
