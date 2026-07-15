"use client";

import { useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const templates = [
  {
    id: "sangrai",
    name: "SANGRAI",
    style: { id: "The Editorial", en: "The Editorial" },
    src: "/bali-templates/template-1-editorial/index.html",
    tags: { id: ["Terang", "Editorial", "ID/EN"], en: ["Light", "Editorial", "ID/EN"] },
    desc: {
      id: "Serif majalah raksasa, krem kertas dan tanah liat. Untuk specialty coffee yang serius dengan bijinya.",
      en: "Giant magazine serifs, paper cream and clay. For specialty coffee serious about its beans.",
    },
    previewBg: "#F5EFE3",
    badge: "#B4451F",
    colors: ["#F5EFE3", "#B4451F", "#1F1A17"],
  },
  {
    id: "teduh",
    name: "TEDUH",
    style: { id: "Tropic Luxe", en: "Tropic Luxe" },
    src: "/bali-templates/template-2-tropic-luxe/index.html",
    tags: { id: ["Gelap", "Tropis", "ID/EN"], en: ["Dark", "Tropical", "ID/EN"] },
    desc: {
      id: "Hijau hutan, kuningan, panel kaca di atas foto kebun. Untuk kafe taman dan hidden gem Ubud.",
      en: "Forest green, brass, glass panels over garden photography. For garden cafés and Ubud hidden gems.",
    },
    previewBg: "#101B14",
    badge: "#6B8F4A",
    colors: ["#101B14", "#6B8F4A", "#D4AF37"],
  },
  {
    id: "luna",
    name: "LUNA",
    style: { id: "Noir", en: "Noir" },
    src: "/bali-templates/template-3-noir/index.html",
    tags: { id: ["Gelap", "Mewah", "ID/EN"], en: ["Dark", "Luxury", "ID/EN"] },
    desc: {
      id: "Hitam pekat dan emas, serif italic, menu fine dining. Untuk espresso bar, wine bar, tempat malam.",
      en: "Deep black and gold, italic serifs, fine-dining menus. For espresso bars, wine bars, evening venues.",
    },
    previewBg: "#0A0A0A",
    badge: "#C9A96A",
    colors: ["#0A0A0A", "#C9A96A", "#1C1C1C"],
  },
  {
    id: "hening",
    name: "HENING",
    style: { id: "Minimal Zen", en: "Minimal Zen" },
    src: "/bali-templates/template-4-zen/index.html",
    tags: { id: ["Terang", "Minimal", "ID/EN"], en: ["Light", "Minimal", "ID/EN"] },
    desc: {
      id: "Putih hangat, ruang kosong ekstrem, satu metode. Untuk brew bar dan brand yang percaya diri.",
      en: "Warm white, extreme whitespace, one method. For brew bars and quietly confident brands.",
    },
    previewBg: "#F8F5F0",
    badge: "#4A4238",
    colors: ["#F8F5F0", "#4A4238", "#D1C9BE"],
  },
  {
    id: "tanah",
    name: "TANAH",
    style: { id: "Warm Luxe", en: "Warm Luxe" },
    src: "/bali-templates/template-5-warm-luxe/index.html",
    tags: { id: ["Gelap", "Hangat", "ID/EN"], en: ["Dark", "Warm", "ID/EN"] },
    desc: {
      id: "Mocha gelap dan tembaga, menu berupa foto hidangan penuh. Untuk roastery dan brunch house.",
      en: "Dark mocha and copper, full-photo dish menus. For roasteries and brunch houses.",
    },
    previewBg: "#1A0F08",
    badge: "#B87333",
    colors: ["#1A0F08", "#B87333", "#F2EFE9"],
  },
  {
    id: "lartisan",
    name: "L'ARTISAN",
    style: { id: "Boutique Glass", en: "Boutique Glass" },
    src: "/bali-templates/template-6-lartisan/index.html",
    tags: { id: ["Gelap", "Glass", "EN"], en: ["Dark", "Glass", "EN"] },
    desc: {
      id: "Emas 24 karat, kartu kaca, form reservasi elegan. Untuk butik kafe kelas atas pasar expat.",
      en: "24k gold, glass cards, an elegant reservation form. For high-end boutique cafés and the expat market.",
    },
    previewBg: "#0C0A05",
    badge: "#C9A96A",
    colors: ["#0C0A05", "#C9A96A", "#EBEBEB"],
  },
  // ─── Fresh references ───
  {
    id: "opera",
    name: "OPÉRA",
    style: { id: "Classic Patisserie", en: "Classic Patisserie" },
    src: "/bali-templates/template-7-opera/index.html",
    tags: { id: ["Gelap", "Klasik", "ID/EN"], en: ["Dark", "Classic", "ID/EN"] },
    desc: {
      id: "Emerald green pekat, tipografi serif klasik yang elegan, dan aksen emas. Terinspirasi dari salon teh Paris yang bersejarah.",
      en: "Deep emerald green, elegant classic serif typography, and gold accents. Inspired by historic Parisian tea salons.",
    },
    previewBg: "#08221B",
    badge: "#D4AF37",
    colors: ["#08221B", "#D4AF37", "#F5F2EA"],
  },
  {
    id: "nord",
    name: "NORD",
    style: { id: "Nordic Fine Dining", en: "Nordic Fine Dining" },
    src: "/bali-templates/template-8-nord/index.html",
    tags: { id: ["Earthy", "Brutalist", "ID/EN"], en: ["Earthy", "Brutalist", "ID/EN"] },
    desc: {
      id: "Warna batu, tipografi asimetris, dan serif elegan. Terinspirasi dari restoran Michelin-star Nordik.",
      en: "Stone colors, asymmetric typography, and elegant serif. Inspired by Nordic Michelin-star restaurants.",
    },
    previewBg: "#EAE6DB",
    badge: "#4A5240",
    colors: ["#EAE6DB", "#4A5240", "#1E201E"],
  },
  {
    id: "mura",
    name: "MURA",
    style: { id: "Premium Omakase", en: "Premium Omakase" },
    src: "/bali-templates/template-9-mura/index.html",
    tags: { id: ["Gelap", "Zen", "ID/EN"], en: ["Dark", "Zen", "ID/EN"] },
    desc: {
      id: "Tinta pekat, tekstur washi, dan animasi sangat halus. Terinspirasi dari pengalaman omakase eksklusif Tokyo.",
      en: "Deep ink, washi textures, and extremely subtle animations. Inspired by exclusive Tokyo omakase experiences.",
    },
    previewBg: "#0A0A0A",
    badge: "#8C1C13",
    colors: ["#0A0A0A", "#8C1C13", "#F5F5F5"],
  },
];

const steps = [
  {
    num: "01",
    title: { id: "Pilih desain", en: "Choose a design" },
    desc: {
      id: "Jelajahi koleksi, pilih karakter yang paling cocok dengan tempat kamu.",
      en: "Explore the collection, pick the character that fits your place.",
    },
  },
  {
    num: "02",
    title: { id: "Saya sesuaikan", en: "I tailor it" },
    desc: {
      id: "Logo, warna, menu, jam buka, dan dua bahasa semuanya jadi brand kamu.",
      en: "Logo, colours, menu, hours, and two languages  all becomes your brand.",
    },
  },
  {
    num: "03",
    title: { id: "Live dalam 3 hari", en: "Live in 3 days" },
    desc: {
      id: "Website live dengan domain kamu. Update bulanan cukup lewat WhatsApp.",
      en: "Live on your domain. Monthly updates? Just send a WhatsApp.",
    },
  },
];

/* ─── Template Card ─────────────────────────────────────────────────────── */

function TemplateCard({
  tpl,
  lang,
  index,
}: {
  tpl: (typeof templates)[0];
  lang: "id" | "en";
  index: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >
      {/* ── Preview window ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 260, background: tpl.previewBg }}
      >
        <iframe
          ref={iframeRef}
          src={tpl.src}
          title={`Preview ${tpl.name}`}
          loading="lazy"
          tabIndex={-1}
          style={{
            width: "400%",
            height: "400%",
            transform: "scale(0.25)",
            transformOrigin: "0 0",
            border: 0,
            pointerEvents: "none",
          }}
        />
        {/* bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-headline text-xl font-extrabold tracking-[-0.03em] text-neutral-950">
              {tpl.name}
            </h3>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
              {tpl.style[lang]}
            </p>
          </div>
          <a
            href={tpl.src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 flex-shrink-0 rounded-full border border-black/10 p-2 text-neutral-400 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
            aria-label={`Open ${tpl.name} demo`}
          >
            <ExternalLink size={14} />
          </a>
        </div>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-600">
          {tpl.desc[lang]}
        </p>

        {/* Colors & Tags */}
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex gap-1.5">
            {tpl.colors?.map((color) => (
              <div
                key={color}
                className="h-4 w-4 rounded-full border border-black/10"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tpl.tags[lang].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href={tpl.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-black/10 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-neutral-950 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
        >
          {lang === "id" ? "Lihat demo" : "Live demo"}
          <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.article>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function StudioPage() {
  const { language } = useLanguage();
  const lang = language as "id" | "en";
  const isId = lang === "id";

  return (
    <div className="px-8 pb-24 pt-32 md:px-14 md:pb-32 lg:px-20">
      <div className="mx-auto max-w-[1440px]">

        {/* ─── Hero ─── */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-4xl"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
            {isId
              ? "Dewa Studio dan Desain website untuk kafe dan restoran, Bali"
              : "Dewa Studio and Website design for cafés and restaurants, Bali"}
          </p>
          <h1 className="mb-6 font-headline text-5xl font-extrabold leading-[0.92] tracking-[-0.05em] text-neutral-950 md:text-7xl">
            {isId ? (
              <>
                Website seindah <br />
                <span className="text-neutral-400">tempat kamu.</span>
              </>
            ) : (
              <>
                A website as <br />
                <span className="text-neutral-400">exquisite as your space.</span>
              </>
            )}
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-8 text-neutral-600">
            {isId
              ? "Pilih dari koleksi desain, saya sesuaikan dengan brand kamu, menu, reservasi WhatsApp, Google Maps, dan dua bahasa. Live dalam 3 hari."
              : "Pick from the collection, I tailor it to your brand menu, WhatsApp bookings, Google Maps, and two languages. Live in 3 days."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#koleksi"
              className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white transition hover:opacity-85"
            >
              {isId ? "Lihat koleksi" : "See the collection"}
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Dewa%20Studio%2C%20saya%20tertarik%20dibuatkan%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-8 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-neutral-950 transition hover:border-neutral-950"
            >
              {isId ? "Chat WhatsApp" : "Chat on WhatsApp"}
            </a>
          </div>
        </motion.header>

        {/* ─── Stats bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24 flex flex-wrap gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5"
        >
          {[
            { val: "9", label: isId ? "Desain siap pakai" : "Ready-made designs" },
            { val: "3", label: isId ? "Hari sampai live" : "Days to go live" },
            { val: "2", label: isId ? "Bahasa (ID/EN)" : "Languages (ID/EN)" },
            { val: "∞", label: isId ? "Kustomisasi brand" : "Brand customisations" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center justify-center gap-1 bg-white px-6 py-7 text-center"
              style={{ minWidth: 140 }}
            >
              <span className="font-headline text-3xl font-extrabold tracking-[-0.04em] text-neutral-950">
                {s.val}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ─── Disclaimer ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-24 rounded-xl border border-black/5 bg-neutral-50 p-6 text-center shadow-sm"
        >
          <p className="mx-auto max-w-2xl text-[13.5px] leading-relaxed text-neutral-600">
            <strong>{isId ? "Catatan:" : "Disclaimer:"}</strong>{" "}
            {isId
              ? "Semua desain di bawah ini murni sebagai referensi (showcase), bukan proyek nyata dari klien sebelumnya. Saya sengaja membuat koleksi ini agar kamu punya gambaran nyata dan lebih mudah memilih gaya desain yang paling pas untuk bisnismu."
              : "The 9 designs below are reference concepts (a showcase), not actual client projects. This collection is specifically crafted to help prospective clients choose an aesthetic style and standard before ordering a website."}
          </p>
        </motion.div>

        {/* ─── Collection ─── */}
        <section id="koleksi" className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                {isId ? "Koleksi desain" : "The collection"}
              </p>
              <h2 className="font-headline text-4xl font-extrabold tracking-[-0.04em] text-neutral-950 md:text-5xl">
            {isId ? "Sembilan karakter," : "Nine characters,"}
            <br />
            <span className="text-neutral-400">
              {isId ? "satu standar." : "one standard."}
            </span>
          </h2>
            </div>
            <p className="max-w-sm text-neutral-500 md:text-right">
              {isId
                ? "Setiap desain adalah konsep orisinal dan bisa dijelajahi langsung sebagai demo hidup."
                : "Each design is an original concept   and can be explored directly as a live demo."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((tpl, i) => (
              <TemplateCard key={tpl.id} tpl={tpl} lang={lang} index={i} />
            ))}
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              {isId ? "Cara kerja" : "How it works"}
            </p>
            <h2 className="font-headline text-4xl font-extrabold tracking-[-0.04em] text-neutral-950 md:text-5xl">
              {isId
                ? "Dari pilih desain sampai live:"
                : "From choosing a design to live:"}
              <br />
              <span className="text-neutral-400">
                {isId ? "3 hari." : "3 days."}
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-black/5 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)]"
              >
                <p className="mb-5 font-headline text-sm font-bold tracking-[0.3em] text-neutral-400">
                  {step.num}
                </p>
                <h3 className="mb-3 font-headline text-xl font-extrabold tracking-[-0.03em] text-neutral-950">
                  {step.title[lang]}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-500">
                  {step.desc[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-neutral-950 p-12 text-center md:p-16"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/40">
            {isId ? "Mulai" : "Start"}
          </p>
          <h2 className="mx-auto mb-6 max-w-2xl font-headline text-3xl font-extrabold tracking-[-0.04em] text-white md:text-5xl">
            {isId
              ? "Kirim nama kafe kamu, saya balas dengan konsepnya"
              : "Send your café's name, I'll reply with a concept"}
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/55">
            {isId
              ? "Konsultasi gratis, tanpa komitmen. Ceritakan tempat kamu, saya akan tunjukkan desain mana yang paling cocok."
              : "Free consultation, no commitment. Tell me about your place and I'll show you which design fits best."}
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Dewa%20Studio%2C%20saya%20pemilik%20kafe%2Fresto%20dan%20tertarik%20dibuatkan%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-white px-10 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-neutral-950 transition hover:opacity-90"
          >
            {isId ? "Chat via WhatsApp" : "Chat on WhatsApp"}
            <ArrowUpRight size={16} />
          </a>
        </motion.section>

      </div>
    </div>
  );
}
