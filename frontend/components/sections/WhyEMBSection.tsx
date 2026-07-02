'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.5, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, count, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const metrics = [
  { value: 2, suffix: '+', label: 'Active Ventures', sub: 'And growing' },
  { value: 100, suffix: '+', label: 'Clients Served', sub: 'Across India' },
  { value: 5, suffix: '+', label: 'Industries', sub: 'In our scope' },
  { value: 0, suffix: '', label: 'Compromises', sub: 'On quality' },
];

const reasons = [
  {
    title: 'Multi-industry expertise',
    description: 'Deep domain knowledge across marketing, distribution, technology, and finance.',
  },
  {
    title: 'Scalable business model',
    description: 'Each venture is architected to scale independently while sharing group resources.',
  },
  {
    title: 'Long-term vision',
    description: 'We build for decades, not quarters — with patience, capital, and conviction.',
  },
  {
    title: 'Customer-focused approach',
    description: 'Every decision starts with the end customer and works backwards from their needs.',
  },
  {
    title: 'Innovation-driven mindset',
    description: 'Constant iteration, embracing new technology, and challenging the status quo.',
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
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function WhyEMBSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-wide">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden mb-20">
          {metrics.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.1}>
              <div className="bg-white p-8 md:p-10 text-center">
                <p className="text-4xl md:text-5xl font-bold text-ink mb-1.5 tracking-tight">
                  {m.value === 0 ? (
                    <span>∞</span>
                  ) : (
                    <CountUp to={m.value} suffix={m.suffix} />
                  )}
                </p>
                <p className="font-medium text-ink text-sm">{m.label}</p>
                <p className="text-xs text-ink-quaternary mt-1">{m.sub}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Why Choose */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest
                           text-[#C89A45] mb-4">
              Why EMB
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tighter-lg mb-6 leading-tight">
              The EMB Difference.
            </h2>
            <p className="text-ink-secondary leading-relaxed mb-8">
              We are not just another holding company. EMB Ayub Enterprises is a deliberately
              curated portfolio of businesses, each chosen for its market potential, scalability,
              and alignment with our long-term vision.
            </p>
            <div className="p-6 bg-surface-secondary rounded-2xl border border-border">
              <p className="text-sm text-ink-secondary italic leading-relaxed">
                "Our goal is to build a portfolio that can weather any economic cycle,
                create meaningful employment, and deliver compounding returns — not just
                financial, but social."
              </p>
              <p className="text-xs text-ink-quaternary mt-3">— EMB Ayub, Founder</p>
            </div>
          </FadeUp>

          <div className="space-y-4">
            {reasons.map((r, i) => (
              <FadeUp key={r.title} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-transparent
                              hover:border-border hover:bg-surface-secondary transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#C89A45] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-ink text-sm mb-1">{r.title}</h4>
                    <p className="text-sm text-ink-tertiary leading-relaxed">{r.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
