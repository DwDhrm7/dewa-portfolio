import type { MetadataRoute } from "next";
import { publishedItems } from "@/lib/writerContent";
import { siteUrl } from "@/lib/site";

const STATIC_PAGES = ["", "/tech", "/portfolio", "/about", "/resume", "/contact", "/writer", "/writer/puisi", "/writer/cerpen", "/writer/novel"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const works: MetadataRoute.Sitemap = publishedItems().map((item) => ({
    url: `${siteUrl}/writer/read/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "yearly",
    priority: item.category === "puisi" ? 0.5 : 0.6,
  }));

  return [...pages, ...works];
}
