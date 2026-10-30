"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { commentsEnabled } from "@/lib/supabase";
import { useWriterCopy } from "./copy";

/** What the database lets anyone see of a work's ratings: how many rated, and averages once three have. */
export interface Summary {
  raters: number;
  plot: number | null;
  conflict: number | null;
  style: number | null;
  overall: number | null;
}

interface Row {
  work_slug: string;
  raters: number;
  plot: number | string | null;
  conflict: number | string | null;
  style: number | string | null;
  overall: number | string | null;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const num = (value: number | string | null) => (value === null ? null : Number(value));

/** Plain fetch against the public summary function, so the lists do not have to load the whole Supabase client. */
export async function fetchSummaries(slugs: string[] | null): Promise<Record<string, Summary>> {
  if (!url || !key) return {};
  try {
    const response = await fetch(`${url}/rest/v1/rpc/blog_rating_summary`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({ slugs }),
    });
    if (!response.ok) return {};
    const out: Record<string, Summary> = {};
    for (const row of (await response.json()) as Row[]) {
      out[row.work_slug] = {
        raters: row.raters,
        plot: num(row.plot),
        conflict: num(row.conflict),
        style: num(row.style),
        overall: num(row.overall),
      };
    }
    return out;
  } catch {
    return {};
  }
}

// One request serves every card on a page; a new rating drops it so the next page view asks again.
let everyWork: Promise<Record<string, Summary>> | null = null;
export const refreshSummaries = () => {
  everyWork = null;
};

export function useRatingSummaries() {
  const [summaries, setSummaries] = useState<Record<string, Summary> | null>(null);
  useEffect(() => {
    if (!commentsEnabled) return;
    let cancelled = false;
    (everyWork ??= fetchSummaries(null)).then((map) => !cancelled && setSummaries(map));
    return () => {
      cancelled = true;
    };
  }, []);
  return summaries;
}

/** 4.3 in English, 4,3 in Indonesian. */
export function useScoreFormat() {
  const { language } = useLanguage();
  return (value: number) =>
    value.toLocaleString(language === "en" ? "en-US" : "id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export const STAR_PATH = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z";

function StarRow({ filled }: { filled: boolean }) {
  return (
    <span className="inline-flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-[1em] w-[1em] shrink-0" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

/** Five stars filled to a fraction, e.g. 3.67 of 5. Size follows the surrounding font size. */
export function Stars({ value, label, className = "" }: { value: number; label: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={`relative inline-block leading-none ${className}`}>
      <span className="opacity-30">
        <StarRow filled={false} />
      </span>
      <span aria-hidden="true" className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(5, value)) * 20}%` }}>
        <StarRow filled />
      </span>
    </span>
  );
}

/** The small "★ 4.3 · 12 raters" on a card. Says nothing until the database has an average to show. */
export function RatingChip({ slug }: { slug: string }) {
  const summaries = useRatingSummaries();
  const format = useScoreFormat();
  const c = useWriterCopy().rating;
  const summary = summaries?.[slug];
  if (!summary || summary.overall === null) return null;
  return (
    <span className="ml-1.5 whitespace-nowrap">
      · <span aria-hidden="true">★</span> {format(summary.overall)} <span className="opacity-70">· {c.raters(summary.raters)}</span>
    </span>
  );
}
