"use client";

import { useWriterItems } from "@/components/writer/useWriterItems";
import { Feed, NovelShelf, WriterShell } from "@/components/writer/Room";

export default function WriterHomePage() {
  const items = useWriterItems();
  const novels = items?.filter((item) => item.category === "novel") ?? [];
  const writings = items ? items.filter((item) => item.category !== "novel") : null;

  return (
    <WriterShell active="beranda" items={items}>
      <NovelShelf novels={novels} />
      <Feed items={writings} />
    </WriterShell>
  );
}
