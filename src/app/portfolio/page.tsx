"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { artifacts } from "@/data/artifacts";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function PortfolioPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const featured = artifacts.slice(0, 5);
  const projectBased = artifacts.filter((item) => item.category === "Project Based");
  const caseBased = artifacts.filter((item) => item.category === "Case Based");
  const additional = artifacts.filter((item) => item.category === "Additional");

  const categoryLabel = (category: string) => {
    switch (category) {
      case "Project Based":
        return t.portfolio.categories.projectBased;
      case "Case Based":
        return t.portfolio.categories.caseBased;
      default:
        return t.portfolio.categories.additional;
    }
  };

  return (
    <div className="px-8 pb-24 pt-32 md:px-14 md:pb-32 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
            {t.portfolio.eyebrow}
          </p>
          <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-[-0.05em] text-neutral-950 md:text-7xl">
            {t.portfolio.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-neutral-600">
            {t.portfolio.subtitle}. {t.portfolio.intro}
          </p>
        </motion.header>

        <section className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-12">
          {featured.map((artifact, index) => (
            <motion.article
              key={artifact.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`rounded-2xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] ${
                index === 0 ? "md:col-span-8 md:min-h-[380px]" : "md:col-span-4"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    {categoryLabel(artifact.category)}
                  </p>
                  <h2 className="max-w-2xl font-headline text-2xl font-bold tracking-[-0.03em] text-neutral-950 md:text-4xl">
                    {artifact.title[language]}
                  </h2>
                </div>
                {artifact.links?.[0] && (
                  <Link
                    href={artifact.links[0].url}
                    target="_blank"
                    className="rounded-full border border-black/10 p-3 text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                )}
              </div>

              <p className="mt-6 max-w-3xl leading-7 text-neutral-600">
                {artifact.description[language]}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {artifact.techStack?.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="mb-24 grid gap-6 md:grid-cols-3">
          <CategoryCard
            title={t.portfolio.projectBasedTitle}
            description={t.portfolio.projectBasedDesc}
            count={projectBased.length}
            archiveLabel={t.portfolio.archiveLabel}
            entriesLabel={t.portfolio.entriesLabel}
          />
          <CategoryCard
            title={t.portfolio.caseBasedTitle}
            description={t.portfolio.caseBasedDesc}
            count={caseBased.length}
            archiveLabel={t.portfolio.archiveLabel}
            entriesLabel={t.portfolio.entriesLabel}
          />
          <CategoryCard
            title={t.portfolio.additionalTitle}
            description={t.portfolio.additionalDesc}
            count={additional.length}
            archiveLabel={t.portfolio.archiveLabel}
            entriesLabel={t.portfolio.entriesLabel}
          />
        </section>

        <section className="space-y-8">
          {artifacts.map((artifact, index) => (
            <motion.article
              key={artifact.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-2xl border border-black/5 bg-white p-8"
            >
              <div className="grid gap-8 md:grid-cols-[1.2fr_2fr]">
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    {categoryLabel(artifact.category)}
                  </p>
                  <h3 className="font-headline text-2xl font-bold tracking-[-0.03em] text-neutral-950">
                    {artifact.title[language]}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-neutral-500">
                    {artifact.role[language]}
                  </p>
                </div>

                <div>
                  <p className="leading-7 text-neutral-600">
                    {artifact.description[language]}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {artifact.techStack?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {artifact.links && artifact.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      {artifact.links.map((link) => (
                        <Link
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-neutral-950"
                        >
                          {link.label}
                          <ArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  count,
  archiveLabel,
  entriesLabel,
}: {
  title: string;
  description: string;
  count: number;
  archiveLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="rounded-2xl bg-neutral-950 p-8 text-white">
      <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/60">
        {archiveLabel}
      </p>
      <h2 className="font-headline text-2xl font-bold tracking-[-0.03em]">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-white/70">{description}</p>
      <p className="mt-8 text-sm uppercase tracking-[0.22em] text-white/50">
        {count} {entriesLabel}
      </p>
    </div>
  );
}
