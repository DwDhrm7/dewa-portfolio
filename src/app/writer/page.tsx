"use client";

import Link from "next/link";
import { useWriterItems } from "@/components/writer/useWriterItems";
import { useWriterCopy } from "@/components/writer/copy";
import { Feed, NovelShelf, Reveal, StoryList, WriterShell } from "@/components/writer/Room";

const LATEST_POEMS = 5;

export default function WriterHomePage() {
  const items = useWriterItems();
  const c = useWriterCopy();
  const novels = items?.filter((item) => item.category === "novel" && !item.comingSoon && item.id !== "novel-jurnal-jantama-3") ?? [];
  const stories = items ? items.filter((item) => item.category === "cerpen") : null;
  const poems = items ? items.filter((item) => item.category === "puisi") : null;

  return (
    <WriterShell active="beranda" items={items}>
      <NovelShelf novels={novels} />
      <StoryList stories={stories} />

      {poems && poems.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <h2 className="border-b border-ink/10 pb-4 font-ui text-base">{c.latestPoems}</h2>
          </Reveal>
          <Feed items={poems.slice(0, LATEST_POEMS)} />
          {poems.length > LATEST_POEMS && (
            <Link
              href="/writer/puisi?halaman=2"
              className="mt-8 inline-flex rounded-full border border-ink/20 px-5 py-2.5 font-ui text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-paper"
            >
              {c.morePoems(poems.length - LATEST_POEMS)}
            </Link>
          )}
        </section>
      )}
    </WriterShell>
  );
}
