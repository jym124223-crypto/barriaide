"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../lib/i18n";
import { HeartHandshake, ShieldAlert, Globe, ExternalLink } from "lucide-react";

export function Footer() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <footer className="bg-[#09090B] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Prominent Footer Medical Disclaimer Box */}
        <div className="bg-[#FDFBF7]/10 border border-[#F97316]/40 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2.5 text-[#F97316] font-bold text-sm uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5" />
            <span>Important Medical Disclaimer / Avis de non-responsabilité médicale</span>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
            {t.disclaimer.footer}
          </p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 inline-block focus-ring rounded-lg">
              <div className="w-9 h-9 rounded-xl bg-[#F97316] flex items-center justify-center text-white shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">Barri</span>
                <span className="text-[#F97316]">aide</span>
              </span>
            </Link>

            <p className="text-sm text-white/75 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>

            {/* Language Switcher */}
            <div className="pt-2">
              <button
                onClick={toggleLocale}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors focus-ring"
              >
                <Globe className="w-4 h-4 text-[#F97316]" />
                <span>Switch to {locale === "en" ? "Français (FR)" : "English (EN)"}</span>
              </button>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F97316]">
              {t.header.nav.community}
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/start-here" className="hover:text-white transition-colors">
                  {t.header.nav.startHere}
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  {t.header.nav.community} (12 Categories)
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  {t.header.nav.resources}
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-white transition-colors">
                  {t.header.nav.videos}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.header.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.header.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F97316]">
              Legal & Privacy / Juridique et confidentialité
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>{t.footer.links.privacy}</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>{t.footer.links.terms}</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>{t.footer.links.rules}</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>{t.footer.links.disclaimer}</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
            <div className="text-[11px] text-white/50 pt-2 max-w-xs">
              Note: All legal text is drafted with Canadian and Quebec privacy compliance principles (CASL/Law 25) ready for legal review before commercial rollout.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Barriaide. {t.footer.rights}
          </div>
          <div className="font-semibold text-[#F97316]">
            {t.footer.demoNotice}
          </div>
        </div>
      </div>
    </footer>
  );
}
