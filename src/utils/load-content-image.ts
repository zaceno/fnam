import { type ImageMetadata } from "astro"
const images = import.meta.glob<{
  default: ImageMetadata
}>("/src/content/images/*.{jpeg,jpg,png,gif,webp}")

export default async function (aliasedPath?: string) {
  if (!aliasedPath) throw new Error("Cannot load content image for empty path")
  const path = aliasedPath.replace("$images", "/src/content/images")
  const loader = images[path]
  if (!loader) throw new Error(`content image not found: ${path}`)
  const image = await loader()
  return image
}
