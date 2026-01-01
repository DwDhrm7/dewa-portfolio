"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { artifacts } from "@/data/artifacts";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Link from "next/link";

export default function PortfolioPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const projectBased = artifacts.filter((a) => a.category === "Project Based");
  const caseBased = artifacts.filter((a) => a.category === "Case Based");
  const additional = artifacts.filter((a) => a.category === "Additional");

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.portfolio.title} subtitle={t.portfolio.subtitle} />

        {/* Project Based Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#F9FAFB] mb-2">
              {t.portfolio.projectBasedTitle}
            </h3>
            <p className="text-[#D1D5DB]">{t.portfolio.projectBasedDesc}</p>
          </div>

          <div className="space-y-8">
            {projectBased.map((artifact, index) => (
              <ProjectCard
                key={artifact.id}
                artifact={artifact}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Case Based Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#F9FAFB] mb-2">
              {t.portfolio.caseBasedTitle}
            </h3>
            <p className="text-[#D1D5DB]">{t.portfolio.caseBasedDesc}</p>
          </div>

          <div className="space-y-8">
            {caseBased.map((artifact, index) => (
              <ProjectCard
                key={artifact.id}
                artifact={artifact}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Additional Artifacts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#F9FAFB] mb-2">
              {t.portfolio.additionalTitle}
            </h3>
            <p className="text-[#D1D5DB]">{t.portfolio.additionalDesc}</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {additional.map((artifact, index) => (
              <ProjectCard
                key={artifact.id}
                artifact={artifact}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-[#22D3EE]/10 to-[#FACC15]/10 rounded-2xl p-10 border border-[#22D3EE]/30"
        >
          <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">
            {t.portfolio.ctaTitle}
          </h3>
          <p className="text-[#D1D5DB] mb-6 max-w-2xl mx-auto">
            {t.portfolio.ctaDesc}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all duration-300 hover:scale-105"
          >
            {t.portfolio.ctaButton}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

