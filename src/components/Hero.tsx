"use client";

import Link from "next/link";
import { ArrowUpRight, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { artifacts } from "@/data/artifacts";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const featured = artifacts.slice(0, 3).map((artifact) => ({
    id: artifact.id,
    title: artifact.title[language],
    description: artifact.description[language],
    tags: artifact.techStack?.slice(0, 2) ?? [],
    href: "/portfolio",
  }));

  return (
    <section className="px-8 pb-24 pt-32 md:px-14 md:pb-32 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                {t.hero.eyebrow}
              </p>
              <h1 className="font-headline text-5xl font-extrabold leading-[0.9] tracking-[-0.05em] text-neutral-950 md:text-7xl lg:text-8xl">
                {t.hero.titleLine1}
                <br />
                {t.hero.titleLine2}
              </h1>
            </div>

            <p className="max-w-xl text-xl font-medium leading-tight text-neutral-600 md:text-2xl lg:text-3xl">
              {t.hero.tagline}
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-neutral-950 px-10 py-5 text-sm font-extrabold uppercase tracking-[0.24em] text-white transition hover:opacity-90"
            >
              {t.hero.viewPortfolio}
              <ArrowUpRight size={18} />
            </Link>
            <a
              href={
                language === "id"
                  ? "/cv-dharma-santika-id.pdf"
                  : "/cv-dharma-santika-en.pdf"
              }
              download
              className="inline-flex items-center justify-center gap-3 rounded-md border-2 border-black/10 bg-white/70 px-10 py-5 text-sm font-extrabold uppercase tracking-[0.24em] text-neutral-950 transition hover:bg-black hover:text-white"
            >
              <Download size={18} />
              {t.hero.downloadCV}
            </a>
          </div>
        </motion.div>

        <div className="mb-14 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 rounded-2xl bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-8 flex items-start justify-between">
              <Sparkles className="text-neutral-950" size={32} />
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {t.hero.focusLabel}
                </p>
                <p className="font-headline text-2xl font-bold text-neutral-950">
                  {t.hero.focusTitle}
                </p>
              </div>
            </div>
            <h2 className="max-w-3xl font-headline text-3xl font-bold leading-tight tracking-[-0.03em] text-neutral-950 md:text-4xl">
              {t.hero.focusDescription}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.hero.focusTags.map((tag, index) => (
                <span
                  key={tag}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    index === 0
                      ? "bg-neutral-950 text-white"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-neutral-950 p-8 text-white"
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-white/60">
              {t.hero.profileLabel}
            </p>
            <h3 className="font-headline text-3xl font-extrabold tracking-[-0.03em]">
              {t.hero.role}
            </h3>
            <p className="mt-4 leading-7 text-white/70">
              {t.hero.profileDescription}
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`rounded-2xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] ${
                index === 0 ? "md:col-span-6" : "md:col-span-3"
              }`}
            >
              <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                {t.hero.selectedWorkLabel}
              </p>
              <h3 className="mb-4 font-headline text-2xl font-bold tracking-[-0.03em] text-neutral-950">
                {item.title}
              </h3>
              <p className="line-clamp-4 text-sm leading-7 text-neutral-600">
                {item.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={item.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-neutral-950"
              >
                {t.hero.explore}
                <ArrowUpRight size={15} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
