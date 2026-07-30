"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { Shield, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
  const { locale } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D9488]/15 text-[#0D9488] text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Canadian & Quebec Law 25 Compliance Ready</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
            {locale === "en" ? "Privacy Policy & Data Protection" : "Politique de confidentialité et protection des données"}
          </h1>
          <p className="text-xs text-[#64748B]">Last updated: July 2026 / Dernière mise à jour : juillet 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E8F0] shadow-md space-y-8 text-sm sm:text-base text-[#0B1E36]/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">1. Pseudonym-First Privacy Commitment</h2>
            <p>
              {locale === "en"
                ? "Barriaide recognizes the deeply sensitive nature of weight loss, obesity treatment, bariatric surgery, and metabolic health. We explicitly encourage all members to use pseudonymous display names. We do not require, nor do we request, full government names, provincial health insurance numbers, exact home addresses, or detailed medical diagnostic records."
                : "Barriaide reconnaît la sensibilité des parcours de santé. Nous encourageons l'utilisation de pseudonymes et n'exigeons jamais de numéros d'assurance maladie ou d'adresses privées."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">2. Quebec Law 25 & Canadian PIPEDA Alignment</h2>
            <p>
              {locale === "en"
                ? "In accordance with Quebec's Law 25 and Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), we only collect the minimum information necessary to operate community forums (email address for authentication and optional communication preferences). All members have the right to access, export, rectify, or request immediate deletion of their personal profile and forum contributions at any time."
                : "Conformément à la Loi 25 du Québec et à la LPRPDE canadienne, nous ne collectons que le minimum requis. Chaque membre dispose d'un droit d'accès, de rectification et de suppression immédiate."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">3. Zero Third-Party Data Selling</h2>
            <p>
              {locale === "en"
                ? "We never sell, rent, or trade member personal data or community discussion text to pharmaceutical companies, weight-loss clinics, advertising brokers, or insurance providers."
                : "Nous ne vendons, louons ou n'échangeons jamais vos données à des sociétés pharmaceutiques, cliniques ou courtiers publicitaires."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">4. CASL (Canada&apos;s Anti-Spam Legislation) Compliance</h2>
            <p>
              {locale === "en"
                ? "Our newsletter and educational update emails strictly adhere to CASL. We require explicit opt-in consent before sending any commercial or newsletter communication, and every email includes a one-click unsubscribe mechanism."
                : "Notre infolettre respecte scrupuleusement la LCAP avec consentement explicite et lien de désabonnement en un clic."}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
