import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BlogListClient from './BlogListClient';
export const metadata: Metadata = {
  title: 'Blog — Insights & Perspectives',
  description: 'Insights, strategies, and perspectives from EMB Ayub Enterprises across business, marketing, distribution, and technology.',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
       
        <BlogListClient />
      </main>
      <Footer />
    </>
  );
}
