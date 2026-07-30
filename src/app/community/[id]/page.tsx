"use client";

import React, { useState, useEffect, use } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import type { ThreadPost } from "../page";
import Link from "next/link";
import {
  MessageSquare,
  ArrowLeft,
  ShieldAlert,
  Heart,
  Bookmark,
  Flag,
  Lock,
  Pin,
  Send,
  Sparkles,
  AlertTriangle,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Reply {
  id: string;
  authorName: string;
  authorRole: "member" | "moderator" | "admin";
  avatarUrl: string;
  content: string;
  createdDate: string;
  reactions: { heart: number; support: number; insight: number };
}

export default function ThreadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const threadId = resolvedParams.id;

  const { locale, t } = useLanguage();
  const { user } = useAuth();

  const [thread, setThread] = useState<ThreadPost | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReplyText, setNewReplyText] = useState("");
  const [reactions, setReactions] = useState({ heart: 18, support: 24, insight: 12 });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [modNote, setModNote] = useState<string | null>(null);

  useEffect(() => {
    const storedThreads = localStorage.getItem("barriaide_forum_threads");
    let found: ThreadPost | undefined;
    if (storedThreads) {
      const parsed: ThreadPost[] = JSON.parse(storedThreads);
      found = parsed.find((t) => t.id === threadId);
    }
    if (!found) {
      found = {
        id: threadId,
        title_en: "What helped you manage nausea during your first month on a GLP-1?",
        title_fr: "Qu'est-ce qui vous a aidé à gérer les nausées durant votre premier mois sous GLP-1 ?",
        category_key: "glp1",
        category_en: "GLP-1 & GIP/GLP-1 MEDICATIONS",
        category_fr: "MÉDICATIONS GLP-1 ET GIP/GLP-1",
        reply_count: 34,
        last_active_en: "2 hours ago",
        last_active_fr: "Il y a 2h",
        avatars: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"],
        content_en:
          "I just finished week 2 on my starter titration dose and have been experiencing mild morning nausea. I found that splitting my breakfast into smaller portions and keeping ginger tea nearby made a huge difference. What gentle strategies worked best for you during early titration?",
        content_fr:
          "Je viens de terminer la semaine 2 et je ressens de légères nausées matinales. J'ai constaté que diviser mon petit-déjeuner en petites portions et boire une tisane au gingembre aidait énormément. Quelles stratégies douces ont le mieux fonctionné pour vous ?",
        authorName: "Elena R. (GLP-1 Path)",
        authorRole: "member",
        createdDate: "2026-07-14",
        isPinned: true,
        isLocked: false,
      };
    }
    setThread(found);

    // Initial Replies
    setReplies([
      {
        id: "rep-1",
        authorName: "Marc-Antoine (Chirurgie & Mod)",
        authorRole: "moderator",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        content:
          "Welcome to the community Elena! Staying hydrated and avoiding fatty/fried foods right after an injection helped many members. As a reminder, if nausea prevents you from keeping fluids down for more than 24h, please consult your prescribing physician or clinical care team right away.",
        createdDate: "2026-07-14",
        reactions: { heart: 12, support: 19, insight: 8 },
      },
      {
        id: "rep-2",
        authorName: "Sophia M. (Nutrition Focus)",
        authorRole: "member",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        content:
          "Cold protein shakes sipped through a straw rather than warm heavy meals really saved my mornings during month 1. You are doing great taking it one day at a time!",
        createdDate: "2026-07-15",
        reactions: { heart: 9, support: 14, insight: 6 },
      },
    ]);
  }, [threadId]);

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim() || thread?.isLocked) return;

    const newReply: Reply = {
      id: "rep-" + Date.now(),
      authorName: user?.displayName || "Community Member",
      authorRole: user?.role || "member",
      avatarUrl: user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: newReplyText,
      createdDate: new Date().toISOString().split("T")[0],
      reactions: { heart: 1, support: 1, insight: 0 },
    };

    setReplies([...replies, newReply]);
    setNewReplyText("");
  };

  const toggleLock = () => {
    if (!thread) return;
    const updated = { ...thread, isLocked: !thread.isLocked };
    setThread(updated);
  };

  const togglePin = () => {
    if (!thread) return;
    const updated = { ...thread, isPinned: !thread.isPinned };
    setThread(updated);
  };

  if (!thread) return null;

  const title = locale === "en" ? thread.title_en : thread.title_fr;
  const category = locale === "en" ? thread.category_en : thread.category_fr;
  const content = locale === "en" ? (thread.content_en || thread.title_en) : (thread.content_fr || thread.title_fr);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D9488] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "en" ? "Back to All Discussions" : "Retour aux discussions"}</span>
          </Link>
        </div>

        {/* Moderator Action Bar (if user is moderator or admin) */}
        {(user?.role === "moderator" || user?.role === "admin") && (
          <div className="bg-[#0B1E36] text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm border border-[#0D9488]/40">
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>{locale === "en" ? "Moderator Tools Panel:" : "Outils de modération :"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={togglePin}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  thread.isPinned ? "bg-[#D97706] text-white" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Pin className="w-3.5 h-3.5" />
                <span>{thread.isPinned ? "Unpin Thread" : "Pin Thread"}</span>
              </button>
              <button
                onClick={toggleLock}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  thread.isLocked ? "bg-rose-600 text-white" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{thread.isLocked ? "Unlock Thread" : "Lock Thread"}</span>
              </button>
              <button
                onClick={() => setModNote(modNote ? null : "Moderator Note: This topic is actively monitored to ensure zero stigma and adherence to clinical safety guidelines.")}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] transition-colors"
              >
                {modNote ? "Remove Note" : "Add Safety Banner"}
              </button>
            </div>
          </div>
        )}

        {/* Content Warning Tag */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-100/70 text-amber-900 border border-amber-300 text-xs font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {locale === "en"
              ? "Content Notice: Peer discussion on early titration side effects. Not medical advice."
              : "Avis de contenu : Discussion entre pairs sur les effets secondaires de titration. Ne constitue pas un avis médical."}
          </span>
        </div>

        {/* Main Thread Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border-2 border-[#0D9488]/30">
                <img src={thread.avatars[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[#0B1E36]">{thread.authorName || "Member"}</span>
                  {thread.authorRole === "moderator" && (
                    <span className="bg-[#0D9488] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      Mod
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{thread.createdDate || "2026-07-14"}</span>
                  <span>•</span>
                  <span className="text-[#0D9488] font-bold">{category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isBookmarked
                    ? "bg-[#0D9488] text-white border-[#0D9488]"
                    : "bg-[#FDFBF7] text-[#0B1E36] border-[#E2E8F0] hover:border-[#0D9488]"
                }`}
                title={locale === "en" ? "Bookmark thread" : "Sauvegarder"}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsReported(true);
                  alert(locale === "en" ? "Thread reported to Barriaide moderation team." : "Discussion signalée aux modérateurs.");
                }}
                className={`p-2.5 rounded-xl border transition-all ${
                  isReported
                    ? "bg-rose-100 text-rose-700 border-rose-300"
                    : "bg-[#FDFBF7] text-[#0B1E36] border-[#E2E8F0] hover:border-rose-400"
                }`}
                title={locale === "en" ? "Report thread" : "Signaler"}
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] leading-tight">
            {title}
          </h1>

          <div className="text-base sm:text-lg text-[#0B1E36]/85 leading-relaxed whitespace-pre-line">
            {content}
          </div>

          {/* Optional Moderator Highlight Banner */}
          {modNote && (
            <div className="bg-teal-50 border-l-4 border-[#0D9488] p-4 rounded-r-xl space-y-1">
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
                Official Moderation Notice / Avis du modérateur
              </span>
              <p className="text-xs sm:text-sm text-teal-950 font-medium">
                {modNote}
              </p>
            </div>
          )}

          {/* Reactions Bar */}
          <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setReactions({ ...reactions, heart: reactions.heart + 1 })}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-200"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{reactions.heart} {locale === "en" ? "Helpful" : "Utile"}</span>
              </button>
              <button
                onClick={() => setReactions({ ...reactions, support: reactions.support + 1 })}
                className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-teal-200"
              >
                <span>🤝 {reactions.support} {locale === "en" ? "Support" : "Soutien"}</span>
              </button>
              <button
                onClick={() => setReactions({ ...reactions, insight: reactions.insight + 1 })}
                className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-200"
              >
                <span>💡 {reactions.insight} {locale === "en" ? "Insightful" : "Instructif"}</span>
              </button>
            </div>

            <div className="text-xs font-semibold text-[#64748B]">
              {replies.length} {locale === "en" ? "Peer Replies" : "Réponses de pairs"}
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0B1E36] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0D9488]" />
            <span>{locale === "en" ? "Peer Replies & Strategies" : "Réponses et stratégies entre pairs"}</span>
          </h2>

          <div className="space-y-4">
            {replies.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={rep.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0B1E36]">{rep.authorName}</span>
                        {rep.authorRole === "moderator" && (
                          <span className="bg-[#0D9488] text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                            Mod
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#64748B]">{rep.createdDate}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#64748B]">
                    <span>❤️ {rep.reactions.heart}</span>
                    <span>🤝 {rep.reactions.support}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#0B1E36]/85 leading-relaxed">
                  {rep.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0B1E36]">
              {locale === "en" ? "Contribute Your Perspective" : "Contribuez avec votre perspective"}
            </h3>
            {thread.isLocked && (
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                <span>{locale === "en" ? "Thread Locked by Moderator" : "Discussion verrouillée"}</span>
              </span>
            )}
          </div>

          {thread.isLocked ? (
            <div className="p-4 bg-slate-50 text-slate-600 text-xs rounded-xl font-medium">
              {locale === "en"
                ? "This thread has been locked by a community moderator. New replies can no longer be added."
                : "Cette discussion a été verrouillée par un modérateur. Vous ne pouvez plus ajouter de réponse."}
            </div>
          ) : (
            <form onSubmit={handlePostReply} className="space-y-4">
              <textarea
                rows={3}
                value={newReplyText}
                onChange={(e) => setNewReplyText(e.target.value)}
                placeholder={
                  locale === "en"
                    ? "Share what helped you, while respecting that every human body responds differently..."
                    : "Partagez ce qui vous a aidé en gardant à l'esprit que chaque corps réagit différemment..."
                }
                className="w-full p-3.5 rounded-xl border border-[#E2E8F0] text-sm focus-ring"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <ShieldAlert className="w-4 h-4 text-[#0D9488]" />
                  <span>Remember: No medical advice. Share personal lived experience only.</span>
                </div>
                <button
                  type="submit"
                  disabled={!newReplyText.trim()}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#0D9488] text-white hover:bg-[#0F766E] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{locale === "en" ? "Post Reply" : "Publier ma réponse"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
