import { getExperimentConfig } from './config';
import type { ExperimentContext, VariantConfig, VariantId } from './types';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Get storage key for a category's variant assignment.
 */
function getStorageKey(category: string): string {
  return `exp_${category}_variant`;
}

/**
 * Set a cookie with the variant assignment.
 */
function setCookie(name: string, value: string, days = 30): void {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
}

/**
 * Get a cookie value by name.
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

/**
 * Randomly select a variant based on weights.
 */
function selectVariantByWeight(variants: VariantConfig[], weights: number[]): VariantConfig {
  const random = Math.random();
  let cumulative = 0;

  console.log('[A/B Test] Random:', random, 'Weights:', weights, 'Variants:', variants.map(v => v.id));

  for (let i = 0; i < variants.length; i++) {
    cumulative += weights[i];
    console.log('[A/B Test] Checking:', variants[i].id, 'cumulative:', cumulative, 'random < cumulative:', random < cumulative);
    if (random < cumulative) {
      console.log('[A/B Test] Selected:', variants[i].id);
      return variants[i];
    }
  }

  console.log('[A/B Test] Fallback to last variant');
  return variants[variants.length - 1];
}

/**
 * Find variant config by ID.
 */
function findVariantById(variants: VariantConfig[], id: VariantId): VariantConfig | null {
  return variants.find((v) => v.id === id) ?? null;
}

/**
 * Get or assign a variant for a category.
 * Persists assignment in localStorage and mirrors to cookie.
 */
export function getOrAssignVariant(category: string): ExperimentContext | null {
  if (typeof window === 'undefined') return null;

  const config = getExperimentConfig(category);
  if (!config) return null;

  const storageKey = getStorageKey(category);

  // Check localStorage first
  const storedId = localStorage.getItem(storageKey);
  console.log('[A/B Test] localStorage check:', storageKey, '=', storedId);
  if (storedId) {
    const variant = findVariantById(config.variants, storedId);
    if (variant) {
      console.log('[A/B Test] Using stored variant from localStorage:', storedId);
      setCookie(storageKey, storedId);
      return {
        category,
        experimentId: config.experimentId,
        variant,
      };
    }
  }

  // Check cookie fallback
  const cookieId = getCookie(storageKey);
  console.log('[A/B Test] Cookie check:', storageKey, '=', cookieId);
  if (cookieId) {
    const variant = findVariantById(config.variants, cookieId);
    if (variant) {
      console.log('[A/B Test] Using stored variant from cookie:', cookieId);
      localStorage.setItem(storageKey, cookieId);
      return {
        category,
        experimentId: config.experimentId,
        variant,
      };
    }
  }

  // Assign new variant
  console.log('[A/B Test] No stored variant, assigning new one...');
  const variant = selectVariantByWeight(config.variants, config.weights);
  localStorage.setItem(storageKey, variant.id);
  setCookie(storageKey, variant.id);

  return {
    category,
    experimentId: config.experimentId,
    variant,
  };
}

/**
 * Push event to dataLayer and gtag.
 * Waits for gtag to be available (up to 5 seconds) before firing.
 */
export function pushEvent(event: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  // Try to send to gtag, with retry if not ready yet
  const sendToGtag = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, payload);
      console.log('[Analytics] Sent to gtag:', event, payload);
      return true;
    }
    return false;
  };

  if (!sendToGtag()) {
    // Retry every 100ms for up to 5 seconds
    let attempts = 0;
    const maxAttempts = 50;
    const interval = setInterval(() => {
      attempts++;
      if (sendToGtag() || attempts >= maxAttempts) {
        clearInterval(interval);
        if (attempts >= maxAttempts) {
          console.warn('[Analytics] gtag not available after 5s, event only in dataLayer:', event);
        }
      }
    }, 100);
  }
}

/**
 * Track experiment impression (once per session per experiment).
 */
export function trackExperimentImpression(context: ExperimentContext): void {
  if (typeof window === 'undefined') return;

  const sessionKey = `exp_impression:${context.experimentId}:${context.variant.id}`;
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, '1');

  pushEvent('experiment_impression', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    base_page: context.variant.basePage,
    hero_type: context.variant.heroVariant,
  });
}

/**
 * Track CTA click.
 */
export function trackCtaClick(
  context: ExperimentContext,
  location: string,
  extra: Record<string, unknown> = {}
): void {
  pushEvent('cta_click', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    cta_location: location,
    ...extra,
  });
}

/**
 * Track form start (first field interaction).
 */
export function trackFormStart(
  context: ExperimentContext,
  formId: string,
  extra: Record<string, unknown> = {}
): void {
  pushEvent('form_start', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    form_id: formId,
    ...extra,
  });
}

/**
 * Track form submission.
 */
export function trackFormSubmit(
  context: ExperimentContext,
  formId: string,
  extra: Record<string, unknown> = {}
): void {
  pushEvent('form_submit', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    form_id: formId,
    ...extra,
  });
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 90%).
 */
export function trackScrollDepth(
  context: ExperimentContext,
  percent: number
): void {
  const sessionKey = `scroll_${context.experimentId}:${percent}`;
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, '1');

  pushEvent('scroll', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    percent_scrolled: percent,
  });
}

/**
 * Track video start.
 */
export function trackVideoStart(
  context: ExperimentContext,
  videoTitle: string,
  videoDuration: number,
  extra: Record<string, unknown> = {}
): void {
  pushEvent('video_start', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    video_title: videoTitle,
    video_duration: videoDuration,
    ...extra,
  });
}

/**
 * Track video progress milestones (25%, 50%, 75%).
 */
export function trackVideoProgress(
  context: ExperimentContext,
  videoTitle: string,
  videoPercent: number,
  videoDuration: number,
  extra: Record<string, unknown> = {}
): void {
  pushEvent('video_progress', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    video_title: videoTitle,
    video_percent: videoPercent,
    video_duration: videoDuration,
    ...extra,
  });
}

/**
 * Track video complete.
 */
export function trackVideoComplete(
  context: ExperimentContext,
  videoTitle: string,
  videoDuration: number,
  extra: Record<string, unknown> = {}
): void {
  pushEvent('video_complete', {
    category: context.category,
    experiment_id: context.experimentId,
    variant_id: context.variant.id,
    video_title: videoTitle,
    video_duration: videoDuration,
    ...extra,
  });
}
