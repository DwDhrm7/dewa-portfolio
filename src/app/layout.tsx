import type { Metadata } from "next";
import { Inter, Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Dewa Dharma | Portfolio",
  description:
    "Portfolio I Dewa Made Dharma Putra Santika - IT Student, AI & Robotics Enthusiast",
  openGraph: {
    title: "Dewa Dharma | Portfolio",
    description: "Portfolio I Dewa Made Dharma Putra Santika - IT Student, AI & Robotics Enthusiast",
    url: "https://dewa-portfolio.vercel.app", // Adjust with actual domain
    siteName: "Dewa Dharma Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Please place an og-image.jpg in your public folder
        width: 1200,
        height: 630,
        alt: "Dewa Dharma Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dewa Dharma | Portfolio",
    description: "Portfolio I Dewa Made Dharma Putra Santika - IT Student, AI & Robotics Enthusiast",
    images: ["/og-image.jpg"],
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
    <html lang="id">
      <body className={`antialiased ${inter.variable} ${manrope.variable} ${fraunces.variable}`}>
        <LanguageProvider>
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
