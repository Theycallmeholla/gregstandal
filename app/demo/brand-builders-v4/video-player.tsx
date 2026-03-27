"use client";

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { X } from 'lucide-react';

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

    const isMp4 = src.toLowerCase().includes('.mp4');

    if (isMp4) {
      video.src = src;
      if (autoPlay) {
        setTimeout(() => video.play().catch(console.error), 50);
      }
      return;
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      if (autoPlay) {
        // use a microtask to ensure src is loaded
        setTimeout(() => video.play().catch(console.error), 50);
      }
      return;
    }

    if (!Hls.isSupported()) {
      return;
    }

    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(video);

    if (autoPlay) {
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(console.error);
      });
    }

    return () => {
      hls.destroy();
    };
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
