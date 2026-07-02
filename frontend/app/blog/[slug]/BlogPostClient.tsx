'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft, Eye } from 'lucide-react';
import { api, type Blog } from '@/lib/api';
import { formatDate } from '@/lib/utils';

const STATIC_POSTS: Record<string, Blog & { content: string }> = {
  'emb-future-of-business': {
    _id: '1', slug: 'emb-future-of-business',
    title: 'How EMB Ayub Enterprises is Building the Future of Business in India',
    excerpt: 'A look at how diversified holding companies are shaping the next generation of Indian enterprises.',
    featuredImage: null, author: 'EMB Ayub Team', category: 'Business',
    tags: ['holding company', 'india', 'growth'], status: 'published',
    publishDate: '2024-12-01', views: 120, readTime: 5, createdAt: '2024-12-01',
    content: `<p>The landscape of Indian business is changing rapidly. As digital transformation sweeps across industries, holding companies like EMB Ayub Enterprises are uniquely positioned to capitalize on cross-industry opportunities.</p>
<p>Our philosophy is simple: build businesses that solve real problems, create real value, and scale sustainably. From digital marketing through AdzSquare to distribution through Masala Udyog, we are building an ecosystem of complementary ventures.</p>
<h2>Why Diversification?</h2>
<p>In a rapidly evolving economy, concentration in a single sector is a risk. EMB Ayub Enterprises has deliberately built across sectors — each venture complementing the others while standing strong independently.</p>
<p>The next decade will see EMB expand into technology products, financial services, and consulting — creating a truly diversified portfolio that can weather any economic cycle.</p>
<h2>Our Approach</h2>
<p>Each venture under the EMB umbrella follows a rigorous selection framework: Does it solve a real problem? Is the market large enough? Can we build a sustainable competitive advantage? Can we attract the right talent?</p>
<p>This framework has guided every decision since inception — and will continue to guide every new venture we build.</p>`,
  },
};

export function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<(Blog & { content?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<{ success: boolean; data: Blog & { content: string } }>(`/blogs/${slug}`);
        setPost(res.data);
      } catch {
        setPost(STATIC_POSTS[slug] || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-tight py-20">
        <div className="h-8 w-32 shimmer rounded mb-8" />
        <div className="h-12 shimmer rounded mb-4" />
        <div className="h-6 w-2/3 shimmer rounded mb-12" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-5 shimmer rounded" />)}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-tight py-32 text-center">
        <h2 className="text-2xl font-bold text-ink mb-4">Post not found</h2>
        <Link href="/blog" className="text-[#C89A45] hover:underline text-sm">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="py-12 md:py-16">
      <div className="container-tight">
        {/* Back */}
        <Link href="/blog"
          className="inline-flex items-center gap-2 text-sm text-ink-tertiary hover:text-ink
                     transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest
                         text-[#C89A45] mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-ink tracking-tighter-lg mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-ink-tertiary mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-ink-quaternary pb-6 border-b border-border">
            <span className="font-medium text-ink-secondary">{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime} min read
            </span>
            <span>·</span>
            <span>{formatDate(post.publishDate)}</span>
            {post.views > 0 && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {post.views} views
                </span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          className="blog-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || '<p>Content coming soon.</p>' }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {post.tags.map(tag => (
              <span key={tag}
                className="text-xs px-3 py-1 rounded-full bg-surface-secondary text-ink-tertiary">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-8 bg-surface-secondary rounded-2xl border border-border text-center">
          <h3 className="font-semibold text-ink mb-2">Interested in working with EMB?</h3>
          <p className="text-sm text-ink-tertiary mb-4">
            Whether you're looking to partner, collaborate, or learn more — we'd love to hear from you.
          </p>
          <Link href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white text-sm
                       font-medium rounded-xl hover:bg-ink-secondary transition-colors">
            Get in Touch
          </Link>
        </div>
      </div>
    </article>
  );
}
