'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Shield, TrendingUp, Layers, ArrowUpRight } from 'lucide-react';

const pillars = [
  { icon: Lightbulb, title: 'Innovation', description: 'Continuously exploring new ideas and business models to stay ahead of the curve.' },
  { icon: Shield, title: 'Trust', description: 'Building transparent, long-term relationships with clients, partners, and communities.' },
  { icon: TrendingUp, title: 'Growth', description: 'Pursuing sustainable expansion through data-driven strategies and bold execution.' },
  { icon: Layers, title: 'Scalability', description: 'Architecting businesses from day one to scale efficiently as markets expand.' },
];

const timeline = [
  { year: '2025', label: 'Founded', desc: 'EMB Ayub Enterprises established as a holding company.' },
  { year: '2026', label: 'AdzSquare', desc: 'Launched digital marketing agency serving 50+ brands.' },
  { year: '2025', label: 'Masala Udyog', desc: 'Entered FMCG distribution with pan-India supply chain.' },
  { year: '2026+', label: 'Expanding', desc: 'Technology, consulting & financial services in pipeline.' },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-surface-secondary">
      <div className="container-wide">

        {/* ── Top: Text + Timeline ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — Text */}
          <div>
            <FadeUp>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C89A45] mb-4">
                About EMB
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-6"
                style={{ letterSpacing: '-0.03em' }}>
                Built for<br />Long-Term Growth.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-ink-secondary leading-relaxed mb-4">
                EMB Ayub Enterprises is a diversified holding company focused on building
                sustainable businesses across industries. We identify high potential verticals,
                invest in the right talent and infrastructure, and create ventures that deliver
                lasting value.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-ink-secondary leading-relaxed mb-10">
                From digital marketing to distribution, our portfolio reflects our belief
                that the most resilient businesses serve real, everyday needs executed
                with precision and a relentless focus on quality.
              </p>
            </FadeUp>

            {/* Stat chips */}
            <FadeUp delay={0.4}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: '2025', l: 'Founded' },
                  { v: '2+', l: 'Active Ventures' },
                  { v: '5+', l: 'Industries Targeted' },
                  { v: '100+', l: 'Clients Served' },
                ].map((item) => (
                  <div key={item.l}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border
                               hover:border-border-strong hover:shadow-sm transition-all duration-200">
                    <p className="text-2xl font-bold text-ink">{item.v}</p>
                    <p className="text-xs text-ink-quaternary leading-tight">{item.l}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — Timeline (replaces odd icon diagram) */}
          <FadeUp delay={0.25}>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    className="relative flex gap-6 pb-8 last:pb-0"
                  >
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-white border-2 border-[#C89A45]
                                    rounded-full flex items-center justify-center shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C89A45]" />
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl border border-border p-5 flex-1
                                    hover:border-border-strong hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-[#C89A45] uppercase tracking-wider">
                          {item.year}
                        </span>
                        {i <= 2 && (
                          <span className="text-2xs px-2 py-0.5 bg-green-50 text-green-700
                                           border border-green-100 rounded-full font-medium">
                            Live
                          </span>
                        )}
                        {i === 3 && (
                          <span className="text-2xs px-2 py-0.5 bg-[#FDF8EE] text-blue-700
                                           border border-blue-100 rounded-full font-medium">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-ink text-sm mb-1">{item.label}</p>
                      <p className="text-xs text-ink-tertiary leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── Bottom: Pillars ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => (
            <FadeUp key={pillar.title} delay={i * 0.08}>
              <div className="bg-white p-6 rounded-2xl border border-border
                            hover:border-border-strong hover:shadow-venture-card
                            transition-all duration-300 group h-full">
                <div className="w-10 h-10 bg-surface-secondary rounded-xl flex items-center
                              justify-center mb-4 group-hover:bg-[#C89A45]/10 transition-colors">
                  <pillar.icon className="w-5 h-5 text-ink-tertiary group-hover:text-[#C89A45] transition-colors" />
                </div>
                <h3 className="font-semibold text-ink mb-2">{pillar.title}</h3>
                <p className="text-sm text-ink-tertiary leading-relaxed">{pillar.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
