import { useFadeIn } from '../hooks/useFadeIn';
import './Spectrum.css';

export default function Spectrum() {
  const ref = useFadeIn();

  return (
    <section id="spectrum" className="spectrum" ref={ref}>
      <div className="spectrum__header container">
        <span className="eyebrow fade-in">Our Range</span>
        <h2 className="spectrum__heading fade-in">A Spectrum of Possibilities</h2>
      </div>

      <div className="spectrum__image-wrap fade-in">
        <img
          src="/images/yarns/spectrum.png"
          alt="Full colour spectrum of Y-Cone polyester yarns arranged in rainbow order"
          className="spectrum__image"
          loading="lazy"
        />
      </div>

      <div className="spectrum__footer container">
        <p className="spectrum__copy fade-in">
          From vibrant brights to subtle neutrals, our Y-cone polyester yarns bring colour and performance to every creation.
        </p>
      </div>
    </section>
  );
}
