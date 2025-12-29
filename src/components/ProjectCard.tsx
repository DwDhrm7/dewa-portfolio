"use client";

import { motion } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Artifact } from "@/data/artifacts";

interface ProjectCardProps {
  artifact: Artifact;
  index: number;
}

export default function ProjectCard({ artifact, index }: ProjectCardProps) {
  const [showReflection, setShowReflection] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Project Based":
        return "bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/30";
      case "Case Based":
        return "bg-[#FACC15]/20 text-[#FACC15] border-[#FACC15]/30";
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#22D3EE]/50 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-[#22D3EE]/20"
    >
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
            artifact.category
          )}`}
        >
          {artifact.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-[#F9FAFB] mb-2 group-hover:text-[#22D3EE] transition-colors">
        {artifact.title}
      </h3>

      {/* Role */}
      <p className="text-[#FACC15] font-medium mb-4">{artifact.role}</p>

      {/* Description */}
      <p className="text-[#D1D5DB] mb-4 leading-relaxed">
        {artifact.description}
      </p>

      {/* Tech Stack */}
      {artifact.techStack && artifact.techStack.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-[#E5E7EB] font-medium mb-2">
            Tech Stack:
          </p>
          <div className="flex flex-wrap gap-2">
            {artifact.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 text-[#D1D5DB] text-xs rounded-lg border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {artifact.links && artifact.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {artifact.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#22D3EE]/10 text-[#22D3EE] rounded-lg hover:bg-[#22D3EE]/20 transition-colors text-sm font-medium border border-[#22D3EE]/30"
            >
              <ExternalLink size={14} />
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Reflection Toggle */}
      <button
        onClick={() => setShowReflection(!showReflection)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-[#E5E7EB] font-medium text-sm border border-white/10"
      >
        <span>Refleksi (What – So What – Now What)</span>
        {showReflection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Reflection Content */}
      {showReflection && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 space-y-4"
        >
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-[#22D3EE] font-semibold mb-2">What</h4>
            <p className="text-[#D1D5DB] text-sm leading-relaxed">
              {artifact.reflection.what}
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-[#FACC15] font-semibold mb-2">So What</h4>
            <p className="text-[#D1D5DB] text-sm leading-relaxed">
              {artifact.reflection.soWhat}
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-purple-400 font-semibold mb-2">Now What</h4>
            <p className="text-[#D1D5DB] text-sm leading-relaxed">
              {artifact.reflection.nowWhat}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
