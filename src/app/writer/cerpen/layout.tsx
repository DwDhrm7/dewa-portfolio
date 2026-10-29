import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short stories",
  alternates: { canonical: "/writer/cerpen" },
};

export default function CerpenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
