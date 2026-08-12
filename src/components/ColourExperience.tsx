import { useState, useEffect, useRef, useCallback } from 'react';
import './ColourExperience.css';

interface YarnEntry {
  id: string;
  label: string;
  index: string;
  swatchHex: string;
  atmosphereBg: string;
  glowColor: string;
  studioLight: string;   // rgba — very subtle, behind yarn
  image: string;
  isComposition?: boolean;
}

// Exactly 8 colours — the definitive set
const YARN_ENTRIES: YarnEntry[] = [
  {
    id: 'green', label: 'Green', index: '01 / 08',
    swatchHex: '#3BA84E', atmosphereBg: '#EEF8EF', glowColor: '#A0D8A8',
    studioLight: 'rgba(70, 170, 90, 0.22)',
    image: '/images/yarns/transparent/green.png',
  },
  {
    id: 'blue', label: 'Blue', index: '02 / 08',
    swatchHex: '#1A4FBF', atmosphereBg: '#F0F4FF', glowColor: '#A8C0F8',
    studioLight: 'rgba(50, 110, 230, 0.18)',
    image: '/images/yarns/transparent/blue.png',
  },
  {
    id: 'white', label: 'White', index: '03 / 08',
    swatchHex: '#C8C5BF', atmosphereBg: '#F8F7F5', glowColor: '#D8D5CE',
    studioLight: 'rgba(160, 160, 165, 0.14)',
    image: '/images/yarns/transparent/white.png',
  },
  {
    id: 'red', label: 'Red', index: '04 / 08',
    swatchHex: '#D42B2B', atmosphereBg: '#FFF0F0', glowColor: '#F5AAAA',
    studioLight: 'rgba(210, 70, 70, 0.20)',
    image: '/images/yarns/transparent/red.png',
  },
  {
    id: 'orange', label: 'Orange', index: '05 / 08',
    swatchHex: '#E8621A', atmosphereBg: '#FFF2EA', glowColor: '#F8C090',
    studioLight: 'rgba(235, 130, 50, 0.22)',
    image: '/images/yarns/transparent/orange.png',
  },
  {
    id: 'yellow', label: 'Yellow', index: '06 / 08',
    swatchHex: '#E8C800', atmosphereBg: '#FDFAE0', glowColor: '#F0DC6E',
    studioLight: 'rgba(230, 200, 30, 0.18)',
    image: '/images/yarns/transparent/yellow.png',
  },
  {
    id: 'black-yellow', label: 'Black + Yellow', index: '07 / 08',
    swatchHex: '#2A2A2A', atmosphereBg: '#F5F3EC', glowColor: '#D4C870',
    studioLight: 'rgba(195, 165, 40, 0.18)',
    image: '/images/yarns/transparent/black-yellow.png',
    isComposition: true,
  },
  {
    id: 'red-yellow', label: 'Red + Yellow', index: '08 / 08',
    swatchHex: '#CC3A1A', atmosphereBg: '#FFF4EC', glowColor: '#F0B888',
    studioLight: 'rgba(230, 120, 60, 0.20)',
    image: '/images/yarns/transparent/red-yellow.png',
    isComposition: true,
  },
];

const DEFAULT_IDX = 4; // Orange
const EXIT_MS      = 560;

