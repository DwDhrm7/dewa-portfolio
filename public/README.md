# 📄 Setup CV - Quick Guide

## ✅ CV Link Sudah Dikonfigurasi!

Link download CV di Hero section sudah siap, tinggal tambahkan file PDF-nya.

---

## 🚀 Cara Setup (3 Langkah)

### 1. Copy CV Anda
```bash
# Dari terminal, di folder root project
cp /path/to/your/cv.pdf public/cv-dharma-santika.pdf
```

**Atau drag & drop:**
- Drag file CV Anda ke folder `public/`
- Rename menjadi `cv-dharma-santika.pdf`

### 2. Verify File
Pastikan strukturnya seperti ini:
```
my-portfolio/
├── public/
│   ├── cv-dharma-santika.pdf    ← CV Anda di sini
│   └── README.md
├── src/
└── package.json
```

### 3. Test
```bash
# Restart development server
npm run dev

# Buka browser: http://localhost:3000
# Klik button "Download CV"
# File akan ter-download dengan nama: I-Dewa-Made-Dharma-Putra-Santika-CV.pdf
```

---

## 📝 Konfigurasi Saat Ini

File: `src/components/Hero.tsx`

```typescript
<a
  href="/cv-dharma-santika.pdf"                      // ← Path file di folder public
  download="I-Dewa-Made-Dharma-Putra-Santika-CV.pdf" // ← Nama saat download
  ...
>
  Download CV
</a>
```

---

## 🔧 Kustomisasi

### Ingin gunakan nama file berbeda?

**Step 1:** Taruh CV dengan nama apapun di `public/`, misal `my-cv.pdf`

**Step 2:** Edit `src/components/Hero.tsx`:
```typescript
href="/my-cv.pdf"
```

### Ingin mengubah nama file saat download?

Edit `src/components/Hero.tsx`:
```typescript
download="Nama-Baru-CV.pdf"
```

---

## ⚠️ Troubleshooting

### CV tidak ter-download?
- ✅ Cek file ada di folder `public/`
- ✅ Nama file harus sama dengan href (case-sensitive)
- ✅ Restart development server

### File salah nama?
- Rename file di folder `public/`
- Atau update href di `Hero.tsx`

### Ingin host CV di cloud?
Gunakan external link:
```typescript
href="https://drive.google.com/file/d/YOUR_FILE_ID"
target="_blank"
```

--
