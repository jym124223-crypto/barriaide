"use client";

import React from "react";
import { useLanguage } from "../lib/i18n";
import { MessageCircleQuestion, Share2, BookOpen, CalendarCheck, Trophy, Users2 } from "lucide-react";

export function Section2() {
  const { t } = useLanguage();

  const getCardIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageCircleQuestion className="w-6 h-6 text-[#F97316]" />;
      case 1:
        return <Share2 className="w-6 h-6 text-[#EAB308]" />;
      case 2:
        return <BookOpen className="w-6 h-6 text-indigo-600" />;
      case 3:
        return <CalendarCheck className="w-6 h-6 text-emerald-600" />;
      case 4:
        return <Trophy className="w-6 h-6 text-amber-500" />;
      case 5:
        return <Users2 className="w-6 h-6 text-rose-600" />;
      default:
        return <MessageCircleQuestion className="w-6 h-6 text-[#F97316]" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAB308]/15 text-[#09090B]">
            {t.section2.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#09090B] tracking-tight">
            {t.section2.title}
          </h2>
          <p className="text-base sm:text-lg text-[#09090B]/75 leading-relaxed">
            {t.section2.subtitle}
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.section2.cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                  {getCardIcon(index)}
                </div>
                <h3 className="text-xl font-bold text-[#09090B]">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#09090B]/75 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 flex items-center gap-2 text-xs font-bold text-[#64748B]">
                <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                <span>Peer-to-Peer & Evidence-Informed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
