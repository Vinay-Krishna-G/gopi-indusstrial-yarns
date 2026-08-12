import { useFadeIn } from '../hooks/useFadeIn';
import { cloudinaryImage } from '../utils/cloudinary';
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
              src={cloudinaryImage('yarns/full-collection', '/images/yarns/full-collection.png', 1000)}
              srcSet={`
                ${cloudinaryImage('yarns/full-collection', '/images/yarns/full-collection.png', 600)} 600w,
                ${cloudinaryImage('yarns/full-collection', '/images/yarns/full-collection.png', 1000)} 1000w,
                ${cloudinaryImage('yarns/full-collection', '/images/yarns/full-collection.png', 1400)} 1400w
              `}
              sizes="(max-width: 768px) 100vw, 60vw"
              alt="Full collection of Y-Cone polyester yarns in all available colours"
              className="collection__img"
              loading="lazy"
            />
          </div>

          {/* Side images */}
          <div className="collection__side">
            <div className="collection__side-top">
              <img
                src={cloudinaryImage('yarns/flow-arrangement', '/images/yarns/flow-arrangement.png', 600)}
                srcSet={`
                  ${cloudinaryImage('yarns/flow-arrangement', '/images/yarns/flow-arrangement.png', 400)} 400w,
                  ${cloudinaryImage('yarns/flow-arrangement', '/images/yarns/flow-arrangement.png', 600)} 600w,
                  ${cloudinaryImage('yarns/flow-arrangement', '/images/yarns/flow-arrangement.png', 800)} 800w
                `}
                sizes="(max-width: 768px) 100vw, 40vw"
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
                src={cloudinaryImage('yarns/green', '/images/yarns/green.png', 600)}
                srcSet={`
                  ${cloudinaryImage('yarns/green', '/images/yarns/green.png', 400)} 400w,
                  ${cloudinaryImage('yarns/green', '/images/yarns/green.png', 600)} 600w,
                  ${cloudinaryImage('yarns/green', '/images/yarns/green.png', 800)} 800w
                `}
                sizes="(max-width: 768px) 100vw, 40vw"
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
