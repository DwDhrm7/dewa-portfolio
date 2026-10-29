"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Settings2, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Type, 
  Sun, 
  Moon, 
  Palette,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Share2,
  Check,
  X
} from "lucide-react";
import { Ornament } from "@/components/writer/Room";
import { motion, AnimatePresence } from "framer-motion";
import { WriterItem, TypographyPaperTheme, TypographyFontSize, TypographyAlignment } from "@/types/writer";
import { useWriterCopy } from "@/components/writer/copy";
import { canGoBackInApp } from "@/components/ScrollMemory";
import LazyComments from "@/components/writer/LazyComments";
import { commentsEnabled } from "@/lib/supabase";

const SCENE_BREAK = "* * *";

function parseChapter(value: string | null | undefined): number {
  const n = parseInt(value ?? "", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

const LIST_ITEM = /^(•|\d+\.)\t/;
const FOOTNOTE = /^[⁰¹²³⁴⁵⁶⁷⁸⁹]+ /;
const MARGIN_VOICE = /^Pinggir:?\s+/;
const BLOCK_KIND = /^::([a-z]+):: /;
const INLINE_TAG = /<(\/?)(b|i|sc|sup)>/g;

/** Emphasis carried over from the manuscript: <b>, <i>, <sc> (small caps) and <sup>. Drawn as elements, never as HTML. */
function Inline({ text }: { text: string }) {
  if (!text.includes("<")) return <>{text}</>;
  const root: React.ReactNode[] = [];
  const open: { tag: string; nodes: React.ReactNode[] }[] = [];
  const into = () => (open.length ? open[open.length - 1].nodes : root);
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(INLINE_TAG)) {
    const at = match.index ?? 0;
    if (at > last) into().push(text.slice(last, at));
    last = at + match[0].length;
    const [, closing, tag] = match;
    if (!closing) {
      open.push({ tag, nodes: [] });
    } else if (open.length && open[open.length - 1].tag === tag) {
      const done = open.pop()!;
      const k = key++;
      into().push(
        tag === "b" ? (
          <strong key={k}>{done.nodes}</strong>
        ) : tag === "i" ? (
          <em key={k}>{done.nodes}</em>
        ) : tag === "sup" ? (
          <sup key={k}>{done.nodes}</sup>
        ) : (
          <span key={k} className="[font-variant-caps:small-caps] tracking-[0.03em]">
            {done.nodes}
          </span>
        )
      );
    }
  }
  if (last < text.length) into().push(text.slice(last));
  while (open.length) into().push(...open.pop()!.nodes); // an unclosed tag just loses its emphasis
  return <>{root}</>;
}

/** How each kind of block in a manuscript is set, taken from the printed layout. */
const KIND: Record<string, string> = {
  tr: "mb-[0.45em] ml-[1.5em] text-left text-[0.9em] leading-[1.35]",
  pg: "my-[0.9em] ml-[1.6em] mr-[0.8em] border-l-2 border-dotted pl-4 text-left text-[0.92em] italic opacity-80",
  news: "my-[0.9em] ml-[1em] mr-[0.8em] border px-3 py-2 text-[0.82em] leading-[1.35]",
  lead: "mb-[0.35em] mt-[1em] text-left",
  date: "mb-[1.2em] text-center text-[0.82em] italic opacity-70",
  formula: "my-[0.7em] text-center italic",
  term: "mb-[0.5em] pl-[0.9em] -indent-[0.9em] text-[0.88em] leading-[1.35]",
  defn: "mb-[0.5em] ml-[0.9em] text-[0.88em] leading-[1.35]",
  ref: "mb-[0.4em] pl-[1.1em] -indent-[1.1em] text-left text-[0.82em] leading-[1.3]",
  quote: "my-[0.5em] ml-[0.6em] border-l-2 pl-3 text-left text-[0.85em] italic opacity-80",
  stz: "mb-[1.4em] text-left",
  center: "mb-[1.4em] text-center",
  epigraph: "mb-[1.6em] text-center italic",
  insert: "my-[0.9em] ml-[2em] text-left italic",
};

type Layout = "plain" | "garamond" | "times";
const FRAMED = new Set(["pg", "news", "quote"]);

function Table({ block, border }: { block: string; border: string }) {
  const rows = block.split("\n").map((line) => line.replace(/^\|\s*|\s*\|$/g, "").split(/\s*\|\s*/));
  const [head, ...body] = rows;
  return (
    <div className="mb-[1.5em] overflow-x-auto">
      <table className="w-full border-collapse font-ui text-[0.82em] leading-snug">
        <thead>
          <tr className={`border-b-2 ${border}`}>
            {head.map((cell, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold first:pl-0">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            <tr key={r} className={`border-b ${border}`}>
              {row.map((cell, i) => (
                <td key={i} className="px-3 py-2 align-top first:pl-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Poems keep their line breaks and stanzas; prose becomes paragraphs; "* * *" becomes an ornament.
 * Prose may also carry "## " section headings, "### " card headings, "| a | b |" tables, numbered or
 * bulleted items, footnotes and the journal's second voice. In book mode (a manuscript set in Garamond)
 * paragraphs are indented rather than spaced, and "::kind:: " blocks and inline emphasis follow the print.
 */
function Body({ text, poem, border, layout }: { text: string; poem: boolean; border: string; layout: Layout }) {
  const book = layout !== "plain";
  return (
    <>
      {text.split(/\n{2,}/).map((block, i) => {
        if (block.trim() === SCENE_BREAK) return <Ornament key={i} className="my-12" />;
        if (block.startsWith("## ")) {
          const [label, ...rest] = block.slice(3).split("\n");
          const title = rest.join(" ");
          const head = title ? (
            <>
              <span className="mb-[0.6em] block text-[0.62em] font-normal uppercase tracking-[0.25em] opacity-60">{label}</span>
              {title}
            </>
          ) : (
            label
          );
          const cls = !book
            ? "mb-6 mt-14 text-[24px] leading-snug first:mt-0"
            : layout === "garamond"
              ? "mb-[0.9em] mt-[2.2em] text-center text-[1.05em] font-normal tracking-[0.14em] [font-variant-caps:small-caps] first:mt-0"
              : "mb-[1.1em] mt-[2.4em] text-center text-[1.12em] font-normal first:mt-0";
          return (
            <h2 key={i} className={cls}>
              {head}
            </h2>
          );
        }
        if (poem)
          return (
            <p key={i} className="mb-[1.6em] whitespace-pre-wrap">
              {block}
            </p>
          );
        if (block.startsWith("> "))
          return (
            <blockquote key={i} className={`mb-[1.1em] whitespace-pre-line border-l-2 ${border} pl-4 italic opacity-80`}>
              {block.replace(/^> ?/gm, "")}
            </blockquote>
          );
        if (block.startsWith("### "))
          return (
            <h3 key={i} className={`mb-3 mt-10 border-t ${border} pt-6 font-ui text-[0.85em] font-semibold uppercase tracking-[0.08em]`}>
              {block.slice(4)}
            </h3>
          );
        if (block.startsWith("| ")) return <Table key={i} block={block} border={border} />;
        const item = LIST_ITEM.exec(block);
        if (item)
          return (
            <p key={i} className="mb-[0.6em] flex gap-3 pl-1">
              <span className="w-5 shrink-0 text-right tabular-nums opacity-60">{item[1]}</span>
              <span className="min-w-0">
                <Inline text={block.slice(item[0].length)} />
              </span>
            </p>
          );
        if (FOOTNOTE.test(block))
          return (
            <p key={i} className="mb-[0.8em] text-[0.8em] leading-relaxed opacity-75">
              {block}
            </p>
          );
        const kind = BLOCK_KIND.exec(block);
        if (kind)
          return (
            <p key={i} className={`whitespace-pre-line ${KIND[kind[1]] ?? ""} ${FRAMED.has(kind[1]) ? border : ""}`}>
              <Inline text={block.slice(kind[0].length)} />
            </p>
          );
        if (MARGIN_VOICE.test(block))
          return (
            <p key={i} className={`mb-[1.25em] whitespace-pre-line border-l-2 border-dotted ${border} pl-4 italic`}>
              <span className="not-italic font-ui text-[0.75em] font-semibold uppercase tracking-[0.12em] opacity-60">Pinggir</span>{" "}
              {block.replace(MARGIN_VOICE, "")}
            </p>
          );
        const indented = block.startsWith("\t");
        const content = indented ? block.slice(1) : block;
        return (
          <p key={i} className={book ? `whitespace-pre-line ${indented ? "[text-indent:var(--indent)]" : ""}` : "mb-[1.25em] whitespace-pre-line"}>
            <Inline text={content} />
          </p>
        );
      })}
    </>
  );
}

/** A chapter opening as in the printed book: a small label, the name in small capitals, an ornament. */
function ChapterHead({ title }: { title: string }) {
  const [label, ...rest] = title.split(": ");
  const name = rest.join(": ");
  return (
    <header className="mb-[2.4em] mt-2 text-center">
      {name && <p className="text-[0.62em] uppercase tracking-[0.28em] opacity-60">{label}</p>}
      <h2 className="mt-[0.7em] text-[1.9em] font-normal leading-tight tracking-[0.02em] [font-variant-caps:small-caps]">{name || label}</h2>
      <p aria-hidden="true" className="mt-[0.8em] text-[1.1em] opacity-40">
        ❧
      </p>
    </header>
  );
}

export default function Reader({ item }: { item: WriterItem }) {
  const c = useWriterCopy();
  const r = c.reader;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Coming from a list on this site, go back to it so it reopens where the reader left it.
  const backInHistory = (event: React.MouseEvent) => {
    if (!canGoBackInApp()) return;
    event.preventDefault();
    router.back();
  };
  const initialBab = parseChapter(searchParams?.get("bab"));

  const [currentChapterNum, setCurrentChapterNum] = useState<number>(initialBab);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [isDistractionFree, setIsDistractionFree] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Reader Customizer States
  const [fontSize, setFontSize] = useState<TypographyFontSize>(item.typography?.fontSize || "base");
  const [alignment, setAlignment] = useState<TypographyAlignment>(item.typography?.alignment || "left");
  const [paperTheme, setPaperTheme] = useState<TypographyPaperTheme>(item.typography?.paperTheme || "cream");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update currentChapterNum when searchParams changes
  useEffect(() => {
    const babParam = searchParams?.get("bab");
    if (babParam) {
      setCurrentChapterNum(parseChapter(babParam));
    }
  }, [searchParams]);

  // Current chapter for novel
  const currentChapter = useMemo(() => {
    if (!item?.chapters || item.chapters.length === 0) return null;
    return item.chapters.find((ch) => ch.chapterNumber === currentChapterNum) || item.chapters[0];
  }, [item, currentChapterNum]);

  // Theme styling map
  const themeClasses: Record<TypographyPaperTheme, { bg: string; text: string; border: string; accent: string }> = {
    cream: {
      bg: "bg-[#FAF7F0]",
      text: "text-[#262420]",
      border: "border-stone-900/10",
      accent: "text-stone-900",
    },
    parchment: {
      bg: "bg-[#F4ECD8]",
      text: "text-[#2B2319]",
      border: "border-stone-900/20",
      accent: "text-stone-950",
    },
    obsidian: {
      bg: "bg-[#121212]",
      text: "text-[#E6E6E6]",
      border: "border-white/10",
      accent: "text-stone-300",
    },
    sepia: {
      bg: "bg-[#EFE5D0]",
      text: "text-[#3D3225]",
      border: "border-stone-900/20",
      accent: "text-stone-900",
    },
    "clean-white": {
      bg: "bg-[#FFFFFF]",
      text: "text-[#1A1A1A]",
      border: "border-neutral-200",
      accent: "text-neutral-900",
    },
  };

  // Medium reads at 20px / 32px with a hair of negative tracking.
  // A manuscript set in Garamond keeps its printed layout: the face, tight leading, indents instead of gaps.
  const face = item.typography?.fontFamily;
  const layout: Layout = face === "garamond" ? "garamond" : face === "times" ? "times" : "plain";
  const book = layout !== "plain";
  const bookSizeClasses: Record<TypographyFontSize, string> = {
    sm: "text-[18px] sm:text-[19px]",
    base: "text-[20px] sm:text-[22px]",
    lg: "text-[22px] sm:text-[24px]",
    xl: "text-[24px] sm:text-[26px]",
  };
  // As set in the manuscripts: Garamond 1.25 with a 1.5em indent, Times 1.5 with a 1cm indent.
  const bookSet =
    layout === "garamond"
      ? { family: 'var(--font-garamond), "EB Garamond", Garamond, Georgia, serif', indent: "1.5em", leading: "leading-[1.4]" }
      : { family: 'var(--font-times), "Times New Roman", Tinos, Times, serif', indent: "2.3em", leading: "leading-[1.5]" };
  const sizeClasses: Record<TypographyFontSize, string> = {
    sm: "text-[17px] sm:text-[18px] leading-[1.65]",
    base: "text-[18px] sm:text-[20px] leading-[1.6]",
    lg: "text-[20px] sm:text-[22px] leading-[1.6]",
    xl: "text-[22px] sm:text-[24px] leading-[1.6]",
  };

  // Alignment map
  const alignClasses: Record<TypographyAlignment, string> = {
    left: "text-left",
    center: "text-center mx-auto",
    justify: "text-justify",
  };

  const currentTheme = themeClasses[paperTheme] || themeClasses.cream;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isPoem = item.category === "puisi";
  const isLastChapter = !item.chapters || currentChapterNum >= item.chapters.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg} ${currentTheme.text}`}>
      
      {/* Top Reading Progress Bar */}
      <div className="fixed inset-x-0 top-[65px] z-[41] h-0.5 bg-black/10">
        <div 
          className="h-full bg-ink transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* FLOATING TOP CONTROLS (Distraction-Free Capable) */}
      {/* ========================================================================= */}
      {/* The band is solid and sits flush under the site bar (64px + its 1px rule), so text never shows between them. */}
      <header className={`fixed inset-x-0 top-[65px] z-40 border-b px-4 pb-3 pt-4 transition-opacity duration-300 ${currentTheme.bg} ${currentTheme.border} ${
        isDistractionFree ? "opacity-0 hover:opacity-100" : "opacity-100"
      }`}>
        <div className="mx-auto max-w-4xl flex items-center justify-between rounded-sm border border-oak/30 bg-paper/95 p-3 shadow-lg backdrop-blur-xl text-neutral-900 font-ui">
          
          {/* Back button */}
          <Link
            href={`/writer/${item.category}`}
            onClick={backInHistory}
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-black/5 transition"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">{r.back}</span>
          </Link>

          {/* Title & Progress info */}
          <div className="text-center max-w-[200px] sm:max-w-xs truncate">
            <span className="text-xs font-semibold block truncate">
              {item.title}
            </span>
            {item.category === "novel" && currentChapter && (
              <span className="text-[10px] text-neutral-500 block truncate">
                {currentChapter.title}
              </span>
            )}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-1.5">
            
            {/* Share / Copy link */}
            <button
              onClick={handleShare}
              title={r.share}
              className="rounded-lg p-2 text-neutral-600 hover:bg-black/5 transition"
            >
              {copied ? <Check size={15} className="text-neutral-600" /> : <Share2 size={15} />}
            </button>

            {/* Typography Customizer Drawer Trigger */}
            <button
              onClick={() => setShowToolbar(!showToolbar)}
              title={r.settings}
              className={`rounded-lg p-2 transition ${
                showToolbar ? "bg-stone-100 text-stone-900" : "text-neutral-600 hover:bg-black/5"
              }`}
            >
              <Settings2 size={16} />
            </button>

            {/* Distraction Free Mode Toggle */}
            <button
              onClick={() => setIsDistractionFree(!isDistractionFree)}
              title={isDistractionFree ? r.quietOff : r.quietOn}
              className="rounded-lg p-2 text-neutral-600 hover:bg-black/5 transition"
            >
              {isDistractionFree ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* FLOATING READER CUSTOMIZER TOOLBAR PANEL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showToolbar && !isDistractionFree && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-40 left-4 right-4 z-40 mx-auto max-w-xl rounded-sm border border-oak/30 bg-paper p-5 shadow-2xl backdrop-blur-2xl text-neutral-900 font-ui"
          >
            <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
              <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                <Type size={14} className="text-stone-700" />
                {r.panelTitle}
              </span>
              <button 
                onClick={() => setShowToolbar(false)}
                className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-black"
              >
                <X size={13} />
                {r.close}
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Font Size & Alignment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-500 mb-1.5 block">{r.size}</label>
                  <div className="flex items-center gap-1.5 bg-black/[0.03] p-1 rounded-xl border border-black/10">
                    {[
                      { id: "sm", label: "A-" },
                      { id: "base", label: "A" },
                      { id: "lg", label: "A+" },
                      { id: "xl", label: "A++" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setFontSize(s.id as TypographyFontSize)}
                        className={`flex-1 py-1 rounded-lg text-center font-bold transition ${
                          fontSize === s.id ? "bg-ink text-paper" : "hover:bg-black/5 text-neutral-700"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-neutral-500 mb-1.5 block">{r.align}</label>
                  <div className="flex items-center gap-1.5 bg-black/[0.03] p-1 rounded-xl border border-black/10">
                    {[
                      { id: "left", icon: AlignLeft, label: "Kiri" },
                      { id: "center", icon: AlignCenter, label: "Tengah" },
                      { id: "justify", icon: AlignJustify, label: "Rata" },
                    ].map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setAlignment(a.id as TypographyAlignment)}
                        className={`flex-1 py-1 rounded-lg flex items-center justify-center transition ${
                          alignment === a.id ? "bg-ink text-paper" : "hover:bg-black/5 text-neutral-700"
                        }`}
                      >
                        <a.icon size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Paper Theme Choice */}
              <div>
                <label className="text-neutral-500 mb-1.5 block">{r.paper}</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: "cream", label: r.themes["cream"], bg: "bg-[#FAF7F0] text-black border-stone-900/30" },
                    { id: "parchment", label: r.themes["parchment"], bg: "bg-[#F4ECD8] text-black border-stone-900/40" },
                    { id: "sepia", label: r.themes["sepia"], bg: "bg-[#EFE5D0] text-black border-stone-800/40" },
                    { id: "clean-white", label: r.themes["clean-white"], bg: "bg-white text-black border-neutral-300" },
                    { id: "obsidian", label: r.themes["obsidian"], bg: "bg-[#141414] text-white border-neutral-700" },
                  ].map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setPaperTheme(th.id as TypographyPaperTheme)}
                      className={`rounded-xl py-2 px-1 text-center border text-[11px] font-medium transition ${th.bg} ${
                        paperTheme === th.id ? "ring-2 ring-oak ring-offset-2" : ""
                      }`}
                    >
                      {th.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* READING CANVAS (THE ACTUAL CONTENT) */}
      {/* ========================================================================= */}
      <main className="mx-auto max-w-[680px] px-6 pb-36 pt-44 md:pt-52">
        <header className="mb-12">
          <h1 className="text-[34px] leading-[1.15] sm:text-[42px] sm:leading-[1.2]">{item.title}</h1>
          {item.subtitle && (
            <p className="mt-3 font-ui text-[20px] leading-snug opacity-60 sm:text-[22px]">{item.subtitle}</p>
          )}

          <div className={`mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-y ${currentTheme.border} py-4 font-ui text-sm opacity-70`}>
            <span className="font-medium">Dewa Dharma Putra</span>
            <span aria-hidden="true">·</span>
            <span>{item.readTime}</span>
            {!item.comingSoon && (
              <>
                <span aria-hidden="true">·</span>
                <span>{c.formatDate(item.date)}</span>
              </>
            )}
          </div>

          {item.category === "novel" && item.chapters && item.chapters.length > 1 && (
            <div className={`mt-6 inline-flex items-center gap-3 border ${currentTheme.border} px-4 py-2.5 font-ui text-sm`}>
              <BookOpen size={15} className="opacity-60" />
              <select
                value={currentChapterNum}
                onChange={(e) => setCurrentChapterNum(parseChapter(e.target.value))}
                className="cursor-pointer bg-transparent font-medium outline-none"
              >
                {item.chapters.map((ch) => (
                  <option key={ch.id} value={ch.chapterNumber} className="bg-white text-black">
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </header>

        <article
          lang={book ? "id" : undefined}
          style={book ? ({ fontFamily: bookSet.family, "--indent": bookSet.indent } as React.CSSProperties) : undefined}
          className={`${book ? `hyphens-auto [text-wrap:pretty] ${bookSet.leading}` : "font-serif tracking-[-0.003em]"} ${
            (book ? bookSizeClasses : sizeClasses)[fontSize]
          } ${alignClasses[alignment]}`}
        >
          {item.category === "novel" && currentChapter ? (
            <>
              {layout === "garamond" ? <ChapterHead title={currentChapter.title} /> : <h2 className="mb-8 text-[26px] leading-tight">{currentChapter.title}</h2>}
              <Body text={currentChapter.content} poem={false} border={currentTheme.border} layout={layout} />
            </>
          ) : (
            <Body text={item.content ?? ""} poem={isPoem} border={currentTheme.border} layout={layout} />
          )}
        </article>

        {item.category === "novel" && item.chapters && (
          <div className={`mt-14 flex flex-col items-center justify-between gap-4 border-t ${currentTheme.border} pt-10 font-ui sm:flex-row`}>
            {currentChapterNum > 1 ? (
              <button
                onClick={() => {
                  setCurrentChapterNum(currentChapterNum - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex items-center gap-2 border ${currentTheme.border} px-5 py-3 text-sm font-medium transition hover:bg-black/5`}
              >
                <ChevronLeft size={16} />
                {item.chapters[currentChapterNum - 2]?.title}
              </button>
            ) : (
              <div />
            )}

            {!isLastChapter && (
              <button
                onClick={() => {
                  setCurrentChapterNum(currentChapterNum + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/85"
              >
                {item.chapters[currentChapterNum]?.title}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}

        {item.isPreview && isLastChapter && (
          <p className="mt-10 text-center font-ui text-sm opacity-60">
            {r.previewEnd}
          </p>
        )}

        {commentsEnabled && !currentChapter?.title.startsWith("Lampiran") && (
          <LazyComments
            key={`${item.slug}:${currentChapter?.chapterNumber ?? "-"}`}
            workSlug={item.slug}
            chapter={item.category === "novel" && currentChapter ? currentChapter.chapterNumber : null}
            border={currentTheme.border}
          />
        )}

        <div className={`mt-20 border-t ${currentTheme.border} pt-12 text-center`}>
          <Ornament className="mb-5" />
          <p className="font-ui text-sm opacity-60">{r.byline}</p>
          <p className="mx-auto mt-4 max-w-md font-ui text-xs leading-relaxed opacity-50">{r.copyright}</p>
          <Link
            href={`/writer/${item.category}`}
            onClick={backInHistory}
            className={`mt-6 inline-flex items-center gap-2 border ${currentTheme.border} px-6 py-2.5 font-ui text-sm font-medium transition hover:bg-black/5`}
          >
            <ArrowLeft size={14} />
            {r.more[item.category]}
          </Link>
        </div>
      </main>

    </div>
  );
}
