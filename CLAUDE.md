# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 static landing page platform with client-side A/B testing for marketing funnels targeting contractors. Generates static HTML output (no backend) with weighted variant assignment stored in localStorage/cookies.

**Note:** The README.md references an old database-backed architecture (Prisma, admin UI, webhooks) that no longer applies. This is now a pure static export.

## Development Commands

```bash
npm run dev      # Start Next.js dev server + auto-capture thumbnails via Puppeteer
npm run build    # Build static HTML output to /out directory
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Static Export
- `output: "export"` in next.config.ts generates static HTML
- Images unoptimized for static hosting compatibility
- Deploy to any static host (Vercel, Netlify, S3, etc.)

### A/B Testing System

The core architecture uses category-based routing with client-side variant assignment:

**Route Flow:**
1. `app/[category]/page.tsx` - Server component that reads experiment config at build time via `generateStaticParams()`
2. `app/[category]/client.tsx` - Client component that assigns/retrieves variants and renders the appropriate page

**Experiment Configuration (`lib/ab-test/config.ts`):**
```typescript
CATEGORY_EXPERIMENTS: {
  contractors: {
    experimentId: 'contractors_hero_swap_v1',
    variants: [
      { id: 'v2_original', basePage: 'brand-builders-v2', heroVariant: 'original' },
      { id: 'v6_swapped', basePage: 'bb-v6', heroVariant: 'swapped' },
      // ...
    ],
    weights: [0.25, 0.25, 0.25, 0.25],  // Must sum to 1
  },
}
```

**Variant Assignment (`lib/ab-test/experiment.ts`):**
- `getOrAssignVariant()` - Checks localStorage first, falls back to cookie, then assigns new variant by weighted random
- Persists to both localStorage and cookie for cross-session consistency
- Tracks impressions via `trackExperimentImpression()` (once per session per experiment)

**Adding a New Category:**
1. Add entry to `CATEGORY_EXPERIMENTS` in `lib/ab-test/config.ts`
2. Route auto-generates via `generateStaticParams()`
3. Ensure `basePage` values map to components in `client.tsx`

### Page Components

Pages are composed from reusable heroes and shared components:

- `components/pages/BrandBuildersV2Page.tsx` - Full page component accepting `heroVariant` prop
- `components/pages/BBV6Page.tsx` - Alternative page design
- `components/heroes/` - Swappable hero sections (original vs swapped variants)
- `components/shared/` - Video player, forms, etc.

### Content Data

- `lib/data/case-studies.ts` - Centralized case study content with strongly-typed `CaseStudy` interface
- Case study detail pages at `app/contractors/case-studies/[id]/`

### Video Integration

`components/shared/video-player.tsx` provides:
- `HlsVideo` - Direct HLS.js player
- `HlsVideoModal` - Fullscreen modal player
- `InlineVideoPlayer` - Thumbnail with hover preview and click-to-play

Videos hosted on `assets.cdn.filesafe.space`.

### Analytics Events

Tracking functions in `lib/ab-test/experiment.ts` push to `window.dataLayer` and `gtag()`:
- `experiment_impression` - Variant viewed
- `cta_click` - Button clicks with location context
- `form_start` / `form_submit` - Form interactions

## Environment Variables

All optional (analytics):
```bash
NEXT_PUBLIC_GTM_ID=""      # Google Tag Manager
NEXT_PUBLIC_GA4_ID=""      # Google Analytics 4
NEXT_PUBLIC_HOTJAR_ID=""   # Hotjar heatmaps
```

## Adding New Pages/Variants

1. Create hero component in `components/heroes/`
2. Create or extend page component in `components/pages/`
3. Add `basePage` mapping in `app/[category]/client.tsx`
4. Configure experiment in `lib/ab-test/config.ts`
