"use client";

import FadedBackdrop from "@/components/writer/FadedBackdrop";
import { woodImages } from "@/components/writer/woodImages";
import { useWriterItems } from "@/components/writer/useWriterItems";
import {
  NovelFeature,
  Ornament,
  PoemCard,
  RoomHeader,
  SectionTitle,
  StoryCard,
} from "@/components/writer/Room";

const achievements = [
  "Juara I Penulisan Puisi PEKSIMIDA Bali 2026",
  "Delegasi Bali, PEKSIMINAS 2026 (Penulisan Puisi)",
  "Juara I Baca Puisi Putra PEKSIMIDA Bali 2024",
  "Juara I Baca Puisi Nasional CORISINDO 2024",
  "Juara II Baca Puisi Nasional OFSN 2024",
];

export default function WriterHomePage() {
  const items = useWriterItems() ?? [];
  const novels = items.filter((item) => item.category === "novel");
  const stories = items.filter((item) => item.category === "cerpen");
  const poems = items.filter((item) => item.category === "puisi").slice(0, 4);

  return (
    <>
      <RoomHeader
        tall
        image={woodImages.library}
        eyebrow="Ruang Sastra"
        title={
          <>
            Di mana logika berhenti,
            <br />
            <em className="text-brass">kata-kata mulai bernapas.</em>
          </>
        }
        description="Puisi, cerpen, dan novel tentang kerinduan, kehilangan, harapan, dan berbagai wajah cinta yang hadir dalam keseharian."
      />

      {novels.length > 0 && (
        <section className="relative overflow-hidden px-6 py-24 md:px-14 md:py-32 lg:px-20">
          <FadedBackdrop src={woodImages.study} tone="parchment" position="center 40%" />
          <div className="relative mx-auto max-w-[1200px]">
            <SectionTitle eyebrow="Di Rak Utama" title="Novel" href="/writer/novel" linkLabel="Lihat rak novel" />
            <div className="space-y-24">
              {novels.map((novel, i) => (
                <div key={novel.id}>
                  {i > 0 && <Ornament className="mb-24" />}
                  <NovelFeature novel={novel} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className="px-6 py-24 md:px-14 md:py-28 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <SectionTitle eyebrow="Prosa" title="Cerita Pendek" href="/writer/cerpen" linkLabel="Semua cerpen" />
            <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </section>
      )}

      {poems.length > 0 && (
        <section className="relative overflow-hidden bg-walnut-950 px-6 py-24 md:px-14 md:py-32 lg:px-20">
          <FadedBackdrop src={woodImages.desk} />
          <div className="relative mx-auto max-w-[1200px]">
            <SectionTitle dark eyebrow="Puisi Terbaru" title="Kumpulan Puisi" href="/writer/puisi" linkLabel="Semua puisi" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {poems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} dark />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-24 md:px-14 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-[1000px] gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.25em] text-oak">Tentang Penulis</p>
            <h2 className="mt-3 text-3xl text-ink md:text-[40px]">I Dewa Made Dharma Putra Santika</h2>
            <p className="mt-6 text-[19px] leading-[1.6] text-ink/85">
              Penyair muda asal Tabanan, Bali. Kepekaannya pada bahasa tumbuh dari panggung Teater Jineng di
              SMA Negeri 1 Tabanan dan berlanjut di Teater Biner, ITB STIKOM Bali. Ia banyak terinspirasi oleh
              kesederhanaan Sapardi Djoko Damono dan keintiman bahasa Alma Neira, dan berupaya menghadirkan
              diksi yang khas, metafora yang segar, serta ruang tafsir tempat setiap pembaca menemukan kisahnya
              sendiri.
            </p>
          </div>
          <ul className="space-y-4 border-l border-oak/30 pl-8 font-ui text-[15px] text-ink/80 md:mt-9">
            {achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
