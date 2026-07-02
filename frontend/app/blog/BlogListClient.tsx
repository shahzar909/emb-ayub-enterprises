'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Search, TrendingUp } from 'lucide-react';
import { api, type Blog, type PaginatedResponse } from '@/lib/api';
import { formatDateShort } from '@/lib/utils';

const CATEGORIES = ['All', 'Business', 'Technology', 'Marketing', 'Finance', 'Strategy', 'Leadership'];

const staticPosts: Blog[] = [
  {
    _id: '1', title: 'How AI is Transforming Modern Businesses',
    slug: 'ai-business',
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
    excerpt: 'Artificial Intelligence is reshaping operations, automation and customer experiences across modern enterprises.',
    author: 'EMB Insights', category: 'Technology', tags: [], status: 'published',
    publishDate: '2026-06-24', createdAt: '2026-06-24', readTime: 5, views: 230,
  },
  {
    _id: '2', title: 'Digital Marketing Strategies That Actually Work',
    slug: 'marketing-growth',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    excerpt: 'Performance marketing continues to outperform traditional advertising with measurable ROI.',
    author: 'AdzSquare', category: 'Marketing', tags: [], status: 'published',
    publishDate: '2026-06-22', createdAt: '2026-06-22', readTime: 4, views: 183,
  },
  {
    _id: '3', title: 'Finance Trends Every CEO Should Know',
    slug: 'finance-trends',
    featuredImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=80',
    excerpt: 'Global markets, fintech and digital banking continue to reshape business decisions.',
    author: 'Finance Weekly', category: 'Finance', tags: [], status: 'published',
    publishDate: '2026-06-21', createdAt: '2026-06-21', readTime: 6, views: 155,
  },
  {
    _id: '4', title: "Inside India's Startup Revolution",
    slug: 'startup-india',
    featuredImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80',
    excerpt: "Innovation, venture capital and entrepreneurship are driving India's fastest growing companies.",
    author: 'Business Today', category: 'Business', tags: [], status: 'published',
    publishDate: '2026-06-18', createdAt: '2026-06-18', readTime: 5, views: 112,
  },
  {
    _id: '5', title: 'Leadership Habits of High Growth Companies',
    slug: 'leadership-growth',
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80',
    excerpt: 'Successful organizations build culture through leadership, innovation and long-term vision.',
    author: 'Leadership Hub', category: 'Leadership', tags: [], status: 'published',
    publishDate: '2026-06-14', createdAt: '2026-06-14', readTime: 7, views: 95,
  },
  {
    _id: '6', title: 'The Future of Manufacturing',
    slug: 'future-manufacturing',
    featuredImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=80',
    excerpt: 'Automation, robotics and AI are redefining industrial production.',
    author: 'Industry Review', category: 'Business', tags: [], status: 'published',
    publishDate: '2026-06-10', createdAt: '2026-06-10', readTime: 5, views: 88,
  },
];

