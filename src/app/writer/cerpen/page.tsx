"use client";

import { woodImages } from "@/components/writer/woodImages";
import { useWriterItems } from "@/components/writer/useWriterItems";
import { RoomHeader, StoryCard } from "@/components/writer/Room";

export default function CerpenPage() {
  const stories = useWriterItems("cerpen");

  return (
    <>
      <RoomHeader
        image={woodImages.library}
        eyebrow="Galeri Cerita Pendek"
        title="Narasi yang Menghidupkan"
        description="Kisah fiksi realis dan spekulatif tentang manusia, ruang, waktu, dan pertemuan-pertemuan tak terduga."
        position="center 30%"
      />
      <section className="px-6 py-20 md:px-14 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 md:grid-cols-2">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </>
  );
}
