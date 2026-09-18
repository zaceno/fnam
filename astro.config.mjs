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
    filter: (page) => !new URL(page).pathname.replace(/\/$/, '').endsWith('/loger/donatus/2026-10'),
  })],
})
