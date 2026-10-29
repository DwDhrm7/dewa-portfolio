"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const LEAVE_MS = 2300;

export type Destination = "tech" | "writer" | "gateway";

export const look: Record<Destination, { ground: string; title: string; label: string; track: string; bar: string }> = {
  tech: {
    ground: "bg-[#f6f4ef] text-neutral-950",
    title: "font-headline text-3xl font-extrabold tracking-tight md:text-5xl",
    label: "font-headline text-neutral-500",
    track: "bg-neutral-950/10",
    bar: "bg-neutral-950",
  },
  writer: {
    ground: "writer-realm bg-paper text-ink",
    title: "font-serif text-4xl italic md:text-6xl",
    label: "font-ui text-ink-soft",
    track: "bg-ink/10",
    bar: "bg-oak",
  },
  gateway: {
    ground: "book-page bg-[#d9c69f] text-[#2a1e12]",
    title: "book-ink font-serif text-5xl italic md:text-7xl",
    label: "font-ui text-[#5a4428]",
    track: "bg-[#2a1e12]/15",
    bar: "bg-[#2a1e12]",
  },
};

const EASE = [0.65, 0, 0.35, 1] as const;

/** Tech: a small line-art rocket flies along the line, and the line fills in behind it. */
function RocketRun({ span, delay, instant }: { span: number; delay: number; instant: boolean }) {
  return (
    <div aria-hidden="true" className="relative mt-8 h-8 w-64">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-950/10" />
      <motion.div
        className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-neutral-950"
        initial={{ width: instant ? "100%" : "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: span, delay, ease: EASE }}
      />
      <motion.div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ left: instant ? "100%" : "0%" }}
        animate={{ left: "100%" }}
        transition={{ duration: span, delay, ease: EASE }}
      >
        <svg
          viewBox="0 0 24 44"
          className="h-7 w-auto rotate-90 text-neutral-950"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2c4 4 5.5 9 5.5 15v8h-11v-8C6.5 11 8 6 12 2z" />
          <circle cx="12" cy="13" r="2.2" />
          <path d="M6.5 19l-3.5 5v4l3.5-3M17.5 19l3.5 5v4l-3.5-3" />
          <motion.path
            d="M9.5 29c0 3 1 6 2.5 10 1.5-4 2.5-7 2.5-10"
            style={{ originX: 0.5, originY: 0 }}
            animate={instant ? undefined : { scaleY: [1, 1.5, 0.85, 1.35, 1], opacity: [1, 0.8, 1, 0.7, 1] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

/** Writer: three pen strokes scribbled one after another, a loose wave, a retrace, and an underline. */
const STROKES = [
  { d: "M8 40 C 30 8, 54 54, 78 22 S 122 50, 146 18 S 192 46, 216 20 S 256 38, 276 22", width: 2.2, ink: 0.85, share: 0.45 },
  { d: "M14 30 C 42 52, 62 12, 96 38 S 154 12, 182 40 S 236 16, 270 38", width: 1.6, ink: 0.5, share: 0.35 },
  { d: "M22 54 C 84 47, 168 59, 262 49", width: 1.5, ink: 0.7, share: 0.2 },
];

function Scribble({ span, delay, instant }: { span: number; delay: number; instant: boolean }) {
  let begin = delay;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 284 64"
      className="mt-8 h-16 w-72 text-ink"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {STROKES.map((stroke, i) => {
        const duration = instant ? 0 : span * stroke.share;
        const at = begin;
        begin += duration;
        return (
          <motion.path
            key={i}
            d={stroke.d}
            strokeWidth={stroke.width}
            strokeOpacity={stroke.ink}
            initial={{ pathLength: instant ? 1 : 0, opacity: instant ? 1 : 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration, delay: at, ease: "easeInOut" },
              opacity: { duration: 0.01, delay: at },
            }}
          />
        );
      })}
    </svg>
  );
}

/** Each place has its own way of waiting: a rocket for the tech side, pen scribbles for the writing side. */
export function Loader({ to, instant, delay, total = LEAVE_MS / 1000 }: { to: Destination; instant: boolean; delay: number; total?: number }) {
  const span = instant ? 0.2 : total - delay - 0.1;
  if (to === "tech") return <RocketRun span={span} delay={delay} instant={instant} />;
  if (to === "writer") return <Scribble span={span} delay={delay} instant={instant} />;
  const s = look[to];
  return (
    <div className={`mt-8 h-px w-40 overflow-hidden ${s.track}`}>
      <motion.div
        className={`h-full origin-left ${s.bar}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: span, delay, ease: EASE }}
      />
    </div>
  );
}

/** A short pause between leaving and arriving, in the colours of the place you are going to. */
export function TransitionScreen({
  to,
  title,
  label,
  instant,
  delay: lead = 0.7,
}: {
  to: Destination;
  title: string;
  label: string;
  instant: boolean;
  delay?: number;
}) {
  const s = look[to];
  const delay = instant ? 0 : lead;
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center ${s.ground}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: instant ? 0 : 0.6, delay, ease: "easeOut" }}
    >
      <motion.p
        className={s.title}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: instant ? 0 : 0.6, delay: delay + 0.15 }}
      >
        {title}
      </motion.p>
      <p className={`mt-4 text-xs uppercase tracking-[0.25em] ${s.label}`}>{label}</p>
      <Loader to={to} instant={instant} delay={delay} />
    </motion.div>
  );
}

/** Delays a navigation behind a TransitionScreen; modifier-clicks (new tab) still go straight through. */
export function useTransitionNavigate() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [pending, setPending] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  function go(href: string, e?: React.MouseEvent) {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)) return false;
    e?.preventDefault();
    if (pending) return true;
    router.prefetch(href);
    setPending(href);
    timer.current = setTimeout(() => router.push(href), reduce ? 300 : LEAVE_MS);
    return true;
  }

  return { go, pending, instant: !!reduce };
}

/** A link that shows the transition screen for its destination before navigating. */
export function TransitionLink({
  href,
  to,
  title,
  label,
  className,
  onNavigate,
  children,
}: {
  href: string;
  to: Destination;
  title: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  const { go, pending, instant } = useTransitionNavigate();
  return (
    <>
      <Link
        href={href}
        className={className}
        onClick={(e) => {
          if (go(href, e)) onNavigate?.();
        }}
      >
        {children}
      </Link>
      {/* Portalled: a fixed element inside a backdrop-filtered nav would be trapped in the nav's box. */}
      {pending &&
        createPortal(
          <AnimatePresence>
            <TransitionScreen to={to} title={title} label={label} instant={instant} delay={0.1} />
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
