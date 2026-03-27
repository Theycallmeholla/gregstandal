"use client";

import { useEffect, useRef, useState } from 'react';
import { X, Play } from 'lucide-react';
import Image from 'next/image';

export function HlsVideo({
  src,
  poster,
  className = '',
  autoPlay = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = src;
    if (autoPlay) {
      setTimeout(() => video.play().catch(console.error), 50);
    }
  }, [src, autoPlay]);

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

export function HlsVideoModal({
  isOpen,
  onClose,
  src,
  poster,
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white transition hover:text-slate-300"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10">
          <HlsVideo src={src} poster={poster} className="h-full w-full" autoPlay={true} />
        </div>
      </div>
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
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  if (isPlaying) {
    return (
      <div className={`relative aspect-video bg-black rounded-2xl overflow-hidden ${className}`}>
        <HlsVideo src={src} poster={poster} className="h-full w-full" autoPlay={true} />
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
      {hoverVideoSrc && (
        <video
          ref={hoverVideoRef}
          src={hoverVideoSrc}
          loop
          muted
          playsInline
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
        className={`w-full ${naturalAspect ? 'h-auto' : 'h-full'} ${thumbnailFit === 'contain' ? 'object-contain' : 'object-cover'} transition duration-500 z-0 ${hoverVideoSrc ? (playOnHover ? 'opacity-100 group-hover:opacity-0' : 'opacity-0') : 'group-hover:scale-105'}`}
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
      className={`relative aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-black ${className}`}
      onClick={() => setIsPlaying(true)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderPreview()}
    </div>
  );
}
