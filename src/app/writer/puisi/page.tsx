"use client";

import { Suspense, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useWriterItems } from "@/components/writer/useWriterItems";
import { useWriterCopy } from "@/components/writer/copy";
import { Feed, Pager, WriterShell } from "@/components/writer/Room";

const PER_PAGE = 5;

function PoemPages() {
  const items = useWriterItems();
  const c = useWriterCopy();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const topRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1);
  const [hasPaged, setHasPaged] = useState(false);
  const [query, setQuery] = useState(params.get("q") ?? "");

  const queryNorm = query.trim().toLowerCase();
  const poems = items?.filter((item) => item.category === "puisi") ?? null;

  const filteredPoems = poems
    ? queryNorm
      ? poems.filter((poem) => {
          const title = poem.title.toLowerCase();
          const content = (poem.excerpt ?? poem.content ?? "").toLowerCase();
          const synopsis = (poem.synopsis ?? "").toLowerCase();
          const tags = (poem.tags ?? []).join(" ").toLowerCase();
          return (
            title.includes(queryNorm) ||
            content.includes(queryNorm) ||
            synopsis.includes(queryNorm) ||
            tags.includes(queryNorm)
          );
        })
      : poems
    : null;

  const pages = filteredPoems ? Math.max(1, Math.ceil(filteredPoems.length / PER_PAGE)) : 1;
  const requested = Math.max(parseInt(params.get("halaman") ?? "1", 10) || 1, 1);
  // Only clamp once the poems are known, or page 2 would flash through page 1 while loading.
  const page = filteredPoems ? Math.min(requested, pages) : requested;
  const visible = filteredPoems?.slice((page - 1) * PER_PAGE, page * PER_PAGE) ?? null;

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setHasPaged(false);
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (nextQuery.trim()) {
        p.set("q", nextQuery.trim());
      } else {
        p.delete("q");
      }
      p.delete("halaman");
      const qs = p.toString();
      window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
    }
  };

  const goTo = (next: number) => {
    setHasPaged(true);
    setDirection(next > page ? 1 : -1);
    const p = new URLSearchParams();
    if (queryNorm) p.set("q", query.trim());
    if (next > 1) p.set("halaman", String(next));
    const qs = p.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <WriterShell active="puisi" items={items}>
      <div ref={topRef} className="scroll-mt-28" />

      {/* Search Input for Poetry */}
      <div className="relative mb-6 mt-2">
        <div className="relative flex items-center">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 text-ink-soft"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder={c.searchPoetry}
            aria-label={c.searchPoetry}
            className="w-full rounded-full border border-ink/15 bg-paper/60 py-2.5 pl-10 pr-10 font-ui text-sm text-ink placeholder:text-ink-soft/60 transition-all focus:border-ink/50 focus:bg-paper focus:outline-none focus:ring-1 focus:ring-ink/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateQuery("")}
              aria-label={c.clearSearch}
              className="absolute right-3 rounded-full p-1 text-ink-soft transition hover:bg-ink/5 hover:text-ink"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Query summary if searching */}
        {queryNorm && filteredPoems !== null && (
          <div className="mt-3 flex items-center justify-between font-ui text-xs text-ink-soft">
            <span>{c.searchResults(filteredPoems.length, query.trim())}</span>
            <button
              type="button"
              onClick={() => updateQuery("")}
              className="underline underline-offset-2 transition hover:text-ink"
            >
              {c.clearSearch}
            </button>
          </div>
        )}
      </div>

      {queryNorm && filteredPoems?.length === 0 ? (
        <div className="py-16 text-center font-ui">
          <p className="text-base text-ink">{c.noPoetryFound(query.trim())}</p>
          <button
            type="button"
            onClick={() => updateQuery("")}
            className="mt-4 inline-flex items-center rounded-full border border-ink/20 px-4 py-2 text-xs font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
          >
            {c.clearSearch}
          </button>
        </div>
      ) : (
        /* New page slides in from the side you moved toward; nothing waits on the old page leaving. */
        <motion.div
          key={page}
          initial={reduce || !hasPaged ? false : { opacity: 0, x: 20 * direction }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Feed items={visible} />
        </motion.div>
      )}

      {filteredPoems && pages > 1 && <Pager page={page} pages={pages} onChange={goTo} />}
    </WriterShell>
  );
}

export default function PuisiPage() {
  return (
    <Suspense fallback={null}>
      <PoemPages />
    </Suspense>
  );
}
