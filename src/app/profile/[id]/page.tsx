"use client";

import React, { useState, useEffect, use } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useAuth, type UserProfile } from "@/lib/auth";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Award,
  MessageSquare,
  ArrowLeft,
  Sparkles,
  Heart,
  Calendar,
} from "lucide-react";

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const profileId = resolvedParams.id;

  const { locale } = useLanguage();
  const { demoUsers } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check if matching one of our demo users or fallback to Elena
    const found = demoUsers.find((u) => u.id === profileId);
    if (found) {
      setProfile(found);
    } else {
      setProfile({
        id: profileId,
        email: "private@barriaide.com",
        displayName: decodeURIComponent(profileId).replace("user-", "") || "Elena R. (GLP-1 Journey)",
        role: "member",
        preferredLanguage: "en",
        journeyCategory: "GLP-1 Medication & Nutrition Focus",
        bio: "Navigating month 8 on GIP/GLP-1 therapy. Dedicated to finding high-protein breakfast rhythms and celebrating daily non-scale victories with our peer community!",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      });
    }
  }, [profileId, demoUsers]);

  if (!profile) return null;

  const nsvList = [
    {
      title_en: "Climbed 4 flights of stairs with zero knee stiffness!",
      title_fr: "J'ai monté 4 étages sans aucune douleur ou raideur aux genoux !",
      date: "2026-07-10",
      likes: 24,
    },
    {
      title_en: "Discovered a sustainable 120g protein daily rhythm",
      title_fr: "J'ai trouvé un rythme quotidien durable de 120g de protéines",
      date: "2026-07-01",
      likes: 19,
    },
    {
      title_en: "Stopped moralizing food choices during a family birthday",
      title_fr: "J'ai arrêté de culpabiliser sur mes choix alimentaires lors d'un anniversaire",
      date: "2026-06-20",
      likes: 31,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D9488] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "en" ? "Back to Community Forum" : "Retour au forum"}</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-2xl text-[#0B1E36]">{profile.displayName}</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0D9488]/15 text-[#0D9488]">
                  {profile.role} Role
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D97706]/15 text-[#D97706] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pseudonym</span>
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0D9488]" />
                <span>{locale === "en" ? "Community Member Since July 2026" : "Membre depuis juillet 2026"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B1E36]">
                📌 {profile.journeyCategory || "GLP-1 Medication & Lifestyle Path"}
              </h1>
              <p className="text-base text-[#0B1E36]/80 leading-relaxed font-normal">
                &quot;{profile.bio || "No biography provided yet."}&quot;
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-6 text-xs font-semibold text-[#64748B]">
              <span>✓ Verified Lived Experience</span>
              <span>✓ Zero-Judgment Pledge Accepted</span>
              <span>✓ Canadian & Quebec Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Non-Scale Victories (NSVs) Showcase */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#0B1E36] flex items-center gap-2.5">
              <Award className="w-6 h-6 text-[#D97706]" />
              <span>{locale === "en" ? "Non-Scale Victories (NSVs) Shared" : "Victoires non liées à la balance (NSVs)"}</span>
            </h2>
            <span className="text-xs font-bold text-[#0D9488] bg-[#0D9488]/10 px-3 py-1 rounded-full">
              3 Victories Recorded
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nsvList.map((nsv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#64748B] uppercase">{nsv.date}</div>
                  <h3 className="font-bold text-base text-[#0B1E36] leading-snug">
                    {locale === "en" ? nsv.title_en : nsv.title_fr}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] text-xs font-semibold text-rose-600">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{nsv.likes} {locale === "en" ? "Peer Cheers" : "Encouragements"}</span>
                  </span>
                  <span className="text-[#64748B] text-[11px] font-normal">🏆 NSV Badge</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Public Discussion Threads */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#0B1E36] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0D9488]" />
            <span>{locale === "en" ? "Recent Discussions Started" : "Discussions récentes démarrées"}</span>
          </h2>
          <div className="space-y-3">
            <Link
              href="/community/1"
              className="block p-4 rounded-2xl bg-[#FDFBF7] border border-[#E2E8F0] hover:border-[#0D9488] transition-all flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold text-[#0D9488]">GLP-1 MEDICATIONS</span>
                <h3 className="text-sm font-bold text-[#0B1E36] mt-0.5">
                  {locale === "en" ? "What helped you manage nausea during week 2?" : "Qu'est-ce qui vous a aidé à gérer les nausées en semaine 2 ?"}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#64748B] shrink-0">34 {locale === "en" ? "replies" : "réponses"} →</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
