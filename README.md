# Dewa Portfolio

Portfolio website pribadi untuk **I Dewa Made Dharma Putra Santika**, dibangun dengan **Next.js 15**, **TypeScript**, dan **Tailwind CSS**. Project ini memakai pendekatan editorial minimal dengan layout monokrom, sistem bilingual, dan konten portofolio berbasis data.

## Overview

Website ini menampilkan:

- halaman `Home`, `About`, `Resume`, `Portfolio`, dan `Contact`
- tampilan editorial monokrom dengan tipografi `Manrope` + `Inter`
- sistem bahasa ganda Indonesia dan English
- konten portofolio yang diambil dari `src/data/artifacts.ts`
- form kontak berbasis `EmailJS`

## Features

- **Editorial UI**
  - visual minimal, bersih, dan fokus pada hirarki tipografi
  - navbar sticky, layout responsif, dan kartu konten modular

- **Bilingual Content**
  - mendukung Bahasa Indonesia dan English
  - toggle bahasa tersedia di navbar
  - teks dikelola lewat `src/translations/id.ts` dan `src/translations/en.ts`

- **Data-Driven Portfolio**
  - semua item portofolio dikelola dari satu sumber data
  - penambahan project baru cukup lewat `src/data/artifacts.ts`

- **Resume & Workflow**
  - menampilkan technical focus, skill stack, experience, serta AI workflow
  - mencakup tools dan workflow seperti Claude, ChatGPT, Codex, VS Code, dan Anti Gravity

- **Contact Integration**
  - form kontak terhubung ke EmailJS melalui environment variables

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Email**: EmailJS

## Project Structure

```text
src/
├── app/
│   ├── about/
│   ├── contact/
│   ├── portfolio/
│   ├── resume/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ParticleBackground.tsx
│   ├── ProjectCard.tsx
│   ├── SectionTitle.tsx
│   ├── SnowEffect.tsx
│   └── TimelineItem.tsx
├── contexts/
│   └── LanguageContext.tsx
├── data/
│   └── artifacts.ts
└── translations/
    ├── en.ts
    ├── id.ts
    └── index.ts
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

### 3. Setup environment variables

Buat file `.env.local` dan isi sesuai kredensial EmailJS:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run development server

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
```

## Content Management

### Update portfolio items

Edit file:

```text
src/data/artifacts.ts
```

### Update translations

Edit file:

```text
src/translations/id.ts
src/translations/en.ts
```

## Deployment Notes

- Pastikan environment variables EmailJS sudah tersedia di server/deployment target.
- Jalankan `npm run build` sebelum deploy untuk validasi akhir.

## Author

**I Dewa Made Dharma Putra Santika**  
Bali, Indonesia  
AI, Robotics, IoT, Software Development

## License

© 2026 I Dewa Made Dharma Putra Santika. All rights reserved.
