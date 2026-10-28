"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  animate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Cpu, Feather, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { LEAVE_MS, TransitionScreen } from "@/components/RealmTransition";
import FadedBackdrop from "@/components/writer/FadedBackdrop";
import { woodImages } from "@/components/writer/woodImages";

// Cicero, De Finibus Bonorum et Malorum 1.32 (public domain): the text "lorem ipsum" was cut from.
const LATIN_NOTE =
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.";

// Paul Verlaine, "Chanson d'automne" (Poèmes saturniens, 1866), public domain, as a hand copy.
// "coeur" rather than "cœur": the handwriting face has no œ ligature.
const DRAFT_TOP = ["Les sanglots longs", "Des violons", "De l'automne", "Blessent mon coeur", "D'une langueur", "Monotone."];
const DRAFT_BOTTOM = ["Et je m'en vais", "Au vent mauvais", "Qui m'emporte", "Deçà, delà,", "Pareil à la", "Feuille morte."];

// Rounded so server and browser trig agree to the digit (otherwise React reports a hydration mismatch).
const r1 = (n: number) => Math.round(n * 10) / 10;

/** A spur gear outline: trapezoid teeth around a root circle. */
function gearPath(cx: number, cy: number, r: number, teeth: number, depth: number): string {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const corners: [number, number][] = [
      [a, r],
      [a + step * 0.15, r + depth],
      [a + step * 0.45, r + depth],
      [a + step * 0.6, r],
    ];
    for (const [ang, rad] of corners) {
      pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`);
    }
  }
  return `M${pts.join("L")}Z`;
}

/** An antique engineering plate in sepia ink: two meshing gears and a compass construction. */
function Blueprint() {
  const ink = "#4a3218";
  const spokes = Array.from({ length: 6 }, (_, i) => (i * Math.PI) / 3);
  const rays = Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6);
  const hexagon = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 2;
    return `${(130 + 70 * Math.cos(a)).toFixed(1)},${(190 + 70 * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 500 700" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g fill="none" stroke={ink} strokeWidth={1} opacity={0.5}>
        {/* Fig. II: compass construction */}
        <circle cx={130} cy={190} r={70} />
        <polygon points={hexagon} />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i * Math.PI) / 3 - Math.PI / 2;
          return <circle key={i} cx={r1(130 + 70 * Math.cos(a))} cy={r1(190 + 70 * Math.sin(a))} r={70} strokeDasharray="2 4" opacity={0.45} />;
        })}
        <line x1={40} y1={190} x2={220} y2={190} strokeDasharray="6 3 1 3" />
        <line x1={130} y1={100} x2={130} y2={280} strokeDasharray="6 3 1 3" />

        {/* Fig. I: the driving wheel */}
        <circle cx={240} cy={480} r={150} strokeDasharray="2 5" opacity={0.6} />
        {rays.map((a) => (
          <line key={a} x1={240} y1={480} x2={r1(240 + 160 * Math.cos(a))} y2={r1(480 + 160 * Math.sin(a))} strokeDasharray="1 4" opacity={0.5} />
        ))}
        <path d={gearPath(240, 480, 108, 24, 14)} strokeWidth={1.3} />
        <circle cx={240} cy={480} r={92} />
        <circle cx={240} cy={480} r={30} strokeWidth={1.3} />
        <circle cx={240} cy={480} r={11} />
        {spokes.map((a) => (
          <line key={a} x1={r1(240 + 30 * Math.cos(a))} y1={r1(480 + 30 * Math.sin(a))} x2={r1(240 + 92 * Math.cos(a))} y2={r1(480 + 92 * Math.sin(a))} strokeWidth={2.2} />
        ))}

        {/* the pinion it drives, meshing at the pitch circles */}
        <path d={gearPath(372, 372, 50, 11, 12)} strokeWidth={1.3} />
        <circle cx={372} cy={372} r={14} />
        <line x1={240} y1={480} x2={372} y2={372} strokeDasharray="8 3 2 3" />

        {/* dimension line */}
        <line x1={118} y1={652} x2={362} y2={652} />
        <line x1={118} y1={642} x2={118} y2={662} />
        <line x1={362} y1={642} x2={362} y2={662} />
        <path d="M118 652 l9 -4 v8 z M362 652 l-9 -4 v8 z" fill={ink} />
      </g>
      <g fill={ink} opacity={0.6} fontFamily="var(--font-reading), serif" fontStyle="italic" fontSize={13}>
        <text x={58} y={95}>Fig. II</text>
        <text x={36} y={300} fontSize={11}>circulus et sexangulum</text>
        <text x={90} y={330}>Fig. I</text>
        <text x={300} y={290} fontSize={11}>rota dentata</text>
        <text x={395} y={445} fontSize={11}>axis</text>
        <text x={240} y={680} textAnchor="middle" fontSize={11}>diametrus CCXL</text>
      </g>
    </svg>
  );
}

