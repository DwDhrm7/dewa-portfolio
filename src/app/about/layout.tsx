import { portfolioPage } from "@/lib/pageMeta";

export const metadata = portfolioPage(
  "About · Portfolio Dewa Dharma",
  "/about",
  "About I Dewa Made Dharma Putra Santika: an IT student at ITB STIKOM Bali working across AI, IoT, robotics, and the arts."
);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
