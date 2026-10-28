"use client";

import { woodImages } from "@/components/writer/woodImages";
import { useWriterItems } from "@/components/writer/useWriterItems";
import { PoemCard, RoomHeader } from "@/components/writer/Room";

export default function PuisiPage() {
  const poems = useWriterItems("puisi") ?? [];

  return (
    <>
      <RoomHeader
        image={woodImages.desk}
        eyebrow="Antologi Puisi"
        title="Bait-Bait yang Mengendap"
        description="Puisi-puisi yang ditulis sepanjang 2026."
      />
      <section className="px-6 py-20 md:px-14 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2">
          {poems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      </section>
    </>
  );
}
