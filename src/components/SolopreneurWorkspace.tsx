"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { BARRIAIDE_ROADMAP, YOUTUBE_TEMPLATES, RoadmapQuarter, TaskWeek, TaskDay, YouTubeTemplate } from "@/lib/solopreneur-data";
import {
  Calendar,
  CheckCircle,
  FileText,
  Table,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Download,
  Trash2,
  Plus,
  Sparkles,
  Copy,
  BookOpen,
  ArrowRight,
  PlusCircle,
  FileSpreadsheet,
  Terminal,
  Activity,
  FilePlus,
  BookOpenText
} from "lucide-react";

// ==========================================
// TYPES & CONTEXT
// ==========================================
interface SavedState {
  checkedTasks: Record<string, boolean>;
  kpis: { youtubeSubs: number; emailList: number; betaUsers: number; mrr: number };
  theme: string;
}

interface ScriptDoc {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface SpreadsheetData {
  id: string;
  title: string;
  headers: string[];
  rows: string[][];
}

interface CalendarEvent {
  date: string;
  title: string;
  type: "video" | "email";
}

export default function SolopreneurWorkspace() {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  // Tab State
  const [activeTab, setActiveTab] = useState<string>("roadmap");

  // Local Storage Data Keys
  const storageKey = "barriaide_solopreneur_data_v3";
  const docsKey = "barriaide_docs_v1";
  const sheetsKey = "barriaide_sheets_v1";
  const calendarKey = "barriaide_calendar_v1";

  // ------------------------------------------
  // STATE DEFINITIONS
  // ------------------------------------------
  const [appState, setAppState] = useState<SavedState>({
    checkedTasks: {},
    kpis: { youtubeSubs: 105, emailList: 42, betaUsers: 0, mrr: 0 },
    theme: "dark"
  });

  const [docs, setDocs] = useState<ScriptDoc[]>([]);
  const [sheets, setSheets] = useState<Record<string, SpreadsheetData>>({});
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // Roadmap States
  const [roadmapFilter, setRoadmapFilter] = useState<string>("all");

  // Calendar States
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [selectedDateStr, setSelectedDateStr] = useState<string>("");
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventType, setNewEventType] = useState<"video" | "email">("video");

  // AI Editor States
  const [activeDocId, setActiveDocId] = useState<string>("");
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Spreadsheet States
  const [activeSheetId, setActiveSheetId] = useState<string>("budget");

  // YouTube Templates States
  const [activeScriptTemplateId, setActiveScriptTemplateId] = useState<string>("yt1");

  // Timer States
  const [timerDuration, setTimerDuration] = useState<number>(25);
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ------------------------------------------
  // INITS & LOADERS
  // ------------------------------------------
  useEffect(() => {
    // 1. Load Main State
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        setAppState(JSON.parse(savedState));
      } catch (e) {
        console.error("Error parsing app state", e);
      }
    }

    // 2. Load Docs
    const savedDocs = localStorage.getItem(docsKey);
    if (savedDocs) {
      try {
        const parsedDocs = JSON.parse(savedDocs);
        setDocs(parsedDocs);
        if (parsedDocs.length > 0) setActiveDocId(parsedDocs[0].id);
      } catch (e) {
        console.error("Error parsing docs", e);
      }
    } else {
      const defaultDocs: ScriptDoc[] = [
        {
          id: "doc1",
          title: isFr ? "Script Vidéo #1 : Mon histoire (-105 lbs)" : "Video Script #1: My Story (-105 lbs)",
          date: new Date().toLocaleDateString("fr-CA"),
          content: `TITRE DE LA VIDÉO : Mon parcours de A à Z : Comment j'ai perdu 105 lbs avec Bariatrique + Contrave + Mounjaro\n\nOBJECTIF : Inspirer, rassurer et capturer les premiers inscrits à l'infolettre.\n\n=== ACCROCHE (0:00 à 0:45) ===\n« Si on m'avait dit que je perdrais 105 livres sans reprendre le poids et sans vivre dans la privation extrême, je ne l'aurais pas cru. Aujourd'hui, je vous partage la vérité exacte sur ce que la chirurgie bariatrique, le Contrave et le Mounjaro ont changé dans mon corps et dans ma tête. Et surtout, la plus grosse erreur à ne pas faire si vous commencez. »\n\n=== PARTIE 1 : LA CHIRURGIE BARIATRIQUE (0:45 à 2:00) ===\n- Expliquer le déclic initial.\n- Pourquoi l'estomac réduit aide pour les portions, mais pourquoi le soutien métabolique et hormonal restait nécessaire pour le long terme.\n\n=== PARTIE 2 : L'AJOUT DU CONTRAVE ET DU MOUNJARO (2:00 à 3:30) ===\n- L'impact sur le "Food Noise" (bruit mental alimentaire).\n- Comment la satiété cellulaire a changé la donne.\n\n=== PARTIE 3 : MES 3 RÈGLES D'OR AU QUOTIDIEN (3:30 à 4:30) ===\n1. Priorité absolue aux protéines (80g minimum).\n2. Hydratation en dehors des repas pour ne pas diluer la digestion.\n3. Tolérance et bienveillance envers son rythme de perte.\n\n=== APPEL À L'ACTION (4:30 à 5:00) ===\n« Pour vous aider, j'ai créé un guide 100% gratuit avec mes 25 aliments favoris anti-nausées et riches en protéines. Le lien est en description ! »`
        },
        {
          id: "doc2",
          title: isFr ? "Brouillon Infolettre #1 : L'hydratation gastrique" : "Newsletter Draft #1: Gastric Hydration",
          date: new Date().toLocaleDateString("fr-CA"),
          content: `OBJET DU COURRIEL : Votre astuce hydratation (spécial petit estomac & GLP-1) 💧\n\nBonjour [Prénom],\n\nQuand on perd du poids rapidement avec un GLP-1 comme le Mounjaro ou après une chirurgie bariatrique, boire 2 litres d'eau par jour peut vite devenir un cauchemar.\n\nL'estomac est petit, l'eau froide peut provoquer des crampes, et les nausées nous font oublier de boire.\n\nVoici mon astuce n°1 : Le fractionnement tiède avec électrolytes douces...\n\n(Cliquez ici pour voir ma nouvelle vidéo YouTube de 5 minutes sur le sujet !)`
        }
      ];
      setDocs(defaultDocs);
      setActiveDocId("doc1");
      localStorage.setItem(docsKey, JSON.stringify(defaultDocs));
    }

    // 3. Load Spreadsheet Data
    const savedSheets = localStorage.getItem(sheetsKey);
    if (savedSheets) {
      try {
        setSheets(JSON.parse(savedSheets));
      } catch (e) {
        console.error("Error parsing sheets", e);
      }
    } else {
      const defaultSheets: Record<string, SpreadsheetData> = {
        budget: {
          id: "budget",
          title: isFr ? "💰 Suivi Revenus & Dépenses Solopreneur" : "💰 Solopreneur Revenue & Expenses",
          headers: isFr 
            ? ["Mois", "Revenu YouTube ($)", "Ventes Guides ($)", "Abonnés App SaaS ($)", "Affiliation ($)", "Dépenses Outils ($)"]
            : ["Month", "YouTube Revenue ($)", "Guide Sales ($)", "App Subscribers ($)", "Affiliation ($)", "Tool Expenses ($)"],
          rows: [
            ["Mois 1 (Q1)", "0", "0", "0", "0", "29"],
            ["Mois 2 (Q1)", "0", "0", "0", "45", "29"],
            ["Mois 3 (Q1)", "15", "0", "0", "120", "29"],
            ["Mois 4 (Q2)", "65", "470", "0", "280", "49"],
            ["Mois 5 (Q2)", "120", "890", "0", "450", "49"],
            ["Mois 6 (Q2)", "210", "1 250", "0", "680", "49"],
            ["Mois 7 à 9 (Q3)", "450", "1 800", "500", "1 200", "79"],
            ["Mois 10 à 12 (Q4)", "950", "2 400", "4 500", "2 100", "99"]
          ]
        },
        audience: {
          id: "audience",
          title: isFr ? "📈 Tracker Croissance Audience & Courriels" : "📈 Audience & Email List Growth Tracker",
          headers: isFr 
            ? ["Semaine", "Vidéos Publiées", "Abonnés YouTube", "Vues Totales", "Inscrits Courriel", "Taux Conversion (%)"]
            : ["Week", "Videos Published", "YouTube Subscribers", "Total Views", "Email Subscribers", "Conversion Rate (%)"],
          rows: [
            ["Semaine 1", "1", "15", "250", "5", "2.0%"],
            ["Semaine 2", "2", "42", "780", "18", "2.3%"],
            ["Semaine 3", "3", "105", "1 900", "42", "2.2%"],
            ["Semaine 4", "4", "190", "3 400", "85", "2.5%"],
            ["Semaine 8", "8", "520", "12 500", "240", "1.9%"],
            ["Semaine 12", "12", "1 050", "28 000", "520", "1.8%"]
          ]
        },
        journal: {
          id: "journal",
          title: isFr ? "🍏 Journal GLP-1 & Bariatrique" : "🍏 GLP-1 & Bariatric Patient Log",
          headers: isFr 
            ? ["Date / Jour", "Poids (lbs)", "Protéines (g)", "Eau (L)", "Dose Mounjaro/Contrave", "Symptômes / Énergie"]
            : ["Date / Day", "Weight (lbs)", "Protein (g)", "Water (L)", "Mounjaro/Contrave Dose", "Symptoms / Energy Level"],
          rows: [
            ["Lundi (Injection)", "264", "85", "2.2", "2.5mg Mounjaro", "Bonne énergie, légère nausée le soir"],
            ["Mardi", "263.2", "92", "2.5", "Contrave 1 tab", "Satiété rapide, pas de food noise"],
            ["Mercredi", "262.8", "80", "2.0", "Contrave 1 tab", "Énergie stable, transit normal"],
            ["Jeudi", "262.2", "88", "2.4", "Contrave 1 tab", "Forme olympique, bon entraînement"],
            ["Vendredi", "261.5", "95", "2.8", "Contrave 1 tab", "Très bonne hydratation, zéro symptôme"]
          ]
        }
      };
      setSheets(defaultSheets);
      localStorage.setItem(sheetsKey, JSON.stringify(defaultSheets));
    }

