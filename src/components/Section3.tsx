"use client";

import React, { useState } from "react";
import { useLanguage } from "../lib/i18n";
import { SAMPLE_VIDEOS, type SampleVideo } from "../lib/seed-data";
import { Play, Video, Clock, ExternalLink, X } from "lucide-react";

export function Section3() {
  const { locale, t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<SampleVideo | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/20">
              {t.section3.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#09090B] tracking-tight">
              {t.section3.title}
            </h2>
            <p className="text-base sm:text-lg text-[#09090B]/75 leading-relaxed">
              {t.section3.subtitle}
            </p>
          </div>

          <a
            href="https://www.youtube.com/@barriaide?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#F97316] text-white hover:bg-[#EA580C] shadow-sm transition-all self-start md:self-auto focus-ring"
          >
            <Video className="w-4 h-4" />
            <span>Subscribe / S’abonner</span>
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_VIDEOS.map((video) => {
            const title = locale === "en" ? video.title_en : video.title_fr;
            const description = locale === "en" ? video.description_en : video.description_fr;

            return (
              <div
                key={video.id}
                className="bg-[#FDFBF7] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Thumbnail Container */}
                <div>
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={video.thumbnail}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/95 text-[#F97316] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-xs font-semibold flex items-center gap-1 backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-[#EAB308]" />
                      <span>{video.duration} {t.section3.durationLabel}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3
                      onClick={() => setActiveVideo(video)}
                      className="text-lg font-bold text-[#09090B] hover:text-[#F97316] cursor-pointer transition-colors line-clamp-2 leading-snug"
                    >
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#09090B]/75 line-clamp-3 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#09090B] bg-white border border-[#E2E8F0] hover:border-[#F97316] hover:text-[#F97316] transition-all flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{t.section3.watchButton}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player / Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4">
            <div className="p-4 bg-[#09090B] text-white flex items-center justify-between">
              <span className="font-bold text-sm sm:text-base line-clamp-1">
                {locale === "en" ? activeVideo.title_en : activeVideo.title_fr}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Placeholder Player */}
            <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center text-center p-6 space-y-4 relative">
              <div className="w-20 h-20 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] animate-pulse">
                <Video className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <div className="text-white font-bold text-lg">
                  {locale === "en" ? "Barriaide Educational Video Stream" : "Flux vidéo éducatif Barriaide"}
                </div>
                <div className="text-white/60 text-xs max-w-md">
                  {locale === "en"
                    ? "YouTube Channel ID linkage active. Clicking below opens the official Barriaide YouTube stream."
                    : "Liaison avec la chaîne YouTube active. Cliquez ci-dessous pour ouvrir le flux officiel."}
                </div>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-[#F97316] text-white hover:bg-[#EA580C] transition-all shadow-md flex items-center gap-2"
              >
                <span>{t.section3.watchButton}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 bg-[#FDFBF7] border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
              <span>Duration: {activeVideo.duration} min</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="font-bold text-[#09090B] hover:underline"
              >
                Close / Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
