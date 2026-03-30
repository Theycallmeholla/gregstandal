import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CaseStudyClientPage from './CaseStudyClientPage';
import { caseStudies } from '@/lib/data/case-studies';
import { CaseStudyJsonLd } from '@/components/seo/JsonLd';

type CaseStudyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    id: study.videoId,
  }));
}

// Generate dynamic metadata for each case study
export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = caseStudies.find((s) => s.videoId === id);

  if (!study) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gregstandal.com';
  const pageUrl = `${baseUrl}/contractors/case-studies/${id}`;

  // Create a clean description from the subheadline
  const description = study.subheadline.length > 160
    ? study.subheadline.substring(0, 157) + '...'
    : study.subheadline;

  return {
    title: `${study.title} | Case Study`,
    description,
    keywords: [
      study.tag.toLowerCase(),
      'contractor case study',
      'video marketing results',
      'contractor marketing',
      'lead generation',
      'booked estimates',
      'home service marketing',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: study.title,
      description,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: study.img,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: study.title,
      description,
      images: [study.img],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const currentIndex = caseStudies.findIndex((study) => study.videoId === id);
  const currentStudy = currentIndex !== -1 ? caseStudies[currentIndex] : undefined;

  if (!currentStudy) {
    notFound();
  }

  const otherStudies = caseStudies.filter((_, i) => i !== currentIndex);
  const startIndex = currentIndex % otherStudies.length;
  const relatedStudies = [
    ...otherStudies.slice(startIndex),
    ...otherStudies.slice(0, startIndex),
  ].slice(0, 3);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gregstandal.com';

  return (
    <>
      <CaseStudyJsonLd
        title={currentStudy.title}
        description={currentStudy.subheadline}
        url={`${baseUrl}/contractors/case-studies/${id}`}
        image={currentStudy.img}
        industry={currentStudy.tag}
        result={currentStudy.heroStats[0]?.value}
      />
      <CaseStudyClientPage currentStudy={currentStudy} relatedStudies={relatedStudies} />
    </>
  );
}