function Page({ side, head, folio, children }: { side: "left" | "right"; head: string; folio: string; children: React.ReactNode }) {
  const isLeft = side === "left";
  return (
    <div className={`book-page absolute inset-y-0 overflow-hidden ${isLeft ? "left-0 right-1/2" : "left-1/2 right-0"}`}>
      {/* the leaf curves down into the gutter and lifts slightly at the fore-edge */}
      <div
        className={`absolute inset-0 ${
          isLeft
            ? "bg-[linear-gradient(270deg,rgba(60,38,15,0.45),transparent_10%,transparent_85%,rgba(70,45,18,0.3)_97%)]"
            : "bg-[linear-gradient(90deg,rgba(60,38,15,0.45),transparent_10%,transparent_85%,rgba(70,45,18,0.3)_97%)]"
        }`}
      />
      <p className="absolute inset-x-[11%] top-[5%] text-center font-serif text-[7px] uppercase tracking-[0.3em] text-[#3a2814]/55 md:text-[10px]">
        {head}
      </p>
      <div className={`absolute bottom-[9%] top-[10%] ${isLeft ? "left-[9%] right-[11%]" : "left-[11%] right-[9%]"}`}>{children}</div>
      <p className={`absolute bottom-[4.5%] font-serif text-[7px] text-[#3a2814]/55 md:text-[10px] ${isLeft ? "left-[9%]" : "right-[9%]"}`}>
        {folio}
      </p>
    </div>
  );
}

/**
 * An old book lying open, close enough that only the spread is in frame, in low light.
 * The left leaf is an engineer's plate, the right a poet's draft. It is rendered twice
 * (once per door) and clipped to each half, so the leaves meet at the gutter when the doors
 * are shut, and each door turns away like a page.
 */
