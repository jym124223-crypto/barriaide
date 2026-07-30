"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { SAMPLE_VIDEOS, type SampleVideo } from "@/lib/seed-data";
import { Video, Play, Clock, Search, X, ExternalLink } from "lucide-react";

export default function VideosPage() {
  const { locale, t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<SampleVideo | null>(null);
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = ["all", "Medications", "Bariatric Surgery", "Emotional Eating", "Physical Activity"];

  const filtered = SAMPLE_VIDEOS.filter((vid) => {
    if (selectedTag === "all") return true;
    const desc = locale === "en" ? vid.description_en : vid.description_fr;
    return desc.toLowerCase().includes(selectedTag.toLowerCase()) || (locale === "en" ? vid.title_en : vid.title_fr).toLowerCase().includes(selectedTag.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-[#0B1E36] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>{locale === "en" ? "Bilingual Video Hub" : "Vidéos et webinaires bilingues"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl">
            {locale === "en"
              ? "Expert Q&As, Patient Journeys & Workshops"
              : "Discussions d'experts, parcours de patients et ateliers"}
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            {locale === "en"
              ? "Short, practical video guides addressing real questions about GLP-1 titration, life years after surgery, and emotional self-compassion."
              : "Des guides vidéo courts et pratiques répondant aux vraies questions sur la titration et la vie après chirurgie."}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedTag === tag
                  ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                  : "bg-white text-[#0B1E36] border-[#E2E8F0] hover:border-rose-400"
              }`}
            >
              {tag === "all" ? (locale === "en" ? "All Videos (3)" : "Toutes les vidéos") : tag}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((video) => {
            const title = locale === "en" ? video.title_en : video.title_fr;
            const desc = locale === "en" ? video.description_en : video.description_fr;

            return (
              <div
                key={video.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform focus-ring"
                    >
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-rose-400" />
                    <span>{video.duration}</span>
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0B1E36] group-hover:text-rose-600 transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="text-sm text-[#0B1E36]/75 leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveVideo(video)}
                    className="pt-2 border-t border-[#E2E8F0] text-xs font-bold text-rose-600 hover:underline flex items-center gap-1.5 self-start"
                  >
                    <span>{locale === "en" ? "Watch Video Guide →" : "Regarder le guide →"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0B1E36] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 relative">
              <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 text-white">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                    Barriaide Educational Video
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold leading-tight">
                    {locale === "en" ? activeVideo.title_en : activeVideo.title_fr}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500 animate-pulse">
                  <Video className="w-10 h-10" />
                </div>
                <div className="space-y-1 max-w-md">
                  <div className="text-white font-bold text-lg">
                    {locale === "en" ? "Interactive Video Player Preview" : "Aperçu du lecteur vidéo"}
                  </div>
                  <p className="text-xs text-white/70">
                    {locale === "en" ? activeVideo.description_en : activeVideo.description_fr}
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-lg"
                >
                  <span>{locale === "en" ? "Open on YouTube" : "Ouvrir sur YouTube"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
