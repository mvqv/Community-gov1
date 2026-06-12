import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Play,
  Check,
  Footprints,
  Brush,
  Smartphone,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Volume2,
  Maximize2,
  MoreVertical,
  Users,
  Vote,
  MapPin,
  BarChart3,
  Bell,
  MessageSquare,
} from "lucide-react";

import heroPortrait from "@/assets/hero-portrait.jpg";
import phoneFeed from "@/assets/phone-feed.png";
import phoneVote from "@/assets/phone-vote.png";
import phoneBudget from "@/assets/phone-budget.png";
import closerVote from "@/assets/closer-vote.jpg";
import closerCommunity from "@/assets/closer-community.jpg";
import closerReport from "@/assets/closer-report.jpg";
import ecosystemBg from "@/assets/ecosystem-bg.jpg";
import ctaBg from "@/assets/cta-bg.jpg";
import testimonialsBg from "@/assets/testimonials-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import logoSvg from "@/assets/logo.svg";
import { useI18n, type Lang } from "@/lib/i18n";
import InteractiveDemo, {
  PhoneFrame,
  HomeScreen,
  CommunityScreen,
  VotingScreen,
  MarketplaceScreen,
  ProfileScreen,
  demoFr,
  demoEn,
} from "@/components/InteractiveDemo";

function CursorPointer({ color, name }: { color: string; name: string }) {
  return (
    <div className="relative">
      <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
        <path d="M5 3 L5 19 L9.5 15 L12 21 L14.5 20 L12 14 L18 14 Z" fill={color} stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span
        className="absolute left-5 top-5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md"
        style={{ background: color }}
      >
        {name}
      </span>
    </div>
  );
}

