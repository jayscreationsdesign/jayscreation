import sharp from 'sharp';
import path from 'path';

// Configuration pour l'optimisation des images
export const imageConfig = {
  // Qualité maximale pour les images de haute qualité
  quality: 95,
  // Formats supportés
  formats: ['jpeg', 'png', 'webp', 'avif'],
  // Kernel pour le redimensionnement (lanczos3 = meilleure qualité)
  kernel: 'lanczos3' as const,
  // Options de compression
  compression: {
    jpeg: { quality: 95, progressive: true },
    png: { compressionLevel: 9, adaptiveFiltering: true },
    webp: { quality: 95, effort: 6 },
    avif: { quality: 95, effort: 6 }
  }
};

// Fonction pour optimiser une image
export async function optimizeImage(
  inputBuffer: Buffer,
  options: {
    width?: number;
    height?: number;
    format?: 'jpeg' | 'png' | 'webp' | 'avif';
    quality?: number;
  } = {}
): Promise<Buffer> {
  const {
    width,
    height,
    format = 'jpeg',
    quality = imageConfig.quality
  } = options;

  let pipeline = sharp(inputBuffer);

  // Redimensionnement si nécessaire
  if (width || height) {
    pipeline = pipeline.resize(width, height, {
      fit: 'inside',
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3
    });
  }

  // Application du format et de la qualité
  switch (format) {
    case 'jpeg':
      pipeline = pipeline.jpeg({ 
        quality, 
        progressive: true,
        mozjpeg: true // Utiliser mozjpeg pour une meilleure compression
      });
      break;
    case 'png':
      pipeline = pipeline.png({ 
        compressionLevel: 9,
        adaptiveFiltering: true,
        progressive: true
      });
      break;
    case 'webp':
      pipeline = pipeline.webp({ 
        quality,
        effort: 6,
        smartSubsample: true
      });
      break;
    case 'avif':
      pipeline = pipeline.avif({ 
        quality,
        effort: 6
      });
      break;
  }

  return pipeline.toBuffer();
}

// Fonction pour générer plusieurs formats d'une image
export async function generateImageFormats(
  inputBuffer: Buffer,
  baseName: string
): Promise<{ [key: string]: Buffer }> {
  const formats = ['jpeg', 'png', 'webp', 'avif'] as const;
  const results: { [key: string]: Buffer } = {};

  for (const format of formats) {
    try {
      const optimized = await optimizeImage(inputBuffer, { format });
      results[`${baseName}.${format}`] = optimized;
    } catch (error) {
      console.error(`Erreur lors de la génération du format ${format}:`, error);
    }
  }

  return results;
}

// Fonction pour améliorer la netteté d'une image
export async function enhanceImageSharpness(
  inputBuffer: Buffer,
  sharpenAmount: number = 1.5
): Promise<Buffer> {
  return sharp(inputBuffer)
    .sharpen(1.0, 1.0, sharpenAmount)
    .toBuffer();
}

// Fonction pour réduire le bruit
export async function reduceNoise(
  inputBuffer: Buffer,
  strength: number = 0.5
): Promise<Buffer> {
  return sharp(inputBuffer)
    .median(3)
    .toBuffer();
}

// Pipeline complet d'amélioration d'image
export async function enhanceImage(
  inputBuffer: Buffer,
  options: {
    width?: number;
    height?: number;
    format?: 'jpeg' | 'png' | 'webp' | 'avif';
    quality?: number;
    sharpen?: boolean;
    denoise?: boolean;
  } = {}
): Promise<Buffer> {
  let processedBuffer = inputBuffer;

  // Réduction du bruit si demandé
  if (options.denoise) {
    processedBuffer = await reduceNoise(processedBuffer);
  }

  // Amélioration de la netteté si demandé
  if (options.sharpen) {
    processedBuffer = await enhanceImageSharpness(processedBuffer);
  }

  // Optimisation finale
  return optimizeImage(processedBuffer, options);
}

// Utilitaire pour obtenir les métadonnées d'une image
export async function getImageMetadata(buffer: Buffer) {
  const metadata = await sharp(buffer).metadata();
  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size: metadata.size,
    hasAlpha: metadata.hasAlpha,
    density: metadata.density
  };
}
