"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Lock, 
  Unlock, 
  PenTool, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Save, 
  ArrowLeft, 
  Layers, 
  BookOpen, 
  Feather, 
  Settings, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  Type,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  X
} from "lucide-react";
import { 
  WriterItem, 
  WriterCategory, 
  NovelChapter, 
  
  TypographyPaperTheme, 
  TypographyFontSize, 
  TypographyAlignment,
  TypographyLineSpacing 
} from "@/types/writer";

export default function WriterStudioPage() {
  const [authState, setAuthState] = useState<"checking" | "locked" | "open">("checking");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [configured, setConfigured] = useState<boolean>(true);

  // Items state
  const [items, setItems] = useState<WriterItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"all" | "puisi" | "cerpen" | "novel">("all");

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [editingItem, setEditingItem] = useState<Partial<WriterItem>>({
    category: "puisi",
    title: "",
    subtitle: "",
    synopsis: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "3 min read",
    tags: ["Puisi"],
    isPublished: true,
    chapters: [],
    typography: {
      fontFamily: "fraunces",
      fontSize: "base",
      alignment: "center",
      paperTheme: "cream",
      lineSpacing: "relaxed",
    },
  });

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  /** One place for network + status handling; a 401 anywhere means the session ended. */
  async function api<T = unknown>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; json: T & { error?: string } }> {
    try {
      const res = await fetch(url, init);
      const json = (await res.json().catch(() => ({}))) as T & { error?: string };
      if (res.status === 401 && url !== "/api/writer/auth") setAuthState("locked");
      return { ok: res.ok, status: res.status, json };
    } catch {
      return { ok: false, status: 0, json: { error: "Tidak dapat terhubung ke server." } as T & { error?: string } };
    }
  }

  useEffect(() => {
    api<{ authenticated: boolean; configured: boolean }>("/api/writer/auth").then(({ json }) => {
      setConfigured(json.configured !== false);
      setAuthState(json.authenticated ? "open" : "locked");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authState === "open") fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  async function fetchItems() {
    setIsLoading(true);
    const { ok, json } = await api<{ data?: WriterItem[] }>("/api/writer");
    if (ok && Array.isArray(json.data)) setItems(json.data);
    else showNotify(json.error || "Gagal memuat daftar karya.", "error");
    setIsLoading(false);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setLoginError("");
    const { ok, status, json } = await api("/api/writer/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
    });
    if (ok) {
      setPasswordInput("");
      setAuthState("open");
    } else if (status === 401) {
      setLoginError("Kata sandi tidak sesuai.");
    } else if (status === 429) {
      setLoginError(json.error || "Terlalu banyak percobaan. Coba lagi nanti.");
    } else if (status === 403) {
      setLoginError("Permintaan ditolak. Buka Studio langsung dari alamat situs ini, lalu coba lagi.");
    } else if (status === 0) {
      setLoginError(json.error || "Tidak dapat terhubung ke server.");
    } else {
      setLoginError(`Server sedang bermasalah (kode ${status}). Coba muat ulang halaman.`);
    }
    setIsSigningIn(false);
  };

  const handleLogout = async () => {
    await api("/api/writer/auth", { method: "DELETE" });
    setItems([]);
    setAuthState("locked");
    setPasswordInput("");
  };

  const openNewItemEditor = (cat: WriterCategory = "puisi") => {
    setEditingItem({
      id: `${cat}-${Date.now()}`,
      slug: "",
      category: cat,
      title: "",
      subtitle: "",
      synopsis: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      readTime: cat === "puisi" ? "3 min read" : cat === "cerpen" ? "10 min read" : "45 min read",
      tags: [cat.toUpperCase()],
      isPublished: true,
      chapters: cat === "novel" ? [
        {
          id: `ch-1-${Date.now()}`,
          chapterNumber: 1,
          title: "Bab 1: Permulaan",
          content: "Tulis isi bab pertama di sini...",
          date: new Date().toISOString().split("T")[0],
        }
      ] : [],
      typography: {
        fontFamily: cat === "puisi" ? "fraunces" : "serif",
        fontSize: cat === "puisi" ? "lg" : "base",
        alignment: cat === "puisi" ? "center" : "justify",
        paperTheme: "cream",
        lineSpacing: "relaxed",
      },
    });
    setEditorMode("write");
    setIsEditorOpen(true);
  };

  const openEditItem = async (item: WriterItem) => {
    const { ok, json } = await api<{ data?: WriterItem }>(`/api/writer?slug=${encodeURIComponent(item.slug)}`);
    if (!ok || !json.data) {
      showNotify(json.error || "Gagal membuka karya.", "error");
      return;
    }
    const { excerpt: _excerpt, ...full } = json.data;
    setEditingItem(full);
    setEditorMode("write");
    setIsEditorOpen(true);
  };

  const handleDeleteItem = async (id: string, title: string) => {
    if (!confirm(`Hapus karya "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    const { ok, json } = await api<{ data?: WriterItem[] }>(`/api/writer?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (ok && json.data) {
      setItems(json.data);
      showNotify("Karya berhasil dihapus.", "success");
    } else {
      showNotify(json.error || "Gagal menghapus karya.", "error");
    }
  };

  const handleSaveItem = async () => {
    if (!editingItem.title?.trim() || !editingItem.category) {
      showNotify("Judul dan kategori wajib diisi.", "error");
      return;
    }
    if (isSaving) return;
    setIsSaving(true);
    const { ok, json } = await api<{ data?: WriterItem[] }>("/api/writer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem),
    });
    setIsSaving(false);

    if (ok && json.data) {
      setItems(json.data);
      setIsEditorOpen(false);
      showNotify("Karya berhasil disimpan.", "success");
    } else {
      showNotify(json.error || "Gagal menyimpan karya.", "error");
    }
  };

  const showNotify = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Chapter handlers for novel
  const addChapter = () => {
    const chapters = editingItem.chapters || [];
    const newNum = chapters.length + 1;
    const newChapter: NovelChapter = {
      id: `ch-${newNum}-${Date.now()}`,
      chapterNumber: newNum,
      title: `Bab ${newNum}: Judul Bab`,
      content: "",
      date: new Date().toISOString().split("T")[0],
    };
    setEditingItem({
      ...editingItem,
      chapters: [...chapters, newChapter],
    });
  };

  const updateChapter = (index: number, field: keyof NovelChapter, val: any) => {
    const chapters = [...(editingItem.chapters || [])];
    chapters[index] = { ...chapters[index], [field]: val };
    setEditingItem({ ...editingItem, chapters });
  };

  const removeChapter = (index: number) => {
    const chapters = (editingItem.chapters || []).filter((_, i) => i !== index);
    // re-number
    const renumbered = chapters.map((ch, idx) => ({ ...ch, chapterNumber: idx + 1 }));
    setEditingItem({ ...editingItem, chapters: renumbered });
  };

  if (authState === "checking") {
    return <div className="min-h-screen bg-paper" />;
  }

  if (authState === "locked") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6 pt-20 text-ink">
        <div className="w-full max-w-sm border border-ink/10 bg-paper p-10 text-center">
          <Lock size={22} className="mx-auto text-oak" />
          <h1 className="mt-5 text-3xl font-normal">Studio</h1>
          <p className="mt-2 text-ink-soft">Khusus penulis.</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Kata sandi"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-ink/20 bg-paper px-4 py-3 text-center text-lg text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-oak"
              autoFocus
            />
            {!configured && (
              <p className="text-sm text-ink-soft">Studio belum diaktifkan. Isi WRITER_STUDIO_PASSWORD (minimal 8 karakter) di environment server.</p>
            )}
            {loginError && <p className="text-sm text-[#9b3b2a]">{loginError}</p>}
            <button
              type="submit"
              disabled={isSigningIn || passwordInput.length === 0}
              className="w-full bg-ink py-3 text-lg text-paper transition hover:bg-ink/85 disabled:opacity-50"
            >
              {isSigningIn ? "Memeriksa..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-neutral-900 px-6 pb-28 pt-32 md:px-14 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        
        {/* Toast Notification */}
        {notification && (
          <div className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3 text-xs ${
            notification.type === "success" ? "bg-neutral-950 text-neutral-100" : "bg-rose-950 text-rose-100"
          }`}>
            <CheckCircle size={15} />
            <span>{notification.message}</span>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="mb-12 border-b border-stone-900/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="rounded-full bg-stone-900/10 px-3 py-1 text-xs italic text-stone-900 font-medium">
                STUDIO CMS INTERNAL // DEWA DHARMA
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-neutral-500 hover:text-black underline"
              >
                Keluar (Kunci Studio)
              </button>
            </div>
            <h1 className="text-4xl sm:text-5xl font-normal text-neutral-950">
              Meja Kerja Penulis
            </h1>
            <p className="text-sm text-neutral-600 mt-2">
              Kelola seluruh karya tulis, bab novel, tipografi huruf, serta suasana kertas publikasi Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openNewItemEditor("puisi")}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-900/20 bg-white px-4 py-2.5 text-xs font-semibold text-stone-950 hover:bg-stone-100 transition shadow-sm"
            >
              <Feather size={14} className="text-stone-700" />
              <span>+ Tulis Puisi</span>
            </button>

            <button
              onClick={() => openNewItemEditor("cerpen")}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-900/20 bg-white px-4 py-2.5 text-xs font-semibold text-stone-950 hover:bg-stone-100 transition shadow-sm"
            >
              <BookOpen size={14} className="text-stone-700" />
              <span>+ Tulis Cerpen</span>
            </button>

            <button
              onClick={() => openNewItemEditor("novel")}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-stone-50 hover:bg-black transition shadow-md"
            >
              <Plus size={14} />
              <span>+ Buat Novel Baru</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="rounded-2xl border border-stone-900/10 bg-white p-5">
            <span className="text-xs text-neutral-500 block mb-1">Total Karya</span>
            <span className="text-3xl font-normal text-neutral-950">{items.length}</span>
          </div>
          <div className="rounded-2xl border border-stone-900/10 bg-white p-5">
            <span className="text-xs text-neutral-500 block mb-1">Puisi</span>
            <span className="text-3xl font-normal text-neutral-950">
              {items.filter((i) => i.category === "puisi").length}
            </span>
          </div>
          <div className="rounded-2xl border border-stone-900/10 bg-white p-5">
            <span className="text-xs text-neutral-500 block mb-1">Cerita Pendek</span>
            <span className="text-3xl font-normal text-neutral-950">
              {items.filter((i) => i.category === "cerpen").length}
            </span>
          </div>
          <div className="rounded-2xl border border-stone-900/10 bg-white p-5">
            <span className="text-xs text-neutral-500 block mb-1">Novel</span>
            <span className="text-3xl font-normal text-neutral-950">
              {items.filter((i) => i.category === "novel").length}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-6 flex gap-2">
          {[
            { id: "all", label: "Semua" },
            { id: "puisi", label: "Puisi" },
            { id: "cerpen", label: "Cerpen" },
            { id: "novel", label: "Novel" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-full px-4 py-1.5 text-xs transition ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white font-semibold"
                  : "border border-stone-900/15 bg-white/70 text-neutral-700 hover:bg-stone-100/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Works Table / Card Grid */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-900/15 bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-900 font-bold text-sm">
                  {item.category === "puisi" ? (
                    <Feather size={18} />
                  ) : item.category === "novel" ? (
                    <BookOpen size={18} />
                  ) : (
                    <Layers size={18} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-stone-900/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-900">
                      {item.category}
                    </span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-500">{item.date}</span>
                    {item.category === "novel" && (
                      <span className="text-xs text-stone-800 font-medium">
                        · {item.chapters?.length ?? 0} Bab
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-normal text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-1 mt-1 max-w-xl">
                    {item.synopsis || item.subtitle || "Tidak ada sinopsis"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/writer/read/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-black/10 bg-black/[0.02] p-2.5 text-neutral-700 hover:bg-black/5 hover:text-black transition"
                  title="Lihat Pratinjau Pembaca"
                >
                  <Eye size={16} />
                </Link>

                <button
                  onClick={() => openEditItem(item)}
                  className="rounded-xl border border-stone-900/20 bg-stone-50 p-2.5 text-stone-900 hover:bg-stone-100 transition"
                  title="Sunting Karya"
                >
                  <Edit3 size={16} />
                </button>

                <button
                  onClick={() => handleDeleteItem(item.id, item.title)}
                  className="rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-rose-600 hover:bg-rose-100 transition"
                  title="Hapus Karya"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FULL COMPREHENSIVE EDITOR & TYPOGRAPHY MODAL */}
      {/* ========================================================================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl border border-stone-900/20 bg-[#FAF7F0] p-6 sm:p-10 shadow-2xl max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-stone-900/15 mb-6">
              <div>
                <span className="italic text-xs tracking-wider text-stone-800 uppercase block">
                  PENGATUR KARYA & TIPOGRAFI
                </span>
                <h2 className="text-2xl sm:text-3xl font-normal text-neutral-950">
                  {editingItem.title ? `Sunting: ${editingItem.title}` : "Tulis Karya Baru"}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {/* Mode toggle */}
                <div className="flex bg-stone-950/10 p-1 rounded-xl">
                  <button
                    onClick={() => setEditorMode("write")}
                    className={`px-3 py-1.5 rounded-lg text-xs transition ${
                      editorMode === "write" ? "bg-stone-900 text-white font-semibold" : "text-neutral-700"
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    onClick={() => setEditorMode("preview")}
                    className={`px-3 py-1.5 rounded-lg text-xs transition ${
                      editorMode === "preview" ? "bg-stone-900 text-white font-semibold" : "text-neutral-700"
                    }`}
                  >
                    Live Preview
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="rounded-xl border border-black/10 bg-white/80 p-2 text-neutral-500 hover:text-black"
                  aria-label="Tutup editor"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {editorMode === "write" ? (
              <div className="space-y-6 text-sm">
                
                {/* Row 1: Category & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 block mb-1.5 font-semibold">
                      Kategori Karya:
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as WriterCategory })}
                      className="w-full rounded-xl border border-stone-900/20 bg-white p-3 outline-none"
                    >
                      <option value="puisi">Puisi / Bait Sajak</option>
                      <option value="cerpen">Cerpen (Cerita Pendek)</option>
                      <option value="novel">Novel (Multi-Bab)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-neutral-500 block mb-1.5 font-semibold">
                      Judul Karya:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Batas Sunyi di Ujung Senja"
                      value={editingItem.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full rounded-xl border border-stone-900/20 bg-white p-3 outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Subtitle & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-neutral-500 block mb-1.5">
                      Subjudul / Keterangan Singkat:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Renungan tentang jeda di antara riuh dunia"
                      value={editingItem.subtitle || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                      className="w-full rounded-xl border border-stone-900/20 bg-white p-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 block mb-1.5">
                      Tanggal & Estimasi Baca:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 3 min read"
                      value={editingItem.readTime || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                      className="w-full rounded-xl border border-stone-900/20 bg-white p-3 outline-none"
                    />
                  </div>
                </div>

                {/* Synopsis */}
                <div>
                  <label className="text-xs text-neutral-500 block mb-1.5 font-semibold">
                    Sinopsis / Pengantar Editorial:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tuliskan gambaran ringkas karya ini..."
                    value={editingItem.synopsis || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, synopsis: e.target.value })}
                    className="w-full rounded-xl border border-stone-900/20 bg-white p-3 outline-none"
                  />
                </div>

                {/* Cover Image URL */}
                <div>
                  <label className="text-xs text-neutral-500 block mb-1.5">
                    Cover Art / Gambar Sampul (URL):
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={editingItem.coverImage || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, coverImage: e.target.value })}
                    className="w-full rounded-xl border border-stone-900/20 bg-white p-3 text-xs outline-none"
                  />
                </div>

                {/* ========================================================= */}
                {/* TYPOGRAPHY & AESTHETIC CONFIG (USER'S EXPLICIT REQUEST) */}
                {/* ========================================================= */}
                <div className="rounded-2xl border border-stone-900/20 bg-white p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-900/10">
                    <Palette size={16} className="text-stone-700" />
                    <span className="italic text-xs font-bold text-stone-950 uppercase tracking-wider">
                      Pengaturan Tipografi & Nuansa Publikasi
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    {/* Font Size */}
                    <div>
                      <label className="text-neutral-500 block mb-1">Ukuran Default:</label>
                      <select
                        value={editingItem.typography?.fontSize || "base"}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          typography: {
                            ...editingItem.typography!,
                            fontSize: e.target.value as TypographyFontSize,
                          }
                        })}
                        className="w-full rounded-lg border border-black/10 p-2 bg-white"
                      >
                        <option value="sm">Kecil (sm)</option>
                        <option value="base">Standar (base)</option>
                        <option value="lg">Besar (lg)</option>
                        <option value="xl">Sangat Besar (xl)</option>
                      </select>
                    </div>

                    {/* Alignment */}
                    <div>
                      <label className="text-neutral-500 block mb-1">Perataan Teks:</label>
                      <select
                        value={editingItem.typography?.alignment || "justify"}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          typography: {
                            ...editingItem.typography!,
                            alignment: e.target.value as TypographyAlignment,
                          }
                        })}
                        className="w-full rounded-lg border border-black/10 p-2 bg-white"
                      >
                        <option value="center">Tengah (Cocok Puisi)</option>
                        <option value="justify">Rata Kanan Kiri</option>
                        <option value="left">Rata Kiri</option>
                      </select>
                    </div>

                    {/* Paper Theme */}
                    <div>
                      <label className="text-neutral-500 block mb-1">Nuansa Kertas:</label>
                      <select
                        value={editingItem.typography?.paperTheme || "cream"}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          typography: {
                            ...editingItem.typography!,
                            paperTheme: e.target.value as TypographyPaperTheme,
                          }
                        })}
                        className="w-full rounded-lg border border-black/10 p-2 bg-white"
                      >
                        <option value="cream">Krem Hangat (Cream)</option>
                        <option value="parchment">Perkamen Tua (Parchment)</option>
                        <option value="sepia">Sepia Vintage</option>
                        <option value="clean-white">Putih Murni</option>
                        <option value="obsidian">Malam Obsidian</option>
                        <option value="dusk">Senja Lembut</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* CONTENT AREA: PUISI & CERPEN vs NOVEL CHAPTERS */}
                {editingItem.category === "novel" ? (
                  /* ================= NOVEL CHAPTER MANAGER ================= */
                  <div className="space-y-4 pt-4 border-t border-stone-900/15">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">
                        Daftar Bab Novel ({editingItem.chapters?.length || 0} Bab):
                      </span>
                      <button
                        type="button"
                        onClick={addChapter}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-3.5 py-1.5 text-xs text-white hover:bg-black transition"
                      >
                        <Plus size={13} />
                        <span>Tambah Bab</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {(editingItem.chapters || []).map((ch, idx) => (
                        <div key={ch.id} className="rounded-2xl border border-stone-900/20 bg-white p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="italic text-xs font-semibold text-stone-900">
                              BAB {idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeChapter(idx)}
                              className="text-xs text-rose-600 hover:underline"
                            >
                              Hapus Bab Ini
                            </button>
                          </div>

                          <div className="mb-3">
                            <input
                              type="text"
                              placeholder="Judul Bab (Contoh: Bab 1: Titik Temu di Bawah Gerimis)"
                              value={ch.title}
                              onChange={(e) => updateChapter(idx, "title", e.target.value)}
                              className="w-full rounded-lg border border-black/10 p-2.5 text-sm font-semibold outline-none"
                            />
                          </div>

                          <div>
                            <textarea
                              rows={8}
                              placeholder="Tuliskan narasi lengkap untuk bab ini..."
                              value={ch.content}
                              onChange={(e) => updateChapter(idx, "content", e.target.value)}
                              className="w-full rounded-lg border border-black/10 p-3 text-sm leading-relaxed outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ================= PUISI & CERPEN BODY TEXTAREA ================= */
                  <div>
                    <label className="text-xs text-neutral-500 block mb-1.5 font-semibold">
                      Isi Karya {editingItem.category === "puisi" ? "(Bait Sajak)" : "(Cerita Lengkap)"}:
                    </label>
                    <textarea
                      rows={14}
                      placeholder={editingItem.category === "puisi" 
                        ? "Tulis bait-bait puisimu di sini. Gunakan baris baru untuk jeda bait..." 
                        : "Tulis cerita pendekmu di sini..."
                      }
                      value={editingItem.content || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      className="w-full rounded-2xl border border-stone-900/20 bg-white p-5 text-base leading-relaxed outline-none shadow-inner"
                    />
                  </div>
                )}

              </div>
            ) : (
              /* LIVE PREVIEW */
              <div className="p-8 rounded-2xl bg-white border border-stone-900/20 max-w-2xl mx-auto shadow-sm">
                <div className="text-center mb-8">
                  <span className="text-xs uppercase tracking-widest text-stone-800">
                    {editingItem.category}
                  </span>
                  <h3 className="text-3xl font-normal mt-2">
                    {editingItem.title || "Judul Belum Ditulis"}
                  </h3>
                  {editingItem.subtitle && (
                    <p className="italic text-sm text-neutral-600 mt-1">
                      {editingItem.subtitle}
                    </p>
                  )}
                </div>

                <div className="whitespace-pre-line leading-relaxed text-neutral-800">
                  {editingItem.category === "novel"
                    ? (editingItem.chapters?.[0]?.content || "Belum ada bab yang ditulis.")
                    : (editingItem.content || "Belum ada isi tulisan.")
                  }
                </div>
              </div>
            )}

            {/* Modal Footer Actions */}
            <div className="mt-8 pt-6 border-t border-stone-900/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="rounded-xl border border-black/10 px-6 py-2.5 text-xs text-neutral-700 hover:bg-black/5"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSaveItem}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-8 py-3 text-xs font-semibold text-white hover:bg-black transition shadow-md disabled:opacity-60"
              >
                <Save size={14} />
                <span>{isSaving ? "Menyimpan..." : "Simpan Karya"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
