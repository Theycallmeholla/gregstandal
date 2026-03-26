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
  const currentStudy = caseStudies.find((study) => study.videoId === id);

  if (!currentStudy) {
    notFound();
  }

  return <CaseStudyClientPage currentStudy={currentStudy} />;
}
