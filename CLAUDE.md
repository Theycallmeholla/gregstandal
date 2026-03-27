# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 static landing page experimentation platform for showcasing multiple marketing funnel variants. The project generates static HTML output (no backend) and is designed for A/B testing different landing page designs targeting contractors and service-based businesses.

**Note:** This project was recently refactored from a database-backed platform to a pure static export. The README.md references old Prisma/DB setup that no longer applies.

## Development Commands

```bash
npm run dev      # Start Next.js dev server + auto-capture thumbnails via Puppeteer
npm run build    # Build static HTML output to /out directory
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Static Export Configuration
- `output: "export"` in next.config.ts generates fully static HTML
- Images are unoptimized (`unoptimized: true`) for static hosting compatibility
- Remote images allowed from `newcapepictures.com`
- Deploy to any static host (Vercel, Netlify, S3, etc.)

### Route Structure
- `/demo` - Server Component that reads `/app/demo/*` directories at build time, displays thumbnail gallery
- `/demo/{route-name}` - Client Components (`"use client"`) for each landing page variant
- `/demo/{route-name}/case-studies/[id]` - Dynamic case study detail pages

### Key Patterns

**Demo Pages:**
- All demo pages are self-contained client components in `/app/demo/{route-name}/page.tsx`
- Tailwind-first styling with hardcoded color objects per page
- Common pattern: `const colors = { primary: '#002542', accent: '#FF6B00' }`

**Video Integration:**
- Video player components in `video-player.tsx` handle both HLS streams and MP4 files
- Three components: `HlsVideo` (direct player), `HlsVideoModal` (fullscreen), `InlineVideoPlayer` (thumbnail with play button)
- Videos hosted on `assets.cdn.filesafe.space`

**Case Studies System:**
- Content centralized in `/app/demo/{version}/case-studies/data.ts`
- Strongly typed `CaseStudy` interface with 15+ fields
- Dynamic route `[id]` renders from the data array

**Thumbnail Generation:**
- `scripts/capture-thumbnails.js` uses Puppeteer to screenshot each demo route
- Captures at 1920x1080 viewport, saves to `public/thumbnails/`
- Runs automatically with `npm run dev` via concurrently

### Analytics
- GTM, GA4, and Hotjar injected in root layout via environment variables
- Scripts load with `strategy="afterInteractive"`

## Environment Variables

Only analytics variables are actively used (all optional):
```bash
NEXT_PUBLIC_GTM_ID=""      # Google Tag Manager
NEXT_PUBLIC_GA4_ID=""      # Google Analytics 4
NEXT_PUBLIC_HOTJAR_ID=""   # Hotjar heatmaps
```

Legacy variables in `.env.example` (DATABASE_URL, ADMIN_*, GHL_*) are no longer used.

## Creating New Demo Pages

1. Create directory: `app/demo/{new-route-name}/`
2. Add `page.tsx` with `"use client"` directive
3. Thumbnail will be auto-generated on next `npm run dev`
4. Page appears automatically in `/demo` gallery
