'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit, Eye, Clock } from 'lucide-react';
import { api, type Blog, type PaginatedResponse } from '@/lib/api';
import { formatDateShort, STATUS_COLORS, cn } from '@/lib/utils';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const params: Record<string, string> = { limit: '50' };
    if (statusFilter !== 'all') params.status = statusFilter;
    if (search) params.search = search;
    try {
      const res = await api.get<PaginatedResponse<Blog>>('/admin/blogs', params);
      setBlogs(res.data);
    } catch { setBlogs([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [statusFilter]);
  useEffect(() => { const t = setTimeout(load, 400); return () => clearTimeout(t); }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch { alert('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Blog</h1>
          <p className="text-sm text-ink-tertiary mt-0.5">Manage articles and content</p>
        </div>
        <Link href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm font-medium
                     rounded-xl hover:bg-ink-secondary transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-quaternary" />
          <input type="text" placeholder="Search posts..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="form-input pl-9" />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'draft'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors',
                statusFilter === s ? 'bg-ink text-white' : 'bg-white border border-border text-ink-tertiary hover:text-ink'
              )}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-16 shimmer rounded-xl" />)}
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-ink-quaternary text-sm mb-4">No blog posts yet</p>
            <Link href="/admin/blog/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm rounded-xl">
              <Plus className="w-4 h-4" /> Create First Post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 text-2xs font-semibold uppercase tracking-widest text-ink-quaternary">
              <span className="col-span-5">Title</span>
              <span className="col-span-2 hidden md:block">Category</span>
              <span className="col-span-2 hidden md:block">Status</span>
              <span className="col-span-2 hidden lg:block">Date</span>
              <span className="col-span-1">Actions</span>
            </div>
            {blogs.map(blog => (
              <div key={blog._id} className="grid grid-cols-12 gap-4 items-center px-5 py-3.5
                                             hover:bg-surface-secondary transition-colors">
                <div className="col-span-5 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{blog.title}</p>
                  <p className="text-xs text-ink-quaternary mt-0.5 line-clamp-1">{blog.excerpt}</p>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="text-xs text-ink-tertiary">{blog.category}</span>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className={cn('text-2xs px-2 py-0.5 rounded-full border font-medium',
                    STATUS_COLORS[blog.status as keyof typeof STATUS_COLORS])}>
                    {blog.status}
                  </span>
                </div>
                <div className="col-span-2 hidden lg:block">
                  <span className="text-xs text-ink-quaternary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {blog.publishDate ? formatDateShort(blog.publishDate) : '—'}
                  </span>
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  <Link href={`/blog/${blog.slug}`} target="_blank"
                    className="p-1.5 text-ink-quaternary hover:text-[#C89A45] transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <Link href={`/admin/blog/${blog._id}/edit`}
                    className="p-1.5 text-ink-quaternary hover:text-ink transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                  <button onClick={() => handleDelete(blog._id)}
                    className="p-1.5 text-ink-quaternary hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
