"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import {
  ShieldAlert,
  Lock,
  Pin,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Users,
  MessageSquare,
  Sparkles,
  UserCheck,
  FileText,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { locale } = useLanguage();
  const { user, switchDemoUser, demoUsers } = useAuth();

  const [reportedQueue, setReportedQueue] = useState([
    {
      id: "rep-thread-101",
      title: "Quick titration double-dose trick?",
      author: "NewUser2026",
      reason: "Rule #3 Violation: Advising on dosage adjustments without physician consult.",
      status: "pending",
      severity: "high",
    },
    {
      id: "rep-thread-102",
      title: "Bariatric surgery vs GLP-1: Which is the real way?",
      author: "DebaterMarc",
      reason: "Rule #4 Violation: Hierarchy of superiority and pitting treatment paths against each other.",
      status: "pending",
      severity: "medium",
    },
  ]);

  const handleAction = (id: string, action: "approve" | "lock" | "delete") => {
    if (action === "delete") {
      setReportedQueue(reportedQueue.filter((item) => item.id !== id));
      alert("Post permanently removed. Member sent automated safety warning regarding Rule violation.");
    } else if (action === "lock") {
      setReportedQueue(reportedQueue.map((item) => (item.id === id ? { ...item, status: "locked" } : item)));
      alert("Thread locked and pre-populated with official Clinical Safety Banner.");
    } else {
      setReportedQueue(reportedQueue.filter((item) => item.id !== id));
      alert("Content approved and restored to public feed.");
    }
  };

  // RBAC check
  if (!user || (user.role !== "moderator" && user.role !== "admin")) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Header />
        <main className="flex-grow flex items-center justify-center p-8 text-center max-w-lg mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-rose-200 shadow-xl space-y-4">
            <ShieldAlert className="w-12 h-12 text-rose-600 mx-auto" />
            <h1 className="text-2xl font-bold text-[#0B1E36]">
              {locale === "en" ? "Access Denied — Moderator / Admin Only" : "Accès refusé — Modérateurs uniquement"}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              {locale === "en"
                ? "Your current demo profile (" + (user?.displayName || "Guest") + ") has a 'member' role. To test moderation tools, switch to Marc-Antoine (Moderator) or Admin below:"
                : "Votre profil actuel n'a pas les permissions requises. Choisissez un profil de modérateur ci-dessous :"}
            </p>

            <div className="grid gap-2 pt-2">
              {demoUsers
                .filter((u) => u.role === "moderator" || u.role === "admin")
                .map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => switchDemoUser(mod.id)}
                    className="w-full p-3 rounded-xl bg-[#0B1E36] text-white font-bold text-xs hover:bg-[#0D9488] transition-colors flex items-center justify-between"
                  >
                    <span>Switch to {mod.displayName} ({mod.role})</span>
                    <span>→</span>
                  </button>
                ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-[#0B1E36] text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-xs font-bold text-[#D97706] uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "Role-Based Access Control (RBAC)" : "Contrôle d'accès basé sur les rôles"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {locale === "en" ? `Moderation Portal (${user.role.toUpperCase()})` : `Portail de modération (${user.role.toUpperCase()})`}
            </h1>
            <p className="text-sm text-white/80 leading-relaxed">
              {locale === "en"
                ? "Monitor peer safety, review flagged content against our 11 Community Rules, and manage clinical advisory banners."
                : "Surveillez la sécurité entre pairs et examinez le contenu signalé selon nos 11 règles."}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="text-xs font-semibold text-white/70">Active Mod Session:</div>
            <div className="font-bold text-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
              👤 {user.displayName}
            </div>
          </div>
        </div>

        {/* High Level Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-bold uppercase">Reported Queue</span>
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1E36]">{reportedQueue.length}</div>
            <div className="text-[11px] text-rose-600 font-semibold">Requires proactive review</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-bold uppercase">Active Discussions</span>
              <MessageSquare className="w-5 h-5 text-[#0D9488]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1E36]">48</div>
            <div className="text-[11px] text-[#0D9488] font-semibold">Across all 12 EN/FR categories</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-bold uppercase">Pseudonymous Members</span>
              <Users className="w-5 h-5 text-[#D97706]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1E36]">1,284</div>
            <div className="text-[11px] text-[#D97706] font-semibold">Protected Canadian & Quebec privacy</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-bold uppercase">Safety Compliance</span>
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1E36]">100%</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Zero-tolerance safety pledge</div>
          </div>
        </div>

        {/* Flagged / Reported Content Queue */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#0B1E36] flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              <span>{locale === "en" ? "Reported Content & Safety Queue" : "File de modération et signalements"}</span>
            </h2>
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full">
              {reportedQueue.length} Pending Actions
            </span>
          </div>

          {reportedQueue.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <div className="text-xl font-bold text-[#0B1E36]">
                {locale === "en" ? "Queue Clean! No pending moderation reports." : "File vide ! Aucun signalement en attente."}
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {reportedQueue.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase">
                        {item.severity} Severity
                      </span>
                      <span className="text-xs text-[#64748B] font-semibold">Author: {item.author}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B1E36]">&quot;{item.title}&quot;</h3>
                    <div className="p-3 bg-rose-50 border border-rose-200/80 rounded-xl text-xs font-bold text-rose-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{item.reason}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E2E8F0]">
                    <button
                      onClick={() => handleAction(item.id, "approve")}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Keep</span>
                    </button>
                    <button
                      onClick={() => handleAction(item.id, "lock")}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#D97706] text-white hover:bg-amber-700 transition-colors flex items-center gap-1.5"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Lock & Add Banner</span>
                    </button>
                    <button
                      onClick={() => handleAction(item.id, "delete")}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-rose-600 text-white hover:bg-rose-700 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove Post</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
