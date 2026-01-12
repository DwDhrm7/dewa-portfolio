# 🌐 Personal Portfolio — I Dewa Made Dharma Putra Santika

Website portfolio profesional modern yang dibangun menggunakan **Next.js 15, TypeScript, dan Tailwind CSS**, dilengkapi animasi halus, struktur modular, sistem multi-bahasa, dan tampilan elegan yang responsif di semua perangkat.

---

## 🌟 Fitur Utama

### 🎨 Desain & UI/UX
- Tema gelap elegan + glassmorphism + gradient halus
- Navbar transparan dengan efek blur + sticky + shadow
- Layout profesional & konsisten pada setiap halaman
- Full responsive (Mobile, Tablet, Desktop)
- Komponen UI reusable & modular

---

### 🌍 Multi Bahasa (ID & EN)
Website mendukung **dua bahasa**:
- 🇮🇩 Bahasa Indonesia  
- 🇺🇸 English  

Dengan:
- Sistem context: `/src/contexts/LanguageContext.tsx`
- File translate: `/src/translations/en.ts` & `/src/translations/id.ts`
- Toggle bahasa dari Navbar (Desktop & Mobile)

Semua teks halaman otomatis mengikuti bahasa aktif.

---

### ❄️ Snow Effect Engine
Efek salju ringan & halus:
- Dibangun dengan `<canvas>`
- Particle snow custom (gravity, drift, opacity)
- Optimized — tidak memberatkan performa

File:
```
src/components/SnowEffect.tsx
```

---

### ⚡ Performa & Teknologi Modern
- Next.js **App Router**
- TypeScript strict
- Tailwind 100% utility
- Framer Motion animasi halus
- Lucide React icons
- Struktur kode bersih & scalable

---

## 📄 Halaman Utama

| Halaman | Deskripsi |
|--------|----------|
| **Home** | Hero section profesional + CTA |
| **About** | Profil & filosofi diri |
| **Resume** | Timeline pengalaman + Hard & Soft Skills |
| **Portfolio** | Data proyek otomatis dari `artifacts.ts` |
| **Contact** | Halaman kontak stylish |

---

## 🧠 Struktur Data Portfolio
Project menggunakan _data-driven system_  
Semua karya diambil dari:

```
src/data/artifacts.ts
```

Cukup tambah data → otomatis muncul di halaman Portfolio.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

---

## 📂 Struktur Folder

```
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── resume/
│   ├── portfolio/
│   └── contact/
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── TimelineItem.tsx
│   ├── SectionTitle.tsx
│   └── SnowEffect.tsx
├── contexts/
│   └── LanguageContext.tsx
├── translations/
│   ├── id.ts
│   ├── en.ts
│   └── index.ts
└── data/
    └── artifacts.ts
```

---

## 🚀 Instalasi & Menjalankan Project

### 1️⃣ Clone Repo
```bash
git clone https://github.com/DwDhrm7/dewa-portfolio.git
cd dewa-portfolio
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Jalankan
```bash
npm run dev
```

Buka:
```
http://localhost:3000
```

---

## 🌩️ Troubleshooting
Jika error:
```bash
rm -rf .next
npm run dev
```

Jika Tailwind tidak jalan:
- Restart dev server
- Pastikan `globals.css` aktif
- Pastikan `tailwind.config.ts` benar

---

## 👑 Author

**I Dewa Made Dharma Putra Santika**  

---

## 📜 License
© 2026 — All Rights Reserved.
