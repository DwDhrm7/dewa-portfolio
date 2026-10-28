"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WriterItem, WriterCategory } from "@/types/writer";
import { useWriterCopy } from "./copy";
import { woodImages } from "./woodImages";

/** A short rule with a diamond. Only used where it means something: a scene break. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-oak/40" />
      <span className="h-1.5 w-1.5 rotate-45 border border-oak/60" />
      <span className="h-px w-12 bg-oak/40" />
    </div>
  );
}

type Tab = "beranda" | WriterCategory;

const tabs: { id: Tab; href: string }[] = [
  { id: "beranda", href: "/writer" },
  { id: "puisi", href: "/writer/puisi" },
  { id: "cerpen", href: "/writer/cerpen" },
  { id: "novel", href: "/writer/novel" },
];

/** Medium's profile page: name and tabs over the main column, the author's sidebar alongside. */
export function WriterShell({
  active,
  items,
  children,
}: {
  active: Tab;
  items: WriterItem[] | null;
  children: React.ReactNode;
}) {
  const c = useWriterCopy();
  const count = (cat: WriterCategory) => items?.filter((i) => i.category === cat).length;

  return (
    <div className="mx-auto max-w-[1192px] px-6 pb-24 pt-28 md:pt-32">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div className="min-w-0">
          <h1 className="text-[34px] leading-tight sm:text-[42px]">{c.title}</h1>

          <nav
            aria-label={c.tabsLabel}
            className="mt-8 flex gap-7 overflow-x-auto overflow-y-hidden border-b border-ink/10 font-ui text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const n = tab.id === "beranda" ? undefined : count(tab.id);
              const isActive = tab.id === active;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`-mb-px flex shrink-0 items-baseline gap-1.5 border-b pb-4 transition ${
                    isActive ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  {c.tabs[tab.id]}
                  {n !== undefined && <span className="tabular-nums text-xs text-ink-soft">{n}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-2">{children}</div>
        </div>

        <aside className="mt-16 border-t border-ink/10 pt-10 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
          <div className="lg:sticky lg:top-28">
            <p className="font-ui text-base font-semibold">{c.profileTitle}</p>
            <p className="mt-3 font-ui text-sm leading-relaxed text-ink-soft">
              {c.profile}
            </p>

            <p className="mt-10 font-ui text-base font-semibold">{c.achievementsTitle}</p>
            <ul className="mt-4 space-y-3 font-ui text-sm text-ink-soft">
              {c.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function poemPreview(item: WriterItem) {
  const firstStanza = (item.excerpt ?? item.content ?? "").split(/\n{2,}/)[0] ?? "";
  return firstStanza
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(" / ");
}

/** One row of the feed, as on Medium: meta, bold title, a serif line of the work, thumbnail on the right. */
export function FeedRow({ item }: { item: WriterItem }) {
  const c = useWriterCopy();
  const preview = item.category === "puisi" ? poemPreview(item) : item.synopsis;

  return (
    <article className="border-b border-ink/10 py-8">
      <Link href={`/writer/read/${item.slug}`} className="group grid grid-cols-[minmax(0,1fr)_auto] gap-6 sm:gap-10">
        <div className="min-w-0">
          <p className="font-ui text-[13px] text-ink-soft">
            {c.category[item.category]}, {c.formatDate(item.date)}
          </p>
          <h2 className="mt-2 text-xl leading-snug transition group-hover:text-ink/70 sm:text-[22px]">
            {item.title}
          </h2>
          {preview && (
            <p className="mt-2 line-clamp-2 text-base leading-relaxed text-ink-soft sm:text-[17px]">{preview}</p>
          )}
          {item.readTime && <p className="mt-4 font-ui text-[13px] text-ink-soft">{item.readTime}</p>}
        </div>
        {item.coverImage && (
          <Image
            src={item.coverImage}
            alt=""
            unoptimized={item.coverImage.startsWith("http")}
            width={160}
            height={107}
            sizes="(min-width: 640px) 160px, 72px"
            className="h-[72px] w-[72px] object-cover object-[center_35%] sm:h-[107px] sm:w-[160px]"
          />
        )}
      </Link>
    </article>
  );
}

export function Feed({ items }: { items: WriterItem[] | null }) {
  const c = useWriterCopy();
  if (items === null) return <p className="py-10 font-ui text-sm text-ink-soft">{c.loading}</p>;
  if (items.length === 0) return <p className="py-10 font-ui text-sm text-ink-soft">{c.empty}</p>;
  return (
    <div>
      {items.map((item) => (
        <FeedRow key={item.id} item={item} />
      ))}
    </div>
  );
}

/** Deterministic ragged top and bottom edge, so a sheet tears the same way on every render. */
function tornEdge(seed: number, teeth = 38, depthPx = 9) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= teeth; i++) {
    top.push(`${((i / teeth) * 100).toFixed(2)}% ${(rand() * depthPx).toFixed(1)}px`);
  }
  for (let i = teeth; i >= 0; i--) {
    bottom.push(`${((i / teeth) * 100).toFixed(2)}% calc(100% - ${(rand() * depthPx).toFixed(1)}px)`);
  }
  return `polygon(${[...top, ...bottom].join(", ")})`;
}

const SHEET_CHAPTERS = 4;

/** A novel as a page torn from a manuscript, laid left or right on the desk. */
export function NovelSheet({ novel, side, seed }: { novel: WriterItem; side: "left" | "right"; seed: number }) {
  const c = useWriterCopy();
  const reduce = useReducedMotion();
  const tilt = side === "left" ? -0.8 : 0.8;
  const chapters = novel.chapters ?? [];
  const first = chapters[0];

  return (
    <motion.div
      className={`group relative w-full sm:w-[90%] ${side === "right" ? "sm:ml-auto" : ""}`}
      initial={reduce ? false : { opacity: 0, x: side === "left" ? -36 : 36, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate: tilt }}
      whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* the page underneath, slightly askew */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-wash"
        style={{ clipPath: tornEdge(seed + 7), transform: `rotate(${-tilt * 2}deg) translate(${side === "left" ? 8 : -8}px, 6px)` }}
      />
      <div className="relative drop-shadow-[0_14px_18px_rgba(60,42,25,0.13)] transition-[filter] duration-500 group-hover:drop-shadow-[0_22px_26px_rgba(60,42,25,0.18)]">
        {/* the torn paper is its own layer, so the cover is free to leave it */}
        <div aria-hidden="true" className="paper-grain absolute inset-0" style={{ clipPath: tornEdge(seed) }} />

        <div
          className={`relative px-7 pb-10 pt-[10.5rem] sm:py-12 ${
            side === "left" ? "sm:pl-[13rem] sm:pr-10" : "sm:pl-10 sm:pr-[13rem]"
          }`}
        >
          <div className="min-w-0">
            <p className="font-ui text-[13px] text-ink-soft">
              {chapters.length > 0 ? (
                <>
                  {novel.isPreview ? c.preview(chapters.length) : c.sections(chapters.length)}
                  {novel.readTime ? `, ${novel.readTime}` : ""}
                </>
              ) : (
                novel.readTime || "Coming Soon!"
              )}
            </p>
            <h2 className="mt-2 text-[28px] leading-tight sm:text-[32px]">{novel.title}</h2>
            {novel.subtitle && <p className="mt-1.5 font-ui text-base text-ink-soft">{novel.subtitle}</p>}
            <p className="mt-4 line-clamp-5 text-[17px] leading-relaxed text-ink/85">{novel.synopsis}</p>

            {chapters.length > 0 && (
              <ul className="mt-5 space-y-1 font-ui text-sm">
                {chapters.slice(0, SHEET_CHAPTERS).map((ch) => (
                  <li key={ch.id}>
                    <Link
                      href={`/writer/read/${novel.slug}?bab=${ch.chapterNumber}`}
                      className="text-ink-soft underline decoration-ink/20 underline-offset-4 transition hover:text-ink hover:decoration-ink"
                    >
                      {ch.title}
                    </Link>
                  </li>
                ))}
                {chapters.length > SHEET_CHAPTERS && (
                  <li className="pt-1 text-ink-soft">{c.moreSections(chapters.length - SHEET_CHAPTERS)}</li>
                )}
              </ul>
            )}

            {first ? (
              <Link
                href={`/writer/read/${novel.slug}`}
                className="mt-7 inline-flex rounded-full bg-ink px-5 py-2.5 font-ui text-sm font-medium text-paper transition hover:bg-ink/85"
              >
                {c.readFrom(first.title.split(":")[0].toLowerCase())}
              </Link>
            ) : (
              <span className="mt-7 inline-flex rounded-full border border-ink/20 px-5 py-2.5 font-ui text-sm font-medium text-ink-soft">
                Coming Soon!
              </span>
            )}
          </div>
        </div>

        <div
          className={`absolute -top-10 w-32 transition-transform duration-500 ease-out group-hover:-translate-y-3 motion-reduce:transition-none sm:-top-12 sm:w-48 ${
            side === "left"
              ? "left-6 -rotate-3 group-hover:-rotate-6 sm:-left-10"
              : "right-6 rotate-3 group-hover:rotate-6 sm:-right-7"
          }`}
        >
          <Cover item={novel} />
        </div>
      </div>
    </motion.div>
  );
}

/** A book cover that sits on top of its container rather than inside it. */
function Cover({ item }: { item: WriterItem }) {
  const c = useWriterCopy();
  const shadow = "shadow-[0_28px_40px_-14px_rgba(36,28,21,0.55),0_6px_14px_rgba(36,28,21,0.18)]";
  return (
    <div className={`relative aspect-[2/3] w-full overflow-hidden ${shadow}`}>
      {item.coverImage ? (
        <Image
          src={item.coverImage}
          alt={c.cover(item.title)}
          unoptimized={item.coverImage.startsWith("http")}
          fill
          sizes="(min-width: 640px) 192px, 128px"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full flex-col justify-between bg-ink p-4 text-paper">
          <span className="font-serif text-xl leading-tight">{item.title}</span>
          <span className="font-ui text-[10px] text-paper/60">Dewa Dharma Putra</span>
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 to-transparent" />
    </div>
  );
}

/** A short story gets more weight than a poem: a washed panel with its cover leaning out of the top. */
export function StoryPanel({ story }: { story: WriterItem }) {
  const c = useWriterCopy();
  return (
    <article className="mt-20 first:mt-16 sm:mt-24">
      <Link
        href={`/writer/read/${story.slug}`}
        className="group relative block bg-wash/70 px-6 pb-8 pt-[8.5rem] transition-colors hover:bg-wash sm:min-h-[15rem] sm:py-9 sm:pl-8 sm:pr-[13rem]"
      >
        <p className="font-ui text-[13px] text-ink-soft">{c.category.cerpen}, {c.formatDate(story.date)}</p>
        <h2 className="mt-2 text-2xl leading-snug sm:text-[26px]">{story.title}</h2>
        <p className="mt-3 line-clamp-3 whitespace-pre-line text-[17px] leading-relaxed text-ink-soft">
          {story.synopsis}
        </p>
        {story.readTime && <p className="mt-4 font-ui text-[13px] text-ink-soft">{story.readTime}</p>}

        <div className="absolute -top-10 right-6 w-24 rotate-3 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-6 motion-reduce:transition-none sm:-right-8 sm:-top-14 sm:w-40">
          <Cover item={story} />
        </div>
      </Link>
    </article>
  );
}

export function StoryList({ stories }: { stories: WriterItem[] | null }) {
  const c = useWriterCopy();
  if (stories === null) return <p className="py-10 font-ui text-sm text-ink-soft">{c.loading}</p>;
  return (
    <div>
      {stories.map((story) => (
        <StoryPanel key={story.id} story={story} />
      ))}
    </div>
  );
}

export function Pager({ page, pages, onChange }: { page: number; pages: number; onChange: (page: number) => void }) {
  const c = useWriterCopy();
  const step = "inline-flex h-11 items-center gap-1.5 px-2 text-ink-soft transition hover:text-ink disabled:pointer-events-none disabled:opacity-30";
  return (
    <nav aria-label={c.pager.label} className="mt-10 flex items-center justify-between gap-4 font-ui text-sm">
      <button type="button" className={step} disabled={page === 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">{c.pager.prev}</span>
      </button>

      <span className="tabular-nums text-ink-soft sm:hidden">
        {c.pager.page(page, pages)}
      </span>
      <ol className="hidden items-center gap-1 sm:flex">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <button
              type="button"
              aria-label={c.pager.goTo(n)}
              aria-current={n === page ? "page" : undefined}
              onClick={() => onChange(n)}
              className={`h-10 w-10 rounded-full tabular-nums transition ${
                n === page ? "bg-ink text-paper" : "text-ink-soft hover:bg-wash hover:text-ink"
              }`}
            >
              {n}
            </button>
          </li>
        ))}
      </ol>

      <button type="button" className={step} disabled={page === pages} onClick={() => onChange(page + 1)}>
        <span className="hidden sm:inline">{c.pager.next}</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

/** Novels laid alternately left and right, over a barely-there photo of a bookshelf. */
export function NovelShelf({ novels }: { novels: WriterItem[] }) {
  if (novels.length === 0) return null;
  return (
    <div className="relative pb-10 pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.06] sepia"
        style={{
          backgroundImage: `url(${woodImages.library})`,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />
      <div className="relative space-y-24 sm:space-y-28">
        {novels.map((novel, i) => (
          <NovelSheet key={novel.id} novel={novel} side={i % 2 === 0 ? "left" : "right"} seed={101 + i * 53} />
        ))}
      </div>
    </div>
  );
}
