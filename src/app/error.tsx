"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-bold">Halaman ini sedang bermasalah</h1>
      <p className="max-w-md text-neutral-600">
        Terjadi kesalahan saat memuat halaman. Coba muat ulang, atau kembali ke gerbang.
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white">
          Coba lagi
        </button>
        <Link href="/" className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium">
          Ke gerbang
        </Link>
      </div>
    </div>
  );
}
