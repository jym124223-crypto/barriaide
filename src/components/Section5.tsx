"use client";

import React, { useState } from "react";
import { useLanguage } from "../lib/i18n";
import { Quote, Sparkles, HeartHandshake, Edit3, Check } from "lucide-react";

export function Section5() {
  const { locale, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [customStoryEn, setCustomStoryEn] = useState("");
  const [customStoryFr, setCustomStoryFr] = useState("");

  const currentStory = locale === "en" 
    ? (customStoryEn || t.section5.placeholderText)
    : (customStoryFr || t.section5.placeholderText);

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FDFBF7] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E2E8F0] shadow-lg relative overflow-hidden">
          {/* Decorative subtle background icon */}
          <Quote className="absolute -top-6 -right-6 w-48 h-48 text-[#F97316]/5 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
            {/* Founder Image Placeholder */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 group">
                {/* Respectful, realistic, diverse founder portrait representation */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                  alt="Founder of Barriaide"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white text-xs font-semibold">
                  Founder Image / Photo
                </div>
              </div>

              <div>
                <div className="font-extrabold text-lg text-[#09090B] flex items-center justify-center gap-1.5">
                  <span>Founder Placeholder</span>
                  <Sparkles className="w-4 h-4 text-[#EAB308]" />
                </div>
                <div className="text-xs font-semibold text-[#F97316] uppercase tracking-wider">
                  {t.section5.role}
                </div>
              </div>
            </div>

            {/* Story Text & Editable Action */}
            <div className="md:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F97316]/15 text-[#F97316]">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{t.section5.badge}</span>
                </span>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#E2E8F0] bg-white text-[#09090B] hover:border-[#F97316] hover:text-[#F97316] transition-colors focus-ring"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Save Story / Enregistrer</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Story / Modifier</span>
                    </>
                  )}
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] tracking-tight">
                {t.section5.title}
              </h2>

              {isEditing ? (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#09090B] block">English Story Text:</label>
                    <textarea
                      value={customStoryEn || t.section5.placeholderText}
                      onChange={(e) => setCustomStoryEn(e.target.value)}
                      rows={4}
                      className="w-full p-3 rounded-xl border border-[#F97316] bg-white text-sm text-[#09090B] focus-ring"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#09090B] block">Texte de l&apos;histoire en français :</label>
                    <textarea
                      value={customStoryFr || t.section5.placeholderText}
                      onChange={(e) => setCustomStoryFr(e.target.value)}
                      rows={4}
                      className="w-full p-3 rounded-xl border border-[#F97316] bg-white text-sm text-[#09090B] focus-ring"
                    />
                  </div>
                </div>
              ) : (
                <blockquote className="text-base sm:text-lg text-[#09090B]/80 italic leading-relaxed font-normal border-l-4 border-[#F97316] pl-6 py-1">
                  &quot;{currentStory}&quot;
                </blockquote>
              )}

              <div className="pt-2 flex items-center gap-6 border-t border-[#E2E8F0] text-xs font-semibold text-[#64748B]">
                <span>✓ Lived Experience</span>
                <span>✓ Evidence-Informed</span>
                <span>✓ All Paths Respected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
