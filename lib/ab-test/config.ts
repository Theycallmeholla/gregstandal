import type { CategoryExperiments } from './types';

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
