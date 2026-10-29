import type { Metadata } from "next";
import { Inter, Manrope, Inter_Tight, Source_Serif_4, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollMemory from "@/components/ScrollMemory";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { siteUrl } from "@/lib/site";

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

const description =
  "I Dewa Made Dharma Putra Santika, an AIoT software engineer and writer from Bali. Step into the engineer's portfolio or the writer's blog.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Dewa Dharma · Engineer & Writer", template: "%s · Dewa Dharma" },
  description,
  applicationName: "Dewa Dharma",
  authors: [{ name: "I Dewa Made Dharma Putra Santika", url: siteUrl }],
  openGraph: {
    title: "Dewa Dharma · Engineer & Writer",
    description,
    url: "/",
    siteName: "Dewa Dharma",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dewa Dharma · Engineer & Writer",
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
