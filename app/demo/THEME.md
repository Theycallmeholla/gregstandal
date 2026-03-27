# Brand Builders V2 - Styling Theme Guide

This document captures the design system and styling patterns used throughout the Brand Builders V2 demo pages.

---

## Color Palette

### Primary Colors
```typescript
const colors = {
  primary: '#002542',    // Deep navy blue - headings, dark sections
  accent: '#FF6B00',     // Vibrant orange - CTAs, highlights, eyebrows
};
```

### Extended Palette
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#002542` | Headings, dark backgrounds, footer |
| `accent` | `#FF6B00` | CTAs, badges, icons, highlights |
| `gold` | `#f1b40c` | Star ratings |
| `success` | `text-green-500` | Checkmarks |
| `bg-light` | `bg-white` | Main content sections |
| `bg-muted` | `bg-slate-50` | Alternating sections |
| `bg-dark` | `bg-slate-900` | Footer |
| `bg-navy` | `bg-[#002542]` | Dark feature sections |

### Text Colors
| Class | Usage |
|-------|-------|
| `text-[#002542]` | Primary headings |
| `text-slate-900` | Base text |
| `text-slate-700` | Body text, list items |
| `text-slate-600` | Subheadlines, descriptions |
| `text-slate-500` | Footer text |
| `text-slate-400` | Labels, muted text |
| `text-slate-300` | Body text on dark backgrounds |
| `text-white` | Text on dark backgrounds |

---

## Typography

### Font Stack
```css
font-sans antialiased
```

### Heading Scale
| Level | Classes | Example |
|-------|---------|---------|
| H1 (Hero) | `text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight` | Main page headline |
| H1 (Case Study) | `text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight` | Case study title |
| H2 (Section) | `text-3xl md:text-5xl font-black tracking-tight` | Section headlines |
| H3 (Card) | `text-xl font-black leading-snug` | Card titles |
| H3 (Feature) | `text-2xl font-black` | Feature/step titles |

### Body Text
| Size | Classes | Usage |
|------|---------|-------|
| Large | `text-xl md:text-2xl font-medium leading-relaxed` | Subheadlines, intro copy |
| Base | `text-lg font-medium leading-relaxed` | Body paragraphs |
| Small | `text-sm font-bold` | Secondary info |

### Special Text
| Pattern | Classes |
|---------|---------|
| Eyebrow | `text-xs font-black uppercase tracking-[0.24em] text-[#FF6B00]` |
| Label (muted) | `text-sm font-black uppercase tracking-widest text-slate-400` |
| Quote | `text-2xl md:text-3xl font-black italic leading-relaxed` |
| CTA Button Text | `text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none` |
| Tag | `text-xs font-black uppercase tracking-widest` |

---

## Spacing System

### Section Padding
```css
/* Standard section */
py-24 px-4

/* Large section (offset layout) */
py-24 md:py-32 px-4
```

### Container Max-Widths
| Class | Usage |
|-------|-------|
| `max-w-4xl` | Centered hero content |
| `max-w-5xl` | Video players, compact sections |
| `max-w-6xl` | Standard content width |
| `max-w-7xl` | Full-width sections, grids |

### Common Gaps
| Class | Usage |
|-------|-------|
| `gap-4` | Tight lists, inline items |
| `gap-6` | List items, buttons |
| `gap-8` | Card grids, section items |
| `gap-12` | Major section divisions |
| `gap-16` | Two-column layouts |

### Margin Bottom Scale
| Class | Usage |
|-------|-------|
| `mb-3` | Stat labels |
| `mb-6` | Between headline and subhead |
| `mb-8` | After eyebrows, before content |
| `mb-10` | After subheadlines |
| `mb-12` | Between major content blocks |
| `mb-16` | Before CTAs, after videos |

---

## Border Radius

| Class | Usage |
|-------|-------|
| `rounded-lg` | **Buttons (all types)**, badges, small elements |
| `rounded-xl` | Step numbers, icons |
| `rounded-2xl` | Cards, video players, modals |
| `rounded-3xl` | Large feature cards, stat blocks, quote blocks |

---

## Shadows

| Class | Usage |
|-------|-------|
| `shadow-sm` | Subtle card elevation |
| `shadow-md` | Header buttons |
| `shadow-lg` | Guarantee badges, icons |
| `shadow-xl` | CTA buttons, feature cards |
| `shadow-2xl` | Video players, hero elements |

---

## Borders

### Standard
```css
border border-slate-200      /* Light sections */
border border-white/10       /* Dark sections */
border border-white/20       /* Dark section dividers */
```

