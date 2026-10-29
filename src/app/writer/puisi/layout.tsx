import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poetry",
  alternates: { canonical: "/writer/puisi" },
};

export default function PuisiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
