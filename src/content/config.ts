import { defineCollection, z } from "astro:content";

const frontPageSectionsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    link: z.string().optional(),
  }),
});

const lodgesCollection = defineCollection({
  type: "content",
  schema: z.any(), // Keeping this flexible as we are not changing it
});

export const collections = {
  frontPageSections: frontPageSectionsCollection,
  lodges: lodgesCollection,
};