function MiniPhone({
  children,
  scale: desktopScale = 0.78,
  cropRatio = 0.55,
  cursors = [],
}: {
  children: React.ReactNode;
  scale?: number;
  cropRatio?: number;
  cursors?: { color: string; name: string; path: { x: number; y: number }[]; delay?: number }[];
}) {
  const phoneW = 340;
  const phoneH = 728;
  const wrapRef = useRef<HTMLDivElement>(null);

  // Start with the desktop scale — the CSS media query will cap container width
  // so ResizeObserver will settle at the correct value after first paint.
  // We seed with desktopScale so the initial paint dimensions are already correct
  // for desktop (no shift there). On mobile the CSS cap kicks in synchronously
  // via ResizeObserver on the first update call inside useEffect.
  const [actualScale, setActualScale] = useState(desktopScale);

  // We track the last container width we saw so we skip unnecessary re-renders.
  const lastWidth = useRef<number>(-1);

  useEffect(() => {
    const el = wrapRef.current?.parentElement;
    if (!el) return;
    const update = () => {
      const maxW = Math.min(el.clientWidth, phoneW * desktopScale);
      const next = Math.max(maxW / phoneW, 0.3);
      if (Math.abs(next - (lastWidth.current)) > 0.001) {
        lastWidth.current = next;
        setActualScale(next);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktopScale]);

  // Full visual height of scaled phone
  const visW = phoneW * actualScale;
  const visH = phoneH * actualScale;
  // How much we actually show (crop from bottom via container height)
  const showH = visH * cropRatio;

  return (
    // Container: aspect-ratio reserves space correctly from first paint.
    // width is still JS-driven (caps to card width) but height follows proportionally
    // via aspect-ratio, so no CLS on resize — just a proportional reflow.
    <div
      ref={wrapRef}
      style={{
        width: visW,
        // Use aspect-ratio instead of a hard height so the browser reserves space
        // from the initial paint without waiting for ResizeObserver to fire.
        aspectRatio: `${phoneW} / ${phoneH * cropRatio}`,
        contain: "layout",
      }}
      className="mini-phone-wrap relative mx-auto select-none pointer-events-none overflow-hidden"
    >
      {/*
        The phone is 340px wide in layout. We scale it visually with transform.
        transform: scale does NOT affect layout — the element still occupies 340×728 in layout.
        We shift it left by (340 - visW)/2 so it centres inside visW container.
        The container overflow:hidden then clips it at showH.
      */}
      <div
        style={{
          width: phoneW,
          height: phoneH,
          transform: `scale(${actualScale})`,
          transformOrigin: "top center",
          position: "relative",
          left: "50%",
          marginLeft: `-${phoneW / 2}px`,
          flexShrink: 0,
        }}
      >
        <PhoneFrame>{children}</PhoneFrame>
      </div>

      {/* Animated cursors — in visual coordinate space */}
      {cursors.map((c, i) => {
        const xs = c.path.map((p) => p.x * visW);
        const ys = c.path.map((p) => p.y * showH);
        return (
          <motion.div
            key={i}
            className="absolute z-30"
            initial={{ x: xs[0], y: ys[0], opacity: 0 }}
            animate={{
              x: [...xs, xs[0]],
              y: [...ys, ys[0]],
              opacity: [0, 1, 1, 1, 1, 0.9],
            }}
            transition={{
              duration: 6 + i * 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: c.delay ?? i * 0.6,
            }}
          >
            <CursorPointer color={c.color} name={c.name} />
          </motion.div>
        );
      })}

      {/* Soft bottom fade — masks the crop edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: "30%", background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.08))" }}
      />
    </div>
  );
}

const DEMO_CURSORS_A = [
  { color: "#ff5b8a", name: "Anna", path: [{ x: 0.3, y: 0.35 }, { x: 0.65, y: 0.5 }, { x: 0.5, y: 0.7 }] },
  { color: "#3b82f6", name: "Marc", path: [{ x: 0.7, y: 0.25 }, { x: 0.35, y: 0.55 }, { x: 0.6, y: 0.8 }], delay: 1.2 },
];
const DEMO_CURSORS_B = [
  { color: "#10b981", name: "Léa", path: [{ x: 0.4, y: 0.4 }, { x: 0.7, y: 0.6 }, { x: 0.3, y: 0.75 }] },
  { color: "#f59e0b", name: "Tom", path: [{ x: 0.6, y: 0.3 }, { x: 0.4, y: 0.65 }, { x: 0.7, y: 0.85 }], delay: 1.5 },
];
const DEMO_CURSORS_C = [
  { color: "#8b5cf6", name: "Sara", path: [{ x: 0.5, y: 0.3 }, { x: 0.3, y: 0.55 }, { x: 0.65, y: 0.75 }] },
  { color: "#ef4444", name: "Jonas", path: [{ x: 0.7, y: 0.45 }, { x: 0.4, y: 0.7 }, { x: 0.55, y: 0.85 }], delay: 1.8 },
  { color: "#06b6d4", name: "Mia", path: [{ x: 0.3, y: 0.4 }, { x: 0.6, y: 0.6 }, { x: 0.5, y: 0.8 }], delay: 0.8 },
];

export const Route = createFileRoute("/")({ component: Landing });

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0, noAnimation = false }: { children: React.ReactNode; className?: string; delay?: number; noAnimation?: boolean }) {
  if (noAnimation) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- SCROLL REVEAL HOOK ---------- */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const children = el.querySelectorAll(
      ".reveal-card, .reveal-left, .reveal-right, .reveal-phone, .reveal-up"
    );
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* Global reveal — только observer, без wheel hijacking */
function useGlobalReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );

    // Use rAF so DOM is painted before we start observing.
    // This prevents above-the-fold elements from briefly showing as invisible.
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll(
        ".reveal-card, .reveal-left, .reveal-right, .reveal-phone, .reveal-up"
      ).forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);
}

function Landing() {
  useGlobalReveal();
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground antialiased">
      <Header />
      <Hero />
      <Statement />
      <CloudDivider />
      <Bento />
      <InteractiveDemo />
      <SocialProof />
      <Closer />
      <CloudDivider />
      <FAQ />
      <CloudDivider />
      <Footer />
    </main>
  );
}

/* ============ LOGO ============ */
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="relative inline-grid place-items-center overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #f7c97e 0%, #e8885a 50%, #c4553a 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2), 0 2px 8px -2px rgba(196,85,58,0.5)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" width={size * 0.55} height={size * 0.55} fill="none">
        <path
          d="M6 18 Q10 10, 14 14 T22 12 T28 16"
          stroke="#1a1a1a"
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}


