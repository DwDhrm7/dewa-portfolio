"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function NotFound() {
  const e = translations[useLanguage().language].errors;
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-bold">{e.notFoundTitle}</h1>
      <p className="max-w-md text-neutral-600">{e.notFoundBody}</p>
      <Link href="/" className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white">
        {e.home}
      </Link>
    </div>
  );
}
