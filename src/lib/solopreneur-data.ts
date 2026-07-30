// ==========================================
// BARRIAIDE DASHBOARD - DONNÉES ET FEUILLE DE ROUTE 365 JOURS
// ==========================================

export interface TaskDay {
  day: string;
  title: string;
  tasks: string[];
}

export interface TaskWeek {
  weekNum: number;
  title: string;
  focus: string;
  days: TaskDay[];
}

export interface RoadmapQuarter {
  id: string;
  title: string;
  badge: string;
  color: string;
  description: string;
  weeks: TaskWeek[];
}

export interface YouTubeTemplate {
  id: string;
  category: string;
  title: string;
  hook: string;
  structure: string[];
}

export const BARRIAIDE_ROADMAP: RoadmapQuarter[] = [
  // ==========================================
  // TRIMESTRE 1 : FONDATIONS & LANCEMENT YOUTUBE (Semaines 1 à 13)
  // ==========================================
  {
    id: "q1",
    title: "Trimestre 1 : Fondations & Lancement YouTube (Mois 1 à 3)",
    badge: "Fondations & Attraction",
    color: "#3b82f6",
    description: "Mise en place du positionnement unique (105 lbs perdues : Bariatrique + Contrave + Mounjaro), création de l'identité visuelle, lancement des 10 premières vidéos YouTube et du premier Aimant à Leads (Lead Magnet).",
    weeks: [
      {
        weekNum: 1,
        title: "Semaine 1 : Stratégie de Marque & Positionnement Unique",
        focus: "Définir votre histoire personnelle comme votre plus grand atout entrepreneurial et configurer vos outils.",
        days: [
          {
            day: "Lundi",
            title: "Écrire le manifeste de votre histoire (Les 105 lbs)",
            tasks: [
              "Rédiger votre parcours chronologique en 1 page : Le déclic, la chirurgie bariatrique, l'ajout du Contrave, l'introduction du Mounjaro (GLP-1), et le résultat (-105 lbs).",
              "Identifier vos 3 plus grands défis surmontés (ex: gestion des nausées, plateau de perte de poids, regard des autres ou santé mentale).",
              "Lister les 10 questions que les gens vous posent le plus souvent en privé ou sur les forums bariatrique/GLP-1."
            ]
          },
          {
            day: "Mardi",
            title: "Création de la Chaîne YouTube & Identité Visuelle",
            tasks: [
              "Créer le compte YouTube officiel 'BarriAide' (ou votre nom brandé).",
              "Créer une bannière YouTube propre et professionnelle sur Canva (Mention claire : 'Perte de poids réaliste : Bariatrique & GLP-1 | -105 lbs').",
              "Rédiger la section 'À propos' de la chaîne en mettant l'accent sur l'empathie, l'expérience vécue et l'entraide sans jugement."
            ]
          },
          {
            day: "Mercredi",
            title: "Configuration de l'Écosystème Courriel & Outils",
            tasks: [
              "Ouvrir un compte gratuit sur un outil d'infolettre (ex: ConvertKit / System.e / MailerLite).",
              "Créer une adresse courriel professionnelle de contact (ex: contact@barriaide.com ou similaire).",
              "Configurer un dossier Google Drive / Cloud pour classer vos futurs scripts et vidéos par semaine."
            ]
          },
          {
            day: "Jeudi",
            title: "Recherche de mots-clés et Planification des 10 premières vidéos",
            tasks: [
              "Utiliser la barre de recherche YouTube pour noter les suggestions automatiques (ex: 'mounjaro nausées', 'sleeve bariatrique alimentation après 1 an', 'contrave avis perte de poids').",
              "Sélectionner les 4 sujets des 4 prochaines semaines (voir les templates de scripts intégrés au tableau de bord).",
              "Valider l'angle 'Solopreneur / Authenticité' : chaque vidéo doit répondre à UN problem précis en 5 minutes."
            ]
          },
          {
            day: "Vendredi",
            title: "Test Technique du Setup Studio (Audio & Lumière)",
            tasks: [
              "Faire un test vidéo de 2 minutes avec votre téléphone ou caméra et un micro cravate / micro USB.",
              "Vérifier que la lumière est flatteuse (face à une fenêtre ou avec un ring light / softbox).",
              "Écouter le son : l'audio représente 70% de la qualité perçue sur YouTube ! Ajuster si nécessaire."
            ]
          }
        ]
      },
      {
        weekNum: 2,
        title: "Semaine 2 : Tournage et Publication de la Vidéo #1",
        focus: "Lancer la machine avec une première vidéo fondatrice impactante et en extraire vos premiers Shorts.",
        days: [
          {
            day: "Lundi",
            title: "Écriture du Script Vidéo #1 (5 minutes)",
            tasks: [
              "Sujet recommandé : 'Mon parcours de A à Z : Comment j'ai perdu 105 lbs avec la chirurgie bariatrique, le Contrave et le Mounjaro'.",
              "Utiliser le Générateur de Scripts du tableau de bord pour structurer l'accroche (les 15 premières secondes cruciales).",
              "Préparer 3 points clés à transmettre pour inspirer et rassurer votre audience."
            ]
          },
          {
            day: "Mardi",
            title: "Tournage de la Vidéo #1 + 3 Shorts verticaux",
            tasks: [
              "Enregistrer la vidéo principale de 5 à 7 minutes en parlant face caméra comme si vous parliez à un ami proche.",
              "Enregistrer 3 extraits courts de 45 secondes en format vertical (Shorts/TikTok/Reels) résumant les moments clés de la vidéo.",
              "Transférer les fichiers sur votre ordinateur pour le montage."
            ]
          },
          {
            day: "Mercredi",
            title: "Montage Simple & Création de la Miniature (Thumbnail)",
            tasks: [
              "Faire un montage dynamique simple (ex: avec CapCut Desktop ou ScreenFlow/Premiere) en coupant les silences et les hésitations.",
              "Créer une miniature lumineuse et contrastée sur Canva avec une photo de vous souriant/authentique et un texte court (ex: '-105 LBS : MON SECRET').",
              "Ajouter des sous-titres automatiques pour plus de lisibilité et d'engagement."
            ]
          },
          {
            day: "Jeudi",
            title: "Publication et Optimisation SEO de la Vidéo #1",
            tasks: [
              "Mettre en ligne la vidéo sur YouTube avec un titre accrocheur contenant les mots-clés (Chirurgie Bariatrique, Mounjaro, Perte de poids).",
              "Rédiger une description complète de 200 mots résumant la vidéo avec des chapitres temporels (0:00 Intro, etc.).",
              "Épingler le premier commentaire sous votre vidéo pour poser une question engageante aux spectateurs : 'Et vous, quelle est votre modalité actuelle de perte de poids ?'"
            ]
          },
          {
            day: "Vendredi",
            title: "Diffusion Multicanale (Shorts / Reels / TikTok)",
            tasks: [
              "Publier le 1er Short sur YouTube Shorts, Instagram Reels et TikTok avec des hashtags ciblés (#Mounjaro #Bariatrique #PerteDePoids).",
              "Répondre personnellement et chaleureusement à CHAQUE commentaire reçu dans les premières 48 heures.",
              "Bilan de fin de semaine : noter ce qui a été facile et ce qui peut être amélioré dans votre processus."
            ]
          }
        ]
      },
      {
        weekNum: 3,
        title: "Semaine 3 : Création de l'Aimant à Leads (Lead Magnet Gratuit)",
        focus: "Créer l'outil gratuit qui va convertir vos spectateurs YouTube en inscrits sur votre liste de courriels dès le début.",
        days: [
          {
            day: "Lundi",
            title: "Écriture de la Vidéo #2 et Concept du Lead Magnet",
            tasks: [
              "Sujet Vidéo #2 : 'Mounjaro / GLP-1 : Les 3 effets secondaires que personne ne vous dit (et comment je les gère)'.",
              "Choisir le concept du lead magnet gratuit : Un PDF ultra-pratique (ex: 'La Liste de Courses Parfaite Post-Bariatrique & GLP-1 : 25 aliments anti-nausée et riches en protéines')."
            ]
          },
          {
            day: "Mardi",
            title: "Tournage Vidéo #2 + Création du PDF sur Canva",
            tasks: [
              "Tourner la Vidéo #2 (5 minutes) + 3 Shorts associés.",
              "Concevoir le PDF gratuit sur Canva (2 ou 3 pages maximum, design soigné aux couleurs de BarriAide).",
              "Exporter le guide en PDF et l'héberger sur votre outil de courriel ou Google Drive public."
            ]
          },
          {
            day: "Mercredi",
            title: "Création de la Page de Capture (Landing Page)",
            tasks: [
              "Créer une page de capture simple (1 titre accrocheur, 3 puces bénéfices, 1 champ pour le prénom et le courriel, 1 bouton d'appel à l'action).",
              "Configurer l'envoi automatique du PDF par courriel dès l'inscription.",
              "Tester le formulaire vous-même pour vérifier que le courriel arrive en moins de 2 minutes."
            ]
          },
          {
            day: "Jeudi",
            title: "Publication de la Vidéo #2 avec Appel à l'Action Courriel",
            tasks: [
              "Publier la Vidéo #2 sur YouTube.",
              "Dans les 30 dernières secondes de la vidéo, mentionner clairement le guide gratuit : 'Pour vous aider au quotidien, j'ai créé une liste de courses 100% gratuite avec mes 25 aliments favoris, le lien est en description !'",
              "Mettre le lien de votre page de capture en tout premier dans la description et dans le commentaire épinglé."
            ]
          },
          {
            day: "Vendredi",
            title: "Suivi des inscriptions et Publication des Shorts de la semaine",
            tasks: [
              "Publier les Shorts/Reels découpés de la Vidéo #2 (en mentionnant le guide gratuit en commentaire).",
              "Vérifier combien de personnes se sont inscrites pour télécharger votre guide gratuit (Objectif Semaine 3 : les 10 premiers inscrits !).",
              "Interagir avec la communauté et répondre aux questions en vidéo courte si pertinent."
            ]
          }
        ]
      },
      {
        weekNum: 4,
        title: "Semaine 4 : Consolidation de la Routine & Vidéo #3",
        focus: "Ancrer votre routine solopreneur de 2 heures par jour pour que le rythme devienne naturel et agréable.",
        days: [
          {
            day: "Lundi",
            title: "Script Vidéo #3 : Focus Nutrition / Protéines",
            tasks: [
              "Sujet Vidéo #3 : 'Comment atteindre 80g de protéines avec un petit estomac (Bariatrique & GLP-1) sans se forcer'.",
              "Rédiger le script en intégrant vos astuces concrètes vécues (ex: bouillon protéiné, skyr, collagène dans le café, fractionnement des repas)."
            ]
          },
          {
            day: "Mardi",
            title: "Tournage & Production Vidéo #3",
            tasks: [
              "Tourner la vidéo #3 (5 minutes) dans un cadre lumineux.",
              "Enregistrer 3 à 4 Shorts montrant concrètement vos collations ou portions réalistes.",
              "Sauvegarder et organiser tous vos rushes propres dans votre dossier projet."
            ]
          },
          {
            day: "Mercredi",
            title: "Première Infolettre de Bienvenue (Newsletter)",
            tasks: [
              "Rédiger un courriel chaleureux à envoyer à vos premiers inscrits (ex: 'Merci d'être là + Mon astuce personnelle n°1 pour bien s'hydrater sans douleur gastrique').",
              "Programmer l'envoi pour le jeudi matin.",
              "Montage de la vidéo #3 et préparation de la miniature."
            ]
          },
          {
            day: "Jeudi",
            title: "Publication Vidéo #3 & Envoi de l'Infolettre #1",
            tasks: [
              "Publier la vidéo #3 sur YouTube à votre heure de prédilection (ex: 11h00 ou 17h00).",
              "Envoyer l'infolettre à vos abonnés avec le lien direct vers votre nouvelle vidéo YouTube.",
              "Analyser les premiers retours et commentaires pour trouver des idées de futurs sujets."
            ]
          },
          {
            day: "Vendredi",
            title: "Bilan du Premier Mois & Analyse des Métriques",
            tasks: [
              "Ouvrir le Tableau de Bord BarriAide et mettre à jour vos statistiques (Abonnés YouTube, Inscrits courriel, Vidéos publiées).",
              "Regarder quelle vidéo des 3 premières a eu le meilleur taux de clic (CTR) sur la miniature et la meilleure rétention.",
              "Célébrer votre régularité : vous avez accompli en 1 mois ce que 95% des créateurs repoussent pendant des années !"
            ]
          }
        ]
      },
      {
        weekNum: 5,
        title: "Semaines 5 à 8 : Rythme de Croissance & Vidéos 4 à 7",
        focus: "Maintenir la cadence hebdomadaire 1 vidéo/semaine + 3 Shorts et doubler la croissance de la liste courriel.",
        days: [
          {
            day: "Lundi",
            title: "Routine Écriture Hebdomadaire (Vidéos 4, 5, 6, 7)",
            tasks: [
              "Semaine 5 - Vidéo #4 : 'Le Contrave : Mon expérience sincère (ce qui a marché vs ce qui a été difficile)'.",
              "Semaine 6 - Vidéo #5 : 'Comment gérer le plateau de perte de poids sans paniquer ni abandonner'.",
              "Semaine 7 - Vidéo #6 : 'Les 5 questions à poser à votre médecin avant de commencer le Mounjaro ou l'Ozempic'.",
              "Semaine 8 - Vidéo #7 : 'Ma routine matinale et mes suppléments indispensables après ma perte de 105 lbs'."
            ]
          },
          {
            day: "Mardi",
            title: "Tournage Hebdomadaire optimisé en Bloc",
            tasks: [
              "Tourner la vidéo de la semaine en 30 minutes top chrono grâce à la préparation du script.",
              "Enregistrer immédiatement 3 Shorts/Reels verticaux pour alimenter TikTok et Instagram toute la semaine.",
              "Tester de nouveaux angles de caméras ou B-rolls (plans d'illustration de votre quotidien)."
            ]
          },
          {
            day: "Mercredi",
            title: "Interaction Communautaire & Infolettre Hebdomadaire",
            tasks: [
              "Écrire et programmer l'infolettre hebdomadaire à votre liste de courriel (toujours 80% de valeur/conseil et 20% d'appel à regarder la vidéo).",
              "Répondre aux questions dans les groupes Facebook ou forums spécialisés en apportant de la valeur (sans spammer, en partageant votre expérience authentique)."
            ]
          },
          {
            day: "Jeudi",
            title: "Publication & Promotion croisée",
            tasks: [
              "Mise en ligne de la vidéo hebdomadaire sur YouTube avec miniature à fort contraste.",
              "Partage de la vidéo dans votre story Instagram avec un sondage interactif.",
              "Répondre aux 10 premiers commentaires dès les 60 premières minutes de publication pour booster l'algorithme YouTube."
            ]
          },
          {
            day: "Vendredi",
            title: "Veille d'audience & Collecte de Témoignages",
            tasks: [
              "Noter les retours touchants de vos abonnés (ex: 'Merci, ta vidéo m'a rassuré avant mon opération'). Ces captures d'écran seront de l'or pour votre futur site et votre application !",
              "Faire une sauvegarde complète de votre travail de la semaine dans le Cloud."
            ]
          }
        ]
      },
      {
        weekNum: 9,
        title: "Semaines 9 à 13 : Consolidation Q1 & Préparation du Site Web Complet",
        focus: "Clôturer le Trimestre 1 avec 10 vidéos au compteur, 500+ abonnés et préparer la structure du site officiel BarriAide.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Production des Vidéos 8 à 10 + FAQ Live / Q&A",
            tasks: [
              "Vidéo #8 : 'Que manger au restaurant quand on est sous GLP-1 ou après une chirurgie bariatrique ?'",
              "Vidéo #9 : 'Peau détendue, perte de cheveux, fatigue : La vérité sur l'après -100 lbs et mes solutions.'",
              "Vidéo #10 : 'Foire Aux Questions Spéciale : Je réponds à VOS questions sur le Contrave, Mounjaro et la chirurgie !'"
            ]
          },
          {
            day: "Vendredi (Semaine 13)",
            title: "Bilan Trimestriel Q1 & Audit Solopreneur",
            tasks: [
              "Vérifier vos objectifs atteints : 10 vidéos publiées, 30+ Shorts diffusés, Liste de courriel active avec plusieurs dizaines/centaines d'inscrits.",
              "Éliminer le sentiment de surmenage : avez-vous respecté les 2 heures par jour sans déborder ? Si oui, vous avez trouvé votre rythme de croisière durable !",
              "Préparer les spécifications pour la création du Site Web officiel et les premières briques de l'Application (Objectif Q2)."
            ]
          }
        ]
      }
    ]
  },
  // ==========================================
  // TRIMESTRE 2 : AUDIENCE, SITE WEB & PREMIER REVENU (Semaines 14 à 26)
  // ==========================================
  {
    id: "q2",
    title: "Trimestre 2 : Site Web Officiel & Premier Produit Digital (Mois 4 à 6)",
    badge: "Monétisation Initiale",
    color: "#10b981",
    description: "Lancement du site web officiel BarriAide, intensification de la capture courriel (objectif 1 000+ inscrits), mise en place des premiers partenariats d'affiliation éthiques, et vente de votre premier guide digital (Ebook / Programme de départ).",
    weeks: [
      {
        weekNum: 14,
        title: "Semaines 14 à 17 : Lancement du Site Web Officiel 'BarriAide'",
        focus: "Déployer votre site officiel complet avec section blog, à propos authentique, et boutique en ligne pour vos futurs produits.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Architecture & Création du Site Web",
            tasks: [
              "Créer la page d'accueil avec une proposition de valeur limpide : 'L'accompagnement par l'expérience : Réussir votre parcours Bariatrique & GLP-1 sans isolement'.",
              "Intégrer une section 'Calculateur gratuit d'hydratation et d'objectifs protéiques' directement sur le site pour doubler les inscriptions.",
              "Écrire la page 'Mon Histoire (-105 lbs)' avec photos avant/après inspirantes et authentiques.",
              "Continuer la publication hebdomadaire de votre vidéo YouTube du mardi (Vidéos 11 à 14)."
            ]
          },
          {
            day: "Vendredi",
            title: "Mise en Ligne du Site & Optimisation Mobile",
            tasks: [
              "Vérifier que le site est fluide, rapide et parfaitement lisible sur téléphone mobile (80% de votre trafic).",
              "Ajouter le lien de votre site officiel en biographie sur tous vos réseaux (YouTube, Instagram, TikTok)."
            ]
          }
        ]
      },
      {
        weekNum: 18,
        title: "Semaines 18 à 21 : Création & Lancement du Premier Produit Payant",
        focus: "Générer vos premiers revenus 100% automatisés avec un produit digital à haute valeur ajoutée (ex: 37$ à 67$).",
        days: [
          {
            day: "Lundi au Mercredi",
            title: "Conception du Guide / Programme Numérique",
            tasks: [
              "Créer 'Le Protocole BarriAide : 30 jours de menus, d'habitudes et de stratégies pour maximiser votre GLP-1 ou chirurgie sans carences' (Ebook PDF + Fiches récapitulatives + Vidéos explicatives privées).",
              "Configurer la page de paiement sécurisée (Stripe / PayPal via votre plateforme).",
              "Mettre en place la livraison instantanée par courriel dès le paiement validé."
            ]
          },
          {
            day: "Jeudi & Vendredi",
            title: "Lancement de la Campagne auprès de votre Liste Courriel",
            tasks: [
              "Envoyer une séquence de 3 courriels sur 5 jours à votre liste pour annoncer la sortie du guide avec un rabais de lancement (ex: 27$ au lieu de 47$ pour les 48 premières heures).",
              "Faire une vidéo YouTube dédiée sur le thème : 'Mes 5 secrets pour éviter de reprendre du poids après 1 an' et présenter votre nouveau guide complet à la fin.",
              "Encaisser vos premières ventes solopreneur !"
            ]
          }
        ]
      },
      {
        weekNum: 22,
        title: "Semaines 22 à 26 : Partenariats d'Affiliation Éthiques & Consolidation",
        focus: "Ajouter un deuxième flux de revenus passifs via les recommandations de produits que vous utilisez réellement.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Sélection et Intégration des Liens d'Affiliation",
            tasks: [
              "S'inscrire aux programmes d'affiliation de vos marques favorites (Électrolytes sans sucre, Protéines en poudre douces pour l'estomac, Vitamines bariatriques certifiées, Gourdes motivantes, etc.).",
              "Créer une page 'Mes Outils & Suppléments Recommandés' sur votre site web avec vos liens transparents.",
              "Intégrer subtilement ces recommandations dans vos descriptions YouTube et infolettres quand c'est pertinent."
            ]
          },
          {
            day: "Vendredi (Semaine 26)",
            title: "Bilan de Mi-Année (Fin Q2)",
            tasks: [
              "Faire le bilan des 6 premiers mois : 26 vidéos YouTube publiées, site web en ligne, liste courriel florissante et premiers revenus récurrents générés.",
              "Planifier les fonctionnalités exactes de votre future application mobile/web interactive pour Q3."
            ]
          }
        ]
      }
    ]
  },
  // ==========================================
  // TRIMESTRE 3 : DÉVELOPPEMENT & BETA TEST DE L'APPLICATION (Semaines 27 à 39)
  // ==========================================
  {
    id: "q3",
    title: "Trimestre 3 : Lancement Beta de l'Application BarriAide (Mois 7 à 9)",
    badge: "SaaS & Technologie",
    color: "#8b5cf6",
    description: "Création et test de la version Beta privée de votre application interactive personnalisée. L'application permettra à vos utilisateurs de suivre leurs injections GLP-1/Contrave, leurs protéines quotidiennes, leur hydratation, leurs symptômes, et de recevoir un accompagnement structuré.",
    weeks: [
      {
        weekNum: 27,
        title: "Semaines 27 à 31 : Architecture & Codage de l'Application BarriAide",
        focus: "Développer le cœur de l'application (SaaS solopreneur) avec une interface ultra-simple, rassurante et engageante.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Développement des Fonctionnalités Clés (V1)",
            tasks: [
              "Module 1 : Journal des Injections et Prises (Rappel du jour d'injection de Mounjaro/Ozempic ou des prises de Contrave avec suivi des dosages et rotations des zones d'injection).",
              "Module 2 : Tracker d'Hydratation & Protéines intelligent (Objectifs visuels progressifs adaptés à la capacité gastrique post-bariatrique ou à la satiété rapide sous GLP-1).",
              "Module 3 : Journal des Symptômes & Conseils instantanés (Si l'utilisateur note 'Nausée' ou 'Constipation', l'app affiche automatiquement 3 astuces pratiques validées).",
              "Module 4 : Courbe de Poids et Célébration des Victoires non-visibles sur la balance (ex: 'Je rentre dans un vieux pantalon', 'Plus d'énergie au réveil')."
            ]
          },
          {
            day: "Vendredi",
            title: "Série YouTube 'Building in Public'",
            tasks: [
              "Partager en vidéo l'avancement de la création de l'application : 'Je crée l'application dont j'aurais rêvé quand j'ai commencé mon parcours de -105 lbs !'",
              "Ouvrir une liste d'attente prioritaire pour recruter vos 50 ou 100 premiers testeurs Beta exclusifs."
            ]
          }
        ]
      },
      {
        weekNum: 32,
        title: "Semaines 32 à 36 : Test Beta Privé avec 50 Membres VIP",
        focus: "Faire tester l'application par vos abonnés les plus motivés, recueillir leurs commentaires et affiner l'expérience.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Onboarding & Écoute active des Testeurs Beta",
            tasks: [
              "Donner accès à l'application aux 50 testeurs Beta en échange de leurs retours sincères.",
              "Organiser une session Q&A de groupe en direct par semaine (sur Zoom ou YouTube Live non répertorié) pour répondre à leurs questions.",
              "Ajuster les boutons, les couleurs et la simplicité de l'application selon leurs suggestions techniques."
            ]
          },
          {
            day: "Vendredi",
            title: "Collecte d'Études de Cas & Témoignages Chocs",
            tasks: [
              "Demander à vos testeurs de filmer de courtes vidéos de 30 secondes ou d'écrire un mot sur la façon dont l'application les aide au quotidien.",
              "Intégrer ces témoignages puissants sur la page de vente officielle de l'application."
            ]
          }
        ]
      },
      {
        weekNum: 37,
        title: "Semaines 37 à 39 : Finalisation technique et Préparation du Grand Lancement",
        focus: "Préparer la stratégie de monétisation par abonnement de l'application pour le quatrième trimestre.",
        days: [
          {
            day: "Lundi au Vendredi",
            title: "Configuration des Forfaits & Pré-lancement",
            tasks: [
              "Définir le tarif d'abonnement solopreneur accessible et attractif : ex: 12$/mois ou 99$/an (avec 14 jours d'essai gratuit pour lever tous les freins).",
              "Préparer la grande vidéo de révélation officielle sur YouTube et la séquence de 5 courriels de lancement pour votre liste de courriels (qui compte maintenant plus de 1 000 à 2 000 abonnés !)."
            ]
          }
        ]
      }
    ]
  },
  // ==========================================
  // TRIMESTRE 4 : MONÉTISATION RÉCURRENTE (SaaS) & SCALE (Semaines 40 à 52)
  // ==========================================
  {
    id: "q4",
    title: "Trimestre 4 : Lancement Public, Revenu Récurrent & Scale (Mois 10 à 12)",
    badge: "Revenus Récurrents & Indépendance",
    color: "#f59e0b",
    description: "Ouverture publique de l'application BarriAide à toute votre communauté. Création d'un flux de revenu récurrent mensuel stable (MRR - Monthly Recurring Revenue), optimisation des conversions et automatisation complète pour que votre entreprise tourne à 1 seule personne.",
    weeks: [
      {
        weekNum: 40,
        title: "Semaines 40 à 43 : Le Grand Lancement Public de l'Application BarriAide",
        focus: "Transformer votre audience fidèle en abonnés actifs à votre application et communauté.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Événement de Lancement Spécial sur YouTube & Infolettre",
            tasks: [
              "Publier la vidéo YouTube événement : 'Comment j'ai transformé ma vie et comment vous pouvez le faire avec l'application BarriAide (Démonstration en direct)'.",
              "Envoyer la séquence de courriels d'ouverture officielle à toute votre liste avec le code promo de lancement fondateur.",
              "Accueillir chaleureusement chaque nouveau membre dans l'espace communautaire de l'application."
            ]
          },
          {
            day: "Vendredi",
            title: "Suivi des abonnements et Support client optimisé",
            tasks: [
              "Objectif de lancement Q4 : Atteindre 250 à 500 abonnés payants à votre application dès les premières semaines.",
              "Mettre en place des réponses automatiques intelligentes pour le support client afin de ne pas perdre de temps sur les questions techniques de base."
            ]
          }
        ]
      },
      {
        weekNum: 44,
        title: "Semaines 44 à 48 : Automatisation & Programme VIP / Coaching de Groupe",
        focus: "Offrir une option haut de gamme (High-Ticket) pour ceux qui veulent un accompagnement plus rapproché avec vous.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Lancement du Cercle VIP 'BarriAide Mastermind'",
            tasks: [
              "Créer une offre optionnelle VIP à 97$/mois incluant l'accès à l'application PLUS deux sessions de Q&A en direct par mois avec vous dans un petit groupe motivé.",
              "Limiter cette offre à 30 ou 50 personnes maximum pour préserver votre temps de solopreneur."
            ]
          },
          {
            day: "Vendredi",
            title: "Création des Séquences de Courriels Perpétuelles (Evergreen)",
            tasks: [
              "Automatiser votre tunnel de vente : dès qu'un nouveau visiteur s'inscrit pour télécharger votre guide gratuit, il reçoit automatiquement sur 14 jours des courriels lui présentant votre histoire, vos meilleures vidéos et l'application BarriAide."
            ]
          }
        ]
      },
      {
        weekNum: 49,
        title: "Semaines 49 à 52 : Bilan Annuel, Fêtes de Fin d'Année & Planification Année 2",
        focus: "Célébrer votre première année exceptionnelle de solopreneur et préparer sereinement la mise à l'échelle.",
        days: [
          {
            day: "Lundi au Jeudi",
            title: "Vidéos Rétrospectives & Célébration de la Communauté",
            tasks: [
              "Publier une vidéo bilan inspirante : '1 an après le lancement de BarriAide : Ce que notre communauté a accompli ensemble (+ des milliers de livres perdues en groupe !)'.",
              "Offrir des cartes cadeaux ou des reconnaissances spéciales aux membres les plus actifs de l'application."
            ]
          },
          {
            day: "Vendredi (Semaine 52)",
            title: "Bilan Financier & Stratégique Année 1",
            tasks: [
              "Faire le compte de vos réalisations : 52 vidéos YouTube publiées, une application propriétaire active, une liste de milliers d'abonnés et une entreprise rentable à 1 seule personne sans patron.",
              "Planifier vos vacances bien méritées et le calendrier de contenu automatique de l'Année 2 !"
            ]
          }
        ]
      }
    ]
  }
];

