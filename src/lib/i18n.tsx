import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = {
  nav: { cases: string; inside: string; numbers: string; download: string; demo: string };
  hero: {
    badgePill: string;
    badge: string;
    title: string[];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    streakValue: string;
    streakLabel: string;
    goalTitle: string;
    goalKpis: { label: string; value: string }[];
  };
  todayCard: {
    title: string;
    subtitle: string;
    streak: string;
    rows: { title: string; sub: string; pct: string; tone: "amber" | "green" | "blue" }[];
  };
  statement: {
    pre: string;
    line2a: string;
    line2b: string;
    line3a: string;
    line3b: string;
    used: string;
    tags: string[];
  };
  bento: {
    kicker: string;
    title: string;
    sub: string;
    streak: {
      title: string; body: string;
      bigTitle: string; bigSub: string; days: { d: string; w: string }[];
      chips: string[];
    };
    planner: {
      title: string; body: string;
      morning: string; completion: string; pct: string;
      rows: { time: string; task: string; len: string; done?: boolean }[];
    };
    stacks: {
      title: string; body: string; cta: string;
      phoneTitle: string; activeStacks: string;
      cards: { count: string; title: string; sub: string; tone: "amber" | "green" | "violet" | "indigo" }[];
      footnote: string;
    };
    weekly: {
      title: string; body: string;
      heading: string;
      rings: { label: string; value: number }[];
      stats: { label: string; value: string; sub: string }[];
    };
    reminders: {
      title: string; body: string;
      time: string; toast: string; toastTitle: string; toastBody: string;
      yes: string; later: string;
    };
  };
  closer: {
    kicker: string;
    title: string[];
    rating: string;
    trusted: string;
    videos: { name: string; role: string; img: number }[];
    reviews: { text: string; name: string; role: string }[];
    viewAll: string;
  };
  download: {
    title: string; sub: string;
    appStoreSmall: string; appStore: string;
    googlePlaySmall: string; googlePlay: string;
    qrLabel: string;
  };
  faq: {
    kicker: string;
    title: string;
    contact: string;
    contactBtn: string;
    items: { q: string; a: string }[];
  };
  footer: { columns: { title: string; links: string[] }[]; copyright: string };
};