    // 4. Load Calendar
    const savedCalendar = localStorage.getItem(calendarKey);
    if (savedCalendar) {
      try {
        setCalendarEvents(JSON.parse(savedCalendar));
      } catch (e) {
        console.error("Error parsing calendar", e);
      }
    } else {
      const defaultEvents: CalendarEvent[] = [
        { date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02`, title: "🎬 Script Vidéo #1", type: "video" },
        { date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-05`, title: "🎥 Tournage Vidéo #1", type: "video" },
        { date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-08`, title: "💌 Infolettre #1", type: "email" }
      ];
      setCalendarEvents(defaultEvents);
      localStorage.setItem(calendarKey, JSON.stringify(defaultEvents));
    }
  }, [isFr]);

  // Handle Timer Cleanup
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // ------------------------------------------
  // PERSISTERS
  // ------------------------------------------
  const saveState = (newState: SavedState) => {
    setAppState(newState);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  };

  const saveDocs = (newDocs: ScriptDoc[]) => {
    setDocs(newDocs);
    localStorage.setItem(docsKey, JSON.stringify(newDocs));
  };

  const saveSheets = (newSheets: Record<string, SpreadsheetData>) => {
    setSheets(newSheets);
    localStorage.setItem(sheetsKey, JSON.stringify(newSheets));
  };

  const saveCalendar = (newEvents: CalendarEvent[]) => {
    setCalendarEvents(newEvents);
    localStorage.setItem(calendarKey, JSON.stringify(newEvents));
  };

  // ------------------------------------------
  // ROADMAP LOGIC
  // ------------------------------------------
  const totalTasks = 365; // Symbolic 365 days target or list length
  const checkedTasksCount = Object.keys(appState.checkedTasks).filter(k => appState.checkedTasks[k]).length;
  const progressPercent = Math.min(100, Math.round((checkedTasksCount / totalTasks) * 100));

  const handleToggleTask = (taskId: string) => {
    const nextChecked = { ...appState.checkedTasks, [taskId]: !appState.checkedTasks[taskId] };
    saveState({ ...appState, checkedTasks: nextChecked });
  };

  // Filter Roadmap Trimestres
  const quartersToRender = BARRIAIDE_ROADMAP.filter(q => roadmapFilter === "all" || q.id === roadmapFilter);

  // ------------------------------------------
  // CALENDAR LOGIC
  // ------------------------------------------
  const monthNamesFr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNames = isFr ? monthNamesFr : monthNamesEn;

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    // 0 is Sunday, 1 is Monday... let's adjust so 0 is Monday
    const day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (dayNum: number) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    setSelectedDateStr(formattedDate);
    setNewEventTitle("");
    setShowEventModal(true);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const nextEvents = [
      ...calendarEvents,
      { date: selectedDateStr, title: newEventTitle.trim(), type: newEventType }
    ];
    saveCalendar(nextEvents);
    setShowEventModal(false);
  };

  const handleDeleteEvent = (indexToDelete: number) => {
    const nextEvents = calendarEvents.filter((_, idx) => idx !== indexToDelete);
    saveCalendar(nextEvents);
  };

  const handleExportIcs = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BarriAide Solopreneur Calendar//EN\n";
    calendarEvents.forEach((ev, idx) => {
      const dt = ev.date.replace(/-/g, "");
      icsContent += `BEGIN:VEVENT\nUID:barriaide_${dt}_${idx}\nDTSTAMP:${dt}T090000Z\nDTSTART:${dt}T090000Z\nDTEND:${dt}T110000Z\nSUMMARY:${ev.title}\nDESCRIPTION:Tâche de production solopreneur BarriAide (-105 lbs)\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "BarriAide_Calendrier_Solopreneur.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ------------------------------------------
  // AI EDITOR LOGIC
  // ------------------------------------------
  const activeDoc = docs.find(d => d.id === activeDocId) || docs[0];

  const handleDocContentChange = (content: string) => {
    if (!activeDoc) return;
    const updatedDocs = docs.map(d => d.id === activeDoc.id ? { ...d, content } : d);
    saveDocs(updatedDocs);
  };

  const handleDocTitleChange = (title: string) => {
    if (!activeDoc) return;
    const updatedDocs = docs.map(d => d.id === activeDoc.id ? { ...d, title } : d);
    saveDocs(updatedDocs);
  };

  const handleNewDoc = () => {
    const newId = `doc_${Date.now()}`;
    const newDoc: ScriptDoc = {
      id: newId,
      title: isFr ? "Nouveau Document" : "New Document",
      date: new Date().toLocaleDateString("fr-CA"),
      content: isFr ? "Commencez à écrire votre script ou infolettre ici..." : "Start writing your script or newsletter here..."
    };
    const nextDocs = [newDoc, ...docs];
    saveDocs(nextDocs);
    setActiveDocId(newId);
  };

  const handleDeleteDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(isFr ? "Supprimer ce document définitivement ?" : "Permanently delete this document?")) return;
    const nextDocs = docs.filter(d => d.id !== id);
    saveDocs(nextDocs);
    if (activeDocId === id && nextDocs.length > 0) {
      setActiveDocId(nextDocs[0].id);
    }
  };

  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const getReadTime = (text: string) => {
    const words = getWordCount(text);
    const totalSecs = Math.round((words / 140) * 60);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m} min ${s} sec`;
  };

  // Copilote IA Transformation Engine
  const runAIAction = (actionType: string, customPromptText = "") => {
    if (!activeDoc) return;
    setIsAiProcessing(true);

    setTimeout(() => {
      const originalContent = activeDoc.content;
      let newContent = originalContent;

      if (actionType === "style") {
        newContent = originalContent
          .replace(/\bje pense que\b/gi, "d'après mon expérience de perte de 105 lbs en tant que patient")
          .replace(/\bil faut\b/gi, "voici comment j'ai surmonté cette peur au quotidien")
          .replace(/\bi think\b/gi, "from my lived experience down 105 lbs")
          .replace(/\bwe need to\b/gi, "here is the mindset shift that saved my journey");

        if (!newContent.includes("STYLE NOTE :")) {
          newContent = isFr 
            ? `[✨ OPTIMISATION DU STYLE IA - EMPATHIE ET RÉALITÉ DE PERTE DE POIDS ACTIVÉES]\n\n` + newContent
            : `[✨ AI STYLE ENHANCEMENT - AUTHENTIC POST-OP EMPATHY & MINDSET ACTIVATED]\n\n` + newContent;
        }
      } 
      else if (actionType === "grammar") {
        newContent = originalContent
          .replace(/  +/g, " ")
          .replace(/\s+,/g, ",")
          .replace(/\s+\./g, ".")
          .replace(/\bi m\b/gi, "I am")
          .replace(/\bdont\b/gi, "don't");
        
        newContent = isFr
          ? `[🧐 ORTHOGRAPHE & SYNTAXE CORRIGÉES PAR L'IA]\n\n` + newContent
          : `[🧐 GRAMMAR & SYNTAX POLISHED SUCCESSFULLY BY AI]\n\n` + newContent;
      } 
      else if (actionType === "hooks") {
        const hookSection = isFr 
          ? `\n=========================================\n🔥 3 ACCROCHES VIRALES GÉNÉRÉES PAR L'IA (FOCALISÉES SUR LA PSYCHOLOGIE & LA PEUR) :\n1. [Empathie & Crainte] « Avez-vous cette boule au ventre avant l'opération ou votre injection ? Êtes-vous terrifié par les complications ? Respirez un grand coup. J'étais exactement dans cet état de panique avant de perdre mes 105 livres. Parlons-en cœur ouvert, de patient à patient... »\n\n2. [Le Deuil Alimentaire] « Personne ne nous prépare au choc psychologique le plus dur de la chirurgie bariatrique ou du GLP-1 : Le Deuil Alimentaire. Comment fait-on quand notre réconfort numéro 1 disparaît du jour au lendemain ? Voici la vérité... »\n\n3. [Le Regard Social] « "Tu as triché avec la chirurgie et les piqûres !" Quand on me balance ça après mes 105 lbs perdues, voici ma réplique exacte d'une seule phrase avec un grand sourire, et pourquoi vous ne devez d'explications à personne. »\n=========================================\n\n`
          : `\n=========================================\n🔥 3 VIRAL HOOKS GENERATED BY AI (POST-OP PSYCHOLOGY & FEAR FOCUS) :\n1. [Empathy & Fear Hook] « Do you have that knot in your stomach before surgery or your Mounjaro injection? Are you terrified of complications or regretting your choice? Take a deep breath. I went through that exact anxiety before losing my 105 pounds. Let's have an honest patient-to-patient talk right now... »\n\n2. [Food Grief Hook] « Nobody warns us about the hardest psychological shock after bariatric surgery or under Contrave: Food Grief. What do you do when your #1 emotional comfort disappears overnight? Here is the truth... »\n\n3. [Social Judgment Hook] « "You took the easy way out with surgery and shots!" When someone says that about my 105-pound weight loss, here is my exact 1-sentence response with a smile, and why you owe zero explanation to anyone. »\n=========================================\n\n`;
        newContent = hookSection + originalContent;
      } 
      else if (actionType === "5min") {
        newContent = isFr
          ? `=== 🎬 STRUCTURE DE SCRIPT YOUTUBE DE 5 MINUTES (EMPATHIE & ACCOMPAGNEMENT) ===\n\n` +
            `⏱️ 0:00 - 0:45 : ACCROCHE ET EMPATHIE (-105 LBS)\n` +
            `« [Valider et calmer la peur ou la culpabilité dans les 10 premières secondes] »\n\n` +
            `⏱️ 0:45 - 2:00 : LA RÉALITÉ PSYCHOLOGIQUE SANS TABOU\n` +
            `[Parler du doute, du deuil alimentaire ou de la panique de reprendre le poids...]\n\n` +
            `⏱️ 2:00 - 3:30 : LES 3 ANCRES DU MINDSET POUR RÉUSSIR\n` +
            `1. Dédramatiser l'aide médicale / Chirurgie :\n` +
            `2. Gérer le vide émotionnel sans compenser avec d'autres addictions :\n` +
            `3. L'action concrète à faire dès aujourd'hui :\n\n` +
            `⏱️ 3:30 - 4:15 : COMPRENDRE QUE VOUS ÊTES LE SEUL MAÎTRE\n` +
            `[Bloquer les jugements extérieurs toxiques et faire confiance à votre métabolisme]\n\n` +
            `⏱️ 4:15 - 5:00 : APPEL À L'ACTION CHALEUREUX & FOIRE AUX QUESTIONS\n` +
            `« Écrivez votre plus grande crainte en commentaire, je réponds à tout le monde sans filtre et nous y répondrons en vidéo ! »\n\n` +
            `--- VOS NOTES D'ORIGINE CI-DESSOUS ---\n` + originalContent
          : `=== 🎬 5-MINUTE YOUTUBE SCRIPT STRUCTURE (PSYCHOLOGY & SUPPORT FOCUS) ===\n\n` +
            `⏱️ 0:00 - 0:45 : BROTHERLY / EMPATHIC HOOK (-105 LBS)\n` +
            `« [De-escalate fear, anxiety, or guilt in the very first 10 seconds] »\n\n` +
            `⏱️ 0:45 - 2:00 : THE RAW PSYCHOLOGICAL REALITY OF THE PATIENT\n` +
            `[Expand on doubt, social judgment, body image shock, or fear of weight regain...]\n\n` +
            `⏱️ 2:00 - 3:30 : THE 3 MINDSET ANCHORS TO OVERCOME THIS STRUGGLE\n` +
            `1. Mindset Shift / De-dramatizing the fear :\n` +
            `2. Managing emotional voids without replacing food with another addiction :\n` +
            `3. My daily lived actionable tip :\n\n` +
            `⏱️ 3:30 - 4:15 : WHAT YOU MUST NEVER LISTEN TO\n` +
            `[Reminder: shut down external toxicity and trust the healing process]\n\n` +
            `⏱️ 4:15 - 5:00 : EMPATHIC CALL TO ACTION & Q&A SUPPORT\n` +
            `« What is your biggest fear or question right now? Drop it in the comments below, I personally reply to everyone and answer taboo topics in our next video! »\n\n` +
            `--- YOUR ORIGINAL NOTES BELOW ---\n` + originalContent;
      } 
      else if (actionType === "shorts") {
        const shortsSection = isFr
          ? `\n\n=========================================\n📱 VOS 3 SHORTS VERTICAUX EXTRAITS PAR L'IA (FORMAT DE 45 SECONDES) :\n\n► SHORTS #1 : Calmer l'angoisse pré-opératoire\nFace caméra: « Si vous paniquez avant la chirurgie bariatrique ou avant de commencer le Mounjaro, sachez que c'est 100% normal. Mais l'obésité sévère est bien plus dangereuse. Voici comment j'ai rassuré mon esprit pour perdre mes 105 livres... Abonnez-vous à @barriaide pour le vrai soutien bariatrique ! »\n\n► SHORTS #2 : Le Deuil Alimentaire\nFace caméra: « Quand votre estomac dit stop à votre pizza préférée après l'opération, c'est un deuil réel. Voici l'astuce n'1 pour traverser ce vide affectif... Rejoignez la communauté BarriAide ! »\n\n► SHORTS #3 : Gérer les remarques de l'entourage\nFace caméra: « "C'est la facilité, tu n'as pas de mérite". Voici la phrase exacte que je dis avec mon plus grand sourire à ceux qui jugent mon parcours de -105 lbs... Le lien est en bio pour notre guide gratuit ! »\n=========================================\n`
          : `\n\n=========================================\n📱 YOUR 3 VERTICAL SHORTS / REELS EXTRACTED BY AI (45 SEC CHRONO) :\n\n► SHORT #1: Overcoming Pre-Op Fear & Anxiety\nOn camera: "If you are terrified before your bariatric surgery or before starting Mounjaro, remember one thing: fear is 100% normal. But staying in severe obesity was far more dangerous. Here is how I calmed my mind before losing 105 pounds... Follow @barriaide for real post-op support!"\n\n► SHORT #2: Surviving 'Food Grief'\nOn camera: "When your stomach can no longer handle your comfort foods after surgery, it is real psychological grief. Here is how I filled that emotional void without going crazy... Follow @barriaide for more!"\n\n► SHORT #3: Handling Judgment from Relatives\nOn camera: "'Oh, you took the easy way out!' When someone says that to me about my 105-pound weight loss, here is my exact 1-sentence answer... Join our @barriaide community below!"\n=========================================\n`;
        newContent = originalContent + shortsSection;
      } 
      else if (actionType === "email") {
        newContent = isFr
          ? `SUJET : Vous avez le droit d'avoir peur (Mais vous n'êtes plus seul) ❤️\n\nBonjour [Prénom],\n\nJ'espère que vous vous sentez écouté, soutenu et en pleine forme dans votre parcours aujourd'hui.\n\nOn parle énormément de kilos, de dosages et de protéines sur les forums, mais on oublie trop souvent la vraie bataille : celle qui se passe dans notre cerveau et notre cœur lorsque notre corps change si vite avec la bariatrique ou le Mounjaro/Contrave.\n\n${originalContent.slice(0, 350)}...\n\n👉 J'ai enregistré une courte vidéo de 5 minutes pour répondre aux craintes intimes que l'on n'ose jamais aborder. Cliquez ici pour la visionner et échanger dans les commentaires :\n[LIEN VERS VOTRE VIDÉO DU MARDI]\n\nDe patient à patient,\nJean-Yves | Chaîne Officielle : @barriaide (-105 lbs)`
          : `SUBJECT: You have the right to be scared (But you are not alone anymore) ❤️\n\nHi [First Name],\n\nI hope you are feeling heard, supported, and energized in your journey today.\n\nWe talk so much about pounds, doses, and protein goals, but we often forget the most critical battle: what happens inside our head and heart when our body transforms rapidly after bariatric surgery or under GLP-1s (Mounjaro, Contrave).\n\n${originalContent.slice(0, 350)}...\n\n👉 I recorded a 5-minute heart-to-heart video to answer the most intimate fears and questions about this exact struggle. Click below to watch and join the conversation in the comments:\n[LINK TO YOUR TUESDAY YOUTUBE VIDEO]\n\nFrom patient to patient,\nJean-Yves | Official Channel: @barriaide (-105 lbs down)`;
      } 
      else if (actionType === "custom") {
        const promptLower = customPromptText.toLowerCase();
        if (promptLower.includes("fear") || promptLower.includes("peur") || promptLower.includes("scared") || promptLower.includes("anxi")) {
          newContent = isFr 
            ? `[❤️ RASSURANCE PSYCHOLOGIQUE AJOUTÉE PAR L'IA]\n« Ne culpabilisez jamais d'avoir des doutes. C'est le passage obligé vers votre nouvelle vie. Chaque patient bariatrique a passé des nuits blanches à douter... »\n\n` + originalContent
            : `[❤️ PSYCHOLOGICAL REASSURANCE ADDED BY AI]\n« Never feel ashamed of your doubts. Every successful post-op patient has lived through those sleepless nights of anxiety. What matters is speaking about it openly... »\n\n` + originalContent;
        } else if (promptLower.includes("judgment") || promptLower.includes("regard") || promptLower.includes("social") || promptLower.includes("stigma")) {
          newContent = originalContent + (isFr 
            ? `\n\n🛡️ [BOUCLIER ANTI-JUGEMENT AJOUTÉ PAR L'IA] : Rappelez-vous que le jugement extérieur parle de l'insécurité de ceux qui jugent, jamais de votre courage à reprendre le contrôle de votre santé !`
            : `\n\n🛡️ [ANTI-JUDGMENT SHIELD ADDED BY AI] : Always remember that external judgment says everything about the insecurities of those who judge, and nothing about your courage to reclaim your life!`);
        } else if (promptLower.includes("summar") || promptLower.includes("bullet") || promptLower.includes("résum")) {
          newContent = isFr
            ? `📌 RÉSUMÉ PSYCHOLOGIQUE IA EN 3 POINTS CONCRETS :\n• Le Défi : Choc affectif et deuil des habitudes de réconfort alimentaire.\n• La Solution : Auto-bienveillance, changement de mindset, et solidarité active entre pairs.\n• L'Action : Inviter l'audience à vider son sac et poser ses questions sous la vidéo.\n\n---\n` + originalContent
            : `📌 PSYCHOLOGICAL EXECUTIVE SUMMARY (3 BULLETS BY AI) :\n• The Challenge: Emotional shock and the grief of losing old comfort habits.\n• The Solution: Self-empathy, mindset shift, and patient-to-patient brotherhood.\n• The Action: Inviting our community to ask their taboo questions without judgment below.\n\n---\n` + originalContent;
        } else {
          newContent = `[🤖 CUSTOM AI MODIFICATION APPLIED : "${customPromptText}"]\n\n` + originalContent;
        }
      }

      const updatedDocs = docs.map(d => d.id === activeDoc.id ? { ...d, content: newContent } : d);
      saveDocs(updatedDocs);
      setIsAiProcessing(false);
      setAiPrompt("");
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 600);
  };

  // ------------------------------------------
  // SPREADSHEET LOGIC
  // ------------------------------------------
  const currentSheet = sheets[activeSheetId];

  const handleCellChange = (rIdx: number, cIdx: number, val: string) => {
    if (!currentSheet) return;
    const updatedRows = [...currentSheet.rows];
    updatedRows[rIdx] = [...updatedRows[rIdx]];
    updatedRows[rIdx][cIdx] = val;

    const nextSheets = {
      ...sheets,
      [activeSheetId]: { ...currentSheet, rows: updatedRows }
    };
    saveSheets(nextSheets);
  };

  const handleAddRow = () => {
    if (!currentSheet) return;
    const emptyRow = currentSheet.headers.map(() => "0");
    emptyRow[0] = isFr ? "Nouvelle entrée" : "New entry";
    
    const nextSheets = {
      ...sheets,
      [activeSheetId]: { ...currentSheet, rows: [...currentSheet.rows, emptyRow] }
    };
    saveSheets(nextSheets);
  };

  const handleDeleteRow = (rIdx: number) => {
    if (!currentSheet) return;
    if (!confirm(isFr ? "Supprimer cette ligne du tableau ?" : "Delete this row from the spreadsheet?")) return;
    
    const updatedRows = currentSheet.rows.filter((_, idx) => idx !== rIdx);
    const nextSheets = {
      ...sheets,
      [activeSheetId]: { ...currentSheet, rows: updatedRows }
    };
    saveSheets(nextSheets);
  };

  const calculateBudgetTotals = () => {
    const budgetSheet = sheets["budget"];
    if (!budgetSheet) return { totYt: 0, totGuides: 0, totApp: 0, totAff: 0, totDep: 0, totRevenu: 0, profitNet: 0 };

    let totYt = 0, totGuides = 0, totApp = 0, totAff = 0, totDep = 0;
    budgetSheet.rows.forEach(r => {
      totYt += parseFloat(String(r[1]).replace(/[^0-9.-]/g, "")) || 0;
      totGuides += parseFloat(String(r[2]).replace(/[^0-9.-]/g, "")) || 0;
      totApp += parseFloat(String(r[3]).replace(/[^0-9.-]/g, "")) || 0;
      totAff += parseFloat(String(r[4]).replace(/[^0-9.-]/g, "")) || 0;
      totDep += parseFloat(String(r[5]).replace(/[^0-9.-]/g, "")) || 0;
    });
    const totRevenu = totYt + totGuides + totApp + totAff;
    const profitNet = totRevenu - totDep;
    return { totYt, totGuides, totApp, totAff, totDep, totRevenu, profitNet };
  };

  const handleExportCsv = () => {
    if (!currentSheet) return;
    let csvContent = "\uFEFF"; // BOM for Excel encoding
    csvContent += currentSheet.headers.join(";") + "\r\n";
    currentSheet.rows.forEach(r => {
      csvContent += r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(";") + "\r\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barriaide_${currentSheet.id}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ------------------------------------------
  // YOUTUBE TEMPLATES LOGIC
  // ------------------------------------------
  const activeTemplate = YOUTUBE_TEMPLATES.find(t => t.id === activeScriptTemplateId) || YOUTUBE_TEMPLATES[0];

  const handleCopyTemplate = () => {
    if (!activeTemplate) return;
    const fullText = `TITRE : ${activeTemplate.title}\n\nACCROCHE :\n${activeTemplate.hook}\n\nSTRUCTURE :\n${activeTemplate.structure.join("\n")}`;
    navigator.clipboard.writeText(fullText).then(() => {
      alert(isFr ? "📋 Copié dans le presse-papiers !" : "📋 Copied to clipboard!");
    });
  };

  const handleSendTemplateToEditor = () => {
    if (!activeTemplate) return;
    const newId = `doc_${Date.now()}`;
    const newDoc: ScriptDoc = {
      id: newId,
      title: `Script : ${activeTemplate.title}`,
      date: new Date().toLocaleDateString("fr-CA"),
      content: `TITRE : ${activeTemplate.title}\nCATÉGORIE : ${activeTemplate.category}\n\n=== ACCROCHE CHOC (0:00 - 0:45) ===\n${activeTemplate.hook}\n\n=== STRUCTURE DÉTAILLÉE (5 MIN) ===\n${activeTemplate.structure.join("\n\n")}\n\n=== MES NOTES ET ASTUCES VÉCUES ===\n- \n- `
    };
    saveDocs([newDoc, ...docs]);
    setActiveDocId(newId);
    setActiveTab("editor");
  };

  // ------------------------------------------
  // TIMER LOGIC
  // ------------------------------------------
  const handleStartStopTimer = () => {
    if (timerRunning) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setTimerRunning(false);
    } else {
      setTimerRunning(true);
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            setTimerRunning(false);
            alert(isFr 
              ? "🎉 Session Solopreneur terminée ! Prenez 10 minutes de pause pour vous étirer et boire un grand verre d'eau."
              : "🎉 Solopreneur session completed! Take a 10-minute break to stretch and drink a tall glass of water."
            );
            return timerDuration * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleResetTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimerRunning(false);
    setTimerSeconds(timerDuration * 60);
  };

  const handleDurationChange = (minutes: number) => {
    setTimerDuration(minutes);
    setTimerSeconds(minutes * 60);
    if (timerRunning) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setTimerRunning(false);
    }
  };

  const formatTimerTime = () => {
    const m = Math.floor(timerSeconds / 60);
    const s = timerSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // ------------------------------------------
  // SPREADSHEET BUDGET COMPUTATION PREPARATION
  // ------------------------------------------
  const budgetTotals = calculateBudgetTotals();

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
              SOLOPRENEUR
            </span>
            <span className="text-xs text-slate-400 font-medium">@barriaide Studio V3</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {isFr ? "Suite de Production Solopreneur & IA" : "Solopreneur & AI Production Suite"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isFr 
              ? "Gérez votre feuille de route, éditez vos scripts avec le Copilote IA et trackez vos objectifs."
              : "Manage your roadmap, draft video scripts with the AI Copilote, and track your objectives."}
          </p>
        </div>

        {/* Global Progress Indicators */}
        <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 flex flex-col gap-2 min-w-[240px]">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>🔥 {isFr ? "Progression Globale (1 An)" : "Global Roadmap Progress (1 Year)"}</span>
            <span className="text-purple-400">{checkedTasksCount} / {totalTasks} ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* INNER TABS BAR */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: "roadmap", label: isFr ? "📅 Feuille de Route 365" : "📅 365 Roadmap", color: "border-blue-500 text-blue-400 bg-blue-500/10" },
          { id: "calendar", label: isFr ? "🗓️ Calendrier & Sync .ICS" : "🗓️ Calendar & .ICS Sync", color: "border-teal-500 text-teal-400 bg-teal-500/10" },
          { id: "editor", label: isFr ? "📝 Studio IA & Éditeur" : "📝 AI Studio & Editor", color: "border-purple-500 text-purple-400 bg-purple-500/10" },
          { id: "excel", label: isFr ? "📊 Tableur & Tracker" : "📊 Spreadsheet Tracker", color: "border-green-500 text-green-400 bg-green-500/10" },
          { id: "scripts", label: isFr ? "🎬 Templates YouTube" : "🎬 YouTube Templates", color: "border-red-500 text-red-400 bg-red-500/10" },
          { id: "timer", label: isFr ? "⏱️ Minuteur Focus" : "⏱️ Focus Timer", color: "border-amber-500 text-amber-400 bg-amber-500/10" },
          { id: "strategy", label: isFr ? "🧠 Stratégie Globale" : "🧠 Global Strategy", color: "border-slate-500 text-slate-400 bg-slate-500/10" },
          { id: "store", label: isFr ? "🛍️ Boutique Digitale" : "🛍️ Digital Store", color: "border-pink-500 text-pink-400 bg-pink-500/10" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs sm:text-sm rounded-xl font-bold border transition-all ${
              activeTab === tab.id 
                ? `${tab.color} scale-[1.02] shadow-xs` 
                : "border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800 hover:border-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------
          TAB 1: ROADMAP (FEUILLE DE ROUTE)
          ------------------------------------------ */}
      {activeTab === "roadmap" && (
        <div className="space-y-6">
          
          {/* Roadmap Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs sm:text-sm font-bold text-slate-300">
              🔍 {isFr ? "Filtrer par trimestre :" : "Filter by quarter:"}
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: isFr ? "🌟 Trimestre 1-4 (1 An)" : "🌟 Quarter 1-4 (1 Year)" },
                { id: "q1", label: isFr ? "Q1 : Fondations YouTube" : "Q1: YouTube Foundations" },
                { id: "q2", label: isFr ? "Q2 : Site & Lead Magnet" : "Q2: Site & Lead Magnet" },
                { id: "q3", label: isFr ? "Q3 : Lancement App SaaS" : "Q3: SaaS App Launch" },
                { id: "q4", label: isFr ? "Q4 : Scale & Monétisation" : "Q4: Scale & Monetization" }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setRoadmapFilter(f.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    roadmapFilter === f.id
                      ? "bg-slate-700 text-white border-purple-500/50"
                      : "bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quarters Render */}
          <div className="space-y-8">
            {quartersToRender.map(q => (
              <div key={q.id} className="bg-slate-800/20 rounded-2xl p-6 border border-slate-800 space-y-6">
                
                {/* Quarter Header */}
                <div className="flex flex-wrap justify-between items-start gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <span 
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-900 font-extrabold"
                      style={{ backgroundColor: q.color }}
                    >
                      {q.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{q.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                    {q.description}
                  </p>
                </div>

                {/* Weeks in Quarter */}
                <div className="grid grid-cols-1 gap-6">
                  {q.weeks.map(week => (
                    <div key={week.weekNum} className="bg-slate-800/40 rounded-xl p-4 border border-slate-800 space-y-4">
                      <div className="border-b border-slate-700/40 pb-2">
                        <h4 className="text-sm font-bold text-purple-400">
                          {week.title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          🎯 {isFr ? "Focus :" : "Focus:"} <span className="font-semibold text-slate-200">{week.focus}</span>
                        </p>
                      </div>

                      {/* Days in Week */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {week.days.map((dayPlan, dIdx) => (
                          <div key={dIdx} className="bg-slate-950/40 rounded-xl p-3 border border-slate-800 space-y-3">
                            <span className="inline-block text-[11px] font-bold uppercase px-2 py-0.5 rounded-sm bg-slate-800 text-slate-400">
                              {dayPlan.day} - {dayPlan.title}
                            </span>
                            <div className="space-y-2">
                              {dayPlan.tasks.map((taskText, tIdx) => {
                                const taskId = `${q.id}_w${week.weekNum}_d${dIdx}_t${tIdx}`;
                                const isChecked = !!appState.checkedTasks[taskId];
                                return (
                                  <label 
                                    key={tIdx} 
                                    className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none group"
                                  >
                                    <input 
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleTask(taskId)}
                                      className="mt-0.5 h-3.5 w-3.5 rounded-sm border-slate-700 bg-slate-800 text-purple-600 focus:ring-0 focus:ring-offset-0 shrink-0 cursor-pointer"
                                    />
                                    <span className={`leading-relaxed group-hover:text-white transition-colors ${isChecked ? "line-through text-slate-500" : ""}`}>
                                      {taskText}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------
          TAB 2: CALENDAR (CALENDRIER)
          ------------------------------------------ */}
      {activeTab === "calendar" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-800 gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrevMonth}
                className="px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ◀ {isFr ? "Précédent" : "Prev"}
              </button>
              <h3 className="text-base font-extrabold text-white min-w-[140px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button 
                onClick={handleNextMonth}
                className="px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {isFr ? "Suivant" : "Next"} ▶
              </button>
            </div>

            <button 
              onClick={handleExportIcs}
              className="px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isFr ? "Exporter ce Calendrier (.ICS)" : "Export this Calendar (.ICS)"}</span>
            </button>
          </div>

          <div className="bg-slate-800/20 p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex flex-wrap justify-between items-center gap-3">
            <span>💡 {isFr ? "Cliquez sur un jour pour lui ajouter des tâches ou planifier vos tournages." : "Click on any day to add tasks or plan content creation."}</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="text-red-500">●</span> {isFr ? "Vidéos / Tournages" : "Videos / Shoots"}</span>
              <span className="flex items-center gap-1"><span className="text-teal-400">●</span> {isFr ? "Infolettre / Courriel" : "Newsletters"}</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-slate-400 uppercase pb-2 border-b border-slate-800 mb-2">
              {isFr 
                ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => <div key={d}>{d}</div>)
                : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d}>{d}</div>)
              }
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {/* Empty Days at start */}
              {Array.from({ length: getFirstDayOfMonth(currentYear, currentMonth) }).map((_, idx) => (
                <div key={`empty-${idx}`} className="bg-slate-900/10 border border-slate-850 rounded-xl min-h-[90px] p-2 text-slate-600 font-bold" />
              ))}

              {/* Real Month Days */}
              {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }).map((_, idx) => {
                const dayNum = idx + 1;
                const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                const dayEvents = calendarEvents.filter(e => e.date === dStr);
                return (
                  <div 
                    key={`day-${dayNum}`}
                    onClick={() => handleDayClick(dayNum)}
                    className="bg-slate-900/40 border border-slate-800 rounded-xl min-h-[90px] p-2 hover:border-purple-500/50 cursor-pointer hover:bg-slate-800/25 transition-all flex flex-col gap-1.5"
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                      <span>{dayNum}</span>
                      {dayEvents.length > 0 && <span className="text-purple-400 text-[10px]">●</span>}
                    </div>
                    
                    <div className="flex-grow space-y-1 overflow-y-auto max-h-[70px]">
                      {dayEvents.map((ev, eIdx) => (
                        <div 
                          key={eIdx}
                          className={`text-[9px] font-bold p-1 rounded-sm border truncate ${
                            ev.type === "video" 
                              ? "bg-red-950/40 border-red-900/40 text-red-300"
                              : "bg-teal-950/40 border-teal-900/40 text-teal-300"
                          }`}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simple Event Add/Edit Modal */}
          {showEventModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-slate-850 pb-2">
                  {isFr ? `Agenda pour le ${selectedDateStr}` : `Schedule for ${selectedDateStr}`}
                </h3>
                
                {/* List Existing Events for Day */}
                {calendarEvents.filter(e => e.date === selectedDateStr).length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400">{isFr ? "Tâches existantes :" : "Existing tasks:"}</h4>
                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
                      {calendarEvents.map((ev, idx) => {
                        if (ev.date !== selectedDateStr) return null;
                        return (
                          <div key={idx} className="flex justify-between items-center text-xs bg-slate-800/80 p-2 rounded-lg border border-slate-700/30">
                            <span className="text-slate-200">{ev.title} ({ev.type})</span>
                            <button 
                              onClick={() => handleDeleteEvent(idx)}
                              className="text-red-400 hover:text-red-300 p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add Event Form */}
                <form onSubmit={handleAddEvent} className="space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400">{isFr ? "Ajouter une tâche :" : "Add a task:"}</h4>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">{isFr ? "Titre" : "Title"}</label>
                    <input 
                      type="text"
                      required
                      placeholder={isFr ? "ex: 🎬 Tournage Shorts #1" : "e.g., 🎬 Shoot Shorts #1"}
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-xl text-xs text-white"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">{isFr ? "Catégorie" : "Category"}</label>
                    <select
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value as "video" | "email")}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-xl text-xs text-white"
                    >
                      <option value="video">🎬 {isFr ? "Vidéos / Tournages" : "Videos / Shoots"}</option>
                      <option value="email">💌 {isFr ? "Infolettre / Courriel" : "Newsletters"}</option>
                    </select>
                  </div>

                  <div className="flex gap-2 justify-end pt-2 border-t border-slate-850">
                    <button 
                      type="button"
                      onClick={() => setShowEventModal(false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700"
                    >
                      {isFr ? "Fermer" : "Close"}
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
                    >
                      {isFr ? "Enregistrer" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------
          TAB 3: AI STUDIO (DOCUMENT WRITING & COPILOTE)
          ------------------------------------------ */}
      {activeTab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Docs Sidebar */}
          <div className="lg:col-span-3 bg-slate-850/40 p-4 rounded-2xl border border-slate-800 space-y-4 h-full">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                {isFr ? "📚 Documents" : "📚 Documents"}
              </h3>
            </div>
            
            <button 
              onClick={handleNewDoc}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <FilePlus className="w-4 h-4" />
              <span>{isFr ? "Nouveau document" : "New Document"}</span>
            </button>

            <div className="space-y-1.5 overflow-y-auto max-h-[300px] lg:max-h-[480px]">
              {docs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setActiveDocId(doc.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex justify-between items-center group ${
                    activeDocId === doc.id
                      ? "bg-purple-950/40 border-purple-500/50 text-purple-300"
                      : "bg-slate-900/55 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-bold truncate">{doc.title}</div>
                    <span className="text-[9px] text-slate-500 block mt-0.5">{doc.date}</span>
                  </div>
                  <button 
                    onClick={(e) => handleDeleteDoc(doc.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity p-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Editor Panel */}
          <div className="lg:col-span-9 bg-slate-850/20 p-5 rounded-2xl border border-slate-800 space-y-4">
            {activeDoc ? (
              <div className="space-y-4">
                
                {/* Copilote IA Dashboard Tool Group */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5 shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isFr ? "Copilote IA : Édition instantanée « sur le fly »" : "AI Copilote: Instant \"on the fly\" editing"}</span>
                    </span>
                    {isAiProcessing && (
                      <span className="text-[10px] text-purple-400 font-bold animate-pulse flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>{isFr ? "L'IA réfléchit..." : "AI processing..."}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => runAIAction("style")}
                      disabled={isAiProcessing}
                      className="px-3 py-1.5 text-[10px] sm:text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 rounded-lg transition-colors hover:border-purple-500/50"
                      title={isFr ? "Reformuler le style pour YouTube avec empathie et psychologie" : "Rewrite in a clean, empathetic, and patient-first style"}
                    >
                      ✨ {isFr ? "Dynamiser le Style" : "Enhance Style"}
                    </button>
                    <button 
                      onClick={() => runAIAction("grammar")}
                      disabled={isAiProcessing}
                      className="px-3 py-1.5 text-[10px] sm:text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 rounded-lg transition-colors hover:border-purple-500/50"
                      title={isFr ? "Corriger la syntaxe et la ponctuation" : "Correct writing syntax and typos"}
                    >
                      🧐 {isFr ? "Corriger le Français" : "Polish Grammar"}
                    </button>
                    <button 
                      onClick={() => runAIAction("hooks")}
                      disabled={isAiProcessing}
                      className="px-3 py-1.5 text-[10px] sm:text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 rounded-lg transition-colors hover:border-purple-500/50"
                      title={isFr ? "Générer 3 accroches chocs de 30 secondes pour début de vidéo" : "Create 3 viral opening hook options"}
                    >
                      🎣 {isFr ? "Générer 3 Accroches" : "Generate 3 Hooks"}
                    </button>
                    <button 
                      onClick={() => runAIAction("5min")}
                      disabled={isAiProcessing}
                      className="px-3 py-1.5 text-[10px] sm:text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 rounded-lg transition-colors hover:border-purple-500/50"
                      title={isFr ? "Restructurer les notes en un script de 5 minutes" : "Format notes into a 5-minute video outline"}
                    >
                      ⏱️ {isFr ? "Structure 5 Min" : "5-Min Structure"}
                    </button>
                    <button 
                      onClick={() => runAIAction("shorts")}
                      disabled={isAiProcessing}
                      className="px-3 py-1.5 text-[10px] sm:text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 rounded-lg transition-colors hover:border-purple-500/50"
                      title={isFr ? "Découper en 3 Shorts verticaux" : "Extract 3 vertical Shorts ideas"}
                    >
                      📱 {isFr ? "Découper en Shorts" : "Cut into Shorts"}
                    </button>
                    <button 
                      onClick={() => runAIAction("email")}
                      disabled={isAiProcessing}
                      className="px-3 py-1.5 text-[10px] sm:text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 rounded-lg transition-colors hover:border-purple-500/50"
                      title={isFr ? "Transformer ce script en infolettre engageante" : "Convert active draft into a newsletter format"}
                    >
                      💌 {isFr ? "Format Infolettre" : "Format Newsletter"}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={isFr 
                        ? "💬 Demandez une modif sur mesure (ex: résume en 3 puces, ajoute un conseil hydratation...)" 
                        : "💬 Ask for a custom modification (e.g., summarize in 3 bullets, add a hydration tip...)"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && aiPrompt.trim()) {
                          runAIAction("custom", aiPrompt);
                        }
                      }}
                      className="flex-grow bg-slate-950 border border-slate-800 p-2 rounded-xl text-xs text-white"
                    />
                    <button 
                      onClick={() => {
                        if (aiPrompt.trim()) runAIAction("custom", aiPrompt);
                      }}
                      disabled={isAiProcessing || !aiPrompt.trim()}
                      className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl text-white transition-all shadow-md flex items-center gap-1.5 shrink-0"
                    >
                      <span>🚀 {isFr ? "Exécuter" : "Run"}</span>
                    </button>
                  </div>
                </div>

                {/* Edit Title */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">{isFr ? "Titre du document" : "Document Title"}</label>
                  <input 
                    type="text"
                    value={activeDoc.title}
                    onChange={(e) => handleDocTitleChange(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-sm text-white font-bold"
                  />
                </div>

                {/* Document Main Content Textarea */}
                <div className="space-y-1 relative">
                  <label className="text-[10px] uppercase font-bold text-slate-500">{isFr ? "Contenu" : "Content"}</label>
                  <textarea
                    ref={textareaRef}
                    value={activeDoc.content}
                    onChange={(e) => handleDocContentChange(e.target.value)}
                    rows={12}
                    className={`w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-white font-mono leading-relaxed transition-all focus:border-purple-500/50 ${
                      isAiProcessing ? "opacity-50 pointer-events-none select-none" : ""
                    }`}
                  />
                  {isAiProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs rounded-2xl">
                      <div className="flex flex-col items-center gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-lg">
                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] text-slate-400 font-bold">{isFr ? "Génération IA..." : "AI rewriting..."}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats Footer */}
                <div className="flex flex-wrap justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-800 gap-2">
                  <span className="font-semibold">{getWordCount(activeDoc.content)} {isFr ? "mots" : "words"}</span>
                  <span className="font-semibold text-slate-400">🗣️ {isFr ? "Durée estimée :" : "Est. Speak Time:"} {getReadTime(activeDoc.content)} {isFr ? "(Objectif : ~5 min)" : "(Target: ~5 min)"}</span>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold">{isFr ? "Sélectionnez ou créez un document" : "Select or create a document"}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------
          TAB 4: SPREADSHEET (TABLEUR)
          ------------------------------------------ */}
      {activeTab === "excel" && (
        <div className="space-y-6">
          
          {/* Sheet tabs & Csv export */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-800 gap-4">
            
            {/* Inner Sheet Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(sheets).map(key => {
                const sheet = sheets[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveSheetId(sheet.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      activeSheetId === sheet.id
                        ? "bg-slate-700 text-white border-green-500/50"
                        : "bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {sheet.title}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleAddRow}
                className="px-3.5 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-green-400" />
                <span>{isFr ? "Ajouter Ligne" : "Add Row"}</span>
              </button>
              {currentSheet && currentSheet.id === "budget" && (
                <button 
                  onClick={() => setActiveTab("store")}
                  className="px-3.5 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-pink-400 border border-pink-500/35 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  title={isFr ? "Obtenir le fichier Excel V3 (.xlsx)" : "Get raw Excel file V3 (.xlsx)"}
                >
                  <span>🛍️ {isFr ? "Obtenir Excel (.xlsx)" : "Get Excel (.xlsx)"}</span>
                </button>
              )}
              <button 
                onClick={handleExportCsv}
                className="px-3.5 py-1.5 text-xs font-bold bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isFr ? "Exporter CSV" : "Export CSV"}</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          {currentSheet ? (
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-inner">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-800">
                    {currentSheet.headers.map((h, idx) => (
                      <th key={idx} className="p-3 whitespace-nowrap">{h}</th>
                    ))}
                    <th className="p-3 text-center w-16">{isFr ? "Action" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {currentSheet.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-800/20 transition-colors">
                      {row.map((cellVal, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <input 
                            type="text"
                            value={cellVal}
                            onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                            className="bg-transparent focus:bg-slate-900 border border-transparent focus:border-slate-700 rounded-sm p-1.5 w-full text-slate-200 focus:outline-none"
                          />
                        </td>
                      ))}
                      <td className="p-2 text-center">
                        <button 
                          onClick={() => handleDeleteRow(rIdx)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-slate-800/50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Calculations row for Budget Sheet */}
                  {currentSheet.id === "budget" && (
                    <tr className="bg-slate-800/30 font-bold border-t border-slate-800 text-slate-200">
                      <td className="p-3">{isFr ? "TOTAL / PROFIT NET" : "TOTAL / NET PROFIT"}</td>
                      <td className="p-3">{budgetTotals.totYt.toLocaleString()} $</td>
                      <td className="p-3">{budgetTotals.totGuides.toLocaleString()} $</td>
                      <td className="p-3">{budgetTotals.totApp.toLocaleString()} $</td>
                      <td className="p-3">{budgetTotals.totAff.toLocaleString()} $</td>
                      <td className="p-3 text-red-400">-{budgetTotals.totDep.toLocaleString()} $</td>
                      <td className="p-3 text-center text-xs">
                        <span className={`px-2 py-1 rounded-sm font-extrabold uppercase ${budgetTotals.profitNet >= 0 ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                          PROFIT: {budgetTotals.profitNet.toLocaleString()} $
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">{isFr ? "Tableur introuvable" : "Spreadsheet not found"}</p>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------
          TAB 5: YOUTUBE TEMPLATES (TEMPLATES)
          ------------------------------------------ */}
      {activeTab === "scripts" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Templates list sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
              {isFr ? "🎬 Catégories & Titres" : "🎬 Categories & Titles"}
            </h3>
            
            <div className="space-y-2 overflow-y-auto max-h-[300px] lg:max-h-[500px]">
              {YOUTUBE_TEMPLATES.map(tmpl => (
                <div
                  key={tmpl.id}
                  onClick={() => setActiveScriptTemplateId(tmpl.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    activeScriptTemplateId === tmpl.id
                      ? "bg-red-950/40 border-red-500/50 text-red-300 scale-[1.01]"
                      : "bg-slate-900/55 border-slate-800 text-slate-400 hover:text-slate-255 hover:bg-slate-850"
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">{tmpl.category}</div>
                  <div className="text-xs font-bold mt-1 leading-snug">{tmpl.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Details Panel */}
          <div className="lg:col-span-8 bg-slate-850/20 p-5 rounded-2xl border border-slate-800 space-y-6">
            {activeTemplate ? (
              <div className="space-y-6">
                
                {/* Actions and category */}
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-sm border border-red-500/20">
                      {activeTemplate.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{activeTemplate.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCopyTemplate}
                      className="px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isFr ? "Copier" : "Copy"}</span>
                    </button>
                    <button 
                      onClick={handleSendTemplateToEditor}
                      className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-500 flex items-center gap-1.5 shadow-md"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{isFr ? "Ouvrir dans l'Éditeur" : "Open in AI Editor"}</span>
                    </button>
                  </div>
                </div>

                {/* Viral Hook */}
                <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-red-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isFr ? "Accroche Choc (Les 30 premières secondes)" : "Opening Hook (First 30 Seconds)"}</span>
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-mono italic">
                    {activeTemplate.hook}
                  </p>
                </div>

                {/* Structure / Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                    {isFr ? "🎬 Découpage de la Vidéo (5 Minutes Chrono)" : "🎬 Video Outline (5 Minutes Chrono)"}
                  </h4>
                  <div className="space-y-2">
                    {activeTemplate.structure.map((step, idx) => {
                      const parts = step.split(" : ");
                      return (
                        <div key={idx} className="flex gap-3 bg-slate-900/40 p-3 rounded-lg border border-slate-800 text-xs">
                          <span className="text-red-400 font-extrabold font-mono shrink-0">{parts[0]}</span>
                          <span className="text-slate-200 leading-normal">{parts.slice(1).join(" : ") || step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <BookOpenText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold">{isFr ? "Sélectionnez un template" : "Select a template"}</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ------------------------------------------
          TAB 6: FOCUS TIMER (POMODORO)
          ------------------------------------------ */}
      {activeTab === "timer" && (
        <div className="max-w-md mx-auto bg-slate-850/20 p-8 rounded-3xl border border-slate-800 text-center space-y-6">
          <div className="flex justify-center items-center">
            <div className="relative w-48 h-48 rounded-full border-4 border-slate-800 flex items-center justify-center flex-col bg-slate-950/40 shadow-inner">
              
              {/* Spinning Glow Border when running */}
              {timerRunning && (
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              )}
              
              <Clock className="w-6 h-6 text-purple-400 opacity-60 mb-2" />
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-widest">
                {formatTimerTime()}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase mt-1">
                {timerRunning ? (isFr ? "Session Active" : "Session Active") : (isFr ? "En Pause" : "On Hold")}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Custom durations */}
            <div className="flex justify-center items-center gap-2">
              <span className="text-xs font-bold text-slate-400">{isFr ? "Durée :" : "Duration:"}</span>
              <div className="flex gap-1.5">
                {[15, 25, 45, 60].map(mins => (
                  <button
                    key={mins}
                    onClick={() => handleDurationChange(mins)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-colors ${
                      timerDuration === mins
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Play/Pause/Reset Controls */}
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleStartStopTimer}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all ${
                  timerRunning 
                    ? "bg-amber-600 hover:bg-amber-500 text-white" 
                    : "bg-purple-600 hover:bg-purple-500 text-white"
                }`}
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{timerRunning ? (isFr ? "Mettre en Pause" : "Pause Session") : (isFr ? "Démarrer" : "Start Session")}</span>
              </button>
              
              <button
                onClick={handleResetTimer}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isFr ? "Réinitialiser" : "Reset"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------
          TAB 7: GLOBAL STRATEGY (STRATÉGIE)
          ------------------------------------------ */}
      {activeTab === "strategy" && (
        <div className="space-y-6">
          <div className="bg-slate-850/20 p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span>{isFr ? "Plan Marketing de 1 An & Identité de Marque" : "1-Year Marketing Plan & Brand Identity"}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-extrabold text-purple-400">{isFr ? "🎯 Positionnement Unique" : "🎯 Unique Positioning"}</h4>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {isFr 
                      ? "105 livres perdues grâce à l'alliance de la chirurgie bariatrique, du Contrave (soutien psychologique/neuro) et du Mounjaro (soutien hormonal GLP-1/GIP). L'angle de communication principal est d'apporter de l'empathie d'égal à égal, sans jugement clinique froid."
                      : "105 lbs lost through the specific synergy of Bariatric surgery, Contrave (psychological/neuro support) and Mounjaro (hormonal GLP-1/GIP support). The primary messaging is peer-to-peer authentic empathy, moving away from clinical distance."}
                  </p>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-extrabold text-purple-400">{isFr ? "👥 Identité Globale & Handle" : "👥 Global Identity & Handle"}</h4>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {isFr 
                      ? "Handle unique sécurisé sur toutes les plateformes (YouTube, Instagram, TikTok) : @barriaide. Ce nom unifie votre marque et servira d'identité d'accès pour votre future application mobile/SaaS."
                      : "Single handle secured across all networks (YouTube, Instagram, TikTok): @barriaide. This creates consistency and anchors the user base for your upcoming mobile app/SaaS portal."}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-extrabold text-purple-400">{isFr ? "📋 Textes Bio Copier-Coller" : "📋 Bio Templates Copy-Paste"}</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Bio TikTok & Instagram (150 chars)</span>
                    <pre className="bg-slate-950 p-2 rounded-lg text-[10px] font-mono text-slate-300 border border-slate-850 mt-1 whitespace-pre-wrap">
                      {`⚡ -105 lbs: Real Post-Op Patient Truth\n🧠 Psychology, Mindset & Overcoming Fears\n🍏 Bariatric + Contrave + Mounjaro\n💬 Ask your burning questions 👇\n[LINK]`}
                    </pre>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">YouTube Description Snippet</span>
                    <pre className="bg-slate-950 p-2 rounded-lg text-[9px] font-mono text-slate-300 border border-slate-850 mt-1 whitespace-pre-wrap">
                      {`Welcome to @barriaide! ⚡\n\nI lost 105 pounds through a powerful combination: Bariatric Surgery, Contrave, and Mounjaro (GLP-1). I created this channel because doctors prescribe doses and surgeons operate, but almost nobody prepares your mind for the emotional transition when your relationship with food transforms overnight. Join our supportive patient-to-patient hub!`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------
          TAB 8: DIGITAL STORE (BOUTIQUE DIGITALE)
          ------------------------------------------ */}
      {activeTab === "store" && (
        <div className="space-y-6">
          <div className="bg-slate-850/20 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span>{isFr ? "Boutique de Produits Digitaux & Boîte à Outils" : "Digital Product Store & Toolkit Hub"}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isFr 
                  ? "Monétisez votre audience grâce à ces solutions prêtes à l'emploi. Vos clients achètent et téléchargent en 1 clic."
                  : "Monetize your audience with these high-converting ready-made files. Fully automated 1-click downloads."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Product 1: Excel Sheet */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-pink-500/30 transition-all group">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
                    EXCEL / SPREADSHEET
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-pink-400 transition-colors">
                    {isFr ? "Tableur Métabolique GLP-1 & Bariatrique V3" : "GLP-1 & Bariatric Metabolic Tracker V3"}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isFr 
                      ? "Le fichier Excel (.xlsx) complet avec macros et formules de courbes automatiques pour suivre le poids, les protéines, l'hydratation et le cycle des injections."
                      : "The complete desktop Excel (.xlsx) file with pre-built macro formulas and dynamic charts to track weight, protein, hydration, and shot cycles."}
                  </p>
                  <ul className="text-[10px] text-slate-500 space-y-1.5 pt-1">
                    <li>✔️ {isFr ? "Formules automatiques de moyenne mobile" : "Auto rolling-average formulas"}</li>
                    <li>✔️ {isFr ? "Graphe de perte de poids réaliste" : "Realistic weight projection charts"}</li>
                    <li>✔️ {isFr ? "Journal imprimable et exportable" : "Printable and exportable logs"}</li>
                  </ul>
                </div>
                <div className="pt-5 border-t border-slate-850 mt-4 flex items-center justify-between gap-2">
                  <div className="text-lg font-black text-white">19.00 $</div>
                  <button 
                    onClick={() => alert(isFr ? "Simulated Stripe Checkout link (19 $): Achat et téléchargement instantané du fichier .xlsx" : "Simulated Stripe Checkout (19 $): Instant .xlsx download")}
                    className="px-4 py-2 text-xs font-bold bg-pink-650 hover:bg-pink-600 text-white rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isFr ? "Acheter (.xlsx)" : "Buy (.xlsx)"}
                  </button>
                </div>
              </div>

              {/* Product 2: PDF Recipes */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-pink-500/30 transition-all group">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    PDF EBOOK
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-pink-400 transition-colors">
                    {isFr ? "30 Recettes Protéinées spécial Petit Estomac" : "30 High-Protein Recipes for Tiny Stomachs"}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isFr 
                      ? "Des repas simples, savoureux et hyper-digestes contenant au moins 25g de protéines par portion, parfaits après bypass/sleeve ou sous GLP-1."
                      : "Delicious, highly digestible meals with at least 25g of protein per portion, perfect after surgery or during active GLP-1 therapy."}
                  </p>
                  <ul className="text-[10px] text-slate-500 space-y-1.5 pt-1">
                    <li>✔️ {isFr ? "Ingrédients anti-nausées et anti-reflux" : "Anti-nausea & anti-reflux ingredients"}</li>
                    <li>✔️ {isFr ? "Portions réalistes calibrées" : "Calibrated realistic small portions"}</li>
                    <li>✔️ {isFr ? "Liste de courses type pré-remplie" : "Pre-filled grocery shopping list"}</li>
                  </ul>
                </div>
                <div className="pt-5 border-t border-slate-850 mt-4 flex items-center justify-between gap-2">
                  <div className="text-lg font-black text-white">27.00 $</div>
                  <button 
                    onClick={() => alert(isFr ? "Simulated Stripe Checkout link (27 $): Achat et téléchargement instantané du guide PDF" : "Simulated Stripe Checkout (27 $): Instant PDF download")}
                    className="px-4 py-2 text-xs font-bold bg-pink-650 hover:bg-pink-600 text-white rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isFr ? "Acheter (PDF)" : "Buy (PDF)"}
                  </button>
                </div>
              </div>

              {/* Product 3: Audio/PDF mindset */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-pink-500/30 transition-all group">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    AUDIO + PDF PACK
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-pink-400 transition-colors">
                    {isFr ? "Pack Mental : Vaincre le Deuil Alimentaire" : "Mindset Pack: Overcoming Food Grief"}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isFr 
                      ? "Un guide d'accompagnement psychologique et fiches mémo pour gérer la disparition du réconfort alimentaire et le regard des autres."
                      : "A psychological audio guide and workbook on dealing with the emotional void when food is no longer a coping mechanism."}
                  </p>
                  <ul className="text-[10px] text-slate-500 space-y-1.5 pt-1">
                    <li>✔️ {isFr ? "3 sessions audio d'écoute guidée (MP3)" : "3 guided audio listening sessions (MP3)"}</li>
                    <li>✔️ {isFr ? "Fiches de phrases-boucliers de 1 ligne" : "Workbook with 1-line boundary scripts"}</li>
                    <li>✔️ {isFr ? "Exercices de journaling quotidien" : "Daily mindset journaling prompts"}</li>
                  </ul>
                </div>
                <div className="pt-5 border-t border-slate-850 mt-4 flex items-center justify-between gap-2">
                  <div className="text-lg font-black text-white">29.00 $</div>
                  <button 
                    onClick={() => alert(isFr ? "Simulated Stripe Checkout link (29 $): Achat et téléchargement instantané du pack audio/PDF" : "Simulated Stripe Checkout (29 $): Instant audio/PDF download")}
                    className="px-4 py-2 text-xs font-bold bg-pink-650 hover:bg-pink-600 text-white rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isFr ? "Acheter (Pack)" : "Buy (Pack)"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
