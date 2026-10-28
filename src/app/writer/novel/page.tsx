"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, ChevronRight, Layers, Clock } from "lucide-react";
import { WriterItem } from "@/types/writer";
import defaultWriterData from "@/data/writer-content.json";

export default function NovelShelfPage() {
  const [novels, setNovels] = useState<WriterItem[]>(
    (defaultWriterData as WriterItem[]).filter((i) => i.category === "novel")
  );

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/writer");
        const json = await res.json();
        if (json.success && json.data) {
          setNovels(json.data.filter((item: WriterItem) => item.category === "novel"));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-neutral-900 px-6 pb-28 pt-32 md:px-14 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Back Link */}
        <Link
          href="/writer"
          className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-stone-900 hover:text-black mb-8 transition"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Beranda Sastra</span>
        </Link>

        {/* Header */}
        <div className="mb-14 border-b border-stone-900/15 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-900/20 bg-stone-950/5 px-4 py-1.5 text-xs font-serif italic text-stone-900 mb-4">
            <BookOpen size={12} className="text-stone-700" />
            <span>RAK BUKU & NOVEL</span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-950 mb-4">
            Karya Panjang & Bab Bersambung
          </h1>
          <p className="max-w-2xl font-serif text-base text-neutral-700 leading-relaxed">
            Dunia novel dengan alur bab bertingkat, daftar isi interaktif, dan penjelajahan karakter yang mendalam.
          </p>
        </div>

        {/* Novels */}
        <div className="space-y-12">
          {novels.map((novel) => (
            <div
              key={novel.id}
              className="rounded-3xl border border-stone-900/15 bg-[#F4ECD8] p-8 sm:p-12 shadow-[0_15px_40px_rgba(20, 18, 16,0.06)] flex flex-col lg:flex-row items-center gap-10"
            >
              {/* Cover */}
              <div className="relative shrink-0 w-60 sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.22)] border border-stone-950/20 group">
                {novel.coverImage ? (
                  <img
                    src={novel.coverImage}
                    alt={novel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2A231C] p-6 flex flex-col justify-between text-stone-100">
                    <span className="font-serif italic text-xs text-stone-400">NOVEL</span>
                    <h3 className="font-fraunces text-xl font-normal">{novel.title}</h3>
                    <span className="text-xs font-mono text-neutral-400">Dewa Dharma</span>
                  </div>
                )}
                <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Info & Chapters */}
              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs font-serif text-stone-900 mb-3">
                  <span className="rounded-full bg-stone-900/10 px-3 py-1 font-semibold uppercase tracking-wider text-[10px]">
                    {novel.chapters?.length ?? 0} Bab Tersedia
                  </span>
                  <span>·</span>
                  <span>Rilis {novel.date}</span>
                </div>

                <h2 className="font-fraunces text-3xl sm:text-4xl font-normal text-neutral-950 mb-2">
                  {novel.title}
                </h2>

                {novel.subtitle && (
                  <p className="font-serif italic text-base text-stone-950 mb-4">
                    {novel.subtitle}
                  </p>
                )}

                <p className="font-serif text-sm text-neutral-800 leading-relaxed mb-6">
                  {novel.synopsis}
                </p>

                {/* Chapters Preview */}
                {novel.chapters && novel.chapters.length > 0 && (
                  <div className="mb-6 rounded-2xl border border-stone-900/15 bg-white/70 p-4">
                    <p className="font-serif italic text-xs font-semibold text-stone-900 mb-2">
                      Daftar Bab:
                    </p>
                    <div className="space-y-1.5">
                      {novel.chapters.map((ch) => (
                        <Link
                          key={ch.id}
                          href={`/writer/read/${novel.slug}?bab=${ch.chapterNumber}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-100/70 transition text-xs font-serif text-neutral-800"
                        >
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-stone-700" />
                            <span>{ch.title}</span>
                          </span>
                          <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                            <span>Baca Bab</span>
                            <ChevronRight size={12} />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={`/writer/read/${novel.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-7 py-3.5 font-serif text-xs font-semibold text-stone-50 hover:bg-black transition shadow-md"
                >
                  <BookOpen size={14} className="text-stone-300" />
                  <span>Mulai Membaca dari Bab 1</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
