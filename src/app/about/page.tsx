"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { HeartHandshake, ShieldCheck, Sparkles, Users, Award, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const { locale, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D9488]/15 text-[#0D9488] text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>{t.header.nav.about} Barriaide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E36] tracking-tight">
            {locale === "en"
              ? "Built From Lived Experience, Anchored in Scientific Responsibility"
              : "Né d'une expérience vécue, ancré dans la responsabilité scientifique"}
          </h1>
          <p className="text-base sm:text-lg text-[#0B1E36]/80 leading-relaxed">
            {locale === "en"
              ? "Barriaide was created to transform the way adults experience peer support during weight loss, obesity treatment, bariatric surgery, and long-term weight maintenance."
              : "Barriaide a été créé pour transformer la façon dont les adultes vivent le soutien entre pairs lors des traitements de l'obésité et de la gestion du poids."}
          </p>
        </div>

        {/* Founder Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-md grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="w-44 h-44 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                alt="Barriaide Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-extrabold text-lg text-[#0B1E36]">Barriaide Founder & Team</div>
              <div className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">Lived Experience & Liaison</div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#0B1E36]">
              {locale === "en" ? "Why We Created Barriaide" : "Pourquoi nous avons créé Barriaide"}
            </h2>
            <p className="text-base text-[#0B1E36]/80 leading-relaxed italic border-l-4 border-[#0D9488] pl-5 py-1">
              &quot;{locale === "en"
                ? "After years of navigating weight, treatment, medication, bariatric surgery and the emotional side of transformation, I wanted to create the kind of community I would have found helpful: informed, compassionate, practical and free of judgment."
                : "Après des années à naviguer entre le poids, les traitements, les médicaments, la chirurgie bariatrique et les dimensions émotionnelles de la transformation, j’ai voulu créer le type de communauté que j’aurais aimé trouver : informée, bienveillante, pratique et sans jugement."}&quot;
            </p>
            <p className="text-sm text-[#0B1E36]/75 leading-relaxed">
              {locale === "en"
                ? "Too often, existing spaces force people to pick a side—pitting medication users against surgery patients or lifestyle-only advocates. Barriaide explicitly rejects this division. Obesity and metabolic health are complex biological journeys, and every person deserves dignity."
                : "Trop souvent, les espaces existants opposent les parcours. Barriaide rejette explicitement cette division. La santé métabolique est complexe et chaque personne mérite dignité et bienveillance."}
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] text-center">
            {locale === "en" ? "Our Core Commitments" : "Nos engagements fondamentaux"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/15 text-[#0D9488] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-[#0B1E36]">
                {locale === "en" ? "Inclusive of All Treatment Paths" : "Inclusion de tous les parcours"}
              </h3>
              <p className="text-sm text-[#0B1E36]/75 leading-relaxed">
                {locale === "en"
                  ? "We never suggest that one method (GLP-1s, surgery, or lifestyle) is morally superior or easier than another. Every choice requires courage."
                  : "Nous ne suggérons jamais qu'une méthode est moralement supérieure. Chaque choix demande du courage."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-[#0B1E36]">
                {locale === "en" ? "Medical Boundaries & Safety" : "Frontières médicales et sécurité"}
              </h3>
              <p className="text-sm text-[#0B1E36]/75 leading-relaxed">
                {locale === "en"
                  ? "We are a peer-support platform. We explicitly prohibit diagnosing, prescribing, or altering treatment doses. We encourage strong collaboration with clinical care teams."
                  : "Nous sommes une plateforme entre pairs. Nous interdisons tout diagnostic médical individuel."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-[#0B1E36]">
                {locale === "en" ? "Zero Body-Shaming & Zero Moralizing" : "Aucun dénigrement ni moralisation"}
              </h3>
              <p className="text-sm text-[#0B1E36]/75 leading-relaxed">
                {locale === "en"
                  ? "Food is fuel and culture, not a moral failure. We do not tolerate toxic diet culture, starvation advice, or shaming any body size."
                  : "Nourriture ne rime pas avec morale. Nous ne tolérons aucun discours toxique ou culpabilisant."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1E36]/10 text-[#0B1E36] flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="text-xl font-bold text-[#0B1E36]">
                {locale === "en" ? "Pseudonymous Privacy First" : "Confidentialité par pseudonyme"}
              </h3>
              <p className="text-sm text-[#0B1E36]/75 leading-relaxed">
                {locale === "en"
                  ? "We minimize data collection and encourage pseudonymous display names so members can share vulnerable health challenges without fear."
                  : "Nous minimisons la collecte de données et encourageons l'utilisation de pseudonymes."}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
