'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Megaphone, Palette, Globe, Truck, Briefcase, TrendingUp,
} from 'lucide-react';

const services = [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Performance-driven campaigns across search, social, and programmatic channels that maximize ROI.',
    venture: 'AdzSquare',
    color: '#C89A45',
    bg: '#EEF2FF',
  },
  {
    icon: Palette,
    title: 'Branding & Design',
    description: 'Strategic brand identity systems that communicate your vision and build lasting market presence.',
    venture: 'AdzSquare',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Modern, performant web experiences built with cutting-edge technology and conversion-first design.',
    venture: 'AdzSquare',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
  {
    icon: Truck,
    title: 'Distribution Operations',
    description: 'End-to-end supply chain management and FMCG distribution with nationwide reach and reliability.',
    venture: 'Masala Udyog',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    icon: Briefcase,
    title: 'Business Consulting',
    description: 'Strategic advisory services helping businesses identify growth opportunities and optimize operations.',
    venture: 'Coming Soon',
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    icon: TrendingUp,
    title: 'Strategic Growth',
    description: 'Data-driven market expansion strategies that help businesses scale sustainably across new verticals.',
    venture: 'EMB Group',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-surface-secondary">
      <div className="container-wide">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest
                           text-[#C89A45] mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tighter-lg mb-4">
              Our Services
            </h2>
            <p className="text-ink-tertiary max-w-md mx-auto">
              Across our portfolio of ventures, we deliver specialized expertise
              in marketing, distribution, and business growth.
            </p>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <FadeUp key={service.title} delay={i * 0.08}>
              <div className="service-card group bg-white border border-border rounded-2xl p-6
                            hover:border-border-strong cursor-default h-full flex flex-col">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5
                             transition-transform duration-300 group-hover:scale-110"
                  style={{ background: service.bg }}
                >
                  <service.icon className="w-5 h-5" style={{ color: service.color }} />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-ink">{service.title}</h3>
                  <span
                    className="text-2xs font-medium px-2 py-0.5 rounded-md whitespace-nowrap"
                    style={{ background: service.bg, color: service.color }}
                  >
                    {service.venture}
                  </span>
                </div>
                <p className="text-sm text-ink-tertiary leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
