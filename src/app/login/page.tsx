"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, ShieldCheck, HeartHandshake, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const { locale } = useLanguage();
  const { login, switchDemoUser, demoUsers } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(locale === "en" ? "Please enter your email and password." : "Veuillez entrer votre courriel et mot de passe.");
      return;
    }

    // Perform login and redirect to dashboard
    login(email, "member", email.split("@")[0] || "Community Member");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-xl">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488] text-white mx-auto flex items-center justify-center shadow-md shadow-[#0D9488]/20">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
              {locale === "en" ? "Sign in to Barriaide" : "Connexion à Barriaide"}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              {locale === "en"
                ? "Enter your credentials or choose a demo profile to test role permissions right away."
                : "Entrez vos identifiants ou choisissez un profil démo pour tester les rôles instantanément."}
            </p>
          </div>

          {/* Quick Demo Role Switcher Box for Prototype Evaluation */}
          <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#0D9488]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>Instant Demo Login (Testing Roles)</span>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">Ready</span>
            </div>

            <div className="grid gap-2">
              {demoUsers.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    switchDemoUser(u.id);
                    router.push("/dashboard");
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0D9488] transition-all flex items-center justify-between text-xs font-semibold group"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={u.avatarUrl} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                    <div>
                      <div className="text-[#0B1E36] group-hover:text-[#0D9488] font-bold">{u.displayName}</div>
                      <div className="text-[10px] text-[#64748B] uppercase">{u.role} Role</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0D9488] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1E36] block">
                {locale === "en" ? "Email Address" : "Adresse courriel"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1E36] block">
                {locale === "en" ? "Password" : "Mot de passe"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748B]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] text-sm focus-ring"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] shadow-md shadow-[#0D9488]/20 transition-all flex items-center justify-center gap-2 focus-ring"
            >
              <span>{locale === "en" ? "Sign In" : "Se connecter"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social OAuth Options */}
          <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
            <div className="text-center text-xs text-[#64748B] font-medium">
              {locale === "en" ? "Or continue with:" : "Ou continuer avec :"}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  login("google@barriaide.com", "member", "Google Member");
                  router.push("/dashboard");
                }}
                className="py-2.5 px-4 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] hover:bg-[#F8FAFC] font-semibold text-xs text-[#0B1E36] transition-colors flex items-center justify-center gap-2"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  login("apple@barriaide.com", "member", "Apple Member");
                  router.push("/dashboard");
                }}
                className="py-2.5 px-4 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] hover:bg-[#F8FAFC] font-semibold text-xs text-[#0B1E36] transition-colors flex items-center justify-center gap-2"
              >
                <span>Apple</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[#64748B] pt-2">
            {locale === "en" ? "Don't have an account yet?" : "Vous n'avez pas encore de compte ?"}{" "}
            <Link href="/register" className="font-bold text-[#0D9488] hover:underline">
              {locale === "en" ? "Join the Community" : "Rejoindre la communauté"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
