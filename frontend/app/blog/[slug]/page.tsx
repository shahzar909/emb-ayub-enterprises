import { use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogPostClient } from './BlogPostClient';

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <BlogPostClient slug={slug} />
      </main>
      <Footer />
    </>
  );
}