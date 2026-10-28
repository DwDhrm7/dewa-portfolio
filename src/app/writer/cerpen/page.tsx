"use client";

import { useWriterItems } from "@/components/writer/useWriterItems";
import { StoryList, WriterShell } from "@/components/writer/Room";

export default function CerpenPage() {
  const items = useWriterItems();
  return (
    <WriterShell active="cerpen" items={items}>
      <StoryList stories={items?.filter((item) => item.category === "cerpen") ?? null} />
    </WriterShell>
  );
}
