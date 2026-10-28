"use client";

import { useEffect, useState } from "react";
import { WriterItem, WriterCategory } from "@/types/writer";

export function useWriterItems(category?: WriterCategory) {
  const [items, setItems] = useState<WriterItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/writer")
      .then((res) => res.json())
      .then((json) => {
        if (cancelled || !json.success || !Array.isArray(json.data)) return;
        const all = json.data as WriterItem[];
        setItems(category ? all.filter((item) => item.category === category) : all);
      })
      .catch(() => !cancelled && setItems([]));
    return () => {
      cancelled = true;
    };
  }, [category]);

  return items;
}

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export function formatDate(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;
  return `${Number(match[3])} ${MONTHS[Number(match[2]) - 1]} ${match[1]}`;
}
