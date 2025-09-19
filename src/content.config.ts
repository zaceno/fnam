import fs from "node:fs/promises"
import path from "node:path"
import { z, defineCollection, reference } from "astro:content"
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
      for (let index = 0; index < sections.length; index++) {
        const { link, image, body } = sections[index]
        const linkRef =
          !link || link === "null"
            ? undefined
            : {
                collection: "articles",
                id: path.basename(link, path.extname(link)),
              }
        store.set({
          id: String(index + 1),
          data: { link: linkRef, image },
          rendered: await renderMarkdown(body),
        })
      }
    },
  },
  schema: z.object({
    image: z.string().optional(),
    link: reference("articles").optional(),
  }),
})

export const collections = {
  frontPageSections,
  articles: articleCollection,
  lodges: lodgesCollection,
}
