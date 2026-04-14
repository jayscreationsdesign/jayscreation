import posthog from 'posthog-js'

// Google Analytics 4 E-commerce Events
declare global {
  interface Window {
    gtag: (command: string, eventName: string, params?: object) => void;
  }
}

export const trackEvent = (eventName: string, params?: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

export const trackViewProduct = (product: any) => trackEvent('view_item', {
  currency: 'EUR',
  value: product.price,
  items: [{ item_id: product.id, item_name: product.name, price: product.price }]
})

export const trackAddToCart = (product: any, quantity: number) => trackEvent('add_to_cart', {
  currency: 'EUR',
  value: product.price * quantity,
  items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity }]
})

export const trackBeginCheckout = (cart: any[]) => trackEvent('begin_checkout', {
  currency: 'EUR',
  value: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  items: cart.map(item => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity }))
})

export const trackPurchase = (order: any) => trackEvent('purchase', {
  transaction_id: order.id,
  value: order.total,
  currency: 'EUR',
  items: order.items
})

// PostHog E-commerce Events
export const phTrackAddToCart = (product: any) => {
  posthog.capture('add_to_cart', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    currency: 'EUR',
    category: product.category,
    theme: product.theme || null
  })
}

export const phTrackCheckout = (total: number, items: any[]) => {
  posthog.capture('begin_checkout', { 
    total, 
    currency: 'EUR',
    items: items.map(item => ({
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      quantity: item.quantite,
      theme: item.theme || null
    }))
  })
}

export const phTrackPurchase = (orderId: string, total: number, items: any[]) => {
  posthog.capture('purchase', { 
    order_id: orderId, 
    total, 
    currency: 'EUR',
    items: items.map(item => ({
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      quantity: item.quantite,
      theme: item.theme || null
    }))
  })
}

export const phIdentifyUser = (userId: string, email: string, properties?: Record<string, any>) => {
  posthog.identify(userId, { 
    email,
    ...properties
  })
}

export const phTrackViewProduct = (product: any) => {
  posthog.capture('view_product', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    currency: 'EUR',
    category: product.category,
    theme: product.theme || null
  })
}

export const phTrackSearch = (query: string, resultsCount: number) => {
  posthog.capture('search', {
    query,
    results_count: resultsCount
  })
}

export const phTrackFilter = (filterType: string, filterValue: string) => {
  posthog.capture('filter', {
    filter_type: filterType,
    filter_value: filterValue
  })
}

export const phTrackContact = (type: string) => {
  posthog.capture('contact', {
    contact_type: type
  })
}

export const phTrackNewsletterSignup = (email: string) => {
  posthog.capture('newsletter_signup', {
    email
  })
}