### Accent Borders
```css
border-l-8                   /* Quote blocks (thick) */
border-l-[6px]               /* Problem sections */
border-l-12                  /* Large blockquotes */
border-[#FF6B00]             /* Accent color */
```

### Border Bottom (Header)
```css
border-b border-slate-200
border-t border-slate-200    /* Section separators */
border-y border-slate-200    /* Top and bottom */
```

---

## Component Patterns

### CTA Button (Primary)
All buttons use `rounded-lg` for consistency.

```tsx
<Link
  className="bg-[#FF6B00] text-white px-10 py-5 rounded-lg font-black
             transition shadow-xl hover:-translate-y-1 text-center uppercase
             w-full md:w-auto inline-flex items-center justify-center
             text-[clamp(16px,4.5vw,22px)] leading-none"
>
  Book Your Brand Strategy Call
</Link>
```

### CTA Button (Header - Smaller)
```tsx
<Link
  className="hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm
             font-bold uppercase tracking-wide text-white shadow-md
             transition hover:scale-105 active:scale-95 sm:flex"
  style={{ backgroundColor: colors.accent }}
>
  Book Your Strategy Call
</Link>
```

### CTA Button (Secondary/Outline)
```tsx
<Link
  className="block text-center text-sm font-black border border-[#002542]
             rounded-lg py-3 bg-[#002542] text-white
             hover:bg-transparent hover:text-[#002542]
             transition uppercase tracking-wider w-full"
>
  View Case Study
</Link>
```

### Button Border Radius Rule
> **Always use `rounded-lg` for all button variants.** This ensures visual consistency across CTAs, header buttons, and card actions.

### Eyebrow Badge
```tsx
<div
  className="inline-flex items-center gap-3 rounded-lg px-8 py-3
             text-lg md:text-xl font-black uppercase tracking-wide
             text-white shadow-xl"
  style={{ backgroundColor: colors.accent }}
>
  {eyebrowText}
</div>
```

### Limited Availability Badge
```tsx
<div
  className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 text-[#FF6B00]
             font-black uppercase text-xs rounded-lg tracking-widest
             border border-[#FF6B00]/20"
>
  Limited Availability
</div>
```

### Card (Case Study)
```tsx
<div className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden
                shadow-sm border border-slate-200 hover:shadow-xl
                transition duration-300">
  {/* Video/Image */}
  <div className="p-8 flex-1 flex flex-col">
    <span className="text-xs font-black uppercase tracking-widest mb-3"
          style={{ color: colors.accent }}>
      {tag}
    </span>
    <h3 className="font-black text-[#002542] text-xl leading-snug mb-6 flex-1">
      {title}
    </h3>
    {/* CTA Button */}
  </div>
</div>
```

### Stats Grid
```tsx
<div className="rounded-3xl shadow-lg bg-[#002542] grid md:grid-cols-3 gap-8
                p-10 md:p-12 relative overflow-hidden
                divide-y md:divide-y-0 md:divide-x divide-white/20">
  {stats.map((stat) => (
    <div className="flex flex-col items-center justify-center text-center py-4">
      <div className="text-4xl md:text-5xl font-black mb-3 text-[#ff6b00]">
        {stat.value}
      </div>
      <div className="text-sm font-bold tracking-wider uppercase text-white">
        {stat.label}
      </div>
    </div>
  ))}
</div>
```

### Quote Block
```tsx
<blockquote className="relative rounded-3xl border-l-12 border-[#FF6B00]
                       bg-white/5 p-8 md:p-12 text-white shadow-xl backdrop-blur-sm">
  <div className="absolute top-4 left-6 text-[#FF6B00]/20 text-8xl
                  font-serif leading-none select-none">
    &quot;
  </div>
  <p className="relative z-10 text-2xl md:text-3xl font-black leading-relaxed italic">
    &ldquo;{quoteText}&rdquo;
  </p>
  <p className="relative z-10 mt-8 text-base font-black uppercase
               tracking-[0.2em] text-[#ff6b00]">
    {attribution}
  </p>
</blockquote>
```

### Guarantee Box
```tsx
<div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl
                relative shadow-sm">
  <div className="absolute -top-6 left-8 text-white w-12 h-12
                  flex items-center justify-center rounded-xl shadow-lg rotate-12"
       style={{ backgroundColor: colors.accent }}>
    <ShieldCheck className="w-6 h-6" />
  </div>
  <h3 className="font-black text-2xl text-[#002542] mb-3 ml-2 mt-2">
    Ironclad Performance Guarantee
  </h3>
  <p className="text-slate-600 text-xl font-medium leading-relaxed italic ml-2">
    &ldquo;Guarantee text...&rdquo;
  </p>
</div>
```

