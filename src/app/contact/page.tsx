"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, CheckCircle2, Github, Linkedin, Mail, Send, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const contactLinks = [
    {
      icon: Mail,
      label: t.contact.emailInfo,
      value: "madedharmaputrasantikaidewa@gmail.com",
      href: "mailto:madedharmaputrasantikaidewa@gmail.com",
    },
    {
      icon: Linkedin,
      label: t.contact.linkedinInfo,
      value: "idewamadedharmaputrasantika",
      href: "https://www.linkedin.com/in/idewamadedharmaputrasantika/",
    },
    {
      icon: Github,
      label: t.contact.githubInfo,
      value: "DwDhrm7",
      href: "https://github.com/DwDhrm7",
    },
  ];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Dewa Dharma",
        },
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-8 pb-24 pt-32 md:px-14 md:pb-32 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col items-center text-center md:items-start md:text-left"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
            {t.contact.eyebrow}
          </p>
          <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-[-0.05em] text-neutral-950 md:text-7xl">
            {t.contact.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-neutral-600">
            {t.contact.readyDesc}
          </p>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.05)] md:p-10"
          >
            <h2 className="mb-8 font-headline text-3xl font-bold tracking-[-0.03em] text-neutral-950">
              {t.contact.formTitle}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                id="name"
                label={t.contact.nameLabel}
                placeholder={t.contact.namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <FormField
                id="email"
                label={t.contact.emailLabel}
                placeholder={t.contact.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                type="email"
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
                >
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full rounded-2xl border border-black/10 bg-[#faf9f6] px-5 py-4 text-neutral-950 outline-none transition focus:border-neutral-950"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-neutral-950 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                {isSubmitting ? t.contact.sending : t.contact.sendButton}
              </button>

              {submitStatus === "success" && (
                <StatusMessage
                  variant="success"
                  text={t.contact.successInline}
                />
              )}

              {submitStatus === "error" && (
                <StatusMessage
                  variant="error"
                  text={t.contact.errorInline}
                />
              )}
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] bg-neutral-950 p-8 text-white md:p-10">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/60">
                {t.contact.directLines}
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-[-0.03em]">
                {t.contact.infoTitle}
              </h2>
              <p className="mt-4 leading-8 text-white/70">{t.contact.readyDesc}</p>
            </div>

            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between rounded-2xl bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-neutral-100 p-3 text-neutral-950">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                        {item.label}
                      </p>
                      <p className="mt-1 font-headline text-xl font-bold tracking-[-0.03em] text-neutral-950">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-neutral-950" />
                </a>
              );
            })}
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  disabled,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-[#faf9f6] px-5 py-4 text-neutral-950 outline-none transition focus:border-neutral-950"
      />
    </div>
  );
}

function StatusMessage({
  variant,
  text,
}: {
  variant: "success" | "error";
  text: string;
}) {
  const Icon = variant === "success" ? CheckCircle2 : XCircle;

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm ${
        variant === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  );
}
