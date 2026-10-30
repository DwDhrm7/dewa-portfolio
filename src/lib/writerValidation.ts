import type {
  NovelChapter,
  TypographyAlignment,
  TypographyFontFamily,
  TypographyFontSize,
  TypographyLineSpacing,
  TypographyPaperTheme,
  WriterCategory,
  WriterItem,
} from "@/types/writer";

export const LIMITS = {
  title: 200,
  subtitle: 300,
  synopsis: 3000,
  content: 400_000,
  chapters: 200,
  chapterTitle: 200,
  chapterContent: 300_000,
  tags: 10,
  tag: 40,
  body: 4_000_000,
} as const;

const CATEGORIES: WriterCategory[] = ["puisi", "cerpen", "novel"];
const FONTS: TypographyFontFamily[] = ["fraunces", "serif", "sans", "mono", "garamond", "times"];
const SIZES: TypographyFontSize[] = ["sm", "base", "lg", "xl"];
const ALIGNMENTS: TypographyAlignment[] = ["left", "center", "justify"];
const THEMES: TypographyPaperTheme[] = ["cream", "parchment", "obsidian", "dusk", "sepia", "clean-white"];
const SPACINGS: TypographyLineSpacing[] = ["normal", "relaxed", "loose"];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID = /^[A-Za-z0-9_-]{1,100}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export type Result<T> = { ok: true; value: T } | { ok: false; errors: string[] };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function isSafeCoverUrl(value: string): boolean {
  if (value === "") return true;
  // Same-origin path only: no protocol-relative "//host", no backslash tricks, no traversal.
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") && !value.includes("..")) {
    return /^\/[\w\-./%]+$/.test(value);
  }
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function str(value: unknown, max: number, field: string, errors: string[], required = false): string {
  if (value === undefined || value === null || value === "") {
    if (required) errors.push(`${field} wajib diisi.`);
    return "";
  }
  if (typeof value !== "string") {
    errors.push(`${field} harus berupa teks.`);
    return "";
  }
  if (value.length > max) {
    errors.push(`${field} terlalu panjang (maks ${max} karakter).`);
    return "";
  }
  return value;
}

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function chapter(raw: unknown, index: number, errors: string[]): NovelChapter | null {
  if (typeof raw !== "object" || raw === null) {
    errors.push(`Bab ${index + 1} tidak valid.`);
    return null;
  }
  const c = raw as Record<string, unknown>;
  const title = str(c.title, LIMITS.chapterTitle, `Judul bab ${index + 1}`, errors, true);
  const content = str(c.content, LIMITS.chapterContent, `Isi bab ${index + 1}`, errors);
  const id = typeof c.id === "string" && ID.test(c.id) ? c.id : `ch-${index + 1}-${Date.now()}`;
  const date = typeof c.date === "string" && DATE.test(c.date) ? c.date : undefined;
  return {
    id,
    chapterNumber: index + 1,
    title,
    content,
    ...(date ? { date } : {}),
    wordCount: content.split(/\s+/).filter(Boolean).length,
  };
}

/** Validates and normalises an untrusted item. Never trusts client-supplied slug uniqueness or shape. */
export function validateItem(input: unknown): Result<WriterItem> {
  const errors: string[] = [];
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, errors: ["Data karya tidak valid."] };
  }
  const raw = input as Record<string, unknown>;

  const title = str(raw.title, LIMITS.title, "Judul", errors, true).trim();
  const category = raw.category;
  if (typeof category !== "string" || !CATEGORIES.includes(category as WriterCategory)) {
    errors.push("Kategori harus puisi, cerpen, atau novel.");
  }

  const subtitle = str(raw.subtitle, LIMITS.subtitle, "Subjudul", errors);
  const synopsis = str(raw.synopsis, LIMITS.synopsis, "Sinopsis", errors);
  const content = str(raw.content, LIMITS.content, "Isi karya", errors);

  let slug = typeof raw.slug === "string" ? raw.slug.trim() : "";
  if (slug && !SLUG.test(slug)) errors.push("Slug hanya boleh huruf kecil, angka, dan tanda hubung.");
  if (!slug) slug = slugify(title);
  if (!slug && title) errors.push("Judul harus mengandung huruf atau angka.");

  let id = typeof raw.id === "string" ? raw.id : "";
  if (id && !ID.test(id)) errors.push("ID karya tidak valid.");
  if (!id) id = `${String(category)}-${Date.now()}`;

  const coverImage = str(raw.coverImage, 500, "Cover", errors).trim();
  if (!isSafeCoverUrl(coverImage)) errors.push("Cover harus berupa path lokal (/writer/nama.jpg) atau URL https.");

  const date = typeof raw.date === "string" && DATE.test(raw.date) ? raw.date : today();
  const readTime = str(raw.readTime, 40, "Waktu baca", errors);

  const tags = (Array.isArray(raw.tags) ? raw.tags : [])
    .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
    .map((t) => t.trim().slice(0, LIMITS.tag))
    .slice(0, LIMITS.tags);

  let chapters: NovelChapter[] | undefined;
  if (category === "novel") {
    const list = Array.isArray(raw.chapters) ? raw.chapters : [];
    if (list.length > LIMITS.chapters) errors.push(`Maksimal ${LIMITS.chapters} bab.`);
    chapters = list
      .slice(0, LIMITS.chapters)
      .map((c, i) => chapter(c, i, errors))
      .filter((c): c is NovelChapter => c !== null);
  }

  const t = (typeof raw.typography === "object" && raw.typography !== null ? raw.typography : {}) as Record<string, unknown>;

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      id,
      slug,
      title,
      category: category as WriterCategory,
      ...(subtitle ? { subtitle } : {}),
      synopsis,
      ...(category === "novel" ? { chapters } : { content }),
      date,
      ...(readTime ? { readTime } : {}),
      ...(coverImage ? { coverImage } : {}),
      tags,
      isPublished: raw.isPublished !== false,
      ...(raw.featured === true ? { featured: true } : {}),
      ...(raw.comingSoon === true ? { comingSoon: true } : {}),
      typography: {
        fontFamily: pick(t.fontFamily, FONTS, "serif"),
        fontSize: pick(t.fontSize, SIZES, "base"),
        alignment: pick(t.alignment, ALIGNMENTS, "left"),
        paperTheme: pick(t.paperTheme, THEMES, "cream"),
        lineSpacing: pick(t.lineSpacing, SPACINGS, "relaxed"),
      },
    },
  };
}
