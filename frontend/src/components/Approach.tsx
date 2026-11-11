import React from 'react';
import { Search, Compass, Layers, CheckSquare } from 'lucide-react';

interface StageItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const APPROACH_STAGES: StageItem[] = [
  {
    number: '01',
    title: 'Understand',
    description:
      "We begin by understanding the client's academic requirements, objectives and research expectations.",
    icon: Search,
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'We establish a clear research direction and identify the appropriate approach.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Support',
    description:
      'We provide structured research guidance and assistance based on the agreed requirements.',
    icon: Layers,
  },
  {
    number: '04',
    title: 'Refine',
    description:
      'We review the work for clarity, consistency, organisation and appropriate academic presentation.',
    icon: CheckSquare,
  },
];

export const Approach: React.FC = () => {
  return (
    <section
      id="approach"
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-brand-border"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-2xl mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-brand-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
              Our Methodology
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-tight mb-4">
            A Structured Approach to Better Research.
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
            Every academic inquiry benefits from a deliberate, transparent
            workflow. Our four-stage consultation model ensures clarity from
            initial scoping through to final academic review.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (lg and above) */}
        <div className="hidden lg:block relative">
          {/* Connecting Horizontal Line */}
          <div
            className="absolute top-7 left-0 right-0 h-[1px] bg-brand-border z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {APPROACH_STAGES.map((stage, index) => {
              const IconComponent = stage.icon;
              return (
                <div
                  key={stage.number}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="flex flex-col"
                >
                  {/* Timeline Node */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-sm bg-brand-navy text-white border-2 border-white shadow-corporate flex items-center justify-center shrink-0">
                      <span className="font-heading text-base font-bold text-brand-gold">
                        {stage.number}
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-brand-surface border border-brand-border rounded-sm text-xs font-semibold uppercase tracking-widest text-brand-navy">
                      Stage {stage.number}
                    </div>
                  </div>

                  {/* Stage Content Box */}
                  <div className="bg-brand-surface border border-brand-border rounded-sm p-6 flex-1 flex flex-col justify-between hover:border-brand-navy/30 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading text-lg font-bold text-brand-navy">
                          {stage.number} &mdash; {stage.title}
                        </h3>
                        <IconComponent className="w-4 h-4 text-brand-gold shrink-0" />
                      </div>
                      <p className="text-sm text-brand-textSecondary leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (below lg) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 border-l-2 border-brand-border space-y-8">
          {APPROACH_STAGES.map((stage, index) => {
            const IconComponent = stage.icon;
            return (
              <div
                key={stage.number}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="relative"
              >
                {/* Vertical Timeline Node Marker */}
                <div
                  className="absolute -left-[35px] sm:-left-[43px] top-0 w-9 h-9 rounded-sm bg-brand-navy text-brand-gold font-heading text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm"
                  aria-hidden="true"
                >
                  {stage.number}
                </div>

                <div className="bg-brand-surface border border-brand-border rounded-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-brand-navy">
                      {stage.number} &mdash; {stage.title}
                    </h3>
                    <IconComponent className="w-4 h-4 text-brand-gold shrink-0" />
                  </div>
                  <p className="text-sm text-brand-textSecondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

