"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../lib/i18n";
import { Heart, Sparkles, ArrowRight, ShieldCheck, Users } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[#FDFBF7]">
      {/* Decorative calm background gradients */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-[#F97316]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-[#EAB308]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] shadow-2xs text-xs sm:text-sm font-semibold text-[#09090B]">
              <Sparkles className="w-4 h-4 text-[#EAB308]" />
              <span>{t.section1.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
              <span className="text-[#F97316] font-bold">100% Non-Judgmental</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090B] leading-[1.15]">
              {t.hero.headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#09090B]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.supportingText}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/start-here"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-[#F97316] hover:bg-[#EA580C] shadow-lg shadow-[#F97316]/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base focus-ring"
              >
                <span>{t.hero.primaryButton}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/resources"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-[#09090B] bg-white hover:bg-[#F8FAFC] border-2 border-[#E2E8F0] hover:border-[#F97316]/40 shadow-sm transition-all flex items-center justify-center gap-2 text-base focus-ring"
              >
                <span>{t.hero.secondaryButton}</span>
              </Link>
            </div>

            {/* Quick Community Stats / Trust Elements */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E2E8F0]/70 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#09090B] text-sm sm:text-base">All Paths</div>
                  <div className="text-xs text-[#64748B]">Respect & Equity</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#EAB308]/10 flex items-center justify-center text-[#EAB308] shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#09090B] text-sm sm:text-base">Peer Support</div>
                  <div className="text-xs text-[#64748B]">Lived Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#09090B]/10 flex items-center justify-center text-[#09090B] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#09090B] text-sm sm:text-base">Safe Space</div>
                  <div className="text-xs text-[#64748B]">Pseudonymous</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual / Respectful Community Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Rounded Card representing diverse community support */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-sm text-[#09090B]">Community Live Check-In</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F97316]/15 text-[#F97316]">
                    Bilingual / Bilingue
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Testimonial Card 1 */}
                  <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E2E8F0]/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
                          EL
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#09090B]">Elena R. (GLP-1 Path)</div>
                          <div className="text-[10px] text-[#64748B]">Montréal, QC</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#F97316]">Just now</span>
                    </div>
                    <p className="text-xs text-[#09090B]/90 italic">
                      &quot;Finding a space that honors both medication and emotional healing without judgment has completely changed how I care for my body.&quot;
                    </p>
                  </div>

                  {/* Testimonial Card 2 */}
                  <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E2E8F0]/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-yellow-600 text-white font-bold flex items-center justify-center text-xs">
                          M
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#09090B]">Marc-Antoine (Chirurgie)</div>
                          <div className="text-[10px] text-[#64748B]">Québec, QC</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#EAB308]">Il y a 5 min</span>
                    </div>
                    <p className="text-xs text-[#09090B]/90 italic">
                      &quot;Deux ans après ma chirurgie bariatrique, le soutien pour le maintien à long terme de cette communauté est inestimable.&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/community"
                    className="block w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-[#F97316] bg-[#F97316]/10 hover:bg-[#F97316]/20 transition-colors"
                  >
                    → Explore 12 Bilingual Support Categories
                  </Link>
                </div>
              </div>

              {/* Floating Accent Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#09090B] text-white p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-white/10 z-20">
                <div className="w-10 h-10 rounded-xl bg-[#EAB308] flex items-center justify-center font-bold text-[#09090B] shrink-0">
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold">Zero Stigma Guarantee</div>
                  <div className="text-[11px] text-white/70">Respectful of every body size</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
