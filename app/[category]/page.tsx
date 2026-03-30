import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORY_EXPERIMENTS } from '@/lib/ab-test/config';
import { CategoryPageClient } from './client';

// Only allow categories defined in generateStaticParams (404 for others)
export const dynamicParams = false;

// Generate static params for all configured categories
export function generateStaticParams() {
  return Object.keys(CATEGORY_EXPERIMENTS).map((category) => ({ category }));
}

// Category-specific SEO metadata
const categoryMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  contractors: {
    title: 'Contractor Marketing | Add 20-30% More Booked Estimates',
    description:
      'Video marketing system for home improvement & home service contractors. Get more booked estimates, higher close rates, and better-fit homeowners in 90 days. Performance guarantee included.',
    keywords: [
      'contractor marketing',
      'home improvement marketing',
      'contractor video marketing',
      'booked estimates',
      'contractor leads',
      'home service marketing',
      'roofing marketing',
      'HVAC marketing',
      'painting contractor marketing',
      'fencing contractor marketing',
    ],
  },
  // Add more categories as needed
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// Generate dynamic metadata for each category
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMetadata[category];

  if (!meta) {
    return {
      title: 'Contractor Marketing',
      description: 'Add 20-30% more booked estimates in 90 days.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gregstandal.com';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}/${category}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${category}`,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
  };
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-[#FF6B00] rounded-full animate-spin" />
    </div>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Check if category has an experiment configured
  if (!CATEGORY_EXPERIMENTS[category]) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryPageClient category={category} />
    </Suspense>
  );
}
