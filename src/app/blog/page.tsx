"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../lib/i18n";
import { BlogPost, getStoredArticles, addStoredArticle } from "../../lib/blog-data";
import { 
  BookOpen, 
  PenTool, 
  Clock, 
  UserCheck, 
  Calendar, 
  ArrowRight, 
  Tag, 
  ShieldAlert, 
  Plus, 
  X, 
  CheckCircle2,
  Sparkles,
  Search
} from "lucide-react";

export default function BlogLandingPage() {
  const { t, locale } = useLanguage();
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  // Form state for creating new weekly article
  const [formEnTitle, setFormEnTitle] = useState("");
  const [formFrTitle, setFormFrTitle] = useState("");
  const [formEnExcerpt, setFormEnExcerpt] = useState("");
  const [formFrExcerpt, setFormFrExcerpt] = useState("");
  const [formCategory, setFormCategory] = useState<"glp1" | "bariatric" | "mindset" | "founder">("founder");
  const [formEnContent, setFormEnContent] = useState("");
  const [formFrContent, setFormFrContent] = useState("");
  const [formReadingTime, setFormReadingTime] = useState("5 min read");
  const [formTags, setFormTags] = useState("Weekly Reflection, OARS, Lived Experience");

  useEffect(() => {
    setArticles(getStoredArticles());
  }, []);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEnTitle.trim() || !formFrTitle.trim()) return;

    const tagsArray = formTags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);

    const newPost = addStoredArticle({
      enTitle: formEnTitle.trim(),
      frTitle: formFrTitle.trim(),
      enExcerpt: formEnExcerpt.trim() || formEnContent.slice(0, 150) + "...",
      frExcerpt: formFrExcerpt.trim() || formFrContent.slice(0, 150) + "...",
      category: formCategory,
      enContent: formEnContent.trim(),
      frContent: formFrContent.trim() || formEnContent.trim(),
      readingTime: formReadingTime || "4 min read",
      tags: tagsArray.length > 0 ? tagsArray : ["Weekly Reflection"],
    });

    setArticles(getStoredArticles());
    setShowModal(false);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 4000);

    // Reset fields
    setFormEnTitle("");
    setFormFrTitle("");
    setFormEnExcerpt("");
    setFormFrExcerpt("");
    setFormEnContent("");
    setFormFrContent("");
  };

  const filteredArticles = articles.filter((post) => {
    const matchesCat = activeCategory === "all" || post.category === activeCategory;
    const title = locale === "en" ? post.enTitle : post.frTitle;
    const excerpt = locale === "en" ? post.enExcerpt : post.frExcerpt;
    const matchesQuery = 
      title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  const categoriesList = [
    { id: "all", label: t.blog?.allTopics || "All Articles" },
    { id: "founder", label: t.blog?.categories?.founder || "Weekly Founder Reflections" },
    { id: "glp1", label: t.blog?.categories?.glp1 || "GLP-1 Science & Tips" },
    { id: "bariatric", label: t.blog?.categories?.bariatric || "Bariatric Life & Nutrition" },
    { id: "mindset", label: t.blog?.categories?.mindset || "Non-Scale Victories & Mindset" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Notification Banner if Published */}
        {publishSuccess && (
          <div className="bg-emerald-500/10 border-2 border-emerald-500 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 animate-in fade-in duration-300 shadow-md">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-sm font-bold">
              {locale === "en" 
                ? "🎉 Your weekly article has been published successfully!" 
                : "🎉 Votre article hebdomadaire a été publié avec succès !"}
            </div>
          </div>
        )}

        {/* Hero Section & Write Article CTA */}
        <div className="bg-gradient-to-br from-[#0B1E36] to-[#0d2847] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EAB308]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/40 text-[#EAB308] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.blog?.badge || "Founder Weekly Journal & Peer Insights"}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {t.blog?.title || "Weekly Barriaide Blog"}
              </h1>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed">
                {t.blog?.subtitle || "Every week, our founder and lived-experience community share practical reflections, titration survival guides, nutrition tips, and honest life-after-weight-loss insights."}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold shadow-lg shadow-[#F97316]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <PenTool className="w-5 h-5" />
                <span>{t.blog?.writeArticleBtn || "Write This Week's Article"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#0B1E36] text-white shadow-md"
                    : "bg-white border border-[#E2E8F0] text-[#09090B]/70 hover:text-[#09090B] hover:border-[#F97316]/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#09090B]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "en" ? "Search weekly reflections..." : "Rechercher un article..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#09090B] focus:border-[#F97316] focus:outline-none shadow-2xs"
            />
          </div>
        </div>

        {/* Featured Weekly Article (Top Highlight) */}
        {featuredArticle && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden hover:border-[#F97316]/50 transition-all">
            <div className="p-6 sm:p-10 flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="space-y-4 max-w-3xl flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30">
                    🔥 {t.blog?.featuredBadge || "This Week's Featured Article"}
                  </span>
                  <span className="text-xs text-[#09090B]/60 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readingTime}</span>
                  </span>
                  <span className="text-xs text-[#09090B]/60 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredArticle.publishedAt}</span>
                  </span>
                </div>

                <Link href={`/blog/${featuredArticle.slug}`}>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E36] hover:text-[#F97316] transition-colors leading-tight">
                    {locale === "en" ? featuredArticle.enTitle : featuredArticle.frTitle}
                  </h2>
                </Link>

                <p className="text-base sm:text-lg text-[#09090B]/75 leading-relaxed">
                  {locale === "en" ? featuredArticle.enExcerpt : featuredArticle.frExcerpt}
                </p>

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {featuredArticle.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#FDFBF7] border border-[#E2E8F0] text-xs font-semibold text-[#09090B]/70 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#F97316]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.author.avatarUrl}
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#EAB308]"
                    />
                    <div>
                      <span className="text-sm font-bold text-[#0B1E36] block">
                        {featuredArticle.author.name}
                      </span>
                      <span className="text-xs text-[#F97316] font-semibold block">
                        {t.blog?.founderRole || featuredArticle.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1E36] hover:bg-[#F97316] text-white font-bold text-sm transition-all shadow-md"
                  >
                    <span>{t.blog?.readMore || "Read Full Article"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md hover:shadow-xl hover:border-[#F97316]/50 transition-all flex flex-col justify-between p-6 space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#09090B]/60">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B1E36]/10 text-[#0B1E36] uppercase">
                      {post.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-[#0B1E36] hover:text-[#F97316] transition-colors leading-snug line-clamp-2">
                      {locale === "en" ? post.enTitle : post.frTitle}
                    </h3>
                  </Link>

                  <p className="text-sm text-[#09090B]/70 leading-relaxed line-clamp-3">
                    {locale === "en" ? post.enExcerpt : post.frExcerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#EAB308]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#0B1E36] block">{post.author.name}</span>
                      <span className="text-[#09090B]/50 block">{post.publishedAt}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="w-full py-2.5 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] hover:bg-[#F97316] hover:text-white hover:border-[#F97316] text-[#0B1E36] font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{t.blog?.readMore || "Read Full Article"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E2E8F0] p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-[#09090B]/30 mx-auto" />
            <h3 className="text-lg font-bold text-[#0B1E36]">
              {locale === "en" ? "No articles found matching your search." : "Aucun article ne correspond à votre recherche."}
            </h3>
            <p className="text-sm text-[#09090B]/60">
              {locale === "en" ? "Try selecting 'All Articles' or clearing your query." : "Essayez de sélectionner 'Tous les articles'."}
            </p>
          </div>
        ) : null}

        {/* Lived Experience Safety & Disclaimer Banner */}
        <div className="bg-[#0B1E36]/5 border-2 border-[#EAB308]/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAB308]/20 text-[#D97706] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-base font-extrabold text-[#0B1E36]">
              {locale === "en" ? "Lived Experience & Non-Clinical Disclaimer" : "Avis d'expérience vécue & Non-clinique"}
            </h4>
            <p className="text-xs sm:text-sm text-[#09090B]/80 leading-relaxed italic">
              {t.blog?.disclaimerBox || "Lived Experience Disclaimer: This weekly article is written from post-op bariatric patient and GLP-1 lived experience to provide community support. It is not medical advice or a substitute for consulting your physician, dietitian, or surgeon."}
            </p>
          </div>
        </div>

      </div>

      {/* Write & Publish Weekly Article Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-2 border-[#0B1E36] p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F97316] text-white flex items-center justify-center">
                  <PenTool className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1E36]">
                  {t.blog?.modal?.title || "Write & Publish Weekly Article"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#09090B]/40 hover:text-[#09090B] p-1 rounded-lg hover:bg-[#09090B]/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0B1E36] mb-1">
                    {t.blog?.modal?.enTitle || "Article Title (English) *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formEnTitle}
                    onChange={(e) => setFormEnTitle(e.target.value)}
                    placeholder="e.g., Week 10: Surviving GLP-1 Nausea..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0B1E36] mb-1">
                    {t.blog?.modal?.frTitle || "Article Title (French / Français) *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formFrTitle}
                    onChange={(e) => setFormFrTitle(e.target.value)}
                    placeholder="ex : Semaine 10 : Bien gérer les nausées..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0B1E36] mb-1">
                    {t.blog?.modal?.category || "Topic Category"}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e: any) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] font-semibold bg-white focus:border-[#F97316] focus:outline-none"
                  >
                    <option value="founder">Weekly Founder Reflections</option>
                    <option value="glp1">GLP-1 Science & Tips</option>
                    <option value="bariatric">Bariatric Life & Nutrition</option>
                    <option value="mindset">Non-Scale Victories & Mindset</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#0B1E36] mb-1">
                    {t.blog?.modal?.readingTime || "Estimated Reading Time"}
                  </label>
                  <input
                    type="text"
                    value={formReadingTime}
                    onChange={(e) => setFormReadingTime(e.target.value)}
                    placeholder="e.g., 5 min read"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0B1E36] mb-1">
                    Short Excerpt (English)
                  </label>
                  <textarea
                    rows={2}
                    value={formEnExcerpt}
                    onChange={(e) => setFormEnExcerpt(e.target.value)}
                    placeholder="Brief 2-sentence summary..."
                    className="w-full px-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0B1E36] mb-1">
                    Court résumé (Français)
                  </label>
                  <textarea
                    rows={2}
                    value={formFrExcerpt}
                    onChange={(e) => setFormFrExcerpt(e.target.value)}
                    placeholder="Résumé rapide en 2 phrases..."
                    className="w-full px-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B1E36] mb-1">
                  {t.blog?.modal?.enContent || "Full Article Content (English Markdown/Text) *"}
                </label>
                <textarea
                  rows={6}
                  required
                  value={formEnContent}
                  onChange={(e) => setFormEnContent(e.target.value)}
                  placeholder="Share your lived experience, tips, and weekly reflection here..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0B1E36] mb-1">
                  {t.blog?.modal?.frContent || "Full Article Content (French Markdown/Text)"}
                </label>
                <textarea
                  rows={6}
                  value={formFrContent}
                  onChange={(e) => setFormFrContent(e.target.value)}
                  placeholder="Version française (ou laissez vide pour utiliser l'anglais par défaut)..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0B1E36] mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g., GLP-1, Wegovy, Nausea, Protein"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl border border-[#E2E8F0] bg-[#FDFBF7] hover:bg-[#E2E8F0] text-[#09090B] font-bold transition-colors cursor-pointer"
                >
                  {t.blog?.modal?.cancel || "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#0B1E36] hover:bg-[#F97316] text-white font-extrabold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PenTool className="w-4 h-4" />
                  <span>{t.blog?.modal?.savePublish || "Publish Weekly Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
