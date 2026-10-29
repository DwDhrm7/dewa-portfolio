"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { TransitionLink } from "@/components/RealmTransition";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  if (pathname === "/") return null;

  const isWriter = pathname.startsWith("/writer");
  const isEn = language === "en";

  const items = [
    { name: t.nav.home, href: "/tech" },
    { name: t.nav.portfolio, href: "/portfolio" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.resume, href: "/resume" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const backLabel = isEn ? "Back" : "Kembali";
  const isActive = (href: string) => pathname === href;

  if (isWriter) {
    return (
      <nav className="writer-realm fixed top-0 z-50 w-full border-b border-ink/10 bg-paper/95 font-ui text-ink backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1192px] items-center justify-between px-6">
          <Link href="/writer" className="text-[17px] font-semibold tracking-tight">
            Dewa Dharma
          </Link>

          <div className="flex items-center gap-5 text-sm">
            <TransitionLink href="/" to="gateway" title="Dewa Dharma" label={t.gateway.loadingGateway} className="inline-flex items-center gap-1.5 text-ink-soft transition hover:text-ink">
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">{backLabel}</span>
              <span className="sm:hidden">{isEn ? "Gateway" : "Gerbang"}</span>
            </TransitionLink>
            <button
              onClick={toggleLanguage}
              className="inline-flex h-11 min-w-11 items-center justify-center font-semibold text-ink-soft transition hover:text-ink"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-[rgba(246,244,239,0.9)] text-neutral-950 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-14 lg:px-20">
          <Link href="/tech" className="font-headline text-sm font-extrabold uppercase tracking-[0.2em]">
            Dewa Dharma
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 pb-1 font-headline text-sm tracking-tight transition ${
                  isActive(item.href)
                    ? "border-neutral-950 font-bold text-neutral-950"
                    : "border-transparent font-medium text-neutral-500 hover:text-neutral-950"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <TransitionLink
              href="/"
              to="gateway" title="Dewa Dharma" label={t.gateway.loadingGateway}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 font-headline text-xs font-semibold text-neutral-700 transition hover:bg-neutral-950 hover:text-white"
            >
              <ArrowLeft size={13} />
              {backLabel}
            </TransitionLink>
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-2 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-950 hover:text-white"
              aria-label="Toggle language"
            >
              <Globe size={13} />
              {language.toUpperCase()}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-black/10 p-2 text-neutral-900 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-20 z-40 border-b border-black/10 bg-[#f6f4ef] p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-headline text-lg tracking-tight ${
                    isActive(item.href) ? "font-bold text-neutral-950" : "text-neutral-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-4">
                <TransitionLink
                  href="/"
                  to="gateway" title="Dewa Dharma" label={t.gateway.loadingGateway}
                  className="inline-flex items-center gap-2 font-headline text-sm font-semibold text-neutral-700"
                >
                  <ArrowLeft size={14} />
                  {backLabel}
                </TransitionLink>
                <button
                  onClick={toggleLanguage}
                  className="font-headline text-xs font-bold uppercase tracking-[0.2em] text-neutral-900"
                >
                  {language.toUpperCase()}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
