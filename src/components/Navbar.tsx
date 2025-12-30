"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.resume, href: "/resume" },
    { name: t.nav.portfolio, href: "/portfolio" },
    { name: t.nav.contact, href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#050816]/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#ecd5cc] to-[#FACC15] bg-clip-text text-transparent">
              Dewa Dharma
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#E5E7EB] hover:text-[#22D3EE] transition-colors duration-300 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle Button - DESKTOP */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 bg-[#22D3EE]/10 text-[#22D3EE] rounded-lg hover:bg-[#22D3EE]/20 transition-colors border border-[#22D3EE]/30"
              title="Change Language"
            >
              <Languages size={18} />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E5E7EB] hover:text-[#22D3EE] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[#E5E7EB] hover:text-[#22D3EE] hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle Button - MOBILE */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#22D3EE]/10 text-[#22D3EE] rounded-lg hover:bg-[#22D3EE]/20 transition-colors border border-[#22D3EE]/30"
            >
              <Languages size={18} />
              <span className="text-sm font-medium">
                {language === "id" ? "English" : "Bahasa Indonesia"}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}