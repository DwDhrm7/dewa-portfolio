import { portfolioPage } from "@/lib/pageMeta";

export const metadata = portfolioPage(
  "Contact · Portfolio Dewa Dharma",
  "/contact",
  "Get in touch with I Dewa Made Dharma Putra Santika for collaborations, projects, or opportunities."
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
