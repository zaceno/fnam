// @ts-check
import { defineConfig } from "astro/config"

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://friaochantagnamurare.se",

  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  integrations: [sitemap({
    filter: (page) => !/^\/loger\/donatus\/(?:events\/)?2026-10$/.test(new URL(page).pathname.replace(/\/$/, '')),
  })],
})
