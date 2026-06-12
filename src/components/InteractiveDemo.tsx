import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users as UsersIcon,
  BarChart3,
  LayoutGrid,
  User as UserIcon,
  Search,
  MessageSquare,
  Heart,
  Share2,
  Image as ImageIcon,
  RefreshCw,
  Settings,
  ChevronRight,
  Apple,
  FileText,
  Globe,
  Moon,
  Shield,
  Check,
  Signal,
  Wifi,
  BatteryMedium,
  Plus,
  Search as SearchIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoSvg from "@/assets/logo.svg";

type ScreenId = "login" | "home" | "community" | "voting" | "marketplace" | "profile";

export type DemoDict = {
  sectionEyebrow: string;
  sectionTitle1: string;
  sectionTitleGold: string;
  sectionSub: string;
  appTitle: string;
  appSubtitle: string;
  login: string;
  register: string;
  orContinueWith: string;
  google: string;
  apple: string;
  district: string;
  whatsNew: string;
  photo: string;
  poll: string;
  all: string;
  official: string;
  neighbors: string;
  share: string;
  helpRequest: string;
  officialBadge: string;
  event: string;
  initiative: string;
  posts: {
    aid: { name: string; time: string; text: string };
    council: { name: string; time: string; text: string };
    friends: { name: string; time: string; text: string };
    police: { name: string; time: string; text: string };
    climate: { name: string; time: string; text: string };
  };
  communityTitle: string;
  districtTitle: string;
  districtSub: string;
  joined: string;
  districtDesc: string;
  members: string;
  voting: string;
  discussions: string;
  events: string;
  news: string;
  documents: string;
  eventItems: { date: string; month: string; title: string; sub: string }[];
  documentItem: { title: string; sub: string };
  newsItem: { title: string; sub: string };
  civicVoting: string;
  active: string;
  completed: string;
  endsOn: string;
  turnout: string;
  ballotTitle: string;
  ballotBody: string;
  ballotOptions: string[];
  submitVote: string;
  liveResults: string;
  votesCast: string;
  quorum: string;
  marketplace: string;
  searchProducts: string;
  filterAll: string;
  offering: string;
  seeking: string;
  free: string;
  items: { title: string; price: string; by: string }[];
  profileTitle: string;
  userName: string;
  userMeta: string;
  messages: string;
  biometric: string;
  darkMode: string;
  language: string;
  logOut: string;
  tabs: { home: string; communities: string; voting: string; marketplace: string; profile: string };
};

