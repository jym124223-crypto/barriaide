"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { Calendar, Clock, Users, CheckCircle2, ShieldCheck, Video, MapPin, ArrowUpRight } from "lucide-react";

export default function EventsPage() {
  const { locale } = useLanguage();
  const [rsvpList, setRsvpList] = useState<string[]>([]);

  const toggleRsvp = (id: string) => {
    if (rsvpList.includes(id)) {
      setRsvpList(rsvpList.filter((item) => item !== id));
    } else {
      setRsvpList([...rsvpList, id]);
    }
  };

  const events = [
    {
      id: "ev-1",
      title_en: "GLP-1 & GIP/GLP-1 Early Titration Support Circle",
      title_fr: "Cercle de soutien pour le début de traitement GLP-1",
      date_en: "Wednesday, July 22, 2026 • 7:00 PM EST",
      date_fr: "Mercredi 22 juillet 2026 • 19h00 EST",
      host_en: "Facilitated by Marc-Antoine & Clinical Guest",
      host_fr: "Animé par Marc-Antoine et invitée clinique",
      desc_en: "A safe, respectful 60-minute online circle to share practical tips on managing mild nausea and protein pacing.",
      desc_fr: "Un cercle en ligne sécuritaire de 60 minutes pour partager des conseils pratiques sur la gestion des nausées légères.",
      attendees: 42,
    },
    {
      id: "ev-2",
      title_en: "Bariatric Surgery Pre-Op Readiness & Q&A Check-In",
      title_fr: "Rencontre préparatoire avant chirurgie bariatrique",
      date_en: "Saturday, July 25, 2026 • 11:00 AM EST",
      date_fr: "Samedi 25 juillet 2026 • 11h00 EST",
      host_en: "Facilitated by Elena R. & Peer Mentor Team",
      host_fr: "Animé par Elena R. et l'équipe de pairs mentors",
      desc_en: "Open discussion for members preparing for surgery. Bring your questions regarding hospital bag checklists and emotional readiness.",
      desc_fr: "Discussion ouverte pour les membres se préparant à la chirurgie. Apportez vos questions sur les listes et la préparation.",
      attendees: 38,
    },
    {
      id: "ev-3",
      title_en: "Navigating Emotional Eating During Holiday & Family Gatherings",
      title_fr: "Gérer l'alimentation émotionnelle lors des repas en famille",
      date_en: "Tuesday, July 28, 2026 • 7:30 PM EST",
      date_fr: "Mardi 28 juillet 2026 • 19h30 EST",
      host_en: "Facilitated by Sophia M. (Mindful Eating Liaison)",
      host_fr: "Animé par Sophia M. (Liaison alimentation consciente)",
      desc_en: "Learn strategies to separate physiological hunger from emotional triggers without guilt or shame.",
      desc_fr: "Apprenez des stratégies pour distinguer la faim physiologique des déclencheurs émotionnels sans aucune culpabilité.",
      attendees: 55,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-[#0B1E36] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-xs font-bold text-[#D97706] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>{locale === "en" ? "Live Peer Check-In Circles" : "Cercles de soutien en direct"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl">
            {locale === "en"
              ? "Bilingual Workshops & Community Circles"
              : "Ateliers bilingues et cercles communautaires"}
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            {locale === "en"
              ? "Respectful, confidential online gatherings where you can listen, share your lived experience, and ask questions among peers who truly understand."
              : "Des rencontres en ligne respectueuses et confidentielles où vous pouvez écouter et échanger avec des pairs qui comprennent vraiment."}
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((ev) => {
            const isRsvped = rsvpList.includes(ev.id);
            const title = locale === "en" ? ev.title_en : ev.title_fr;
            const date = locale === "en" ? ev.date_en : ev.date_fr;
            const host = locale === "en" ? ev.host_en : ev.host_fr;
            const desc = locale === "en" ? ev.desc_en : ev.desc_fr;

            return (
              <div
                key={ev.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isRsvped ? "border-[#0D9488] ring-1 ring-[#0D9488]" : "border-[#E2E8F0]"
                }`}
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center flex-wrap gap-2 text-xs font-bold text-[#0D9488]">
                    <span className="flex items-center gap-1 bg-[#0D9488]/10 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{date}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      <Video className="w-3.5 h-3.5" />
                      <span>{locale === "en" ? "Online Video Circle" : "En ligne via vidéo"}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E36] leading-snug">
                    {title}
                  </h3>

                  <p className="text-sm text-[#0B1E36]/75 leading-relaxed">
                    {desc}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#64748B] pt-1">
                    <span>🎙️ {host}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#0D9488]" />
                      <span>{ev.attendees + (isRsvped ? 1 : 0)} {locale === "en" ? "attending" : "participants"}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-[#E2E8F0] shrink-0">
                  <button
                    onClick={() => toggleRsvp(ev.id)}
                    className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 focus-ring ${
                      isRsvped
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-md shadow-[#0D9488]/20"
                    }`}
                  >
                    {isRsvped ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{locale === "en" ? "RSVP Confirmed ✓" : "Inscription confirmée ✓"}</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>{locale === "en" ? "RSVP Now (Free)" : "S'inscrire (Gratuit)"}</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-[#64748B] text-center md:text-right">
                    {locale === "en" ? "Pseudonymous participation allowed" : "Pseudonyme autorisé"}
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
