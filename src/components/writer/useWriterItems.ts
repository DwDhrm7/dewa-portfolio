"use client";

import { useEffect, useState } from "react";
import { WriterItem, WriterCategory } from "@/types/writer";
import defaultWriterData from "@/data/writer-content.json";

const published = (items: WriterItem[]) => items.filter((item) => item.isPublished !== false);

export function useWriterItems(category?: WriterCategory) {
  const pick = (items: WriterItem[]) =>
    published(category ? items.filter((item) => item.category === category) : items);

  const [items, setItems] = useState<WriterItem[]>(() => pick(defaultWriterData as WriterItem[]));

  useEffect(() => {
    let cancelled = false;
    fetch("/api/writer")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json.success && Array.isArray(json.data)) setItems(pick(json.data));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return items;
}