export const YOUTUBE_TEMPLATES: YouTubeTemplate[] = [
  {
    id: "yt1",
    category: "Psychology & Unfiltered Reality",
    title: "105 lbs Down: What No One Tells You About 'Food Grief' After Surgery & GLP-1s",
    hook: "\"When you get bariatric surgery or start Mounjaro and Contrave, doctors tell you about the pounds melting off the scale. But nobody warns you about the hardest psychological shock: Food Grief. What happens when your #1 emotional comfort disappears overnight? Here is how I survived that mental storm while losing 105 pounds without losing my mind.\"",
    structure: [
      "0:00 - 0:45 : The Hook & Raw Truth: Food wasn't just calories; it was our emotional sanctuary and stress relief.",
      "0:45 - 2:00 : The Psychological Void after Bariatric Surgery & under GLP-1s (When 'Food Noise' goes silent, but daily stress remains).",
      "2:00 - 3:30 : My 3 Mindset Anchors to avoid shifting the addiction to something else (shopping, working, isolating).",
      "3:30 - 4:30 : How to redefine social life, family dinners, and true joy when everything doesn't revolve around the plate anymore.",
      "4:30 - 5:00 : Empathic Call to Action: Ask me your burning questions or share your food grief story in the comments below, I reply to everyone!"
    ]
  },
  {
    id: "yt2",
    category: "Overcoming Fear & Anxiety",
    title: "Terrified of Complications? How I Overcame Pre-Op & Injection Anxiety",
    hook: "\"Do you have that knot in your stomach right now? Are you spending your nights scrolling forums about bariatric complications, Mounjaro side effects, or wondering if you're making the biggest mistake of your life? Take a deep breath. I was exactly where you are before I lost my 105 pounds. Let's have an honest patient-to-patient talk to turn that paralyzing panic into peace of mind.\"",
    structure: [
      "0:00 - 0:45 : Brotherly Hook: 'Fear is 100% normal and valid when you are about to transform your entire life.'",
      "0:45 - 2:00 : Debunking the worst-case doom scenarios our brain invents at 3:00 AM.",
      "2:00 - 3:15 : How I mentally prepared myself and my support system for surgery day and the first GLP-1 weeks.",
      "3:15 - 4:15 : The Fundamental Reminder: Why staying in severe obesity was actually far more dangerous than taking action.",
      "4:15 - 5:00 : What is YOUR biggest fear right now? Write it down in the comments below and let's tackle it together as a community."
    ]
  },
  {
    id: "yt3",
    category: "Social Judgment & Stigma",
    title: "« You Cheated With Surgery and Shots! » : Handling Judgment and Jealousy",
    hook: "\"'Oh, you took the easy way out!', 'It's just the magic shot doing all the work...'. If you are terrified of what your coworkers, relatives, or spouse will say when you start your bariatric or Mounjaro journey, this video is for you. Here is exactly how I handle these condescending remarks with a smile after losing 105 pounds, and why you don't owe an explanation to anyone.\"",
    structure: [
      "0:00 - 0:45 : The Myth of the 'Easy Way Out': Why people who never suffered from metabolic disease can never understand.",
      "0:45 - 2:00 : Should you tell your boss and coworkers, or keep your journey 100% private? My honest post-op advice.",
      "2:00 - 3:30 : The 3 Shield Phrases to shut down uninvited debates during family holiday dinners without starting a fight.",
      "3:30 - 4:30 : Relationship Shifts: Why some people around you feel threatened when you lose 105 pounds (and how to navigate it).",
      "4:30 - 5:00 : Be proud of your courage! Join our supportive hub to connect with patients who truly get what you are going through."
    ]
  },
  {
    id: "yt4",
    category: "Authentic Post-Op Q&A",
    title: "No-Taboo FAQ #1: Answering YOUR Most Intimate Post-Op & GLP-1 Questions",
    hook: "\"Loose skin, temporary hair loss, relationship changes, mood swings, and bathroom struggles... Today, we are stripping away all the medical jargon and fake perfection. I am answering 5 of your most common private questions from the real, unfiltered perspective of a patient who lived through every single stage to lose 105 pounds!\"",
    structure: [
      "0:00 - 0:40 : Warm Introduction: 'There is no such thing as a weird or embarrassing question here on BarriAide.'",
      "0:40 - 1:45 : Question 1 (The Fear of Loose Skin) -> My reality, practical skin routines, and the psychology of self-acceptance.",
      "1:45 - 2:45 : Question 2 (Emotional Rollercoasters as stored hormones release from fat cells) -> How to explain it to your partner.",
      "2:45 - 4:00 : Question 3 (The Obsessive Terror of Regaining Weight at Year 2) -> Building the mindset of permanent maintenance.",
      "4:00 - 5:00 : Do you have questions for our No-Taboo FAQ #2? Drop them in the comments directly below this video!"
    ]
  },
  {
    id: "yt5",
    category: "Mindset & Patience",
    title: "When the Scale Won't Budge: How to Stop Mental Breakdowns During a Weight Stall",
    hook: "\"It has been 3 full weeks and the scale hasn't moved a single ounce. Inside your head, that destructive inner critic wakes up: 'See? It stopped working. Your metabolism is broken. You are going to gain it all back...'. STOP! Do not let your brain sabotage your 105-pound journey. Here is the actual biology of what happens during a plateau and how to keep bulletproof mental fortitude.\"",
    structure: [
      "0:00 - 0:45 : Acknowledging the deep psychological distress of a weight stall when you are doing everything right.",
      "0:45 - 2:00 : The Biology of the Stall: Why your body desperately needs this pause to heal tissues and recalibrate organs.",
      "2:00 - 3:15 : Decentering the Scale: 5 Invisible Victories you must track right now (sleep depth, breathing, joints, mirror reflection).",
      "3:15 - 4:15 : How to avoid panic and the dangerous reflex of over-restricting or starving your stomach.",
      "4:15 - 5:00 : Are you stuck in a stall right now? Type 'HOLDING STRONG' in the comments and let's encourage each other!"
    ]
  },
  {
    id: "yt6",
    category: "Identity & Rebirth",
    title: "Who Am I After Losing 105 lbs? Overcoming Post-Op Imposter Syndrome",
    hook: "\"For 20 or 30 years, you defined yourself as 'the heavy person in the room'. When you drop 105 pounds in a matter of months with bariatric surgery, Contrave, or Mounjaro, your reflection changes much faster than your brain can catch up. This is Post-Op Imposter Syndrome. Let's talk about this overwhelming psychological rebirth and how to step into your new identity with confidence.\"",
    structure: [
      "0:00 - 0:45 : Mirror Shock & Photos: Why our brain sometimes takes up to a full year to actually 'see' our new body.",
      "0:45 - 2:00 : Learning how to receive a compliment without feeling guilty, awkward, or deflecting.",
      "2:00 - 3:30 : Stepping into the light: Re-learning how to take up space in the world after hiding in baggy clothes for decades.",
      "3:30 - 4:30 : Why mental health self-care is just as vital as your weekly injection or daily protein intake.",
      "4:30 - 5:00 : Join our BarriAide brotherhood/sisterhood to share your daily mindset wins and questions!"
    ]
  }
];