### Checklist Item
```tsx
<li className="flex items-center gap-4">
  <CheckCircle className="w-8 h-8 text-[#FF6B00]" />
  <span className="text-xl font-bold text-slate-700">List item text</span>
</li>
```

---

## Section Layouts

### SectionShell (Reusable)
Two layout variants: `stacked` and `offset`

**Stacked Layout:**
- Centered content
- Title + content vertically stacked
- `max-w-6xl` container

**Offset Layout:**
- 12-column grid
- Sticky title column (4 cols)
- Content column (8 cols)
- `max-w-7xl` container

```tsx
// Stacked
<section className="px-4 py-24 md:py-32 bg-white">
  <div className="mx-auto max-w-6xl">
    <div className="mb-12 md:mb-16">
      {/* Eyebrow + Title */}
    </div>
    {children}
  </div>
</section>

// Offset
<section className="px-4 py-24 md:py-32 bg-white">
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <div className="sticky top-32">
          {/* Eyebrow + Title */}
        </div>
      </div>
      <div className="lg:col-span-8 lg:pl-12">
        {children}
      </div>
    </div>
  </div>
</section>
```

---

## Animations

### Logo Carousel
```css
.animate-scroll {
  animation: scroll 40s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-250px * 8)); }
}
```

### Reviews Marquee
```css
.animate-scroll-reviews {
  animation: scroll-reviews 120s linear infinite;
}

@keyframes scroll-reviews {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Mask Edges (Fade In/Out)
```css
.mask-image-edges {
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}
```

### Smooth Scroll
```typescript
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// Duration: 800ms
```

---

## Interactive States

### Hover Effects
| Pattern | Classes |
|---------|---------|
| Lift | `hover:-translate-y-1` |
| Scale | `hover:scale-105`, `hover:scale-[1.02]` |
| Shadow | `hover:shadow-xl`, `hover:shadow-md` |
| Opacity | `hover:opacity-80`, `hover:opacity-100` |
| Grayscale | `grayscale hover:grayscale-0` |

### Transitions
```css
transition                   /* Default */
transition duration-300      /* Standard */
transition duration-500      /* Slow */
transition transform         /* Transform only */
```

### Group Hover
```tsx
<div className="group ...">
  <div className="group-hover:scale-105 transition" />
