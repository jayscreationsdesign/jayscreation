/**
 * Fonction utilitaire pour gérer les URLs d'images avec fallback
 * @param src - L'URL de l'image source
 * @param fallback - L'URL de fallback par défaut
 * @returns L'URL valide ou le fallback
 */
export function getImageSrc(src: string | null | undefined, fallback: string = "/images/products/placeholder.png"): string {
  if (!src || src.trim() === "") {
    return fallback;
  }
  
  // Vérifier si l'URL est valide (commence par http/ ou /)
  if (src.startsWith("http") || src.startsWith("/")) {
    return src;
  }
  
  // Si l'URL ne commence pas par /, l'ajouter
  return src.startsWith("/") ? src : `/${src}`;
}

/**
 * Fonction pour valider un tableau d'images
 * @param images - Tableau d'URLs d'images
 * @param fallback - L'URL de fallback par défaut
 * @returns Tableau d'URLs valides
 */
export function getImageArray(images: string[] | null | undefined, fallback: string = "/images/products/placeholder.png"): string[] {
  if (!images || images.length === 0) {
    return [fallback];
  }
  
  return images
    .filter(img => img && img.trim() !== "")
    .map(img => getImageSrc(img, fallback));
}
