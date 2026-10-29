import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novels",
  alternates: { canonical: "/writer/novel" },
};

export default function NovelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
