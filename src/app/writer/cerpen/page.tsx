"use client";

import { useWriterItems } from "@/components/writer/useWriterItems";
import { Feed, WriterShell } from "@/components/writer/Room";

export default function CerpenPage() {
  const items = useWriterItems();
  return (
    <WriterShell active="cerpen" items={items}>
      <Feed items={items?.filter((item) => item.category === "cerpen") ?? null} />
    </WriterShell>
  );
}
