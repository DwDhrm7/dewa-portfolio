"use client";

import { Suspense, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useWriterItems } from "@/components/writer/useWriterItems";
import { Feed, Pager, WriterShell } from "@/components/writer/Room";

const PER_PAGE = 5;

function PoemPages() {
  const items = useWriterItems();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const topRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1);
  const [hasPaged, setHasPaged] = useState(false);

  const poems = items?.filter((item) => item.category === "puisi") ?? null;
  const pages = poems ? Math.max(1, Math.ceil(poems.length / PER_PAGE)) : 1;
  const requested = Math.max(parseInt(params.get("halaman") ?? "1", 10) || 1, 1);
  // Only clamp once the poems are known, or page 2 would flash through page 1 while loading.
  const page = poems ? Math.min(requested, pages) : requested;
  const visible = poems?.slice((page - 1) * PER_PAGE, page * PER_PAGE) ?? null;

  const goTo = (next: number) => {
    setHasPaged(true);
    setDirection(next > page ? 1 : -1);
    router.push(next === 1 ? pathname : `${pathname}?halaman=${next}`, { scroll: false });
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <WriterShell active="puisi" items={items}>
      <div ref={topRef} className="scroll-mt-28" />
      {/* New page slides in from the side you moved toward; nothing waits on the old page leaving. */}
      <motion.div
        key={page}
        initial={reduce || !hasPaged ? false : { opacity: 0, x: 20 * direction }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Feed items={visible} />
      </motion.div>
      {poems && pages > 1 && <Pager page={page} pages={pages} onChange={goTo} />}
    </WriterShell>
  );
}

export default function PuisiPage() {
  return (
    <Suspense fallback={null}>
      <PoemPages />
    </Suspense>
  );
}
