"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage, type Locale } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, ShieldAlert, Check, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const { locale } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredLang, setPreferredLang] = useState<Locale>(locale);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!displayName.trim() || !email.trim() || !password.trim()) {
      setError(locale === "en" ? "Please fill in all required fields." : "Veuillez remplir tous les champs requis.");
      return;
    }

    if (!rulesAccepted) {
      setError(
        locale === "en"
          ? "You must accept the Community Rules & Safety Disclaimer to join."
          : "Vous devez accepter les règles de la communauté et l'avis de sécurité pour vous inscrire."
      );
      return;
    }

    // Register user and redirect to dashboard
    login(email, "member", displayName);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] shadow-xl">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488] text-white mx-auto flex items-center justify-center shadow-md shadow-[#0D9488]/20">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
              {locale === "en" ? "Join the Barriaide Community" : "Rejoindre la communauté Barriaide"}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              {locale === "en"
                ? "We safeguard your privacy. You can use a pseudonymous display name so your medical journey remains confidential."
                : "Nous protégeons votre vie privée. Utilisez un pseudonyme pour préserver la confidentialité de votre parcours médical."}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Display Name / Pseudonym */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1E36] flex items-center justify-between">
                <span>{locale === "en" ? "Display Name (Pseudonym recommended) *" : "Nom d'affichage (Pseudonyme recommandé) *"}</span>
                <span className="text-[10px] text-[#0D9488] font-semibold">Public</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={locale === "en" ? "e.g., Elena R. or MountainWalker99" : "ex: Marc-A. ou Marcheur99"}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1E36] flex items-center justify-between">
                <span>{locale === "en" ? "Private Email Address *" : "Adresse courriel privée *"}</span>
                <span className="text-[10px] text-[#64748B]">Never shared externally</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1E36] block">
                {locale === "en" ? "Password *" : "Mot de passe *"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
              />
            </div>

            {/* Preferred Language */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-[#0B1E36] block">
                {locale === "en" ? "Preferred Communication Language:" : "Langue de communication préférée :"}
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input
                    type="radio"
                    name="preferredLang"
                    checked={preferredLang === "en"}
                    onChange={() => setPreferredLang("en")}
                    className="w-4 h-4 text-[#0D9488]"
                  />
                  <span>English (EN)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input
                    type="radio"
                    name="preferredLang"
                    checked={preferredLang === "fr"}
                    onChange={() => setPreferredLang("fr")}
                    className="w-4 h-4 text-[#0D9488]"
                  />
                  <span>Français (FR)</span>
                </label>
              </div>
            </div>

            {/* Mandatory Rules & Medical Disclaimer Acceptance Box */}
            <div className="bg-[#FDFBF7] border border-[#E2E8F0] rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E36]">
                <ShieldAlert className="w-4 h-4 text-[#D97706]" />
                <span>{locale === "en" ? "Mandatory Community Rules Acceptance" : "Acceptation obligatoire des règles"}</span>
              </div>

              <ul className="text-xs text-[#0B1E36]/80 space-y-1.5 pl-5 list-disc">
                <li>{locale === "en" ? "Treat all members with dignity; no body shaming or harassment." : "Traiter tous les membres avec dignité; aucun dénigrement corporel ou harcèlement."}</li>
                <li>{locale === "en" ? "No diagnosis or individualized medical prescribing or altering medication doses." : "Aucun diagnostic ou prescription médicale individuelle ni modification de dose."}</li>
                <li>{locale === "en" ? "Do not promote dangerous dieting, starvation, or eating disorder behaviors." : "Ne pas faire la promotion de régimes dangereux, de jeûne extrême ou de troubles de l'alimentation."}</li>
                <li>{locale === "en" ? "Barriaide provides peer support, not emergency or clinical care." : "Barriaide offre du soutien entre pairs, et non des soins d'urgence ou cliniques."}</li>
              </ul>

              <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-[#E2E8F0] select-none text-xs font-bold text-[#0B1E36]">
                <input
                  type="checkbox"
                  checked={rulesAccepted}
                  onChange={(e) => setRulesAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#0D9488] rounded focus:ring-[#0D9488] border-[#E2E8F0] shrink-0"
                />
                <span>
                  {locale === "en"
                    ? "I accept the 11 Community Rules and acknowledge the Medical Disclaimer."
                    : "J'accepte les 11 règles de la communauté et je prends acte de l'avis médical."}
                </span>
              </label>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] shadow-lg shadow-[#0D9488]/25 transition-all flex items-center justify-center gap-2 text-base focus-ring"
            >
              <Check className="w-5 h-5" />
              <span>{locale === "en" ? "Create Free Account" : "Créer mon compte gratuit"}</span>
            </button>
          </form>

          <div className="text-center text-xs text-[#64748B] pt-2">
            {locale === "en" ? "Already have an account?" : "Vous avez déjà un compte ?"}{" "}
            <Link href="/login" className="font-bold text-[#0D9488] hover:underline">
              {locale === "en" ? "Sign In" : "Se connecter"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
