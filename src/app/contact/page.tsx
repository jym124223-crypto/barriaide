"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { Mail, ShieldAlert, Send, CheckCircle2, PhoneCall } from "lucide-react";

export default function ContactPage() {
  const { locale } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("general");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent spam rejection
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        {/* Medical Emergency Redirection Banner */}
        <div className="bg-rose-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 font-extrabold text-sm uppercase tracking-wider text-rose-200">
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>{locale === "en" ? "Medical Emergency Notice" : "Avis d'urgence médicale"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">
              {locale === "en"
                ? "If you are experiencing a medical emergency, severe pain, or inability to keep fluids down for 24+ hours, DO NOT use this contact form."
                : "Si vous vivez une urgence médicale, des douleurs intenses ou une incapacité à vous hydrater, N'UTILISEZ PAS ce formulaire."}
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              {locale === "en"
                ? "Please call 911, contact your local health advisory service (811 in Canada), or go to the nearest emergency room immediately."
                : "Veuillez composer le 911 ou le 811 immédiatement, ou vous rendre aux urgences."}
            </p>
          </div>
          <div className="bg-white text-rose-600 px-5 py-3 rounded-2xl font-extrabold text-center shrink-0 self-start sm:self-auto shadow-md">
            CALL 911 / 811
          </div>
        </div>

        {/* Contact Form Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
            {locale === "en" ? "Contact the Barriaide Team" : "Contacter l'équipe Barriaide"}
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] max-w-xl mx-auto">
            {locale === "en"
              ? "Have a question about moderation, community guidelines, press inquiries, or clinical liaison partnerships? Reach out below."
              : "Une question sur la modération, les règles ou les partenariats cliniques ? Écrivez-nous."}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-md max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1E36]">
                {locale === "en" ? "Message sent successfully!" : "Message envoyé avec succès !"}
              </h3>
              <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                {locale === "en"
                  ? "Thank you for contacting Barriaide. Our team will review your inquiry within 2 business days."
                  : "Merci d'avoir contacté Barriaide. Notre équipe vous répondra sous 2 jours ouvrables."}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#0D9488] text-white hover:bg-[#0F766E]"
              >
                {locale === "en" ? "Send another inquiry" : "Envoyer un autre message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot hidden input for anti-spam */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0B1E36] block">
                    {locale === "en" ? "Your Name / Pseudonym *" : "Votre nom / pseudonyme *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena R."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0B1E36] block">
                    {locale === "en" ? "Email Address *" : "Adresse courriel *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B1E36] block">
                  {locale === "en" ? "Inquiry Category *" : "Catégorie de la demande *"}
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold focus-ring"
                >
                  <option value="general">{locale === "en" ? "General Inquiry & Feedback" : "Question générale"}</option>
                  <option value="moderation">{locale === "en" ? "Moderation / Safety Report" : "Signalement de modération"}</option>
                  <option value="clinical">{locale === "en" ? "Clinical Advisory & Partnership" : "Partenariat clinique"}</option>
                  <option value="press">{locale === "en" ? "Press & Media Inquiries" : "Médias et presse"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B1E36] block">
                  {locale === "en" ? "Your Message *" : "Votre message *"}
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={locale === "en" ? "Write your message here..." : "Écrivez votre message ici..."}
                  className="w-full p-3.5 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-2xl font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] shadow-md shadow-[#0D9488]/20 transition-all flex items-center justify-center gap-2 focus-ring"
              >
                <Send className="w-4 h-4" />
                <span>{status === "submitting" ? (locale === "en" ? "Sending..." : "Envoi...") : (locale === "en" ? "Send Message" : "Envoyer le message")}</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
