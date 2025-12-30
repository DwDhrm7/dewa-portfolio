"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="relative z-10 bg-[#0F172A]/50 backdrop-blur-sm border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-[#D1D5DB] text-sm">
              {t.footer.copyright}
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="mailto:madedharmaputrasantikaidewa@gmail.com"
              className="text-[#D1D5DB] hover:text-[#22D3EE] transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/idewamadedharmaputrasantika/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D1D5DB] hover:text-[#22D3EE] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/DwDhrm7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D1D5DB] hover:text-[#22D3EE] transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}