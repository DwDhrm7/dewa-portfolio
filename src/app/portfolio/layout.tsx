import { portfolioPage } from "@/lib/pageMeta";

export const metadata = portfolioPage(
  "Projects · Portfolio Dewa Dharma",
  "/portfolio",
  "Projects by I Dewa Made Dharma Putra Santika across AI, computer vision, IoT, and web, with roles, stacks, and outcomes."
);

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
