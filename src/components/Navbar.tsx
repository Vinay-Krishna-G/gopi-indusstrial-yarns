import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WHATSAPP_URL, COMPANY_NAME } from '../data/constants';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collection', href: '#collection' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Colours', href: '#colours' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          aria-label={`${COMPANY_NAME} — Home`}
        >
          <span className="navbar__logo-primary">GOPI</span>
          <span className="navbar__logo-secondary">Industrial Yarns</span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__cta"
          id="navbar-enquire-btn"
        >
          Enquire
        </a>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="navbar__mobile-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__mobile-link"
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__mobile-cta"
            id="navbar-mobile-enquire-btn"
            tabIndex={menuOpen ? 0 : -1}
          >
            Enquire on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