</div>
```

---

## Selection Highlight
```css
selection:bg-[#FF6B00]/20
```

---

## Header (Fixed)
```tsx
<header className="fixed top-0 z-50 w-full border-b border-slate-200
                   bg-white/95 py-4 backdrop-blur-md">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
    {/* Logo + CTA */}
  </div>
</header>
```

---

## Footer
```tsx
<footer className="border-t border-slate-800 bg-slate-900 py-12 text-center">
  {/* Logo */}
  <p className="text-sm font-medium text-slate-500">
    © {year} New Cape Pictures. All rights reserved.
  </p>
</footer>
```

---

## Icons Used (Lucide)
- `Star` - Ratings
- `ShieldCheck` - Guarantee badges
- `CheckCircle` - Checklists, success
- `Play` - Video play buttons
- `X` - Close modal
- `Target` - Problem section
- `Layers` - Strategy section
- `Trophy` - Results section
- `ThumbsUp` - Why it worked
- `BarChart` - Result highlights

---

## Video Management System

### Video Data Structure (`case-studies/data.ts`)

All videos are centralized in the data file for easy management:

```typescript
// Main VSL video source
export const mainVslVideoSrc = 'https://assets.cdn.filesafe.space/.../video.mp4';

// Testimonial videos object - keyed by client name
export const testimonialVideos = {
  agWilliams: 'https://assets.cdn.filesafe.space/.../video.mp4',
  janFence: 'https://assets.cdn.filesafe.space/.../video.mp4',
  spectrum: 'https://assets.cdn.filesafe.space/.../video.mp4',
  highlightReel: 'https://assets.cdn.filesafe.space/.../video.mp4',
  // ... more videos
};

// Case studies reference these videos
export const caseStudies: CaseStudy[] = [
  {
    videoSrc: testimonialVideos.agWilliams,      // Main video
    thumbnailVideo: testimonialVideos.agWilliams, // Hover preview
    img: "https://...",                           // Poster/fallback
    thumbnail: "https://...",                     // Optional custom thumbnail
    // ...
  }
];
```

### Video Hosting
- **Primary CDN:** `assets.cdn.filesafe.space` (MP4 files)
- **HLS Streams:** `vz-*.b-cdn.net` (`.m3u8` playlists)
- **Poster Images:** `newcapepictures.com/wp-content/uploads/`

### Video Components (`video-player.tsx`)

Three components for different use cases:

#### 1. HlsVideo (Direct Player)
Basic video player that handles both MP4 and HLS sources.
```tsx
<HlsVideo
  src={videoUrl}
  poster={posterUrl}
  className="h-full w-full"
  autoPlay={true}
/>
```

#### 2. HlsVideoModal (Fullscreen)
Modal overlay for immersive video viewing.
```tsx
<HlsVideoModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  src={videoUrl}
  poster={posterUrl}
/>
```

#### 3. InlineVideoPlayer (Thumbnail + Play)
Main component used throughout - shows thumbnail, plays on click.

```tsx
// Hero VSL - natural aspect ratio, plays preview on hover
<InlineVideoPlayer
  src={mainVslVideoSrc}
  poster="/vsl-cover.png"
  hoverVideoSrc={mainVslVideoSrc}
  naturalAspect={true}
  playOnHover={true}
  accentColor={colors.accent}
  className="w-full max-w-4xl mx-auto shadow-2xl mb-10 border border-slate-200"
/>

// Case Study Card - fixed aspect, auto-playing preview loop
<InlineVideoPlayer
  src={study.videoSrc}
  poster={study.img}
  thumbnail={study.thumbnail}
  hoverVideoSrc={study.thumbnailVideo}
  thumbnailFit="cover"
  accentColor={colors.accent}
  className="rounded-none rounded-t-2xl"
/>

// Highlight Reel - cover fit, hover preview
<InlineVideoPlayer
  src={testimonialVideos.highlightReel}
  poster="https://..."
  hoverVideoSrc={testimonialVideos.highlightReel}
  thumbnailFit="cover"
  accentColor={colors.yellow}
  className="w-full max-w-4xl mx-auto shadow-2xl mb-16 border border-slate-200"
/>
```

### InlineVideoPlayer Props
```typescript
{
  src: string;              // Main video URL (plays on click)
  poster: string;           // Fallback poster image
  thumbnail?: string;       // Custom thumbnail (overrides poster)
  hoverVideoSrc?: string;   // Preview video that loops on hover
  thumbnailFit?: 'cover' | 'contain';
  accentColor?: string;     // Play button color (default: #FF6B00)
  naturalAspect?: boolean;  // true = use video's natural aspect ratio
                            // false = force 16:9 aspect-video
  playOnHover?: boolean;    // true = preview starts on hover
                            // false = preview auto-plays immediately
}
```

### Video Player Behavior

**Thumbnail State:**
- Shows `thumbnail` or `poster` image
- If `hoverVideoSrc` provided:
  - `playOnHover=false`: Video loops immediately, thumbnail fades out
  - `playOnHover=true`: Thumbnail visible, video plays on mouse enter
- Play button overlaid in center with accent color

**Playing State:**
- Clicking anywhere triggers full video playback
- Swaps to `HlsVideo` component with controls
- Native browser video controls shown

### Play Button Style
```tsx
<div
  className="w-20 h-20 rounded-full flex items-center justify-center
             shadow-lg group-hover:scale-110 transition duration-300"
  style={{ backgroundColor: accentColor }}
>
  <Play className="w-8 h-8 text-white fill-white ml-1" />
</div>
```

### Video Container Patterns

**Hero VSL:**
```tsx
className="w-full max-w-4xl mx-auto shadow-2xl mb-10 border border-slate-200"
// naturalAspect={true} - uses video's native dimensions
```

**Case Study Card:**
```tsx
className="rounded-none rounded-t-2xl"
// No naturalAspect - defaults to aspect-video (16:9)
// thumbnailFit="cover" - image fills container
```

**Section Feature Video:**
```tsx
className="w-full max-w-4xl mx-auto shadow-2xl mb-16 border border-slate-200"
// thumbnailFit="cover"
```

### Video Modal Styles
```tsx
// Backdrop
className="absolute inset-0 bg-black/90 backdrop-blur-sm"

// Container
className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10"

// Close button
className="absolute -top-12 right-0 text-white transition hover:text-slate-300"
```

---

## Z-Index Scale
| Value | Usage |
|-------|-------|
| `z-0` | Background images |
| `z-10` | Overlays, hover videos |
| `z-20` | Play buttons |
| `z-50` | Fixed header |
| `z-100` | Modals |

---

## Responsive Breakpoints
Standard Tailwind breakpoints:
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+

Common patterns:
- `text-4xl md:text-5xl lg:text-6xl` - Headline scaling
- `py-24 md:py-32` - Section padding
- `grid md:grid-cols-2 lg:grid-cols-3` - Card grids
- `w-full md:w-auto` - Button width
- `flex-col md:flex-row` - Stack to row
