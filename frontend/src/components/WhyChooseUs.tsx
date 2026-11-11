import React from 'react';
import {
  Target,
  LayoutGrid,
  Sliders,
  Lock,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

interface ValueItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const CORE_VALUES: ValueItem[] = [
  {
    title: 'Accuracy and Attention to Detail',
    description:
      'Every research document, literature synthesis and analytical review is approached with careful attention to methodological consistency and scholarly precision.',
    icon: Target,
  },
  {
    title: 'Structured Academic Support',
    description:
      'We organise complex academic projects into logical stages, helping researchers build coherent arguments and well-structured chapters.',
    icon: LayoutGrid,
  },
  {
    title: 'Tailored Research Solutions',
    description:
      'Support is adapted to your specific research topic, academic discipline, institutional guidelines and methodological requirements.',
    icon: Sliders,
  },
  {
    title: 'Confidentiality and Professionalism',
    description:
      'All research enquiries, draft manuscripts, datasets and personal details are handled with strict discretion and professional care.',
    icon: Lock,
  },
  {
    title: 'Commitment to Academic Integrity',
    description:
      'We promote ethical research practices, original thought, accurate source attribution and responsible use of academic consultation.',
    icon: ShieldCheck,
  },
  {
    title: 'Clear Communication',
    description:
      'Transparent timelines, responsive updates and constructive scholarly feedback ensure you remain informed at every step of the collaboration.',
    icon: MessageSquare,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-choose-us"
      className="py-20 sm:py-24 lg:py-28 bg-brand-navy text-white border-b border-brand-navyDark"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16" data-aos="fade-up">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                Our Standards &amp; Values
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Why Work With Expert Research Ready Services?
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed border-l-2 border-brand-gold pl-4">
              Academic research demands discipline, objectivity and clarity. Our
              work is guided by core principles that prioritise scholarly
              quality and ethical support.
            </p>
          </div>
        </div>

        {/* 6 Core Values Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_VALUES.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="bg-brand-navyLight/50 border border-white/10 rounded-sm p-7 hover:border-brand-gold/50 transition-colors duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/15 flex items-center justify-center text-brand-gold">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-white/40">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2.5">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {value.description}
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

