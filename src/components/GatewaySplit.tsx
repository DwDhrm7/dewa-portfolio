"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Cpu, Feather, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import FadedBackdrop from "@/components/writer/FadedBackdrop";
import { woodImages } from "@/components/writer/woodImages";

const VIEW_W = 1600;
const VIEW_H = 900;
const CENTER_X = VIEW_W / 2;

/**
 * Deterministic engraving-style contour artwork. It is rendered twice
 * (once per door) with identical props, so the left/right halves line up
 * into a single seamless image when the doors are closed.
 */
function MonochromeArt({ nameLabel, hintLabel }: { nameLabel: string; hintLabel: string }) {
  const rows = 20;
  const lines = Array.from({ length: rows }, (_, i) => {
    const baseY = ((i + 0.5) * VIEW_H) / rows;
    const amplitude = 16 + (i % 3) * 7;
    const freq = 1.1 + (i % 4) * 0.12;
    const phase = i * 0.55;
    const steps = 90;
    let d = "";
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * VIEW_W;
      const y =
        baseY + amplitude * Math.sin((x / VIEW_W) * Math.PI * 2 * freq + phase);
      d += s === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return { d, opacity: 0.05 + ((i % 5) * 0.012) };
  });

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" className="h-full w-full">
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="#0a0a0a" />
        {lines.map((line, i) => (
          <path key={i} d={line.d} fill="none" stroke="#ffffff" strokeWidth={0.75} opacity={line.opacity} />
        ))}
        <line x1={CENTER_X} y1={0} x2={CENTER_X} y2={VIEW_H} stroke="#ffffff" strokeOpacity={0.14} strokeWidth={1} />
      </svg>

      {/* Real text, not SVG, so it never stretches with the artwork; centred on the seam it splits with the doors. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-white">
        <p className="font-headline text-5xl font-light tracking-[-0.02em] text-white/90 md:text-7xl">Dewa Dharma</p>
        <p className="mt-5 font-headline text-[10px] uppercase tracking-[0.3em] text-white/55 md:text-xs">{nameLabel}</p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/35 md:text-[11px]">{hintLabel}</p>
      </div>
    </div>
  );
}

function DoorFace({
  side,
  rotate,
  openAmount,
  art,
}: {
  side: "left" | "right";
  rotate: MotionValue<number>;
  openAmount: MotionValue<number>;
  art: React.ReactNode;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 z-20 w-1/2 overflow-hidden ${
        isLeft ? "left-0" : "right-0"
      }`}
      style={{
        transformOrigin: isLeft ? "right center" : "left center",
        rotateY: rotate,
      }}
    >
      <div
        className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"}`}
        style={{ width: "200%" }}
      >
        {art}
      </div>
      <motion.div
        className={
          isLeft
            ? "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-black/70"
            : "pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent to-black/70"
        }
        style={{ opacity: openAmount }}
      />
    </motion.div>
  );
}

export default function GatewaySplit() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.8 });

  const openRight = useTransform(smoothX, (v) => Math.max(0, Math.min(1, v)));
  const openLeft = useTransform(smoothX, (v) => Math.max(0, Math.min(1, -v)));

  const rotateRight = useTransform(openRight, [0, 1], [0, -72]);
  const rotateLeft = useTransform(openLeft, [0, 1], [0, 72]);

  const writerX = useTransform(openRight, [0, 1], [18, 0]);
  const techX = useTransform(openLeft, [0, 1], [-18, 0]);

  function updateFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const relative = (clientX - rect.left) / rect.width;
    pointerX.set(Math.max(-1, Math.min(1, (relative - 0.5) * 2)));
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => updateFromClientX(e.clientX)}
      onMouseLeave={() => pointerX.set(0)}
      onTouchMove={(e) => {
        if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
      }}
      onTouchEnd={() => pointerX.set(0)}
      className="relative h-[100dvh] w-full select-none overflow-hidden bg-black text-white"
      style={{ perspective: "1800px" }}
    >
      {/* Top identity bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-end px-6 py-6 md:px-12">
        <button
          onClick={toggleLanguage}
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition hover:border-white/40 hover:text-white"
          aria-label="Toggle language"
        >
          <Globe size={12} />
          {language.toUpperCase()}
        </button>
      </header>

      {/* The single resting image, revealed through both doors */}
      <DoorFace
        side="left"
        rotate={rotateLeft}
        openAmount={openLeft}
        art={<MonochromeArt nameLabel="I Dewa Made Dharma Putra Santika" hintLabel={t.gateway.hint} />}
      />
      <DoorFace
        side="right"
        rotate={rotateRight}
        openAmount={openRight}
        art={<MonochromeArt nameLabel="I Dewa Made Dharma Putra Santika" hintLabel={t.gateway.hint} />}
      />

      {/* Tech reveal, behind the left door */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-1/2 flex-col justify-center bg-neutral-950 px-10 md:px-16"
        style={{ opacity: openLeft, x: techX }}
      >
        <span className="mb-4 inline-flex w-fit items-center gap-2 border border-white/20 px-3 py-1 font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          <Cpu size={12} />
          {t.gateway.techBadge}
        </span>
        <h2 className="font-headline text-3xl font-extrabold leading-[1.05] text-white md:text-5xl">
          {t.gateway.techTitle}
        </h2>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
          {t.gateway.techDesc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {t.gateway.techTags.map((tag) => (
            <span
              key={tag}
              className="border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-wider text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          {t.gateway.techCta}
          <ArrowRight size={14} />
        </span>
      </motion.div>

      {/* Writer reveal, behind the right door */}
      <motion.div
        aria-hidden="true"
        className="writer-realm pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 bg-paper text-ink"
        style={{ opacity: openRight }}
      >
        <FadedBackdrop src={woodImages.library} />
        <motion.div
          className="relative flex h-full flex-col justify-center px-10 text-right md:px-16"
          style={{ x: writerX }}
        >
          <span className="mb-4 ml-auto inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.22em] text-oak">
            <Feather size={13} />
            {t.gateway.writerBadge}
          </span>
          <h2 className="font-serif text-4xl font-normal italic leading-[1.05] tracking-[-0.02em] text-ink md:text-6xl">
            {t.gateway.writerTitle}
          </h2>
          <p className="ml-auto mt-5 max-w-sm text-base leading-relaxed text-ink-soft md:text-lg">
            {t.gateway.writerDesc}
          </p>
          <p className="mt-6 font-ui text-sm text-ink-soft">
            {t.gateway.writerTags.join(" · ")}
          </p>
          <span className="mt-8 inline-flex items-center justify-end gap-2 font-ui text-sm font-semibold text-oak">
            <ArrowRight size={15} className="rotate-180" />
            {t.gateway.writerCta}
          </span>
        </motion.div>
      </motion.div>

      {/* Accessible, always-clickable halves */}
      <Link
        href="/tech"
        onFocus={() => pointerX.set(-1)}
        onBlur={() => pointerX.set(0)}
        className="absolute inset-y-0 left-0 z-30 w-1/2 focus:outline-none"
      >
        <span className="sr-only">{t.gateway.techCta}</span>
      </Link>
      <Link
        href="/writer"
        onFocus={() => pointerX.set(1)}
        onBlur={() => pointerX.set(0)}
        className="absolute inset-y-0 right-0 z-30 w-1/2 focus:outline-none"
      >
        <span className="sr-only">{t.gateway.writerCta}</span>
      </Link>

      {/* Minimal wayfinding captions, always visible */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-between px-6 py-6 text-[11px] font-semibold uppercase tracking-[0.22em] md:px-12">
        <span className="rounded-full bg-black/40 px-3 py-1 text-white/80 backdrop-blur-md">
          {t.gateway.techTitle}
        </span>
        <span className="rounded-full bg-black/40 px-3 py-1 text-white/80 backdrop-blur-md">
          {t.gateway.writerTitle}
        </span>
      </div>
    </div>
  );
}
