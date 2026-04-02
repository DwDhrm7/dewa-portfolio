"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.portfolio, href: "/portfolio" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.resume, href: "/resume" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-[rgba(247,245,240,0.86)] backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-14 lg:px-20">
          <Link
            href="/"
            className="font-headline text-lg font-extrabold uppercase tracking-[0.24em] text-neutral-950"
          >
            Dewa Dharma
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 pb-1 font-headline text-sm tracking-tight transition-all ${
                  isActive(item.href)
                    ? "border-neutral-950 font-bold text-neutral-950"
                    : "border-transparent font-medium text-neutral-500 hover:text-neutral-950"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {language}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-full border border-black/10 bg-white/70 p-2 text-neutral-900 transition-all hover:bg-neutral-950 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-b border-black/5 bg-[rgba(247,245,240,0.98)] backdrop-blur-3xl md:hidden"
            >
              <div className="flex flex-col items-center gap-8 px-8 py-14 text-center">
                <div className="flex flex-col gap-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block font-headline text-3xl font-extrabold uppercase tracking-[0.2em] transition-all ${
                          isActive(item.href) ? "text-neutral-950" : "text-neutral-400"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 border-t border-black/5 pt-8"
                >
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                  >
                    <Globe size={18} />
                    {language === "id" ? "Ganti ke English" : "Switch to Indonesia"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
