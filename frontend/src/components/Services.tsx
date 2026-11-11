import React from 'react';
import {
  Compass,
  BookOpen,
  FileText,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';
import { ServiceItem, ServiceOption } from '../types/contact';

interface ServicesProps {
  onSelectService?: (service: ServiceOption) => void;
}

const SERVICES_DATA: (ServiceItem & { icon: React.ElementType })[] = [
  {
    id: 'academic-research-assistance',
    number: '01',
    title: 'Academic Research Assistance',
    description:
      'Professional guidance and support for academic research projects, helping clients develop clear research directions, structured arguments and well-organised academic work.',
    highlights: [
      'Topic refinement & scoping',
      'Argument structure & coherence',
      'Academic referencing & formatting',
    ],
    icon: Compass,
  },
  {
    id: 'thesis-dissertation-assistance',
    number: '02',
    title: 'Thesis and Dissertation Assistance',
    description:
      'Structured support throughout the thesis and dissertation process, from research planning and chapter development to review and refinement.',
    highlights: [
      'Chapter-by-chapter progression',
      'Structural & editorial review',
      'Alignment with faculty guidelines',
    ],
    icon: BookOpen,
  },
  {
    id: 'research-proposal-writing',
    number: '03',
    title: 'Research Proposal Writing',
    description:
      'Assistance in developing coherent research proposals, including research backgrounds, problem statements, objectives, questions and methodologies.',
    highlights: [
      'Problem statement formulation',
      'Research questions & objectives',
      'Methodological design framework',
    ],
    icon: FileText,
  },
  {
    id: 'literature-review-data-analysis',
    number: '04',
    title: 'Literature Review and Data Analysis',
    description:
      'Support with reviewing academic literature, identifying relevant research themes, organising findings and interpreting research data using appropriate analytical methods.',
    highlights: [
      'Thematic literature synthesis',
      'Research gap identification',
      'Qualitative & quantitative analysis',
    ],
    icon: BarChart3,
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const handleEnquireClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    service: ServiceOption
  ) => {
    e.preventDefault();
    if (onSelectService) {
      onSelectService(service);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const offsetPosition =
        contactSection.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="relative pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 bg-brand-surface border-b border-brand-border"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Editorial Section Header */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16"
          data-aos="fade-up"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
                Core Capabilities
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-[1.2] max-w-xl">
              Research Support for Every Academic Journey.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-brand-textSecondary text-base leading-[1.7] border-l-2 border-brand-gold pl-4">
              From the initial research concept to analysis and final
              refinement, we provide tailored support to help make complex
              academic work more manageable.
            </p>
          </div>
        </div>

        {/* 4-Column Service Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-white border border-brand-border rounded-sm p-7 flex flex-col justify-between transition-all duration-300 hover:border-brand-navy/40 hover:shadow-corporate-hover hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Top Architectural Accent Rule */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-brand-navy/10 group-hover:bg-brand-gold transition-colors duration-300"
                  aria-hidden="true"
                />

                <div>
                  {/* Top Row: Icon & Service Number */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border">
                    <div className="w-11 h-11 bg-brand-surface border border-brand-border rounded-sm flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy transition-colors duration-200">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-heading text-[11px] font-bold tracking-[0.16em] text-brand-navy bg-brand-surface px-2.5 py-1 border border-brand-border rounded-sm uppercase">
                      SERVICE {service.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-heading text-lg font-bold text-brand-navy leading-snug mb-3.5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-brand-textSecondary leading-[1.7] mb-6">
                    {service.description}
                  </p>

                  {/* Key Scope Items */}
                  <div className="border-t border-brand-border/80 pt-4 mb-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-textSecondary mb-2.5">
                      Key Areas of Focus
                    </p>
                    <ul className="space-y-2">
                      {service.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-xs font-medium text-brand-textPrimary"
                        >
                          <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enquire Button */}
                <div className="pt-3 border-t border-brand-border/60">
                  <a
                    href="#contact"
                    onClick={(e) => handleEnquireClick(e, service.title)}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold uppercase tracking-[0.12em] text-brand-navy group-hover:text-brand-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-sm"
                  >
                    <span>Enquire About Service</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Subtle Editorial Section Transition into Our Approach */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex items-center gap-3 bg-white px-5 py-2 border border-brand-border rounded-sm shadow-xs"
        aria-hidden="true"
      >
        <span className="w-4 h-[1.5px] bg-brand-gold" />
        <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.16em] text-brand-navy">
          Our Methodology
        </span>
        <span className="w-4 h-[1.5px] bg-brand-gold" />
      </div>
    </section>
  );
};
