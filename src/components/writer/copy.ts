"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const MONTHS = {
  id: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

// Only the interface is translated; the works themselves stay in the language they were written in.
const copy = {
  id: {
    title: "Bibliography",
    tabsLabel: "Kategori karya",
    tabs: { beranda: "Beranda", puisi: "Puisi", cerpen: "Cerpen", novel: "Novel" },
    profileTitle: "Profil Penulis",
    profile:
      "Dewa Dharma Putra bernama lengkap I Dewa Made Dharma Putra Santika adalah penulis dan penyair muda asal Bali. Ia aktif menulis dan membaca puisi. Ia meraih juara pertama baca puisi putra pada PEKSIMIDA 2024 Bali dan menjadi peserta PEKSIMINAS 2024 di Universitas Negeri Jakarta. Pada PEKSIMIDA Bali 2026, ia meraih juara pertama penulisan puisi dan melaju ke PEKSIMINAS 2026 di Universitas Negeri Jember.",
    achievementsTitle: "Prestasi",
    achievements: [
      "Juara I Penulisan Puisi, PEKSIMIDA Bali 2026",
      "Delegasi Bali, PEKSIMINAS 2026",
      "Juara I Baca Puisi Putra, PEKSIMIDA Bali 2024",
      "Delegasi Bali, PEKSIMINAS 2024",
      "Juara I Baca Puisi Nasional, CORISINDO 2024",
      "Juara II Baca Puisi Nasional, OFSN 2024",
    ],
    category: { puisi: "Puisi", cerpen: "Cerpen", novel: "Novel" },
    loading: "Memuat karya...",
    empty: "Belum ada karya di sini.",
    sections: (n: number) => `${n} bagian`,
    preview: (n: number) => `Pratinjau, ${n} bagian`,
    moreSections: (n: number) => `dan ${n} bagian lainnya`,
    readFrom: (label: string) => `Baca dari ${label}`,
    cover: (title: string) => `Sampul ${title}`,
    latestPoems: "Puisi terbaru",
    morePoems: (n: number) => `${n} puisi lainnya`,
    searchPoetry: "Cari judul, bait, atau kata dalam puisi...",
    searchResults: (count: number, query: string) => `Ditemukan ${count} puisi untuk "${query}"`,
    noPoetryFound: (query: string) => `Tidak ada puisi yang cocok dengan "${query}".`,
    clearSearch: "Hapus pencarian",
    reader: {
      notFound: "Karya ini tidak ditemukan.", backHome: "Kembali ke ruang sastra", back: "Kembali",
      share: "Salin tautan baca", settings: "Pengaturan tampilan", quietOn: "Mode hening", quietOff: "Keluar mode hening",
      panelTitle: "Pengaturan baca", close: "Tutup", size: "Ukuran huruf:", align: "Perataan teks:", paper: "Warna kertas:",
      themes: { cream: "Krem", parchment: "Perkamen", sepia: "Sepia", "clean-white": "Putih", obsidian: "Malam" },
      previewEnd: "Pratinjau berakhir di sini.", byline: "Karya I Dewa Made Dharma Putra Santika",
      more: { puisi: "Puisi lainnya", cerpen: "Cerpen lainnya", novel: "Rak novel" },
    },
    comments: {
      title: "Komentar", count: (n: number) => `Komentar (${n})`,
      rules: "Tulis dengan santun. Komentar yang melanggar bisa disembunyikan.",
      placeholder: "Tulis komentarmu...", replyPlaceholder: "Tulis balasan...",
      send: "Kirim", sending: "Mengirim...", save: "Simpan", cancel: "Batal",
      signInPrompt: "Masuk untuk berkomentar. Membaca tidak perlu akun.",
      google: "Masuk dengan Google", orEmail: "atau lewat email", emailPlaceholder: "email@kamu.com",
      emailSend: "Kirim tautan masuk", emailSent: "Tautan masuk sudah dikirim. Cek emailmu.",
      signedInAs: (name: string) => `Masuk sebagai ${name}`, signOut: "Keluar", rename: "Ubah nama",
      reply: "Balas", edit: "Ubah", remove: "Hapus", report: "Laporkan", reported: "Dilaporkan",
      confirmDelete: "Hapus komentar ini?", edited: "diubah", author: "Penulis",
      hidden: "Disembunyikan", hide: "Sembunyikan", show: "Tampilkan",
      block: "Blokir", blocked: "Pengguna diblokir.", confirmBlock: "Blokir pengguna ini dari berkomentar?",
      reports: (n: number) => `${n} laporan`,
      empty: "Belum ada komentar. Jadilah yang pertama.", loading: "Memuat komentar...", loadError: "Komentar gagal dimuat.",
      errors: {
        generic: "Terjadi kesalahan. Coba lagi.", tooFast: "Terlalu cepat. Tunggu sebentar lalu coba lagi.",
        dailyLimit: "Batas komentar harian tercapai.", banned: "Akunmu tidak bisa berkomentar.",
        length: "Komentar harus 1 sampai 2000 karakter.", name: "Nama harus 2 sampai 40 karakter dan tidak boleh memakai nama yang dicadangkan.",
        sendLink: "Tautan masuk gagal dikirim. Coba lagi nanti.",
      },
    },
    pager: { label: "Halaman puisi", prev: "Sebelumnya", next: "Berikutnya", page: (n: number, total: number) => `Halaman ${n} dari ${total}`, goTo: (n: number) => `Halaman ${n}` },
  },
  en: {
    title: "Bibliography",
    tabsLabel: "Work categories",
    tabs: { beranda: "Home", puisi: "Poetry", cerpen: "Short stories", novel: "Novels" },
    profileTitle: "About the writer",
    profile:
      "Dewa Dharma Putra, whose full name is I Dewa Made Dharma Putra Santika, is a young writer and poet from Bali. He writes and performs poetry. He won first place in men's poetry reading at PEKSIMIDA Bali 2024 and represented Bali at PEKSIMINAS 2024 at Universitas Negeri Jakarta. At PEKSIMIDA Bali 2026 he won first place in poetry writing and advanced to PEKSIMINAS 2026 at Universitas Negeri Jember.",
    achievementsTitle: "Achievements",
    achievements: [
      "1st place, Poetry Writing, PEKSIMIDA Bali 2026",
      "Bali delegate, PEKSIMINAS 2026",
      "1st place, Men's Poetry Reading, PEKSIMIDA Bali 2024",
      "Bali delegate, PEKSIMINAS 2024",
      "1st place, National Poetry Reading, CORISINDO 2024",
      "2nd place, National Poetry Reading, OFSN 2024",
    ],
    category: { puisi: "Poem", cerpen: "Short story", novel: "Novel" },
    loading: "Loading works...",
    empty: "Nothing here yet.",
    sections: (n: number) => `${n} ${n === 1 ? "part" : "parts"}`,
    preview: (n: number) => `Preview, ${n} ${n === 1 ? "part" : "parts"}`,
    moreSections: (n: number) => `and ${n} more ${n === 1 ? "part" : "parts"}`,
    readFrom: (label: string) => `Start from ${label}`,
    cover: (title: string) => `Cover of ${title}`,
    latestPoems: "Latest poems",
    morePoems: (n: number) => `${n} more poems`,
    searchPoetry: "Search poems by title, lines, or themes...",
    searchResults: (count: number, query: string) => `Found ${count} ${count === 1 ? "poem" : "poems"} for "${query}"`,
    noPoetryFound: (query: string) => `No poems found matching "${query}".`,
    clearSearch: "Clear search",
    reader: {
      notFound: "This work could not be found.", backHome: "Back to the writing", back: "Back",
      share: "Copy link", settings: "Display settings", quietOn: "Distraction-free mode", quietOff: "Exit distraction-free mode",
      panelTitle: "Reading settings", close: "Close", size: "Text size:", align: "Alignment:", paper: "Paper colour:",
      themes: { cream: "Cream", parchment: "Parchment", sepia: "Sepia", "clean-white": "White", obsidian: "Night" },
      previewEnd: "The preview ends here.", byline: "By I Dewa Made Dharma Putra Santika",
      more: { puisi: "More poems", cerpen: "More short stories", novel: "Novel shelf" },
    },
    comments: {
      title: "Comments", count: (n: number) => `Comments (${n})`,
      rules: "Please be kind. Comments that break the rules may be hidden.",
      placeholder: "Write a comment...", replyPlaceholder: "Write a reply...",
      send: "Post", sending: "Posting...", save: "Save", cancel: "Cancel",
      signInPrompt: "Sign in to comment. You do not need an account to read.",
      google: "Continue with Google", orEmail: "or by email", emailPlaceholder: "you@email.com",
      emailSend: "Email me a link", emailSent: "Sign-in link sent. Check your email.",
      signedInAs: (name: string) => `Signed in as ${name}`, signOut: "Sign out", rename: "Rename",
      reply: "Reply", edit: "Edit", remove: "Delete", report: "Report", reported: "Reported",
      confirmDelete: "Delete this comment?", edited: "edited", author: "Author",
      hidden: "Hidden", hide: "Hide", show: "Show",
      block: "Block", blocked: "User blocked.", confirmBlock: "Block this user from commenting?",
      reports: (n: number) => `${n} ${n === 1 ? "report" : "reports"}`,
      empty: "No comments yet. Be the first.", loading: "Loading comments...", loadError: "Comments could not be loaded.",
      errors: {
        generic: "Something went wrong. Try again.", tooFast: "Too fast. Wait a moment and try again.",
        dailyLimit: "You have reached the daily comment limit.", banned: "Your account cannot comment.",
        length: "A comment must be 1 to 2000 characters.", name: "A name must be 2 to 40 characters and cannot use a reserved name.",
        sendLink: "The sign-in link could not be sent. Try again later.",
      },
    },
    pager: { label: "Poem pages", prev: "Previous", next: "Next", page: (n: number, total: number) => `Page ${n} of ${total}`, goTo: (n: number) => `Page ${n}` },
  },
} as const;

export function useWriterCopy() {
  const { language } = useLanguage();
  const c = copy[language] ?? copy.id;
  const formatDate = (date: string) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!m) return date;
    const month = MONTHS[language]?.[Number(m[2]) - 1] ?? MONTHS.id[Number(m[2]) - 1];
    return language === "en" ? `${month} ${Number(m[3])}, ${m[1]}` : `${Number(m[3])} ${month} ${m[1]}`;
  };
  return { ...c, formatDate };
}
