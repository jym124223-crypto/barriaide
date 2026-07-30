-- ==============================================================================
-- BARRIAIDE OFFICIAL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) MIGRATION
-- Aligned with Quebec Law 25 & Canadian PIPEDA Privacy Standards
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Pseudonymous User Identities)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin', 'clinical_liaison')),
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'fr')),
  journey_category TEXT,
  bio TEXT,
  avatar_url TEXT,
  is_verified_lived_experience BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CATEGORIES TABLE (Bilingual Forum Categories)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  desc_en TEXT NOT NULL,
  desc_fr TEXT NOT NULL,
  icon TEXT NOT NULL,
  color_theme TEXT NOT NULL,
  thread_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. THREADS TABLE (Discussions & Peer Q&As)
CREATE TABLE IF NOT EXISTS public.threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  has_clinical_banner BOOLEAN DEFAULT FALSE,
  clinical_banner_text TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REPLIES TABLE (Peer Encouragement & Responses)
CREATE TABLE IF NOT EXISTS public.replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES public.threads(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_official_liaison_note BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. REACTIONS TABLE (Heart, Support, Insightful)
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES public.replies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('heart', 'support', 'insightful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT reaction_target CHECK (thread_id IS NOT NULL OR reply_id IS NOT NULL)
);

-- 6. NON-SCALE VICTORIES (NSVs) TABLE
CREATE TABLE IF NOT EXISTS public.nsvs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. MODERATION REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.moderation_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES public.replies(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'removed', 'locked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nsvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read public profiles (display name, bio, journey category), users can update their own
CREATE POLICY "Public profiles read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Categories: Read access for everyone
CREATE POLICY "Categories read access" ON public.categories FOR SELECT USING (true);

-- Threads: Read access for everyone, insert access for authenticated members
CREATE POLICY "Threads read access" ON public.threads FOR SELECT USING (true);
CREATE POLICY "Authenticated members can create threads" ON public.threads FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authors or moderators can update threads" ON public.threads FOR UPDATE USING (
  auth.uid() = (SELECT user_id FROM public.profiles WHERE id = author_id)
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) IN ('moderator', 'admin')
);

-- Replies: Read access for everyone, insert access for authenticated members on unlocked threads
CREATE POLICY "Replies read access" ON public.replies FOR SELECT USING (true);
CREATE POLICY "Authenticated members can reply" ON public.replies FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND
  EXISTS (SELECT 1 FROM public.threads WHERE id = thread_id AND is_locked = FALSE)
);

-- Moderation Reports: Only moderators and admins can view queue
CREATE POLICY "Moderators can view reports queue" ON public.moderation_reports FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE user_id = auth.uid()) IN ('moderator', 'admin')
);
CREATE POLICY "Members can submit reports" ON public.moderation_reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ==============================================================================
-- INITIAL SEED DATA FOR CATEGORIES
-- ==============================================================================
INSERT INTO public.categories (id, title_en, title_fr, desc_en, desc_fr, icon, color_theme, thread_count)
VALUES
('glp1-meds', 'GLP-1 & GIP/GLP-1 Medications', 'Médicaments GLP-1 et GIP/GLP-1', 'Discuss titration, mild side effects, protein pacing, and long-term medication experiences.', 'Discussion sur le dosage, les effets secondaires légers et le parcours avec médicaments.', 'Pill', 'teal', 142),
('bariatric-surgery', 'Bariatric Surgery Journey', 'Chirurgie bariatrique', 'Pre-op preparation, surgical milestones, hydration strategies, and post-op adaptation.', 'Préparation pré-opératoire, étapes chirurgicales, hydratation et adaptation post-opératoire.', 'Scissors', 'blue', 198),
('nutrition-protein', 'Nutrition & Protein Pacing', 'Nutrition et apport protéique', 'Practical recipes, meal prep without diet obsession, and sustainable protein habits.', 'Recettes pratiques, préparation de repas sans obsession et habitudes protéiques durables.', 'Apple', 'amber', 86),
('physical-activity', 'Gentle Movement & Activity', 'Mouvement doux et activité', 'Joint-friendly exercises, strength building, walking groups, and joyful movement.', 'Exercices doux pour les articulations, renforcement et marche.', 'Activity', 'rose', 64),
('mental-wellbeing', 'Mental Well-Being & Support', 'Bien-être mental et soutien', 'Navigating stress, anxiety, sleep quality, and emotional resilience on your journey.', 'Gestion du stress, de l''anxiété, du sommeil et de la résilience émotionnelle.', 'Heart', 'indigo', 112),
('emotional-eating', 'Emotional Eating & Food Relationship', 'Alimentation émotionnelle', 'Overcoming food triggers, mindful eating, self-compassion, and ending guilt cycles.', 'Surmonter les déclencheurs, manger en pleine conscience et briser la culpabilité.', 'Coffee', 'purple', 94),
('body-image', 'Body Image & Identity Transition', 'Image corporelle et identité', 'Adapting to physical changes, loose skin discussions, and self-worth beyond the scale.', 'S''adapter aux changements physiques et cultiver l''estime de soi.', 'Smile', 'pink', 78),
('behaviour-change', 'Sustainable Behaviour Change', 'Changements de comportement', 'Habit building, overcoming all-or-nothing thinking, and structuring daily routines.', 'Création d''habitudes et structuration des routines quotidiennes.', 'Compass', 'emerald', 81),
('weight-maintenance', 'Long-Term Weight Maintenance', 'Maintien du poids à long terme', 'Navigating plateaus, weight stability, and living well years after initial loss.', 'Gérer les plateaux, la stabilité et la vie après la perte initiale.', 'Scale', 'cyan', 105),
('life-after-loss', 'Life After Major Weight Loss', 'La vie après une perte majeure', 'Social dynamics, wardrobe updates, relationships, and newfound physical freedom.', 'Dynamiques sociales, garde-robe, relations et nouvelle liberté physique.', 'Sun', 'orange', 67),
('nsv-celebrations', 'Non-Scale Victories (NSVs)', 'Victoires non liées à la balance', 'Celebrate energy gains, stair climbing without joint pain, clothing wins, and blood work.', 'Célébrez le regain d''énergie, les victoires vestimentaires et le bien-être au quotidien.', 'Award', 'yellow', 215),
('clinical-qna', 'Clinical Advisory & Science Q&A', 'Questions scientifiques et cliniques', 'Evidence-informed Q&A reviewed by our Clinical Advisory Liaison and experts.', 'Questions-réponses basées sur les preuves et vérifiées par notre équipe consultative.', 'BookOpen', 'sky', 53)
ON CONFLICT (id) DO NOTHING;
