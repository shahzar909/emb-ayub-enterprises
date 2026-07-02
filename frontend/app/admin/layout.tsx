'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, FileText, Briefcase, LogOut,
  Menu, X, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Contacts', href: '/admin/contacts', icon: Users },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Ventures', href: '/admin/ventures', icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<{ name: string; email: string; role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin') return;
    const token = localStorage.getItem('emb_admin_token');
    const adminData = localStorage.getItem('emb_admin_user');
    if (!token) { router.push('/admin'); return; }
    if (adminData) setAdmin(JSON.parse(adminData));
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem('emb_admin_token');
    localStorage.removeItem('emb_admin_user');
    router.push('/admin');
  };

  if (pathname === '/admin') return <>{children}</>;

  return (
    <div className="min-h-screen bg-surface-secondary flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 bottom-0 z-50 w-60 bg-white border-r border-border flex flex-col',
        'transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink leading-tight">EMB Ayub</p>
              <p className="text-2xs text-ink-quaternary">Admin Panel</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-ink-quaternary hover:text-ink">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'admin-sidebar-link',
                pathname.startsWith(item.href) && 'active'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-border">
          {admin && (
            <div className="px-3 py-2 mb-1">
              <p className="text-sm font-medium text-ink truncate">{admin.name}</p>
              <p className="text-xs text-ink-quaternary truncate">{admin.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="admin-sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-border px-5 h-14 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-ink-quaternary hover:text-ink"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1 text-xs text-ink-quaternary">
            <span>Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink font-medium capitalize">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Panel'}
            </span>
          </div>
          <div className="ml-auto">
            <Link href="/" target="_blank"
              className="text-xs text-ink-tertiary hover:text-ink transition-colors">
              ← View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
