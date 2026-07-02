'use client';

import { use, useEffect, useState } from 'react';
import { api, type Venture } from '@/lib/api';
import { VentureForm } from '@/components/admin/VentureForm';

export default function EditVenturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [venture, setVenture] = useState<Venture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ success: boolean; data: Venture }>(`/ventures/${id}`)
      .then((r) => setVenture(r.data))
      .catch(() => setVenture(null))
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

  if (!venture) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-quaternary">Venture not found</p>
      </div>
    );
  }

  return (
    <VentureForm
      mode="edit"
      ventureId={id}
      initialData={venture}
    />
  );
}