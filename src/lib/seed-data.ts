export interface SampleDiscussion {
  id: string;
  title_en: string;
  title_fr: string;
  category_key: string;
  category_en: string;
  category_fr: string;
  reply_count: number;
  last_active_en: string;
  last_active_fr: string;
  avatars: string[];
}

export interface SampleVideo {
  id: string;
  youtube_id: string;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  duration: string;
  thumbnail: string;
}

export const SAMPLE_DISCUSSIONS: SampleDiscussion[] = [
  {
    id: "disc-1",
    title_en: "What helped you manage nausea during your first month on a GLP-1?",
    title_fr: "Qu'est-ce qui vous a aidé à gérer la nausée durant votre premier mois sous GLP-1 ?",
    category_key: "glp1",
    category_en: "GLP-1 & Weight-Loss Medications",
    category_fr: "GLP-1 et médicaments pour la perte de poids",
    reply_count: 34,
    last_active_en: "12m ago",
    last_active_fr: "il y a 12m",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "disc-2",
    title_en: "How did you prepare emotionally for bariatric surgery?",
    title_fr: "Comment vous êtes-vous préparé émotionnellement à la chirurgie bariatrique ?",
    category_key: "prepSurgery",
    category_en: "Preparing for Bariatric Surgery",
    category_fr: "Se préparer à la chirurgie bariatrique",
    reply_count: 28,
    last_active_en: "45m ago",
    last_active_fr: "il y a 45m",
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "disc-3",
    title_en: "What are your favourite high-protein breakfasts that are easy on the stomach?",
    title_fr: "Quels sont vos petits-déjeuners riches en protéines favoris et doux pour l'estomac ?",
    category_key: "nutrition",
    category_en: "Nutrition and Protein",
    category_fr: "Nutrition et protéines",
    reply_count: 52,
    last_active_en: "2h ago",
    last_active_fr: "il y a 2h",
    avatars: [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "disc-4",
    title_en: "How do you handle comments from coworkers about your changing body?",
    title_fr: "Comment gérez-vous les commentaires de vos collègues sur votre corps qui change ?",
    category_key: "mentalHealth",
    category_en: "Mental Well-Being & Body Image",
    category_fr: "Santé mentale et image corporelle",
    reply_count: 41,
    last_active_en: "3h ago",
    last_active_fr: "il y a 3h",
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
    ],
  },
];

export const SAMPLE_VIDEOS: SampleVideo[] = [
  {
    id: "vid-1",
    youtube_id: "dQw4w9WgXcQ", // Placeholder clean YouTube ID
    title_en: "Understanding GLP-1 Medications: Myths, Mechanisms, and Realistic Expectations",
    title_fr: "Comprendre les médicaments GLP-1 : mythes, mécanismes et attentes réalistes",
    description_en: "An accessible breakdown of how incretin hormones work, why obesity is a chronic metabolic condition, and how to track non-scale progress.",
    description_fr: "Une explication claire du fonctionnement des hormones incrétines, de l'obésité comme maladie métabolique chronique et des progrès globaux.",
    duration: "14:20",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "vid-2",
    youtube_id: "L_LUpnjgPso",
    title_en: "Post-Bariatric Nutrition: Reaching Daily Protein Goals Without Overwhelming Your Stomach",
    title_fr: "Nutrition post-bariatrique : atteindre ses objectifs en protéines sans saturer son estomac",
    description_en: "Specialist dietitian tips for spacing protein throughout the day, choosing high-tolerance foods, and maintaining long-term muscle mass.",
    description_fr: "Conseils de diététistes spécialisés pour répartir les protéines, choisir des aliments tolérés et préserver sa masse musculaire à long terme.",
    duration: "18:45",
    thumbnail: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "vid-3",
    youtube_id: "e-ORhEE9eVg",
    title_en: "Rebuilding Your Relationship with Movement and Gentle Physical Activity",
    title_fr: "Reconstruire sa relation avec l'activité physique et le mouvement en douceur",
    description_en: "Moving away from exercise as punishment toward joyful, sustainable physical movement that boosts energy and emotional well-being.",
    description_fr: "Passer de l'exercice perçu comme une obligation à un mouvement corporel valorisant qui améliore l'énergie et le bien-être mental.",
    duration: "12:10",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
  },
];

