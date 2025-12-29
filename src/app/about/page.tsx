"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Sparkles, Target, Heart } from "lucide-react";

export default function AboutPage() {
  const interests = [
    "Artificial Intelligence",
    "Internet of Things (IoT)",
    "Robotics & Embedded Systems",
    "Software Development",
    "Sustainable Technology",
    "Smart Cities",
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Problem Solver",
      description:
        "Saya menikmati tantangan teknis dan selalu mencari solusi kreatif untuk masalah kompleks.",
    },
    {
      icon: Target,
      title: "Kolaboratif",
      description:
        "Percaya bahwa inovasi terbaik lahir dari kolaborasi lintas disiplin dan pertukaran ide.",
    },
    {
      icon: Heart,
      title: "Eksplorasi Lintas Disiplin",
      description:
        "Menggabungkan teknologi dengan seni dan humaniora untuk menciptakan solusi yang bermakna.",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Tentang Saya" subtitle="Mengenal lebih dekat" />

        {/* Main Profile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#F9FAFB] mb-4">
            Halo! Saya Dewa Dharma👋
          </h3>

          <div className="space-y-4 text-[#D1D5DB] leading-relaxed">
            <p>
              Saya adalah mahasiswa <span className="text-[#22D3EE] font-medium">ITB STIKOM Bali </span>  
              yang memiliki passion mendalam di bidang teknologi dan seni. Perjalanan saya di dunia IT dimulai 
              dari ketertarikan terhadap bagaimana teknologi dapat mengubah kehidupan manusia menjadi lebih baik.
            </p>

            <p>
              Fokus utama saya adalah pengembangan sistem cerdas yang menggabungkan{" "}
              <span className="text-[#FACC15] font-medium">Artificial Intelligence</span>,{" "}
              <span className="text-[#FACC15] font-medium">Internet of Things</span>, dan{" "}
              <span className="text-[#FACC15] font-medium">Robotika</span>. Saya percaya bahwa teknologi 
              terbaik adalah yang dapat diakses dan memberikan dampak nyata kepada masyarakat.
            </p>

            <p>
              Selain dunia teknis, saya juga aktif dalam seni teater atau keaktoran dan sastra. Bagi saya, seni adalah 
              cara untuk memahami perspektif manusia yang lebih dalam, yang kemudian dapat saya terapkan 
              dalam merancang teknologi yang lebih human-centered dan bermakna.
            </p>
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
            Minat & Keahlian Utama
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interests.map((interest, index) => (
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
            Tujuan Pengembangan Diri
          </h3>
          <ul className="space-y-4 text-[#D1D5DB]">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0" />
              <span>
                Melanjutkan studi S2 di bidang AI/Robotics di universitas terkemuka, 
                baik dalam maupun luar negeri, untuk memperdalam riset dan kontribusi ilmiah.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0" />
              <span>
                Berkarier di perusahaan teknologi global atau startup inovatif yang 
                berfokus pada pengembangan AI dan IoT untuk smart city dan sustainable technology.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0" />
              <span>
                Berkontribusi pada ekosistem teknologi Indonesia melalui riset, publikasi ilmiah, 
                dan pembinaan generasi muda di bidang AI dan robotika.
              </span>
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
            Cara Saya Bekerja
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
