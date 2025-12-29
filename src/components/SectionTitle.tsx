"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = false,
}: SectionTitleProps) {
  return (
    <motion.div
      className={centered ? "text-center mb-12" : "mb-12"}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-3">
        {title}
      </h2>
      {subtitle && (
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 bg-gradient-to-r from-[#22D3EE] to-[#FACC15] rounded-full" />
          <p className="text-lg text-[#D1D5DB]">{subtitle}</p>
        </div>
      )}
    </motion.div>
  );
}
