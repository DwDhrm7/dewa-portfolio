"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="border-t border-black/5 bg-[rgba(255,255,255,0.72)] px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 px-2 md:flex-row md:items-center md:px-4 lg:px-6">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-neutral-500 md:text-left">
          {t.footer.copyright}
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="https://www.linkedin.com/in/idewamadedharmaputrasantika/"
            target="_blank"
            className="text-xs uppercase tracking-[0.22em] text-neutral-500 transition hover:text-neutral-950"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/DwDhrm7"
            target="_blank"
            className="text-xs uppercase tracking-[0.22em] text-neutral-500 transition hover:text-neutral-950"
          >
            GitHub
          </Link>
          <Link
            href="mailto:madedharmaputrasantikaidewa@gmail.com"
            className="text-xs uppercase tracking-[0.22em] text-neutral-500 transition hover:text-neutral-950"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
