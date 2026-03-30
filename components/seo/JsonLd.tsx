/**
 * JSON-LD Structured Data Component
 * Renders schema.org structured data in the page head
 */

interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(data, null, 0);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

/**
 * Organization + Service JSON-LD for landing pages
 */
export function LandingPageJsonLd() {
  const organizationSchema = {
    '@type': 'Organization',
    name: 'Greg Standal',
    url: 'https://gregstandal.com',
    logo: 'https://gregstandal.com/gregory-standal-sig-logo-blue.svg',
    description:
      'Add 20-30% more booked estimates in 90 days for home improvement & home service contractors.',
    founder: {
      '@type': 'Person',
      name: 'Greg Standal',
    },
    areaServed: 'United States',
    knowsAbout: [
      'Contractor Marketing',
      'Video Marketing for Contractors',
      'Lead Generation for Home Services',
      'Home Improvement Marketing',
      'Trust-Building Content',
    ],
    slogan:
      'Turn your marketing into a system that makes your estimate a formality.',
  };

  const serviceSchema = {
    '@type': 'Service',
    name: 'Contractor Video Marketing & Lead Generation',
    description:
      'A trust-building video marketing system designed for home improvement and home service contractors. We help increase booked estimates by 20-30% in 90 days.',
    provider: {
      '@type': 'Organization',
      name: 'Greg Standal',
      url: 'https://gregstandal.com',
    },
    serviceType: 'Marketing Services',
    areaServed: 'United States',
    audience: {
      '@type': 'Audience',
      audienceType: 'Home Improvement & Home Service Contractors',
    },
    offers: {
      '@type': 'Offer',
      description: '90-Day Booked Estimate Plan with Performance Guarantee',
      availability: 'https://schema.org/LimitedAvailability',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Contractor Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Video Production',
            description: 'High-quality brand films and case study videos',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Booking System',
            description: 'Automated booking and follow-up systems',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Paid Traffic Management',
            description: 'Strategic paid advertising campaigns',
          },
        },
      ],
    },
  };

  const webPageSchema = {
    '@type': 'WebPage',
    name: 'Greg Standal | Contractor Marketing',
    description:
      'Add 20-30% more booked estimates in 90 days for home improvement & home service contractors.',
    url: 'https://gregstandal.com',
    publisher: {
      '@type': 'Organization',
      name: 'Greg Standal',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gregstandal.com/gregory-standal-sig-logo-blue.svg',
      },
    },
  };

  const graphData = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, serviceSchema, webPageSchema],
  };

  return <JsonLd data={graphData} />;
}

/**
 * Case Study JSON-LD
 */
export function CaseStudyJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  industry,
  result,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  industry?: string;
  result?: string;
}) {
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: image || 'https://gregstandal.com/og-image.png',
    datePublished: datePublished || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Greg Standal',
      url: 'https://gregstandal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Greg Standal',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gregstandal.com/gregory-standal-sig-logo-blue.svg',
      },
    },
    about: {
      '@type': 'Thing',
      name: industry || 'Contractor Marketing',
    },
    ...(result && {
      mainEntityOfPage: {
        '@type': 'WebPage',
        name: `${title} - Results: ${result}`,
      },
    }),
  };

  return <JsonLd data={caseStudySchema} />;
}

/**
 * FAQ JSON-LD
 */
export function FAQJsonLd({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const faqSchema = {
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

  return <JsonLd data={faqSchema} />;
}

/**
 * Breadcrumb JSON-LD
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={breadcrumbSchema} />;
}
