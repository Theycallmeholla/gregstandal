"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORY_EXPERIMENTS, ALL_KNOWN_VARIANTS } from '@/lib/ab-test/config';
import { getOrAssignVariant, trackExperimentImpression } from '@/lib/ab-test/experiment';
import type { ExperimentContext, VariantConfig } from '@/lib/ab-test/types';
import { BrandBuildersV2Page } from '@/components/pages/BrandBuildersV2Page';
import { BBV5Page } from '@/components/pages/BBV5Page';

interface CategoryPageClientProps {
  category: string;
}

export function CategoryPageClient({ category }: CategoryPageClientProps) {
  const [context, setContext] = useState<ExperimentContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Defer execution to avoid synchronous setState inside effect (React Compiler warning)
    const timer = setTimeout(() => {
      const experimentConfig = CATEGORY_EXPERIMENTS[category];
      if (!experimentConfig) {
        setIsLoading(false);
        return;
      }

      // Check for URL param override (for testing): ?variant=v2_original
      const variantOverride = searchParams.get('variant');
      if (variantOverride) {
        const overrideVariant = experimentConfig.variants.find(
          (v: VariantConfig) => v.id === variantOverride
        ) || ALL_KNOWN_VARIANTS.find(
          (v: VariantConfig) => v.id === variantOverride
        );
        if (overrideVariant) {
          const overrideContext: ExperimentContext = {
            category,
            experimentId: experimentConfig.experimentId,
            variant: overrideVariant,
          };
          setContext(overrideContext);
          setIsLoading(false);
          console.log('[A/B Test] URL Override:', overrideVariant.id);
          return;
        }
      }

      // Get or assign variant for this category (returns full ExperimentContext)
      const experimentContext = getOrAssignVariant(category);
      if (!experimentContext) {
        setIsLoading(false);
        return;
      }

      console.log('[A/B Test] Assigned variant:', experimentContext.variant.id);
      setContext(experimentContext);
      trackExperimentImpression(experimentContext);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [category, searchParams]);

  // Show loading state while determining variant
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#FF6B00] rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback if no context (shouldn't happen with valid category)
  if (!context) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  const { variant } = context;


  // Render the appropriate page based on variant configuration
  if (variant.basePage === 'brand-builders-v2') {
    return <BrandBuildersV2Page heroVariant={variant.heroVariant} context={context} category={category} />;
  }

  if (variant.basePage === 'bb-v5') {
    return <BBV5Page heroVariant={variant.heroVariant} context={context} category={category} />;
  }

  // Fallback (should never reach here with valid config)
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-slate-500">Page not found</p>
    </div>
  );
}
