import { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.jayscreationsdesign.fr'
  
  const productUrls = products.map(p => ({
    url: `${baseUrl}/produit/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    { 
      url: baseUrl, 
      lastModified: new Date(), 
      changeFrequency: 'daily' as const,
      priority: 1 
    },
    { 
      url: `${baseUrl}/boutique`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly' as const,
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/panier`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly' as const,
      priority: 0.7 
    },
    { 
      url: `${baseUrl}/contact`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly' as const,
      priority: 0.6 
    },
    { 
      url: `${baseUrl}/a-propos`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly' as const,
      priority: 0.5 
    },
    ...productUrls
  ]
}
