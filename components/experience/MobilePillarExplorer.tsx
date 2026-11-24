"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Cpu, Minus, Plus, type LucideIcon } from "lucide-react";
import styles from "./MobilePillarExplorer.module.css";

type Pillar = {
  readonly id: string;
  readonly name: string;
  readonly icon: LucideIcon;
  readonly question: string;
  readonly heading: string;
  readonly evidence: string;
  readonly description: string;
  readonly fields: ReadonlyArray<readonly [string, string]>;
  readonly detail: string;
};

const selectorLabels = ["Discover", "Govern", "Risk", "Costs", "Value"];

function CompactArchitecture({ activeIndex }: { activeIndex: number }) {
  return (
    <svg
      className={styles.architecture}
      viewBox="0 0 84 96"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 24v52l33 13 33-13V24M42 12v77" className={styles.spine} />
      {[4, 3, 2, 1, 0].map((index) => {
        const y = 8 + index * 13;
        return (
          <path
            key={index}
            d={`M42 ${y} 77 ${y + 13} 42 ${y + 26} 7 ${y + 13}Z`}
            className={index === activeIndex ? styles.activeFloor : styles.floor}
          />
        );
      })}
    </svg>
  );
}

export function MobilePillarExplorer({
  pillars,
  activeIndex,
  onSelect,
  reducedMotion,
}: {
  pillars: ReadonlyArray<Pillar>;
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const gesture = useRef<{ x: number; y: number; time: number } | null>(null);
  const alignmentFrame = useRef<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const pillar = pillars[activeIndex];
  const previous = (activeIndex + pillars.length - 1) % pillars.length;
  const next = (activeIndex + 1) % pillars.length;
  const fields: ReadonlyArray<readonly [string, string]> =
    pillar.id === "ai-economics"
      ? [
          ["Recorded team spend", "CAD 490"],
          ...pillar.fields.filter(([label]) => label !== "Scope"),
        ]
      : pillar.fields;

  useEffect(() => setDetailsOpen(false), [activeIndex]);
  useEffect(
    () => () => {
      if (alignmentFrame.current !== null) cancelAnimationFrame(alignmentFrame.current);
    },
    [],
  );

  function choose(index: number) {
    setDetailsOpen(false);
    onSelect(index);
    if (alignmentFrame.current !== null) cancelAnimationFrame(alignmentFrame.current);
    alignmentFrame.current = requestAnimationFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const bounds = root.getBoundingClientRect();
      const header = document.querySelector("header");
      const safeTop = (header?.getBoundingClientRect().height ?? 70) + 12;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      // Align once when the example is clipped; subsequent selections stay put.
      if (
        (bounds.top < safeTop - 4 || bounds.bottom > viewportHeight - 12) &&
        Math.abs(bounds.top - safeTop) > 4
      ) {
        root.scrollIntoView({
          block: "start",
          behavior: reducedMotion ? "instant" : "smooth",
        });
      }
    });
  }

  function startSwipe(event: TouchEvent<HTMLElement>) {
    if (
      event.touches.length !== 1 ||
      (event.target instanceof Element && event.target.closest("button, a"))
    ) {
      gesture.current = null;
      return;
    }
    const touch = event.touches[0];
    gesture.current = { x: touch.clientX, y: touch.clientY, time: event.timeStamp };
  }

  function finishSwipe(event: TouchEvent<HTMLElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || event.changedTouches.length !== 1 || event.touches.length) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5 && event.timeStamp - start.time < 1000) {
      choose(dx < 0 ? next : previous);
    }
  }

  return (
    <div className={styles.explorer} ref={rootRef} data-mobile-explorer>
      <nav className={styles.selectors} aria-label="Explore the five pillars">
        {pillars.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`mobile-pillar-${item.id}`}
              ref={(node) => { buttonRefs.current[index] = node; }}
              type="button"
              aria-label={`${item.name}: ${item.question}`}
              aria-pressed={index === activeIndex}
              aria-controls="mobile-pillar-evidence"
              onClick={() => choose(index)}
              onKeyDown={(event) => {
                let indexToSelect: number | undefined;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") indexToSelect = (index + 1) % pillars.length;
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") indexToSelect = (index + pillars.length - 1) % pillars.length;
                if (event.key === "Home") indexToSelect = 0;
                if (event.key === "End") indexToSelect = pillars.length - 1;
                if (indexToSelect !== undefined) {
                  event.preventDefault();
                  choose(indexToSelect);
                  buttonRefs.current[indexToSelect]?.focus({ preventScroll: true });
                }
              }}
            >
              <Icon size={24} strokeWidth={1.65} aria-hidden="true" />
              <span>{selectorLabels[index]}</span>
            </button>
          );
        })}
      </nav>

      <article
        id="mobile-pillar-evidence"
        className={styles.panel}
        role="region"
        aria-labelledby={`mobile-pillar-${pillar.id}`}
        onTouchStart={startSwipe}
        onTouchEnd={finishSwipe}
        onTouchCancel={() => { gesture.current = null; }}
      >
        <div className={styles.content} aria-live="polite" aria-atomic="true">
          <div key={pillar.id}>
            <div className={styles.heading}>
              <div>
                <p className={styles.eyebrow}>{pillar.evidence}</p>
                <h3>{pillar.name}</h3>
              </div>
              <CompactArchitecture activeIndex={activeIndex} />
            </div>
            <p className={styles.benefit}>{pillar.heading}</p>
            <div className={styles.record}>
              <Cpu size={18} strokeWidth={1.6} aria-hidden="true" />
              <div>
                <strong>Customer Success AI</strong>
                <span>Owner: <b>Customer Success lead</b></span>
              </div>
            </div>
            <dl className={styles.fields}>
              {fields.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd className={
                    value === "CAD 490" ? styles.amount :
                    value === "Medium" ? styles.risk :
                    value === "Complete" || value === "Available" ? styles.positive : undefined
                  }>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <button
          type="button"
          className={styles.detailsButton}
          aria-expanded={detailsOpen}
          aria-controls="mobile-pillar-context"
          onClick={() => setDetailsOpen((open) => !open)}
        >
          <span>Why this matters</span>
          {detailsOpen ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        </button>
        {detailsOpen && (
          <div id="mobile-pillar-context" className={styles.details}>
            <p>{pillar.description}</p>
            <p>{pillar.detail}</p>
          </div>
        )}
        <div className={styles.pager}>
          <button type="button" aria-label={`Previous pillar: ${pillars[previous].name}`} onClick={() => choose(previous)}>
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <span className={styles.progress}>
            <strong>{String(activeIndex + 1).padStart(2, "0")} <span>/ 05</span></strong>
            <small>Swipe to explore</small>
          </span>
          <button type="button" aria-label={`Next pillar: ${pillars[next].name}`} onClick={() => choose(next)}>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
