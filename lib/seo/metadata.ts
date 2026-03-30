import type { Metadata } from 'next';
import { SITE_CONFIG } from './schema';

/**
 * Base metadata configuration for SEO
 */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gregstandal.com';

/**
 * Default metadata for the entire site
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_CONFIG.name} | Contractor Marketing`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'contractor marketing',
    'home improvement marketing',
    'video marketing for contractors',
    'lead generation contractors',
    'booked estimates',
    'contractor video production',
    'home service marketing',
    'roofing marketing',
    'HVAC marketing',
    'painting contractor marketing',
    'fencing contractor marketing',
    'plumbing marketing',
    'trust-building content',
  ],
  authors: [{ name: SITE_CONFIG.founder }],
  creator: SITE_CONFIG.founder,
  publisher: SITE_CONFIG.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Contractor Marketing`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Add 20-30% More Booked Estimates in 90 Days`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | Contractor Marketing`,
    description: SITE_CONFIG.description,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'Marketing Services',
};

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || '/og-image.png';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Metadata for contractor landing pages
 */
export function generateContractorPageMetadata(category: string): Metadata {
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return generatePageMetadata({
    title: `${categoryTitle} Marketing | Add 20-30% More Booked Estimates`,
    description: `Video marketing system for ${category}. Get more booked estimates, higher close rates, and better-fit homeowners in 90 days. Performance guarantee included.`,
    path: `/${category}`,
  });
}

/**
 * Metadata for case study pages
 */
export function generateCaseStudyMetadata({
  title,
  description,
  category,
  caseStudyId,
  image,
}: {
  title: string;
  description: string;
  category: string;
  caseStudyId: string;
  image?: string;
}): Metadata {
  return generatePageMetadata({
    title: `${title} | Case Study`,
    description,
    path: `/${category}/case-studies/${caseStudyId}`,
    image,
  });
}

/**
 * Metadata for thank you pages
 */
export const thankYouMetadata: Metadata = generatePageMetadata({
  title: 'Application Received',
  description: 'Thank you for your application. We will review it and reach out within 24 hours if you are a fit for the 90-Day Booked Estimate Plan.',
  noIndex: true,
});
