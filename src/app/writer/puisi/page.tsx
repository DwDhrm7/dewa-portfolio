"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Feather, ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { WriterItem } from "@/types/writer";
import defaultWriterData from "@/data/writer-content.json";

export default function PuisiPage() {
  const [poems, setPoems] = useState<WriterItem[]>(
    (defaultWriterData as WriterItem[]).filter((i) => i.category === "puisi")
  );

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/writer");
        const json = await res.json();
        if (json.success && json.data) {
          setPoems(json.data.filter((item: WriterItem) => item.category === "puisi"));
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
            <Feather size={12} className="text-stone-700" />
            <span>ANTOLOGI PUISI & SAJAK</span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-950 mb-4">
            Bait-Bait yang Mengendap
          </h1>
          <p className="max-w-2xl font-serif text-base text-neutral-700 leading-relaxed">
            Kumpulan sajak reflektif, dialog batin antara logika dan rasa, serta keheningan yang terselip di sela kesibukan dunia modern.
          </p>
        </div>

        {/* Poetry List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {poems.map((poem) => (
            <article
              key={poem.id}
              className="rounded-3xl border border-stone-900/15 bg-white p-8 sm:p-10 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-serif text-neutral-500 mb-6">
                  <span className="rounded-full bg-stone-100/70 px-3 py-1 text-stone-900 font-medium">
                    Sajak
                  </span>
                  <span>{poem.date}</span>
                </div>

                <h2 className="font-fraunces text-2xl sm:text-3xl font-normal text-neutral-950 mb-2">
                  <Link href={`/writer/read/${poem.slug}`} className="hover:text-stone-900 transition">
                    {poem.title}
                  </Link>
                </h2>

                {poem.subtitle && (
                  <p className="font-serif italic text-xs text-stone-800 mb-6">
                    {poem.subtitle}
                  </p>
                )}

                {poem.content && (
                  <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-stone-900/10 font-serif italic text-sm text-neutral-700 leading-relaxed whitespace-pre-line text-center my-6">
                    {poem.content.split("\n\n").slice(0, 2).join("\n\n")}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-900/10 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">
                  {poem.readTime || "3 min read"}
                </span>
                <Link
                  href={`/writer/read/${poem.slug}`}
                  className="inline-flex items-center gap-1.5 font-serif text-xs font-bold text-stone-950 hover:gap-2.5 transition-all"
                >
                  <span>Buka Ruang Baca</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
