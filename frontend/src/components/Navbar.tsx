import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'About Us', href: '#about', sectionId: 'about' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'Our Approach', href: '#approach', sectionId: 'approach' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection([
    'home',
    'about',
    'services',
    'approach',
    'why-choose-us',
    'contact',
  ]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when Escape key is pressed
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white border-b border-brand-border shadow-navbar py-3.5'
          : 'bg-white/95 backdrop-blur-sm border-b border-brand-border/60 py-5'
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between"
          aria-label="Primary Navigation"
        >
          {/* Company Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="group flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-sm"
          >
            <div className="w-9 h-9 bg-brand-navy flex flex-col items-center justify-center rounded-sm shrink-0 border border-brand-navy transition-colors group-hover:bg-brand-navyLight">
              <span className="font-heading font-bold text-white text-sm tracking-wider leading-none">
                ER
              </span>
              <span className="w-4 h-0.5 bg-brand-gold mt-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-brand-navy text-base sm:text-[17px] tracking-tight leading-snug">
                Expert Research Ready Services
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-brand-textSecondary font-medium hidden sm:block">
                Academic Research Consultancy
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  activeSection === item.sectionId ||
                  (item.sectionId === 'approach' &&
                    activeSection === 'why-choose-us');
                return (
                  <li key={item.sectionId}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.sectionId)}
                      className={`relative py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-sm ${
                        isActive
                          ? 'text-brand-navy font-semibold'
                          : 'text-brand-textSecondary hover:text-brand-navy'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-brand-gold transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="h-5 w-px bg-brand-border" aria-hidden="true" />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navyLight text-white text-sm font-medium px-5 py-2.5 rounded-sm transition-all duration-200 border border-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-navy"
            >
              <span>Request Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-brand-gold" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center p-2.5 text-brand-navy hover:bg-brand-surface rounded-sm border border-transparent hover:border-brand-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-navigation-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-brand-border ${
          mobileMenuOpen
            ? 'max-h-[420px] opacity-100 border-t mt-3.5'
            : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 py-5 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.sectionId}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className={`flex items-center justify-between px-3.5 py-2.5 text-base font-medium rounded-sm transition-colors ${
                  isActive
                    ? 'bg-brand-surface text-brand-navy font-semibold border-l-2 border-brand-gold'
                    : 'text-brand-textPrimary hover:bg-brand-surface/70 hover:text-brand-navy'
                }`}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-3 mt-2 border-t border-brand-border">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navyLight text-white text-sm font-medium px-5 py-3 rounded-sm transition-colors"
            >
              <span>Request Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-brand-gold" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

