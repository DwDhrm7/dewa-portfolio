# Struktur Project Portfolio

```
my-portfolio/
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx              # Halaman About - profil profesional
│   │   ├── resume/
│   │   │   └── page.tsx              # Halaman Resume - pendidikan & skills
│   │   ├── portfolio/
│   │   │   └── page.tsx              # Halaman Portfolio - semua karya
│   │   ├── contact/
│   │   │   └── page.tsx              # Halaman Contact - form & info kontak
│   │   ├── layout.tsx                # Root layout dengan Navbar & Footer
│   │   ├── page.tsx                  # Homepage dengan Hero section
│   │   └── globals.css               # Global styles & custom CSS
│   │
│   ├── components/
│   │   ├── Navbar.tsx                # Navigation bar dengan mobile menu
│   │   ├── Footer.tsx                # Footer dengan social links
│   │   ├── Hero.tsx                  # Hero section untuk homepage
│   │   ├── SectionTitle.tsx          # Reusable section title component
│   │   ├── ProjectCard.tsx           # Card untuk menampilkan karya
│   │   ├── TimelineItem.tsx          # Timeline item untuk resume
│   │   └── SnowEffect.tsx            # Efek salju animasi
│   │
│   └── data/
│       └── artifacts.ts              # Data semua karya/artefak
│
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── next.config.ts                    # Next.js configuration
├── .gitignore                        # Git ignore rules
└── README.md                         # Dokumentasi project

```

## Komponen Utama

### Layout & Navigation
- `layout.tsx` - Root layout dengan Navbar, Footer, dan SnowEffect
- `Navbar.tsx` - Navigation bar sticky dengan menu responsif
- `Footer.tsx` - Footer dengan social media links

### UI Components
- `Hero.tsx` - Hero section dengan animasi dan CTA buttons
- `SectionTitle.tsx` - Title section dengan underline accent
- `ProjectCard.tsx` - Card untuk menampilkan detail project dengan refleksi
- `TimelineItem.tsx` - Item timeline untuk pengalaman
- `SnowEffect.tsx` - Canvas animation untuk efek salju

### Pages
1. **Home** (`/`) - Hero section dengan intro
2. **About** (`/about`) - Profil profesional dan values
3. **Resume** (`/resume`) - Pendidikan, skills, dan pengalaman
4. **Portfolio** (`/portfolio`) - Semua karya (Project Based, Case Based, Additional)
5. **Contact** (`/contact`) - Form kontak dan info kontak

### Data
- `artifacts.ts` - Array objek TypeScript dengan semua data karya portfolio

## Teknologi

- **Next.js 15** - React framework dengan App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
