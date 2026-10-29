import { portfolioPage } from "@/lib/pageMeta";

export const metadata = portfolioPage("Portfolio · Dewa Dharma", "/tech");

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return children;
}
