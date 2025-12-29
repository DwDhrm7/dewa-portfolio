"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import TimelineItem from "@/components/TimelineItem";
import { GraduationCap, Code, Users, Globe } from "lucide-react";

export default function ResumePage() {
  const hardSkills = [
    "YOLOv8 & Computer Vision",
    "React Native & Software Development",
    "Machine Learning (Google Colab, TensorFlow)",
    "IoT & Embedded Systems",
    "Raspberry Pi Development",
    "Python Programming",
    "Next.js & Web Development",
    "PHP & MySQL",
    "Audio Feature Extraction",
    "Dashboard Analytics",
  ];

  const softSkills = [
    "Leadership & Team Management",
    "Public Speaking & Performance",
    "Research & Analytical Thinking",
    "Cross-cultural Communication",
    "Project Management",
    "Problem Solving",
    "Creative Writing",
    "Collaboration & Teamwork",
  ];

  const experiences = [
    {
      title: "Ketua RADE",
      subtitle: "Robotics and Embedded Systems Research Group",
      period: "2024 - Sekarang",
      description:
        "Memimpin organisasi riset mahasiswa yang fokus pada IoT, robotika, dan AI. Mengkoordinasikan riset, pelatihan, seminar, dan kompetisi. Membawa RADE meraih prestasi di tingkat nasional.",
    },
    {
      title: "Research Assistant",
      subtitle: "Hybrid K-NN for Dangdut Music Classification",
      period: "2024",
      description:
        "Berkontribusi pada penelitian dosen terkait klasifikasi sub-genre musik dangdut menggunakan algoritma Hybrid K-NN. Terlibat dalam pengumpulan data audio, labeling, ekstraksi fitur, dan evaluasi model.",
    },
    {
      title: "Student Delegate",
      subtitle: "Lecturer and Student Exchange Program - VRU Thailand",
      period: "2025",
      description:
        "Mengikuti program exchange di Valaya Alongkorn Rajabhat University, Thailand. Mempelajari Cloud Computing, Project Management, IT Research Methodology, dan aktivitas budaya lintas negara.",
    },
    {
      title: "Teater & Puisi Performer",
      subtitle: "Teater Biner, PEKSIMIDA, PEKSIMINAS",
      period: "2023 - 2025",
      description:
        "Menulis dan menampilkan karya puisi dan teater yang mengangkat isu sosial. Aktif di Teater Biner dan berkompetisi di tingkat provinsi dan nasional.",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Resume" subtitle="Perjalanan & Kompetensi" />

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-[#22D3EE]" />
            <h3 className="text-2xl font-bold text-[#F9FAFB]">Pendidikan</h3>
          </div>

          <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 border border-white/10 shadow-lg">
            <h4 className="text-xl font-bold text-[#F9FAFB] mb-2">
              ITB STIKOM Bali
            </h4>
            <p className="text-[#22D3EE] font-medium mb-2">
              Program Studi Teknologi Informasi
            </p>
            <p className="text-[#FACC15] text-sm font-medium mb-3">
              2023 - Sekarang
            </p>
            <p className="text-[#D1D5DB] mt-2">
              Fokus pada Artificial Intelligence, IoT, dan Robotics dengan
              partisipasi aktif di berbagai kegiatan riset dan organisasi
              kampus.
            </p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Hard Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-[#22D3EE]" />
              <h3 className="text-2xl font-bold text-[#F9FAFB]">
                Technical Skills
              </h3>
            </div>

            <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 border border-white/10 shadow-lg">
              <div className="flex flex-wrap gap-3">
                {hardSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 bg-[#22D3EE]/10 text-[#22D3EE] rounded-lg border border-[#22D3EE]/30 text-sm font-medium hover:bg-[#22D3EE]/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-[#FACC15]" />
              <h3 className="text-2xl font-bold text-[#F9FAFB]">Soft Skills</h3>
            </div>

            <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 border border-white/10 shadow-lg">
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 bg-[#FACC15]/10 text-[#FACC15] rounded-lg border border-[#FACC15]/30 text-sm font-medium hover:bg-[#FACC15]/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-8 h-8 text-[#22D3EE]" />
            <h3 className="text-2xl font-bold text-[#F9FAFB]">
              Pengalaman & Aktivitas
            </h3>
          </div>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.title}
                title={exp.title}
                subtitle={exp.subtitle}
                period={exp.period}
                description={exp.description}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
