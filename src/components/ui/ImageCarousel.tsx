"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  variant?: "category" | "product";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
}

export default function ImageCarousel({
  images,
  alt,
  className = "",
  variant = "product",
  autoPlay = false,
  autoPlayInterval = 3000,
  showThumbnails = true,
  showDots = true,
  showArrows = true,
  aspectRatio = "square"
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, images.length, autoPlayInterval]);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    const container = document.getElementById(`carousel-${alt.replace(/\s+/g, '-')}`);
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
      return () => container.removeEventListener("keydown", handleKeyDown);
    }
  }, [goToPrevious, goToNext, alt]);

  // Touch/Swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]"
  };

  // If only one image, show simple image
  if (images.length <= 1) {
    return (
      <div className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden rounded-xl ${className}`}>
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  // Category variant - minimal carousel
  if (variant === "category") {
    return (
      <div 
        id={`carousel-${alt.replace(/\s+/g, '-')}`}
        className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden rounded-xl ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} — vue ${currentIndex + 1}`}
          fill
          className="object-contain transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Minimal arrows for category */}
        {showArrows && (
          <>
            <button
              onClick={goToPrevious}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110 md:left-3 md:h-9 md:w-9"
            >
              <ChevronLeft size={16} className="text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110 md:right-3 md:h-9 md:w-9"
            >
              <ChevronRight size={16} className="text-gray-700" />
            </button>
          </>
        )}

        {/* Minimal dots for category */}
        {showDots && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-gray-800 w-4"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute top-2 right-2 rounded-full bg-black/60 backdrop-blur-sm px-2 py-1 text-xs text-white">
          {currentIndex + 1}/{images.length}
        </div>
      </div>
    );
  }

  // Product variant - full carousel
  return (
    <div 
      id={`carousel-${alt.replace(/\s+/g, '-')}`}
      className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden rounded-xl ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={images[currentIndex]}
        alt={`${alt} — vue ${currentIndex + 1}`}
        fill
        className="object-contain transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={currentIndex === 0}
      />

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={goToPrevious}
            aria-label="Image précédente"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronLeft size={22} className="text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Image suivante"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronRight size={22} className="text-gray-800" />
          </button>
        </>
      )}

      {/* Image counter */}
      <div className="absolute top-4 left-4 rounded-full bg-black/70 backdrop-blur-sm px-3 py-2 text-sm text-white font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Play/Pause button for auto-play */}
      {autoPlay && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause" : "Lecture automatique"}
          className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg transition-all hover:bg-white hover:scale-110"
        >
          {isPlaying ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Aller à l'image ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Vue ${i + 1}`}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105 md:h-20 md:w-20 ${
                i === currentIndex 
                  ? "border-[#C8A96E] shadow-lg scale-105" 
                  : "border-gray-200 hover:border-[#C8A96E]/50"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} — vue ${i + 1}`}
                fill
                className="object-contain"
                sizes="80px"
              />
              {i === currentIndex && (
                <div className="absolute inset-0 bg-[#C8A96E]/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
