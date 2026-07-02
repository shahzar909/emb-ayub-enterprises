'use client';

import { useEffect, useState } from 'react';
import { Users, FileText, Briefcase, TrendingUp, Mail, Clock } from 'lucide-react';
import { api } from '@/lib/api';
import { formatDateShort, STATUS_COLORS } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Analytics {
  total: number;
  new: number;
  replied: number;
  last7Days: number;
  recentContacts: { _id: string; name: string; email: string; company?: string; createdAt: string; status: string }[];
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ success: boolean; data: Analytics }>('/admin/contacts/analytics')
      .then(r => setAnalytics(r.data))
      .catch(() => setAnalytics({
        total: 0, new: 0, replied: 0, last7Days: 0, recentContacts: []
      }))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Leads', value: analytics?.total ?? '—', icon: Users, color: 'text-[#A9782D]', bg: 'bg-[#FDF8EE]' },
    { label: 'New Inquiries', value: analytics?.new ?? '—', icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Last 7 Days', value: analytics?.last7Days ?? '—', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Replied', value: analytics?.replied ?? '—', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
        <p className="text-sm text-ink-tertiary mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', stat.bg)}>
                <stat.icon className={cn('w-4 h-4', stat.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-ink mb-1">
              {loading ? <span className="inline-block h-8 w-12 shimmer rounded" /> : stat.value}
            </p>
            <p className="text-xs text-ink-quaternary">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two-column grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent contacts */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-ink">Recent Inquiries</h2>
            <Link href="/admin/contacts" className="text-xs text-[#C89A45] hover:underline">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-12 shimmer rounded-lg" />)}
            </div>
          ) : analytics?.recentContacts.length === 0 ? (
            <div className="py-10 text-center">
              <Mail className="w-8 h-8 text-ink-quaternary mx-auto mb-2" />
              <p className="text-sm text-ink-quaternary">No contacts yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {analytics?.recentContacts.map(c => (
                <div key={c._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{c.name}</p>
                    <p className="text-xs text-ink-quaternary truncate">{c.email} {c.company && `· ${c.company}`}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={cn(
                      'text-2xs font-medium px-2 py-0.5 rounded-full border',
                      STATUS_COLORS[c.status as keyof typeof STATUS_COLORS]
                    )}>
                      {c.status}
                    </span>
                    <span className="text-2xs text-ink-quaternary flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {formatDateShort(c.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-ink mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'View All Contacts', href: '/admin/contacts', icon: Users, color: 'bg-[#FDF8EE] text-[#A9782D]' },
              { label: 'Create Blog Post', href: '/admin/blog/new', icon: FileText, color: 'bg-purple-50 text-purple-600' },
              { label: 'Add Venture', href: '/admin/ventures/new', icon: Briefcase, color: 'bg-green-50 text-green-600' },
              { label: 'View Website', href: '/', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
            ].map(action => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-secondary transition-colors group"
              >
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', action.color)}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-sm text-ink-secondary group-hover:text-ink transition-colors">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
