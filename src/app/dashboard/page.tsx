"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import {
  User,
  Compass,
  Bookmark,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  LogOut,
  Edit,
  Check,
  Video,
  BookOpen,
} from "lucide-react";

export default function DashboardPage() {
  const { locale } = useLanguage();
  const { user, logout, login } = useAuth();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(user?.displayName || "Elena R.");
  const [editedBio, setEditedBio] = useState(user?.bio || "Navigating month 8 on GIP/GLP-1 therapy.");

  const handleSaveProfile = () => {
    if (user) {
      login(user.email, user.role, editedName);
    }
    setIsEditingProfile(false);
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Header />
        <main className="flex-grow flex items-center justify-center p-8 text-center">
          <div className="space-y-4 max-w-md">
            <User className="w-12 h-12 text-[#64748B] mx-auto" />
            <h1 className="text-2xl font-bold text-[#0B1E36]">
              {locale === "en" ? "Please sign in to access your dashboard" : "Veuillez vous connecter"}
            </h1>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded-xl font-bold bg-[#0D9488] text-white"
            >
              {locale === "en" ? "Go to Sign In" : "Aller à la connexion"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Top Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 flex flex-col items-center text-center space-y-3 border-b md:border-b-0 md:border-r border-[#E2E8F0] pb-6 md:pb-0 md:pr-6">
            <div className="relative w-28 h-28 rounded-3xl overflow-hidden border-2 border-[#0D9488]/30 shadow-md">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-extrabold text-lg text-[#0B1E36]">{user.displayName}</div>
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0D9488]/15 text-[#0D9488]">
                {user.role} Role
              </span>
            </div>
          </div>

          <div className="md:col-span-9 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  {locale === "en" ? "Personalized Dashboard" : "Tableau de bord personnalisé"}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
                  {locale === "en" ? `Welcome back, ${user.displayName}!` : `Bon retour, ${user.displayName} !`}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-[#E2E8F0] bg-[#FDFBF7] hover:border-[#0D9488] transition-colors flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? "Cancel" : locale === "en" ? "Edit Profile" : "Modifier le profil"}</span>
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{locale === "en" ? "Sign Out" : "Déconnexion"}</span>
                </button>
              </div>
            </div>

            {isEditingProfile ? (
              <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#0D9488]/40 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0B1E36] block">Display Name (Pseudonym):</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E2E8F0] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0B1E36] block">Short Bio & Journey Notes:</label>
                  <textarea
                    rows={2}
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E2E8F0] text-sm"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2 rounded-xl font-bold text-xs bg-[#0D9488] text-white hover:bg-[#0F766E] flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-[#0B1E36]/80 leading-relaxed font-medium">
                  {editedBio || user.bio || "No biography added yet."}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#0D9488]">
                  <span className="bg-[#0D9488]/10 px-3 py-1 rounded-lg">
                    📌 Journey: {user.journeyCategory || "GLP-1 Medication Path"}
                  </span>
                  <span className="bg-[#D97706]/10 text-[#D97706] px-3 py-1 rounded-lg">
                    🔒 Pseudonym-Protected Privacy
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/community"
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#0D9488] shadow-2xs hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0D9488]/15 text-[#0D9488] flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#0B1E36] group-hover:text-[#0D9488] transition-colors">
              {locale === "en" ? "Join Active Discussions" : "Rejoindre les discussions"}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {locale === "en"
                ? "Browse 12 bilingual peer-support categories or ask a question."
                : "Parcourez les 12 catégories de soutien entre pairs ou posez une question."}
            </p>
          </Link>

          <Link
            href="/resources"
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#D97706] shadow-2xs hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#0B1E36] group-hover:text-[#D97706] transition-colors">
              {locale === "en" ? "Explore Evidence Library" : "Explorer la bibliothèque"}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {locale === "en"
                ? "Practical guides on protein intake, titration side effects, and pre-op prep."
                : "Guides pratiques sur l'apport en protéines, la titration et la préparation chirurgicale."}
            </p>
          </Link>

          <Link
            href="/videos"
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-rose-600 shadow-2xs hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#0B1E36] group-hover:text-rose-600 transition-colors">
              {locale === "en" ? "Watch Video Hub" : "Vidéos et webinaires"}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {locale === "en"
                ? "Bilingual expert discussions, patient stories, and emotional eating workshops."
                : "Discussions d'experts et témoignages sur l'alimentation émotionnelle."}
            </p>
          </Link>
        </div>

        {/* Saved Resources & Bookmarked Threads Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h2 className="text-lg font-bold text-[#0B1E36] flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#0D9488]" />
                <span>{locale === "en" ? "Bookmarked Peer Discussions" : "Discussions sauvegardées"}</span>
              </h2>
              <Link href="/community" className="text-xs font-bold text-[#0D9488] hover:underline">
                {locale === "en" ? "View all" : "Voir tout"} →
              </Link>
            </div>

            <div className="space-y-3">
              <Link
                href="/community/1"
                className="block p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8F0] hover:border-[#0D9488] transition-all space-y-1"
              >
                <div className="text-xs font-bold text-[#0D9488]">GLP-1 MEDICATIONS</div>
                <div className="text-sm font-bold text-[#0B1E36]">What helped you manage nausea during your first month?</div>
                <div className="text-[11px] text-[#64748B]">34 replies • Active 2h ago</div>
              </Link>
              <Link
                href="/community/3"
                className="block p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8F0] hover:border-[#0D9488] transition-all space-y-1"
              >
                <div className="text-xs font-bold text-[#D97706]">NUTRITION & PROTEIN</div>
                <div className="text-sm font-bold text-[#0B1E36]">High-protein breakfasts that don&apos;t feel heavy</div>
                <div className="text-[11px] text-[#64748B]">42 replies • Active 5h ago</div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h2 className="text-lg font-bold text-[#0B1E36] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D97706]" />
                <span>{locale === "en" ? "Recommended For You" : "Recommandé pour vous"}</span>
              </h2>
              <Link href="/resources" className="text-xs font-bold text-[#0D9488] hover:underline">
                {locale === "en" ? "Library" : "Bibliothèque"} →
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-teal-800">GUIDE / RESOURCE</div>
                  <div className="text-sm font-bold text-[#0B1E36]">Navigating Plateaus Without Shaming Yourself</div>
                  <div className="text-[11px] text-[#64748B]">Physiological set points & weight stability</div>
                </div>
                <Link
                  href="/resources"
                  className="p-2.5 rounded-xl bg-[#0D9488] text-white shrink-0 hover:bg-[#0F766E]"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-amber-800">CHECKLIST</div>
                  <div className="text-sm font-bold text-[#0B1E36]">Pre-Op & Post-Op Questions to Ask Your Team</div>
                  <div className="text-[11px] text-[#64748B]">Empowering medical appointments</div>
                </div>
                <Link
                  href="/resources"
                  className="p-2.5 rounded-xl bg-[#0D9488] text-white shrink-0 hover:bg-[#0F766E]"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
