import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-bold">Halaman tidak ditemukan</h1>
      <p className="max-w-md text-neutral-600">Alamat yang kamu buka tidak ada atau sudah dipindahkan.</p>
      <Link href="/" className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white">
        Ke gerbang
      </Link>
    </div>
  );
}
