"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { ShieldAlert, PhoneCall } from "lucide-react";

export default function DisclaimerPage() {
  const { locale, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Official Medical & Safety Disclaimer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
            {locale === "en" ? "Medical Disclaimer" : "Avis de non-responsabilité médicale"}
          </h1>
          <p className="text-sm text-[#64748B]">
            {locale === "en" ? "Please read this document carefully before participating in the Barriaide community." : "Veuillez lire ce document avant d'utiliser Barriaide."}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-md space-y-8 text-sm sm:text-base text-[#0B1E36]/85 leading-relaxed">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl space-y-2">
            <h3 className="font-extrabold text-amber-950 text-lg">
              {locale === "en" ? "Not Medical Advice" : "Ne constitue pas un avis médical"}
            </h3>
            <p className="text-amber-900 font-medium">
              {t.disclaimer.footer}
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">1. Peer Support vs. Clinical Supervision</h2>
            <p>
              {locale === "en"
                ? "All forum discussions, personal stories, non-scale victories, and user comments posted on Barriaide reflect the subjective lived experiences of individual adults. What works for one person regarding GLP-1 titration, bariatric post-operative hydration, or nutritional timing may not be appropriate or safe for another."
                : "Toutes les discussions et témoignages reflètent des expériences vécues individuelles. Ce qui fonctionne pour une personne peut ne pas convenir ou être sécuritaire pour une autre."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">2. Medication & Surgical Decisions</h2>
            <p>
              {locale === "en"
                ? "Never discontinue, initiate, or adjust the dosage of any prescribed medication (including GLP-1 or GIP/GLP-1 receptor agonists) or alter post-surgical clinical recommendations based on information read on Barriaide. Always consult your licensed physician, surgeon, registered dietitian, or mental health provider."
                : "Ne modifiez, n'interrompez ni ne commencez jamais un traitement ou une dose sur la base d'informations lues sur Barriaide. Consultez toujours votre équipe médicale."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">3. Emergency Services Redirection</h2>
            <p className="flex items-center gap-2 font-bold text-rose-600">
              <PhoneCall className="w-5 h-5" />
              <span>
                {locale === "en"
                  ? "In case of severe abdominal pain, persistent vomiting, suicidal thoughts, or any medical emergency, call 911 or your local health emergency number (such as 811 in Canada) immediately."
                  : "En cas de douleur intense, vomissements persistants ou urgence médicale, composez immédiatement le 911 ou le 811."}
              </span>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
