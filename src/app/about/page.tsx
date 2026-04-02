"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Palette, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const capabilities = [
    {
      icon: Brain,
      title: t.about.capabilitiesCards[0],
      description: t.about.interests[0],
    },
    {
      icon: Cpu,
      title: t.about.capabilitiesCards[1],
      description: t.about.interests[1],
    },
    {
      icon: Palette,
      title: t.about.capabilitiesCards[2],
      description: t.about.interests[5],
    },
    {
      icon: Sparkles,
      title: t.about.capabilitiesCards[3],
      description: t.about.value3Desc,
    },
  ];

  return (
    <div className="px-8 pb-24 pt-32 md:px-14 md:pb-32 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24 grid items-end gap-12 md:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              {t.about.introLabel}
            </p>
            <h1 className="font-headline text-5xl font-extrabold leading-[0.92] tracking-[-0.05em] text-neutral-950 md:text-7xl">
              {t.about.introHeading}
            </h1>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <p className="text-lg leading-8 text-neutral-600">{t.about.intro1}</p>
          </div>
        </motion.section>

        <section className="mb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-[-0.03em] text-neutral-950">
              {t.about.biographyTitle}
            </h2>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 leading-8 text-neutral-600 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
              <p>{t.about.intro2}</p>
              <p className="mt-5">{t.about.intro3}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-neutral-950 p-8 text-white">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/60">
                {t.about.workingPrinciplesLabel}
              </p>
              <ul className="space-y-4">
                <li className="text-lg leading-8">{t.about.goal1}</li>
                <li className="text-lg leading-8">{t.about.goal2}</li>
                <li className="text-lg leading-8">{t.about.goal3}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              {t.about.capabilitiesLabel}
            </p>
            <h2 className="mt-3 font-headline text-4xl font-bold tracking-[-0.03em] text-neutral-950">
              {t.about.technicalFocusTitle}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className={`rounded-2xl p-8 ${
                    index === 3 ? "bg-neutral-950 text-white" : "bg-white text-neutral-950"
                  }`}
                >
                  <Icon size={30} className="mb-6" />
                  <h3 className="font-headline text-2xl font-bold tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-4 leading-7 ${
                      index === 3 ? "text-white/70" : "text-neutral-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-10 rounded-[2rem] bg-white p-10 shadow-[0_24px_70px_rgba(0,0,0,0.05)] md:grid-cols-2 md:p-14">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              {t.about.philosophyLabel}
            </p>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-neutral-950">
              {t.about.philosophyTitle}
            </h2>
          </div>
          <div>
            <p className="leading-8 text-neutral-600">
              {t.about.philosophyDescription}
            </p>
            <ul className="mt-8 space-y-4 border-l border-black/10 pl-6 text-sm uppercase tracking-[0.2em] text-neutral-500">
              {t.about.philosophyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
