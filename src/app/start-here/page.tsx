"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { Compass, CheckCircle2, ArrowRight, BookOpen, MessageSquare, ShieldCheck, HeartHandshake } from "lucide-react";

export default function StartHerePage() {
  const { locale, t } = useLanguage();
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = t.onboarding.options;

  // Recommended categories based on option index
  const getRecommendations = (index: number | null) => {
    if (index === null) return [];
    if (index === 0 || index === 1) {
      return [
        { name: t.categories.glp1, href: "/community?cat=glp1", badge: "Medication Path" },
        { name: t.categories.nutrition, href: "/community?cat=nutrition", badge: "Protein & Diet" },
        { name: t.categories.nsv, href: "/community?cat=nsv", badge: "Victories" },
      ];
    }
    if (index === 2 || index === 3) {
      return [
        { name: t.categories.prepSurgery, href: "/community?cat=prepSurgery", badge: "Pre-Op Prep" },
        { name: t.categories.postSurgery, href: "/community?cat=postSurgery", badge: "Life After Surgery" },
        { name: t.categories.nutrition, href: "/community?cat=nutrition", badge: "Protein Goals" },
      ];
    }
    return [
      { name: t.categories.welcome, href: "/community?cat=welcome", badge: "New Members" },
      { name: t.categories.emotionalEating, href: "/community?cat=emotionalEating", badge: "Mindset" },
      { name: t.categories.maintenance, href: "/community?cat=maintenance", badge: "Long-Term Habits" },
    ];
  };

  const recommendations = getRecommendations(selectedOption);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D9488]/15 text-[#0D9488] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Guided Onboarding / Parcours guidé</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E36] tracking-tight">
            {t.onboarding.question}
          </h1>
          <p className="text-base sm:text-lg text-[#0B1E36]/75 leading-relaxed">
            {locale === "en"
              ? "Select your current situation below so we can connect you with the right peer discussions, resources, and respectful community members right away."
              : "Sélectionnez votre situation actuelle ci-dessous afin que nous puissions vous diriger vers les discussions, ressources et membres les plus pertinents pour vous."}
          </p>
        </div>

        {/* Option Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {options.map((opt, index) => {
            const isSelected = selectedOption === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`p-5 rounded-2xl border text-left flex items-start justify-between gap-4 transition-all duration-200 focus-ring cursor-pointer ${
                  isSelected
                    ? "bg-[#0D9488] text-white border-[#0D9488] shadow-lg shadow-[#0D9488]/20 -translate-y-0.5"
                    : "bg-white text-[#0B1E36] border-[#E2E8F0] hover:border-[#0D9488]/50 hover:shadow-sm"
                }`}
              >
                <span className="font-bold text-sm sm:text-base leading-snug">
                  {opt}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? "bg-white text-[#0D9488]" : "border border-[#E2E8F0] bg-[#FDFBF7]"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4 fill-current" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Personalized Recommendations Section */}
        {selectedOption !== null && (
          <div className="bg-white rounded-3xl p-8 border border-[#0D9488]/30 shadow-xl space-y-8 animate-in fade-in slide-in-from-bottom duration-300 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/15 text-[#0D9488] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0B1E36]">
                  {locale === "en" ? "Recommended For Your Journey" : "Recommandé pour votre parcours"}
                </h2>
                <p className="text-xs text-[#64748B]">
                  {options[selectedOption]}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#0D9488]" />
                <span>{locale === "en" ? "Suggested Community Categories:" : "Catégories suggérées :"}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendations.map((rec, idx) => (
                  <Link
                    key={idx}
                    href={rec.href}
                    className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8F0] hover:border-[#0D9488] transition-all group flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider mb-2 block">
                      {rec.badge}
                    </span>
                    <span className="font-bold text-sm text-[#0B1E36] group-hover:text-[#0D9488] transition-colors leading-snug">
                      {rec.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <h3 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#D97706]" />
                <span>{locale === "en" ? "Essential Reading & Checklists:" : "Lectures essentielles et listes :"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/resources"
                  className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:border-amber-400 transition-all flex items-center justify-between text-sm font-bold text-amber-900"
                >
                  <span>{locale === "en" ? "Questions to Ask Your Healthcare Team" : "Questions à poser à votre médecin"}</span>
                  <ArrowRight className="w-4 h-4 text-amber-600" />
                </Link>
                <Link
                  href="/resources"
                  className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/60 hover:border-teal-400 transition-all flex items-center justify-between text-sm font-bold text-teal-900"
                >
                  <span>{locale === "en" ? "Protein Prioritization Guide" : "Guide de priorisation des protéines"}</span>
                  <ArrowRight className="w-4 h-4 text-teal-600" />
                </Link>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                <span>Pseudonymous participation option available during registration.</span>
              </div>

              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] shadow-md shadow-[#0D9488]/20 flex items-center justify-center gap-2 transition-all focus-ring"
              >
                <span>{locale === "en" ? "Proceed to Register" : "Procéder à l'inscription"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
