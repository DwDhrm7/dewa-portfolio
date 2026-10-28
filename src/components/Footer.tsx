"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Terminal, Feather } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];

  if (pathname === "/") {
    return null;
  }

  const isWriterRealm = pathname.startsWith("/writer");

  return (
    <footer 
      className={`border-t px-6 py-12 md:px-14 lg:px-20 transition-colors ${
        isWriterRealm 
          ? "border-stone-900/10 bg-[#F5EFE3] text-neutral-800" 
          : "border-black/5 bg-[rgba(255,255,255,0.72)] text-neutral-900"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row md:items-center">
        
        <div>
          <p className="font-headline text-sm font-bold tracking-tight text-neutral-950">
            I Dewa Made Dharma Putra Santika
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {isWriterRealm 
              ? "Ruang Sastra & Karya Tulis Personal · Puisi, Cerpen & Novel"
              : "Software Engineer & AI Enthusiast · ITB STIKOM Bali"}
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mt-2">
            {t.footer.copyright}
          </p>
        </div>

        {/* Dual Realm Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <Link
            href="/tech"
            className="flex items-center gap-1.5 font-mono text-neutral-600 hover:text-neutral-950 transition"
          >
            <Terminal size={12} className="text-neutral-600" />
            <span>Tech Realm</span>
          </Link>
          <span className="text-neutral-300">|</span>
          <Link
            href="/writer"
            className="flex items-center gap-1.5 font-serif italic text-neutral-600 hover:text-neutral-950 transition"
          >
            <Feather size={12} className="text-stone-700" />
            <span>Writer's Realm</span>
          </Link>
          <span className="text-neutral-300">|</span>
          <Link
            href="/"
            className="text-neutral-500 hover:text-neutral-950 transition font-mono uppercase tracking-wider text-[11px]"
          >
            Split Gateway
          </Link>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <Link
            href="https://www.linkedin.com/in/idewamadedharmaputrasantika/"
            target="_blank"
            className="transition hover:text-neutral-950"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/DwDhrm7"
            target="_blank"
            className="transition hover:text-neutral-950"
          >
            GitHub
          </Link>
          <Link
            href="mailto:madedharmaputrasantikaidewa@gmail.com"
            className="transition hover:text-neutral-950"
          >
            Email
          </Link>
        </div>

      </div>
    </footer>
  );
}