/* ============ HEADER ============ */
function LangSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full bg-black/5 p-0.5 text-[10px] font-bold uppercase">
      {(["fr", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2 py-1 transition ${lang === l ? "bg-ink text-white" : "text-ink/55 hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#", label: "Accueil" },
    { href: "#cases", label: t.nav.cases },
    { href: "#inside", label: t.nav.inside },
    { href: "#numbers", label: t.nav.numbers },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center px-4 sm:px-6">

        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center gap-2">
          <img src={logoSvg} alt="Community" className="h-5 w-5 shrink-0" />
          <span className="font-display text-[15px] font-extrabold tracking-tight text-ink">
            Community
          </span>
        </a>

        {/* Nav — center, desktop only */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="whitespace-nowrap rounded-md px-3.5 py-1.5 text-[13px] text-ink/60 transition hover:bg-black/[0.04] hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LangSwitcher />

          <a
            href="#demo"
            className="ml-1 hidden xs:inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-ink/85"
          >
            <span className="relative grid h-1.5 w-1.5 shrink-0 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {t.nav.demo}
          </a>

          {/* Burger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-1 grid h-8 w-8 place-items-center rounded-md transition hover:bg-black/5 md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="h-4 w-4 text-ink" />
            ) : (
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-ink" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="2" y1="5" x2="18" y2="5" />
                <line x1="2" y1="10" x2="18" y2="10" />
                <line x1="2" y1="15" x2="18" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[-1] md:hidden" onClick={() => setMenuOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-black/[0.06] bg-white md:hidden"
          >
            {[...navLinks].map((l, i, arr) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-6 py-3.5 text-[15px] font-medium text-ink transition hover:bg-black/[0.03] border-b border-black/[0.05]`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setMenuOpen(false)}
              className="mx-4 my-3 flex items-center justify-center rounded-lg bg-ink px-4 py-3 text-[14px] font-semibold text-white"
            >
              {t.nav.demo}
            </a>
          </motion.div>
        </>
      )}
    </header>
  );
}

/* ============ HERO ============ */
function MobileHeroPhone() {
  const { lang } = useI18n();
  const d = lang === "fr" ? demoFr : demoEn;
  const wrapRef = useRef<HTMLDivElement>(null);
  const phoneW = 340;
  const phoneH = 728;

  // Derive initial scale from a CSS clamp equivalent — avoids layout shift on mount.
  // We cap at 300px wide (mobile-hero-phone-wrap CSS) → scale = 300/340 ≈ 0.882
  // The ResizeObserver will correct on first paint, but the initial value is already close.
  const [scale, setScale] = useState(() => Math.min(300 / phoneW, 1));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(Math.min(w / phoneW, 1));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="mobile-hero-phone-wrap w-full max-w-[340px] mx-auto relative mt-8"
      style={{
        // aspect-ratio reserves correct height from first paint.
        // 340:728 is the phone's native ratio.
        aspectRatio: "340 / 728",
        contain: "layout",
      }}
    >
      <div
        className="pointer-events-none select-none absolute top-0 left-1/2"
        style={{
          width: phoneW,
          height: phoneH,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          marginLeft: -phoneW / 2,
        }}
      >
        <PhoneFrame><HomeScreen d={d} /></PhoneFrame>
      </div>
      {/* bottom fade into page background */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: "38%", background: "linear-gradient(to bottom, transparent, var(--color-background))" }}
      />
    </div>
  );
}

function Hero() {
  const { t, lang } = useI18n();
  const d = lang === "fr" ? demoFr : demoEn;

  return (
    <section className="overflow-hidden bg-background pt-14">
      {/* Text */}
      <div className="mx-auto max-w-[620px] px-6 pt-12 text-center">
        <Reveal noAnimation>
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-ink/35">
            {lang === "fr" ? "Informer · Décider · Agir" : "Inform · Decide · Act"}
          </p>
        </Reveal>
        <Reveal delay={0.06} noAnimation>
          <h1 className="hero-h1 mt-3 font-display text-[52px] sm:text-[62px] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
            {t.hero.title[0]} <span className="inline-flex h-[0.78em] w-[0.78em] items-center justify-center rounded-[0.15em] bg-[#b88c14] align-middle">
              <img src={logoSvg} alt="" className="h-[60%] w-[60%] object-contain brightness-0 invert" />
            </span><br />{t.hero.title[1]}
          </h1>
        </Reveal>
        <Reveal delay={0.12} noAnimation>
          <p className="mt-4 mx-auto max-w-[380px] text-[14px] leading-relaxed text-ink/45">
            {t.hero.sub}
          </p>
        </Reveal>
      </div>

      {/* Big bg box — desktop */}
      <div className="hidden md:block mt-10 mx-auto max-w-[980px] px-6 pb-0" style={{ paddingTop: 90 }}>
        {/*
          overflow-hidden is on the parent <section> — so the phone can stick
          out above the rounded box while still being visible, and the rounded
          box clips only at its own border-radius.
        */}
        <div
          className="relative rounded-[28px] shadow-[0_24px_80px_-16px_rgba(0,0,0,0.20)]"
          style={{ height: 370 }}
        >
          {/* BG photo — African savanna landscape */}
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&h=800&fit=crop&q=85"
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
            />
          </div>

          {/* LEFT card */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-[210px]">
            <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.16)]">
              <img
                src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&h=200&fit=crop&crop=faces"
                alt=""
                className="h-28 w-full object-cover"
              />
              <div className="flex h-[148px] flex-col justify-between p-4">
                <p className="text-[15px] font-semibold leading-tight text-ink">
                  {lang === "fr" ? "Nous savons ce dont vous avez besoin" : "We Know What You Need"}
                </p>
                <div>
                  <div className="flex items-center">
                    {[
                      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=faces",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
                    ].map((url, i) => (
                      <img key={i} src={url} alt="" className="h-7 w-7 rounded-full object-cover ring-2 ring-white" style={{ marginLeft: i > 0 ? -8 : 0 }} />
                    ))}
                    <span className="ml-2 text-[11px] font-semibold text-ink/50">+25K</span>
                  </div>
                  <a
                    href="#cases"
                    className="mt-2.5 inline-flex items-center rounded-xl bg-ink px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-ink/80"
                  >
                    {t.hero.ctaPrimary}
                  </a>
                </div>
              </div>
            </div>
          </div>

            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none"
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none"
            style={{ top: -90 }}
          >
            <div style={{ width: 252, position: "relative", height: 580 }}>
              <div
                style={{
                  width: 340,
                  height: 728,
                  transform: "scale(0.74)",
                  transformOrigin: "top center",
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  marginLeft: -170,
                }}
              >
                <PhoneFrame><HomeScreen d={d} /></PhoneFrame>
              </div>
            </div>
          </div>

          {/* RIGHT card — Le Bazar */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-[210px]">
            <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.16)]">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=480&h=200&fit=crop&crop=faces"
                alt=""
                className="h-28 w-full object-cover"
              />
              <div className="flex h-[148px] flex-col justify-start p-4">
                <p className="text-[15px] font-semibold leading-tight text-ink">
                  {lang === "fr" ? "Le Bazar local" : "Local Marketplace"}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-ink/50">
                  {lang === "fr"
                    ? "Achetez et vendez entre voisins, instantanément."
                    : "Buy and sell with neighbors, instantly."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden mt-8 overflow-hidden">
        <MobileHeroPhone />
      </div>
    </section>
  );
}


function HeroPhone({ screen, mobile = false }: { screen: "home" | "voting" | "community"; mobile?: boolean }) {
  const { lang } = useI18n();
  const d = lang === "fr" ? demoFr : demoEn;
  const phoneW = 340;
  const phoneH = 728;
  const scale = mobile ? 0.82 : 0.95;
  const cropRatio = mobile ? 0.54 : 0.6;
  const visW = phoneW * scale;
  const visH = phoneH * scale * cropRatio;

  return (
    <div
      style={{ width: visW, height: visH }}
      className="relative mx-auto pointer-events-none select-none overflow-hidden"
    >
      {/* Phone centered via left:50% + marginLeft */}
      <div
        style={{
          width: phoneW,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          left: "50%",
          marginLeft: `-${phoneW / 2}px`,
        }}
      >
        <PhoneFrame>
          {screen === "home" && <HomeScreen d={d} />}
          {screen === "voting" && <VotingScreen d={d} />}
          {screen === "community" && <CommunityScreen d={d} />}
        </PhoneFrame>
      </div>
      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/20" />
    </div>
  );
}

/* ============ CLOUD DIVIDER ============ */
function CloudDivider() {
  return (
    <div
      className="pointer-events-none relative w-full overflow-hidden"
      style={{ height: "clamp(200px, 26vw, 380px)" }}
      aria-hidden
    >
      {/* Cloud photo — multiply blend removes the blue sky, only white clouds remain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=1800&q=80&auto=format&fit=crop")`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          mixBlendMode: "multiply",
          opacity: 0.18,
        }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "40%",
          background: "linear-gradient(180deg, var(--color-background) 0%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "50%",
          background: "linear-gradient(180deg, transparent 0%, var(--color-background) 100%)",
        }}
      />
    </div>
  );
}

/* ============ STATEMENT ============ */
function Statement() {
  const { t } = useI18n();
  const containerRef = useScrollReveal();
  return (
    <section id="cases" className="relative overflow-hidden pt-16 pb-16 sm:pt-[200px] sm:pb-24 md:pt-[240px] md:pb-32">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-6 text-center" ref={containerRef}>
        <Reveal>
          <h2 className="statement-h2 mx-auto max-w-[22ch] font-display text-[22px] sm:text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[40px]">
            {t.statement.pre}{" "}
            <InlineFace />{" "}
            {t.statement.line2a}{" "}
            {t.statement.line2b}
            <br className="hidden md:block" />
            {" "}{t.statement.line3a}{" "}
            <InlineWeather />{" "}
            {t.statement.line3b}
          </h2>
        </Reveal>

        <div className="reveal-scale"><MockupShowcase /></div>

        <Reveal delay={0.15}>
          <p className="mt-14 sm:mt-20 text-[13px] text-ink/55">{t.statement.used}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {t.statement.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-black/[0.06] px-4 py-2 text-[12px] font-medium text-ink">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Mockup Showcase: real demo phone in center + 2 marquee rows ---- */
function MockupShowcase() {
  const { lang } = useI18n();
  const d = lang === "fr" ? demoFr : demoEn;

  const topRow = [
    { img: closerVote, label: lang === "fr" ? "Votes citoyens" : "Citizen votes" },
    { icon: Users, label: lang === "fr" ? "Communauté locale" : "Local community", bg: "bg-leaf", fg: "text-white" },
    { img: closerCommunity, label: lang === "fr" ? "Événements quartier" : "Neighborhood events" },
    { icon: Vote, label: lang === "fr" ? "Budget participatif" : "Participatory budget", bg: "bg-orange", fg: "text-white" },
    { img: closerReport, label: lang === "fr" ? "Signalements" : "Reports" },
    { icon: MapPin, label: lang === "fr" ? "Quartier en direct" : "Neighborhood live", bg: "bg-rose-500", fg: "text-white" },
  ];
  const bottomRow = [
    { icon: BarChart3, label: lang === "fr" ? "Décisions transparentes" : "Transparent decisions", bg: "bg-ink", fg: "text-white" },
    { img: closerCommunity, label: lang === "fr" ? "Voisins actifs" : "Active neighbors" },
    { icon: Bell, label: lang === "fr" ? "Alertes utiles" : "Useful alerts", bg: "bg-amber-400", fg: "text-ink" },
    { img: closerReport, label: lang === "fr" ? "Voir les actions" : "See actions" },
    { icon: MessageSquare, label: lang === "fr" ? "Discussions calmes" : "Calm discussions", bg: "bg-sky-500", fg: "text-white" },
    { img: closerVote, label: lang === "fr" ? "Participation réelle" : "Real participation" },
  ];

  return (
    <div className="mockup-showcase relative mt-10 sm:mt-14 w-full overflow-hidden" style={{ height: "clamp(300px, 55vw, 720px)" }}>
      {/* Marquee rows */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex w-full -translate-y-[calc(100%+12px)]">
        <div className="marquee-left flex w-max gap-3 sm:gap-5 pr-3 sm:pr-5">
          {[...topRow, ...topRow].map((c, i) => (
            <div key={`t-${i}`} className="scale-75 sm:scale-100">
              <ShowcaseCard {...c} />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex w-full translate-y-[12px]">
        <div className="marquee-right flex w-max gap-3 sm:gap-5 pr-3 sm:pr-5">
          {[...bottomRow, ...bottomRow].map((c, i) => (
            <div key={`b-${i}`} className="scale-75 sm:scale-100">
              <ShowcaseCard {...c} />
            </div>
          ))}
        </div>
      </div>

      {/* Soft side fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-16 sm:w-24 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-16 sm:w-24 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent" />

      {/* Center halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[500px] w-[500px] sm:h-[680px] sm:w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--background)_0%,var(--background)_32%,transparent_72%)]" />

      {/* Phone in center — smaller on mobile */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 float-y showcase-phone-size"
        style={{ transform: "translate(-50%, -50%) scale(0.55)", transformOrigin: "center" }}
      >
        <style>{`
          @media (min-width: 640px) {
            .showcase-phone-size { transform: translate(-50%, -50%) scale(0.75) !important; }
          }
          @media (min-width: 768px) {
            .showcase-phone-size { transform: translate(-50%, -50%) scale(0.85) !important; }
          }
        `}</style>
        <PhoneFrame><HomeScreen d={d} /></PhoneFrame>
      </div>
    </div>
  );
}

function ShowcaseCard({
  img,
  icon: Icon,
  label,
  bg,
  fg,
}: {
  img?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  bg?: string;
  fg?: string;
}) {
  return (
    <div className="relative flex h-[170px] w-[230px] shrink-0 flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_22px_50px_-25px_rgba(0,0,0,0.28),0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
      {img ? (
        <>
          <img src={img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <span className="absolute bottom-3 left-4 right-4 text-left text-[13px] font-semibold leading-tight text-white drop-shadow">
            {label}
          </span>
        </>
      ) : Icon ? (
        <div className="flex h-full w-full flex-col items-start justify-between p-4">
          <span className={`grid h-14 w-14 place-items-center rounded-2xl ${bg ?? "bg-ink"} ${fg ?? "text-white"} shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)]`}>
            <Icon className="h-7 w-7" strokeWidth={2.2} />
          </span>
          <span className="text-left text-[14px] font-semibold leading-tight text-ink">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}



function InlineFace() {
  const faces = [
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % faces.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.1em] w-[2em] -translate-y-[0.02em] items-center justify-center overflow-hidden rounded-full bg-rose-200 align-middle ring-2 ring-rose-200/50">
      {faces.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
          style={{
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "scale(1)" : "scale(1.15)",
          }}
        />
      ))}
    </span>
  );
}
function InlineWeather() {
  const items = ["⛅", "☀️", "🌤️", "🌧️", "🌙", "🌈", "❄️", "🌦️"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.1em] w-[2em] -translate-y-[0.02em] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-300 to-amber-200 align-middle">
      {items.map((f, idx) => (
        <span
          key={idx}
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-[0.78em] leading-none transition-all duration-500"
          style={{
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "translateY(0) scale(1)" : "translateY(40%) scale(0.7)",
          }}
        >
          {f}
        </span>
      ))}
    </span>
  );
}

/* ============ BENTO ============ */
function Bento() {
  const { t } = useI18n();
  const containerRef = useScrollReveal();

  return (
    <section id="inside" className="relative overflow-hidden bg-background pb-16 sm:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6" ref={containerRef}>
        <Reveal>
          <span className="inline-block rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-black/5">
            {t.bento.kicker}
          </span>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[26px] sm:text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink lg:text-[40px]">
              {t.bento.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-2 lg:pl-12">
            <p className="max-w-md text-[14px] leading-relaxed text-ink/60 lg:ml-auto">{t.bento.sub}</p>
          </Reveal>
        </div>

        {/* Row 1: streak rules + smart planner */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="reveal-card reveal-delay-1"><StreakCard /></div>
          <div className="reveal-card reveal-delay-2"><PlannerCard /></div>
        </div>

        {/* Row 2: wide routine stacks */}
        <div className="mt-5">
          <div className="reveal-card reveal-delay-1"><StacksCard /></div>
        </div>

        {/* Row 3: weekly + reminders */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="reveal-card reveal-delay-1"><WeeklyCard /></div>
          <div className="reveal-card reveal-delay-2"><RemindersCard /></div>
        </div>
      </div>
    </section>
  );
}

function StreakCard() {
  const { t, lang } = useI18n();
  const s = t.bento.streak;
  const d = lang === "fr" ? demoFr : demoEn;
  return (
    <div className="card-soft relative flex flex-col p-5 sm:p-8 overflow-hidden" style={{ minHeight: 540 }}>
      <h3 className="font-display text-[17px] sm:text-[19px] font-semibold text-ink">{s.title}</h3>
      <p className="mt-2 max-w-md text-[12px] sm:text-[13px] text-ink/55">{s.body}</p>
      <div className="mt-5 sm:mt-7 flex flex-1 flex-col items-center justify-end">
        <MiniPhone scale={0.85} cropRatio={0.5} cursors={DEMO_CURSORS_A}>
          <VotingScreen d={d} />
        </MiniPhone>
        <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-2">
          {s.chips.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-medium text-ink shadow-sm ring-1 ring-black/5">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-orange" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlannerCard() {
  const { t, lang } = useI18n();
  const p = t.bento.planner;
  const d = lang === "fr" ? demoFr : demoEn;
  return (
    <div className="card-leaf relative flex flex-col p-5 sm:p-8 overflow-hidden" style={{ minHeight: 540 }}>
      <img src={ecosystemBg} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay" />
      <h3 className="relative font-display text-[17px] sm:text-[19px] font-semibold text-white">{p.title}</h3>
      <p className="relative mt-2 max-w-md text-[12px] sm:text-[13px] text-white/70">{p.body}</p>
      <div className="relative mt-5 sm:mt-7 flex flex-1 items-end justify-center">
        <MiniPhone scale={0.85} cropRatio={0.5} cursors={DEMO_CURSORS_B}>
          <HomeScreen d={d} />
        </MiniPhone>
      </div>
    </div>
  );
}

function StacksCard() {
  const { t, lang } = useI18n();
  const s = t.bento.stacks;
  const d = lang === "fr" ? demoFr : demoEn;
  return (
    <div className="card-ink relative grid grid-cols-1 overflow-hidden lg:grid-cols-5">
      {/* Full-card background photo */}
      <img src={ctaBg} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay" />

      {/* Left text + cta */}
      <div className="relative p-5 sm:p-8 lg:col-span-2 lg:p-10">
        <h3 className="font-display text-[17px] sm:text-[19px] lg:text-[21px] font-semibold text-white">{s.title}</h3>
        <p className="mt-3 max-w-sm text-[12px] sm:text-[13px] text-white/65">{s.body}</p>
        <button className="mt-5 sm:mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:scale-[1.02]">
          {s.cta}
        </button>
        <div className="mt-4 text-[11px] text-white/40 lg:absolute lg:bottom-6 lg:left-10 lg:mt-0">{s.footnote}</div>
      </div>

      {/* Right: real Community screen mockup */}
      <div className="stacks-phone-col relative min-h-[280px] sm:min-h-[320px] lg:min-h-[420px] overflow-hidden lg:col-span-3">
        <div className="relative flex h-full items-center justify-center p-4 sm:p-6">
          <MiniPhone scale={0.9} cropRatio={0.55} cursors={DEMO_CURSORS_C}>
            <CommunityScreen d={d} />
          </MiniPhone>
        </div>
      </div>
    </div>
  );
}

function WeeklyCard() {
  const { t, lang } = useI18n();
  const w = t.bento.weekly;
  const d = lang === "fr" ? demoFr : demoEn;
  return (
    <div className="card-ink relative overflow-hidden p-5 sm:p-8">
      <img src={testimonialsBg} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay" />
      <h3 className="relative font-display text-[17px] sm:text-[19px] font-semibold text-white">{w.title}</h3>
      <p className="relative mt-2 max-w-md text-[12px] sm:text-[13px] text-white/65">{w.body}</p>
      <div className="relative mt-5 sm:mt-6 flex justify-center">
        <MiniPhone scale={0.85} cropRatio={0.5} cursors={DEMO_CURSORS_A}>
          <ProfileScreen d={d} demoLang={lang === "fr" ? "fr" : "en"} setDemoLang={() => {}} />
        </MiniPhone>
      </div>
    </div>
  );
}

function Ring({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 36, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="40" cy="40" r={r} stroke={color} strokeWidth="6" fill="none"
            strokeLinecap="round" strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[13px] font-bold text-white">{value}%</span>
      </div>
      <span className="text-[10px] text-white/65">{label}</span>
    </div>
  );
}

function RemindersCard() {
  const { t, lang } = useI18n();
  const r = t.bento.reminders;
  const d = lang === "fr" ? demoFr : demoEn;
  return (
    <div className="card-ink relative overflow-hidden p-5 sm:p-8">
      <img src={heroBg} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay" />
      <h3 className="relative font-display text-[17px] sm:text-[19px] font-semibold text-white">{r.title}</h3>
      <p className="relative mt-2 max-w-md text-[12px] sm:text-[13px] text-white/65">{r.body}</p>
      <div className="relative mt-5 sm:mt-6 flex justify-center">
        <MiniPhone scale={0.85} cropRatio={0.5} cursors={DEMO_CURSORS_B}>
          <MarketplaceScreen d={d} />
        </MiniPhone>
      </div>
    </div>
  );
}

/* ============ SOCIAL PROOF ============ */
const SOCIAL_PROOF_CARDS = [
  {
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=560&fit=crop&crop=faces",
    name: "Marie L.",
    role: "Habitante · Belleville",
    stat: "12 votes",
    text: "Enfin une app où mon vote compte vraiment.",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop&crop=faces",
    name: "Thomas B.",
    role: "Conseiller · Belleville",
    stat: "4 ans d'engagement",
    text: "Le fil d'actualités regroupe tout en un seul endroit.",
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=560&fit=crop&crop=faces",
    name: "Fatima O.",
    role: "Présidente d'asso",
    stat: "128 membres",
    text: "Notre groupe géré en 10 min depuis l'app.",
  },
  {
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=560&fit=crop&crop=faces",
    name: "Ingrid S.",
    role: "Mère de famille",
    stat: "Bazar local",
    text: "Vendu mon vélo et trouvé un prof — entre voisins.",
  },
  {
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&fit=crop&crop=faces",
    name: "Pierre G.",
    role: "Retraité actif",
    stat: "Budget clair",
    text: "Je comprends enfin où va le budget de mon quartier.",
  },
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=560&fit=crop&crop=faces",
    name: "Sofia N.",
    role: "Enseignante",
    stat: "Vote sécurisé",
    text: "Chaque vote vient d'un vrai habitant — ça change tout.",
  },
];

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=faces",
];

function SocialProof() {
  const { lang } = useI18n();
  const cards = [...SOCIAL_PROOF_CARDS, ...SOCIAL_PROOF_CARDS];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Header row */}
      <div className="mx-auto mb-10 flex max-w-[1200px] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-6">
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-[26px] sm:text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink lg:text-[40px]">
            {lang === "fr"
              ? "Ce que les citoyens accomplissent avec Community"
              : "What citizens are achieving with Community"}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            {/* Stacked avatars */}
            <div className="flex items-center">
              {AVATAR_URLS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-background"
                  style={{ marginLeft: i === 0 ? 0 : -10, zIndex: AVATAR_URLS.length - i }}
                />
              ))}
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white ring-2 ring-background"
                style={{ marginLeft: -10 }}
              >
                +1k
              </div>
            </div>
            {/* Stars + label */}
            <div className="flex items-center gap-1.5">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="text-[12px] font-medium text-ink/60">
                {lang === "fr" ? "Plébiscité dans le monde entier" : "Trusted worldwide"}
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee — scrolls RIGHT (marquee-right animation) */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee-right flex w-max gap-4 py-2 pr-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className="relative flex h-[340px] w-[240px] shrink-0 flex-col overflow-hidden rounded-[24px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.32)]"
            >
              <img src={c.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Top badge */}
              <div className="relative p-4">
                <span className="inline-block rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {c.name}
                  <span className="ml-1 opacity-60">· {c.role}</span>
                </span>
              </div>
              {/* Bottom content */}
              <div className="relative mt-auto p-4">
                <p className="text-[22px] font-bold leading-none text-white">{c.stat}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-white/75">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CLOSER LOOK ============ */
function Closer() {
  const { t } = useI18n();
  const imgs = [closerVote, closerCommunity, closerReport];
  const containerRef = useScrollReveal();
  return (
    <section id="numbers" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6" ref={containerRef}>
        <div className="text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-black/5">
              {t.closer.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-[24px] sm:text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
              {t.closer.title[0]} <br className="hidden md:block" /> {t.closer.title[1]}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-5 inline-flex items-center gap-2 text-[12px] text-ink/65">
              <span className="font-bold text-ink">{t.closer.rating}</span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span>({t.closer.trusted})</span>
            </div>
          </Reveal>
        </div>

        {/* Video tiles */}
        <div className="mt-12 flex items-end justify-center gap-3 px-4 sm:px-0">
          {t.closer.videos.map((v, i) => {
            const isCenter = i === 1;
            return (
              <Reveal key={v.name} delay={0.1 * i} className={!isCenter ? "hidden sm:block" : ""}>
                <div className={`reveal-card reveal-delay-${i + 1}`}>
                  <div
                    className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black shadow-2xl${isCenter ? " closer-video-center" : ""}`}
                    style={{
                      width: isCenter ? "min(280px, 70vw)" : 200,
                      height: isCenter ? "min(420px, 105vw)" : 360,
                      filter: isCenter ? "none" : "blur(1.5px) brightness(0.95)",
                    }}
                  >
                    <img src={imgs[v.img]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1 text-white backdrop-blur">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[10px]">●</span>
                      <div className="text-left leading-tight">
                        <div className="text-[10px] font-bold">{v.name}</div>
                        <div className="text-[9px] opacity-75">{v.role}</div>
                      </div>
                    </div>
                    {isCenter && (
                      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/90 to-transparent px-3 pb-3 pt-8 text-white">
                        <Play className="h-3 w-3 fill-white" />
                        <span className="text-[10px]">0:00 / 0:15</span>
                        <div className="ml-1 h-0.5 flex-1 rounded bg-white/30"><div className="h-full w-1/3 rounded bg-white" /></div>
                        <Volume2 className="h-3 w-3" />
                        <Maximize2 className="h-3 w-3" />
                        <MoreVertical className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition hover:bg-black/5"><ChevronLeft className="h-4 w-4" /></button>
          <button className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition hover:bg-black/5"><ChevronRight className="h-4 w-4" /></button>
        </div>

        {/* Reviews masonry */}
        <ReviewsMasonry />

        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-semibold text-white">
            {t.closer.viewAll}
          </button>
        </div>
      </div>
    </section>
  );
}

function ReviewsMasonry() {
  const { t } = useI18n();

  // Real portrait photos matched to each reviewer
  const avatars = [
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces",
  ];

  return (
    <div className="mx-auto mt-12 max-w-[960px]">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {t.closer.reviews.map((r, i) => {
          return (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 * (i % 3), ease: EASE }}
              className="relative flex flex-col justify-between rounded-2xl p-5"
              style={{ background: "#efefef" }}
            >
              {/* Review text */}
              <p className="text-[13.5px] font-normal leading-snug text-ink/85">
                {r.text}
              </p>

              {/* Avatar + name */}
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={avatars[i % avatars.length]}
                  alt={r.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div>
                  <div className="text-[13px] font-bold leading-tight text-ink">
                    {r.name}
                  </div>
                  <div className="text-[11px] text-ink/50">{r.role}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM287.5 96.6c14.7-17.4 27-42.2 22.4-66.6-21.6.6-47.7 14.1-62.7 31.5-13.6 15.4-25.2 40.4-21.6 64.7 24.1 1.9 49-12.1 61.9-29.6z"/>
    </svg>
  );
}

function GooglePlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden fill="currentColor">
      <path d="M325.3 234.3 104.5 13l280.8 161-60 60.3z"/>
      <path d="M104.5 13C95.2 17.7 89 26.7 89 38.4v435.2c0 11.7 6.2 20.7 15.5 25.4l256.2-256L104.5 13z"/>
      <path d="M385.3 338 325.3 278l-220.8 221 280.8-161z"/>
      <path d="M470.1 226 385.4 177.6l-66.9 67.1 66.9 67.1 86.5-49.4c20.5-15.3 20.5-46.1-1.8-36.4z"/>
    </svg>
  );
}



/* ============ FAQ ============ */
function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const containerRef = useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-6" ref={containerRef}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">

          {/* Left col */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="inline-block rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-black/5">
                {t.faq.kicker}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[24px] sm:text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
                {t.faq.title}
              </h2>
            </Reveal>

            {/* Contact card */}
            <Reveal delay={0.1}>
              <div className="mt-2 rounded-2xl bg-[#f2f2f2] p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-orange text-white shadow-md">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="mb-4 text-[14px] font-semibold text-ink">{t.faq.contact}</p>
                <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-ink/85">
                  {t.faq.contactBtn}
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right col — accordion */}
          <div className="flex flex-col gap-2">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <div className="overflow-hidden rounded-2xl bg-[#f2f2f2]">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-black/[0.03]"
                    >
                      <span className="text-[14px] font-semibold text-ink">{item.q}</span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-ink/60 shadow-sm transition">
                        {isOpen
                          ? <X className="h-3 w-3" strokeWidth={2.5} />
                          : <span className="text-[16px] font-light leading-none">+</span>
                        }
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-5 pb-5 text-[13px] leading-relaxed text-ink/60">
                        {item.a}
                      </p>
                    </motion.div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-background pb-10 sm:pb-12 pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 pt-10 sm:pt-12">
          <div className="flex items-center gap-2">
            <img src={logoSvg} alt="Community logo" className="h-[22px] w-[22px] shrink-0" />
            <span className="font-display text-[15px] font-extrabold tracking-tight text-ink">Community</span>
          </div>
          <p className="text-[12px] text-ink/45 text-center sm:text-right">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
