import { useFadeIn } from '../hooks/useFadeIn';
import { cloudinaryImage } from '../utils/cloudinary';
import './MacroStory.css';

export default function MacroStory() {
  const ref = useFadeIn();

  return (
    <section id="macro-story" className="macro-story" ref={ref}>
      <div className="macro-story__inner">
        <div className="macro-story__image-wrap fade-in">
          <img
            src={cloudinaryImage('yarns/macro', '/images/yarns/macro.png', 1000)}
            srcSet={`
              ${cloudinaryImage('yarns/macro', '/images/yarns/macro.png', 600)} 600w,
              ${cloudinaryImage('yarns/macro', '/images/yarns/macro.png', 1000)} 1000w,
              ${cloudinaryImage('yarns/macro', '/images/yarns/macro.png', 1400)} 1400w
            `}
            sizes="(max-width: 900px) 100vw, 50vw"
            alt="Close-up macro texture of premium polyester yarn — showing fibre quality and sheen"
            className="macro-story__image"
            loading="lazy"
          />
        </div>

        <div className="macro-story__text fade-in">
          <span className="eyebrow">Craftsmanship</span>
          <h2 className="macro-story__heading">Exceptional<br />Finish</h2>
          <ul className="macro-story__list">
            <li>Smooth texture.</li>
            <li>Consistent winding.</li>
            <li>Built for performance.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
