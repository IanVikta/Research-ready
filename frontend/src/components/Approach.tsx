import React from 'react';
import { Search, Compass, Layers, CheckSquare } from 'lucide-react';

interface StageItem {
  number: string;
  title: string;
  description: string;
  outcome: string;
  icon: React.ElementType;
}

const APPROACH_STAGES: StageItem[] = [
  {
    number: '01',
    title: 'Understand',
    description:
      "We begin by understanding the client's academic requirements, objectives and research expectations.",
    outcome: 'Scope & Objectives Alignment',
    icon: Search,
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'We establish a clear research direction and identify the appropriate approach.',
    outcome: 'Structured Research Framework',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Support',
    description:
      'We provide structured research guidance and assistance based on the agreed requirements.',
    outcome: 'Methodical Scholarly Guidance',
    icon: Layers,
  },
  {
    number: '04',
    title: 'Refine',
    description:
      'We review the work for clarity, consistency, organisation and appropriate academic presentation.',
    outcome: 'Clarity & Academic Precision',
    icon: CheckSquare,
  },
];

export const Approach: React.FC = () => {
  return (
    <section
      id="approach"
      className="py-24 sm:py-28 lg:py-32 bg-white border-b border-brand-border"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Two-Column Editorial Heading */}
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16"
              data-aos="fade-up"
            >
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mb-3.5">
                  <span className="w-6 h-[2px] bg-brand-gold" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
                    Our Process
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-[1.2]">
                  A Structured Approach to Better Research.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-brand-textSecondary text-base leading-[1.7] border-l-2 border-brand-gold pl-4">
                  Every academic inquiry benefits from a deliberate, transparent
                  workflow. Our four-stage consultation model brings order and
                  precision from initial scoping through to final review.
                </p>
              </div>
            </div>

            {/* Desktop Horizontal Timeline (lg and above) */}
            <div className="hidden lg:block relative">
              {/* Connecting Horizontal Line */}
              <div
                className="absolute top-7 left-0 right-0 h-[1px] bg-brand-border z-0"
                aria-hidden="true"
              />

                <div className="grid grid-cols-4 gap-7 relative z-10">
                  {APPROACH_STAGES.map((stage, index) => {
                    const IconComponent = stage.icon;
                    return (
                      <div
                        key={stage.number}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="group flex flex-col"
                      >
                        {/* Timeline Node */}
                            <div className="flex items-center gap-3.5 mb-6">
                              <div className="w-14 h-14 rounded-sm bg-brand-navy text-white border-2 border-white shadow-corporate flex items-center justify-center shrink-0 group-hover:border-brand-gold transition-colors">
                                <span className="font-heading text-base font-bold text-brand-gold">
                                  {stage.number}
                                </span>
                              </div>
                                <div className="px-3 py-1 bg-white border border-brand-border rounded-sm text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-navy shadow-2xs">
                                  Stage {stage.number}
                                </div>
                              </div>

                              {/* Stage Content Box */}
                                <div className="bg-brand-surface border border-brand-border rounded-sm p-6 flex-1 flex flex-col justify-between hover:bg-white hover:border-brand-navy/35 hover:shadow-corporate transition-all duration-200">
                                  <div>
                                      <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-brand-border">
                                        <h3 className="font-heading text-lg font-bold text-brand-navy">
                                          {stage.number} &mdash; {stage.title}
                                        </h3>
                                        <IconComponent className="w-4 h-4 text-brand-gold shrink-0" />
                                      </div>
                                        <p className="text-sm text-brand-textSecondary leading-[1.7] mb-5">
                                          {stage.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-brand-border/70 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                                      <span className="text-xs font-semibold text-brand-navy">
                                        {stage.outcome}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                );
            })}
                              </div>
                            </div>

                            {/* Mobile & Tablet Vertical Timeline (below lg) */}
                              <div className="lg:hidden relative pl-6 sm:pl-8 border-l-2 border-brand-border space-y-7">
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
                                          <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-brand-border">
                                            <h3 className="font-heading text-base sm:text-lg font-bold text-brand-navy">
                                              {stage.number} &mdash; {stage.title}
                                            </h3>
                                            <IconComponent className="w-4 h-4 text-brand-gold shrink-0" />
                                          </div>
                                            <p className="text-sm text-brand-textSecondary leading-[1.7] mb-4">
                                              {stage.description}
                                            </p>
                                            <div className="pt-2.5 border-t border-brand-border/70 flex items-center gap-2">
                                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                                              <span className="text-xs font-semibold text-brand-navy">
                                                {stage.outcome}
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      );
          })}
                                    </div>
      </div>
                            </section>
                            );
};
