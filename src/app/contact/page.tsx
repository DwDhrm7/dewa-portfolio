"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Mail, Linkedin, Github, Send, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS Configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';     

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Dewa Dharma',
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
      label: t.contact.emailInfo,
      value: "madedharmaputrasantikaidewa@gmail.com",
      link: "mailto:madedharmaputrasantikaidewa@gmail.com",
    },
    {
      icon: Linkedin,
      label: t.contact.linkedinInfo,
      value: "linkedin.com/in/idewamadedharmaputrasantika",
      link: "https://www.linkedin.com/in/idewamadedharmaputrasantika/",
    },
    {
      icon: Github,
      label: t.contact.githubInfo,
      value: "github.com/DewaDharma",
      link: "https://github.com/DwDhrm7",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-2xl p-8 border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                {t.contact.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#E5E7EB] font-medium mb-2"
                  >
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#050816] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#E5E7EB] font-medium mb-2"
                  >
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#050816] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#E5E7EB] font-medium mb-2"
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#050816] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {language === 'id' ? 'Mengirim...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t.contact.sendButton}
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
                  >
                    <CheckCircle size={20} />
                    <span className="text-sm">
                      {language === 'id'
                        ? '✨ Pesan berhasil dikirim! Saya akan segera membalas ke email Anda.'
                        : '✨ Message sent successfully! I will reply to your email soon.'}
                    </span>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                  >
                    <XCircle size={20} />
                    <span className="text-sm">
                      {language === 'id'
                        ? '❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung.'
                        : '❌ Failed to send message. Please try again or contact via email directly.'}
                    </span>
                  </motion.div>
                )}
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
                {t.contact.infoTitle}
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      target={info.label !== t.contact.emailInfo ? "_blank" : undefined}
                      rel={
                        info.label !== t.contact.emailInfo
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
                {t.contact.readyTitle}
              </h4>
              <p className="text-[#D1D5DB] leading-relaxed">
                {t.contact.readyDesc}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}