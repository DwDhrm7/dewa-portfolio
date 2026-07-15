# Dewa Portfolio

> Portfolio website pribadi untuk **I Dewa Made Dharma Putra Santika**, dibangun dengan **Next.js 15**, **TypeScript**, dan **Tailwind CSS**. Project ini memakai pendekatan editorial minimal dengan layout monokrom, sistem bilingual, dan konten portofolio berbasis data.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## 📖 Overview

Website ini dirancang untuk menampilkan profil profesional, pengalaman kerja, serta proyek-proyek yang telah dikerjakan dengan tampilan yang bersih dan elegan. 

Fitur utama yang tersedia:
- **Halaman Lengkap**: `Home`, `About`, `Resume`, `Portfolio`, dan `Contact`
- **Desain Editorial Monokrom**: Menggunakan tipografi modern (`Manrope` + `Inter`) untuk memberikan kesan premium.
- **Bilingual (Dua Bahasa)**: Mendukung Bahasa Indonesia dan English dengan fitur toggle yang mudah diakses di navbar.
- **Data-Driven Portfolio**: Semua konten proyek dan artefak ditarik dari satu sumber data terpusat (`src/data/artifacts.ts`).
- **Integrasi Kontak**: Form kontak fungsional yang terhubung langsung melalui `EmailJS`.

## ✨ Features

- **Editorial UI**
  - Visual minimalis, bersih, dan fokus pada hierarki tipografi.
  - Navbar *sticky*, layout responsif untuk berbagai ukuran layar, dan kartu konten modular.

- **Bilingual Content**
  - Toggle bahasa terintegrasi mulus tanpa reload halaman penuh.
  - Manajemen teks tersentralisasi melalui `src/translations/id.ts` dan `src/translations/en.ts`.

- **Resume & Workflow**
  - Menampilkan fokus teknis, *skill stack*, pengalaman kerja, serta alur kerja (*workflow*) AI terkini.
  - Mencakup *tools* modern seperti Claude, ChatGPT, Codex, VS Code, dan AI agents.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: EmailJS

## 📂 Project Structure

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
│   └── Navbar.tsx
├── contexts/
│   └── LanguageContext.tsx
├── data/
│   └── artifacts.ts
└── translations/
    ├── en.ts
    ├── id.ts
    └── index.ts
```

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/DwDhrm7/dewa-portfolio.git
cd dewa-portfolio
```

### 2. Install dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Setup environment variables

Buat file `.env.local` di direktori root dan isi dengan kredensial EmailJS Anda:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## 📝 Content Management

### Update Portfolio Items
Untuk menambah atau mengubah item portofolio, edit file berikut:
```text
src/data/artifacts.ts
```

### Update Translations
Untuk mengubah teks bahasa Indonesia atau Inggris, edit file:
```text
src/translations/id.ts
src/translations/en.ts
```

## ☁️ Deployment Notes

- Pastikan environment variables EmailJS (`NEXT_PUBLIC_EMAILJS_*`) sudah ditambahkan di dashboard server/deployment target (misalnya Vercel atau Netlify).
- Jalankan `npm run build` secara lokal sebelum *deploy* untuk memastikan tidak ada *error* saat *build process*.

## 👨‍💻 Author

**I Dewa Made Dharma Putra Santika**  
📍 Bali, Indonesia  
💼 AI, Robotics, IoT, Software Development  

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DwDhrm7)

## 📄 License

© 2026 I Dewa Made Dharma Putra Santika. All rights reserved.