const fr: Dict = {
  nav: { cases: "Fonctionnalités", inside: "Comment ça marche", numbers: "Avis", download: "Télécharger", demo: "Démo interactive", faq: "FAQ" },
  hero: {
    badgePill: "Nouveau",
    badge: "La plateforme civique pour les communautés souveraines",
    title: ["Construisez une commune", "qui tient vraiment"],
    sub: "Moi créez des espaces où se lient des histoires, sans que votre identité soit effacée. votre quartier sera plus transparent.",
    ctaPrimary: "Commencer gratuitement",
    ctaSecondary: "Voir la démo",
    streakValue: "Série de 7 jours",
    streakLabel: "débloquée",
    goalTitle: "Objectif du jour : 3 actions",
    goalKpis: [
      { label: "Voter", value: "65%" },
      { label: "Signaler", value: "87%" },
      { label: "Communiquer", value: "94%" },
    ],
  },
  todayCard: {
    title: "Actualités du jour",
    subtitle: "3 sur 8 actions faites",
    streak: "Actif depuis 18 jours",
    rows: [
      { title: "Lire le fil de la commune", sub: "Nouvelles annonces publiées", pct: "85%", tone: "amber" },
      { title: "Voter sur la rénovation", sub: "Avant 11h00", pct: "100%", tone: "green" },
      { title: "Répondre aux voisins", sub: "Discussion ouverte ce soir", pct: "67%", tone: "blue" },
    ],
  },
  statement: {
    pre: "Construisez une commune",
    line2a: "vivante",
    line2b: "avec une structure",
    line3a: "qui rend l'action citoyenne",
    line3b: "simple, directe et souveraine.",
    used: "Utilisé par celles et ceux qui font leur quartier.",
    tags: ["#Citoyens", "#Élus", "#Associations", "#Voisins"],
  },
  bento: {
    kicker: "Toutes les fonctionnalités",
    title: "Chaque fonction citoyenne en un seul endroit.",
    sub: "Community réunit le fil d'actualités, les votes, les groupes d'intérêt, le bazar local et la gestion des documents — dans une interface pensée pour la vie réelle.",
    streak: {
      title: "Lien d'actualités de la commune",
      body: "Votre quartier, en direct. Les annonces officielles, les alertes et les échanges entre voisins s'affichent dans un fil clair, filtrable par source et par thème.",
      bigTitle: "Fil live Belleville",
      bigSub: "Actualités, alertes, débats — tout ce qui se passe près de chez vous",
      days: [
        { d: "📰", w: "Lun" },
        { d: "🗳️", w: "Mar" },
        { d: "📣", w: "Mer" },
        { d: "🤝", w: "Jeu" },
        { d: "🏘️", w: "Ven" },
        { d: "📋", w: "Sam" },
      ],
      chips: ["Annonces officielles", "Groupes de voisins", "Alertes en temps réel"],
    },
    planner: {
      title: "Vote citoyen direct",
      body: "Votez sur les décisions réelles de votre quartier : rénovations, budgets, projets d'intérêt commun. Chaque voix compte, les résultats sont publics.",
      morning: "Vote du jour",
      completion: "Participation",
      pct: "64%",
      rows: [
        { time: "Actif", task: "Rénovation du terrain de sport", len: "3 options", done: false },
        { time: "Actif", task: "Nouveau marché bio proposé", len: "2 options", done: false },
        { time: "Terminé", task: "Éclairage public Riverside Ave.", len: "Résultats", done: true },
        { time: "Terminé", task: "Stationnement zone nord", len: "Résultats", done: true },
      ],
    },
    stacks: {
      title: "Groupes & communauté locale",
      body: "Rejoignez la communauté officielle de votre commune ou créez des groupes thématiques — environnement, culture, sécurité, jeunesse — avec documents, événements et discussions.",
      cta: "Rejoindre ma commune",
      phoneTitle: "Quartier Belleville",
      activeStacks: "4 218 membres actifs",
      cards: [
        { count: "14 votes", title: "Votes en cours", sub: "Budgets, projets, candidats", tone: "green" },
        { count: "128", title: "Discussions", sub: "Débats, propositions, alertes", tone: "violet" },
        { count: "2 événements", title: "Agenda local", sub: "Brocante, assemblée citoyenne", tone: "amber" },
        { count: "Documents", title: "Archives officielles", sub: "Statuts, comptes rendus, règlements", tone: "indigo" },
      ],
      footnote: "*Toutes les décisions restent transparentes et vérifiables par tous les membres.",
    },
    weekly: {
      title: "Profil & Paramètres",
      body: "Gérez votre identité civique, activez la connexion biométrique, personnalisez l'interface et accédez au support — tout depuis votre profil.",
      heading: "Votre commune cette semaine",
      rings: [
        { label: "Votes", value: 86 },
        { label: "Participation", value: 100 },
        { label: "Discussions", value: 71 },
      ],
      stats: [
        { label: "Votes organisés", value: "14", sub: "3 nouvelles propositions" },
        { label: "Membres actifs", value: "842", sub: "Cette semaine dans la commune" },
      ],
    },
    reminders: {
      title: "Le Bazar — échanges locaux",
      body: "Achetez, vendez, échangez biens et services entre voisins. Chaque transaction reste dans la communauté et renforce les liens du quartier.",
      time: "20h30 · Nouvelles annonces",
      toast: "🛍️",
      toastTitle: "Offre proche de chez vous",
      toastBody: "Anna propose un vélo hollandais à 45 € — à 500 m de vous.",
      yes: "Voir l'annonce",
      later: "Plus tard",
    },
  },
  closer: {
    kicker: "Ce qu'ils en disent",
    title: ["Comment les citoyens utilisent", "Community au quotidien"],
    rating: "4,8/5",
    trusted: "Plébiscité par 1 582+ citoyens actifs",
    videos: [
      { name: "Marie Leclerc", role: "Habitante de Lyon", img: 0 },
      { name: "Thomas Brunner", role: "Conseiller de quartier", img: 1 },
      { name: "Fatima Osei", role: "Présidente d'association", img: 2 },
    ],
    reviews: [
      { text: "Enfin une app où mon vote sur la rénovation du parc compte vraiment. Les résultats sont publiés immédiatement.", name: "Marie Leclerc", role: "Habitante" },
      { text: "Le fil d'actualités regroupe les annonces de la mairie, les alertes de voisins et les événements. Plus besoin de chercher partout.", name: "Thomas Brunner", role: "Conseiller de quartier" },
      { text: "J'ai vendu mon vélo et trouvé un prof de maths pour mon fils — tout dans le Bazar, entre voisins.", name: "Ingrid Schulz", role: "Mère de famille" },
      { text: "Les documents officiels de la commune sont enfin accessibles à tous. La transparence que j'attendais depuis des années.", name: "Daniel Morel", role: "Citoyen engagé" },
      { text: "Notre association a créé son groupe en 10 minutes. On gère les événements, les discussions et les votes directement depuis l'app.", name: "Fatima Osei", role: "Présidente d'association" },
      { text: "Pour la première fois, je comprends comment le budget de mon quartier est dépensé. C'est une vraie révolution civique.", name: "Pierre Garnier", role: "Retraité actif" },
      { text: "L'identification biométrique rassure. Je sais que chaque vote vient d'un vrai habitant de la commune.", name: "Sofia Nowak", role: "Enseignante" },
      { text: "Les alertes en temps réel m'ont prévenu d'un problème de stationnement avant que ça devienne incontrôlable.", name: "Julien Vidal", role: "Commerçant local" },
      { text: "Notre conseil de quartier tient des réunions plus courtes parce que tout est déjà décidé collectivement en amont.", name: "Élodie Mercier", role: "Adjointe au maire" },
    ],
    viewAll: "Voir tous les avis",
  },
  download: {
    title: "Téléchargez Community",
    sub: "Rejoignez votre commune souveraine.",
    appStoreSmall: "Télécharger pour",
    appStore: "iPhone",
    googlePlaySmall: "Obtenir sur",
    googlePlay: "Android",
    qrLabel: "Scannez pour installer",
  },
  faq: {
    kicker: "Questions fréquentes",
    title: "Questions fréquemment posées",
    contact: "Vous ne trouvez pas votre réponse ?",
    contactBtn: "Nous contacter",
    items: [
      { q: "Qu'est-ce que Community exactement ?", a: "Community est une plateforme civique qui permet aux habitants d'un quartier ou d'une commune de s'informer, de voter sur les décisions locales, d'échanger entre voisins et de gérer les affaires de leur communauté — sans dépendre d'une autorité centrale." },
      { q: "Comment fonctionne le système de vote ?", a: "Chaque habitant identifié peut voter sur les propositions actives de sa commune. Les résultats sont publiés en temps réel et les archives restent accessibles à tous les membres." },
      { q: "Qu'est-ce que le Bazar ?", a: "Le Bazar est la place de marché locale intégrée à l'application. Les habitants peuvent y vendre, acheter ou échanger des biens et services entre voisins, sans commission externe." },
      { q: "Peut-on transférer une commune existante sur la plateforme ?", a: "Oui. Community prévoit un module de migration complet permettant de transposer le fonctionnement d'une commune existante — documents, historique des décisions, groupes — vers la plateforme numérique." },
      { q: "Community est-il gratuit pour les citoyens ?", a: "L'application est entièrement gratuite pour les citoyens. Les collectivités et associations souhaitant des outils avancés de gestion et de reporting peuvent accéder à des formules adaptées." },
    ],
  },
  footer: {
    columns: [],
    copyright: "© 2026 Community — La plateforme des communes souveraines.",
  },
};