export const demoFr: DemoDict = {
  sectionEyebrow: "Démo interactive",
  sectionTitle1: "Essayez l'application.",
  sectionTitleGold: "Directement dans votre navigateur.",
  sectionSub: "Cliquez sur les onglets en bas de l'écran pour naviguer entre les modules — exactement comme sur votre téléphone.",
  appTitle: "Application de gouvernance citoyenne",
  appSubtitle: "Façonnons l'avenir ensemble. Discutez, votez, agissez.",
  login: "Connexion",
  register: "S'inscrire",
  orContinueWith: "OU CONTINUER AVEC",
  google: "Google",
  apple: "Apple",
  district: "Belleville",
  whatsNew: "Quoi de neuf à Belleville ?",
  photo: "Photo",
  poll: "Sondage",
  all: "Tout",
  official: "Officiel",
  neighbors: "Voisins",
  share: "Partager",
  helpRequest: "DEMANDE D'AIDE",
  officialBadge: "OFFICIEL",
  event: "ÉVÉNEMENT",
  initiative: "INITIATIVE",
  posts: {
    aid: { name: "Entraide de Belleville", time: "Il y a 2 heures", text: "Ascenseur en panne au centre pour personnes âgées. Qui peut aider à faire les courses cet après-midi ? Merci de nous contacter !" },
    council: { name: "Mairie de Lyon", time: "Hier", text: "Les travaux sur Avenue de Saxe sont reportés à la semaine prochaine. Des perturbations de circulation sont à prévoir." },
    friends: { name: "Amis de Belleville", time: "Il y a 4 heures", text: "Journée d'entraide ce dimanche au parc. Apportez de la bonne humeur — café offert !" },
    police: { name: "Police Nationale Lyon", time: "Il y a 5 heures", text: "Alerte : recrudescence des vols à la tire au Parc de la Tête d'Or. Sécurisez vos objets de valeur et signalez tout comportement suspect." },
    climate: { name: "Action Climat Lyon", time: "Il y a 1 jour", text: "Pétition pour plus de pistes cyclables à Belleville — déjà 1 200 signatures !" },
  },

  communityTitle: "Communauté",
  districtTitle: "Quartier Belleville",
  districtSub: "Lyon · Quartier officiel",
  joined: "Rejoint",
  districtDesc: "La communauté civique officielle pour tous les habitants de Belleville. Restez informé des activités locales.",
  members: "MEMBRES",
  voting: "VOTES",
  discussions: "DISCUSSIONS",
  events: "Événements",
  news: "Actualités",
  documents: "Documents",
  eventItems: [
    { date: "14", month: "JUIN", title: "Brocante du quartier", sub: "Dimanche, 10h00 · Parc de la Tête d'Or" },
    { date: "17", month: "JUIN", title: "Assemblée citoyenne 2026", sub: "Mercredi, 19h30 · Maison de quartier" },
  ],
  documentItem: { title: "Statuts du quartier 2026.pdf", sub: "Document PDF · 1,4 Mo" },
  newsItem: { title: "Bilan trimestriel de la mairie", sub: "Publié il y a 3 jours" },
  civicVoting: "Vote citoyen",
  active: "Actifs",
  completed: "Terminés",
  endsOn: "Se termine le 20 juin 2026",
  turnout: "64% de participation",
  ballotTitle: "Rénovation du terrain de sport du Parc de la Tête d'Or",
  ballotBody: "Le terrain de sport du Parc de la Tête d'Or doit recevoir un nouveau revêtement, des buts neufs et un éclairage LED. Budget de 250 000 € attribué par le conseil de quartier.",
  ballotOptions: ["Oui, réaliser le projet", "Non, utiliser le budget autrement", "Abstention"],
  submitVote: "Voter",
  liveResults: "Résultats en direct",
  votesCast: "1 428 votes exprimés",
  quorum: "Quorum atteint (min 50%)",
  marketplace: "Le Bazar",
  searchProducts: "Rechercher produits ou aide...",
  filterAll: "Tout",
  offering: "À vendre",
  seeking: "Recherche",
  free: "Gratuit",
  items: [
    { title: "Vélo hollandais ancien", price: "45 €", by: "Par Anna S." },
    { title: "Tondeuse à louer", price: "5 € / jour", by: "Par Max M." },
    { title: "Cours de maths (3e)", price: "15 € / h", by: "Par Stefan B." },
    { title: "Guitare (débutant)", price: "80 €", by: "Par Jonas F." },
  ],
  profileTitle: "Profil & Paramètres",
  userName: "Lukas Weber",
  userMeta: "Lyon · Membre depuis 2024",
  messages: "Messages & Support",
  biometric: "Connexion biométrique",
  darkMode: "Mode sombre",
  language: "Langue",
  logOut: "Se déconnecter",
  tabs: { home: "Accueil", communities: "Communautés", voting: "Votes", marketplace: "Bazar", profile: "Profil" },
};


export const demoEn: DemoDict = {
  sectionEyebrow: "Interactive demo",
  sectionTitle1: "Try the app.",
  sectionTitleGold: "Right in your browser.",
  sectionSub: "Tap the bottom tabs to navigate between modules — exactly like on your phone.",
  appTitle: "Community Governance Super App",
  appSubtitle: "Shaping the future together. Discuss, vote, act.",
  login: "Login",
  register: "Register",
  orContinueWith: "OR CONTINUE WITH",
  google: "Google",
  apple: "Apple",
  district: "Belleville",
  whatsNew: "What's new in Belleville?",
  photo: "Photo",
  poll: "Poll",
  all: "All",
  official: "Official",
  neighbors: "Neighbors",
  share: "Share",
  helpRequest: "HELP REQUEST",
  officialBadge: "OFFICIAL",
  event: "EVENT",
  initiative: "INITIATIVE",
  posts: {
    aid: { name: "Neighbourhood Aid Belleville", time: "2 hours ago", text: "Elevator in the senior center broken. Who can help with grocery shopping this afternoon? Please contact us!" },
    council: { name: "Lyon City Council", time: "Yesterday", text: "Construction on Avenue de Saxe is postponed to next week. Traffic delays are to be expected." },
    friends: { name: "Friends of Belleville", time: "4 hours ago", text: "Community help day this Sunday at the park. Bring good vibes — coffee on us!" },
    police: { name: "National Police Lyon", time: "5 hours ago", text: "Alert: Increased pickpocketing at Parc de la Tête d'Or. Please secure your valuables and report suspicious behavior." },
    climate: { name: "Climate Action Lyon", time: "1 day ago", text: "Petition for more bike lanes in Belleville — already 1,200 signatures!" },
  },
  communityTitle: "Community",
  districtTitle: "Belleville District",
  districtSub: "Lyon · Official District",
  joined: "Joined",
  districtDesc: "The official civic community for all residents of Belleville. Stay informed about local activities.",
  members: "MEMBERS",
  voting: "VOTING",
  discussions: "DISCUSSIONS",
  events: "Events",
  news: "News",
  documents: "Documents",
  eventItems: [
    { date: "14", month: "JUN", title: "Neighborhood Flea Market", sub: "Sunday, 10:00 AM · Parc de la Tête d'Or" },
    { date: "17", month: "JUN", title: "Citizens' Meeting 2026", sub: "Wednesday, 7:30 PM · Community Center" },
  ],
  documentItem: { title: "District Statutes 2026.pdf", sub: "PDF Document · 1.4 MB" },
  newsItem: { title: "Quarterly city hall report", sub: "Published 3 days ago" },
  civicVoting: "Civic Voting",
  active: "Active",
  completed: "Completed",
  endsOn: "Ends on June 20, 2026",
  turnout: "64% Turnout",
  ballotTitle: "Renovation of the Parc de la Tête d'Or sports field",
  ballotBody: "The Parc de la Tête d'Or sports field is to receive new turf, fresh goals and LED lighting. The budget of 250,000 € is allocated by the district council.",
  ballotOptions: ["Yes, implement project", "No, use budget differently", "Abstain"],
  submitVote: "Submit Vote",
  liveResults: "Live Results",
  votesCast: "1,428 votes cast",
  quorum: "Quorum reached (min 50%)",
  marketplace: "Marketplace",
  searchProducts: "Search products or help...",
  filterAll: "All",
  offering: "Offering",
  seeking: "Seeking",
  free: "Free",
  items: [
    { title: "Old Dutch Bicycle", price: "45 €", by: "By Anna S." },
    { title: "Lawn mower for loan", price: "5 € / Tag", by: "By Max M." },
    { title: "Math tutoring (9th grade)", price: "15 € / Std.", by: "By Stefan B." },
    { title: "Guitar (Beginner)", price: "80 €", by: "By Jonas F." },
  ],
  profileTitle: "Profile & Settings",
  userName: "Lukas Weber",
  userMeta: "Lyon · Member since 2024",
  messages: "Messages & Support",
  biometric: "Biometric Login",
  darkMode: "Dark Mode",
  language: "Language",
  logOut: "Log Out",
  tabs: { home: "Home", communities: "Communities", voting: "Voting", marketplace: "Marketplace", profile: "Profile" },
};


