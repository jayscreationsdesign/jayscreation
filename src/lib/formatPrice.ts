/**
 * Fonction utilitaire centralisée pour le formatage des prix en euros
 * Utilisée partout dans l'application pour garantir une cohérence parfaite
 */

export function formatPriceEUR(amount: number): string {
  if (Number.isNaN(amount)) return ''
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formatage du prix pour les badges (sans décimales si .00)
 */
export function formatPriceEURBadge(amount: number): string {
  if (Number.isNaN(amount)) return ''
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount)
  
  // Retire les décimales .00 pour un affichage plus clean dans les badges
  return formatted.replace(',00\xa0', '')
}

/**
 * Formatage du prix pour les calculs internes (toujours 2 décimales)
 */
export function formatPriceEURPrecise(amount: number): string {
  if (Number.isNaN(amount)) return ''
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
