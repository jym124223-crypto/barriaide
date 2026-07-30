"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../../lib/i18n";
import { BlogPost, getStoredArticles } from "../../../lib/blog-data";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  Tag, 
  HeartHandshake, 
  ShieldAlert, 
  Bookmark, 
  MessageCircle 
} from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t, locale } = useLanguage();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (slug) {
      const allPosts = getStoredArticles();
      const found = allPosts.find((p) => p.slug === slug);
      if (found) {
        setPost(found);
      } else {
        // Fallback to first post if slug not matched directly
        setPost(allPosts[0] || null);
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="text-[#0B1E36] text-xl font-bold">
          {locale === "en" ? "Article not found." : "Article introuvable."}
        </div>
        <Link 
          href="/blog"
          className="px-6 py-3 rounded-xl bg-[#0B1E36] text-white font-bold text-sm shadow-md"
        >
          ← {locale === "en" ? "Back to Weekly Blog" : "Retour au Journal Hebdo"}
        </Link>
      </div>
    );
  }

  const title = locale === "en" ? post.enTitle : post.frTitle;
  const content = locale === "en" ? post.enContent : post.frContent;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1E36]/70 hover:text-[#F97316] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "en" ? "Back to Weekly Blog" : "Retour à tous les articles"}</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xl space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0B1E36] text-white">
              {post.category.toUpperCase()}
            </span>
            <span className="text-xs text-[#09090B]/60 flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{post.readingTime}</span>
            </span>
            <span className="text-xs text-[#09090B]/60 flex items-center gap-1 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>{post.publishedAt}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E36] leading-tight sm:leading-snug">
            {title}
          </h1>

          {/* Author Card & Actions */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#F97316]"
              />
              <div>
                <span className="text-base font-bold text-[#0B1E36] flex items-center gap-1.5">
                  <span>{post.author.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#EAB308]/20 text-[#D97706] font-extrabold">
                    Founder
                  </span>
                </span>
                <span className="text-xs text-[#09090B]/60 font-medium block">
                  {t.blog?.founderRole || post.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isBookmarked
                    ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316]"
                    : "bg-[#FDFBF7] border-[#E2E8F0] text-[#09090B]/60 hover:text-[#0B1E36]"
                }`}
                title="Save for offline reference"
              >
                <Bookmark className="w-5 h-5" />
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] hover:bg-white text-xs font-bold text-[#0B1E36] transition-all shadow-2xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#F97316]" />
                    <span>{locale === "en" ? "Share Article" : "Partager"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E2E8F0] shadow-md">
          <div className="prose prose-lg max-w-none text-[#09090B]/85 leading-relaxed space-y-6 whitespace-pre-line">
            {content}
          </div>

          {/* Tags */}
          <div className="pt-8 mt-8 border-t border-[#E2E8F0] flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#09090B]/50 mr-2">Topics:</span>
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-[#FDFBF7] border border-[#E2E8F0] text-xs font-semibold text-[#0B1E36] flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#F97316]" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Lived Experience & Non-Clinical Disclaimer Banner */}
        <div className="bg-[#0B1E36] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#EAB308] shadow-xl flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAB308] text-[#09090B] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="text-base font-extrabold text-[#EAB308]">
              {locale === "en" ? "Lived Experience & Non-Clinical Disclaimer" : "Avis d'expérience vécue & Non-clinique"}
            </h4>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed italic">
              {t.blog?.disclaimerBox || "Lived Experience Disclaimer: This weekly article is written from post-op bariatric patient and GLP-1 lived experience to provide community support. It is not medical advice or a substitute for consulting your physician, dietitian, or surgeon."}
            </p>
          </div>
        </div>

        {/* Bottom CTA to Join Community Q&A */}
        <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-extrabold">
              {locale === "en" ? "Have thoughts or questions about this week's topic?" : "Une question sur l'article de cette semaine ?"}
            </h3>
            <p className="text-sm text-white/90">
              {locale === "en" 
                ? "Join our supportive peer forum to discuss titration tips, recipes, and daily wins." 
                : "Rejoignez notre forum d'entraide pour discuter astuces, recettes et victoires du quotidien."}
            </p>
          </div>
          <Link
            href="/community"
            className="px-6 py-3.5 rounded-2xl bg-white text-[#F97316] font-extrabold text-sm hover:bg-[#FDFBF7] shadow-md transition-all shrink-0"
          >
            {t.header?.joinCommunity || "Join the Community"}
          </Link>
        </div>

      </div>
    </div>
  );
}
