# 🌐 Barriaide — Modern Bilingual Community & Peer-Support Platform

**Barriaide** (`barriaide.com`) is an educational and peer-support community for adults navigating weight loss, obesity treatment, and long-term metabolic health through all valid treatment approaches:
- **GLP-1 and GIP/GLP-1 medications**
- **Bariatric surgery**
- **Nutrition & Protein Pacing**
- **Physical activity & Gentle Movement**
- **Mental well-being & Support**
- **Emotional eating & Food Relationship**
- **Body image & Identity Transition**
- **Behaviour change & Daily Routines**
- **Long-term weight maintenance**
- **Life after major weight loss**

> **Our Core Commitment**: Barriaide is inclusive of all treatment paths. It never suggests that one method is morally superior or easier than another. Every journey requires courage and dignity.

---

## ✨ Architectural Highlights

### 1. Bilingual Engine (`EN` ↔ `FR`)
- Fully localized across every component via `src/lib/i18n.tsx` (`next-intl` dictionary pattern).
- Instant switching in header (`Header.tsx`) across all 12 forum categories, NSV boards, resource libraries, and legal pages without page reloads.

### 2. Pseudonym-First & Quebec Law 25 Compliance
- Members are encouraged to use pseudonymous display names (`Elena R.`, `Marc-Antoine`, `Sophia M.`) to protect personal health privacy.
- Minimal data collection strictly adhering to **Quebec Law 25** and **Canadian PIPEDA** privacy standards.
- Zero commercial third-party data selling or multi-level marketing (MLM) solicitation (`Rule #7 Zero-Tolerance`).

### 3. Role-Based Access Control (RBAC) & Moderation
- **Demo Switcher Bar** located in the footer for instant testing across four roles:
  - `Member` (Normal participation, replies, bookmarked threads)
  - `Moderator` (`/admin` access to lock threads, pin topics, and review reported content queue)
  - `Admin` (Full platform governance and safety enforcement)
  - `Clinical Liaison` (Able to attach verified clinical review badges and evidence notes)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js** (`v20+` recommended)
- **npm** (`v10+`)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view Barriaide in your browser.

### 3. Build for Production Verification
```bash
npm run build
```
Runs Next.js 15 App Router build verification using Turbopack compiler.

---

## 🗄️ Supabase Database & Row Level Security (RLS)

Barriaide comes out of the box with a complete PostgreSQL schema and Row Level Security (RLS) migration in `supabase/migrations/0001_initial_schema.sql`.

### To connect your live Supabase project:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Enter your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Run the SQL query in `supabase/migrations/0001_initial_schema.sql` inside your Supabase SQL Editor. This initializes:
   - `profiles` (Pseudonymous user identities)
   - `categories` (All 12 bilingual categories)
   - `threads`, `replies`, and `reactions` (`heart`, `support`, `insightful`)
   - `nsvs` (Non-Scale Victories showcase)
   - `moderation_reports` (RBAC queue)

---

## 🌍 Cloudflare Pages & Vercel Deployment

Barriaide is optimized for **Next.js App Router edge/serverless rendering**.

### Deploy to Vercel (Recommended):
1. Import your GitHub repository into Vercel.
2. Add your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Click **Deploy**.

### Deploy to Cloudflare Pages:
1. Install `@cloudflare/next-on-pages`.
2. Set build command to `npx @cloudflare/next-on-pages`.
3. Set output directory to `.vercel/output/static`.

---

## 📋 The 11 Barriaide Community Rules (`/guidelines`)
1. **Dignity, Empathy & Mutual Respect** — No body shaming or personal attacks.
2. **No Individualized Medical Advice** — We provide peer support, not clinical care.
3. **Never Advise Altering Medication Doses** — Consult your prescribing physician.
4. **Respect For All Treatment Paths** — GLP-1, surgery, and lifestyle are equally valid.
5. **No Starvation or Disorder Behaviors** — Food is nourishment; zero toxic diet culture.
6. **Pseudonymous Privacy Protection** — Never solicit personal medical identifiers.
7. **No Commercial Solicitation or MLMs** — Instant permanent ban for weight-loss supplement sales.
8. **Use Content Warnings For Sensitive Topics** — Prefix titles when discussing deep trauma.
9. **Zero Tolerance for Hate Speech & Fatphobia** — Instant removal and banning.
10. **Scientific Responsibility & Factual Honesty** — Distinguish opinion from established evidence.
11. **Proactive Moderation & Peer Reporting** — Flag safety violations immediately.

---

## 📞 Medical Emergency Notice
If you are experiencing a medical emergency, severe abdominal pain, persistent vomiting, or suicidal thoughts, **DO NOT** use the forum. Call **911** or your local health emergency number (`811` in Canada) immediately.
