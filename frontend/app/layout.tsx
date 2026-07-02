import type { Metadata } from 'next';
import './globals.css';
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: {
    default: 'EMB Ayub Enterprises — One Vision. Multiple Ventures.',
    template: '%s | EMB Ayub Enterprises',
  },
  description:
    'A diversified holding company building sustainable businesses across digital marketing, distribution, technology, and finance.',
  keywords: [
    'EMB Ayub Enterprises',
    'holding company',
    'AdzSquare',
    'Masala Udyog',
    'digital marketing',
    'distribution',
    'India',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://embayub.com',
    siteName: 'EMB Ayub Enterprises',
    title: 'EMB Ayub Enterprises — One Vision. Multiple Ventures.',
    description:
      'Building businesses across distribution, marketing, technology, and future-focused industries.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMB Ayub Enterprises',
    description: 'One Vision. Multiple Ventures. Endless Possibilities.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Loader /> 
        {children}</body>
    </html>
  );
}
