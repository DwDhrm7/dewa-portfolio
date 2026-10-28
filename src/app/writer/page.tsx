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

export default function WriterHomePage() {
  const items = useWriterItems();
  const novel = items.find((item) => item.category === "novel");
  const stories = items.filter((item) => item.category === "cerpen");
  const poems = items.filter((item) => item.category === "puisi");

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
        description="Menulis adalah cara saya merawat apa yang tak mampu dihitung oleh algoritma: kerinduan, keheningan, dan misteri yang tinggal di celah kehidupan sehari-hari."
      />

      {novel && (
        <section className="relative overflow-hidden px-6 py-24 md:px-14 md:py-32 lg:px-20">
          <FadedBackdrop src={woodImages.study} tone="parchment" position="center 40%" />
          <div className="relative mx-auto max-w-[1200px]">
            <SectionTitle eyebrow="Di Rak Utama" title="Novel" href="/writer/novel" linkLabel="Lihat rak novel" />
            <NovelFeature novel={novel} />
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className="px-6 py-24 md:px-14 md:py-28 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <SectionTitle
              eyebrow="Prosa"
              title="Cerita Pendek"
              href="/writer/cerpen"
              linkLabel="Semua cerpen"
            />
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
            <SectionTitle
              dark
              eyebrow="Sajak & Renungan"
              title="Kumpulan Puisi"
              href="/writer/puisi"
              linkLabel="Semua puisi"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {poems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} dark />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-24 text-center md:px-14 md:py-28 lg:px-20">
        <Ornament />
        <blockquote className="mx-auto mt-10 max-w-3xl text-3xl italic leading-snug text-ink md:text-4xl">
          &ldquo;Teknologi tanpa rasa melahirkan kekakuan; sastra memberi jiwa pada apa yang kita bangun.&rdquo;
        </blockquote>
        <p className="mt-6 text-lg text-oak">I Dewa Made Dharma Putra Santika</p>
      </section>
    </>
  );
}
