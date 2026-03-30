import { notFound } from 'next/navigation';
import { CATEGORY_EXPERIMENTS } from '@/lib/ab-test/config';
import { ThankYouPageClient } from './client';

// Only allow categories defined in generateStaticParams (404 for others)
export const dynamicParams = false;

// Generate static params for all configured categories
export function generateStaticParams() {
  return Object.keys(CATEGORY_EXPERIMENTS).map((category) => ({ category }));
}

interface ThankYouPageProps {
  params: Promise<{ category: string }>;
}

export default async function ThankYouPage({ params }: ThankYouPageProps) {
  const { category } = await params;

  // Check if category has an experiment configured
  if (!CATEGORY_EXPERIMENTS[category]) {
    notFound();
  }

  return <ThankYouPageClient category={category} />;
}
