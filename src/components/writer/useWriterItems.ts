"use client";

import { useEffect, useState } from "react";
import { WriterItem, WriterCategory } from "@/types/writer";

// Kept for the session so coming back to a list renders at once and the scroll position can be restored.
let cached: WriterItem[] | null = null;

const pick = (all: WriterItem[], category?: WriterCategory) =>
  category ? all.filter((item) => item.category === category) : all;

export function useWriterItems(category?: WriterCategory) {
  const [items, setItems] = useState<WriterItem[] | null>(() => (cached ? pick(cached, category) : null));

  useEffect(() => {
    let cancelled = false;
    fetch("/api/writer")
      .then((res) => res.json())
      .then((json) => {
        if (cancelled || !json.success || !Array.isArray(json.data)) return;
        cached = json.data as WriterItem[];
        setItems(pick(cached, category));
      })
      .catch(() => !cancelled && !cached && setItems([]));
    return () => {
      cancelled = true;
    };
  }, [category]);

  return items;
}

