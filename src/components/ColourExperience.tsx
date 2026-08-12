import { useState, useEffect, useRef } from 'react';
import './ColourExperience.css';

interface YarnEntry {
  id: string;
  label: string;
  index: string;
  swatchHex: string;
  atmosphereBg: string;
  glowColor: string;
  image: string;            // all 8 have an image
  isComposition?: boolean;  // true for multi-cone shots (no glow behind them)
}

// Exactly 8 product colours — the final definitive set
const YARN_ENTRIES: YarnEntry[] = [
  {
    id: 'green',
    label: 'Green',
    index: '01 / 08',
    swatchHex: '#3BA84E',
    atmosphereBg: '#EEF8EF',
    glowColor: '#A0D8A8',
    image: '/images/yarns/transparent/green.png',
  },
  {
    id: 'blue',
    label: 'Blue',
    index: '02 / 08',
    swatchHex: '#1A4FBF',
    atmosphereBg: '#F0F4FF',
    glowColor: '#A8C0F8',
    image: '/images/yarns/transparent/blue.png',
  },
  {
    id: 'white',
    label: 'White',
    index: '03 / 08',
    swatchHex: '#C8C5BF',
    atmosphereBg: '#F8F7F5',
    glowColor: '#D8D5CE',
    image: '/images/yarns/transparent/white.png',
  },
  {
    id: 'red',
    label: 'Red',
    index: '04 / 08',
    swatchHex: '#D42B2B',
    atmosphereBg: '#FFF0F0',
    glowColor: '#F5AAAA',
    image: '/images/yarns/transparent/red.png',
  },
  {
    id: 'orange',
    label: 'Orange',
    index: '05 / 08',
    swatchHex: '#E8621A',
    atmosphereBg: '#FFF2EA',
    glowColor: '#F8C090',
    image: '/images/yarns/transparent/orange.png',
  },
  {
    id: 'yellow',
    label: 'Yellow',
    index: '06 / 08',
    swatchHex: '#E8C800',
    atmosphereBg: '#FDFAE0',
    glowColor: '#F0DC6E',
    image: '/images/yarns/transparent/yellow.png',
  },
  {
    id: 'black-yellow',
    label: 'Black + Yellow',
    index: '07 / 08',
    swatchHex: '#2A2A2A',
    atmosphereBg: '#F5F3EC',
    glowColor: '#D4C870',
    image: '/images/yarns/transparent/black-yellow.png',
    isComposition: true,
  },
  {
    id: 'red-yellow',
    label: 'Red + Yellow',
    index: '08 / 08',
    swatchHex: '#CC3A1A',
    atmosphereBg: '#FFF4EC',
    glowColor: '#F0B888',
    image: '/images/yarns/transparent/red-yellow.png',
    isComposition: true,
  },
];

const DEFAULT_IDX = 4; // Orange

export default function ColourExperience() {
  const [activeIdx, setActiveIdx] = useState(DEFAULT_IDX);
  const [displayIdx, setDisplayIdx] = useState(DEFAULT_IDX);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const active = YARN_ENTRIES[activeIdx];
  const display = YARN_ENTRIES[displayIdx];

  // Section enter animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const selectColour = (idx: number) => {
    if (idx === activeIdx || isTransitioning) return;
    setIsTransitioning(true);
    // Phase 1: fade out (300ms), swap content, then fade in
    setTimeout(() => {
      setDisplayIdx(idx);
      setActiveIdx(idx);
      setTimeout(() => setIsTransitioning(false), 40);
    }, 300);
  };

  return (
    <section
      id="colour-experience"
      className={`ce${hasEntered ? ' ce--entered' : ''}`}
      ref={sectionRef}
      style={{ backgroundColor: active.atmosphereBg }}
    >
      {/* Atmospheric soft glow blobs */}
      <div
        className="ce__glow ce__glow--1"
        style={{ backgroundColor: active.glowColor }}
        aria-hidden="true"
      />
      <div
        className="ce__glow ce__glow--2"
        style={{ backgroundColor: active.glowColor }}
        aria-hidden="true"
      />
      <div
        className="ce__glow ce__glow--3"
        style={{ backgroundColor: active.glowColor }}
        aria-hidden="true"
      />

      <div className="container ce__inner">

        {/* ─── LEFT ─── */}
        <div className="ce__left">
          <span className="eyebrow ce__eyebrow">Colour Experience</span>

          {/* Static editorial label */}
          <div className="ce__product-title" aria-label="Y-Cone Polyester Yarns">
            <span>Y-Cone</span>
            <span>Polyester</span>
            <span>Yarns</span>
          </div>

          {/* Active colour name + counter — transitions on change */}
          <div
            className={`ce__colour-meta${
              isTransitioning ? ' ce__colour-meta--exit' : ' ce__colour-meta--enter'
            }`}
          >
            <p className="ce__colour-name">{display.label}</p>
            <p className="ce__colour-index">{display.index}</p>
          </div>

          {/* 8-colour navigation */}
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

        {/* ─── RIGHT ─── */}
        <div className="ce__right">
          <div className="ce__stage">
            <img
              key={display.id}
              src={display.image}
              alt={`${display.label} Y-Cone Polyester Yarn`}
              className={`ce__image${
                display.isComposition ? ' ce__image--composition' : ''
              }${isTransitioning ? ' ce__image--exit' : ' ce__image--enter'}`}
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
