"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const LEAVE_MS = 2300;

export type Destination = "tech" | "writer" | "gateway";

const look: Record<Destination, { ground: string; title: string; label: string; track: string; bar: string }> = {
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
      <div className={`mt-8 h-px w-40 overflow-hidden ${s.track}`}>
        <motion.div
          className={`h-full origin-left ${s.bar}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: instant ? 0.2 : LEAVE_MS / 1000 - delay - 0.1, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
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
