"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { WriterItem } from "@/types/writer";
import defaultWriterData from "@/data/writer-content.json";

export default function CerpenPage() {
  const [stories, setStories] = useState<WriterItem[]>(
    (defaultWriterData as WriterItem[]).filter((i) => i.category === "cerpen")
  );

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/writer");
        const json = await res.json();
        if (json.success && json.data) {
          setStories(json.data.filter((item: WriterItem) => item.category === "cerpen"));
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
            <span>GALERI CERITA PENDEK</span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-950 mb-4">
            Narasi yang Menghidupkan
          </h1>
          <p className="max-w-2xl font-serif text-base text-neutral-700 leading-relaxed">
            Kisah-kisah fiksi realis dan spekulatif tentang manusia, ruang, waktu, dan pertemuan-pertemuan tak terduga.
          </p>
        </div>

        {/* Stories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              className="rounded-3xl border border-stone-900/15 bg-white p-8 sm:p-10 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-serif text-neutral-500 mb-4">
                  <span className="rounded-full bg-stone-100/70 px-3 py-1 text-stone-900 font-medium">
                    Cerpen
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <Clock size={12} />
                    {story.readTime || "12 min read"}
                  </span>
                </div>

                <h2 className="font-fraunces text-2xl sm:text-3xl font-normal text-neutral-950 mb-3 hover:text-stone-900 transition">
                  <Link href={`/writer/read/${story.slug}`}>
                    {story.title}
                  </Link>
                </h2>

                {story.subtitle && (
                  <p className="font-serif italic text-sm text-stone-900/80 mb-4">
                    {story.subtitle}
                  </p>
                )}

                <p className="font-serif text-sm text-neutral-700 leading-relaxed mb-6">
                  {story.synopsis}
                </p>

                {story.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-stone-900/10 bg-stone-50/50 px-2.5 py-0.5 text-[11px] font-serif italic text-stone-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-900/10 flex items-center justify-between">
                <span className="text-xs font-serif text-neutral-500">{story.date}</span>
                <Link
                  href={`/writer/read/${story.slug}`}
                  className="inline-flex items-center gap-1.5 font-serif text-xs font-bold text-stone-950 hover:gap-2.5 transition-all"
                >
                  <span>Mulai Membaca</span>
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
