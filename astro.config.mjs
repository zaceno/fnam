// @ts-check
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://zaceno.github.io",
  base: "fnam",
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
})
