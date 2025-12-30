"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import TimelineItem from "@/components/TimelineItem";
import { GraduationCap, Code, Users, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function ResumePage() {
  const { language } = useLanguage();
  const t = translations[language];

  const hardSkills = [
    "YOLOv8",
    "Machine Learning",
    "IoT & Embedded Systems",
    "Python Programming",
    "React Native & Front End Software Development",
    "Next.js & Front End Web Development",
    "PHP & MySQL",
    "Google Colab",
    "Audio Feature Extraction",
    "Data Analysis & Visualization",
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
      title: t.resume.exp1Title,
      subtitle: t.resume.exp1Subtitle,
      period: t.resume.exp1Period,
      description: t.resume.exp1Desc,
    },
    {
      title: t.resume.exp2Title,
      subtitle: t.resume.exp2Subtitle,
      period: t.resume.exp2Period,
      description: t.resume.exp2Desc,
    },
    {
      title: t.resume.exp3Title,
      subtitle: t.resume.exp3Subtitle,
      period: t.resume.exp3Period,
      description: t.resume.exp3Desc,
    },
    {
      title: t.resume.exp4Title,
      subtitle: t.resume.exp4Subtitle,
      period: t.resume.exp4Period,
      description: t.resume.exp4Desc,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.resume.title} subtitle={t.resume.subtitle} />

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
            <h3 className="text-2xl font-bold text-[#F9FAFB]">
              {t.resume.educationTitle}
            </h3>
          </div>

          <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 border border-white/10 shadow-lg">
            <h4 className="text-xl font-bold text-[#F9FAFB] mb-2">
              {t.resume.university}
            </h4>
            <p className="text-[#22D3EE] font-medium mb-2">
              {t.resume.program}
            </p>
            <p className="text-[#FACC15] text-sm font-medium mb-3">
              {t.resume.period}
            </p>
            <p className="text-[#D1D5DB] mt-2">{t.resume.focus}</p>
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
                {t.resume.technicalSkillsTitle}
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
              <h3 className="text-2xl font-bold text-[#F9FAFB]">
                {t.resume.softSkillsTitle}
              </h3>
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
              {t.resume.experienceTitle}
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
