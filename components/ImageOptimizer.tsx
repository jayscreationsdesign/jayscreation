import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { enhanceImage, getImageMetadata } from '../lib/image-optimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  sharpen?: boolean;
  denoise?: boolean;
  className?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 95,
  sharpen = true,
  denoise = false,
  className,
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setError('Impossible de charger l\'image');
    setIsLoading(false);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      
      {error ? (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <span className="text-gray-500 text-sm">{error}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 138}
          height={height || 138}
          quality={quality}
          priority={priority}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit: 'cover',
            borderRadius: '69px'
          }}
        />
      )}
    </div>
  );
}

// Hook pour l'optimisation d'images côté client
export function useImageOptimizer() {
  const [isProcessing, setIsProcessing] = useState(false);

  const optimizeImageFile = useCallback(async (
    file: File,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      sharpen?: boolean;
      denoise?: boolean;
    } = {}
  ): Promise<{ optimizedFile: File; metadata: any }> => {
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const nodeBuffer = Buffer.from(buffer);
      
      const optimizedBuffer = await enhanceImage(nodeBuffer, options);
      const metadata = await getImageMetadata(optimizedBuffer);
      
      const optimizedFile = new File(
        [new Uint8Array(optimizedBuffer)],
        file.name.replace(/\.[^/.]+$/, '.webp'),
        { type: 'image/webp' }
      );

      return { optimizedFile, metadata };
    } catch (error) {
      console.error('Erreur lors de l\'optimisation de l\'image:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { optimizeImageFile, isProcessing };
}
