"use client";

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { trackVideoStart, trackVideoProgress, trackVideoComplete } from '@/lib/ab-test/experiment';
import type { ExperimentContext } from '@/lib/ab-test/types';

const VIDEO_MILESTONES = [25, 50, 75];

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = src;
    if (autoPlay) {
      setTimeout(() => video.play().catch(console.error), 50);
    }

    // Video tracking
    if (!context) return;

    const title = videoTitle || src.split('/').pop() || 'unknown';

    const handlePlay = () => {
      if (!hasStarted.current) {
        hasStarted.current = true;
        trackVideoStart(context, title, video.duration || 0);
        console.log('[Analytics] Video start:', title);
      }
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const percent = Math.round((video.currentTime / video.duration) * 100);

      for (const milestone of VIDEO_MILESTONES) {
        if (percent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          trackVideoProgress(context, title, milestone, video.duration);
          console.log(`[Analytics] Video progress: ${milestone}%`);
        }
      }
    };

    const handleEnded = () => {
      trackVideoComplete(context, title, video.duration || 0);
      console.log('[Analytics] Video complete:', title);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src, autoPlay, context, videoTitle]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-cover bg-black"
        playsInline
        controls
        autoPlay={autoPlay}
      />
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
  const hoverVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
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
    if (playOnHover && hoverVideoRef.current) hoverVideoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (playOnHover && hoverVideoRef.current) {
      hoverVideoRef.current.pause();
      hoverVideoRef.current.currentTime = 0;
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
          preload="auto"
          autoPlay={!playOnHover}
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
