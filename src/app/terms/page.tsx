"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  const { locale } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1E36]/10 text-[#0B1E36] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Terms of Service / Conditions d&apos;utilisation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
            {locale === "en" ? "Barriaide Terms of Service" : "Conditions générales d'utilisation"}
          </h1>
          <p className="text-xs text-[#64748B]">Effective Date: July 2026 / Date d&apos;entrée en vigueur : juillet 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E8F0] shadow-md space-y-8 text-sm sm:text-base text-[#0B1E36]/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">1. Acceptance of Terms & Peer Nature</h2>
            <p>
              {locale === "en"
                ? "By registering an account or browsing the Barriaide community platform, you explicitly acknowledge that Barriaide is a peer-support and educational environment. It does not provide medical treatment, diagnosis, psychotherapy, or emergency care."
                : "En naviguant ou en créant un compte sur Barriaide, vous reconnaissez que Barriaide offre exclusivement du soutien entre pairs et de l'information."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">2. User Conduct & Moderation</h2>
            <p>
              {locale === "en"
                ? "Users must comply with the 11 Community Rules at all times. Barriaide reserves the right to remove or edit any post, comment, or account that violates safety boundaries, promotes dangerous dieting, or engages in harassment without prior notice."
                : "Les membres doivent respecter les 11 règles. Barriaide se réserve le droit de modérer, modifier ou supprimer tout contenu problématique ou dangereux."}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1E36]">3. Limitation of Liability</h2>
            <p>
              {locale === "en"
                ? "Under no circumstances shall Barriaide, its founders, clinical liaisons, or peer moderators be held liable for personal health decisions made based on peer forum discussions. Always consult your licensed healthcare professional before altering medication or dietary routines."
                : "En aucun cas Barriaide, ses fondateurs ou modérateurs ne pourront être tenus responsables des décisions de santé prises sur la base des discussions entre pairs."}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
