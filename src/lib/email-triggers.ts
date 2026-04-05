import { sendEmail, emailTemplates } from './email-service';

// Fonctions pour déclencher les emails depuis votre application

export async function triggerWelcomeEmail(user: { email: string; name?: string }) {
  try {
    console.log('📧 Envoi email de bienvenue via API route...');
    
    const response = await fetch('/api/emails/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': process.env.EMAIL_API_SECRET || 'default-secret',
      },
      body: JSON.stringify({
        type: 'welcome',
        data: {
          prenom: user.name?.split(' ')[0] || 'Cher client',
          email: user.email,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erreur API email:', errorData);
      throw new Error(errorData.error || 'Erreur envoi email');
    }

    const result = await response.json();
    console.log('✅ Email de bienvenue envoyé avec succès:', result);
    
  } catch (error) {
    console.error('❌ Erreur email bienvenue:', error);
    throw error; // Propager l'erreur pour le try/catch dans le composant
  }
}

export async function triggerNewOrderEmails(order: {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  total: number;
  items?: any[];
  created_at: string;
}) {
  try {
    // Email admin
    await sendEmail(emailTemplates.newOrderAdmin(order));
    
    // Email client
    await sendEmail(emailTemplates.orderConfirmation(order));
    
    console.log('✅ Emails de commande envoyés pour la commande:', order.id);
  } catch (error) {
    console.error('❌ Erreur emails commande:', error);
  }
}

export async function triggerQuoteRequestEmail(quote: {
  name: string;
  email: string;
  phone?: string;
  product: string;
  quantity?: string;
  budget?: string;
  event_date?: string;
  message: string;
}) {
  try {
    await sendEmail(emailTemplates.quoteRequest({
      ...quote,
      created_at: new Date().toISOString()
    }));
    
    console.log('✅ Email de devis envoyé pour:', quote.email);
  } catch (error) {
    console.error('❌ Erreur email devis:', error);
  }
}

export async function triggerLowStockAlert(product: {
  id: string;
  name: string;
  sku?: string;
  stock: number;
  alert_threshold?: number;
}) {
  try {
    await sendEmail(emailTemplates.lowStockAlert(product));
    console.log('✅ Alerte de stock faible envoyée pour:', product.name);
  } catch (error) {
    console.error('❌ Erreur alerte stock:', error);
  }
}

export async function triggerAbandonedCartEmail(cart: {
  customer_email: string;
  items: any[];
  total: number;
  abandoned_at?: string;
}) {
  try {
    const template = emailTemplates.abandonedCart({
      ...cart,
      abandoned_at: cart.abandoned_at || new Date().toISOString()
    });
    
    await sendEmail({
      to: template.to,
      subject: template.subject,
      html: template.html,
      from: template.from, // Utilise commande@jayscreationsdesign.fr
      replyTo: 'contact@jayscreationsdesign.fr'
    });
    
    console.log('✅ Email panier abandonné envoyé depuis commande@jayscreationsdesign.fr à:', cart.customer_email);
  } catch (error) {
    console.error('❌ Erreur email panier abandonné:', error);
  }
}

// Fonction utilitaire pour vérifier le stock et envoyer des alertes
export async function checkAndAlertLowStock(products: any[]) {
  const alertThreshold = 5; // Seuil d'alerte par défaut
  
  for (const product of products) {
    if (product.stock <= alertThreshold) {
      await triggerLowStockAlert({
        id: product.id,
        name: product.name,
        sku: product.sku,
        stock: product.stock,
        alert_threshold: alertThreshold
      });
    }
  }
}

// Fonction pour détecter les paniers abandonnés (à appeler via un cron job)
export async function detectAbandonedCarts() {
  // Cette fonction devrait être implémentée selon votre logique métier
  // Par exemple : vérifier les paniers non finalisés depuis plus de 2h
  
  console.log('🔍 Détection des paniers abandonnés...');
  // Implémentez votre logique ici
}
