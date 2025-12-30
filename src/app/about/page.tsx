"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Sparkles, Target, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const values = [
    {
      icon: Sparkles,
      title: t.about.value1Title,
      description: t.about.value1Desc,
    },
    {
      icon: Target,
      title: t.about.value2Title,
      description: t.about.value2Desc,
    },
    {
      icon: Heart,
      title: t.about.value3Title,
      description: t.about.value3Desc,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title={t.about.title} subtitle={t.about.subtitle} />

        {/* Main Profile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#F9FAFB] mb-4">
            {t.about.greeting}
          </h3>

          <div className="space-y-4 text-[#D1D5DB] leading-relaxed">
            <p>{t.about.intro1}</p>
            <p>{t.about.intro2}</p>
            <p>{t.about.intro3}</p>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-[#F9FAFB] mb-6">
            {t.about.interestsTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.about.interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-xl p-5 border border-white/10 hover:border-[#22D3EE]/50 transition-all duration-300"
              >
                <p className="text-[#E5E7EB] font-medium">{interest}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-[#22D3EE]/10 to-[#FACC15]/10 rounded-2xl p-8 md:p-10 border border-[#22D3EE]/30 mb-12"
        >
          <h3 className="text-2xl font-bold text-[#F9FAFB] mb-6">
            {t.about.goalsTitle}
          </h3>
          <ul className="space-y-4 text-[#D1D5DB]">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0" />
              <span>{t.about.goal1}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0" />
              <span>{t.about.goal2}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0" />
              <span>{t.about.goal3}</span>
            </li>
          </ul>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-[#F9FAFB] mb-6">
            {t.about.valuesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-xl p-6 border border-white/10 hover:border-[#22D3EE]/50 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-10 h-10 text-[#22D3EE] mb-4" />
                  <h4 className="text-lg font-bold text-[#F9FAFB] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-[#D1D5DB] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}