"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "./i18n";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: "member" | "moderator" | "admin";
  preferredLanguage: Locale;
  journeyCategory?: string;
  bio?: string;
  avatarUrl?: string;
}

const DEFAULT_USERS: UserProfile[] = [
  {
    id: "user-member-1",
    email: "elena@demo.barriaide.com",
    displayName: "Elena R. (GLP-1 Journey)",
    role: "member",
    preferredLanguage: "en",
    journeyCategory: "I currently use a GLP-1 or GIP/GLP-1 medication",
    bio: "Navigating month 8 on GIP/GLP-1 therapy. Focused on high-protein breakfast ideas and celebrating non-scale victories like climbing stairs without joint pain!",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "user-mod-1",
    email: "marc.moderator@demo.barriaide.com",
    displayName: "Marc-Antoine (Chirurgie)",
    role: "moderator",
    preferredLanguage: "fr",
    journeyCategory: "I have had bariatric surgery",
    bio: "3 ans après ma chirurgie bariatrique (bypass gastrique). Modérateur communautaire passionné par le maintien à long terme et le soutien psychologique.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "user-admin-1",
    email: "admin@barriaide.com",
    displayName: "Barriaide Admin & Founder Team",
    role: "admin",
    preferredLanguage: "en",
    journeyCategory: "I am focusing on lifestyle changes",
    bio: "Platform Administrator & Clinical Liaison. Dedicated to maintaining a safe, inclusive, zero-stigma environment for all weight-loss paths.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
];

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, role?: "member" | "moderator" | "admin", displayName?: string) => void;
  logout: () => void;
  switchDemoUser: (userId: string) => void;
  demoUsers: UserProfile[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("barriaide_auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored auth user", e);
      }
    } else {
      // Default demo logged-in user for seamless testing
      setUser(DEFAULT_USERS[0]);
      localStorage.setItem("barriaide_auth_user", JSON.stringify(DEFAULT_USERS[0]));
    }
  }, []);

  const login = (email: string, role: "member" | "moderator" | "admin" = "member", displayName = "Community Member") => {
    const newUser: UserProfile = {
      id: "user-" + Math.random().toString(36).substring(2, 9),
      email,
      displayName,
      role,
      preferredLanguage: "en",
    };
    setUser(newUser);
    localStorage.setItem("barriaide_auth_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("barriaide_auth_user");
  };

  const switchDemoUser = (userId: string) => {
    const target = DEFAULT_USERS.find((u) => u.id === userId);
    if (target) {
      setUser(target);
      localStorage.setItem("barriaide_auth_user", JSON.stringify(target));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchDemoUser, demoUsers: DEFAULT_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
