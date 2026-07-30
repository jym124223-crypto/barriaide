"use client";

import React, { useState } from "react";
import { useLanguage, type Locale } from "../lib/i18n";
import { Mail, Send, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

export function Section6() {
  const { locale, t } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLang, setPreferredLang] = useState<Locale>(locale);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    if (!firstName.trim() || !email.trim() || !email.includes("@") || !consent) {
      setStatus("error");
      setErrorMessage(t.section6.form.errorMissingFields);
      return;
    }

    setStatus("submitting");

    // Simulate clean local newsletter subscription storage & delay
    setTimeout(() => {
      const existingSubs = JSON.parse(localStorage.getItem("barriaide_newsletter_subs") || "[]");
      existingSubs.push({
        firstName,
        email,
        preferredLanguage: preferredLang,
        subscribedAt: new Date().toISOString(),
      });
      localStorage.setItem("barriaide_newsletter_subs", JSON.stringify(existingSubs));

      setStatus("success");
      setFirstName("");
      setEmail("");
      setConsent(false);
    }, 800);
  };

  return (
    <section id="newsletter" className="py-20 lg:py-28 bg-[#09090B] text-white relative overflow-hidden">
      {/* Subtle ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F97316]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#EAB308]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/20 border border-[#F97316]/30 text-xs font-bold text-[#F97316] uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>{t.section6.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {t.section6.headline}
          </h2>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            {t.section6.text}
          </p>
        </div>

        {/* Newsletter Form Card */}
        <div className="bg-white text-[#09090B] rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 max-w-2xl mx-auto text-left">
          {status === "success" ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#09090B]">
                {t.section6.form.successTitle}
              </h3>
              <p className="text-sm text-[#09090B]/75 max-w-md mx-auto leading-relaxed">
                {t.section6.form.successMessage}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors"
              >
                {locale === "en" ? "Subscribe another email" : "Inscrire un autre courriel"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-xs font-bold text-[#09090B]">
                    {t.section6.form.firstNamePlaceholder} *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t.section6.form.firstNamePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm font-medium focus-ring placeholder:text-[#64748B]/60"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-[#09090B]">
                    {t.section6.form.emailPlaceholder} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm font-medium focus-ring placeholder:text-[#64748B]/60"
                  />
                </div>
              </div>

              {/* Preferred Language Radio */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#09090B] block">
                  {t.section6.form.languageLabel}
                </span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                    <input
                      type="radio"
                      name="preferredLang"
                      checked={preferredLang === "en"}
                      onChange={() => setPreferredLang("en")}
                      className="w-4 h-4 text-[#F97316] focus:ring-[#F97316]"
                    />
                    <span>English (EN)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                    <input
                      type="radio"
                      name="preferredLang"
                      checked={preferredLang === "fr"}
                      onChange={() => setPreferredLang("fr")}
                      className="w-4 h-4 text-[#F97316] focus:ring-[#F97316]"
                    />
                    <span>Français (FR)</span>
                  </label>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2 border-t border-[#E2E8F0]">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-[#09090B]/80 select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#F97316] rounded focus:ring-[#F97316] border-[#E2E8F0] shrink-0"
                  />
                  <span className="leading-relaxed font-medium">
                    {t.section6.form.consentLabel}
                  </span>
                </label>
              </div>

              {/* Error State Banner */}
              {status === "error" && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-center gap-2.5 text-rose-700 text-xs font-semibold animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-2xl font-bold text-white bg-[#F97316] hover:bg-[#EA580C] shadow-md shadow-[#F97316]/25 transition-all flex items-center justify-center gap-2 text-base focus-ring disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{status === "submitting" ? t.section6.form.submitting : t.section6.form.button}</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>We respect your privacy. No spam ever.</span>
            </div>
            <span>CASL & Quebec Law Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
