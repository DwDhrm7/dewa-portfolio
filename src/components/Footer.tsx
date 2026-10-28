"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/idewamadedharmaputrasantika/" },
  { label: "GitHub", href: "https://github.com/DwDhrm7" },
  { label: "Email", href: "mailto:madedharmaputrasantikaidewa@gmail.com" },
];

export default function Footer() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];

  if (pathname === "/") return null;

  const isWriter = pathname.startsWith("/writer");
  const backLabel = language === "en" ? "Back to gateway" : "Kembali ke gerbang";

  if (isWriter) {
    return (
      <footer className="writer-realm border-t border-brass/25 bg-walnut-950 px-6 py-14 font-ui text-parchment md:px-14 lg:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <p className="font-serif text-xl">I Dewa Made Dharma Putra Santika</p>
            <p className="mt-1 text-sm text-parchment/60">
              {language === "en" ? "Poetry, short stories, and novels" : "Puisi, cerpen, dan novel"}
            </p>
            <p className="mt-3 text-sm text-parchment/40">{t.footer.copyright}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-7 text-sm">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                className="text-parchment/60 transition hover:text-brass"
              >
                {s.label}
              </Link>
            ))}
            <Link href="/" className="font-medium text-brass transition hover:text-parchment">
              {backLabel}
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-black/5 bg-white/70 px-6 py-12 md:px-14 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div>
          <p className="font-headline text-sm font-bold tracking-tight text-neutral-950">
            I Dewa Made Dharma Putra Santika
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">
            Software Engineer &amp; AI Enthusiast · ITB STIKOM Bali
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            {t.footer.copyright}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.2em] text-neutral-500">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              className="transition hover:text-neutral-950"
            >
              {s.label}
            </Link>
          ))}
          <Link href="/" className="font-semibold text-neutral-900 transition hover:text-neutral-500">
            {backLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
