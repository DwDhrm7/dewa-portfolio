"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-[#F9FAFB] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I Dewa Made Dharma
            <br />
            <span className="bg-gradient-to-r from-[#ef4603] to-[#FACC15] bg-clip-text text-transparent">
              Putra Santika
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#E5E7EB] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.hero.role}
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-[#D1D5DB] max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/portfolio"
              className="group px-8 py-3 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              {t.hero.viewPortfolio}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
            href={language === "id" ? "/cv-dharma-santika-id.pdf" : "/cv-dharma-santika-en.pdf"}
            download={
              language === "id"
              ? "I-Dewa-Made-Dharma-Putra-Santika-CV-ID.pdf"
              : "I-Dewa-Made-Dharma-Putra-Santika-CV-EN.pdf"
            }
            className="px-8 py-3 bg-[#0F172A] text-[#E5E7EB] border border-[#22D3EE]/30 rounded-xl font-medium hover:border-[#22D3EE] hover:bg-[#22D3EE]/10 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Download size={18} />
              {t.hero.downloadCV}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#22D3EE]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl" />
    </section>
  );
}