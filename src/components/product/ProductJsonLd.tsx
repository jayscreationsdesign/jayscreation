'use client'

interface ProductJsonLdProps {
  product: any
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - Création artisanale personnalisée`,
    "image": product.image || '/images/logo/logo.png',
    "category": product.category || 'Papeterie',
    "offers": {
      "@type": "Offer",
      "price": product.unit_price || product.price_min || product.price || 0,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Jay's Creations Design",
        "url": "https://www.jayscreationsdesign.fr"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "Jay's Creations Design"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
