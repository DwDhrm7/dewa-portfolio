"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
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
import defaultWriterData from "@/data/writer-content.json";

export default function ReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const initialBab = parseInt(searchParams?.get("bab") || "1", 10);

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

  // Fetch or find item
  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch("/api/writer");
        const json = await res.json();
        if (json.success && json.data) {
          const found = (json.data as WriterItem[]).find(
            (it) => it.slug === slug || it.id === slug
          );
          if (found) {
            setItem(found);
            // Apply default typography from item if available
            if (found.typography) {
              setFontSize(found.typography.fontSize || "base");
              setAlignment(found.typography.alignment || (found.category === "puisi" ? "center" : "justify"));
              setPaperTheme(found.typography.paperTheme || "cream");
            }
            return;
          }
        }
      } catch (err) {
        console.error(err);
      }

      // Fallback to defaultWriterData
      const found = (defaultWriterData as WriterItem[]).find(
        (it) => it.slug === slug || it.id === slug
      );
      if (found) {
        setItem(found);
        if (found.typography) {
          setFontSize(found.typography.fontSize || "base");
          setAlignment(found.typography.alignment || (found.category === "puisi" ? "center" : "justify"));
          setPaperTheme(found.typography.paperTheme || "cream");
        }
      }
    }

    if (slug) fetchItem();
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
      setCurrentChapterNum(parseInt(babParam, 10));
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

  // Font size map
  const sizeClasses: Record<TypographyFontSize, string> = {
    sm: "text-base sm:text-lg leading-relaxed",
    base: "text-lg sm:text-xl leading-relaxed",
    lg: "text-xl sm:text-2xl leading-loose",
    xl: "text-2xl sm:text-3xl leading-loose",
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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] text-neutral-800">
        <div className="text-center">
          <BookOpen size={36} className="mx-auto text-stone-800 animate-pulse mb-4" />
          <p className="text-lg">Membuka lembaran karya...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg} ${currentTheme.text}`}>
      
      {/* Top Reading Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 h-0.5 bg-black/10">
        <div 
          className="h-full bg-brass transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* FLOATING TOP CONTROLS (Distraction-Free Capable) */}
      {/* ========================================================================= */}
      <header className={`fixed top-24 left-4 right-4 z-40 transition-opacity duration-300 ${
        isDistractionFree ? "opacity-0 hover:opacity-100" : "opacity-100"
      }`}>
        <div className="mx-auto max-w-4xl flex items-center justify-between rounded-sm border border-oak/30 bg-parchment/90 p-3 shadow-lg backdrop-blur-xl text-neutral-900">
          
          {/* Back button */}
          <Link
            href={`/writer/${item.category === "novel" ? "novel" : item.category === "puisi" ? "puisi" : "cerpen"}`}
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-black/5 transition"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Koleksi {item.category}</span>
          </Link>

          {/* Title & Progress info */}
          <div className="text-center max-w-[200px] sm:max-w-xs truncate">
            <span className="italic text-xs font-semibold block truncate">
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
              title="Salin tautan baca"
              className="rounded-lg p-2 text-neutral-600 hover:bg-black/5 transition"
            >
              {copied ? <Check size={15} className="text-neutral-600" /> : <Share2 size={15} />}
            </button>

            {/* Typography Customizer Drawer Trigger */}
            <button
              onClick={() => setShowToolbar(!showToolbar)}
              title="Pengaturan Tampilan & Tipografi"
              className={`rounded-lg p-2 transition ${
                showToolbar ? "bg-stone-100 text-stone-900" : "text-neutral-600 hover:bg-black/5"
              }`}
            >
              <Settings2 size={16} />
            </button>

            {/* Distraction Free Mode Toggle */}
            <button
              onClick={() => setIsDistractionFree(!isDistractionFree)}
              title={isDistractionFree ? "Keluar Mode Hening" : "Mode Hening (Distraction-Free)"}
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
            className="fixed top-40 left-4 right-4 z-40 mx-auto max-w-xl rounded-sm border border-oak/30 bg-parchment p-5 shadow-2xl backdrop-blur-2xl text-neutral-900"
          >
            <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
              <span className="italic text-xs font-bold text-stone-950 uppercase tracking-wider flex items-center gap-2">
                <Type size={14} className="text-stone-700" />
                Kustomisasi Ruang Baca
              </span>
              <button 
                onClick={() => setShowToolbar(false)}
                className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-black"
              >
                <X size={13} />
                Tutup
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Font Size & Alignment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-500 mb-1.5 block">Ukuran Huruf:</label>
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
                          fontSize === s.id ? "bg-walnut-800 text-parchment" : "hover:bg-black/5 text-neutral-700"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-neutral-500 mb-1.5 block">Perataan Teks:</label>
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
                          alignment === a.id ? "bg-walnut-800 text-parchment" : "hover:bg-black/5 text-neutral-700"
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
                <label className="text-neutral-500 mb-1.5 block">Nuansa Kertas / Latar:</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: "cream", label: "Krem", bg: "bg-[#FAF7F0] text-black border-stone-900/30" },
                    { id: "parchment", label: "Perkamen", bg: "bg-[#F4ECD8] text-black border-stone-900/40" },
                    { id: "sepia", label: "Sepia", bg: "bg-[#EFE5D0] text-black border-stone-800/40" },
                    { id: "clean-white", label: "Putih", bg: "bg-white text-black border-neutral-300" },
                    { id: "obsidian", label: "Malam", bg: "bg-[#141414] text-white border-neutral-700" },
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
      <main className="mx-auto max-w-3xl px-6 pt-44 pb-36 md:pt-52">
        
        {/* Article/Story Header */}
        <header className="mb-14 text-center border-b border-black/10 pb-12">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs italic mb-4">
            <span className="uppercase tracking-widest text-[10px] font-bold">
              {item.category}
            </span>
            <span>·</span>
            <span>{item.date}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] mb-4">
            {item.title}
          </h1>

          {item.subtitle && (
            <p className="italic text-lg sm:text-xl text-neutral-600 max-w-xl mx-auto mb-6">
              {item.subtitle}
            </p>
          )}

          {/* Novel Chapter Selector Dropdown if Novel */}
          {item.category === "novel" && item.chapters && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-black/15 bg-black/[0.03] px-5 py-3">
              <BookOpen size={16} className="text-stone-700" />
              <select
                value={currentChapterNum}
                onChange={(e) => setCurrentChapterNum(parseInt(e.target.value, 10))}
                className="bg-transparent text-sm font-semibold outline-none cursor-pointer"
              >
                {item.chapters.map((ch) => (
                  <option key={ch.id} value={ch.chapterNumber} className="text-black bg-white">
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>
          )}

        </header>

        {/* ========================================================================= */}
        {/* BODY TEXT RENDERING */}
        {/* ========================================================================= */}
        <article className={`font-garamond ${sizeClasses[fontSize]} ${alignClasses[alignment]}`}>
          
          {/* If Novel: Render selected Chapter */}
          {item.category === "novel" && currentChapter ? (
            <div>
              <div className="text-center mb-10">
                <span className="italic text-xs tracking-widest text-stone-800 uppercase block mb-1">
                  BAB {currentChapter.chapterNumber}
                </span>
                <h2 className="text-2xl sm:text-3xl font-normal">
                  {currentChapter.title}
                </h2>
              </div>

              <div className="space-y-6 whitespace-pre-line">
                {currentChapter.content}
              </div>

              {/* Chapter Navigation Buttons at bottom */}
              <div className="mt-16 pt-10 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {currentChapterNum > 1 ? (
                  <button
                    onClick={() => {
                      setCurrentChapterNum(currentChapterNum - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 rounded-xl border border-black/15 px-5 py-3 text-sm font-medium hover:bg-black/5 transition"
                  >
                    <ChevronLeft size={16} />
                    <span>Bab Sebelumnya ({currentChapterNum - 1})</span>
                  </button>
                ) : <div />}

                {item.chapters && currentChapterNum < item.chapters.length && (
                  <button
                    onClick={() => {
                      setCurrentChapterNum(currentChapterNum + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 rounded-xl bg-walnut-800 px-6 py-3 text-sm font-medium text-white hover:bg-walnut-950 transition shadow-md"
                  >
                    <span>Lanjut ke Bab {currentChapterNum + 1}</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Puisi or Cerpen: Render single content */
            <div className="space-y-6 whitespace-pre-line">
              {item.content}
            </div>
          )}

        </article>

        {/* Epilogue / Ending ornament */}
        <div className="mt-20 pt-12 border-t border-black/10 text-center text-xs text-neutral-500">
          <Ornament className="mb-4" />
          <p>Karya oleh I Dewa Made Dharma Putra Santika</p>
          <div className="mt-6">
            <Link
              href="/writer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-2.5 text-xs uppercase tracking-wider text-neutral-800 hover:bg-black/5 transition"
            >
              <ArrowLeft size={13} />
              <span>Kembali ke Rak Sastra</span>
            </Link>
          </div>
        </div>

      </main>

    </div>
  );
}
