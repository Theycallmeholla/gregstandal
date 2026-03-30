export type VariantId = string;

export interface VariantConfig {
  id: VariantId;
  basePage: 'brand-builders-v2' | 'bb-v5';
  heroVariant: 'original' | 'swapped';
}

export interface ExperimentConfig {
  experimentId: string;
  variants: VariantConfig[];
  weights: number[]; // Must sum to 1
}

export type CategoryExperiments = Record<string, ExperimentConfig>;

export interface ExperimentContext {
  category: string;
  experimentId: string;
  variant: VariantConfig;
}