function OpenBook({ greeting, nameLabel, hintLabel }: { greeting: string; nameLabel: string; hintLabel: string }) {
  return (
    <div className="relative h-full w-full bg-[#1b130c]" aria-hidden="true">
      <Page side="left" head="De Machinis" folio="xii">
        <Blueprint />
        <p lang="la" className="absolute right-0 top-[2%] w-[44%] text-justify font-serif text-[6px] italic leading-[1.5] text-[#3a2814]/40 [hyphens:auto] md:text-[8px]">
          {LATIN_NOTE}
        </p>
      </Page>

      <Page side="right" head="Poèmes saturniens" folio="xiii">
        <div className="-rotate-1 font-hand text-[13px] leading-[1.7] text-[#2a1e12]/55 md:text-[21px]">
          {DRAFT_TOP.map((line, i) => (
            <p key={line} className={i % 3 === 0 ? undefined : "pl-[8%]"}>
              {line}
            </p>
          ))}
        </div>
        <div className="absolute inset-x-0 -bottom-[3%] rotate-[-0.6deg] font-hand text-[13px] leading-[1.7] text-[#2a1e12]/55 md:text-[21px]">
          {DRAFT_BOTTOM.map((line, i) => (
            <p key={line} className={i % 3 === 0 ? undefined : "pl-[8%]"}>
              {line}
            </p>
          ))}
          <p className="-mt-1 text-right text-[11px] text-[#2a1e12]/45 md:text-[16px]">P. Verlaine, 1866</p>
        </div>
      </Page>

      {/* thin stacks of leaves at the outer edges */}
      <div className="page-block absolute inset-y-0 left-0 w-1.5 md:w-2.5" />
      <div className="page-block absolute inset-y-0 right-0 w-1.5 md:w-2.5" />

      {/* paper cleared behind the title, under the gutter like the rest of the leaf */}
      <div className="absolute left-1/2 top-1/2 h-[40%] w-[76%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_closest-side,rgba(217,198,159,0.97)_35%,rgba(217,198,159,0.75)_65%,transparent)]" />

      {/* the gutter */}
      <div className="absolute inset-y-0 left-1/2 w-28 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(70,45,20,0.3)_38%,rgba(35,20,8,0.6)_50%,rgba(70,45,20,0.3)_62%,transparent)]" />

      <div className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="book-ink whitespace-nowrap font-serif text-[12px] italic md:text-7xl lg:text-8xl">{greeting}</p>
        <p className="book-ink mt-4 font-serif text-[10px] uppercase leading-relaxed tracking-[0.28em] md:text-sm">{nameLabel}</p>
        <p className="mt-6 font-ui text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#5a4428] md:text-[11px]">{hintLabel}</p>
      </div>

      {/* low exposure: the spread sits in dim, warm light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_75%_at_50%_48%,rgba(20,12,5,0.05),rgba(10,6,2,0.45)_75%,rgba(5,3,1,0.72))]" />
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
        // Each door carries a heavy painted page; keep it on its own GPU layer so turning it
        // only recomposites instead of repainting the paper and drawings every frame.
        willChange: "transform",
        backfaceVisibility: "hidden",
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

  // -1 = tech door open, 0 = closed, 1 = writer door open. It is driven by time, not by the cursor:
  // once the cursor picks a side the door always takes its full, slow, eased swing, however fast
  // the cursor got there.
  const side = useMotionValue(0);
  const target = useRef<-1 | 0 | 1>(0);

  const router = useRouter();
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState<"tech" | "writer" | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  /** Open the chosen door, hold a short loading screen, then go. */
  function choose(realm: "tech" | "writer", e: React.MouseEvent) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
    e.preventDefault();
    if (leaving) return;
    const href = realm === "tech" ? "/tech" : "/writer";
    router.prefetch(href);
    setTarget(realm === "tech" ? -1 : 1);
    setLeaving(realm);
    leaveTimer.current = setTimeout(() => router.push(href), reduce ? 300 : LEAVE_MS);
  }

  function setTarget(next: -1 | 0 | 1) {
    if (target.current === next) return;
    target.current = next;
    animate(side, next, {
      duration: next === 0 ? 1.4 : 2.0,
      ease: [0.65, 0, 0.35, 1],
    });
  }

  const openRight = useTransform(side, (v) => Math.max(0, v));
  const openLeft = useTransform(side, (v) => Math.max(0, -v));
  // Content arrives after the door has moved, not with it.
  const lateRight = useTransform(openRight, [0.45, 1], [0, 1]);
  const lateLeft = useTransform(openLeft, [0.45, 1], [0, 1]);

  const rotateRight = useTransform(openRight, [0, 1], [0, -88]);
  const rotateLeft = useTransform(openLeft, [0, 1], [0, 88]);

  const writerX = useTransform(openRight, [0.3, 1], [40, 0]);
  const techX = useTransform(openLeft, [0.3, 1], [-40, 0]);

  function updateFromClientX(clientX: number) {
    if (leaving) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const relative = (clientX - rect.left) / rect.width;
    setTarget(relative > 0.6 ? 1 : relative < 0.4 ? -1 : 0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => updateFromClientX(e.clientX)}
      onMouseLeave={() => !leaving && setTarget(0)}
      onTouchMove={(e) => {
        if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
      }}
      onTouchEnd={() => !leaving && setTarget(0)}
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
        art={<OpenBook greeting={t.gateway.greeting} nameLabel={t.gateway.choose} hintLabel={t.gateway.hint} />}
      />
      <DoorFace
        side="right"
        rotate={rotateRight}
        openAmount={openRight}
        art={<OpenBook greeting={t.gateway.greeting} nameLabel={t.gateway.choose} hintLabel={t.gateway.hint} />}
      />

      {/* Tech reveal, behind the left door */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-neutral-950"
        style={{ opacity: openLeft, willChange: "opacity" }}
      >
        <motion.div
          className="flex h-full flex-col justify-center px-10 md:px-16"
          style={{ x: techX, opacity: lateLeft, willChange: "transform, opacity" }}
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
      </motion.div>

      {/* Writer reveal, behind the right door */}
      <motion.div
        aria-hidden="true"
        className="writer-realm pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 bg-paper text-ink"
        style={{ opacity: openRight, willChange: "opacity" }}
      >
        <FadedBackdrop src={woodImages.library} />
        <motion.div
          className="relative flex h-full flex-col justify-center px-10 text-right md:px-16"
          style={{ x: writerX, opacity: lateRight, willChange: "transform, opacity" }}
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
        onClick={(e) => choose("tech", e)}
        onFocus={() => setTarget(-1)}
        onBlur={() => !leaving && setTarget(0)}
        className="absolute inset-y-0 left-0 z-30 w-1/2 focus:outline-none"
      >
        <span className="sr-only">{t.gateway.techCta}</span>
      </Link>
      <Link
        href="/writer"
        onClick={(e) => choose("writer", e)}
        onFocus={() => setTarget(1)}
        onBlur={() => !leaving && setTarget(0)}
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

      <AnimatePresence>
        {leaving && (
          <TransitionScreen
            to={leaving}
            title={leaving === "tech" ? t.gateway.techTitle : t.gateway.writerTitle}
            label={leaving === "tech" ? t.gateway.loadingTech : t.gateway.loadingWriter}
            instant={!!reduce}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
