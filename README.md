# Dewa Dharma Portfolio

> Website pribadi **I Dewa Made Dharma Putra Santika** dengan dua sisi: **Tech** (engineer, AI, IoT) dan **Writer** (puisi, cerpen, novel). Pengunjung masuk lewat sebuah buku tua yang terbuka, lalu memilih Dewa Dharma mana yang ingin mereka kenal.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## Overview

Situs dibagi menjadi tiga area. Setiap realm hanya bisa kembali ke gateway, tidak saling menyeberang, supaya masing-masing punya suasananya sendiri.

| Area | Rute | Karakter |
| --- | --- | --- |
| Gateway | `/` | Buku tua terbuka memenuhi layar. Halaman kiri berupa blueprint kuno (tech), halaman kanan tulisan tangan bersambung berisi puisi Prancis (writer). Buku membuka pelan mengikuti arah kursor. |
| Tech | `/tech`, `/portfolio`, `/about`, `/resume`, `/contact` | Monokrom hitam-putih yang elegan, tipografi Manrope + Inter. |
| Writer | `/writer`, `/writer/puisi`, `/writer/cerpen`, `/writer/novel`, `/writer/read/[slug]` | Kertas terang ala Medium, Inter Tight + Source Serif 4, sentuhan cokelat yang samar. |

## Features

- **Gateway buku terbuka.** Animasi pintu berbasis waktu sehingga tetap lambat dan estetik walau kursor langsung ke ujung, plus layar transisi saat memilih realm maupun saat kembali ke gateway.
- **Bilingual, default English.** Toggle EN/ID di navbar tanpa reload; seluruh teks antarmuka ada di `src/translations/` dan `src/components/writer/copy.ts`. Isi karya tulis sengaja tidak diterjemahkan dan tampil persis seperti yang diunggah.
- **Writer realm.**
  - Novel tampil sebagai lembar kertas sobek yang berselang kiri-kanan dengan cover yang keluar dari container.
  - Puisi dipaginasi 5 per halaman (`?halaman=2`).
  - Reader dengan pengaturan font, ukuran, tema kertas, mode bebas gangguan, dan navigasi bab.
  - Karya bertanda `comingSoon` tampil dengan label Coming Soon tanpa tanggal.
  - Konten muncul bertahap saat di-scroll.
- **Writer Studio (`/writer/studio`).** CMS khusus pemilik untuk menambah dan mengubah karya.
- **Ingatan posisi scroll.** Tombol back, baik di browser maupun di reader, kembali ke posisi scroll terakhir di halaman sebelumnya, di tech maupun writer.
- **Komentar di Blog.** Pembaca membaca tanpa akun dan berkomentar setelah masuk lewat Google atau tautan email. Komentar per bab untuk novel, per karya untuk puisi dan cerpen, dengan balasan satu tingkat. Detail di bagian Komentar.
- **Portfolio berbasis data.** Proyek dan artefak diambil dari `src/data/artifacts.ts`.
- **Form kontak** melalui EmailJS.

## Security

- **Sesi Studio:** login studio memakai cookie sesi bertanda tangan HMAC yang kedaluwarsa (`httpOnly`, `sameSite=strict`).
- **Batas percobaan login:** maksimal 5 percobaan gagal per 15 menit per IP.
- **Validasi tulis:** setiap penulisan dicek same-origin.
- **Validasi input:** semua data dari studio divalidasi ulang di server (`src/lib/writerValidation.ts`).
- **Penyimpanan:**
  - Penulisan bersifat atomik dan diantrekan, jadi tidak ada file setengah jadi.
  - Konflik slug dibalas 409.
  - Hosting yang filesystem-nya read-only dibalas 503.
- **Security headers** diatur di `next.config.ts`: CSP `frame-ancestors`, HSTS, `X-Content-Type-Options`, dan lainnya. Halaman studio diberi `noindex`.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Email**: EmailJS

## Project Structure

```text
public/
├── CV-dewa-dharma-en.pdf
├── CV-dewa-dharma-id.pdf
└── writer/                     # cover novel dan cerpen
src/
├── app/
│   ├── page.tsx                # gateway
│   ├── tech/ portfolio/ about/ resume/ contact/
│   ├── writer/
│   │   ├── page.tsx            # beranda writer
│   │   ├── puisi/ cerpen/ novel/
│   │   ├── read/[slug]/        # reader
│   │   └── studio/             # CMS khusus pemilik
│   ├── api/writer/             # API konten + auth studio
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── GatewaySplit.tsx        # buku terbuka
│   ├── RealmTransition.tsx     # layar transisi antar realm
│   ├── ScrollMemory.tsx        # ingatan posisi scroll
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── writer/                 # Room, copy, useWriterItems, ...
├── contexts/LanguageContext.tsx
├── data/
│   ├── artifacts.ts            # proyek portfolio
│   └── writer-content.json     # puisi, cerpen, novel
├── lib/                        # studioAuth, writerStorage, writerValidation
├── translations/               # en.ts, id.ts
└── types/writer.ts
```

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/DwDhrm7/dewa-portfolio.git
cd dewa-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Salin `.env.example` menjadi `.env.local`, lalu isi:

