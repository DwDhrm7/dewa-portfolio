"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { WriterItem, WriterCategory } from "@/types/writer";
import { formatDate } from "./useWriterItems";
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

const categoryLabel: Record<WriterCategory, string> = { puisi: "Puisi", cerpen: "Cerpen", novel: "Novel" };

const achievements = [
  "Juara I Penulisan Puisi, PEKSIMIDA Bali 2026",
  "Delegasi Bali, PEKSIMINAS 2026",
  "Juara I Baca Puisi Putra, PEKSIMIDA Bali 2024",
  "Juara I Baca Puisi Nasional, CORISINDO 2024",
  "Juara II Baca Puisi Nasional, OFSN 2024",
];

type Tab = "beranda" | WriterCategory;

const tabs: { id: Tab; label: string; href: string }[] = [
  { id: "beranda", label: "Beranda", href: "/writer" },
  { id: "puisi", label: "Puisi", href: "/writer/puisi" },
  { id: "cerpen", label: "Cerpen", href: "/writer/cerpen" },
  { id: "novel", label: "Novel", href: "/writer/novel" },
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
  const count = (c: WriterCategory) => items?.filter((i) => i.category === c).length;

  return (
    <div className="mx-auto max-w-[1192px] px-6 pb-24 pt-28 md:pt-32">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div className="min-w-0">
          <h1 className="text-[34px] leading-tight sm:text-[42px]">Dewa Dharma Putra</h1>

          <nav
            aria-label="Kategori karya"
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
                  {tab.label}
                  {n !== undefined && <span className="tabular-nums text-xs text-ink-soft">{n}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-2">{children}</div>
        </div>

        <aside className="mt-16 border-t border-ink/10 pt-10 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
          <div className="lg:sticky lg:top-28">
            <p className="font-ui text-base font-semibold">I Dewa Made Dharma Putra Santika</p>
            <p className="mt-3 font-ui text-sm leading-relaxed text-ink-soft">
              Penyair muda asal Tabanan, Bali. Tumbuh dari panggung Teater Jineng dan kini berteater di Teater
              Biner, ITB STIKOM Bali. Menulis puisi romansa tentang kerinduan, kehilangan, dan harapan, banyak
              terinspirasi oleh Sapardi Djoko Damono dan Alma Neira.
            </p>

            <p className="mt-10 font-ui text-base font-semibold">Prestasi</p>
            <ul className="mt-4 space-y-3 font-ui text-sm text-ink-soft">
              {achievements.map((a) => (
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
  const preview = item.category === "puisi" ? poemPreview(item) : item.synopsis;

  return (
    <article className="border-b border-ink/10 py-8">
      <Link href={`/writer/read/${item.slug}`} className="group grid grid-cols-[minmax(0,1fr)_auto] gap-6 sm:gap-10">
        <div className="min-w-0">
          <p className="font-ui text-[13px] text-ink-soft">
            {categoryLabel[item.category]}, {formatDate(item.date)}
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
          <img
            src={item.coverImage}
            alt=""
            className="h-[72px] w-[72px] object-cover object-[center_35%] sm:h-[107px] sm:w-[160px]"
          />
        )}
      </Link>
    </article>
  );
}

export function Feed({ items }: { items: WriterItem[] | null }) {
  if (items === null) return <p className="py-10 font-ui text-sm text-ink-soft">Memuat karya...</p>;
  if (items.length === 0) return <p className="py-10 font-ui text-sm text-ink-soft">Belum ada karya di sini.</p>;
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

/** A novel as a page torn from a manuscript, laid left or right on the desk. */
export function NovelSheet({ novel, side, seed }: { novel: WriterItem; side: "left" | "right"; seed: number }) {
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
        <div
          className={`paper-grain flex flex-col gap-7 px-7 py-10 sm:gap-9 sm:px-10 sm:py-12 ${
            side === "left" ? "sm:flex-row" : "sm:flex-row-reverse"
          }`}
          style={{ clipPath: tornEdge(seed) }}
        >
          <div className="w-28 shrink-0 sm:w-36">
            {novel.coverImage ? (
              <img
                src={novel.coverImage}
                alt={`Sampul ${novel.title}`}
                className="aspect-[848/1200] w-full object-cover shadow-[2px_6px_14px_rgba(36,28,21,0.25)]"
              />
            ) : (
              <div className="flex aspect-[848/1200] w-full flex-col justify-between bg-ink p-3 text-paper shadow-[2px_6px_14px_rgba(36,28,21,0.25)]">
                <span className="font-serif text-lg leading-tight">{novel.title}</span>
                <span className="font-ui text-[10px] text-paper/60">Dewa Dharma Putra</span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-ui text-[13px] text-ink-soft">
              {novel.isPreview ? `Pratinjau, ${chapters.length} bagian` : `${chapters.length} bagian`}
              {novel.readTime ? `, ${novel.readTime}` : ""}
            </p>
            <h2 className="mt-2 text-[28px] leading-tight sm:text-[32px]">{novel.title}</h2>
            {novel.subtitle && <p className="mt-1.5 font-ui text-base text-ink-soft">{novel.subtitle}</p>}
            <p className="mt-4 line-clamp-5 text-[17px] leading-relaxed text-ink/85">{novel.synopsis}</p>

            {chapters.length > 0 && (
              <ul className="mt-5 space-y-1 font-ui text-sm">
                {chapters.map((ch) => (
                  <li key={ch.id}>
                    <Link
                      href={`/writer/read/${novel.slug}?bab=${ch.chapterNumber}`}
                      className="text-ink-soft underline decoration-ink/20 underline-offset-4 transition hover:text-ink hover:decoration-ink"
                    >
                      {ch.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {first && (
              <Link
                href={`/writer/read/${novel.slug}`}
                className="mt-7 inline-flex rounded-full bg-ink px-5 py-2.5 font-ui text-sm font-medium text-paper transition hover:bg-ink/85"
              >
                Baca dari {first.title.split(":")[0].toLowerCase()}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Novels laid alternately left and right, over a barely-there photo of a bookshelf. */
export function NovelShelf({ novels }: { novels: WriterItem[] }) {
  if (novels.length === 0) return null;
  return (
    <div className="relative py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.06] sepia"
        style={{
          backgroundImage: `url(${woodImages.library})`,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />
      <div className="relative space-y-14 sm:space-y-16">
        {novels.map((novel, i) => (
          <NovelSheet key={novel.id} novel={novel} side={i % 2 === 0 ? "left" : "right"} seed={101 + i * 53} />
        ))}
      </div>
    </div>
  );
}
