import type { TranslationDictionary } from "./en";

export const fr: TranslationDictionary = {
  header: {
    nav: {
      home: "Accueil",
      startHere: "Commencer ici",
      community: "Communauté",
      resources: "Ressources",
      videos: "Vidéos",
      blog: "Journal Hebdo",
      about: "À propos",
      contact: "Nous joindre",
    },
    signIn: "Se connecter",
    joinCommunity: "Rejoindre la communauté",
  },
  hero: {
    headline: "Vous n’avez pas à traverser votre parcours de perte de poids seul.",
    supportingText:
      "Barriaide est une communauté de soutien pour les personnes qui utilisent des médicaments pour la perte de poids, envisagent ou ont subi une chirurgie bariatrique, améliorent leur alimentation et reconstruisent leur relation avec la nourriture, leur corps et leur santé.",
    primaryButton: "Rejoindre la communauté",
    secondaryButton: "Explorer les ressources",
  },
  section1: {
    badge: "Soutien inclusif pour tous les parcours",
    title: "Chaque parcours mérite du soutien",
    subtitle:
      "Que vous optiez pour une intervention médicale, la chirurgie, la thérapie nutritionnelle ou des changements d'habitudes de vie, vous trouverez ici un accompagnement bienveillant et sans jugement.",
    cards: [
      {
        id: "meds",
        title: "Médicaments pour la perte de poids",
        description:
          "Soutien entre pairs et partage d'expériences fondés sur les données probantes pour les personnes utilisant les traitements de type GLP-1, GIP/GLP-1 et autres.",
      },
      {
        id: "surgery",
        title: "Chirurgie bariatrique",
        description:
          "Préparation préopératoire, rétablissement, lignes directrices nutritionnelles et soutien à vie après l'intervention par des pairs qui l'ont vécu.",
      },
      {
        id: "nutrition",
        title: "Nutrition et activité physique",
        description:
          "Idées pratiques et accessibles pour prioriser les protéines, rester bien nourri et trouver une activité physique valorisante à chaque format corporel.",
      },
      {
        id: "mindset",
        title: "Santé mentale et émotions",
        description:
          "Gérer l'alimentation émotionnelle, restaurer l'image corporelle et aborder les dimensions psychologiques des transformations physiques profondes.",
      },
      {
        id: "maintenance",
        title: "Maintien à long terme",
        description:
          "Stratégies, habitudes et solidarité communautaire pour maintenir vos acquis de santé et surmonter les plateaux au fil des années.",
      },
      {
        id: "peer",
        title: "Soutien entre pairs",
        description:
          "Un espace sécuritaire et respectueux où vous êtes écouté, encouragé et épaulé par des personnes traversant les mêmes étapes.",
      },
    ],
  },
  section2: {
    badge: "Avantages de la communauté",
    title: "Ce que les membres peuvent faire",
    subtitle: "Barriaide repose sur une participation active, bienveillante et sur le partage de connaissances fiables.",
    cards: [
      {
        title: "Poser des questions",
        description: "Obtenez des conseils honnêtes et pratiques de pairs qui comprennent exactement ce que vous vivez au quotidien.",
      },
      {
        title: "Partager des expériences",
        description: "Partagez vos victoires personnelles, vos défis et vos apprentissages en toute sécurité et sans crainte de jugement.",
      },
      {
        title: "Apprendre de ressources fiables",
        description: "Accédez à des guides validés, des articles scientifiques et des listes de questions à poser à votre équipe soignante.",
      },
      {
        title: "Participer à des événements",
        description: "Assistez à des ateliers éducatifs en direct, des séances de questions-réponses avec des professionnels et des rencontres entre pairs.",
      },
      {
        title: "Célébrer les victoires au-delà de la balance",
        description: "Célébrez une meilleure énergie, un sommeil réparateur, une clarté mentale accrue et une nouvelle confiance en soi.",
      },
      {
        title: "Se connecter avec des parcours similaires",
        description: "Trouvez des membres partageant les mêmes traitements, échéanciers ou objectifs personnels pour un soutien mutuel quotidien.",
      },
    ],
  },
  section3: {
    badge: "Vidéothèque éducative",
    title: "Dernières vidéos",
    subtitle: "Visionnez des entrevues d'experts, des témoignages et des formations scientifiques directement sur notre chaîne YouTube.",
    watchButton: "Regarder sur YouTube",
    durationLabel: "min",
    placeholderTitle: "Comment prioriser les protéines tout en gérant les effets secondaires des médicaments",
    placeholderDesc: "Conseils pratiques de nutritionnistes cliniques et de membres de la communauté pour atteindre facilement vos objectifs en protéines.",
  },
  section4: {
    badge: "Discussions en direct",
    title: "Aperçu de la communauté",
    subtitle: "Découvrez les conversations de soutien entre pairs les plus actives et utiles du jour.",
    repliesLabel: "réponses",
    lastActiveLabel: "Dernière activité",
    enterCommunityButton: "Entrer dans la communauté",
  },
  section5: {
    badge: "Notre expérience vécue",
    title: "Présentation du fondateur",
    placeholderText:
      "Je tiens à insister sur le fait que je ne suis NI diététiste, NI chirurgien, NI psychologue. J'ai créé Barriaide parce que je suis moi-même un patient opéré en bariatrie et sous GLP-1. J'ai conçu ces outils pour mon propre parcours et j'ai réalisé que nous avions tous besoin d'un espace sûr, pratique et sans jugement.",
    role: "Fondateur, Patient Opéré & Pair",
  },
  section6: {
    badge: "Restez informé",
    headline: "Du soutien pratique, directement dans votre boîte courriel.",
    text: "Recevez les nouvelles vidéos, les ressources éducatives, les nouvelles de la communauté et des conseils utiles.",
    form: {
      firstNamePlaceholder: "Prénom",
      emailPlaceholder: "Adresse courriel",
      languageLabel: "Langue préférée du bulletin :",
      consentLabel: "J'accepte de recevoir des courriels d'information et de soutien de Barriaide. Vous pouvez vous désabonner en tout temps.",
      button: "M’abonner",
      submitting: "Abonnement en cours...",
      successTitle: "Bienvenue dans le bulletin de notre communauté !",
      successMessage: "Merci de votre inscription. Surveillez votre boîte courriel pour recevoir du soutien pratique et des ressources éducatives.",
      errorMissingFields: "Veuillez inscrire votre prénom, un courriel valide et cocher la case de consentement.",
    },
  },
  disclaimer: {
    short:
      "Évitez d’inclure des renseignements médicaux permettant de vous identifier. Les expériences partagées dans la communauté ne remplacent pas les conseils d’un professionnel de la santé qualifié.",
    footer:
      "Barriaide offre de l’information et du soutien entre pairs. Barriaide ne fournit pas de diagnostic médical, de traitement, de psychothérapie ni de services d’urgence. Consultez un professionnel de la santé qualifié pour vos besoins individuels.",
  },
  footer: {
    tagline: "Du soutien pour chaque parcours de perte de poids. Médicaments, chirurgie bariatrique, nutrition, santé mentale et communauté.",
    rights: "Tous droits réservés.",
    links: {
      privacy: "Politique de confidentialité",
      terms: "Conditions d’utilisation",
      rules: "Règles de la communauté",
      disclaimer: "Avis de non-responsabilité médicale",
    },
    demoNotice: "Prototype MVP Barriaide — Plateforme d'accompagnement et de soutien entre pairs.",
  },
  categories: {
    welcome: "Bienvenue et présentations",
    glp1: "GLP-1 et médicaments pour la perte de poids",
    prepSurgery: "Se préparer à la chirurgie bariatrique",
    postSurgery: "La vie après la chirurgie bariatrique",
    nutrition: "Nutrition et protéines",
    movement: "Activité physique et entraînement",
    emotionalEating: "Alimentation émotionnelle et relation avec la nourriture",
    mentalHealth: "Santé mentale et image corporelle",
    maintenance: "Maintien à long terme",
    nsv: "Victoires au-delà de la balance",
    askTeam: "Questions à poser à votre équipe soignante",
    general: "Discussion générale",
  },
  onboarding: {
    question: "Qu'est-ce qui décrit le mieux votre parcours ?",
    options: [
      "J'envisage un traitement par médicament GLP-1",
      "J'utilise actuellement un médicament GLP-1 ou GIP/GLP-1",
      "J'envisage une chirurgie bariatrique",
      "J'ai subi une chirurgie bariatrique",
      "Je me concentre sur les changements d'habitudes de vie",
      "J'accompagne ou soutiens un proche dans ce parcours",
      "Je suis toujours à explorer mes options",
    ],
  },
  blog: {
    badge: "Journal Hebdo du Fondateur & Récits Pairs",
    title: "Le Journal Hebdomadaire Barriaide",
    subtitle: "Chaque semaine, notre fondateur et notre communauté partagent leurs réflexions pratiques, leurs guides de survie face aux dosages, des astuces de nutrition, et la réalité de la vie après une perte de poids majeure.",
    writeArticleBtn: "Rédiger l'article de la semaine",
    readMore: "Lire l'article complet",
    minRead: "min de lecture",
    authorLabel: "Par",
    founderRole: "Patient Bariatrique Post-Op & Expérience GLP-1",
    allTopics: "Tous les articles",
    featuredBadge: "Article à la une de la semaine",
    shareTitle: "Partager cette réflexion hebdomadaire :",
    disclaimerBox: "Avis d'expérience vécue : Cet article hebdomadaire est rédigé sur la base de l'expérience vécue par un patient bariatrique post-opératoire sous traitement GLP-1 dans un esprit d'entraide communautaire. Il ne s'agit en aucun cas d'un avis médical ni d'un substitut à une consultation avec votre médecin, nutritionniste ou chirurgien.",
    modal: {
      title: "Rédiger et Publier un Article Hebdomadaire",
      enTitle: "Titre de l'article (Anglais / English)",
      frTitle: "Titre de l'article (Français)",
      enExcerpt: "Court résumé (Anglais)",
      frExcerpt: "Court résumé (Français)",
      category: "Catégorie / Thématique",
      enContent: "Contenu complet de l'article (Anglais Markdown/Texte)",
      frContent: "Contenu complet de l'article (Français Markdown/Texte)",
      readingTime: "Temps de lecture estimé (ex : '5 min de lecture')",
      savePublish: "Publier l'article hebdomadaire",
      cancel: "Annuler",
    },
    categories: {
      glp1: "Science & Conseils GLP-1",
      bariatric: "Vie Bariatrique & Nutrition",
      mindset: "Victoires non-balance & Mentalité",
      founder: "Réflexions Hebdo du Fondateur",
    },
  },
};
