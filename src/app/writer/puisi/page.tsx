"use client";

import { useWriterItems } from "@/components/writer/useWriterItems";
import { Feed, WriterShell } from "@/components/writer/Room";

export default function PuisiPage() {
  const items = useWriterItems();
  return (
    <WriterShell active="puisi" items={items}>
      <Feed items={items?.filter((item) => item.category === "puisi") ?? null} />
    </WriterShell>
  );
}
