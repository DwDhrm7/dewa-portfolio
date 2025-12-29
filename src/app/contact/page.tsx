"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a dummy form - no backend integration
    alert("Terima kasih! Pesan Anda telah diterima. (Demo mode - form tidak terhubung ke backend)");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "madedharmaputrasantikaidewa@gmail.com",
      link: "mailto:madedharmaputrasantikaidewa@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/IDewaMadeDharmaPutraSantika",
      link: "https://www.linkedin.com/in/i-dewa-made-dharma-putra-santika-a13939286/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/DwDhr7",
      link: "https://github.com/DwDhrm7",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Hubungi Saya"
          subtitle="Mari terhubung dan berkolaborasi"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                Kirim Pesan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#E5E7EB] font-medium mb-2"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#050816] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#E5E7EB] font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#050816] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20 transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#E5E7EB] font-medium mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#050816] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20 transition-all resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                Informasi Kontak
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      target={info.label !== "Email" ? "_blank" : undefined}
                      rel={
                        info.label !== "Email"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group border border-white/10 hover:border-[#22D3EE]/50"
                    >
                      <div className="p-3 bg-[#22D3EE]/10 rounded-lg group-hover:bg-[#22D3EE]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#22D3EE]" />
                      </div>
                      <div>
                        <p className="text-[#E5E7EB] font-medium mb-1">
                          {info.label}
                        </p>
                        <p className="text-[#D1D5DB] text-sm break-all">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-[#22D3EE]/10 to-[#FACC15]/10 rounded-2xl p-8 border border-[#22D3EE]/30"
            >
              <h4 className="text-xl font-bold text-[#F9FAFB] mb-3">
                Siap untuk Berkolaborasi!
              </h4>
              <p className="text-[#D1D5DB] leading-relaxed">
                Saya terbuka untuk diskusi tentang proyek AI, IoT, riset
                akademis, atau kolaborasi kreatif. Jangan ragu untuk menghubungi
                saya melalui form atau kontak yang tersedia.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
