"use client";

import { useWriterItems } from "@/components/writer/useWriterItems";
import { NovelShelf, WriterShell } from "@/components/writer/Room";

export default function NovelShelfPage() {
  const items = useWriterItems();
  return (
    <WriterShell active="novel" items={items}>
      <NovelShelf novels={items?.filter((item) => item.category === "novel") ?? []} />
    </WriterShell>
  );
}