const en: Dict = {
  nav: { cases: "Features", inside: "How it works", numbers: "Reviews", download: "Download", demo: "Interactive demo", faq: "FAQ" },
  hero: {
    badgePill: "New",
    badge: "The civic platform for sovereign communities",
    title: ["Build a commune", "that really works"],
    sub: "Create spaces where stories connect, without erasing your identity. Your neighborhood will be more transparent.",
    ctaPrimary: "Start for free",
    ctaSecondary: "Watch demo",
    streakValue: "7-day streak",
    streakLabel: "unlocked",
    goalTitle: "Today's goal: 3 actions",
    goalKpis: [
      { label: "Vote", value: "65%" },
      { label: "Report", value: "87%" },
      { label: "Communicate", value: "94%" },
    ],
  },
  todayCard: {
    title: "Today's news",
    subtitle: "3 of 8 actions done",
    streak: "Active for 18 days",
    rows: [
      { title: "Read community feed", sub: "New announcements posted", pct: "85%", tone: "amber" },
      { title: "Vote on renovation", sub: "Before 11:00 am", pct: "100%", tone: "green" },
      { title: "Reply to neighbors", sub: "Open discussion tonight", pct: "67%", tone: "blue" },
    ],
  },
  statement: {
    pre: "Build a community",
    line2a: "alive",
    line2b: "with a structure",
    line3a: "that makes civic action",
    line3b: "simple, direct and sovereign.",
    used: "Used by the people who shape their neighborhood.",
    tags: ["#Citizens", "#Officials", "#Associations", "#Neighbors"],
  },
  bento: {
    kicker: "All features",
    title: "Every civic feature in one place.",
    sub: "Community brings together the news feed, voting, interest groups, the local marketplace and document management — in an interface built for real life.",
    streak: {
      title: "Community news feed",
      body: "Your neighborhood, live. Official announcements, alerts and neighbor exchanges appear in a clean feed, filterable by source and topic.",
      bigTitle: "Live feed Belleville",
      bigSub: "News, alerts, debates — everything happening near you",
      days: [
        { d: "📰", w: "Mon" },
        { d: "🗳️", w: "Tue" },
        { d: "📣", w: "Wed" },
        { d: "🤝", w: "Thu" },
        { d: "🏘️", w: "Fri" },
        { d: "📋", w: "Sat" },
      ],
      chips: ["Official announcements", "Neighbor groups", "Real-time alerts"],
    },
    planner: {
      title: "Direct civic voting",
      body: "Vote on real decisions in your neighborhood: renovations, budgets, community projects. Every vote counts, all results are public.",
      morning: "Today's vote",
      completion: "Turnout",
      pct: "64%",
      rows: [
        { time: "Active", task: "Sports field renovation", len: "3 options", done: false },
        { time: "Active", task: "New organic market proposal", len: "2 options", done: false },
        { time: "Done", task: "Riverside Ave. street lighting", len: "Results", done: true },
        { time: "Done", task: "North zone parking", len: "Results", done: true },
      ],
    },
    stacks: {
      title: "Groups & local community",
      body: "Join the official community of your district or create thematic groups — environment, culture, security, youth — with documents, events and discussions.",
      cta: "Join my commune",
      phoneTitle: "Belleville District",
      activeStacks: "4,218 active members",
      cards: [
        { count: "14 votes", title: "Active votes", sub: "Budgets, projects, candidates", tone: "green" },
        { count: "128", title: "Discussions", sub: "Debates, proposals, alerts", tone: "violet" },
        { count: "2 events", title: "Local agenda", sub: "Flea market, citizens' meeting", tone: "amber" },
        { count: "Documents", title: "Official archive", sub: "Statutes, minutes, regulations", tone: "indigo" },
      ],
      footnote: "*All decisions remain transparent and verifiable by every member.",
    },
    weekly: {
      title: "Profile & Settings",
      body: "Manage your civic identity, enable biometric login, personalise the interface and access support — all from your profile.",
      heading: "Your community this week",
      rings: [
        { label: "Votes", value: 86 },
        { label: "Turnout", value: 100 },
        { label: "Discussions", value: 71 },
      ],
      stats: [
        { label: "Votes held", value: "14", sub: "3 new proposals" },
        { label: "Active members", value: "842", sub: "This week in the community" },
      ],
    },
    reminders: {
      title: "The Marketplace — local exchange",
      body: "Buy, sell, trade goods and services between neighbors. Every transaction stays within the community and strengthens local ties.",
      time: "8:30 PM · New listings",
      toast: "🛍️",
      toastTitle: "Offer near you",
      toastBody: "Anna is selling a Dutch bicycle for €45 — 500 m away.",
      yes: "See listing",
      later: "Later",
    },
  },
  closer: {
    kicker: "What they say",
    title: ["How citizens use", "Community every day"],
    rating: "4.8/5",
    trusted: "Trusted by 1,582+ active citizens",
    videos: [
      { name: "Marie Leclerc", role: "Lyon resident", img: 0 },
      { name: "Thomas Brunner", role: "District councillor", img: 1 },
      { name: "Fatima Osei", role: "Association president", img: 2 },
    ],
    reviews: [
      { text: "Finally an app where my vote on the park renovation actually counts. Results are published instantly.", name: "Marie Leclerc", role: "Resident" },
      { text: "The news feed combines city hall announcements, neighbor alerts and events. No more searching everywhere.", name: "Thomas Brunner", role: "District Councillor" },
      { text: "I sold my bike and found a maths tutor for my son — all in the Marketplace, between neighbors.", name: "Ingrid Schulz", role: "Parent" },
      { text: "Official community documents are finally accessible to everyone. The transparency I'd been waiting years for.", name: "Daniel Morel", role: "Engaged citizen" },
      { text: "Our association set up its group in 10 minutes. We manage events, discussions and votes directly from the app.", name: "Fatima Osei", role: "Association president" },
      { text: "For the first time I understand how my neighborhood budget is actually spent. A true civic revolution.", name: "Pierre Garnier", role: "Active retiree" },
      { text: "Biometric identification is reassuring. I know every vote comes from a real resident of the community.", name: "Sofia Nowak", role: "Teacher" },
      { text: "Real-time alerts warned me about a parking issue before it got out of hand.", name: "Julien Vidal", role: "Local merchant" },
      { text: "Our district council holds shorter meetings because everything is already decided collectively beforehand.", name: "Élodie Mercier", role: "Deputy Mayor" },
    ],
    viewAll: "View all reviews",
  },
  download: {
    title: "Download Community",
    sub: "Join your sovereign community.",
    appStoreSmall: "Download for",
    appStore: "iPhone",
    googlePlaySmall: "Get it on",
    googlePlay: "Android",
    qrLabel: "Scan to install",
  },
  faq: {
    kicker: "Common questions",
    title: "Frequently asked questions",
    contact: "Can't find your answer?",
    contactBtn: "Contact us",
    items: [
      { q: "What exactly is Community?", a: "Community is a civic platform that allows residents of a neighborhood or municipality to stay informed, vote on local decisions, exchange with neighbors and manage community affairs — without depending on a central authority." },
      { q: "How does the voting system work?", a: "Every verified resident can vote on active proposals in their community. Results are published in real time and archives remain accessible to all members." },
      { q: "What is the Marketplace?", a: "The Marketplace is the local exchange integrated into the app. Residents can sell, buy or trade goods and services with neighbors, with no external commission." },
      { q: "Can an existing community be migrated to the platform?", a: "Yes. Community includes a full migration module allowing an existing municipality to transfer its operations — documents, decision history, groups — to the digital platform." },
      { q: "Is Community free for citizens?", a: "The app is completely free for citizens. Local governments and associations needing advanced management and reporting tools can access dedicated plans." },
    ],
  },
  footer: {
    columns: [],
    copyright: "© 2026 Community — The platform for sovereign communities.",
  },
};

const dictionaries: Record<Lang, Dict> = { fr, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("community_lang") as Lang | null;
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("community_lang", l); } catch {}
  };

  return (
    <I18nCtx.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
