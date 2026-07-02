'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Search, Mail } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "How AI is Transforming Modern Businesses in 2026",
    description: "Artificial Intelligence is reshaping operations, customer experience, and decision-making across industries worldwide.",
    category: "Technology",
    author: "EMB Insights",
    readTime: "5 min",
    date: "Today",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
  },
  {
    id: 2,
    title: "Digital Marketing Strategies Every Brand Should Know",
    description: "Performance marketing and customer analytics are changing the way businesses reach their audiences.",
    category: "Marketing",
    author: "AdzSquare",
    readTime: "4 min",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  },
  {
    id: 3,
    title: "Finance Trends That Will Shape Tomorrow",
    description: "From fintech innovation to digital payments, finance continues evolving rapidly.",
    category: "Finance",
    author: "Finance Desk",
    readTime: "6 min",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80",
  },
  {
    id: 4,
    title: "The Future of Manufacturing in India",
    description: "Smart factories and automation are creating a new era of industrial growth.",
    category: "Business",
    author: "Industry Weekly",
    readTime: "5 min",
    date: "3 days ago",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80",
  },
  {
    id: 5,
    title: "Leadership Lessons from the World's Fastest Growing Companies",
    description: "What separates great leaders from average managers in today's business environment.",
    category: "Leadership",
    author: "Business Review",
    readTime: "7 min",
    date: "4 days ago",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
  },
  {
    id: 6,
    title: "Startup Ecosystem is Growing Faster Than Ever",
    description: "Innovation, funding and technology are driving the next wave of entrepreneurship.",
    category: "Startups",
    author: "Startup Daily",
    readTime: "4 min",
    date: "Last Week",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
  },
  {
    id: 7,
    title: "Why Every Business Needs Data Analytics",
    description: "Organizations are using analytics to improve efficiency and customer satisfaction.",
    category: "Technology",
    author: "Data Weekly",
    readTime: "5 min",
    date: "Last Week",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  },
  {
    id: 8,
    title: "The Rise of Digital Commerce in India",
    description: "E-commerce and digital payments continue to transform the retail landscape.",
    category: "Business",
    author: "Market Watch",
    readTime: "6 min",
    date: "Last Week",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80",
  },
];

