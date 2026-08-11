import { WHATSAPP_URL, COMPANY_EMAIL } from '../data/constants';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        {/* Top row */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-primary">GOPI</span>
              <span className="footer__logo-sep">—</span>
              <span className="footer__logo-secondary">Industrial Yarns</span>
            </div>
            <p className="footer__tagline">
              Premium Y-Cone Polyester Yarns in a wide range of vibrant colours for industrial and commercial applications.
            </p>
          </div>

          {/* Contact */}
          <div className="footer__contact">
            <p className="footer__contact-label">Contact</p>
            <ul className="footer__contact-list">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer__link" id="footer-whatsapp-link">
                  WhatsApp Enquiry
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY_EMAIL}`} className="footer__link" id="footer-email-link">
                  {COMPANY_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="footer__nav">
            <p className="footer__contact-label">Quick Links</p>
            <ul className="footer__contact-list">
              <li><a href="#home" className="footer__link">Home</a></li>
              <li><a href="#collection" className="footer__link">Collection</a></li>
              <li><a href="#why-us" className="footer__link">Why Us</a></li>
              <li><a href="#colours" className="footer__link">Colours</a></li>
              <li><a href="#contact" className="footer__link">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} Gopi Industrial Yarns. All rights reserved.
          </p>
          <p className="footer__sub">
            Y-Cone Polyester Yarns
          </p>
        </div>
      </div>
    </footer>
  );
}