export interface SampleResource {
  id: string;
  title_en: string;
  title_fr: string;
  desc_en: string;
  desc_fr: string;
  tag_en: string;
  tag_fr: string;
  read_time: string;
  pdf_url: string;
}

export const SAMPLE_RESOURCES: SampleResource[] = [
  {
    id: "res-1",
    title_en: "Questions to Ask at Your First Bariatric Surgery Consultation",
    title_fr: "Questions à poser lors de votre première consultation en chirurgie bariatrique",
    desc_en: "A comprehensive checklist covering surgical options, post-operative follow-up schedules, vitamin supplementation regimens, and realistic recovery expectations.",
    desc_fr: "Une liste complète de questions couvrant les options chirurgicales, les suivis post-opératoires, les suppléments vitaminiques et les attentes réalistes.",
    tag_en: "Surgery Preparation",
    tag_fr: "Préparation à la chirurgie",
    read_time: "5 min checklist",
    pdf_url: "#",
  },
  {
    id: "res-2",
    title_en: "GLP-1 Medication & Daily Protein Prioritization Chart",
    title_fr: "Tableau de priorisation des protéines avec médication GLP-1",
    desc_en: "Evidence-informed guidance on hitting 100g+ protein daily when appetite is reduced. Includes easily digestible protein sources, hydration timing, and anti-nausea tips.",
    desc_fr: "Guide sur l'atteinte des 100g+ de protéines au quotidien lorsque l'appétit est réduit. Inclut des sources digestes et des astuces anti-nausées.",
    tag_en: "Nutrition & Meds",
    tag_fr: "Nutrition et médicaments",
    read_time: "8 min guide",
    pdf_url: "#",
  },
  {
    id: "res-3",
    title_en: "Navigating Emotional Eating & Food Trigger Logbook",
    title_fr: "Journal d'accompagnement pour l'alimentation émotionnelle et les déclencheurs",
    desc_en: "A printable self-reflection workbook designed to help identify emotional triggers vs. physiological hunger without judgment, shame, or restriction.",
    desc_fr: "Un cahier de réflexion imprimable pour identifier la faim émotionnelle face à la faim physiologique sans aucun jugement ni restriction.",
    tag_en: "Mindset & Behaviour",
    tag_fr: "État d'esprit et comportement",
    read_time: "15 min workbook",
    pdf_url: "#",
  },
  {
    id: "res-4",
    title_en: "Joint-Friendly Gentle Movement Starter Routine (Zero Gym Equipment)",
    title_fr: "Routine de mouvement doux pour les articulations (sans équipement)",
    desc_en: "Illustrated home movements focusing on mobility, joint flexibility, balance, and core stability for individuals navigating elevated BMI or joint sensitivity.",
    desc_fr: "Exercices illustrés à domicile axés sur la mobilité, la souplesse articulaire et l'équilibre pour les personnes ayant une sensibilité articulaire.",
    tag_en: "Physical Activity",
    tag_fr: "Activité physique",
    read_time: "10 min routine",
    pdf_url: "#",
  },
  {
    id: "res-5",
    title_en: "Overcoming Weight Regain Anxiety Years After Transformation",
    title_fr: "Surmonter l'anxiété de reprise de poids des années après la transformation",
    desc_en: "Clinical perspectives on metabolic adaptation, weight plateau stabilization, and cultivating psychological resilience without falling into yo-yo dieting traps.",
    desc_fr: "Perspectives cliniques sur l'adaptation métabolique, la stabilisation des plateaux et la culture de la résilience psychologique.",
    tag_en: "Long-Term Maintenance",
    tag_fr: "Maintien à long terme",
    read_time: "12 min guide",
    pdf_url: "#",
  },
  {
    id: "res-6",
    title_en: "Talking to Family & Employers About Your Weight Loss Treatment",
    title_fr: "Parler de votre traitement de perte de poids à votre famille et employeur",
    desc_en: "Practical boundary-setting scripts for navigating unsolicited comments, holiday gatherings, and workplace wellness programs with confidence and privacy.",
    desc_fr: "Scénarios pratiques pour fixer vos limites face aux commentaires non sollicités, lors des fêtes et au travail en toute confidentialité.",
    tag_en: "Social Dynamics",
    tag_fr: "Dynamiques sociales",
    read_time: "6 min toolkit",
    pdf_url: "#",
  },
];