const categories = ["All", "Business", "Technology", "Finance", "Marketing", "Leadership", "Startups"];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function BlogSection() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const shuffledArticles = useMemo(() => [...articles].sort(() => Math.random() - 0.5), []);

  const filteredArticles = shuffledArticles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredArticles[0];
  const latest = filteredArticles.slice(1, 7);

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-wide">

        {/* ── Header ── */}
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C89A45]/50
                             bg-[#D4AF63]/10 px-4 py-1.5 text-xs font-semibold uppercase
                             tracking-[0.2em] text-[#C89A45]">
              <TrendingUp className="h-3.5 w-3.5" />
              EMB Journal
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-[#1A0533]"
              style={{ letterSpacing: '-0.03em' }}>
              Insights &amp; Perspectives
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6B5A80]">
              Explore thoughtful articles on business, technology, finance,
              leadership and innovation from the EMB ecosystem.
            </p>
          </div>
        </FadeUp>

        {/* ── Search ── */}
        <FadeUp delay={0.1}>
          <div className="relative mx-auto mb-10 max-w-xl">
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B89B0]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="h-13 w-full rounded-2xl border border-[#E5DFF0] bg-[#F5F3FC]
                         pl-12 pr-5 text-sm text-[#1A0533] placeholder:text-[#9B89B0]
                         outline-none transition-all duration-300
                         focus:border-[#6B21A8] focus:bg-white focus:ring-4 focus:ring-[#6B21A8]/10"
            />
          </div>
        </FadeUp>

        {/* ── Categories ── */}
        <FadeUp delay={0.15}>
          <div className="mb-14 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider
                            transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#6B21A8] text-white shadow-lg shadow-[#6B21A8]/20'
                    : 'border border-[#E5DFF0] bg-white text-[#6B5A80] hover:border-[#6B21A8] hover:text-[#6B21A8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* ── Featured Article ── */}
        {featured && (
          <FadeUp delay={0.2}>
            <Link href="/blog" className="group block mb-16">
              <article className="overflow-hidden rounded-3xl border border-[#E5DFF0] bg-white
                                  transition-all duration-500 hover:-translate-y-1
                                  hover:border-[#6B21A8]/30 hover:shadow-xl hover:shadow-[#6B21A8]/10">
                <div className="relative h-[460px] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  {/* Purple gradient overlay */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(26,5,51,0.92) 0%, rgba(107,33,168,0.4) 50%, transparent 100%)' }} />

                  <div className="absolute bottom-0 max-w-3xl p-8 md:p-12">
                    <span className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
                      style={{ background: 'linear-gradient(135deg, #D4AF63, #C89A45)' }}>
                      {featured.category}
                    </span>
                    <h3 className="mt-5 text-2xl md:text-4xl font-bold leading-tight text-white">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-white/70">
                      {featured.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/50">
                      <span>{featured.author}</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {featured.readTime}
                      </span>
                      <span>{featured.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </FadeUp>
        )}

        {/* ── Latest Articles Grid ── */}
        <FadeUp delay={0.3}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <Link href="/blog" key={article.id} className="group">
                <article className="overflow-hidden rounded-3xl border border-[#E5DFF0] bg-white
                                    transition-all duration-500 hover:-translate-y-1
                                    hover:border-[#6B21A8]/30 hover:shadow-lg hover:shadow-[#6B21A8]/8 h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    {/* Purple tint overlay */}
                    <div className="absolute inset-0 bg-[#1A0533]/20 group-hover:bg-[#1A0533]/10 transition-colors" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C89A45]">
                      {article.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-[#1A0533]
                                   group-hover:text-[#6B21A8] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#6B5A80] line-clamp-2">
                      {article.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs text-[#9B89B0]">
                      <span>{article.author}</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold
                                    text-[#6B21A8] transition-all duration-300 group-hover:gap-3">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </FadeUp>

        {/* ── Newsletter ── */}
        <FadeUp delay={0.4}>
          <div className="mt-20 overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16"
            style={{ background: 'linear-gradient(135deg, #1A0533 0%, #3B1A5C 50%, #1A0533 100%)' }}>

            {/* Gold top accent line */}
            <div className="mx-auto mb-8 h-px w-24 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF63, transparent)' }} />

            <span className="inline-block rounded-full border border-[#D4AF63]/30
                             bg-[#D4AF63]/10 px-4 py-1 text-xs font-semibold
                             uppercase tracking-[0.18em] text-[#D4AF63]">
              Stay Connected
            </span>

            <h3 className="mt-6 text-3xl md:text-4xl font-bold text-white">
              Get EMB Insights
            </h3>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/50">
              Subscribe to receive thoughtful insights on business, innovation,
              leadership and long-term growth directly in your inbox.
            </p>

            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
  <div className="relative flex-1">
    <Mail
      className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D4AF63]"
    />

    <input
      type="email"
      placeholder="Enter your email address"
      className="
        h-16
        w-full
        rounded-2xl
        border
        border-[#D4AF63]/30
        bg-[#3F275D]
        pl-14
        pr-5
        text-base
        font-medium
        text-white
        placeholder:text-white/60
        caret-[#D4AF63]
        backdrop-blur-md
        outline-none
        transition-all
        duration-300
        focus:border-[#D4AF63]
        focus:bg-white/15
        focus:ring-4
        focus:ring-[#D4AF63]/20
      "
    />
  </div>

  <button
    className="
      h-16
      rounded-2xl
      px-10
      text-base
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-[1.02]
      hover:shadow-xl
      hover:shadow-[#C89A45]/20
      active:scale-95
    "
    style={{
      background: "linear-gradient(135deg, #C89A45, #D4AF63)",
    }}
  >
    Subscribe
  </button>
</div>

            {/* Gold bottom accent line */}
            <div className="mx-auto mt-10 h-px w-24 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF63, transparent)' }} />

          </div>
        </FadeUp>

      </div>
    </section>
  );
}