"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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

const SCENE_BREAK = "* * *";

function parseChapter(value: string | null | undefined): number {
  const n = parseInt(value ?? "", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

/** Poems keep their line breaks and stanzas; prose becomes paragraphs; "* * *" becomes an ornament. */
function Body({ text, poem }: { text: string; poem: boolean }) {
  return (
    <>
      {text.split(/\n{2,}/).map((block, i) =>
        block.trim() === SCENE_BREAK ? (
          <Ornament key={i} className="my-12" />
        ) : block.startsWith("## ") ? (
          <h2 key={i} className="mb-6 mt-14 text-[24px] leading-snug first:mt-0">
            {block.slice(3)}
          </h2>
        ) : (
          <p key={i} className={poem ? "mb-[1.6em] whitespace-pre-wrap" : "mb-[1.25em] whitespace-pre-line"}>
            {block}
          </p>
        )
      )}
    </>
  );
}

export default function ReaderPage() {
  const c = useWriterCopy();
  const r = c.reader;
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Coming from a list on this site, go back to it so it reopens where the reader left it.
  const backInHistory = (event: React.MouseEvent) => {
    if (!canGoBackInApp()) return;
    event.preventDefault();
    router.back();
  };
  const initialBab = parseChapter(searchParams?.get("bab"));

  const [item, setItem] = useState<WriterItem | null>(null);
  const [currentChapterNum, setCurrentChapterNum] = useState<number>(initialBab);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [isDistractionFree, setIsDistractionFree] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Reader Customizer States
  const [fontSize, setFontSize] = useState<TypographyFontSize>("base");
  const [alignment, setAlignment] = useState<TypographyAlignment>("justify");
  const [paperTheme, setPaperTheme] = useState<TypographyPaperTheme>("cream");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/writer?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.success || !json.data) {
          setNotFound(true);
          return;
        }
        const found = json.data as WriterItem;
        setItem(found);
        setFontSize(found.typography?.fontSize || "base");
        setAlignment(found.typography?.alignment || "left");
        setPaperTheme(found.typography?.paperTheme || "cream");
      })
      .catch(() => setNotFound(true));
  }, [slug]);

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

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
        <div className="text-center">
          {notFound ? (
            <>
              <p className="text-xl">{r.notFound}</p>
              <Link href="/writer" className="mt-4 inline-block font-ui text-sm font-medium text-ink">
                {r.backHome}
              </Link>
            </>
          ) : (
            <BookOpen size={32} className="mx-auto animate-pulse text-oak" />
          )}
        </div>
      </div>
    );
  }

  const isPoem = item.category === "puisi";
  const isLastChapter = !item.chapters || currentChapterNum >= item.chapters.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg} ${currentTheme.text}`}>
      
      {/* Top Reading Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 h-0.5 bg-black/10">
        <div 
          className="h-full bg-ink transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* FLOATING TOP CONTROLS (Distraction-Free Capable) */}
      {/* ========================================================================= */}
      <header className={`fixed top-24 left-4 right-4 z-40 transition-opacity duration-300 ${
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
          className={`font-serif tracking-[-0.003em] ${sizeClasses[fontSize]} ${alignClasses[alignment]}`}
        >
          {item.category === "novel" && currentChapter ? (
            <>
              <h2 className="mb-8 text-[26px] leading-tight">{currentChapter.title}</h2>
              <Body text={currentChapter.content} poem={false} />
            </>
          ) : (
            <Body text={item.content ?? ""} poem={isPoem} />
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

        <div className={`mt-20 border-t ${currentTheme.border} pt-12 text-center`}>
          <Ornament className="mb-5" />
          <p className="font-ui text-sm opacity-60">{r.byline}</p>
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
