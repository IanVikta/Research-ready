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
      className="py-20 sm:py-24 lg:py-28 bg-brand-surface border-b border-brand-border"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-brand-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
              Core Capabilities
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-tight mb-4">
            Research Support for Every Academic Journey.
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
            From the initial research concept to analysis and final refinement,
            we provide tailored support to help make complex academic work more
            manageable.
          </p>
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
                className="group bg-white border border-brand-border rounded-sm p-7 flex flex-col justify-between transition-all duration-300 hover:border-brand-navy/40 hover:shadow-corporate-hover hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Row: Icon & Service Number */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border">
                    <div className="w-11 h-11 bg-brand-surface border border-brand-border rounded-sm flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy transition-colors duration-200">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-heading text-xs font-bold tracking-[0.15em] text-brand-gold uppercase">
                      SERVICE {service.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-heading text-lg font-bold text-brand-navy leading-snug mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-brand-textSecondary leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Scope Items */}
                  <ul className="space-y-2 mb-7 border-t border-brand-border/70 pt-4">
                    {service.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs font-medium text-brand-textPrimary"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enquire Button */}
                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => handleEnquireClick(e, service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-sm"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

