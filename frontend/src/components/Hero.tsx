import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  BookOpenCheck,
  Sliders,
} from 'lucide-react';

const TRUST_INDICATORS = [
  {
    icon: ShieldCheck,
    label: 'Academic Integrity & Originality',
  },
  {
    icon: BookOpenCheck,
    label: 'Methodological Rigour',
  },
  {
    icon: Sliders,
    label: 'Tailored Academic Support',
  },
];

export const Hero: React.FC = () => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const offsetPosition =
        element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 bg-white bg-editorial-grid border-b border-brand-border overflow-hidden"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-7 max-w-2xl" data-aos="fade-up">
            {/* <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-brand-surface border border-brand-border rounded-sm mb-7">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
                Academic Research Consultancy &amp; Support
              </span>
            </div> */}

            {/* Heading with increased line-height and deliberate max-width for a balanced line break */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-brand-navy leading-[1.22] sm:leading-[1.24] lg:leading-[1.25] tracking-tight max-w-[16.5ch] mb-7">
              Research Excellence Begins With the Right Support.
            </h1>

            <p className="text-base sm:text-lg text-brand-textSecondary leading-[1.75] mb-9 max-w-xl">
              Reliable academic research assistance designed to bring clarity,
              structure and precision to every stage of your research journey.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-9">
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
                className="inline-flex items-center justify-center gap-2.5 bg-brand-navy hover:bg-brand-navyLight text-white font-medium text-sm sm:text-base px-7 py-3.5 rounded-sm transition-all duration-200 shadow-sm hover:shadow-corporate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-navy"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-surface text-brand-navy font-medium text-sm sm:text-base px-7 py-3.5 rounded-sm border border-brand-navy/25 hover:border-brand-navy transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-navy"
              >
                <span>Request Consultation</span>
              </a>
            </div>

            {/* Compact 3-Item Trust Indicators */}
            <div className="pt-5 border-t border-brand-border flex flex-wrap items-center gap-y-2.5 gap-x-5">
              {TRUST_INDICATORS.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <React.Fragment key={item.label}>
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-textPrimary">
                      <IconComponent className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {index < TRUST_INDICATORS.length - 1 && (
                      <span
                        className="hidden sm:inline-block w-1 h-1 rounded-full bg-brand-border"
                        aria-hidden="true"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Photograph of Researcher Working With Academic Material & Data */}
          <div
            className="lg:col-span-5 relative"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Retained architectural gold outline behind the image */}
              <div
                className="absolute -top-3.5 -right-3.5 w-full h-full border border-brand-gold/60 rounded-sm pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-3.5 -left-3.5 w-2/3 h-2/3 bg-brand-surface border border-brand-border rounded-sm -z-10 hidden sm:block"
                aria-hidden="true"
              />

              {/* Main photograph container */}
              <div className="relative bg-brand-navy rounded-sm overflow-hidden border border-brand-border shadow-corporate">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1100&q=85"
                  alt="Researcher working closely with academic manuscripts, research documents and structured analytical notes"
                  className="w-full h-[340px] sm:h-[420px] lg:h-[460px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/25 to-transparent" />

                {/* Subtle editorial caption overlay inside frame */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="w-10 h-0.5 bg-brand-gold mb-3" />
                  <p className="font-heading text-sm sm:text-base font-semibold tracking-tight text-white mb-1">
                    Methodical Guidance Across Every Stage
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Supporting postgraduate candidates, undergraduate students
                    and independent scholars with structured research clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
