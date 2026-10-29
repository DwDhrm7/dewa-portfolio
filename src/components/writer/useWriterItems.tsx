"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { WriterItem, WriterCategory } from "@/types/writer";

// The published works, rendered into the page by the writer layout so lists arrive with the HTML.
const ServerItems = createContext<WriterItem[] | null>(null);

export function WriterItemsProvider({ items, children }: { items: WriterItem[]; children: React.ReactNode }) {
  return <ServerItems.Provider value={items}>{children}</ServerItems.Provider>;
}

// Kept for the session so coming back to a list renders at once and the scroll position can be restored.
let cached: WriterItem[] | null = null;

const pick = (all: WriterItem[], category?: WriterCategory) =>
  category ? all.filter((item) => item.category === category) : all;

export function useWriterItems(category?: WriterCategory) {
  const fromServer = useContext(ServerItems);
  const [items, setItems] = useState<WriterItem[] | null>(() => {
    const known = cached ?? fromServer;
    return known ? pick(known, category) : null;
  });

  // Still ask the API: it is fresher than the build, and shows drafts to the signed-in author.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/writer")
      .then((res) => res.json())
      .then((json) => {
        if (cancelled || !json.success || !Array.isArray(json.data)) return;
        cached = json.data as WriterItem[];
        setItems(pick(cached, category));
      })
      .catch(() => !cancelled && !cached && !fromServer && setItems([]));
    return () => {
      cancelled = true;
    };
  }, [category, fromServer]);

  return items;
}
