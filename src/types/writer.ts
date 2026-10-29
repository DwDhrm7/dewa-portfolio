export type WriterCategory = "puisi" | "cerpen" | "novel";

export type TypographyFontFamily = "fraunces" | "serif" | "sans" | "mono" | "garamond" | "times";
export type TypographyFontSize = "sm" | "base" | "lg" | "xl";
export type TypographyAlignment = "left" | "center" | "justify";
export type TypographyPaperTheme = "cream" | "parchment" | "obsidian" | "sepia" | "clean-white";
export type TypographyLineSpacing = "normal" | "relaxed" | "loose";

export interface NovelChapter {
  id: string;
  chapterNumber: number;
  title: string;
  content: string;
  date?: string;
  wordCount?: number;
}

export interface WriterTypographyConfig {
  fontFamily: TypographyFontFamily;
  fontSize: TypographyFontSize;
  alignment: TypographyAlignment;
  paperTheme: TypographyPaperTheme;
  lineSpacing: TypographyLineSpacing;
}

export interface WriterItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: WriterCategory;
  synopsis: string;
  content?: string; // used for puisi & cerpen
  chapters?: NovelChapter[]; // used for novel
  date: string;
  readTime?: string;
  coverImage?: string;
  tags: string[];
  isPublished: boolean;
  featured?: boolean;
  /** Only part of the work is online; the reader says so after the last chapter. */
  isPreview?: boolean;
  /** Upcoming work not yet published with full chapters */
  comingSoon?: boolean;
  /** Set by the list API in place of `content`, so listings stay light. */
  excerpt?: string;
  typography: WriterTypographyConfig;
}
