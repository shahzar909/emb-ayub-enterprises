'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await api.post('/contacts', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl border border-border bg-white
    text-sm text-ink placeholder:text-ink-quaternary
    focus:outline-none focus:ring-2 focus:ring-[#C89A45]/20 focus:border-[#C89A45]
    transition-all duration-200
  `;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8F9FB]">
      <div className="container-wide">

        {/* ── Header ── */}
        <FadeUp>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C89A45] mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4"
              style={{ letterSpacing: '-0.03em' }}>
              Let's Talk Business.
            </h2>
            <p className="text-ink-tertiary max-w-md mx-auto text-base leading-relaxed">
              Whether you're looking to partner, invest, or simply learn more — we'd love to hear from you.
            </p>
          </div>
        </FadeUp>

        {/* ── Single row: Left info + Map | Right form ── */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* ── Left: Map on top, 3 info cards below ── */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-4 h-full">

              {/* Map */}
              <div className="rounded-3xl overflow-hidden border border-border shadow-sm flex-1"
                style={{ minHeight: '280px' }}>
                <iframe
                  title="EMB Ayub Enterprises Location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3597.5757705068827!2d85.1106053!3d25.619009499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1782978634800!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', minHeight: '280px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* 3 info cards in a row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: Mail,
                    iconBg: 'bg-[#FDF8EE]',
                    iconColor: 'text-[#C89A45]',
                    label: 'Email',
                    value: 'Kayub0745@gmail.com',
                    href: 'mailto:Kayub0745@gmail.com',
                    hoverColor: 'hover:text-[#C89A45]',
                  },
                  {
                    icon: Phone,
                    iconBg: 'bg-green-50',
                    iconColor: 'text-green-600',
                    label: 'Phone',
                    value: '+91 7739283004',
                    href: 'tel:+917739283004',
                    hoverColor: 'hover:text-green-600',
                  },
                  {
                    icon: MapPin,
                    iconBg: 'bg-orange-50',
                    iconColor: 'text-orange-500',
                    label: 'Location',
                    value: 'Patna, Bihar',
                    href: null,
                    hoverColor: '',
                  },
                ].map((item) => (
                  <div key={item.label}
                    className="bg-white rounded-2xl border border-border p-4 flex flex-col gap-3
                               hover:border-border-strong hover:shadow-sm transition-all duration-200">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                      <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-2xs text-ink-quaternary mb-0.5 uppercase tracking-wider font-medium">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href}
                          className={`text-xs font-semibold text-ink transition-colors break-all ${item.hoverColor}`}>
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-xs font-semibold text-ink">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </FadeUp>

          {/* ── Right: Form ── */}
          <FadeUp delay={0.2}>
            <div className="bg-white rounded-3xl border border-border shadow-sm p-8 h-full flex flex-col">

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center py-10">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">Message Received!</h3>
                  <p className="text-ink-tertiary text-sm max-w-xs">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-[#C89A45] hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink">Send us a message</h3>
                    <p className="text-xs text-ink-quaternary mt-1">
                      Fill in the form and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                          Full Name <span className="text-[#C89A45]">*</span>
                        </label>
                        <input type="text" required placeholder="Your full name"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                          Email Address <span className="text-[#C89A45]">*</span>
                        </label>
                        <input type="email" required placeholder="you@email.com"
                          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-ink-secondary mb-1.5">Phone Number</label>
                        <input type="tel" placeholder="+91 XXXXX XXXXX"
                          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-ink-secondary mb-1.5">Company</label>
                        <input type="text" placeholder="Your company"
                          value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                          className={inputClass} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                        Message <span className="text-[#C89A45]">*</span>
                      </label>
                      <textarea required
                        placeholder="Tell us about your project, inquiry, or how we can help..."
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        className={inputClass + ' resize-none h-32'} />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                        {errorMsg}
                      </p>
                    )}

                    <button type="submit" disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-ink text-white
                                 text-sm font-semibold rounded-xl hover:bg-ink-secondary active:scale-[0.98]
                                 transition-all duration-200 disabled:opacity-50 mt-auto">
                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>

                  </form>
                </>
              )}

            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}