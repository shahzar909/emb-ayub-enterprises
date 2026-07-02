'use client';

import { use, useEffect, useState } from 'react';
import { api, type Blog } from '@/lib/api';
import { BlogForm } from '@/components/admin/BlogForm';

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ success: boolean; data: Blog[] }>('/admin/blogs', {
        limit: '100',
      })
      .then((res) => {
        const found = res.data.find((b: Blog) => b._id === id);
        setBlog(found || null);
      })
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 shimmer rounded" />
        <div className="h-64 shimmer rounded-2xl" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-quaternary">Blog post not found</p>
      </div>
    );
  }

  return <BlogForm mode="edit" blogId={id} initialData={blog} />;
}