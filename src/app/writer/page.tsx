"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Feather, 
  BookOpen, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  PenTool, 
  Layers, 
  Clock, 
  Calendar,
  Lock,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { WriterItem } from "@/types/writer";
import defaultWriterData from "@/data/writer-content.json";

export default function WriterHomePage() {
  const [items, setItems] = useState<WriterItem[]>(defaultWriterData as WriterItem[]);
  const [activeTab, setActiveTab] = useState<"all" | "puisi" | "cerpen" | "novel">("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/writer");
        const json = await res.json();
        if (json.success && json.data) {
          setItems(json.data);
        }
      } catch (err) {
        console.error("Failed to load writer items from API:", err);
      }
    }
    fetchItems();
  }, []);

  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter((item) => item.category === activeTab);

  const novelItem = items.find((item) => item.category === "novel");
  const poems = items.filter((item) => item.category === "puisi");
  const stories = items.filter((item) => item.category === "cerpen");

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-neutral-900 px-6 pb-28 pt-32 md:px-14 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        
        {/* ========================================================================= */}
        {/* LITERARY MASTHEAD / HERO */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-stone-900/15 pb-14"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-900/20 bg-stone-950/5 px-4 py-1.5 text-xs font-serif italic text-stone-900">
              <Feather size={13} className="text-stone-700" />
              <span>THE WRITER'S REALM // I DEWA MADE DHARMA PUTRA SANTIKA</span>
            </div>

            {/* Link to Studio CMS */}
            <Link
              href="/writer/studio"
              className="inline-flex items-center gap-2 rounded-full border border-stone-900/20 bg-white/80 px-4 py-1.5 text-xs font-serif font-medium text-stone-900 hover:bg-stone-900 hover:text-white transition shadow-sm"
            >
              <Lock size={12} className="text-stone-700 group-hover:text-white" />
              <span>Buka Studio CMS Penulis ✍</span>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-4xl">
              <span className="font-serif italic text-sm tracking-widest text-stone-800 uppercase block mb-3">
                Antologi Kata, Puisi & Prosa
              </span>
              <h1 className="font-fraunces text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-neutral-950 leading-[0.98]">
                Di mana logika berhenti,
                <br />
                <span className="italic font-light text-stone-950">kata-kata mulai bernapas.</span>
              </h1>
            </div>

            <p className="max-w-md font-serif text-lg leading-relaxed text-neutral-700">
              Menulis adalah cara saya merawat apa yang tak mampu dihitung oleh algoritma: kerinduan, keheningan, dan misteri yang tinggal di celah-celah kehidupan sehari-hari.
            </p>
          </div>

          {/* Quick Sub-navigation */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {[
              { id: "all", label: "Semua Karya" },
              { id: "novel", label: "Novel & Buku" },
              { id: "cerpen", label: "Cerita Pendek" },
              { id: "puisi", label: "Kumpulan Puisi" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-full px-5 py-2 text-xs font-serif transition-all ${
                  activeTab === tab.id
                    ? "bg-stone-900 text-stone-50 shadow-sm font-semibold"
                    : "border border-stone-900/15 bg-white/70 text-neutral-700 hover:bg-stone-100/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* FEATURED NOVEL SHOWCASE (EDITORIAL CLASSIC BOOK STYLE) */}
        {/* ========================================================================= */}
        {novelItem && (activeTab === "all" || activeTab === "novel") && (
          <motion.section 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 rounded-3xl border border-stone-900/15 bg-[#F4ECD8] p-8 md:p-14 lg:p-16 shadow-[0_20px_50px_rgba(20, 18, 16,0.06)]"
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Book Cover Aesthetic */}
              <div className="relative shrink-0 w-64 sm:w-72 md:w-80 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-stone-950/20 group">
                {novelItem.coverImage ? (
                  <img
                    src={novelItem.coverImage}
                    alt={novelItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2A231C] p-8 flex flex-col justify-between text-stone-100">
                    <div>
                      <span className="font-serif italic text-xs tracking-widest text-stone-400">NOVEL EDISI 2026</span>
                      <h3 className="font-fraunces text-2xl font-normal mt-4">{novelItem.title}</h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">I Dewa Made Dharma</span>
                  </div>
                )}
                {/* Spine shadow overlay */}
                <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono text-stone-200 text-center">
                  {novelItem.chapters?.length ?? 0} Bab Tersedia
                </div>
              </div>

              {/* Book Details & Chapter Index */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-serif mb-4 text-stone-900">
                    <span className="rounded-full bg-stone-900/10 px-3 py-1 font-semibold uppercase tracking-wider text-[10px]">
                      Koleksi Novel
                    </span>
                    <span>·</span>
                    <span>{novelItem.date}</span>
                    <span>·</span>
                    <span>{novelItem.readTime}</span>
                  </div>

                  <h2 className="font-fraunces text-4xl sm:text-5xl font-normal text-neutral-950 mb-3">
                    {novelItem.title}
                  </h2>
                  
                  {novelItem.subtitle && (
                    <p className="font-serif italic text-lg text-stone-950 mb-6">
                      {novelItem.subtitle}
                    </p>
                  )}

                  <p className="font-serif text-base text-neutral-800 leading-relaxed mb-8">
                    {novelItem.synopsis}
                  </p>

                  {/* Chapter List Preview */}
                  {novelItem.chapters && novelItem.chapters.length > 0 && (
                    <div className="mb-8 rounded-2xl border border-stone-900/15 bg-white/60 p-5 backdrop-blur-sm">
                      <p className="font-serif italic text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                        Daftar Bab Siap Dibaca:
                      </p>
                      <div className="space-y-2">
                        {novelItem.chapters.map((ch) => (
                          <Link
                            key={ch.id}
                            href={`/writer/read/${novelItem.slug}?bab=${ch.chapterNumber}`}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100/70 transition text-sm font-serif text-neutral-800 group"
                          >
                            <span className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-stone-700" />
                              <span className="group-hover:text-stone-950 font-medium">{ch.title}</span>
                            </span>
                            <span className="text-xs text-neutral-500 flex items-center gap-1">
                              <span>Baca Bab</span>
                              <ChevronRight size={13} />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/writer/read/${novelItem.slug}`}
                    className="inline-flex items-center gap-3 rounded-xl bg-stone-950 px-8 py-4 font-serif text-sm font-medium text-stone-50 shadow-md hover:bg-black transition"
                  >
                    <BookOpen size={16} className="text-stone-300" />
                    <span>Mulai Membaca Novel (Bab 1)</span>
                  </Link>

                  <Link
                    href="/writer/novel"
                    className="inline-flex items-center gap-2 font-serif text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-neutral-950 transition"
                  >
                    <span>Lihat Rak Novel Lengkap</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </motion.section>
        )}

        {/* ========================================================================= */}
        {/* CERITA PENDEK (SHORT STORIES) SECTION */}
        {/* ========================================================================= */}
        {(activeTab === "all" || activeTab === "cerpen") && stories.length > 0 && (
          <section className="mb-24">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="font-serif italic text-xs tracking-widest text-stone-800 uppercase block mb-1">
                  02 // KARYA PROSA
                </span>
                <h2 className="font-fraunces text-3xl sm:text-4xl font-normal text-neutral-950">
                  Cerita Pendek
                </h2>
              </div>
              <Link 
                href="/writer/cerpen" 
                className="hidden sm:inline-flex items-center gap-1.5 font-serif text-xs font-semibold text-stone-900 hover:text-black transition"
              >
                <span>Lihat Semua Cerpen</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stories.map((story) => (
                <article
                  key={story.id}
                  className="rounded-3xl border border-stone-900/15 bg-white p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_45px_rgba(20, 18, 16,0.08)] transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-serif text-neutral-500 mb-4">
                      <span className="rounded-full bg-stone-100/60 px-3 py-1 text-stone-900 font-medium">
                        Cerpen
                      </span>
                      <span className="flex items-center gap-1 text-neutral-500">
                        <Clock size={12} />
                        {story.readTime || "10 min read"}
                      </span>
                    </div>

                    <h3 className="font-fraunces text-2xl sm:text-3xl font-normal text-neutral-950 mb-3 hover:text-stone-900 transition">
                      <Link href={`/writer/read/${story.slug}`}>
                        {story.title}
                      </Link>
                    </h3>

                    {story.subtitle && (
                      <p className="font-serif italic text-sm text-stone-900/80 mb-4">
                        {story.subtitle}
                      </p>
                    )}

                    <p className="font-serif text-sm text-neutral-700 leading-relaxed mb-6">
                      {story.synopsis}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-900/10 flex items-center justify-between">
                    <span className="text-xs font-serif text-neutral-500">{story.date}</span>
                    <Link
                      href={`/writer/read/${story.slug}`}
                      className="inline-flex items-center gap-1.5 font-serif text-xs font-bold text-stone-950 hover:gap-2.5 transition-all"
                    >
                      <span>Masuk ke Ruang Baca</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PUISI (POETRY) SECTION */}
        {/* ========================================================================= */}
        {(activeTab === "all" || activeTab === "puisi") && poems.length > 0 && (
          <section className="mb-24">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="font-serif italic text-xs tracking-widest text-stone-800 uppercase block mb-1">
                  03 // SAJAK & RENUNGAN
                </span>
                <h2 className="font-fraunces text-3xl sm:text-4xl font-normal text-neutral-950">
                  Kumpulan Puisi
                </h2>
              </div>
              <Link 
                href="/writer/puisi" 
                className="hidden sm:inline-flex items-center gap-1.5 font-serif text-xs font-semibold text-stone-900 hover:text-black transition"
              >
                <span>Lihat Semua Puisi</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {poems.map((poem) => (
                <article
                  key={poem.id}
                  className="rounded-3xl border border-stone-900/15 bg-[#FAF7F0] p-8 sm:p-10 shadow-sm hover:border-stone-900/40 transition flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none font-serif text-6xl">
                    ❦
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-serif text-neutral-500 mb-6">
                      <span className="rounded-full bg-stone-900/10 px-3 py-1 text-stone-900 font-medium">
                        Bait Puisi
                      </span>
                      <span>{poem.date}</span>
                    </div>

                    <h3 className="font-fraunces text-2xl sm:text-3xl font-normal text-neutral-950 mb-2">
                      <Link href={`/writer/read/${poem.slug}`} className="hover:text-stone-900 transition">
                        {poem.title}
                      </Link>
                    </h3>

                    {poem.subtitle && (
                      <p className="font-serif italic text-xs text-stone-800 mb-6">
                        {poem.subtitle}
                      </p>
                    )}

                    {/* Excerpt stanzas */}
                    {poem.content && (
                      <div className="my-6 p-6 rounded-2xl bg-white/70 border border-stone-900/10 font-serif italic text-sm text-neutral-700 leading-relaxed whitespace-pre-line text-center">
                        {poem.content.split("\n\n")[0]}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500">
                      {poem.typography.fontFamily} · {poem.readTime || "3 min read"}
                    </span>
                    <Link
                      href={`/writer/read/${poem.slug}`}
                      className="inline-flex items-center gap-1.5 font-serif text-xs font-bold text-stone-950 hover:gap-2.5 transition-all"
                    >
                      <span>Baca Bait Utuh</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* FOOTER CALLOUT: WRITER STUDIO CMS INVITATION */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-neutral-950 text-stone-50 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 block mb-2">
              STUDIO CMS PENULIS
            </span>
            <h3 className="font-fraunces text-2xl sm:text-3xl font-normal mb-3">
              Ingin Mempublikasikan Puisi, Cerpen, atau Bab Novel Baru?
            </h3>
            <p className="font-serif text-sm text-neutral-300 leading-relaxed">
              Buka Studio Penulis internal untuk menulis, menyunting bab, mengatur tipografi huruf, serta memilih nuansa kertas yang Anda sukai.
            </p>
          </div>

          <Link
            href="/writer/studio"
            className="inline-flex shrink-0 items-center gap-3 rounded-2xl bg-stone-400 px-8 py-4 font-serif text-sm font-semibold text-neutral-950 hover:bg-stone-300 transition shadow-lg"
          >
            <PenTool size={16} />
            <span>Masuk ke Studio Penulis ✍</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
