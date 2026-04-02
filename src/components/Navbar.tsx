"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

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
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-8 md:px-14 lg:px-20">
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
              onClick={toggleLanguage}
              className="rounded-full border border-black/10 bg-white/70 p-2 text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              aria-label="Toggle language"
            >
              <Globe size={16} />
            </button>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-full border border-black/10 bg-white/70 p-2 text-neutral-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-black/5 bg-[rgba(247,245,240,0.96)] px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-4 py-3 font-headline text-sm uppercase tracking-[0.18em] ${
                    isActive(item.href)
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-600 hover:bg-black/5 hover:text-neutral-950"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-[rgba(255,255,255,0.92)] px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-headline text-[10px] uppercase tracking-[0.18em] ${
                isActive(item.href) ? "font-bold text-neutral-950" : "text-neutral-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
