import type { WriterItem } from "@/types/writer";
import { getWriterItems } from "./writerStorage";

/** A listing entry: the opening of the work instead of all of it, so lists stay light. */
export function summarize(item: WriterItem): WriterItem {
  const { content, ...rest } = item;
  return {
    ...rest,
    excerpt: content?.split(/\n{2,}/).slice(0, 2).join("\n\n"),
    chapters: item.chapters?.map((chapter) => ({ ...chapter, content: "" })),
  };
}

export function publishedItems(): WriterItem[] {
  return getWriterItems().filter((item) => item.isPublished !== false);
}

/** Finds a work by slug (or id, for old links). Drafts only when `includeDrafts` is set. */
export function findItem(slug: string, includeDrafts = false): WriterItem | undefined {
  const items = includeDrafts ? getWriterItems() : publishedItems();
  return items.find((item) => item.slug === slug || item.id === slug);
}

/** One plain line for search results and link previews. */
export function describe(item: WriterItem): string {
  const source = item.synopsis && item.synopsis !== "Coming Soon!" ? item.synopsis : item.content ?? "";
  const text = source
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("## ") && line !== "* * *")
    .join(item.category === "puisi" ? " / " : " ");
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}
