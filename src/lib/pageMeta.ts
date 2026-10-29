import type { Metadata } from "next";

const PORTFOLIO_DESCRIPTION =
  "Portfolio of I Dewa Made Dharma Putra Santika: AI, IoT, and web projects, published research, and experience.";

/** Metadata for a page of the tech realm, which is presented as the portfolio. */
export function portfolioPage(title: string, path: string, description = PORTFOLIO_DESCRIPTION): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { title, description },
  };
}
