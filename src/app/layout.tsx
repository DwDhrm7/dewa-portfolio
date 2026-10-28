import type { Metadata } from "next";
import { Inter, Manrope, Inter_Tight, Source_Serif_4, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollMemory from "@/components/ScrollMemory";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-headline",
});

const readingSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-reading",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const handwriting = Cedarville_Cursive({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-hand",
});

const writerSans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-writer-ui",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dewa-portfolio.vercel.app";
const description = "Portfolio I Dewa Made Dharma Putra Santika - IT Student, AI & Robotics Enthusiast";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dewa Dharma | Portfolio",
  description,
  openGraph: {
    title: "Dewa Dharma | Portfolio",
    description,
    url: siteUrl,
    siteName: "Dewa Dharma Portfolio",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dewa Dharma | Portfolio",
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.variable} ${manrope.variable} ${readingSerif.variable} ${writerSans.variable} ${handwriting.variable}`}>
        <ScrollMemory />
        <LanguageProvider>
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
