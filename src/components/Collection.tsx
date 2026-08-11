import { useFadeIn } from '../hooks/useFadeIn';
import './Collection.css';

export default function Collection() {
  const ref = useFadeIn();

  return (
    <section id="collection" className="collection" ref={ref}>
      <div className="container">
        <div className="collection__header">
          <span className="eyebrow fade-in">Full Collection</span>
          <h2 className="collection__heading fade-in">
            Every Colour.<br />Every Application.
          </h2>
        </div>

        {/* Editorial grid */}
        <div className="collection__grid fade-in">
          {/* Main large image — full cluster */}
          <div className="collection__main">
            <img
              src="/images/yarns/full-collection.png"
              alt="Full collection of Y-Cone polyester yarns in all available colours"
              className="collection__img"
              loading="lazy"
            />
          </div>

          {/* Side images */}
          <div className="collection__side">
            <div className="collection__side-top">
              <img
                src="/images/yarns/flow-arrangement.png"
                alt="Y-Cone polyester yarns in a flowing diagonal arrangement showing colour range"
                className="collection__img"
                loading="lazy"
              />
              <div className="collection__side-label">
                <span className="eyebrow">Exceptional Finish</span>
                <p>Smooth texture. Consistent winding.</p>
              </div>
            </div>

            <div className="collection__side-bottom">
              <img
                src="/images/yarns/green.png"
                alt="Single premium Y-Cone polyester yarn — green"
                className="collection__img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
