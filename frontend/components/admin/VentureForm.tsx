'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import { api, type Venture } from '@/lib/api';

interface VentureFormProps {
  initialData?: Partial<Venture>;
  mode: 'create' | 'edit';
  ventureId?: string;
}

export function VentureForm({ initialData, mode, ventureId }: VentureFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initialData?.name || '',
    tagline: initialData?.tagline || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    websiteUrl: initialData?.websiteUrl || '',
    services: initialData?.services?.join(', ') || '',
    status: initialData?.status || 'coming_soon',
    featured: initialData?.featured ?? false,
    order: initialData?.order ?? 0,
    accentColor: initialData?.accentColor || '#C89A45',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (logoFile) fd.append('logo', logoFile);

      if (mode === 'create') {
        await api.postForm('/admin/ventures', fd);
      } else {
        await api.putForm(`/admin/ventures/${ventureId}`, fd);
      }
      router.push('/admin/ventures');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save venture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/ventures"
          className="p-2 rounded-lg border border-border hover:bg-surface-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-bold text-ink">
          {mode === 'create' ? 'Add New Venture' : 'Edit Venture'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
              <h3 className="font-semibold text-ink text-sm border-b border-border pb-3">Basic Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Venture Name *</label>
                  <input type="text" required placeholder="AdzSquare"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="form-input" />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <input type="text" required placeholder="Digital Marketing"
                    value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Tagline</label>
                <input type="text" placeholder="Where Brands Meet Growth"
                  value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })}
                  className="form-input" />
              </div>
              <div>
                <label className="form-label">Description *</label>
                <textarea rows={4} required placeholder="Describe this venture..."
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="form-input resize-none" />
              </div>
              <div>
                <label className="form-label">Services (comma separated)</label>
                <input type="text" placeholder="Branding, Performance Marketing, Social Media"
                  value={form.services} onChange={e => setForm({ ...form, services: e.target.value })}
                  className="form-input" />
              </div>
              <div>
                <label className="form-label">Website URL</label>
                <input type="url" placeholder="https://adzsquare.com"
                  value={form.websiteUrl} onChange={e => setForm({ ...form, websiteUrl: e.target.value })}
                  className="form-input" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
              <h3 className="font-semibold text-ink text-sm">Settings</h3>
              <div>
                <label className="form-label">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Venture['status'] })}
                  className="form-input">
                  <option value="active">Active</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="form-label">Display Order</label>
                <input type="number" min="0"
                  value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                  className="form-input" />
              </div>
              <div>
                <label className="form-label">Accent Color</label>
                <div className="flex gap-2">
                  <input type="color" value={form.accentColor}
                    onChange={e => setForm({ ...form, accentColor: e.target.value })}
                    className="h-10 w-16 rounded-lg border border-border cursor-pointer" />
                  <input type="text" value={form.accentColor}
                    onChange={e => setForm({ ...form, accentColor: e.target.value })}
                    className="form-input flex-1" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-brand-blue" />
                <span className="text-sm text-ink">Featured venture</span>
              </label>

              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink text-white
                           text-sm font-medium rounded-xl hover:bg-ink-secondary active:scale-[0.98]
                           transition-all disabled:opacity-60">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : <Save className="w-4 h-4" />}
                {mode === 'create' ? 'Add Venture' : 'Save Changes'}
              </button>
            </div>

            {/* Logo */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-ink text-sm mb-4">Venture Logo</h3>
              <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed
                                border-border rounded-xl cursor-pointer hover:border-[#C89A45] transition-colors">
                <Upload className="w-5 h-5 text-ink-quaternary" />
                <span className="text-xs text-ink-quaternary text-center">
                  {logoFile ? logoFile.name : 'Upload logo (PNG, SVG recommended)'}
                </span>
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => setLogoFile(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
