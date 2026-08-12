import { useFadeIn } from '../hooks/useFadeIn';
import { openWhatsApp, whatsappMessages } from '../utils/whatsapp';
import './CTA.css';

export default function CTA() {
  const ref = useFadeIn();

  return (
    <section id="contact" className="cta-section" ref={ref}>
      <div className="container">
        <div className="cta-section__inner">
          <div className="cta-section__text">
            <h2 className="cta-section__heading fade-in">
              The Right Colour.<br />
              The Right Performance.
            </h2>
            <p className="cta-section__desc fade-in">
              Tell us your required shade, quantity and application.
              We'll help you find the right yarn.
            </p>
          </div>

          <div className="cta-section__actions fade-in">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); openWhatsApp(whatsappMessages.cta); }}
              className="cta-section__btn"
              id="cta-whatsapp-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
