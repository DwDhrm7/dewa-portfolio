# Portfolio Website - I Dewa Made Dharma Putra Santika

Portfolio profesional dan elegan yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS.

## 🌟 Fitur

- ✨ Desain modern dan elegan dengan tema gelap
- ❄️ Efek salju animasi yang tidak mengganggu
- 📱 Fully responsive untuk semua ukuran layar
- 🎨 Glassmorphism dan gradien yang halus
- ⚡ Performa optimal dengan Next.js 15
- 🎭 Animasi smooth dengan Framer Motion
- 📄 5 halaman lengkap: Home, About, Resume, Portfolio, Contact

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📁 Struktur Project

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # Halaman About
│   │   ├── resume/
│   │   │   └── page.tsx          # Halaman Resume
│   │   ├── portfolio/
│   │   │   └── page.tsx          # Halaman Portfolio
│   │   ├── contact/
│   │   │   └── page.tsx          # Halaman Contact
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── Footer.tsx            # Footer
│   │   ├── Hero.tsx              # Hero section
│   │   ├── SectionTitle.tsx      # Section title component
│   │   ├── ProjectCard.tsx       # Project card component
│   │   ├── TimelineItem.tsx      # Timeline item component
│   │   └── SnowEffect.tsx        # Snow animation effect
│   └── data/
│       └── artifacts.ts          # Portfolio data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
└── README.md
```

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js 18.17 atau lebih baru
- npm atau yarn

### Instalasi

1. **Install dependencies**

```bash
npm install
```

2. **Jalankan development server**

```bash
npm run dev
```

3. **Buka browser**

Akses `http://localhost:3000` di browser Anda.

### Build untuk Production

```bash
npm run build
npm start
```

## 📄 Halaman yang Tersedia

### 1. Home (`/`)
- Hero section dengan nama dan tagline
- CTA buttons (View Portfolio, Download CV)
- Efek salju background

### 2. About (`/about`)
- Profil profesional lengkap
- Status pendidikan di ITB STIKOM Bali
- Minat utama (AI, IoT, Robotics, Theatre)
- Tujuan pengembangan diri
- Nilai dan cara kerja

### 3. Resume (`/resume`)
- Pendidikan formal
- Technical skills (Hard skills)
- Soft skills
- Timeline pengalaman dan aktivitas

### 4. Portfolio (`/portfolio`)
- **Project Based**: SIGMA (Smart Traffic System)
- **Case Based**: Penelitian Dangdut Classification
- **Additional Artifacts**: 
  - Teater & Puisi
  - Leadership RADE
  - VRU Thailand Exchange
- Setiap karya memiliki refleksi What-So What-Now What

### 5. Contact (`/contact`)
- Form kontak (dummy - tidak terhubung backend)
- Informasi kontak (Email, LinkedIn, GitHub)

## 🎨 Customization

### Mengubah Warna

Edit di `tailwind.config.ts` atau gunakan class Tailwind:
- Primary: `#22D3EE` (cyan)
- Secondary: `#FACC15` (gold)
- Background: `#050816` (navy dark)

### Mengubah Data Portfolio

Edit file `src/data/artifacts.ts` untuk mengubah atau menambah karya.

### Menghilangkan Efek Salju

Hapus atau comment `<SnowEffect />` di `src/app/layout.tsx`.

## 📝 Catatan

- Form contact saat ini adalah dummy (tidak ada backend integration)
- Link CV perlu disesuaikan dengan file CV yang sebenarnya
- Email dan social media links di Footer dan Contact perlu disesuaikan dengan data asli

## 🔧 Troubleshooting

Jika ada error saat instalasi:

```bash
# Hapus node_modules dan reinstall
rm -rf node_modules
npm install
```

Jika ada error TypeScript:

```bash
# Restart TypeScript server di editor Anda
# Atau hapus .next folder
rm -rf .next
npm run dev
```

## 📄 License

© 2025 I Dewa Made Dharma Putra Santika. All rights reserved.

---

**Dibuat dengan ❤️ menggunakan Next.js, TypeScript, dan Tailwind CSS**