function Logo({ size = 32 }: { size?: number }) {
  return (
    <img
      src={logoSvg}
      alt="Community"
      style={{ width: size, height: size }}
      className="shrink-0"
    />
  );
}

function StatusBar() {
  return (
    <div className="relative flex h-7 items-center justify-between px-6 pt-1.5 text-[12px] font-semibold text-black">
      <span className="tabular-nums">22:09</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryMedium className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 340 }}>
      <div className="relative rounded-[46px] bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] p-[6px]">
        <div className="rounded-[42px] bg-[#1a1a1a] p-[3px]">
          <div className="relative overflow-hidden rounded-[39px] bg-[#f7f8fa]" style={{ height: 700 }}>
            <StatusBar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ d, onLogin }: { d: DemoDict; onLogin: () => void }) {
  return (
    <div className="flex h-[calc(100%-28px)] flex-col items-center px-0 pt-0 text-black">
      <div className="mb-5 w-full relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
        <img 
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=500&fit=crop" 
          alt="African savanna with African person" 
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="px-7 w-full">
        <h2 className="text-center text-[22px] font-extrabold leading-tight text-[#0c2340]">{d.appTitle}</h2>
        <p className="mt-2 text-center text-[14px] text-gray-500">{d.appSubtitle}</p>
        <div className="mt-8 w-full space-y-3 pb-6">
          <button
            onClick={onLogin}
            className="w-full rounded-2xl bg-[#4a90c8] py-3.5 text-base font-bold text-white shadow-sm transition active:scale-[0.98]"
          >
            {d.login}
          </button>
          <button
            onClick={onLogin}
            className="w-full rounded-2xl border-2 border-[#4a90c8] bg-white py-3 text-base font-bold text-[#4a90c8] transition active:scale-[0.98]"
          >
            {d.register}
          </button>
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[11px] font-semibold tracking-wider text-gray-400">{d.orContinueWith}</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button onClick={onLogin} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.3 9.14 5.38 12 5.38z"/></svg>
              {d.google}
            </button>
            <button onClick={onLogin} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold">
              <svg width="16" height="16" viewBox="0 0 384 512" fill="#000"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              {d.apple}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type PostProps = { name: string; time: string; text: string; badge?: string; badgeColor?: string; avatar?: React.ReactNode; image?: string; likes: number; comments: number; initialLiked?: boolean };

function Post({ name, time, text, badge, badgeColor, avatar, image, likes, comments, initialLiked, d }: PostProps & { d: DemoDict }) {
  const [liked, setLiked] = useState(!!initialLiked);
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
      className="mx-3 mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {avatar ?? <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />}
            <div>
              <div className="text-[13px] font-bold leading-tight text-black">{name}</div>
              <div className="text-[11px] text-gray-400">{time}</div>
            </div>
          </div>
          {badge && (
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${badgeColor}`}>{badge}</span>
          )}
        </div>
        <p className="mt-2 text-[13px] leading-snug text-gray-800 text-left">{text}</p>
      </div>
      {image && (
        <img src={image} alt="" className="block h-44 w-full object-cover" loading="lazy" />
      )}
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-[12px] text-gray-500">
          <button
            onClick={() => setLiked((v) => !v)}
            className="flex items-center gap-1.5 transition active:scale-90"
          >
            <motion.span animate={{ scale: liked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
              <Heart className={`h-4 w-4 transition ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </motion.span>
            {likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 transition active:scale-90"><MessageSquare className="h-4 w-4" /> {comments}</button>
          <button className="flex items-center gap-1.5 transition active:scale-90"><Share2 className="h-4 w-4" /> {d.share}</button>
        </div>
      </div>
    </motion.div>

  );
}

export function HomeScreen({ d }: { d: DemoDict }) {
  const [filter, setFilter] = useState<"all" | "official" | "neighbors">("all");

  // Each post has a category for filtering
  const allPosts = [
    {
      key: "aid",
      category: "neighbors" as const,
      props: {
        ...d.posts.aid,
        badge: d.helpRequest,
        badgeColor: "bg-amber-100 text-amber-700",
        avatar: <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=faces" alt="" className="h-9 w-9 rounded-full object-cover" />,
        likes: 12,
        comments: 4,
      },
    },
    {
      key: "council",
      category: "official" as const,
      props: {
        ...d.posts.council,
        badge: d.officialBadge,
        badgeColor: "bg-blue-100 text-blue-700",
        avatar: <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white">MC</div>,
        image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=800&h=440&fit=crop",
        likes: 48,
        comments: 19,
      },
    },
    {
      key: "police",
      category: "official" as const,
      props: {
        ...d.posts.police,
        badge: d.officialBadge,
        badgeColor: "bg-blue-100 text-blue-700",
        avatar: <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">PO</div>,
        likes: 92,
        comments: 34,
        initialLiked: true,
      },
    },
    {
      key: "friends",
      category: "neighbors" as const,
      props: {
        ...d.posts.friends,
        badge: d.event,
        badgeColor: "bg-green-100 text-green-700",
        avatar: <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-[11px] font-bold text-white">AS</div>,
        likes: 31,
        comments: 8,
      },
    },
    {
      key: "climate",
      category: "neighbors" as const,
      props: {
        ...d.posts.climate,
        badge: d.initiative,
        badgeColor: "bg-emerald-100 text-emerald-700",
        avatar: <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">AC</div>,
        likes: 204,
        comments: 57,
      },
    },
  ];

  const visible = allPosts.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="h-[calc(100%-28px)] overflow-y-auto pb-24">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-[17px] font-extrabold text-black">{d.district}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Search className="h-5 w-5" />
          <div className="relative"><MessageSquare className="h-5 w-5" /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" /></div>
        </div>
      </div>
      <div className="mx-3 mt-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2.5">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=faces" alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-amber-100" />
          <div className="flex-1 rounded-full bg-gray-100 px-3 py-2 text-[12px] text-gray-500">{d.whatsNew}</div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-4 border-t border-gray-100 pt-2 text-[12px] text-gray-500">
          <button className="flex items-center gap-1 active:scale-95"><ImageIcon className="h-4 w-4" /> {d.photo}</button>
          <button className="flex items-center gap-1 active:scale-95"><BarChart3 className="h-4 w-4" /> {d.poll}</button>
        </div>
      </div>
      {/* Filters — justify-start so buttons stay left-aligned */}
      <div className="mx-3 mt-3 flex w-full justify-start gap-2">
        {(["all", "official", "neighbors"] as const).map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative shrink-0 rounded-full px-4 py-1.5 text-[12px] font-bold"
            >
              {isActive && (
                <motion.span
                  layoutId="homeFilter"
                  className="absolute inset-0 rounded-full bg-[#4a90c8]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative ${isActive ? "text-white" : "text-gray-600"}`}>
                {f === "all" ? d.all : f === "official" ? d.official : d.neighbors}
              </span>
              {!isActive && <span className="absolute inset-0 -z-10 rounded-full border border-gray-200 bg-white" />}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={filter}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } } }}
        >
          {visible.map((p) => (
            <Post key={p.key} d={d} {...p.props} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function CommunityScreen({ d }: { d: DemoDict }) {
  const [tab, setTab] = useState<"events" | "news" | "documents">("events");
  return (
    <div className="h-[calc(100%-28px)] overflow-y-auto pb-24">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <span className="text-[20px] font-extrabold text-black">{d.communityTitle}</span>
        <Search className="h-5 w-5 text-gray-700" />
      </div>
      <div className="relative h-40 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=900&h=500&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
          <div className="flex items-end gap-2">
            <div className="rounded-2xl bg-white p-1.5 shadow-md"><Logo size={44} /></div>
            <div className="pb-1 text-left">
              <div className="text-[15px] font-extrabold text-white drop-shadow">{d.districtTitle}</div>
              <div className="text-[11px] text-white/90">{d.districtSub}</div>
            </div>
          </div>
          <button className="rounded-full border border-white/70 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{d.joined}</button>
        </div>
      </div>
      <p className="px-4 py-3 text-[13px] leading-snug text-gray-700">{d.districtDesc}</p>
      <div className="grid grid-cols-3 border-y border-gray-100 bg-white">
        {[
          { v: "4.218", k: d.members },
          { v: "14", k: d.voting },
          { v: "128", k: d.discussions },
        ].map((s) => (
          <div key={s.k} className="py-3 text-center">
            <div className="text-[18px] font-extrabold text-black">{s.v}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{s.k}</div>
          </div>
        ))}
      </div>
      <div className="relative flex border-b border-gray-100 bg-white">
        {(["events", "news", "documents"] as const).map((t) => {
          const isActive = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 py-3 text-[13px] font-bold transition-colors ${isActive ? "text-[#4a90c8]" : "text-gray-500"}`}
            >
              {t === "events" ? d.events : t === "news" ? d.news : d.documents}
              {isActive && (
                <motion.span
                  layoutId="communityTab"
                  className="absolute inset-x-4 bottom-0 h-[2.5px] rounded-full bg-[#4a90c8]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="px-3 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "events" && (
              <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
                {d.eventItems.map((e) => (
                  <motion.div
                    key={e.title}
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                    className="mb-2 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                  >
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-blue-50 text-[#4a90c8]">
                      <span className="text-[10px] font-bold uppercase">{e.month}</span>
                      <span className="text-[18px] font-extrabold leading-none">{e.date}</span>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-black">{e.title}</div>
                      <div className="text-[11px] text-gray-500">⏱ {e.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {tab === "documents" && (
              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#4a90c8]"><FileText className="h-6 w-6" /></div>
                <div>
                  <div className="text-[13px] font-bold text-black">{d.documentItem.title}</div>
                  <div className="text-[11px] text-gray-500">{d.documentItem.sub}</div>
                </div>
              </div>
            )}
            {tab === "news" && (
              <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                <div className="text-[13px] font-bold text-black">{d.newsItem.title}</div>
                <div className="mt-1 text-[11px] text-gray-500">{d.newsItem.sub}</div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function VotingScreen({ d }: { d: DemoDict }) {
  const [tab, setTab] = useState<"active" | "completed">("active");
  const [choice, setChoice] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  return (
    <div className="h-[calc(100%-28px)] overflow-y-auto pb-24">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <span className="text-[20px] font-extrabold text-black">{d.civicVoting}</span>
        <RefreshCw className="h-5 w-5 text-gray-700" />
      </div>
      <div className="relative flex border-b border-gray-100 bg-white">
        {(["active", "completed"] as const).map((t) => {
          const isActive = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 py-3 text-[13px] font-bold transition-colors ${isActive ? "text-[#4a90c8]" : "text-gray-500"}`}
            >
              {t === "active" ? d.active : d.completed}
              {isActive && (
                <motion.span
                  layoutId="votingTab"
                  className="absolute inset-x-4 bottom-0 h-[2.5px] rounded-full bg-[#4a90c8]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="m-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="text-[11px] font-bold tracking-wider text-[#4a90c8]">BELLEVILLE</div>
        <div className="mt-1 text-[17px] font-extrabold leading-tight text-black">{d.ballotTitle}</div>
        <div className="mt-2 flex items-center justify-between text-[12px]">
          <span className="text-gray-500">{d.endsOn}</span>
          <span className="font-bold text-green-600">{d.turnout}</span>
        </div>
        <div className="my-3 border-t border-dashed border-gray-200" />
        <p className="text-[13px] leading-snug text-gray-700">{d.ballotBody}</p>
        {!voted ? (
          <>
            <div className="mt-4 space-y-2">
              {d.ballotOptions.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setChoice(i)}
                  className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-[13px] font-bold transition ${choice === i ? "border-[#4a90c8] bg-blue-50 text-[#4a90c8]" : "border-gray-200 bg-gray-50 text-black"}`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${choice === i ? "border-[#4a90c8] bg-[#4a90c8]" : "border-gray-300"}`}>
                    {choice === i && <Check className="h-3 w-3 text-white" />}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={() => choice !== null && setVoted(true)}
              disabled={choice === null}
              className={`mt-4 w-full rounded-xl py-3 text-[14px] font-bold transition ${choice !== null ? "bg-[#4a90c8] text-white active:scale-[0.98]" : "bg-gray-200 text-gray-400"}`}
            >
              {d.submitVote}
            </button>
          </>
        ) : (
          <div className="mt-4">
            <div className="text-[14px] font-bold text-black">{d.liveResults}</div>
            {[
              { label: d.ballotOptions[0], pct: 72, color: "bg-[#4a90c8]" },
              { label: d.ballotOptions[1], pct: 22, color: "bg-amber-400" },
              { label: d.ballotOptions[2], pct: 6, color: "bg-gray-400" },
            ].map((r) => (
              <div key={r.label} className="mt-2">
                <div className="flex justify-between text-[13px] font-bold text-black"><span>{r.label}</span><span>{r.pct}%</span></div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.pct}%` }} transition={{ duration: 0.8 }} className={`h-full ${r.color}`} />
                </div>
              </div>
            ))}
            <div className="mt-3 text-center text-[11px] text-gray-500">{d.votesCast} · {d.quorum}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MarketplaceScreen({ d }: { d: DemoDict }) {
  const [filter, setFilter] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const filters = [d.filterAll, d.offering, d.seeking, d.free];
  const itemImages = [
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop",
  ];

  // Show product detail page
  if (selectedItem !== null) {
    const item = d.items[selectedItem];
    const img = itemImages[selectedItem % itemImages.length];
    return (
      <div className="h-[calc(100%-28px)] overflow-y-auto pb-24">
        {/* Back header */}
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
          <button
            onClick={() => setSelectedItem(null)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 active:scale-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span className="text-[16px] font-extrabold text-black">{d.marketplace}</span>
        </div>

        {/* Product image */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img src={img} alt="" className="h-full w-full object-cover" />
          <button
            onClick={() => setLiked((p) => ({ ...p, [selectedItem]: !p[selectedItem] }))}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md active:scale-90"
          >
            <Heart className={`h-4.5 w-4.5 transition ${liked[selectedItem] ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pt-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[18px] font-extrabold leading-tight text-black">{item.title}</h2>
            <span className="shrink-0 rounded-full bg-[#4a90c8]/10 px-2.5 py-1 text-[13px] font-extrabold text-[#4a90c8]">{item.price}</span>
          </div>
          <p className="mt-1 text-[12px] text-gray-500">{item.by}</p>

          {/* Seller info */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces"
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-[13px] font-bold text-black">{item.by.replace("Par ", "").replace("By ", "")}</p>
              <p className="text-[11px] text-gray-500">Belleville · ⭐ 4.9</p>
            </div>
            <button className="rounded-full bg-black px-3 py-1.5 text-[11px] font-bold text-white active:scale-95">
              {d.district === "Belleville" ? "Contacter" : "Contact"}
            </button>
          </div>

          {/* Description */}
          <div className="mt-4">
            <p className="text-[13px] font-bold text-black">{d.district === "Belleville" ? "Description" : "Description"}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600">
              {d.district === "Belleville"
                ? "Article en bon état, disponible immédiatement. Venez récupérer sur place ou livraison possible dans le quartier. N'hésitez pas à poser vos questions."
                : "Item in good condition, available immediately. Pick up in person or local delivery possible. Feel free to ask any questions."}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[d.offering, "Belleville", d.district].map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="mt-5 w-full rounded-2xl bg-[#4a90c8] py-3.5 text-[14px] font-extrabold text-white shadow-[0_8px_20px_-6px_rgba(74,144,200,0.5)]"
          >
            {d.district === "Belleville" ? "Envoyer un message" : "Send a message"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white py-3.5 text-[14px] font-bold text-black"
          >
            {d.district === "Belleville" ? "Faire une offre" : "Make an offer"}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100%-28px)]">
      <div className="h-full overflow-y-auto pb-28">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
          <span className="text-[20px] font-extrabold text-black">{d.marketplace}</span>
          <Heart className="h-5 w-5 text-gray-700" />
        </div>
        <div className="px-3 pt-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <SearchIcon className="h-4 w-4 text-gray-400" />
            <span className="text-[13px] text-gray-400">{d.searchProducts}</span>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {filters.map((f, i) => {
              const isActive = filter === i;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(i)}
                  className="relative shrink-0 rounded-full px-4 py-1.5 text-[12px] font-bold"
                >
                  {isActive && (
                    <motion.span
                      layoutId="mktFilter"
                      className="absolute inset-0 rounded-full bg-[#4a90c8]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative ${isActive ? "text-white" : "text-gray-600"}`}>{f}</span>
                </button>
              );
            })}
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="mt-3 grid grid-cols-2 gap-2.5"
          >
            {d.items.map((it, i) => {
              const img = itemImages[i % itemImages.length];
              const isLiked = !!liked[i];
              return (
                <motion.div
                  key={it.title}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedItem(i)}
                  className="cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative h-24 overflow-hidden bg-gray-100">
                    <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setLiked((p) => ({ ...p, [i]: !p[i] })); }}
                      className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm active:scale-90"
                    >
                      <Heart className={`h-3.5 w-3.5 transition ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <div className="text-[12px] font-bold leading-tight text-black">{it.title}</div>
                    <div className="mt-1.5 text-[13px] font-extrabold text-[#4a90c8]">{it.price}</div>
                    <div className="text-[10px] text-gray-500">{it.by}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-20 right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-[#4a90c8] text-white shadow-[0_10px_24px_-6px_rgba(74,144,200,0.6)]"
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  );
}

export function ProfileScreen({ d, demoLang, setDemoLang }: { d: DemoDict; demoLang: "fr" | "en"; setDemoLang: (l: "fr" | "en") => void }) {
  const [bio, setBio] = useState(true);
  const [langSheet, setLangSheet] = useState(false);
  const isFr = demoLang === "fr";
  const sheetTitle = isFr ? "Choisir la langue" : "Choose language";
  const frLabel = isFr ? "Français" : "French";
  const frSub = isFr ? "Langue française" : "French language";
  const enLabel = "English";
  const enSub = isFr ? "Langue anglaise" : "English language";
  return (
    <div className="relative h-[calc(100%-28px)] overflow-hidden">
      <div className={`h-full overflow-y-auto pb-24 transition ${langSheet ? "pointer-events-none brightness-50" : ""}`}>
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
          <span className="text-[20px] font-extrabold text-black">{d.profileTitle}</span>
          <Settings className="h-5 w-5 text-gray-700" />
        </div>
        <div className="m-3 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces" alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-blue-300" />
          <div>
            <div className="text-[15px] font-extrabold text-black">{d.userName}</div>
            <div className="text-[12px] text-gray-500">{d.userMeta}</div>
          </div>
        </div>
        <div className="mx-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {[
            { onClick: () => {}, icon: <MessageSquare className="h-5 w-5 text-gray-600" />, label: d.messages, right: <ChevronRight className="h-4 w-4 text-gray-400" /> },
            { onClick: () => setBio(!bio), icon: <Shield className="h-5 w-5 text-gray-600" />, label: d.biometric, right: (
              <div className={`h-6 w-11 rounded-full p-0.5 transition ${bio ? "bg-green-500" : "bg-gray-300"}`}>
                <div className={`h-5 w-5 rounded-full bg-white shadow transition ${bio ? "translate-x-5" : ""}`} />
              </div>
            )},
            { onClick: () => {}, icon: <Moon className="h-5 w-5 text-gray-600" />, label: d.darkMode, right: <ChevronRight className="h-4 w-4 text-gray-400" /> },
            { onClick: () => setLangSheet(true), icon: <Globe className="h-5 w-5 text-gray-600" />, label: d.language, right: <span className="flex items-center gap-1 text-[12px] font-bold text-gray-500">{isFr ? "FR" : "EN"} <ChevronRight className="h-4 w-4" /></span> },
          ].map((row, i, arr) => (
            <button key={row.label} onClick={row.onClick} className={`flex w-full items-center justify-between px-4 py-3.5 text-left ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="flex items-center gap-3">{row.icon}<span className="text-[14px] font-bold text-black">{row.label}</span></div>
              {row.right}
            </button>
          ))}
        </div>
        <button className="mx-3 mt-4 w-[calc(100%-1.5rem)] rounded-2xl border-2 border-red-400 bg-white py-3 text-[15px] font-bold text-red-500 active:scale-[0.98]">{d.logOut}</button>
      </div>

      <AnimatePresence>
        {langSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setLangSheet(false)}
              className="absolute inset-0 z-30 bg-black/40"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute bottom-0 left-0 right-0 z-40 rounded-t-3xl bg-white p-5 pb-8 shadow-2xl"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" />
              <div className="text-center text-[17px] font-extrabold text-black">{sheetTitle}</div>
              <div className="mt-5 space-y-2.5">
                {[
                  { code: "fr" as const, flag: "🇫🇷", label: frLabel, sub: frSub },
                  { code: "en" as const, flag: "🇬🇧", label: enLabel, sub: enSub },
                ].map((opt) => {
                  const selected = demoLang === opt.code;
                  return (
                    <button
                      key={opt.code}
                      onClick={() => { setDemoLang(opt.code); setLangSheet(false); }}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${selected ? "border-[#4a90c8] bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <span className="text-2xl leading-none">{opt.flag}</span>
                      <div className="flex-1">
                        <div className="text-[15px] font-extrabold text-black">{opt.label}</div>
                        <div className="text-[12px] text-gray-500">{opt.sub}</div>
                      </div>
                      {selected && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4a90c8] text-white">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function BottomTabs({ active, onChange, d }: { active: ScreenId; onChange: (s: ScreenId) => void; d: DemoDict }) {
  const tabs: { id: ScreenId; icon: React.ReactNode; label: string }[] = [
    { id: "home", icon: <Home className="h-[18px] w-[18px]" />, label: d.tabs.home },
    { id: "community", icon: <UsersIcon className="h-[18px] w-[18px]" />, label: d.tabs.communities },
    { id: "voting", icon: <BarChart3 className="h-[18px] w-[18px]" />, label: d.tabs.voting },
    { id: "marketplace", icon: <LayoutGrid className="h-[18px] w-[18px]" />, label: d.tabs.marketplace },
    { id: "profile", icon: <UserIcon className="h-[18px] w-[18px]" />, label: d.tabs.profile },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-gray-100 bg-white/95 px-2 pb-3 pt-2 backdrop-blur">
      <div className="grid grid-cols-5">
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className="relative flex flex-col items-center gap-1 py-1"
            >
              {isActive && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute -top-2 h-[3px] w-7 rounded-full bg-[#4a90c8]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <motion.span
                animate={{ scale: isActive ? 1.1 : 1, color: isActive ? "#4a90c8" : "#9ca3af" }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex items-center justify-center"
              >
                {t.icon}
              </motion.span>
              <span className={`text-[10px] font-bold tracking-tight transition-colors ${isActive ? "text-[#4a90c8]" : "text-gray-400"}`}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function InteractiveDemo() {
  const { lang, setLang } = useI18n();
  const d = lang === "fr" ? demoFr : demoEn;
  const [screen, setScreen] = useState<ScreenId>("login");

  return (
    <section id="demo" className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/80 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold-gradient">{d.sectionEyebrow}</div>
        <h2 className="mt-3 text-balance text-4xl font-extrabold leading-tight md:text-5xl">
          {d.sectionTitle1} <span className="text-gold-gradient">{d.sectionTitleGold}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{d.sectionSub}</p>

        <div className="mt-6 flex justify-center">
          <div role="tablist" aria-label="Demo language" className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                role="tab"
                aria-selected={lang === l}
                onClick={() => setLang(l)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  lang === l ? "btn-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l === "fr" ? "Français" : "English"}
              </button>
            ))}
          </div>
        </div>

        {/* External tab switcher — above phones */}
        <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-2">
              {(
                [
                  { id: "home" as ScreenId, icon: <Home className="h-4 w-4" />, label: d.tabs.home },
                  { id: "community" as ScreenId, icon: <UsersIcon className="h-4 w-4" />, label: d.tabs.communities },
                  { id: "voting" as ScreenId, icon: <BarChart3 className="h-4 w-4" />, label: d.tabs.voting },
                  { id: "marketplace" as ScreenId, icon: <LayoutGrid className="h-4 w-4" />, label: d.tabs.marketplace },
                  { id: "profile" as ScreenId, icon: <UserIcon className="h-4 w-4" />, label: d.tabs.profile },
                ] as { id: ScreenId; icon: React.ReactNode; label: string }[]
              ).map((t) => {
                const isActive = screen === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setScreen(t.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold transition-all border ${
                      isActive
                        ? "border-[#4a90c8] bg-[#4a90c8]/10 text-[#4a90c8] shadow-sm"
                        : "border-[#4a90c8]/30 bg-[#4a90c8]/5 text-[#4a90c8]/60 hover:border-[#4a90c8]/60 hover:text-[#4a90c8]"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-center text-[13px] text-muted-foreground">{d.sectionSub}</p>
          </div>

        <div className="mt-10 flex items-end justify-center gap-2 lg:gap-6 overflow-hidden">
          {/* Left side mockup */}
          <div className="pointer-events-none hidden lg:block" aria-hidden="true">
            <div style={{ transform: "scale(0.72) rotate(-6deg)", transformOrigin: "bottom right" }} className="opacity-75">
              <PhoneFrame>
                <HomeScreen d={d} />
                <BottomTabs active="home" onChange={() => {}} d={d} />
              </PhoneFrame>
            </div>
          </div>

          {/* Center: interactive phone */}
          <div className="interactive-demo-phone w-full max-w-[340px] shrink-0">
          <PhoneFrame>
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
                className="h-full"
              >
                {screen === "login" && <LoginScreen d={d} onLogin={() => setScreen("home")} />}
                {screen === "home" && <HomeScreen d={d} />}
                {screen === "community" && <CommunityScreen d={d} />}
                {screen === "voting" && <VotingScreen d={d} />}
                {screen === "marketplace" && <MarketplaceScreen d={d} />}
                {screen === "profile" && <ProfileScreen d={d} demoLang={lang} setDemoLang={setLang} />}
              </motion.div>
            </AnimatePresence>
            {screen !== "login" && <BottomTabs active={screen} onChange={setScreen} d={d} />}
          </PhoneFrame>
          </div>

          {/* Right side mockup */}
          <div className="pointer-events-none hidden lg:block" aria-hidden="true">
            <div style={{ transform: "scale(0.72) rotate(6deg)", transformOrigin: "bottom left" }} className="opacity-75">
              <PhoneFrame>
                <VotingScreen d={d} />
                <BottomTabs active="voting" onChange={() => {}} d={d} />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
