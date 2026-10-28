"use client";

import Link from "next/link";
import { 
  ArrowUpRight, 
  Download, 
  Cpu, 
  Terminal, 
  Code, 
  Layers, 
  Compass, 
  Sparkles,
  ArrowRight,
  GitBranch,
  Feather
} from "lucide-react";
import { motion } from "framer-motion";
import { artifacts } from "@/data/artifacts";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function TechPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const downloadCvHref =
    language === "en" ? "/CV-dewa-dharma-en.pdf" : "/CV-dewa-dharma-id.pdf";

  const featured = artifacts.slice(0, 4);

  const techSkills = [
    { category: "AI & Intelligence", items: ["Computer Vision", "YOLOv8", "Gemini API", "Neural Networks", "Predictive Analytics"] },
    { category: "Web & Systems", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "RESTful APIs", "Framer Motion"] },
    { category: "IoT & Robotics", items: ["Embedded C/C++", "Node-RED", "MQTT", "ESP32 / Arduino", "Sensor Telemetry"] },
  ];

  return (
    <div className="px-6 pb-24 pt-32 md:px-14 md:pb-32 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        
        {/* ========================================================================= */}
        {/* TECH HERO */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white/80 px-4 py-1.5 text-xs font-mono font-semibold text-neutral-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-neutral-500 animate-pulse" />
              <span>THE TECH REALM // ITB STIKOM BALI</span>
            </div>

            <Link
              href="/writer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-900/15 bg-stone-50 px-4 py-1.5 text-xs font-serif italic text-stone-900 hover:bg-stone-100 transition"
            >
              <Feather size={12} className="text-stone-700" />
              <span>Mencari karya tulis & puisi? Kunjungi Writer Realm →</span>
            </Link>
          </div>

          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <h1 className="font-headline text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-neutral-950 md:text-7xl lg:text-8xl">
                Engineering Clarity
                <br />
                from Complexity.
              </h1>
            </div>

            <p className="max-w-xl text-lg font-medium leading-relaxed text-neutral-600 md:text-xl lg:text-2xl">
              {t.hero.tagline}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/portfolio"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-neutral-950 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.22em] text-white transition hover:bg-neutral-800 sm:w-auto shadow-md"
            >
              <span>{language === "en" ? "View All Projects" : "Lihat Semua Proyek"}</span>
              <ArrowUpRight size={16} />
            </Link>
            
            <a
              href={downloadCvHref}
              download
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-black/10 bg-white/80 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-black hover:text-white sm:w-auto shadow-sm"
            >
              <Download size={16} />
              <span>{t.hero.downloadCV}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-black/5 bg-neutral-100/60 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-neutral-700 transition hover:bg-neutral-200 sm:w-auto"
            >
              <span>{language === "en" ? "Let's Collaborate" : "Hubungi Saya"}</span>
            </Link>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CORE SPECIALIZATION CARDS */}
        {/* ========================================================================= */}
        <section className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 text-neutral-700 mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="font-headline text-xl font-bold text-neutral-950 mb-2">
              Artificial Intelligence & Vision
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Menerapkan model YOLOv8 untuk computer vision waktu-nyata, analitik spasial pada data ATCS/CCTV, serta perancangan agentic intelligence.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 text-neutral-700 mb-6">
              <Terminal size={24} />
            </div>
            <h3 className="font-headline text-xl font-bold text-neutral-950 mb-2">
              IoT & Embedded Systems
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Pengalaman membangun arsitektur telemetri sensor industri, integrasi broker MQTT, automasi Node-RED, dan smart agriculture AgriSense.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 text-neutral-700 mb-6">
              <Code size={24} />
            </div>
            <h3 className="font-headline text-xl font-bold text-neutral-950 mb-2">
              Modern Web & Interfaces
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Membangun dashboard interaktif performa tinggi dengan Next.js App Router, TypeScript, dan prinsip estetika visual editorial berkelas.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED ARTIFACTS SHOWCASE */}
        {/* ========================================================================= */}
        <section className="mb-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-neutral-500 mb-2">
                01 // ARTIFACTS & SYSTEMS
              </p>
              <h2 className="font-headline text-3xl font-extrabold text-neutral-950 md:text-5xl">
                Karya & Riset Pilihan
              </h2>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-headline text-sm font-bold text-neutral-900 hover:text-neutral-700 transition"
            >
              <span>{language === "en" ? "Explore Full Archive" : "Arsip Proyek Lengkap"}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featured.map((artifact, idx) => (
              <motion.article
                key={artifact.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-800 font-semibold">
                      {artifact.category}
                    </span>
                    <span>{artifact.role[language]}</span>
                  </div>

                  <h3 className="font-headline text-2xl font-extrabold text-neutral-950 group-hover:text-neutral-700 transition-colors mb-4">
                    {artifact.title[language]}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {artifact.description[language]}
                  </p>
                </div>

                <div>
                  {artifact.techStack && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {artifact.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-mono text-neutral-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/portfolio#${artifact.id}`}
                    className="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover:gap-3 transition-all"
                  >
                    <span>Pelajari Refleksi & Arsitektur</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TECH STACK BREAKDOWN */}
        {/* ========================================================================= */}
        <section className="mb-24 rounded-3xl bg-neutral-950 text-white p-8 md:p-14 lg:p-16">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-400 mb-3">
              02 // TECHNICAL CAPABILITIES
            </p>
            <h2 className="font-headline text-3xl font-extrabold md:text-5xl">
              Stack & Perangkat Utama
            </h2>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              Kombinasi teknologi yang saya gunakan sehari-hari untuk merancang purwarupa, menyusun inteligensi buatan, hingga mengimplementasikan sistem embedded di lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {techSkills.map((skillGroup) => (
              <div key={skillGroup.category} className="border-t border-white/10 pt-6">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
                  {skillGroup.category}
                </h4>
                <ul className="space-y-3">
                  {skillGroup.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE BRIDGE: HOW LITERATURE ENRICHES ENGINEERING */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-stone-900/10 bg-[#FAF7F0] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-serif italic text-xs tracking-widest text-stone-800 uppercase block mb-2">
              Sintesis Dua Sisi
            </span>
            <h3 className="font-fraunces text-2xl md:text-3xl font-normal italic text-neutral-900 mb-4">
              &ldquo;Teknologi tanpa rasa melahirkan kekakuan; sastra memberi jiwa pada apa yang kita bangun.&rdquo;
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-serif">
              Selain merakit model AI dan rangkaian IoT, saya aktif menulis puisi, cerpen, dan novel. Penyelaman dalam dunia kata membuat saya selalu mempertanyakan dampak manusiawi dari setiap arsitektur kode yang saya susun.
            </p>
          </div>

          <Link
            href="/writer"
            className="inline-flex shrink-0 items-center gap-3 rounded-2xl bg-stone-900 px-8 py-5 font-serif text-sm font-medium text-stone-100 shadow-md hover:bg-stone-950 transition"
          >
            <Feather size={16} className="text-stone-300" />
            <span>Kunjungi Ruang Sastra & Cerita →</span>
          </Link>
        </section>

      </div>
    </div>
  );
}
