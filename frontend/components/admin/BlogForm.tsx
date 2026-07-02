'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import { api, type Blog } from '@/lib/api';

const CATEGORIES = ['Business', 'Marketing', 'Distribution', 'Technology', 'Finance', 'Strategy', 'Insights'];

interface BlogFormProps {
  initialData?: Partial<Blog>;
  mode: 'create' | 'edit';
  blogId?: string;
}

export function BlogForm({ initialData, mode, blogId }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<{
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags: string;
    status: Blog['status'];
  }>({
    title: initialData?.title ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    author: initialData?.author ?? 'EMB Ayub Team',
    category: initialData?.category ?? 'Business',
    tags: initialData?.tags?.join(', ') ?? '',
    status: initialData?.status ?? 'draft',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('featuredImage', imageFile);

      if (mode === 'create') {
        await api.postForm('/admin/blogs', fd);
      } else {
        await api.putForm(`/admin/blogs/${blogId}`, fd);
      }
      router.push('/admin/blog');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog"
          className="p-2 rounded-lg border border-border hover:bg-surface-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-ink">
            {mode === 'create' ? 'Create Blog Post' : 'Edit Blog Post'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
              <div>
                <label className="form-label">Title *</label>
                <input type="text" required placeholder="Post title..."
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="form-input text-base font-medium" />
              </div>
              <div>
                <label className="form-label">Excerpt *</label>
                <textarea rows={2} required placeholder="Brief description shown in listings..."
                  value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  className="form-input resize-none" />
              </div>
              <div>
                <label className="form-label">Content * (HTML supported)</label>
                <textarea rows={16} required placeholder="<p>Write your blog content here...</p>"
                  value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  className="form-input resize-y font-mono text-xs leading-relaxed" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Publish settings */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h3 className="font-semibold text-ink text-sm">Publish Settings</h3>
              <div>
                <label className="form-label">Status</label>
                <select value={form.status} onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Blog["status"],
                  })
                }
                  className="form-input">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="form-label">Author</label>
                <input type="text" value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  className="form-input" />
              </div>

              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink text-white
                           text-sm font-medium rounded-xl hover:bg-ink-secondary active:scale-[0.98]
                           transition-all disabled:opacity-60">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : <Save className="w-4 h-4" />}
                {mode === 'create' ? 'Publish Post' : 'Save Changes'}
              </button>
            </div>

            {/* Category & Tags */}
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h3 className="font-semibold text-ink text-sm">Category & Tags</h3>
              <div>
                <label className="form-label">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="form-input">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Tags (comma separated)</label>
                <input type="text" placeholder="india, marketing, growth"
                  value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                  className="form-input" />
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-ink text-sm mb-4">Featured Image</h3>
              <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed
                                border-border rounded-xl cursor-pointer hover:border-[#C89A45] transition-colors">
                <Upload className="w-5 h-5 text-ink-quaternary" />
                <span className="text-xs text-ink-quaternary">
                  {imageFile ? imageFile.name : 'Click to upload image'}
                </span>
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => setImageFile(e.target.files?.[0] || null)} />
              </label>
              {initialData?.featuredImage && !imageFile && (
                <p className="text-xs text-ink-quaternary mt-2">Current: {initialData.featuredImage}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
