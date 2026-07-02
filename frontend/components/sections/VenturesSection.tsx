'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Clock, Zap } from 'lucide-react';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const activeVentures = [
  {
    name: 'AdzSquare',
    category: 'Digital Marketing Agency',
    description: 'Helping brands grow through digital experiences, performance marketing, and strategic campaigns that drive real, measurable results.',
    services: ['Branding', 'Performance Marketing', 'Social Media', 'Web Development'],
    href: 'https://www.adzsquare.com',
    accentColor: '#C89A45',
    accentBg: '#EEF2FF',
    letter: 'A',
    logo: '/ad.webp',
  },
  {
    name: 'Masala Udyog',
    category: 'Distribution & Supply Chain',
    description: 'Delivering quality FMCG and spice products through efficient distribution networks and robust supply chain operations across India.',
    services: ['FMCG Distribution', 'Spice Distribution', 'Supply Chain', 'Logistics'],
    href: 'https://masalaudyog.co.in/',
    accentColor: '#D97706',
    accentBg: '#FEF3C7',
    letter: 'M',
    logo: '/masala.webp',
  },
];

const futureVentures = [
  { name: 'Tax & Audit Services', desc: 'Precision in every number' },
  { name: 'EMB Consulting', desc: 'Strategy that scales' },
  { name: 'EMB Technology', desc: 'Building the future' },
  { name: 'Financial Services', desc: 'Capital for growth' },
];

export function VenturesSection() {
  return (
    <section id="ventures" className="section-padding bg-white">
      <div className="container-wide">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C89A45] mb-4">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tighter-lg mb-4">
              The Ventures
            </h2>
            <p className="text-ink-tertiary text-lg max-w-lg mx-auto">
              Each venture is built with intent — solving real problems, serving real markets.
            </p>
          </div>
        </FadeUp>

        {/* Active Ventures */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {activeVentures.map((venture, i) => (
            <FadeUp key={venture.name} delay={i * 0.15}>
              <div className="venture-card group relative bg-white border border-border rounded-3xl
                              overflow-hidden p-8 flex flex-col h-full">

                {/* Active badge */}
                <div className="absolute top-6 right-6">
                  <span className="flex items-center gap-1.5 text-2xs font-medium px-2.5 py-1
                                   bg-green-50 text-green-700 rounded-full border border-green-100">
                    <Zap className="w-2.5 h-2.5" />
                    Active
                  </span>
                </div>

                {/* Logo */}
                {venture.logo ? (
                  <img
                    src={venture.logo}
                    alt={venture.name}
                    className="w-14 h-14 rounded-2xl object-contain mb-6 bg-white p-1.5 border border-border"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-xl font-bold"
                    style={{ background: venture.accentBg, color: venture.accentColor }}
                  >
                    {venture.letter}
                  </div>
                )}

                <span
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: venture.accentColor }}
                >
                  {venture.category}
                </span>

                <h3 className="text-2xl font-bold text-ink mb-3">{venture.name}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed mb-6 flex-1">
                  {venture.description}
                </p>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {venture.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-lg bg-surface-secondary text-ink-tertiary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={venture.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white
                             px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 w-fit"
                  style={{ background: venture.accentColor }}
                >
                  Visit Website
                  <ArrowUpRight className="w-4 h-4" />
                </a>

              </div>
            </FadeUp>
          ))}
        </div>

        {/* Future Ventures Card */}
        <FadeUp delay={0.3}>
          <div className="relative bg-ink rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10" />

            <div className="relative z-10">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1
                                   bg-white/10 text-white/60 rounded-full mb-4 w-fit">
                    <Clock className="w-3 h-3" />
                    Coming Soon
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Future Ventures
                  </h3>
                  <p className="text-white/50 text-sm max-w-md">
                    EMB is actively building its next portfolio of businesses.
                    These verticals are in development and will launch over the coming years.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {futureVentures.map((v, i) => (
                  <motion.div
                    key={v.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                               hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                      <span className="text-white/60 text-xs font-bold">{v.name[0]}</span>
                    </div>
                    <p className="text-white text-sm font-medium mb-1">{v.name}</p>
                    <p className="text-white/40 text-xs">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}