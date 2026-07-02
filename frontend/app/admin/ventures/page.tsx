'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Globe, Zap, Clock } from 'lucide-react';
import { api, type Venture } from '@/lib/api';
import { STATUS_COLORS, cn } from '@/lib/utils';

export default function AdminVenturesPage() {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get<{ success: boolean; data: Venture[] }>('/admin/ventures')
      .then(r => setVentures(r.data))
      .catch(() => setVentures([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this venture?')) return;
    try {
      await api.delete(`/admin/ventures/${id}`);
      setVentures(prev => prev.filter(v => v._id !== id));
    } catch { alert('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Ventures</h1>
          <p className="text-sm text-ink-tertiary mt-0.5">Manage your portfolio of businesses</p>
        </div>
        <Link href="/admin/ventures/new"
          className="flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm font-medium
                     rounded-xl hover:bg-ink-secondary transition-colors">
          <Plus className="w-4 h-4" />
          Add Venture
        </Link>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-48 shimmer rounded-2xl" />)}
        </div>
      ) : ventures.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-ink-quaternary text-sm mb-4">No ventures yet</p>
          <Link href="/admin/ventures/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm rounded-xl">
            <Plus className="w-4 h-4" /> Add First Venture
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventures.map(v => (
            <div key={v._id} className="bg-white rounded-2xl border border-border p-5
                                        hover:border-border-strong transition-all group">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold text-white"
                  style={{ background: v.accentColor || '#C89A45' }}>
                  {v.name[0]}
                </div>
                <span className={cn('text-2xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1',
                  STATUS_COLORS[v.status as keyof typeof STATUS_COLORS])}>
                  {v.status === 'active' ? <Zap className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                  {v.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: v.accentColor }}>
                {v.category}
              </p>
              <h3 className="font-semibold text-ink mb-1">{v.name}</h3>
              <p className="text-xs text-ink-tertiary leading-relaxed mb-4 line-clamp-2">{v.description}</p>

              {v.services.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {v.services.slice(0, 3).map(s => (
                    <span key={s} className="text-2xs px-1.5 py-0.5 bg-surface-secondary text-ink-tertiary rounded">
                      {s}
                    </span>
                  ))}
                  {v.services.length > 3 && (
                    <span className="text-2xs px-1.5 py-0.5 bg-surface-secondary text-ink-tertiary rounded">
                      +{v.services.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-3 border-t border-border">
                {v.websiteUrl && (
                  <a href={v.websiteUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-ink-tertiary hover:text-ink transition-colors">
                    <Globe className="w-3 h-3" /> Website
                  </a>
                )}
                <div className="flex items-center gap-1 ml-auto">
                  <Link href={`/admin/ventures/${v._id}/edit`}
                    className="p-1.5 text-ink-quaternary hover:text-ink transition-colors rounded-lg hover:bg-surface-secondary">
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                  <button onClick={() => handleDelete(v._id)}
                    className="p-1.5 text-ink-quaternary hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
