export interface BlogPost {
  id: string;
  slug: string;
  enTitle: string;
  frTitle: string;
  enExcerpt: string;
  frExcerpt: string;
  enContent: string;
  frContent: string;
  category: "glp1" | "bariatric" | "mindset" | "founder";
  readingTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  tags: string[];
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "glp1-nausea-protein-pacing",
    enTitle: "Titration & Nausea: My 5 Golden Rules for Surviving Wegovy 1.7mg while Meeting Protein Goals",
    frTitle: "Dosage et Nausées : Mes 5 règles d'or pour bien vivre Wegovy 1.7mg et atteindre son objectif protéines",
    enExcerpt: "Stepping up to a higher dose of GLP-1 therapy often brings intense waves of nausea right when your body needs protein most. Here is how I structure my day to hit 90g of protein without pouch distress.",
    frExcerpt: "Passer à une dose supérieure de thérapie GLP-1 entraîne souvent des vagues de nausées juste au moment où votre corps a le plus besoin de protéines. Voici comment j'organise mes journées pour atteindre 90g de protéines sans inconfort.",
    enContent: `When my doctor titrated my prescription up to Wegovy 1.7mg, the first three days after injection day were a true test of patience. Food noise was gone, but so was my appetite—and whenever I tried to sit down for a normal meal, my stomach pushed back immediately.

As a post-op bariatric patient on GLP-1 therapy, **hitting daily protein targets (for me, 80g–90g)** is non-negotiable to preserve lean muscle mass and metabolic rate. Here are the 5 golden rules I discovered through lived trial and error:

### 1. The "Cold & Clear" First 48 Hours
Hot, aromatic foods trigger GI sensitivity after titration. I switch immediately to ice-cold clear whey isolates and chilled bone broths. Cold liquids pass through much easier and don't trigger olfactory nausea cues.

### 2. The 30-Minute Hydration Wall
Never drink water *during* your protein intake or right before. Taking sips of water with food expands inside a restricted stomach and slows gastric emptying further, causing prolonged fullness and discomfort. Set a timer: 30 minutes before, and 30 minutes after!

### 3. Protein Pacing in 15g Micro-Doses
Instead of trying to eat 30g of chicken breast at once, break your day into six mini-windows. A Greek yogurt cup at 10 AM (15g), half a protein shake at 1 PM (15g), and soft scrambled egg whites at 4 PM (15g). Slow and steady wins the race.

### 4. Electrolytes & Early Morning Ginger
Waking up dehydrated exacerbates nausea 10x. Keep a glass of room-temperature electrolyte water with fresh ginger drops by your nightstand and sip slowly before getting out of bed.

### 5. Be Kind to Your Body on Injection Day
If you only hit 60g of protein on the day after your injection, do not beat yourself up. Listen to your body, rest, stay hydrated, and resume pacing when the peak wave passes. We are building a lifelong sustainable habit, not running a sprint!`,
    frContent: `Lorsque mon médecin a augmenté mon dosage à Wegovy 1.7mg, les trois premiers jours suivant l'injection ont été un véritable test de patience. Le bruit mental lié à la nourriture avait disparu, mais mon appétit aussi — et chaque fois que j'essayais d'avaler un repas normal, mon estomac réagissait immédiatement.

En tant que patient bariatrique post-opératoire sous thérapie GLP-1, **atteindre mes objectifs quotidiens en protéines (pour moi, entre 80g et 90g)** est non négociable pour préserver ma masse musculaire et mon métabolisme. Voici les 5 règles d'or que j'ai découvertes au fil de mon expérience :

### 1. La règle "Froid & Limpide" des premières 48 heures
Les plats chauds et très parfumés déclenchent des nausées après une augmentation de dose. Je passe immédiatement aux isolats de lactosérum (whey claire) bien glacés et aux bouillons réfrigérés. Les liquides froids passent beaucoup plus facilement sans stimuler l'odorat.

### 2. Le mur d'hydratation des 30 minutes
Ne buvez jamais d'eau *pendant* vos prises de protéines ou juste avant. Boire en mangeant remplit un estomac restreint et ralentit encore plus la vidange gastrique, ce qui provoque une lourdeur prolongée. Utilisez un minuteur : 30 minutes avant, et 30 minutes après !

### 3. Le fractionnement en micro-doses de 15g
Au lieu d'essayer d'ingérer 30g de poulet d'un coup, divisez votre journée en six mini-fenêtres. Un yogourt grec à 10h (15g), la moitié d'un shake protéiné à 13h (15g) et des blancs d'œufs brouillés tendres à 16h (15g). La régularité prime sur le volume.

### 4. Électrolytes et Gingembre au réveil
Se réveiller déshydraté multiplie les nausées par 10. Gardez un verre d'eau aux électrolytes à température ambiante avec des gouttes de gingembre frais sur votre table de nuit et buvez à petites gorgées avant de vous lever.

### 5. Soyez bienveillant le jour de l'injection
Si vous n'atteignez que 60g de protéines le lendemain de votre injection, ne culpabilisez pas. Écoutez votre corps, reposez-vous, restez hydraté et reprenez votre rythme lorsque la vague passe. Nous construisons une habitude pour la vie !`,
    category: "glp1",
    readingTime: "4 min read",
    publishedAt: "2026-07-16",
    author: {
      name: "Founder & Post-Op Patient",
      role: "GLP-1 & Bariatric Lived Experience",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["GLP-1", "Wegovy", "Protein", "Titration", "Nausea Support"],
  },
  {
    id: "post-2",
    slug: "life-after-bariatric-surgery-emotional-hunger",
    enTitle: "Why Physical Restriction Doesn't Fix Emotional Hunger: A Post-Op Reflection",
    frTitle: "Pourquoi la restriction physique ne résout pas la faim émotionnelle : Réflexion post-opératoire",
    enExcerpt: "Surgery changes the anatomy of your stomach, but it does not change the anatomy of your brain. Why confronting head hunger with self-compassion is the true turning point of long-term maintenance.",
    frExcerpt: "La chirurgie modifie l'anatomie de votre estomac, mais elle ne change pas l'anatomie de votre cerveau. Pourquoi affronter la faim émotionnelle avec auto-compassion est le véritable tournant du maintien à long terme.",
    enContent: `Before having bariatric surgery, I secretly believed that once my stomach size was reduced, all my struggles with comfort eating would magically vanish forever. And for the first year—the honeymoon phase—it almost felt true. Physical restriction was so strong that eating to soothe emotional stress wasn't physically possible without immediate discomfort.

But as the years pass and the stomach naturally adapts, the physical barrier softens. That is when the real journey begins.

### The Return of "Head Hunger"
Head hunger arises not from an empty stomach, but from fatigue, anxiety, boredom, or grief. If we haven't built non-food coping tools during our surgical recovery, we find ourselves pacing around the pantry looking for soft, slider foods that bypass physical restriction.

### Applying Motivational Interviewing (OARS) to Ourselves
Instead of judging or shaming ourselves when emotional hunger strikes, we can use the same **OARS principles** we practice in the Barriaide community:
- **Open questions**: *"What am I actually feeling right now underneath this sudden urge to snack?"*
- **Affirmation**: *"I have come through major surgery and lifestyle changes; this urge doesn't erase my incredible progress."*
- **Reflective listening**: *"My body is tired after a long workday, and my brain is seeking a quick dopamine hit."*

### Rebuilding Our Emotional Tool Box
When I feel head hunger today, I pause for 10 minutes before reaching for food. During those 10 minutes, I take a short walk outdoors, text a peer in the Barriaide forum, or drink a warm herbal tea. 9 times out of 10, the emotional wave settles without needing slider foods. Remember: our surgery and medications are powerful physical tools, but our supportive peer community is what sustains our minds!`,
    frContent: `Avant de subir une chirurgie bariatrique, je croyais secrètement qu'une fois la taille de mon estomac réduite, tous mes combats contre l'alimentation de réconfort disparaîtraient comme par magie. Et pendant la première année — la phase de lune de miel — c'était presque vrai. La restriction physique était si forte qu'il était physiquement impossible de manger pour apaiser le stress sans ressentir un malaise immédiat.

Mais à mesure que les années passent et que l'estomac s'adapte naturellement, la barrière physique s'assouplit. C'est à ce moment précis que le véritable travail commence.

### Le retour de la "Faim Tête" (Faim Émotionnelle)
La faim émotionnelle ne provient pas d'un estomac vide, mais de la fatigue, de l'anxiété, de l'ennui ou du stress. Si nous n'avons pas développé d'outils de gestion émotionnelle non alimentaires pendant notre convalescence, nous nous retrouvons à chercher des aliments mous et faciles à passer ("slider foods") qui contournent la restriction physique.

### Appliquer l'Entretien Motivationnel (OARS) à soi-même
Au lieu de nous juger ou de nous culpabiliser lorsque la faim émotionnelle surgit, nous pouvons utiliser les principes **OARS** que nous pratiquons dans la communauté Barriaide :
- **Questions Ouvertes** : *"Qu'est-ce que je ressens réellement au fond de moi derrière cette envie soudaine de grignoter ?"*
- **Affirmation** : *"J'ai accompli d'immenses progrès depuis ma chirurgie ; cette envie ne remet en rien en cause ma réussite."*
- **Écoute Réflexive** : *"Mon corps est épuisé par une longue journée de travail et mon cerveau cherche une libération rapide de dopamine."*

### Reconstruire notre boîte à outils émotionnelle
Aujourd'hui, lorsque je ressens la faim émotionnelle, je m'accorde une pause de 10 minutes avant de toucher à de la nourriture. Pendant ces 10 minutes, je fais une courte marche dehors, j'écris à un pair sur le forum Barriaide, ou je bois une tisane chaude. 9 fois sur 10, la vague émotionnelle s'apaise d'elle-même. N'oubliez jamais : notre chirurgie et nos médicaments sont de puissants outils physiques, mais c'est notre communauté d'entraide qui nourrit et soutient notre esprit !`,
    category: "bariatric",
    readingTime: "5 min read",
    publishedAt: "2026-07-10",
    author: {
      name: "Founder & Post-Op Patient",
      role: "GLP-1 & Bariatric Lived Experience",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["Bariatric Surgery", "Post-Op Life", "Emotional Eating", "OARS", "Head Hunger"],
  },
];

const STORAGE_KEY = "barriaide_weekly_blog_posts";

export function getStoredArticles(): BlogPost[] {
  if (typeof window === "undefined") return INITIAL_BLOG_POSTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load weekly blog posts from localStorage", e);
  }
  return INITIAL_BLOG_POSTS;
}

export function saveStoredArticles(articles: BlogPost[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error("Failed to save weekly blog posts to localStorage", e);
  }
}

export function addStoredArticle(newArticle: Omit<BlogPost, "id" | "slug" | "publishedAt" | "author">): BlogPost {
  const current = getStoredArticles();
  const id = `post-${Date.now()}`;
  const slug = newArticle.enTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `weekly-post-${Date.now()}`;

  const post: BlogPost = {
    ...newArticle,
    id,
    slug,
    publishedAt: new Date().toISOString().split("T")[0],
    author: {
      name: "Founder & Post-Op Patient",
      role: "GLP-1 & Bariatric Lived Experience",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
  };

  const updated = [post, ...current];
  saveStoredArticles(updated);
  return post;
}
