"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function StudioTeaser() {
  const { language } = useLanguage();
  const t = translations[language];

  // 3 hand-picked templates for the teaser
  const teaserTemplates = [
    {
      id: "sangrai",
      name: "SANGRAI",
      style: "Editorial",
      previewBg: "#E3E1D7",
      badge: "#222222",
    },
    {
      id: "hening",
      name: "HENING",
      style: "Minimal Zen",
      previewBg: "#F8F5F0",
      badge: "#4A4238",
    },
    {
      id: "mura",
      name: "MURA",
      style: "Premium Omakase",
      previewBg: "#0C0C0C",
      badge: "#8B0000",
      textWhite: true,
    },
  ];

  return (
    <section className="px-8 pb-32 md:px-14 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-neutral-950 px-8 py-16 md:px-16 md:py-24"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-white/5 blur-[120px]" />
          
          <div className="relative z-10 grid gap-16 lg:grid-cols-[1fr_400px]">
            <div>
              <h2 className="font-headline text-3xl font-extrabold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
                {t.studioTeaser.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
                {t.studioTeaser.subtitle}
              </p>
              
              <div className="mt-12">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-neutral-200"
                >
                  {t.studioTeaser.cta} <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Template Thumbnails */}
            <div className="flex w-full flex-col gap-4 sm:flex-row lg:flex-col lg:justify-center">
              {teaserTemplates.map((tpl, i) => (
                <motion.div
                  key={tpl.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ backgroundColor: tpl.previewBg }}
                  className={`flex h-24 items-center justify-between rounded-2xl px-6 sm:w-1/3 lg:w-full ${tpl.textWhite ? 'text-white' : 'text-neutral-950'}`}
                >
                  <span className="font-headline font-bold tracking-widest">{tpl.name}</span>
                  <span
                    className="hidden rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white sm:block"
                    style={{ backgroundColor: tpl.badge }}
                  >
                    {tpl.style}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
