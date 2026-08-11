import { useFadeIn } from '../hooks/useFadeIn';
import './Features.css';

const features = [
  {
    id: 'premium-polyester',
    title: 'Premium Polyester',
    description: 'High strength filament yarn for long lasting performance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'consistent-quality',
    title: 'Consistent Quality',
    description: 'Uniform thickness and winding for smooth processing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
  },
  {
    id: 'colour-fastness',
    title: 'Colour Fastness',
    description: 'Excellent dyeing quality with vibrant and long lasting colours.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: 'y-cone-design',
    title: 'Y-Cone Design',
    description: 'Stable Y-cone for better handling and efficient production.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L8 20h8L12 2z" />
        <ellipse cx="12" cy="20" rx="4" ry="1.5" />
      </svg>
    ),
  },
];

export default function Features() {
  const ref = useFadeIn();

  return (
    <section id="why-us" className="features" ref={ref}>
      <div className="container">
        <div className="features__header">
          <span className="eyebrow fade-in">Why Choose Us</span>
          <h2 className="features__heading fade-in">Why Our Yarns</h2>
        </div>

        <div className="features__grid">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              className="features__item fade-in"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="features__icon">{feature.icon}</div>
              <h3 className="features__title">{feature.title}</h3>
              <p className="features__desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
