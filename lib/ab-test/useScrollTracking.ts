"use client";

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from './experiment';
import type { ExperimentContext } from './types';

const SCROLL_MILESTONES = [25, 50, 75, 90];

export function useScrollTracking(context: ExperimentContext | null) {
  const trackedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!context) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of SCROLL_MILESTONES) {
        if (scrollPercent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          trackScrollDepth(context, milestone);
          console.log(`[Analytics] Scroll milestone: ${milestone}%`);
        }
      }
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [context]);
}
