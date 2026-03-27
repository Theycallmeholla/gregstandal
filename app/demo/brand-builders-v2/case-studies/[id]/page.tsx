import { notFound } from 'next/navigation';

import CaseStudyClientPage from './CaseStudyClientPage';
import { caseStudies } from '../data';

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

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const currentIndex = caseStudies.findIndex((study) => study.videoId === id);
  const currentStudy = currentIndex !== -1 ? caseStudies[currentIndex] : undefined;

  if (!currentStudy) {
    notFound();
  }

  // Get other case studies, excluding the current one
  // Rotate selection based on current index so each page shows different studies
  const otherStudies = caseStudies.filter((_, i) => i !== currentIndex);
  const startIndex = currentIndex % otherStudies.length;
  const relatedStudies = [
    ...otherStudies.slice(startIndex),
    ...otherStudies.slice(0, startIndex),
  ].slice(0, 3);

  return <CaseStudyClientPage currentStudy={currentStudy} relatedStudies={relatedStudies} />;
}
