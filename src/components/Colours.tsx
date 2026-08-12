import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { colourSwatches } from '../data/colours';
import { openWhatsApp, whatsappMessages } from '../utils/whatsapp';
import './Colours.css';

export default function Colours() {
  const ref = useFadeIn();
  const [activeColour, setActiveColour] = useState<string | null>(null);

  const handleSwatchClick = (colour: typeof colourSwatches[0]) => {
    setActiveColour(colour.name);
    openWhatsApp(whatsappMessages.colour(colour.name));
  };

  return (
    <section id="colours" className="colours" ref={ref}>
      <div className="container">
        <div className="colours__header">
          <span className="eyebrow fade-in">Our Range</span>
          <h2 className="colours__heading fade-in">Choose Your Colour</h2>
        </div>

        <div className="colours__swatches fade-in">
          {colourSwatches.map((colour) => (
            <button
              key={colour.name}
              className={`colours__swatch${activeColour === colour.name ? ' colours__swatch--active' : ''}`}
              style={{ backgroundColor: colour.hex }}
              onClick={() => handleSwatchClick(colour)}
              aria-label={`Enquire about ${colour.name}`}
              title={colour.name}
              id={`swatch-${colour.name.toLowerCase().replace(/\s+/g, '-')}`}
            />
          ))}
        </div>

        <p className="colours__note fade-in">
          Enquire now for your required shade and quantity.
        </p>

        <div className="colours__cta fade-in">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); openWhatsApp(whatsappMessages.general); }}
            className="colours__btn"
            id="colours-whatsapp-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