export default function BlogListClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (category !== 'All') params.category = category;
        const res = await api.get<PaginatedResponse<Blog>>('/blogs', params);
        setBlogs(res.data);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [category]);

  const handleSubscribe = () => {
    if (!subscriberEmail.trim()) return;
    setSubscribed(true);
    setSubscriberEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const displayPosts = useMemo(() => {
    const source = blogs.length > 0 ? blogs : staticPosts;
    return source.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, category, search]);

  const shuffledPosts = useMemo(() => [...displayPosts].sort(() => Math.random() - 0.5), [displayPosts]);
  const featured = shuffledPosts[0];
  const remainingPosts = shuffledPosts.slice(1);

  return (
    <section className="py-20" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F3FC 100%)' }}>
      <div className="container-wide">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          
          <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tight"
            style={{ color: '#1A0533', letterSpacing: '-0.04em' }}>
            Fresh Business Insights
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #6B21A8 0%, #9333EA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Every Single Day
            </span>
          </h1>
          <p className="mt-5 text-base leading-7 text-[#6B5A80] max-w-xl mx-auto">
            Explore the latest stories covering business, finance, technology,
            startups, marketing, innovation, and leadership.
          </p>
        </motion.div>

        {/* ── Search ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B89B0]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-2xl border border-[#E5DFF0] bg-white py-4 pl-12 pr-5
                         text-sm text-[#1A0533] placeholder:text-[#9B89B0] shadow-sm
                         outline-none transition-all duration-300
                         focus:border-[#6B21A8] focus:ring-4 focus:ring-[#6B21A8]/10"
            />
          </div>
        </motion.div>

        {/* ── Categories ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider
                          transition-all duration-300 ${
                category === cat
                  ? 'text-white shadow-lg shadow-[#6B21A8]/25'
                  : 'bg-white border border-[#E5DFF0] text-[#6B5A80] hover:border-[#6B21A8] hover:text-[#6B21A8]'
              }`}
              style={category === cat ? {
                background: 'linear-gradient(135deg, #6B21A8, #9333EA)',
              } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Loading ── */}
        {loading && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[420px] animate-pulse rounded-3xl bg-[#E5DFF0]" />
            ))}
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && shuffledPosts.length === 0 && (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-bold text-[#1A0533]">No articles found</h3>
            <p className="mt-3 text-[#6B5A80]">Try another keyword or category.</p>
          </div>
        )}

        {/* ── Content ── */}
        {!loading && shuffledPosts.length > 0 && (
          <>
            {/* Featured */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-20"
              >
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="relative h-[500px] overflow-hidden rounded-3xl border border-[#E5DFF0]
                                  hover:border-[#6B21A8]/30 transition-all duration-500
                                  hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6B21A8]/10">
                    <Image
                      src={featured.featuredImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80'}
                      alt={featured.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    {/* Purple gradient overlay */}
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(26,5,51,0.92) 0%, rgba(107,33,168,0.35) 55%, transparent 100%)' }} />

                    <div className="absolute bottom-0 left-0 max-w-3xl p-10 md:p-12">
                      <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5
                                       text-xs font-bold uppercase tracking-widest text-white"
                        style={{ background: 'linear-gradient(135deg, #C89A45, #D4AF63)' }}>
                        Featured Story
                      </span>
                      <h2 className="mt-5 text-3xl md:text-5xl font-black leading-tight text-white">
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-base leading-7 text-white/70">
                        {featured.excerpt}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/50">
                        <span>{featured.author}</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readTime} min
                        </span>
                        <span>{formatDateShort(featured.publishDate)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Latest Articles heading */}
            <div className="mb-8 flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#1A0533' }}>Latest Articles</h2>
                <p className="mt-1 text-sm text-[#6B5A80]">Discover fresh stories from across industries.</p>
              </div>
              <div className="flex-1 h-px bg-[#E5DFF0]" />
            </div>

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {remainingPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-3xl
                                        border border-[#E5DFF0] bg-white
                                        transition-all duration-500 hover:-translate-y-1
                                        hover:border-[#6B21A8]/30 hover:shadow-xl hover:shadow-[#6B21A8]/8">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.featuredImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80'}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />
                        {/* Purple tint */}
                        <div className="absolute inset-0 bg-[#1A0533]/15 group-hover:bg-[#1A0533]/5 transition-colors" />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full px-3 py-1 text-xs font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #6B21A8, #9333EA)' }}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#1A0533]
                                       transition-colors duration-300 group-hover:text-[#6B21A8]">
                          {post.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6B5A80]">
                          {post.excerpt}
                        </p>
                        <div className="mt-5 flex items-center justify-between border-t border-[#E5DFF0] pt-4">
                          <div>
                            <p className="text-xs font-semibold text-[#1A0533]">{post.author}</p>
                            <p className="mt-0.5 text-xs text-[#9B89B0]">{formatDateShort(post.publishDate)}</p>
                          </div>
                          <span className="flex items-center gap-1.5 text-xs text-[#9B89B0]">
                            <Clock className="h-3 w-3" />
                            {post.readTime} min
                          </span>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold
                                        text-[#6B21A8] transition-all duration-300 group-hover:gap-3">
                          Read Article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* ── Newsletter ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-24 overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16"
              style={{ background: 'linear-gradient(135deg, #1A0533 0%, #3B1A5C 50%, #1A0533 100%)' }}
            >
              {/* Gold top line */}
              <div className="mx-auto mb-8 h-px w-24 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #D4AF63, transparent)' }} />

              <span className="inline-block rounded-full border border-[#D4AF63]/30
                               bg-[#D4AF63]/10 px-4 py-1 text-xs font-semibold
                               uppercase tracking-[0.18em] text-[#D4AF63]">
                Stay Connected
              </span>

              <h2 className="mt-6 text-3xl md:text-4xl font-black text-white">
                Stay Ahead of the Curve
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/50">
                Receive the latest business, technology, finance and marketing
                insights directly in your inbox.
              </p>

              <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 flex-1 rounded-xl border border-white/10 bg-white/8
                             px-5 text-sm text-white placeholder:text-white/30
                             outline-none focus:border-[#D4AF63]/50 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="h-12 rounded-xl px-7 text-sm font-bold text-white
                             transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #C89A45, #D4AF63)' }}
                >
                  Subscribe
                </button>
              </div>

              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto mt-6 max-w-sm rounded-xl border border-green-400/30
                             bg-green-400/10 px-5 py-3 text-sm font-semibold text-green-400"
                >
                  ✓ You have subscribed successfully!
                </motion.div>
              )}

              {/* Gold bottom line */}
              <div className="mx-auto mt-10 h-px w-24 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #D4AF63, transparent)' }} />
            </motion.div>

          </>
        )}

      </div>
    </section>
  );
}