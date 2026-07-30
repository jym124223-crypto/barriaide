"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { ShieldCheck, CheckCircle2, AlertTriangle, HeartHandshake } from "lucide-react";

export default function GuidelinesPage() {
  const { locale } = useLanguage();

  const rules = [
    {
      num: "01",
      title_en: "Dignity, Empathy & Mutual Respect",
      title_fr: "Dignité, empathie et respect mutuel",
      desc_en: "Treat all members with compassion. Body shaming, harassment, derogatory language, or personal attacks of any kind will result in immediate removal.",
      desc_fr: "Traitez tous les membres avec bienveillance. Le harcèlement et le dénigrement corporel sont strictement interdits.",
    },
    {
      num: "02",
      title_en: "No Individualized Medical Advice or Diagnosis",
      title_fr: "Aucun diagnostic ni conseil médical individuel",
      desc_en: "Barriaide provides peer support and education. Members must never attempt to diagnose medical conditions or prescribe specific therapies to others.",
      desc_fr: "Barriaide offre du soutien entre pairs. Les membres ne doivent jamais tenter de poser un diagnostic ou de prescrire une thérapie.",
    },
    {
      num: "03",
      title_en: "Never Advise Altering Prescribed Medication Doses",
      title_fr: "Ne jamais suggérer de modifier une dose prescrite",
      desc_en: "Questions regarding GLP-1 titration schedules or bariatric supplement regimens must always be referred back to the member's prescribing physician or clinical team.",
      desc_fr: "Les questions de titration ou de supplémentation doivent toujours être redirigées vers le médecin traitant.",
    },
    {
      num: "04",
      title_en: "Respect For All Treatment Paths",
      title_fr: "Respect de tous les parcours de traitement",
      desc_en: "We celebrate GLP-1 medications, bariatric surgery, nutrition, movement, mindset, and maintenance as valid pathways. No hierarchy of superiority is allowed.",
      desc_fr: "Nous valorisons tous les parcours : médicaments, chirurgie, nutrition et mode de vie. Aucune hiérarchie ou supériorité morale n'est tolérée.",
    },
    {
      num: "05",
      title_en: "No Promotion of Starvation or Eating Disorder Behaviors",
      title_fr: "Aucune promotion de jeûne extrême ou de troubles alimentaires",
      desc_en: "Food is nourishment. Posts promoting extreme calorie restriction, purging, unguided long-term fasting, or moralizing food choices are strictly prohibited.",
      desc_fr: "La nourriture est source d'énergie. Les publications encourageant les restrictions extrêmes ou culpabilisantes sont interdites.",
    },
    {
      num: "06",
      title_en: "Pseudonymous Privacy Protection",
      title_fr: "Protection de la vie privée et pseudonymat",
      desc_en: "Respect member anonymity. Do not ask for full legal names, health insurance numbers, exact home addresses, or private medical records.",
      desc_fr: "Respectez l'anonymat. Ne demandez jamais de numéros d'assurance maladie ou d'adresses privées.",
    },
    {
      num: "07",
      title_en: "No Commercial Solicitation or Supplement Sales",
      title_fr: "Aucune sollicitation commerciale ni vente de suppléments",
      desc_en: "Barriaide is a safe community space. Multi-level marketing (MLM), unauthorized weight-loss supplement sales, or spamming will lead to an instant permanent ban.",
      desc_fr: "Barriaide est un espace sécuritaire. Le marketing de réseau (MLM) et le spam mènent au bannissement définitif.",
    },
    {
      num: "08",
      title_en: "Use Content Warnings For Sensitive Topics",
      title_fr: "Utiliser des avertissements pour les sujets sensibles",
      desc_en: "When sharing difficult side effects, surgical complications, or deep body image struggles, prefix your thread title with a content notice.",
      desc_fr: "Ajoutez un avertissement en en-tête lorsque vous abordez des effets secondaires difficiles ou des complications.",
    },
    {
      num: "09",
      title_en: "Zero Tolerance for Hate Speech & Fatphobia",
      title_fr: "Tolérance zéro pour les discours de haine et la grossophobie",
      desc_en: "We maintain a zero-tolerance policy against racism, sexism, fatphobia, ableism, or discrimination based on identity or health history.",
      desc_fr: "Nous maintenons une politique de tolérance zéro contre la grossophobie, le racisme et toute forme de discrimination.",
    },
    {
      num: "10",
      title_en: "Scientific Responsibility & Factual Honesty",
      title_fr: "Responsabilité scientifique et honnêteté factuelle",
      desc_en: "Distinguish clearly between personal lived experience and established clinical evidence. Misleading medical claims will be flagged by our moderators.",
      desc_fr: "Séparez clairement l'expérience vécue des preuves cliniques établies. Les affirmations trompeuses seront modérées.",
    },
    {
      num: "11",
      title_en: "Proactive Moderation & Peer Reporting",
      title_fr: "Modération proactive et signalement par les pairs",
      desc_en: "Help keep our space safe. If you observe any post violating these 11 rules or jeopardizing member safety, click 'Report' immediately.",
      desc_fr: "Aidez-nous à préserver la sécurité. Si vous voyez une publication enfreignant ces règles, signalez-la immédiatement.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D9488]/15 text-[#0D9488] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{locale === "en" ? "Community Guidelines & Safety" : "Règles et sécurité de la communauté"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E36] tracking-tight">
            {locale === "en" ? "The 11 Barriaide Community Rules" : "Les 11 règles de la communauté Barriaide"}
          </h1>
          <p className="text-base sm:text-lg text-[#0B1E36]/75 leading-relaxed">
            {locale === "en"
              ? "To ensure a respectful, non-judgmental, and scientifically responsible peer-support environment, every member agrees to uphold these 11 core standards."
              : "Pour garantir un environnement bienveillant, respectueux et responsable, chaque membre s'engage à respecter ces 11 normes."}
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#0D9488]/15 text-[#0D9488] font-extrabold text-sm flex items-center justify-center">
                    {r.num}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1E36] leading-snug">
                  {locale === "en" ? r.title_en : r.title_fr}
                </h3>
              </div>
              <p className="text-sm text-[#0B1E36]/75 leading-relaxed pt-2 border-t border-[#E2E8F0]">
                {locale === "en" ? r.desc_en : r.desc_fr}
              </p>
            </div>
          ))}
        </div>

        {/* Zero Tolerance Box */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-amber-950">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 font-extrabold text-sm uppercase tracking-wider text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>{locale === "en" ? "Zero-Tolerance Enforcement" : "Application à tolérance zéro"}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              {locale === "en"
                ? "Our bilingual moderator team proactively reviews reported content. Violations involving commercial spam, harassment, or dangerous medical dosing advice will lead to immediate account restriction without refund or appeal."
                : "Notre équipe de modérateurs révise activement le contenu signalé. Les infractions graves entraînent la suspension immédiate."}
            </p>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-amber-600 text-white font-bold text-xs shrink-0 uppercase">
            {locale === "en" ? "Protected Space" : "Espace protégé"}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
