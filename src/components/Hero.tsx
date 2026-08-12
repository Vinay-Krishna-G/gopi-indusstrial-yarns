import { useFadeIn } from '../hooks/useFadeIn';
import { WHATSAPP_URL } from '../data/constants';
import './Hero.css';

export default function Hero() {
  const ref = useFadeIn();

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__inner container">
        {/* LEFT — Text */}
        <div className="hero__text">
          <span className="eyebrow fade-in">Premium</span>

          <h1 className="hero__heading fade-in">
            <span className="hero__heading-part1">Y-Cone </span>
            <span className="hero__heading-part2">Polyester</span>
            <span className="hero__heading-part3">Yarns</span>
          </h1>

          <p className="hero__subheading fade-in">Colour. Strength. Consistency.</p>

          <p className="hero__description fade-in">
            High quality polyester yarns on Y-cones in a wide range of vibrant colours for every need.
          </p>

          {/* Quality indicators */}
          <div className="hero__indicators fade-in">
            <div className="hero__indicator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Premium Quality</span>
            </div>
            <div className="hero__indicator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <span>Vibrant Colours</span>
            </div>
            <div className="hero__indicator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Strong &amp; Durable</span>
            </div>
          </div>

          <div className="hero__cta fade-in">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn-primary"
              id="hero-enquire-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Enquire on WhatsApp
            </a>
            <a
              href="#collection"
              className="hero__btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Collection
            </a>
          </div>
        </div>

        {/* RIGHT — Product image */}
        <div className="hero__image-wrap fade-in">
          <img
            src="/images/yarns/orange.png"
            alt="Premium Y-Cone Polyester Yarn — Orange"
            className="hero__image"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
