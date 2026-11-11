import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ServiceOption } from '../types/contact';

interface FooterProps {
  onSelectService?: (service: ServiceOption) => void;
}

const FOOTER_SERVICES: ServiceOption[] = [
  'Academic Research Assistance',
  'Thesis and Dissertation Assistance',
  'Research Proposal Writing',
  'Literature Review and Data Analysis',
  'Business Research Proposals',
  'Content Humanization and Plagiarism Checking',
];

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    service?: ServiceOption
  ) => {
    e.preventDefault();
    if (service && onSelectService) {
      onSelectService(service);
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const offsetPosition =
        element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-navyDark text-white border-t border-white/10">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Overview */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-brand-navy border border-brand-gold/60 flex flex-col items-center justify-center rounded-sm shrink-0">
                <span className="font-heading font-bold text-white text-xs tracking-wider leading-none">
                  ER
                </span>
                <span className="w-3.5 h-0.5 bg-brand-gold mt-0.5" />
              </div>
              <span className="font-heading font-bold text-white text-base tracking-tight">
                Expert Research Ready Services
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-sm">
              Reliable academic research support, delivering accurate,
              well-structured and plagiarism-conscious research solutions
              tailored to educational needs.
            </p>
            <p className="text-xs text-brand-gold/90 tracking-wide">
              Committed to Academic Integrity, Originality &amp; Proper Referencing.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#approach"
                  onClick={(e) => scrollToSection(e, 'approach')}
                  className="hover:text-white transition-colors"
                >
                  Our Approach
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold mb-4">
              Research Services
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, 'contact', service)}
                    className="hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information Placeholders */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold mb-4">
              Contact Details
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <span className="block text-xs text-white/45 uppercase">
                  Email
                </span>
                <a
                  href="mailto:expertresearchreadyservices@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  expertresearchreadyservices@gmail.com
                </a>
              </li>
              <li>
                <span className="block text-xs text-white/45 uppercase">
                  Telephone
                </span>
                <div className="flex flex-col gap-1 mt-0.5">
                  <a
                    href="tel:+256766892024"
                    className="hover:text-white transition-colors"
                  >
                    +256 (0) 766 892 024
                  </a>
                  <a
                    href="tel:+256749579434"
                    className="hover:text-white transition-colors"
                  >
                    +256 (0) 749 579 434
                  </a>
                </div>
              </li>
              <li>
                <span className="block text-xs text-white/45 uppercase">
                  Hours
                </span>
                <span>Mon &ndash; Fri, 8:30 AM &ndash; 6:00 PM (EAT)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>
            &copy; {new Date().getFullYear()} Expert Research Ready Services. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-white underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            >
              Privacy Policy &amp; Academic Integrity Notice
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Academic Responsibility Modal */}
      {privacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navyDark/80 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-policy-title"
        >
          <div className="bg-white text-brand-textPrimary max-w-xl w-full rounded-sm border border-brand-border shadow-corporate-hover p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border">
              <h4
                id="privacy-policy-title"
                className="font-heading text-lg font-bold text-brand-navy"
              >
                Privacy Policy &amp; Academic Integrity Statement
              </h4>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="p-1.5 text-brand-textSecondary hover:text-brand-navy rounded-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-brand-textSecondary leading-relaxed max-h-[65vh] overflow-y-auto pr-1">
              <p>
                <strong className="text-brand-navy">Data Privacy:</strong>{' '}
                Personal contact information and project descriptions submitted
                via our consultation form are collected strictly for responding
                to your academic research enquiry and providing requested
                consultation services. We never sell or disclose client details
                to third parties.
              </p>
              <p>
                <strong className="text-brand-navy">
                  Academic Integrity &amp; Responsible Use:
                </strong>{' '}
                Expert Research Ready Services provides research consultation,
                structural guidance, literature synthesis support, methodological
                planning and editorial refinement. Clients remain responsible for
                adhering to their institution&apos;s academic conduct policies
                and ensuring proper citation and originality in their final
                submissions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="bg-brand-navy hover:bg-brand-navyLight text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

