import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barriaide — Support for every weight-loss journey | Du soutien pour chaque parcours",
  description:
    "An educational and peer-support community for adults navigating weight loss and obesity treatment through all approaches: GLP-1 medications, bariatric surgery, nutrition, mindset, and maintenance.",
  keywords: [
    "Barriaide",
    "weight loss community",
    "GLP-1 support",
    "bariatric surgery support",
    "perte de poids",
    "chirurgie bariatrique",
    "soutien entre pairs",
    "obesity treatment",
  ],
  authors: [{ name: "Barriaide Community" }],
  openGraph: {
    title: "Barriaide — Support for every weight-loss journey",
    description: "Supportive, scientifically responsible, inclusive community for every weight-loss path.",
    url: "https://barriaide.com",
    siteName: "Barriaide",
    locale: "en_US",
    alternateLocale: ["fr_CA", "fr_FR"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFBF7] text-[#0B1E36]">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
