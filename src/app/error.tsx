"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const e = translations[useLanguage().language].errors;
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-bold">{e.title}</h1>
      <p className="max-w-md text-neutral-600">
        {e.body}
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white">
          {e.retry}
        </button>
        <Link href="/" className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium">
          {e.home}
        </Link>
      </div>
    </div>
  );
}
