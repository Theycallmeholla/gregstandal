import type { CategoryExperiments, VariantConfig } from './types';

/**
 * All historically valid variants. Used primarily to allow URL-based 
 * overrides (?variant=...) for QA and previewing even if a variant
 * is no longer active in the current experiment round.
 */
export const ALL_KNOWN_VARIANTS: VariantConfig[] = [
  { id: 'v5_original', basePage: 'bb-v5', heroVariant: 'original' },
  { id: 'v5_swapped', basePage: 'bb-v5', heroVariant: 'swapped' },
  { id: 'v2_original', basePage: 'brand-builders-v2', heroVariant: 'original' },
  { id: 'v2_swapped', basePage: 'brand-builders-v2', heroVariant: 'swapped' },
];

/**
 * Category-based experiment configuration.
 *
 * Each category (URL path) can have its own experiment with different variants.
 * Add new categories here to enable A/B testing for additional landing pages.
 */
export const CATEGORY_EXPERIMENTS: CategoryExperiments = {
  contractors: {
    experimentId: 'contractors_hero_swap_v2',
    variants: [
      {
        id: 'v5_original',
        basePage: 'bb-v5',
        heroVariant: 'original',
      },
    ],
    weights: [1.0],
  },
  // Future categories:
  // roofing: { experimentId: 'roofing_test_v1', variants: [...], weights: [...] },
  // hvac: { experimentId: 'hvac_test_v1', variants: [...], weights: [...] },
};

/**
 * Get all valid category slugs for static generation.
 */
export function getCategories(): string[] {
  return Object.keys(CATEGORY_EXPERIMENTS);
}

/**
 * Check if a category exists in the experiment config.
 */
export function isValidCategory(category: string): boolean {
  return category in CATEGORY_EXPERIMENTS;
}

/**
 * Get experiment config for a category.
 */
export function getExperimentConfig(category: string) {
  return CATEGORY_EXPERIMENTS[category] ?? null;
}
