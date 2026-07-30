"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../lib/i18n";
import { MessageSquare, Clock, Users, ArrowUpRight, ShieldAlert } from "lucide-react";

export function Section4() {
  const { locale, t } = useLanguage();
  const [threads, setThreads] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("barriaide_forum_threads");
    if (stored) {
      try {
        setThreads(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E8F0] pb-8">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F97316]/15 text-[#F97316]">
              {t.section4.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#09090B] tracking-tight">
              {t.section4.title}
            </h2>
            <p className="text-base sm:text-lg text-[#09090B]/75 leading-relaxed">
              {t.section4.subtitle}
            </p>
          </div>

          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#F97316] text-white hover:bg-[#EA580C] shadow-sm shadow-[#F97316]/20 transition-all self-start md:self-auto focus-ring"
          >
            <span>{t.section4.enterCommunityButton}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Safety & Medical Disclaimer Reminder Banner before forum preview */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold block">Safety Reminder / Rappel de sécurité :</span>
            <span className="text-amber-800 leading-relaxed">{t.disclaimer.short}</span>
          </div>
        </div>

        {/* Discussions List */}
        <div className="grid gap-4">
          {threads.length > 0 ? (
            threads.slice(0, 4).map((disc) => {
              const title = locale === "en" ? disc.title_en : disc.title_fr;
              const category = locale === "en" ? disc.category_en : disc.category_fr;
              const lastActive = locale === "en" ? disc.last_active_en : disc.last_active_fr;

              return (
                <div
                  key={disc.id}
                  className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
                >
                  {/* Left Side: Category + Title */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FDFBF7] text-[#F97316] border border-[#E2E8F0]">
                        {category}
                      </span>
                      <span className="text-xs text-[#64748B] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t.section4.lastActiveLabel}: {lastActive}</span>
                      </span>
                    </div>

                    <Link href={`/community/${disc.id}`} className="block">
                      <h3 className="text-lg sm:text-xl font-bold text-[#09090B] group-hover:text-[#F97316] transition-colors leading-snug">
                        {title}
                      </h3>
                    </Link>
                  </div>

                  {/* Right Side: Avatars + Replies + Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0] shrink-0">
                    {/* Member Avatars Overlap */}
                    <div className="flex items-center">
                      <div className="flex -space-x-2 overflow-hidden">
                        {disc.avatars?.map((avatar: string, idx: number) => (
                          <img
                            key={idx}
                            src={avatar}
                            alt="Member"
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-xs font-semibold text-[#64748B] flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#F97316]" />
                        <span>+{disc.reply_count}</span>
                      </span>
                    </div>

                    {/* Replies Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FDFBF7] border border-[#E2E8F0] text-xs font-bold text-[#09090B]">
                      <MessageSquare className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>{disc.reply_count} {t.section4.repliesLabel}</span>
                    </div>

                    {/* Join Thread Button */}
                    <Link
                      href={`/community/${disc.id}`}
                      className="p-2.5 rounded-xl bg-[#09090B]/5 hover:bg-[#F97316] hover:text-white transition-colors text-[#09090B] focus-ring shrink-0"
                      aria-label="View thread"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-[#E2E8F0] text-center space-y-4 shadow-2xs">
              <MessageSquare className="w-12 h-12 text-[#64748B]/40 mx-auto" />
              <div className="text-lg font-bold text-[#09090B]">
                {locale === "en" ? "Welcome to our new community!" : "Bienvenue dans notre nouvelle communauté !"}
              </div>
              <p className="text-sm text-[#64748B] max-w-sm mx-auto">
                {locale === "en" 
                  ? "No discussion topics have been created yet. Be the first to start a conversation!"
                  : "Aucun sujet de discussion n'a encore été créé. Soyez le premier à lancer la conversation !"}
              </p>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#F97316] text-white hover:bg-[#EA580C] shadow-md transition-colors"
              >
                {locale === "en" ? "Create First Thread" : "Créer le premier sujet"}
              </Link>
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="text-center pt-4">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 font-bold text-[#F97316] hover:underline text-sm sm:text-base"
          >
            <span>{locale === "en" ? "View all 12 bilingual discussion categories →" : "Voir les 12 catégories de discussion bilingues →"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
