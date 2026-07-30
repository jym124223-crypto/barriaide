"use client";

import React from "react";
import { useLanguage } from "../lib/i18n";
import { Pill, Activity, Utensils, HeartHandshake, ShieldCheck, SmilePlus } from "lucide-react";

export function Section1() {
  const { t } = useLanguage();

  const getCardIcon = (id: string) => {
    switch (id) {
      case "meds":
        return <Pill className="w-6 h-6 text-[#F97316]" />;
      case "surgery":
        return <Activity className="w-6 h-6 text-[#EAB308]" />;
      case "nutrition":
        return <Utensils className="w-6 h-6 text-emerald-600" />;
      case "mindset":
        return <SmilePlus className="w-6 h-6 text-indigo-600" />;
      case "maintenance":
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case "peer":
        return <HeartHandshake className="w-6 h-6 text-rose-600" />;
      default:
        return <HeartHandshake className="w-6 h-6 text-[#F97316]" />;
    }
  };

  const getCardBg = (id: string) => {
    switch (id) {
      case "meds":
        return "bg-[#F97316]/10";
      case "surgery":
        return "bg-[#EAB308]/10";
      case "nutrition":
        return "bg-emerald-600/10";
      case "mindset":
        return "bg-indigo-600/10";
      case "maintenance":
        return "bg-blue-600/10";
      case "peer":
        return "bg-rose-600/10";
      default:
        return "bg-[#F97316]/10";
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F97316]/10 text-[#F97316]">
            {t.section1.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#09090B] tracking-tight">
            {t.section1.title}
          </h2>
          <p className="text-base sm:text-lg text-[#09090B]/75 leading-relaxed">
            {t.section1.subtitle}
          </p>
        </div>

        {/* 6 Inclusive Treatment Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.section1.cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#E2E8F0] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl ${getCardBg(card.id)} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  {getCardIcon(card.id)}
                </div>
                <h3 className="text-xl font-bold text-[#09090B] group-hover:text-[#F97316] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#09090B]/75 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]/80 flex items-center justify-between text-xs font-bold text-[#F97316]">
                <span>Respectful & Informed</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
