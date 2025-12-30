import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
import { LanguageProvider } from "@/contexts/LanguageContext";  // ← TAMBAH INI

export const metadata: Metadata = {
  title: "Dewa Dharma",
  description:
    "Portfolio profesional I Dewa Made Dharma Putra Santika - IT Student, AI & Robotics Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <LanguageProvider>  {/* ← WRAP DENGAN INI */}
          <SnowEffect />
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>  {/* ← TUTUP DI SINI */}
      </body>
    </html>
  );
}