"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { SAMPLE_DISCUSSIONS, type SampleDiscussion } from "@/lib/seed-data";
import Link from "next/link";
import {
  MessageSquare,
  PlusCircle,
  Search,
  Filter,
  Users,
  Clock,
  ShieldAlert,
  Tag,
  ArrowUpRight,
  Sparkles,
  Lock,
  Pin,
  CheckCircle2,
  X,
} from "lucide-react";

export interface ThreadPost extends SampleDiscussion {
  isPinned?: boolean;
  isLocked?: boolean;
  content_en?: string;
  content_fr?: string;
  authorName?: string;
  authorRole?: "member" | "moderator" | "admin";
  createdDate?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  welcome: "👋",
  glp1: "💉",
  prepSurgery: "🏥",
  postSurgery: "🩹",
  nutrition: "🥗",
  activity: "🚶",
  mental: "🧠",
  emotionalEating: "💭",
  bodyImage: "🪞",
  habits: "📅",
  maintenance: "⚖️",
  nsv: "🏆",
};

export default function CommunityPage() {
  const { locale, t } = useLanguage();
  const { user } = useAuth();

  const [threads, setThreads] = useState<ThreadPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // New Post State
  const [newTitleEn, setNewTitleEn] = useState("");
  const [newTitleFr, setNewTitleFr] = useState("");
  const [newCategory, setNewCategory] = useState("welcome");
  const [newContent, setNewContent] = useState("");
  const [acknowledgedSafety, setAcknowledgedSafety] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Load threads from local storage / seed data
  useEffect(() => {
    const stored = localStorage.getItem("barriaide_forum_threads");
    if (stored) {
      try {
        setThreads(JSON.parse(stored));
      } catch (e) {
        console.error(e);
        initThreads();
      }
    } else {
      initThreads();
    }
  }, []);

  const initThreads = () => {
    const enriched: ThreadPost[] = SAMPLE_DISCUSSIONS.map((d) => ({
      ...d,
      isPinned: d.id === "1" || d.id === "3",
      isLocked: false,
      content_en: `Initial discussion post regarding ${d.title_en}. We share our personal strategies, daily experiences, and empathetic peer support without judgment. What works best for your daily routine?`,
      content_fr: `Discussion initiale concernant ${d.title_fr}. Nous partageons nos stratégies personnelles, nos expériences quotidiennes et notre soutien entre pairs sans aucun jugement. Qu'est-ce qui fonctionne le mieux pour votre quotidien ?`,
      authorName: d.id === "1" ? "Elena R. (GLP-1)" : d.id === "2" ? "Marc-Antoine (Mod)" : "Sophia M.",
      authorRole: d.id === "2" ? "moderator" : "member",
      createdDate: "2026-07-14",
    }));
    setThreads(enriched);
    localStorage.setItem("barriaide_forum_threads", JSON.stringify(enriched));
  };

  // Filtered Threads
  const filteredThreads = threads.filter((thread) => {
    const title = locale === "en" ? thread.title_en : thread.title_fr;
    const matchesCategory = selectedCategory === "all" || thread.category_en.toLowerCase().includes(selectedCategory.toLowerCase()) || thread.category_fr.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery === "" || title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEn.trim() || !acknowledgedSafety) return;

    const newPost: ThreadPost = {
      id: "thread-" + Date.now(),
      title_en: newTitleEn,
      title_fr: newTitleFr || newTitleEn,
      category_key: newCategory,
      category_en: newCategory.toUpperCase(),
      category_fr: newCategory.toUpperCase(),
      reply_count: 0,
      last_active_en: "Just now",
      last_active_fr: "À l'instant",
      avatars: [user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"],
      content_en: newContent,
      content_fr: newContent,
      authorName: user?.displayName || "Community Member",
      authorRole: user?.role || "member",
      createdDate: new Date().toISOString().split("T")[0],
      isPinned: false,
      isLocked: false,
    };

    const updated = [newPost, ...threads];
    setThreads(updated);
    localStorage.setItem("barriaide_forum_threads", JSON.stringify(updated));
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setIsCreateModalOpen(false);
      setNewTitleEn("");
      setNewTitleFr("");
      setNewContent("");
      setAcknowledgedSafety(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Top Banner & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0B1E36] text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl">
          <div className="space-y-3 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-xs font-bold text-[#0D9488] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "Bilingual Community Forum" : "Forum communautaire bilingue"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {locale === "en" ? "12 Respectful Discussion Categories" : "12 Catégories de discussion bienveillantes"}
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {locale === "en"
                ? "Every path is honored here. Join live peer conversations on medications, bariatric surgery, nutrition, mindset, and long-term maintenance."
                : "Chaque parcours est respecté ici. Rejoignez des discussions entre pairs sur les médicaments, la chirurgie, la nutrition et le maintien."}
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-lg shadow-[#0D9488]/30 transition-all self-start md:self-auto focus-ring z-10 shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{locale === "en" ? "Start a New Discussion" : "Créer une discussion"}</span>
          </button>
        </div>

        {/* Safety & Medical Reminder Banner */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold block">Community Safety Reminder / Rappel de sécurité :</span>
            <span className="text-amber-800 leading-relaxed">
              {t.disclaimer.short} No peer can give medical advice or suggest altering prescribed doses.
            </span>
          </div>
        </div>

        {/* Categories Bar & Search Filter */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-[#0B1E36] self-start sm:self-auto flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#0D9488]" />
              <span>{locale === "en" ? "Filter by Category" : "Filtrer par catégorie"}</span>
            </h2>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === "en" ? "Search threads..." : "Rechercher une discussion..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm focus-ring"
              />
            </div>
          </div>

          {/* 12 Categories Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                selectedCategory === "all"
                  ? "bg-[#0B1E36] text-white border-[#0B1E36] shadow-sm"
                  : "bg-white text-[#0B1E36] border-[#E2E8F0] hover:border-[#0D9488]"
              }`}
            >
              <span>🌐</span>
              <span>{locale === "en" ? "All Categories (12)" : "Toutes les catégories"}</span>
            </button>

            {Object.entries(t.categories).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(name)}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 truncate ${
                  selectedCategory === name
                    ? "bg-[#0D9488] text-white border-[#0D9488] shadow-sm font-bold"
                    : "bg-white text-[#0B1E36] border-[#E2E8F0] hover:border-[#0D9488]"
                }`}
              >
                <span>{CATEGORY_ICONS[key] || "📌"}</span>
                <span className="truncate">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#64748B] px-2 uppercase tracking-wider">
            <span>{locale === "en" ? "Active Discussions" : "Discussions actives"} ({filteredThreads.length})</span>
            <span>{locale === "en" ? "Replies & Activity" : "Réponses et activité"}</span>
          </div>

          {filteredThreads.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] space-y-4">
              <MessageSquare className="w-12 h-12 text-[#64748B]/40 mx-auto" />
              <div className="text-lg font-bold text-[#0B1E36]">
                {locale === "en" ? "No discussions found in this filter." : "Aucune discussion trouvée dans ce filtre."}
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#0D9488] text-white hover:bg-[#0F766E] transition-colors"
              >
                {locale === "en" ? "Reset filters" : "Réinitialiser les filtres"}
              </button>
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const title = locale === "en" ? thread.title_en : thread.title_fr;
              const category = locale === "en" ? thread.category_en : thread.category_fr;
              const lastActive = locale === "en" ? thread.last_active_en : thread.last_active_fr;

              return (
                <div
                  key={thread.id}
                  className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group relative"
                >
                  {/* Left Column: Pins, Category, Title, Author */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center flex-wrap gap-2">
                      {thread.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D97706]/15 text-[#D97706]">
                          <Pin className="w-3 h-3" />
                          <span>{locale === "en" ? "Pinned" : "Épinglé"}</span>
                        </span>
                      )}
                      {thread.isLocked && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          <Lock className="w-3 h-3" />
                          <span>{locale === "en" ? "Locked" : "Verrouillé"}</span>
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FDFBF7] text-[#0D9488] border border-[#E2E8F0]">
                        {category}
                      </span>
                      <span className="text-xs text-[#64748B] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lastActive}</span>
                      </span>
                    </div>

                    <Link href={`/community/${thread.id}`} className="block">
                      <h3 className="text-lg sm:text-xl font-bold text-[#0B1E36] group-hover:text-[#0D9488] transition-colors leading-snug">
                        {title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-[#64748B]">
                      <span>{locale === "en" ? "Started by" : "Démarré par"} <strong className="text-[#0B1E36]">{thread.authorName || "Member"}</strong></span>
                      {thread.authorRole === "moderator" && (
                        <span className="bg-[#0D9488] text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          Mod
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Avatars + Replies + CTA */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0] shrink-0">
                    <div className="flex items-center">
                      <div className="flex -space-x-2 overflow-hidden">
                        {thread.avatars.map((avatar, idx) => (
                          <img
                            key={idx}
                            src={avatar}
                            alt="Member"
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-xs font-semibold text-[#64748B]">+{thread.reply_count}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FDFBF7] border border-[#E2E8F0] text-xs font-bold text-[#0B1E36]">
                      <MessageSquare className="w-4 h-4 text-[#0D9488]" />
                      <span>{thread.reply_count} {locale === "en" ? "replies" : "réponses"}</span>
                    </div>

                    <Link
                      href={`/community/${thread.id}`}
                      className="p-3 rounded-xl bg-[#0B1E36]/5 hover:bg-[#0D9488] hover:text-white transition-colors text-[#0B1E36] focus-ring"
                      aria-label="View thread details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal: Start New Discussion */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E2E8F0] shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-[#64748B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-[#0B1E36]">
                  {locale === "en" ? "Start a New Discussion" : "Démarrer une discussion"}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {locale === "en" ? "Share a question, non-scale victory, or insight with your peers." : "Partagez une question ou une victoire avec vos pairs."}
                </p>
              </div>

              {postSuccess ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                  <div className="text-xl font-bold text-[#0B1E36]">
                    {locale === "en" ? "Discussion posted successfully!" : "Discussion publiée avec succès !"}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreatePost} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#0B1E36] block">
                        {locale === "en" ? "Title (English) *" : "Titre (Anglais) *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={newTitleEn}
                        onChange={(e) => setNewTitleEn(e.target.value)}
                        placeholder="e.g., Managing nausea in week 3?"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus-ring"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#0B1E36] block">
                        {locale === "en" ? "Title (French / Optionnel)" : "Titre (Français)"}
                      </label>
                      <input
                        type="text"
                        value={newTitleFr}
                        onChange={(e) => setNewTitleFr(e.target.value)}
                        placeholder="ex: Gérer les nausées en semaine 3 ?"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0B1E36] block">
                      {locale === "en" ? "Select Category *" : "Sélectionner la catégorie *"}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold focus-ring"
                    >
                      {Object.entries(t.categories).map(([key, name]) => (
                        <option key={key} value={key}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0B1E36] block">
                      {locale === "en" ? "Discussion Details / Message *" : "Détails de la discussion *"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder={locale === "en" ? "Explain what you are going through or what advice has worked for you..." : "Expliquez ce que vous traversez..."}
                      className="w-full p-3 rounded-xl border border-[#E2E8F0] text-sm focus-ring"
                    />
                  </div>

                  {/* Mandatory Pre-Publish Safety Check */}
                  <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>{locale === "en" ? "Mandatory Pre-Publish Safety Check" : "Vérification de sécurité obligatoire"}</span>
                    </div>
                    <label className="flex items-start gap-2.5 text-xs text-amber-900 cursor-pointer select-none font-medium">
                      <input
                        type="checkbox"
                        checked={acknowledgedSafety}
                        onChange={(e) => setAcknowledgedSafety(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-[#0D9488] rounded"
                      />
                      <span>
                        {locale === "en"
                          ? "I confirm this post shares lived peer experience only and does NOT provide individualized medical advice, diagnose any condition, or recommend changing medication dosages."
                          : "Je confirme que cette publication ne contient aucun avis médical individuel et ne suggère aucune modification de traitement."}
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-[#0B1E36] hover:bg-slate-200 transition-colors"
                    >
                      {locale === "en" ? "Cancel" : "Annuler"}
                    </button>
                    <button
                      type="submit"
                      disabled={!acknowledgedSafety || !newTitleEn.trim()}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#0D9488] text-white hover:bg-[#0F766E] disabled:opacity-50 transition-all shadow-sm"
                    >
                      {locale === "en" ? "Publish Discussion" : "Publier la discussion"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
