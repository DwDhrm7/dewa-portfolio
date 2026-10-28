import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WriterItem } from "@/types/writer";
import FadedBackdrop from "./FadedBackdrop";
import { formatDate } from "./useWriterItems";

/** A short brass rule with a diamond, the house's quiet signature between sections. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-brass/50" />
      <span className="h-1.5 w-1.5 rotate-45 border border-brass/70" />
      <span className="h-px w-12 bg-brass/50" />
    </div>
  );
}

function Meta({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`font-ui text-[13px] tracking-wide ${dark ? "text-parchment/45" : "text-oak"}`}>{children}</p>
  );
}

export function RoomHeader({
  image,
  eyebrow,
  title,
  description,
  position,
  tall = false,
}: {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  position?: string;
  tall?: boolean;
}) {
  return (
    <header
      className={`relative overflow-hidden bg-walnut-950 px-6 text-parchment md:px-14 lg:px-20 ${
        tall ? "pb-28 pt-44 md:pb-36 md:pt-52" : "pb-20 pt-40 md:pb-24"
      }`}
    >
      <FadedBackdrop src={image} position={position} />
      <div className="relative mx-auto max-w-[1200px] text-center">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.28em] text-brass">{eyebrow}</p>
        <h1
          className={`mx-auto mt-6 max-w-4xl font-serif font-normal leading-[1.06] tracking-[-0.02em] text-parchment ${
            tall ? "text-5xl sm:text-6xl md:text-7xl lg:text-[84px]" : "text-5xl md:text-6xl"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-parchment/70">{description}</p>
        )}
        <Ornament className="mt-10" />
      </div>
    </header>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  href,
  linkLabel,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 flex flex-col items-center gap-3 text-center">
      <p className={`font-ui text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-brass" : "text-oak"}`}>
        {eyebrow}
      </p>
      <h2 className={`text-3xl md:text-[40px] ${dark ? "text-parchment" : "text-ink"}`}>{title}</h2>
      {href && linkLabel && (
        <Link
          href={href}
          className={`mt-1 inline-flex items-center gap-1.5 font-ui text-sm font-medium transition ${
            dark ? "text-parchment/60 hover:text-brass" : "text-walnut-600 hover:text-ink"
          }`}
        >
          {linkLabel}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

export function PoemCard({ poem, dark = false }: { poem: WriterItem; dark?: boolean }) {
  const excerpt = poem.excerpt ?? poem.content?.split(/\n{2,}/).slice(0, 2).join("\n\n");

  return (
    <article
      className={`group flex flex-col justify-between border p-8 transition sm:p-10 ${
        dark
          ? "border-brass/20 bg-walnut-900/70 hover:border-brass/50"
          : "border-oak/25 bg-[#fbf6ec] hover:border-oak/60"
      }`}
    >
      <div>
        <Meta dark={dark}>
          {formatDate(poem.date)}
          {poem.readTime ? ` · ${poem.readTime}` : ""}
        </Meta>
        <h3 className={`mt-3 text-2xl leading-tight ${dark ? "text-parchment" : "text-ink"}`}>
          <Link href={`/writer/read/${poem.slug}`}>{poem.title}</Link>
        </h3>
        {excerpt && (
          <p
            className={`mt-6 whitespace-pre-wrap text-[19px] leading-[1.6] ${
              dark ? "text-parchment/75" : "text-ink/80"
            }`}
          >
            {excerpt}
          </p>
        )}
      </div>
      <Link
        href={`/writer/read/${poem.slug}`}
        className={`mt-8 inline-flex items-center gap-1.5 font-ui text-sm font-medium transition group-hover:gap-2.5 ${
          dark ? "text-brass" : "text-walnut-700"
        }`}
      >
        Baca puisi utuh
        <ArrowRight size={14} />
      </Link>
    </article>
  );
}

export function StoryCard({ story }: { story: WriterItem }) {
  return (
    <article className="group flex flex-col justify-between border-t border-oak/30 pt-8">
      <div>
        <Meta>
          {formatDate(story.date)}
          {story.readTime ? ` · ${story.readTime}` : ""}
        </Meta>
        <h3 className="mt-3 text-[28px] leading-tight text-ink md:text-[32px]">
          <Link href={`/writer/read/${story.slug}`} className="transition hover:text-walnut-600">
            {story.title}
          </Link>
        </h3>
        {story.subtitle && <p className="mt-2 font-ui text-lg text-walnut-600">{story.subtitle}</p>}
        <p className="mt-5 whitespace-pre-line text-[19px] leading-[1.6] text-ink/80">{story.synopsis}</p>
      </div>
      <Link
        href={`/writer/read/${story.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 font-ui text-sm font-medium text-walnut-700 transition group-hover:gap-2.5"
      >
        Baca cerpen
        <ArrowRight size={14} />
      </Link>
    </article>
  );
}

export function NovelFeature({ novel }: { novel: WriterItem }) {
  const chapters = novel.chapters ?? [];

  return (
    <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
      <div className="relative w-64 shrink-0 sm:w-72">
        <div className="absolute -inset-3 border border-oak/40" aria-hidden="true" />
        <div className="relative aspect-[848/1200] overflow-hidden bg-walnut-800 shadow-[0_30px_60px_rgba(28,19,12,0.35)]">
          {novel.coverImage ? (
            <img src={novel.coverImage} alt={`Sampul ${novel.title}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col justify-between p-8 text-parchment">
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.25em] text-brass">Novel</span>
              <span className="font-serif text-4xl leading-tight">{novel.title}</span>
              <span className="font-ui text-sm text-parchment/60">Dewa Dharma Putra</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/45 to-transparent" />
        </div>
      </div>

      <div className="flex-1">
        <Meta>
          {novel.isPreview ? `Pratinjau · ${chapters.length} bagian` : `${chapters.length} bagian`}
          {novel.readTime ? ` · ${novel.readTime}` : ""}
        </Meta>
        <h3 className="mt-3 text-4xl leading-tight text-ink md:text-[44px]">{novel.title}</h3>
        {novel.subtitle && <p className="mt-2 font-ui text-xl text-walnut-600">{novel.subtitle}</p>}
        <p className="mt-6 text-[19px] leading-[1.6] text-ink/85">{novel.synopsis}</p>

        {chapters.length > 0 && (
          <ol className="mt-8 divide-y divide-oak/20 border-y border-oak/20">
            {chapters.map((ch) => (
              <li key={ch.id}>
                <Link
                  href={`/writer/read/${novel.slug}?bab=${ch.chapterNumber}`}
                  className="flex items-center justify-between py-3 font-ui text-base font-medium text-ink transition hover:text-walnut-600"
                >
                  <span>{ch.title}</span>
                  <ArrowRight size={15} className="text-oak" />
                </Link>
              </li>
            ))}
          </ol>
        )}

        <Link
          href={`/writer/read/${novel.slug}`}
          className="mt-8 inline-flex items-center gap-2.5 bg-walnut-800 px-7 py-3.5 font-ui text-sm font-semibold text-parchment transition hover:bg-walnut-950"
        >
          Mulai membaca
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
