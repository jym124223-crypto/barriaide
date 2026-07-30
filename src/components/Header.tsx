"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../lib/i18n";
import { Menu, X, Globe, HeartHandshake, LogIn, UserPlus } from "lucide-react";

export function Header() {
  const { locale, toggleLocale, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.header.nav.home },
    { href: "/start-here", label: t.header.nav.startHere },
    { href: "/community", label: t.header.nav.community },
    { href: "/resources", label: t.header.nav.resources },
    { href: "/videos", label: t.header.nav.videos },
    { href: "/blog", label: (t.header.nav as any).blog || (locale === "en" ? "Weekly Blog" : "Journal Hebdo") },
    { href: "/about", label: t.header.nav.about },
    { href: "/contact", label: t.header.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg py-1 px-2 -ml-2">
            <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center text-white shadow-sm shadow-[#F97316]/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight select-none">
              <span className="text-[#09090B]">Barri</span>
              <span className="text-[#F97316]">aide</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#09090B]/80 hover:text-[#09090B] hover:bg-[#09090B]/5 transition-colors focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions (Language Switcher + Auth) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              aria-label={`Current language: ${locale.toUpperCase()}. Click to switch language.`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border border-[#E2E8F0] bg-white text-[#09090B] hover:border-[#F97316] hover:text-[#F97316] transition-all focus-ring shadow-2xs cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#F97316]" />
              <span className={locale === "en" ? "text-[#F97316] underline font-bold" : "opacity-60"}>EN</span>
              <span className="opacity-30">/</span>
              <span className={locale === "fr" ? "text-[#F97316] underline font-bold" : "opacity-60"}>FR</span>
            </button>

            {/* Sign In Button */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#09090B] hover:bg-[#09090B]/5 transition-colors focus-ring"
            >
              <LogIn className="w-4 h-4 text-[#64748B]" />
              {t.header.signIn}
            </Link>

            {/* Join the Community CTA */}
            <Link
              href="/register"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#F97316] hover:bg-[#EA580C] shadow-sm shadow-[#F97316]/25 transition-all transform active:scale-[0.98] focus-ring"
            >
              <UserPlus className="w-4 h-4" />
              {t.header.joinCommunity}
            </Link>
          </div>

          {/* Mobile Menu Button + Language Switcher */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLocale}
              aria-label="Switch Language EN/FR"
              className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-bold border border-[#E2E8F0] bg-white text-[#09090B]"
            >
              <Globe className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{locale.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="p-2.5 rounded-xl text-[#09090B] hover:bg-[#09090B]/5 focus-ring"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="grid gap-1 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-[#09090B] hover:bg-[#F97316]/10 hover:text-[#F97316] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-sm font-medium text-[#64748B]">Language / Langue:</span>
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-white border border-[#E2E8F0] shadow-2xs"
              >
                <Globe className="w-4 h-4 text-[#F97316]" />
                <span className={locale === "en" ? "text-[#F97316] underline" : "opacity-60"}>EN</span>
                <span>/</span>
                <span className={locale === "fr" ? "text-[#F97316] underline" : "opacity-60"}>FR</span>
              </button>
            </div>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-[#09090B] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
            >
              <LogIn className="w-4 h-4" />
              {t.header.signIn}
            </Link>

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-[#F97316] hover:bg-[#EA580C] shadow-md shadow-[#F97316]/20"
            >
              <UserPlus className="w-4 h-4" />
              {t.header.joinCommunity}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
