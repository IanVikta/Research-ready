import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';

const INTEGRITY_PILLARS = [
  'Structured formulation of research questions, objectives and conceptual frameworks',
  'Rigorous adherence to institutional formatting and academic citation standards',
  'Plagiarism-conscious research methodology and transparent source attribution',
  'Tailored scholarly guidance adapted to your specific discipline and study level',
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 bg-white border-b border-brand-border"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Scholarly Visual & Prominent Commitment Panel */}
          <div
            className="lg:col-span-5 order-2 lg:order-1"
            data-aos="fade-right"
          >
            <div className="relative">
              <div className="border border-brand-border rounded-sm overflow-hidden bg-brand-surface shadow-corporate">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=950&q=80"
                  alt="Researcher reviewing academic literature and quantitative data sheets"
                  loading="lazy"
                  className="w-full h-[290px] sm:h-[340px] object-cover"
                />
              </div>

              {/* Prominent, Concise "Our Commitment" Highlight Block */}
              <div className="mt-6 bg-brand-navy text-white p-7 sm:p-8 rounded-sm border-l-4 border-brand-gold shadow-corporate-hover relative overflow-hidden">
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-5 h-5 text-brand-gold shrink-0" />
                    <h3 className="font-heading text-xs sm:text-sm uppercase tracking-[0.14em] font-bold text-brand-gold">
                      Our Commitment
                    </h3>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">
                    Academic Ethics
                  </span>
                </div>
                <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal">
                  We champion ethical scholarship—equipping researchers with
                  structured guidance, accurate referencing and original
                  analysis while upholding strict academic integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Concise Editorial Narrative & Expanded Foundations Panel */}
          <div className="lg:col-span-7 order-1 lg:order-2" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 mb-3.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
                About Expert Research Ready Services
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-[1.2] mb-6 max-w-xl">
              Clarity, Structure and Confidence in Every Research Journey.
            </h2>

            {/* Reduced paragraph density with generous breathing room */}
            <div className="space-y-5 text-brand-textSecondary text-base sm:text-[17px] leading-[1.75] mb-9 max-w-2xl">
              <p>
                Strong academic research rests on well-defined problems,
                coherent literature synthesis and sound methodology.{' '}
                <strong className="text-brand-textPrimary font-semibold">
                  Expert Research Ready Services
                </strong>{' '}
                delivers accurate, well-structured and plagiarism-conscious
                research support tailored to your educational stage.
              </p>
              <p>
                From shaping an initial research proposal to synthesising
                scholarly literature, analysing empirical data or refining thesis
                chapters, we help researchers bring methodological clarity and
                editorial precision to complex academic work.
              </p>
            </div>

            {/* Foundations Panel with increased vertical spacing */}
            <div className="bg-brand-surface border border-brand-border rounded-sm p-6 sm:p-7">
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-brand-border">
                <h3 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-brand-navy">
                  Foundations of Our Research Support
                </h3>
                <span className="w-6 h-[2px] bg-brand-gold" />
              </div>
              <ul className="space-y-4">
                {INTEGRITY_PILLARS.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 text-sm sm:text-[15px] text-brand-textPrimary leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Editorial Section Transition into Services */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex items-center gap-3 bg-white px-5 py-2 border border-brand-border rounded-sm shadow-xs"
        aria-hidden="true"
      >
        <span className="w-4 h-[1.5px] bg-brand-gold" />
        <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.16em] text-brand-navy">
          Core Services
        </span>
        <span className="w-4 h-[1.5px] bg-brand-gold" />
      </div>
    </section>
  );
};
