"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Coins,
  Cpu,
  Gauge,
  Menu,
  Pause,
  Play,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { APP_SIGN_IN_URL } from "@/lib/config";
import { Logo } from "@/components/ui/Logo";
import { SupportingSections } from "./SupportingSections";
import { PreviewAccess } from "./PreviewAccess";
import { PlatformSupport } from "./PlatformSupport";
import styles from "./HeadquartersExperience.module.css";

const HeadquartersScene = dynamic(() => import("./HeadquartersScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});
const pillars = [
  {
    id: "discovery",
    name: "Discovery",
    icon: ScanSearch,
    question: "Which AI agents and apps are in use?",
    heading: "Keep an accountable register.",
    evidence: "AI Registry",
    description:
      "Discover supported AI apps on enrolled devices. Register AI agents and uses with a human owner, team and review date.",
    fields: [
      ["Team", "Customer Success"],
      ["Registry", "AI agent recorded"],
      ["Next review", "4 Dec"],
    ],
    detail:
      "Keep a record of the AI tools your organization is responsible for. Device discovery identifies supported installed apps; your team records the accountable human owner and review date.",
  },
  {
    id: "governance",
    name: "Governance",
    icon: SlidersHorizontal,
    question: "Which rules apply to each AI use?",
    heading: "Set the rules for AI use.",
    evidence: "Policies",
    description:
      "Apply website and AI app policies on supported devices. Give teams editable governance templates and clear boundaries for AI use.",
    fields: [
      ["Device group", "Customer Success"],
      ["Website policy", "Standard restrictions"],
      ["AI app policy", "Restricted apps"],
    ],
    detail:
      "Give teams a clear standard for AI use. Combine website and app policies on supported devices with editable governance templates to put those standards into practice.",
  },
  {
    id: "risk-security",
    name: "Risk & Security",
    icon: ShieldCheck,
    question: "What risks need attention?",
    heading: "Make risk reviewable.",
    evidence: "Risk & impact assessment",
    description:
      "Assess AI use cases, review Audit Trail activity and build transparency reports from the evidence in your registry and assessments.",
    fields: [
      ["Risk tier", "Medium"],
      ["Assessment", "Complete"],
      ["Transparency report", "Available"],
    ],
    detail:
      "Bring risk assessments, accountable ownership and supporting evidence together so reviewers can understand the risks and make confident decisions.",
  },
  {
    id: "ai-economics",
    name: "AI Economics",
    icon: Coins,
    question: "What does our AI workforce cost?",
    heading: "Account for AI spend.",
    evidence: "Recorded team spend",
    description:
      "Record AI expenses, review licences, estimate token costs and set budget alerts. Keep the costs of your AI workforce in view.",
    fields: [
      ["Team", "Customer Success"],
      ["Source", "AI expense register"],
      ["Scope", "Recorded team expenditure"],
    ],
    detail:
      "See where AI spending goes across your teams. Review subscriptions, licences and recorded usage expenses, and use token estimates to plan future costs.",
  },
  {
    id: "performance-value",
    name: "Performance & Value",
    icon: Gauge,
    question: "Which AI agents should we keep using?",
    heading: "Review continued use.",
    evidence: "My Digital Workforce",
    description:
      "Find ownership gaps and upcoming reviews. Use recorded costs and risk assessments to make informed decisions about continued use.",
    fields: [
      ["Next review", "4 Dec"],
      ["Human owner", "Assigned"],
      ["Review focus", "Evidence for continued use"],
    ],
    detail:
      "Use ownership, risk and cost evidence to decide where AI adds value and which uses deserve continued investment.",
  },
] as const;

function ScenePlaceholder() {
  return (
    <div className={styles.placeholder} aria-hidden="true">
      <div className={styles.placeholderTower}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ "--level": i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

export function HeadquartersExperience() {
  const [activePillar, setActivePillar] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [sceneStarted, setSceneStarted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const platformRef = useRef<HTMLElement>(null);
  const heroArtRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pillarRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillar = pillars[activePillar];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      let stored = "";
      try {
        stored = localStorage.getItem("office-cloud-motion") || "";
      } catch {
        /* Storage is optional. */
      }
      setMotionEnabled(!preference.matches && stored !== "off");
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const target = platformRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSceneStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fromHash = () => {
      const index = pillars.findIndex(
        (item) => `#${item.id}` === window.location.hash,
      );
      if (index >= 0) {
        setActivePillar(index);
        setDetailsOpen(false);
        setSceneStarted(true);
        platformRef.current?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const selectPillar = useCallback((index: number) => {
    if (index < 0 || index >= pillars.length) return;
    setActivePillar(index);
    setDetailsOpen(false);
    window.history.replaceState(null, "", `#${pillars[index].id}`);
  }, []);

  function toggleMotion() {
    if (reducedMotion) return;
    setMotionEnabled((current) => {
      try {
        localStorage.setItem("office-cloud-motion", current ? "off" : "on");
      } catch {
        /* Storage is optional. */
      }
      return !current;
    });
  }

  return (
    <div
      className={styles.experience}
      data-motion={motionEnabled && !reducedMotion ? "on" : "off"}
    >
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link
            href="/"
            className={styles.brand}
            aria-label="Office & Cloud home"
          >
            <Logo />
          </Link>
          <div className={styles.desktopLinks}>
            <a href="#platform">Platform</a>
            <a href="#device-agents">Device agents</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className={styles.navActions}>
            <a className={styles.signIn} href={APP_SIGN_IN_URL}>
              Sign in
            </a>
            <a
              className={`${styles.button} ${styles.headerCta}`}
              href="#preview"
            >
              Request access
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <nav
            className={styles.mobileNav}
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            <a onClick={() => setMenuOpen(false)} href="#platform">
              Platform
            </a>
            <a onClick={() => setMenuOpen(false)} href="#device-agents">
              Device agents
            </a>
            <a onClick={() => setMenuOpen(false)} href="#faq">
              FAQ
            </a>
            <a
              className={styles.button}
              onClick={() => setMenuOpen(false)}
              href="#preview"
            >
              Request preview access
            </a>
          </nav>
        )}
      </header>
      <main id="main-content">
        <section
          className={styles.hero}
          id="top"
          aria-labelledby="hero-heading"
        >
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>HR &amp; payroll for AI agents</p>
              <h1 id="hero-heading">
                <span>Your AI workforce.</span>
                <span>Managed like</span>
                <span className={styles.heroAccent}>contractors.</span>
              </h1>
              <p className={styles.heroDescription}>
                Know which AI agents are in use, set clear policy boundaries and
                keep costs under control. Bring ownership, risk and spending
                together in one place.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.button} href="#preview">
                  Request preview access
                </a>
                <a className={styles.secondaryButton} href="#platform">
                  Explore the platform
                </a>
              </div>
              <a className={styles.exploreCue} href="#platform">
                <span className={styles.cueLine} aria-hidden="true" />
                Explore the five pillars
              </a>
            </div>
            <div
              className={styles.heroArtwork}
              data-hero-artwork
              ref={heroArtRef}
              onPointerMove={(event) => {
                if (
                  reducedMotion ||
                  !motionEnabled ||
                  event.pointerType !== "mouse"
                )
                  return;
                const bounds = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty(
                  "--hero-x",
                  `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}deg`,
                );
                event.currentTarget.style.setProperty(
                  "--hero-y",
                  `${((event.clientY - bounds.top) / bounds.height - 0.5) * -5}deg`,
                );
              }}
              onPointerLeave={() => {
                heroArtRef.current?.style.setProperty("--hero-x", "0deg");
                heroArtRef.current?.style.setProperty("--hero-y", "0deg");
              }}
            >
              <picture className={styles.heroPicture}>
                <source
                  media="(max-width: 700px)"
                  srcSet="/images/ai-headquarters-mobile.webp 1x, /images/ai-headquarters.webp 2x"
                />
                <img
                  src="/images/ai-headquarters.webp"
                  width="1536"
                  height="1024"
                  alt="A glass AI headquarters illuminated in purple and cyan, with a module projecting toward you."
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <div className={styles.heroRecord}>
                <div className={styles.heroRecordTitle}>
                  <Cpu aria-hidden="true" size={23} />
                  <div>
                    <strong>Customer Success AI</strong>
                    <span>AI agent</span>
                  </div>
                </div>
                <dl>
                  <div>
                    <dt>Human owner</dt>
                    <dd>Customer Success lead</dd>
                  </div>
                  <div>
                    <dt>Next review</dt>
                    <dd>4 Dec</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div
            className={styles.heroSupport}
            id="supported-platforms"
            role="region"
            aria-label="Supported platforms"
          >
            <div className={styles.heroSupportInner}>
              <div className={styles.supportHeading}>
                <a href="#device-agents">Supported</a>
              </div>
              <PlatformSupport includeBrowsers />
            </div>
          </div>
        </section>
        <section
          className={styles.platform}
          ref={platformRef}
          id="platform"
          aria-labelledby="platform-heading"
        >
          {pillars.map((item) => (
            <span
              key={item.id}
              id={item.id}
              className={styles.pillarAnchor}
              aria-hidden="true"
            />
          ))}
          <div className={styles.platformIntro}>
            <div>
              <p className={styles.eyebrow}>The platform</p>
              <h2 id="platform-heading">
                One AI workforce.
                <br />
                Five layers of oversight.
              </h2>
            </div>
            <div className={styles.introAside}>
              <p>
                Explore ownership, policies, risk and spend around an AI agent
                record.
              </p>
            </div>
          </div>
          <div
            className={styles.explorer}
            data-scene-ready={sceneReady ? "true" : "false"}
          >
            <nav
              className={styles.pillarNavigation}
              aria-label="Explore the five pillars"
            >
              {pillars.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    ref={(node) => {
                      pillarRefs.current[index] = node;
                    }}
                    type="button"
                    key={item.id}
                    id={`pillar-${item.id}`}
                    aria-pressed={index === activePillar}
                    aria-controls="pillar-evidence"
                    className={styles.pillarButton}
                    onClick={() => selectPillar(index)}
                    onKeyDown={(event) => {
                      let next: number | undefined;
                      if (
                        event.key === "ArrowDown" ||
                        event.key === "ArrowRight"
                      )
                        next = (index + 1) % pillars.length;
                      if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                        next = (index + pillars.length - 1) % pillars.length;
                      if (event.key === "Home") next = 0;
                      if (event.key === "End") next = pillars.length - 1;
                      if (next !== undefined) {
                        event.preventDefault();
                        selectPillar(next);
                        pillarRefs.current[next]?.focus();
                      }
                    }}
                  >
                    <Icon
                      className={styles.pillarIcon}
                      size={34}
                      strokeWidth={1.55}
                      aria-hidden="true"
                    />
                    <span>
                      <strong>{item.name}</strong>
                      <span className={styles.pillarQuestion}>
                        {item.question}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className={styles.sceneColumn}>
              <div className={styles.scene}>
                {sceneStarted ? (
                  <HeadquartersScene
                    activePillar={activePillar}
                    onSelectPillar={selectPillar}
                    reducedMotion={reducedMotion}
                    motionEnabled={motionEnabled}
                    onReady={() => setSceneReady(true)}
                  />
                ) : (
                  <ScenePlaceholder />
                )}
              </div>
              <div className={styles.sceneControls}>
                <span>Select a pillar to explore</span>
                <button
                  type="button"
                  onClick={toggleMotion}
                  disabled={reducedMotion}
                  aria-pressed={motionEnabled && !reducedMotion}
                  aria-label={
                    reducedMotion
                      ? "Motion disabled by your reduced-motion preference"
                      : motionEnabled
                        ? "Pause scene motion"
                        : "Play scene motion"
                  }
                >
                  {motionEnabled && !reducedMotion ? (
                    <Pause size={14} aria-hidden="true" />
                  ) : (
                    <Play size={14} aria-hidden="true" />
                  )}
                  <span>
                    {reducedMotion
                      ? "Reduced motion"
                      : motionEnabled
                        ? "Pause motion"
                        : "Play motion"}
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.evidenceColumn}>
              <div className={styles.recordIdentity}>
                <Cpu size={17} aria-hidden="true" />
                <span>
                  <small>AI agent record</small>
                  <strong>Customer Success AI</strong>
                </span>
              </div>
              <div
                id="pillar-evidence"
                role="region"
                aria-labelledby={`pillar-${pillar.id}`}
                aria-live="polite"
                aria-atomic="true"
              >
                <div className={styles.evidence} key={pillar.id}>
                  <p className={styles.evidenceLabel}>{pillar.evidence}</p>
                  <h3>{pillar.heading}</h3>
                  {pillar.id === "ai-economics" && (
                    <p className={styles.spendValue}>
                      CAD 490<span>Recorded team spend</span>
                    </p>
                  )}
                  <dl>
                    {pillar.fields.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd
                          className={
                            value === "Medium"
                              ? styles.riskValue
                              : value === "Complete" || value === "Available"
                                ? styles.positiveValue
                                : undefined
                          }
                        >
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
              <div className={styles.humanOwner}>
                <span>Human owner</span>
                <strong>Customer Success lead</strong>
              </div>
              <button
                type="button"
                className={styles.detailToggle}
                aria-expanded={detailsOpen}
                aria-controls="pillar-context"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                {detailsOpen ? "Close context" : "Why this matters"}
                <span aria-hidden="true">{detailsOpen ? "−" : "+"}</span>
              </button>
              {detailsOpen && (
                <p id="pillar-context" className={styles.detailText}>
                  {pillar.detail}
                </p>
              )}
            </div>
          </div>
          <noscript>
            <p className={styles.noScript}>
              The five pillars connect discovery, device policies, risk
              assessments, recorded AI costs and human review. Enable JavaScript
              to explore the AI agent record interactively.
            </p>
          </noscript>
        </section>
        <SupportingSections />
        <PreviewAccess />
      </main>
      <footer className={styles.footer}>
        <Link href="/" aria-label="Office & Cloud home">
          <Logo />
        </Link>
        <nav aria-label="Footer navigation">
          <a href="#platform">Platform</a>
          <a href="#device-agents">Device agents</a>
          <a href="#faq">FAQ</a>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
        </nav>
        <p>© {new Date().getFullYear()} Office &amp; Cloud</p>
      </footer>
    </div>
  );
}
