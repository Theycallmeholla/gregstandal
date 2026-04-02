"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { trackVideoStart, trackVideoProgress, trackVideoComplete } from '@/lib/ab-test/experiment';
import type { ExperimentContext } from '@/lib/ab-test/types';

const VIDEO_MILESTONES = [25, 50, 75];
const STALL_TIMEOUT_MS = 8000;
const MAX_RETRY_ATTEMPTS = 3;

function VideoPlayer({
  src,
  poster,
  className = '',
  autoPlay = false,
  context,
  videoTitle,
}: {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  context?: ExperimentContext | null;
  videoTitle?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackedMilestones = useRef<Set<number>>(new Set());
  const hasStarted = useRef(false);
  const stallTimerRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  const [showRetry, setShowRetry] = useState(false);

  const clearStallTimer = useCallback(() => {
    if (stallTimerRef.current) {
      clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }
  }, []);

  const attemptRecovery = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (retryCountRef.current >= MAX_RETRY_ATTEMPTS) {
      setShowRetry(true);
      return;
    }

    retryCountRef.current++;
    console.log(`[Video] Recovery attempt ${retryCountRef.current}/${MAX_RETRY_ATTEMPTS}`);

    const currentTime = video.currentTime;
    video.load();
    video.currentTime = Math.max(0, currentTime - 0.5);
    video.play().catch(() => setShowRetry(true));
  }, []);

  const handleRetryClick = useCallback(() => {
    retryCountRef.current = 0;
    setShowRetry(false);
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(console.error);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = src;

    if (autoPlay) {
      setTimeout(() => video.play().catch(console.error), 50);
    }

    const title = videoTitle || src.split('/').pop() || 'unknown';

    const handleCanPlay = () => {
      retryCountRef.current = 0;
      setShowRetry(false);
    };

    const handlePlay = () => {
      clearStallTimer();
      if (context && !hasStarted.current) {
        hasStarted.current = true;
        trackVideoStart(context, title, video.duration || 0);
      }
    };

    const handlePause = () => clearStallTimer();

    const handleWaiting = () => {
      clearStallTimer();
      stallTimerRef.current = setTimeout(() => {
        if (video.paused) return;
        console.log('[Video] Stall detected, attempting recovery');
        attemptRecovery();
      }, STALL_TIMEOUT_MS);
    };

    const handlePlaying = () => clearStallTimer();

    const handleTimeUpdate = () => {
      clearStallTimer();
      if (!context || !video.duration) return;
      const percent = Math.round((video.currentTime / video.duration) * 100);
      for (const milestone of VIDEO_MILESTONES) {
        if (percent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          trackVideoProgress(context, title, milestone, video.duration);
        }
      }
    };

    const handleError = () => {
      console.error('[Video] Playback error:', video.error);
      if (retryCountRef.current < MAX_RETRY_ATTEMPTS) {
        attemptRecovery();
      } else {
        setShowRetry(true);
      }
    };

    const handleEnded = () => {
      clearStallTimer();
      if (context) {
        trackVideoComplete(context, title, video.duration || 0);
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      clearStallTimer();
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src, autoPlay, context, videoTitle, clearStallTimer, attemptRecovery]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-cover bg-black"
        playsInline
        controls
        preload="auto"
      />
      {showRetry && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <button
            onClick={handleRetryClick}
            className="flex flex-col items-center gap-2 text-white hover:text-orange-400 transition-colors"
          >
            <RefreshCw className="w-12 h-12" />
            <span className="text-sm font-medium">Tap to retry</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function InlineVideoPlayer({
  src,
  poster,
  thumbnail,
  hoverVideoSrc,
  thumbnailFit = 'cover',
  accentColor = '#FF6B00',
  className = '',
  naturalAspect = false,
  playOnHover = false,
  context,
  videoTitle,
}: {
  src: string;
  poster: string;
  thumbnail?: string;
  hoverVideoSrc?: string;
  thumbnailFit?: 'cover' | 'contain';
  accentColor?: string;
  className?: string;
  naturalAspect?: boolean;
  playOnHover?: boolean;
  context?: ExperimentContext | null;
  videoTitle?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const preloadLinkRef = useRef<HTMLLinkElement | null>(null);

  // Lazy load hover video when in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Preload main video when user hovers (before click)
  const handlePreloadMainVideo = useCallback(() => {
    if (isPreloading || !src) return;
    setIsPreloading(true);

    // Use link preload for better browser caching
    if (typeof document !== 'undefined' && !preloadLinkRef.current) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      document.head.appendChild(link);
      preloadLinkRef.current = link;
    }
  }, [src, isPreloading]);

  // Cleanup preload link on unmount
  useEffect(() => {
    return () => {
      if (preloadLinkRef.current) {
        preloadLinkRef.current.remove();
      }
    };
  }, []);

  if (isPlaying) {
    return (
      <div className={`relative aspect-video bg-black rounded-2xl overflow-hidden ${className}`}>
        <VideoPlayer
          src={src}
          poster={poster}
          className="h-full w-full"
          autoPlay={true}
          context={context}
          videoTitle={videoTitle}
        />
      </div>
    );
  }

  const handleMouseEnter = () => {
    handlePreloadMainVideo();
    if (playOnHover && hoverVideoRef.current) hoverVideoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (playOnHover && hoverVideoRef.current) {
      hoverVideoRef.current.pause();
      hoverVideoRef.current.currentTime = 0;
    }
  };

  const handleHoverVideoError = () => {
    // Silently handle hover video errors - these are non-critical previews
    console.log('[Video] Hover preview failed to load, hiding');
    if (hoverVideoRef.current) {
      hoverVideoRef.current.style.display = 'none';
    }
  };

  const renderPreview = () => (
    <>
      {hoverVideoSrc && isInView && (
        <video
          ref={hoverVideoRef}
          src={hoverVideoSrc}
          loop
          muted
          playsInline
          preload="metadata"
          autoPlay={!playOnHover}
          onError={handleHoverVideoError}
          className={`absolute inset-0 w-full h-full object-cover transition duration-500 z-10 ${playOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        />
      )}
      <Image
        src={thumbnail || poster}
        alt="Video Thumbnail"
        fill={!naturalAspect}
        width={naturalAspect ? 1920 : undefined}
        height={naturalAspect ? 1080 : undefined}
        unoptimized={(thumbnail || '').toLowerCase().endsWith('.gif')}
        className={`w-full ${naturalAspect ? 'h-auto' : 'h-full'} ${thumbnailFit === 'contain' ? 'object-contain' : 'object-cover'} transition duration-500 z-0 ${hoverVideoSrc && isInView ? (playOnHover ? 'opacity-100 group-hover:opacity-0' : 'opacity-0') : 'opacity-100 group-hover:scale-105'}`}
      />
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${hoverVideoSrc ? 'z-20' : ''}`}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300"
          style={{ backgroundColor: accentColor }}
        >
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </>
  );

  if (naturalAspect) {
    return (
      <div
        ref={containerRef}
        className={`relative rounded-2xl overflow-hidden group cursor-pointer ${className}`}
        onClick={() => setIsPlaying(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderPreview()}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-black ${className}`}
      onClick={() => setIsPlaying(true)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderPreview()}
    </div>
  );
}