export default function ColourExperience() {
  const [activeIdx,    setActiveIdx]    = useState(DEFAULT_IDX);
  const [prevIdx,      setPrevIdx]      = useState<number | null>(null);
  const [hasEntered,   setHasEntered]   = useState(false);
  // Once the user first picks a colour, we switch from entrance-only animations
  // to the quicker colour-change animation for the metadata text.
  const [isInteracted, setIsInteracted] = useState(false);

  const sectionRef      = useRef<HTMLElement>(null);
  const yarnParallaxRef = useRef<HTMLDivElement>(null);
  const glowParallaxRef = useRef<HTMLDivElement>(null);
  const exitTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef          = useRef<number | null>(null);
  const mousePos        = useRef({ x: 0.5, y: 0.5 });
  const targetMouse     = useRef({ x: 0.5, y: 0.5 });
  const isParallaxOff   = useRef(false);

  const active = YARN_ENTRIES[activeIdx];

  // ── Section intersection entrance ──────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasEntered(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Parallax RAF loop (desktop only, respects reduced-motion) ──
  useEffect(() => {
    const noHover        = window.matchMedia('(hover: none)').matches;
    const reducedMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isParallaxOff.current = noHover || reducedMotion;
    if (isParallaxOff.current) return;

    const tick = () => {
      const lf = 0.055;
      mousePos.current.x += (targetMouse.current.x - mousePos.current.x) * lf;
      mousePos.current.y += (targetMouse.current.y - mousePos.current.y) * lf;

      const dx = (mousePos.current.x - 0.5) * 2; // −1 → 1
      const dy = (mousePos.current.y - 0.5) * 2;

      // Studio light follows cursor (light tracks towards pointer)
      if (glowParallaxRef.current) {
        glowParallaxRef.current.style.transform =
          `translate(calc(-50% + ${dx * 8}px), calc(-50% + ${dy * 6}px))`;
      }
      // Yarn moves opposite (creates depth illusion)
      if (yarnParallaxRef.current) {
        yarnParallaxRef.current.style.transform =
          `translate(${-dx * 4}px, ${-dy * 3}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Colour selection ───────────────────────────────────────────
  const selectColour = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

    setIsInteracted(true);
    setPrevIdx(activeIdx);
    setActiveIdx(idx);

    exitTimerRef.current = setTimeout(() => {
      setPrevIdx(null);
    }, EXIT_MS);
  }, [activeIdx]);

  // ── Keyboard navigation (ArrowLeft / ArrowRight) ───────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') selectColour((activeIdx + 1) % YARN_ENTRIES.length);
      if (e.key === 'ArrowLeft')  selectColour((activeIdx - 1 + YARN_ENTRIES.length) % YARN_ENTRIES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, selectColour]);

  // ── Mouse tracking ─────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isParallaxOff.current) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetMouse.current = {
      x: (e.clientX - rect.left)  / rect.width,
      y: (e.clientY - rect.top)   / rect.height,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Gently return to centre
    targetMouse.current = { x: 0.5, y: 0.5 };
  }, []);

  return (
    <section
      id="colour-experience"
      className={`ce${hasEntered ? ' ce--entered' : ''}`}
      ref={sectionRef}
      style={{ backgroundColor: active.atmosphereBg }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background atmospheric glow blobs */}
      <div className="ce__glow ce__glow--1" style={{ backgroundColor: active.glowColor }} aria-hidden="true" />
      <div className="ce__glow ce__glow--2" style={{ backgroundColor: active.glowColor }} aria-hidden="true" />
      <div className="ce__glow ce__glow--3" style={{ backgroundColor: active.glowColor }} aria-hidden="true" />

      <div className="container ce__inner">

        {/* ─── LEFT ─────────────────────────────────────────── */}
        <div className="ce__left">
          <span className="eyebrow ce__eyebrow">Colour Experience</span>

          <div className="ce__product-title" aria-label="Y-Cone Polyester Yarns">
            <span>Y-Cone</span>
            <span>Polyester</span>
            <span>Yarns</span>
          </div>

          {/*
            key trick: before first interaction key is always 'initial',
            so the entrance-delay animation plays. After first click the key
            changes with each colour, triggering the quicker switch animation.
          */}
          <div
            key={isInteracted ? active.id : 'initial'}
            className={`ce__colour-meta${isInteracted ? ' ce__colour-meta--switch' : ' ce__colour-meta--initial'}`}
          >
            <p className="ce__colour-name">{active.label}</p>
            <p className="ce__colour-index">{active.index}</p>
          </div>

          {/* 8-colour navigation strip */}
          <div className="ce__nav" role="group" aria-label="Select yarn colour">
            {YARN_ENTRIES.map((entry, idx) => (
              <button
                key={entry.id}
                className={`ce__swatch${activeIdx === idx ? ' ce__swatch--active' : ''}`}
                onClick={() => selectColour(idx)}
                aria-label={`View ${entry.label}`}
                aria-pressed={activeIdx === idx}
                id={`ce-swatch-${entry.id}`}
                title={entry.label}
                style={{ '--swatch-hex': entry.swatchHex } as React.CSSProperties}
              >
                <img
                  src={entry.image}
                  alt={entry.label}
                  className="ce__swatch-img"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ─── RIGHT ────────────────────────────────────────── */}
        <div className="ce__right">

          {/* Studio light — sits behind the yarn, has own parallax offset */}
          <div
            ref={glowParallaxRef}
            className="ce__studio-light"
            style={{ backgroundColor: active.studioLight }}
            aria-hidden="true"
          />

          {/* Yarn parallax wrapper — moves opposite to cursor */}
          <div ref={yarnParallaxRef} className="ce__yarn-parallax">

            {/*
              CSS Grid stacking: both images occupy the same grid area.
              The exiting image plays yarnExit, the entering plays yarnEnter.
              After EXIT_MS the exiting image is removed from the DOM.
            */}
            <div className="ce__image-stack">
              {/* Exiting image — absolute in the grid, fades/scales out */}
              {prevIdx !== null && (
                <img
                  key={`exit-${YARN_ENTRIES[prevIdx].id}`}
                  src={YARN_ENTRIES[prevIdx].image}
                  alt=""
                  aria-hidden="true"
                  className={`ce__image ce__image--exiting${YARN_ENTRIES[prevIdx].isComposition ? ' ce__image--composition' : ''}`}
                  loading="lazy"
                />
              )}

              {/* Current image — enters or is already visible */}
              <img
                key={`enter-${active.id}`}
                src={active.image}
                alt={`${active.label} Y-Cone Polyester Yarn`}
                className={`ce__image${active.isComposition ? ' ce__image--composition' : ''}${isInteracted ? ' ce__image--entering' : ' ce__image--initial'}`}
                loading={activeIdx === DEFAULT_IDX ? 'eager' : 'lazy'}
              />
            </div>

            {/* Colour reflection — extremely subtle coloured glow under the base */}
            <div
              className="ce__reflect"
              style={{ backgroundColor: active.glowColor }}
              aria-hidden="true"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
