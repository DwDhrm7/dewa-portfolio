import { portfolioPage } from "@/lib/pageMeta";

export const metadata = portfolioPage(
  "Resume · Portfolio Dewa Dharma",
  "/resume",
  "Resume of I Dewa Made Dharma Putra Santika: experience, research, skills, tools, and downloadable CV in English and Indonesian."
);

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
