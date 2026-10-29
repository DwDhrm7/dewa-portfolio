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
  const backLabel = language === "en" ? "Back" : "Kembali";

  if (isWriter) {
    return (
      <footer className="writer-realm border-t border-ink/10 bg-paper px-6 py-10 font-ui text-[13px] text-ink-soft">
        <div className="mx-auto flex max-w-[1192px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition hover:text-ink"
              >
                {s.label}
              </Link>
            ))}
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
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition hover:text-neutral-950"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
