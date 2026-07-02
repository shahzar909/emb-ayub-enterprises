import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function getImageUrl(path: string | null): string {
  if (!path) return '/placeholder-image.jpg';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
}

export const BLOG_CATEGORIES = [
  'Business',
  'Marketing',
  'Distribution',
  'Technology',
  'Finance',
  'Strategy',
  'Insights',
] as const;

export const STATUS_COLORS = {
  new: 'bg-[#FDF8EE] text-blue-700 border-blue-100',
  read: 'bg-gray-50 text-gray-600 border-gray-100',
  replied: 'bg-green-50 text-green-700 border-green-100',
  archived: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  published: 'bg-green-50 text-green-700 border-green-100',
  draft: 'bg-gray-50 text-gray-600 border-gray-100',
  active: 'bg-green-50 text-green-700 border-green-100',
  coming_soon: 'bg-[#FDF8EE] text-blue-700 border-blue-100',
  inactive: 'bg-red-50 text-red-700 border-red-100',
} as const;
