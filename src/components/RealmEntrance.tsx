"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader, look } from "@/components/RealmTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import { markEntered, realmOf } from "@/lib/entrance";
import { translations } from "@/translations";

const ENTRANCE_SECONDS = 1.8;
const FADE_MS = 500;

/**
 * The loading screen for someone who opens a page of a realm directly, as from a shared link, without
 * walking through the gateway. The page head decides whether it plays (html[data-entrance]); this only
 * draws it, then lets it go. It is in the server HTML so the first frame is already covered.
 */
export default function RealmEntrance() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [realm] = useState(() => realmOf(pathname));
  const [phase, setPhase] = useState<"on" | "leaving" | "gone">("on");

  useEffect(() => {
    const root = document.documentElement;
    if (!realm || !root.dataset.entrance) {
      setPhase("gone");
      return;
    }
    const leave = setTimeout(() => setPhase("leaving"), ENTRANCE_SECONDS * 1000);
    const finish = setTimeout(() => {
      markEntered(realm);
      delete root.dataset.entrance;
      setPhase("gone");
    }, ENTRANCE_SECONDS * 1000 + FADE_MS);
    return () => {
      clearTimeout(leave);
      clearTimeout(finish);
    };
  }, [realm]);

  if (!realm || phase === "gone") return null;

  const t = translations[language].gateway;
  const s = look[realm];
  return (
    <div
      id="entrance"
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${s.ground} ${
        phase === "leaving" ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className={s.title}>{realm === "tech" ? t.techTitle : t.writerTitle}</p>
      <p className={`mt-4 text-xs uppercase tracking-[0.25em] ${s.label}`}>{realm === "tech" ? t.loadingTech : t.loadingWriter}</p>
      <Loader to={realm} instant={false} delay={0.1} total={ENTRANCE_SECONDS} />
    </div>
  );
}
