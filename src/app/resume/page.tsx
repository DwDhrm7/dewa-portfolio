"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function ResumePage() {
  const { language } = useLanguage();
  const t = translations[language];

  const experiences = [
    {
      period: t.resume.exp1Period,
      title: t.resume.exp1Title,
      subtitle: t.resume.exp1Subtitle,
      description: t.resume.exp1Desc,
    },
    {
      period: t.resume.exp2Period,
      title: t.resume.exp2Title,
      subtitle: t.resume.exp2Subtitle,
      description: t.resume.exp2Desc,
    },
    {
      period: t.resume.exp3Period,
      title: t.resume.exp3Title,
      subtitle: t.resume.exp3Subtitle,
      description: t.resume.exp3Desc,
    },
    {
      period: t.resume.exp4Period,
      title: t.resume.exp4Title,
      subtitle: t.resume.exp4Subtitle,
      description: t.resume.exp4Desc,
    },
  ];

  return (
    <div className="px-8 pb-24 pt-32 md:px-14 md:pb-32 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-4xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              {t.resume.eyebrow}
            </p>
            <h1 className="font-headline text-5xl font-extrabold tracking-[-0.05em] text-neutral-950 md:text-7xl">
              I Dewa Made Dharma
              <br />
              Putra Santika
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
              {t.resume.summary}
            </p>
          </div>

          <a
            href={
              language === "id"
                ? "/cv-dharma-santika-id.pdf"
                : "/cv-dharma-santika-en.pdf"
            }
            download
            className="inline-flex items-center justify-center rounded-md bg-neutral-950 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
          >
            {t.resume.downloadCv}
          </a>
        </motion.header>

        <section className="mb-24 rounded-[2rem] bg-white p-10 shadow-[0_24px_70px_rgba(0,0,0,0.05)] md:p-14">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="font-headline text-sm font-black uppercase tracking-[0.4em] text-neutral-950">
              {t.resume.focusAreasTitle}
            </h2>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <div className="space-y-12">
            {t.resume.focusAreas.map((area) => (
              <div key={area.title} className="grid gap-6 md:grid-cols-4">
                <div className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  {area.label}
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-headline text-2xl font-bold tracking-[-0.03em] text-neutral-950">
                    {area.title}
                  </h3>
                  <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-24 grid gap-10 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="mb-10 flex items-center gap-4">
              <h2 className="font-headline text-sm font-black uppercase tracking-[0.4em] text-neutral-950">
                {t.resume.educationTitle}
              </h2>
              <div className="h-px flex-1 bg-black/10" />
            </div>
            <div className="border-l border-black/10 pl-6">
              <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                {t.resume.period}
              </p>
              <h3 className="font-headline text-2xl font-bold tracking-[-0.03em] text-neutral-950">
                {t.resume.program}
              </h3>
              <p className="mt-2 text-neutral-600">{t.resume.university}</p>
              <p className="mt-4 leading-7 text-neutral-600">{t.resume.focus}</p>
            </div>
          </section>

          <section className="rounded-2xl bg-neutral-950 p-10 text-white">
            <div className="mb-10 flex items-center gap-4">
              <h2 className="font-headline text-sm font-black uppercase tracking-[0.4em] text-white">
                {t.resume.technicalSkillsTitle}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-3">
              {t.resume.technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="mb-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-neutral-950 p-10 text-white">
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-headline text-sm font-black uppercase tracking-[0.4em] text-white">
                {t.resume.workflowTitle}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <p className="leading-8 text-white/75">{t.resume.workflowDescription}</p>
          </div>

          <div className="rounded-2xl bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-headline text-sm font-black uppercase tracking-[0.4em] text-neutral-950">
                {t.resume.aiStackTitle}
              </h2>
              <div className="h-px flex-1 bg-black/10" />
            </div>
            <div className="space-y-6">
              {t.resume.aiStack.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-2 border-b border-black/5 pb-5 last:border-b-0 last:pb-0 md:grid-cols-[140px_1fr]"
                >
                  <div className="font-headline text-xl font-bold tracking-[-0.03em] text-neutral-950">
                    {item.name}
                  </div>
                  <p className="leading-7 text-neutral-600">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24 rounded-[2rem] bg-white p-10 shadow-[0_24px_70px_rgba(0,0,0,0.05)] md:p-14">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="font-headline text-sm font-black uppercase tracking-[0.4em] text-neutral-950">
              {t.resume.experienceTitle}
            </h2>
            <div className="h-px flex-1 bg-black/10" />
          </div>
          <div className="space-y-10">
            {experiences.map((item) => (
              <div
                key={`${item.title}-${item.period}`}
                className="grid gap-4 border-b border-black/5 pb-8 last:border-b-0 last:pb-0 md:grid-cols-[140px_1fr]"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {item.period}
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold tracking-[-0.03em] text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-neutral-500">
                    {item.subtitle}
                  </p>
                  <p className="mt-4 leading-7 text-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-neutral-950 p-12 text-center text-white">
          <h2 className="font-headline text-3xl font-bold tracking-[-0.03em]">
            {t.resume.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/70">
            {t.resume.ctaDescription}
          </p>
        </section>
      </div>
    </div>
  );
}
