'use client';

import { useEffect, useState } from 'react';
import { Search, Trash2, Mail, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { api, type Contact, type PaginatedResponse } from '@/lib/api';
import { formatDateShort, STATUS_COLORS, cn } from '@/lib/utils';

const STATUSES = ['all', 'new', 'read', 'replied', 'archived'];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const params: Record<string, string> = { page: String(page), limit: '15' };
    if (status !== 'all') params.status = status;
    if (search) params.search = search;
    try {
      const res = await api.get<PaginatedResponse<Contact>>('/admin/contacts', params);
      setContacts(res.data);
      setTotalPages(res.pagination.pages);
    } catch { setContacts([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [status, page]);
  useEffect(() => { const t = setTimeout(load, 400); return () => clearTimeout(t); }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await api.delete(`/admin/contacts/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch { alert('Failed to delete'); }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await api.patch<{ success: boolean; data: Contact }>(`/admin/contacts/${id}`, { status: newStatus });
      setContacts(prev => prev.map(c => c._id === id ? res.data : c));
      if (selected?._id === id) setSelected(res.data);
    } catch { alert('Failed to update status'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Contacts</h1>
          <p className="text-sm text-ink-tertiary mt-0.5">Manage all contact form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-quaternary" />
          <input type="text" placeholder="Search by name, email, company..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="form-input pl-9" />
        </div>
        <div className="flex gap-2">
          {STATUSES.map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors',
                status === s ? 'bg-ink text-white' : 'bg-white border border-border text-ink-tertiary hover:text-ink'
              )}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Table */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-12 shimmer rounded-lg" />)}
            </div>
          ) : contacts.length === 0 ? (
            <div className="py-16 text-center">
              <Mail className="w-8 h-8 text-ink-quaternary mx-auto mb-2" />
              <p className="text-sm text-ink-quaternary">No contacts found</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {contacts.map(c => (
                  <div key={c._id}
                    onClick={() => setSelected(c)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-secondary transition-colors',
                      selected?._id === c._id && 'bg-surface-secondary'
                    )}>
                    <div className="w-8 h-8 rounded-full bg-[#C89A45]/10 text-[#C89A45] flex items-center
                                    justify-center text-sm font-semibold shrink-0">
                      {c.name[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink truncate">{c.name}</p>
                      <p className="text-xs text-ink-quaternary truncate">{c.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn('text-2xs px-1.5 py-0.5 rounded-full border font-medium',
                        STATUS_COLORS[c.status as keyof typeof STATUS_COLORS])}>
                        {c.status}
                      </span>
                      <span className="text-2xs text-ink-quaternary hidden sm:block">{formatDateShort(c.createdAt)}</span>
                      <button onClick={e => { e.stopPropagation(); handleDelete(c._id); }}
                        className="p-1 text-ink-quaternary hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 p-4 border-t border-border">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-surface-secondary">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-ink-tertiary">Page {page} of {totalPages}</span>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-surface-secondary">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl border border-border p-5 space-y-4 sticky top-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C89A45]/10 text-[#C89A45] flex items-center
                                justify-center text-base font-semibold">
                  {selected.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-ink">{selected.name}</p>
                  <p className="text-xs text-ink-quaternary">{formatDateShort(selected.createdAt)}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  { l: 'Email', v: selected.email },
                  { l: 'Phone', v: selected.phone || '—' },
                  { l: 'Company', v: selected.company || '—' },
                ].map(row => (
                  <div key={row.l} className="flex gap-2">
                    <span className="text-ink-quaternary w-16 shrink-0">{row.l}</span>
                    <span className="text-ink">{row.v}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-surface-secondary rounded-xl">
                <p className="text-xs text-ink-quaternary mb-1">Message</p>
                <p className="text-sm text-ink leading-relaxed">{selected.message}</p>
              </div>

              <div>
                <label className="form-label">Status</label>
                <select
                  value={selected.status}
                  onChange={e => handleStatusChange(selected._id, e.target.value)}
                  className="form-input"
                >
                  {['new', 'read', 'replied', 'archived'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <a href={`mailto:${selected.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium
                             bg-ink text-white rounded-lg hover:bg-ink-secondary transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Reply
                </a>
                <button onClick={() => handleDelete(selected._id)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium
                             bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-border p-8 text-center">
              <Eye className="w-8 h-8 text-ink-quaternary mx-auto mb-2" />
              <p className="text-sm text-ink-quaternary">Select a contact to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
