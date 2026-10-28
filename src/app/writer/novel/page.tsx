"use client";

import { woodImages } from "@/components/writer/woodImages";
import { useWriterItems } from "@/components/writer/useWriterItems";
import { NovelFeature, Ornament, RoomHeader } from "@/components/writer/Room";

export default function NovelShelfPage() {
  const novels = useWriterItems("novel");

  return (
    <>
      <RoomHeader
        image={woodImages.study}
        eyebrow="Rak Novel"
        title="Karya Panjang & Bab Bersambung"
        description="Novel dengan bab yang terus bertambah, daftar isi yang bisa dijelajahi, dan karakter yang tumbuh perlahan."
        position="center 40%"
      />
      <section className="px-6 py-20 md:px-14 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1200px] space-y-20">
          {novels.map((novel, i) => (
            <div key={novel.id}>
              {i > 0 && <Ornament className="mb-20" />}
              <NovelFeature novel={novel} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
