"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { artifacts } from "@/data/artifacts";

export default function PortfolioPage() {
  const projectBased = artifacts.filter((a) => a.category === "Project Based");
  const caseBased = artifacts.filter((a) => a.category === "Case Based");
  const additional = artifacts.filter((a) => a.category === "Additional");

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Portfolio"
          subtitle="Karya & Kontribusi Saya"
        />

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
              Project Based
            </h3>
            <p className="text-[#D1D5DB]">
              Proyek utama dengan pengembangan lengkap dari ideasi hingga
              implementasi
            </p>
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
              Case Based
            </h3>
            <p className="text-[#D1D5DB]">
              Kontribusi dalam penelitian dan studi kasus akademis
            </p>
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
              Additional Artifacts
            </h3>
            <p className="text-[#D1D5DB]">
              Karya seni, kepemimpinan, dan kolaborasi lintas disiplin
            </p>
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
            Tertarik untuk berkolaborasi?
          </h3>
          <p className="text-[#D1D5DB] mb-6 max-w-2xl mx-auto">
            Saya selalu terbuka untuk diskusi proyek baru, kolaborasi riset,
            atau sekadar berbagi ide tentang teknologi dan inovasi.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all duration-300 hover:scale-105"
          >
            Hubungi Saya
          </a>
        </motion.div>
      </div>
    </div>
  );
}
