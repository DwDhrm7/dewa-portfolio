"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Globe, 
  Menu, 
  X, 
  ArrowRight, 
  Terminal, 
  Feather, 
  Sparkles, 
  BookOpen, 
  Lock 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  // If on gateway root "/", let the split screen shine without header clutter
  if (pathname === "/") {
    return null;
  }

  const isWriterRealm = pathname.startsWith("/writer");

  interface NavItem {
    name: string;
    href: string;
    icon?: any;
  }

  const techNavItems: NavItem[] = [
    { name: t.nav.home, href: "/tech" },
    { name: t.nav.portfolio, href: "/portfolio" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.resume, href: "/resume" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const writerNavItems: NavItem[] = [
    { name: language === "en" ? "Home" : "Beranda", href: "/writer" },
    { name: language === "en" ? "Poetry" : "Puisi", href: "/writer/puisi" },
    { name: language === "en" ? "Short Stories" : "Cerpen", href: "/writer/cerpen" },
    { name: language === "en" ? "Novels" : "Novel", href: "/writer/novel" },
    { name: language === "en" ? "Studio CMS" : "Studio CMS", href: "/writer/studio", icon: Lock },
  ];

  const currentNavItems = isWriterRealm ? writerNavItems : techNavItems;
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav 
        className={`fixed top-0 z-50 w-full border-b backdrop-blur-2xl transition-colors duration-300 ${
          isWriterRealm
            ? "border-stone-900/10 bg-[#FAF7F0]/90 text-neutral-900 shadow-sm"
            : "border-black/5 bg-[rgba(247,245,240,0.88)] text-neutral-950"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-14 lg:px-20">
          
          {/* Logo & Realm Badge */}
          <div className="flex items-center gap-3">
            <Link
              href={isWriterRealm ? "/writer" : "/tech"}
              className="group flex items-center gap-2.5"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg border font-headline font-bold text-xs transition ${
                isWriterRealm 
                  ? "border-stone-800/20 bg-stone-100 text-stone-900 group-hover:bg-stone-900 group-hover:text-white" 
                  : "border-neutral-900/10 bg-neutral-900 text-white"
              }`}>
                {isWriterRealm ? "✍" : "DD"}
              </div>
              <div>
                <span className={`font-headline text-sm font-extrabold uppercase tracking-[0.2em] block ${
                  isWriterRealm ? "text-neutral-900" : "text-neutral-950"
                }`}>
                  Dewa Dharma
                </span>
                <span className={`text-[10px] tracking-wider uppercase font-mono ${
                  isWriterRealm ? "text-stone-800" : "text-neutral-500"
                }`}>
                  {isWriterRealm ? "The Writer's Realm" : "The Tech Realm"}
                </span>
              </div>
            </Link>

            {/* Gateway Home Shortcut */}
            <Link 
              href="/"
              title="Kembali ke Layar Pilihan Utama"
              className="ml-2 hidden sm:inline-flex items-center rounded-md border border-neutral-300/60 bg-white/60 px-2 py-0.5 text-[10px] uppercase font-mono text-neutral-600 hover:bg-neutral-900 hover:text-white transition"
            >
              ⇄ Split Gateway
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 border-b-2 pb-1 font-headline text-sm tracking-tight transition-all ${
                  isActive(item.href)
                    ? isWriterRealm 
                      ? "border-stone-900 font-bold text-stone-950" 
                      : "border-neutral-950 font-bold text-neutral-950"
                    : "border-transparent font-medium text-neutral-500 hover:text-neutral-950"
                }`}
              >
                {item.icon && <item.icon size={13} className="text-stone-700" />}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions: Switcher + Language */}
          <div className="hidden items-center gap-3 md:flex">
            
            {/* The Realm Cross-Over Button */}
            {isWriterRealm ? (
              <Link
                href="/tech"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-800/20 bg-neutral-950 px-4 py-2 text-xs font-mono font-medium text-neutral-200 transition hover:bg-neutral-900 hover:text-white shadow-sm"
              >
                <Terminal size={13} className="text-neutral-400" />
                <span>Ke Ruang Tech ⌨</span>
              </Link>
            ) : (
              <Link
                href="/writer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-900/20 bg-stone-900 px-4 py-2 text-xs font-serif italic text-stone-100 transition hover:bg-stone-950 hover:text-white shadow-sm"
              >
                <Feather size={13} className="text-stone-300" />
                <span>Ke Ruang Sastra ✦</span>
              </Link>
            )}

            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              aria-label="Toggle language"
            >
              <Globe size={13} />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="rounded-full border border-black/10 bg-white/80 p-2 text-xs font-bold text-neutral-900"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg border border-black/10 bg-white/80 p-2 text-neutral-900 hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 top-20 z-40 border-b p-6 backdrop-blur-2xl md:hidden ${
              isWriterRealm ? "border-stone-900/20 bg-[#FAF7F0]" : "border-black/10 bg-[#f7f5f0]"
            }`}
          >
            <div className="flex flex-col gap-4">
              {currentNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between py-2 font-headline text-lg tracking-tight ${
                    isActive(item.href) ? "font-bold text-neutral-950" : "text-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <item.icon size={15} />}
                    {item.name}
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-black/10 flex flex-col gap-2">
                {isWriterRealm ? (
                  <Link
                    href="/tech"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-neutral-950 p-3 text-sm font-mono text-neutral-200"
                  >
                    <Terminal size={14} />
                    <span>Beralih ke Sisi Tech ⌨</span>
                  </Link>
                ) : (
                  <Link
                    href="/writer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 p-3 text-sm font-serif text-stone-100"
                  >
                    <Feather size={14} />
                    <span>Beralih ke Sisi Sastra ✦</span>
                  </Link>
                )}

                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-black/10 p-3 text-xs uppercase font-mono text-neutral-700"
                >
                  <span>Halaman Pilihan Utama (Split Gateway)</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
