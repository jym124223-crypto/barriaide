"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { SAMPLE_RESOURCES, type SampleResource } from "@/lib/seed-data";
import { BookOpen, Search, ShieldCheck, Download, ExternalLink, Filter, Calendar } from "lucide-react";

export default function ResourcesPage() {
  const { locale, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = ["all", "Nutrition", "Surgery", "Medication", "Mindset", "Movement"];

  const filtered = SAMPLE_RESOURCES.filter((res) => {
    const title = locale === "en" ? res.title_en : res.title_fr;
    const desc = locale === "en" ? res.desc_en : res.desc_fr;
    const tag = locale === "en" ? res.tag_en : res.tag_fr;

    const matchesSearch =
      searchQuery === "" ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === "all" || tag.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-[#0B1E36] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-xs font-bold text-[#0D9488] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{locale === "en" ? "Evidence-Informed Library" : "Bibliothèque éclairée par la science"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl">
            {locale === "en"
              ? "Practical Guides, Checklists & Scientific Resources"
              : "Guides pratiques, listes de contrôle et ressources scientifiques"}
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            {locale === "en"
              ? "Designed to empower your clinical consultations without overwhelm or judgment. Every resource undergoes rigorous review by our Clinical Advisory Liaison."
              : "Conçu pour enrichir vos consultations médicales sans surcharge ni jugement. Chaque ressource est vérifiée par notre liaison clinique."}
          </p>
        </div>

        {/* Clinical Review Assurance Badge */}
        <div className="bg-teal-50 border border-[#0D9488]/30 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-teal-950 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#0D9488] shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold block">
                {locale === "en"
                  ? "Reviewed by Clinical Advisory Liaison — Updated July 2026"
                  : "Vérifié par la liaison consultative clinique — Mis à jour juillet 2026"}
              </span>
              <span className="text-teal-800 leading-relaxed">
                {locale === "en"
                  ? "All materials align with current Canadian and global obesity management guidelines while honoring personal lived experience."
                  : "Tous les contenus respectent les lignes directrices canadiennes sur l'obésité et l'expérience vécue."}
              </span>
            </div>
          </div>
          <span className="bg-[#0D9488] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider shrink-0 self-start sm:self-auto">
            ✓ Evidence-Based
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedTag === tag
                    ? "bg-[#0D9488] text-white border-[#0D9488] shadow-sm"
                    : "bg-white text-[#0B1E36] border-[#E2E8F0] hover:border-[#0D9488]"
                }`}
              >
                {tag === "all" ? (locale === "en" ? "All Resources (6)" : "Toutes les ressources") : tag}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "en" ? "Search checklists or topics..." : "Rechercher des guides..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm focus-ring"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => {
            const title = locale === "en" ? res.title_en : res.title_fr;
            const desc = locale === "en" ? res.desc_en : res.desc_fr;
            const tag = locale === "en" ? res.tag_en : res.tag_fr;

            return (
              <div
                key={res.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FDFBF7] text-[#0D9488] border border-[#E2E8F0]">
                      {tag}
                    </span>
                    <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{res.read_time}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1E36] group-hover:text-[#0D9488] transition-colors leading-snug">
                    {title}
                  </h3>

                  <p className="text-sm text-[#0B1E36]/75 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <button
                    onClick={() => alert(locale === "en" ? `Downloading / Opening: ${title}` : `Ouverture du document : ${title}`)}
                    className="inline-flex items-center gap-2 font-bold text-xs text-[#0D9488] hover:underline focus-ring rounded-lg py-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>{locale === "en" ? "Download Checklist (PDF)" : "Télécharger (PDF)"}</span>
                  </button>

                  <span className="w-8 h-8 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
