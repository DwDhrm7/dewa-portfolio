"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  period?: string;
  description: string;
  index: number;
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  description,
  index,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l-2 border-[#22D3EE]/30 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-[#22D3EE] rounded-full border-4 border-[#050816]" />

      <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-xl p-6 border border-white/10 hover:border-[#22D3EE]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#22D3EE]/10">
        <h3 className="text-xl font-bold text-[#F9FAFB] mb-1">{title}</h3>
        {subtitle && (
          <p className="text-[#22D3EE] font-medium mb-1">{subtitle}</p>
        )}
        {period && (
          <p className="text-[#FACC15] text-sm font-medium mb-3">{period}</p>
        )}
        <p className="text-[#D1D5DB] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
