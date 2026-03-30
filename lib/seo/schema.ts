/**
 * Schema.org JSON-LD structured data utilities
 * Based on schema.org types: Organization, Service, WebPage, FAQPage
 */

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  founder?: {
    '@type': 'Person';
    name: string;
  };
  areaServed?: string;
  knowsAbout?: string[];
  slogan?: string;
  sameAs?: string[];
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string;
  audience?: {
    '@type': 'Audience';
    audienceType: string;
  };
  offers?: {
    '@type': 'Offer';
    description: string;
    availability: string;
  };
}

export interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntity?: object;
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface AggregateRatingSchema {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
}

// Site-wide constants
export const SITE_CONFIG = {
  name: 'Greg Standal',
  legalName: 'New Cape Pictures',
  url: 'https://gregstandal.com',
  logo: 'https://gregstandal.com/gregory-standal-sig-logo-blue.svg',
  logoWhite: 'https://gregstandal.com/gregory-standal-sig-logo-white.svg',
  founder: 'Greg Standal',
  description: 'Add 20-30% more booked estimates in 90 days for home improvement & home service contractors.',
  slogan: 'Turn your marketing into a system that makes your estimate a formality.',
  areaServed: 'United States',
  knowsAbout: [
    'Contractor Marketing',
    'Video Marketing for Contractors',
    'Lead Generation for Home Services',
    'Home Improvement Marketing',
    'Trust-Building Content',
    'Booked Estimate Optimization',
  ],
  socialProfiles: [] as string[],
};

/**
 * Generate Organization schema for the site
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    description: SITE_CONFIG.description,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.founder,
    },
    areaServed: SITE_CONFIG.areaServed,
    knowsAbout: SITE_CONFIG.knowsAbout,
    slogan: SITE_CONFIG.slogan,
    sameAs: SITE_CONFIG.socialProfiles,
  };
}

/**
 * Generate Service schema for marketing services
 */
export function generateServiceSchema(): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contractor Video Marketing & Lead Generation',
    description:
      'A trust-building video marketing system designed for home improvement and home service contractors. We help increase booked estimates by 20-30% in 90 days through strategic video content, custom booking systems, and paid traffic optimization.',
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: 'Marketing Services',
    areaServed: SITE_CONFIG.areaServed,
    audience: {
      '@type': 'Audience',
      audienceType: 'Home Improvement & Home Service Contractors',
    },
    offers: {
      '@type': 'Offer',
      description: '90-Day Booked Estimate Plan with Performance Guarantee',
      availability: 'https://schema.org/LimitedAvailability',
    },
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(
  pageTitle: string,
  pageDescription: string,
  pageUrl: string
): WebPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
  };
}

/**
 * Generate FAQ schema from Q&A pairs
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Combine multiple schemas into a single graph
 */
export function generateSchemaGraph(...schemas: object[]): object {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      // Remove @context from nested schemas to avoid duplication
      const { '@context': _, ...rest } = schema as { '@context'?: string };
      return rest;
    }),
  };
}