| Variable | Kegunaan |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service untuk form kontak |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `WRITER_STUDIO_PASSWORD` | Kata sandi Writer Studio, hanya di server. Biarkan kosong untuk mengunci studio. |
| `NEXT_PUBLIC_SITE_URL` | URL publik situs, untuk metadata dan social preview |
| `NEXT_PUBLIC_SUPABASE_URL` | URL proyek Supabase untuk komentar. Kosong berarti komentar tidak tampil. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Kunci publishable Supabase. Publik dengan sengaja; keamanan ada di aturan database. |

`.env.local` sudah ada di `.gitignore`. Jangan pernah commit kata sandi studio.

### 4. Run development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Komentar

Komentar memakai Supabase (login dan database). Semua tabelnya berawalan `blog_` dan dilindungi row level security plus trigger.

- **Tabel:** `blog_profiles`, `blog_comments`, `blog_reports`, `blog_bans`, `blog_admins`. Fungsi bantu ada di skema `blog_private`, yang tidak terbuka lewat API.
- **Aturan di database:** pembaca hanya bisa menulis atas namanya sendiri dan hanya mengubah isi komentarnya. Batas 3 komentar per menit dan 50 per hari, 1 sampai 2000 karakter, satu tingkat balasan, dan akun yang diblokir ditolak. Nama yang meniru penulis tidak diterima, dan hanya profil penulis yang bertanda Penulis.
- **Moderasi:** penulis masuk memakai email yang terdaftar di `blog_admins`; profilnya otomatis bertanda `is_author` saat login pertama. Tombol Sembunyikan, Hapus, dan Blokir muncul langsung di bawah tiap komentar, lengkap dengan jumlah laporan.
- **Tampilan:** komentar dimuat terpisah dari teks bacaan, jadi membaca tidak menunggunya.

Menyiapkan dari nol:

1. Jalankan migrasi komentar di proyek Supabase (tabel dan aturan di atas).
2. Di Supabase, Authentication, URL Configuration: isi Site URL dengan alamat situs dan tambahkan `https://<domain>/**` serta `http://localhost:3000/**` ke Redirect URLs.
3. Aktifkan provider Google di Authentication, Providers, dengan Client ID dan Secret dari Google Cloud Console.
4. Tautan masuk lewat email memerlukan SMTP sendiri. Layanan email bawaan Supabase hanya untuk uji coba dan sangat terbatas.
5. Daftarkan email penulis: `insert into public.blog_admins values ('email@penulis.com');`. Tanda Penulis dan tombol moderasi muncul otomatis begitu email itu masuk.
6. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` di Vercel.

## Content Management

- **Karya tulis:** buka `/writer/studio`, login dengan `WRITER_STUDIO_PASSWORD`, lalu tambah atau ubah karya. Perubahan disimpan ke `src/data/writer-content.json`, jadi commit file itu agar ikut ter-deploy.
- **Cover:** taruh gambar di `public/writer/`, lalu isi `coverImage` dengan path seperti `/writer/nama-file.png`.
- **Portfolio:** edit `src/data/artifacts.ts`.
- **Teks antarmuka:** edit `src/translations/en.ts` dan `src/translations/id.ts` untuk tech dan umum, serta `src/components/writer/copy.ts` untuk writer.

## Deployment Notes

- Isi semua environment variable di atas di dashboard hosting, misalnya Vercel.
- Di hosting serverless seperti Vercel, filesystem bersifat read-only. Studio tetap bisa login, tetapi penyimpanan akan dibalas 503. Kelola karya lewat studio di lokal, lalu commit dan push `writer-content.json`.
- Jalankan `npm run build` dan `npm run lint` sebelum deploy.

## Author

**I Dewa Made Dharma Putra Santika**
Bali, Indonesia
AI, Robotics, IoT, Software Development, dan Sastra

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DwDhrm7)

## License

© 2026 I Dewa Made Dharma Putra Santika. All rights reserved. Seluruh karya tulis di dalam situs ini dilindungi hak cipta penulis.
