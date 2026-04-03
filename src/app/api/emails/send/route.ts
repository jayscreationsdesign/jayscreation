import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, sendMultipleEmails, type EmailType } from '@/lib/send-email';

// Rate limiting simple en mémoire
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 requêtes par minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute en ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier le secret API
    const apiSecret = request.headers.get('x-api-secret');
    if (apiSecret !== process.env.EMAIL_API_SECRET) {
      console.error('❌ API Secret invalide');
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Rate limiting
    const ip = request.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      console.error('❌ Rate limit dépassé pour IP:', ip);
      return NextResponse.json(
        { success: false, error: 'Trop de requêtes, veuillez réessayer plus tard' },
        { status: 429 }
      );
    }

    // Parser le body
    const body = await request.json();
    const { type, data }: { type: EmailType; data: any } = body;

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'Type et data sont requis' },
        { status: 400 }
      );
    }

    console.log(`📧 Traitement email type: ${type}`);

    let result;

    switch (type) {
      case 'welcome': {
        const { prenom, email } = data;
        const { WelcomeEmail } = await import('@/emails/WelcomeEmail');
        result = await sendEmail({
          type,
          to: email,
          subject: 'Bienvenue chez Jay\'s Creations Design ✨',
          from: 'contact',
          react: React.createElement(WelcomeEmail, { prenom, email }),
        });
        break;
      }

      case 'order-confirmation': {
        const { prenom, orderNumber, items, total, shippingAddress } = data;
        const { OrderConfirmationEmail } = await import('@/emails/OrderConfirmationEmail');
        result = await sendEmail({
          type,
          to: `${prenom.toLowerCase().replace(' ', '.')}@example.com`, // À adapter avec vrai email client
          subject: `Commande #${orderNumber} confirmée`,
          from: 'commande',
          react: React.createElement(OrderConfirmationEmail, { 
            prenom, 
            orderNumber, 
            items, 
            total, 
            shippingAddress 
          }),
        });
        break;
      }

      case 'order-notification': {
        const { orderNumber, items, total, customerEmail, customerName } = data;
        const { OrderNotificationEmail } = await import('@/emails/OrderNotificationEmail');
        result = await sendEmail({
          type,
          to: process.env.ADMIN_EMAIL!,
          subject: `Nouvelle commande #${orderNumber}`,
          from: 'commande',
          react: React.createElement(OrderNotificationEmail, { 
            orderNumber, 
            items, 
            total, 
            customerEmail, 
            customerName 
          }),
        });
        break;
      }

      case 'quote-request': {
        const { prenom, quoteDetails } = data;
        const { QuoteRequestEmail } = await import('@/emails/QuoteRequestEmail');
        result = await sendEmail({
          type,
          to: `${prenom.toLowerCase().replace(' ', '.')}@example.com`, // À adapter avec vrai email client
          subject: 'Votre demande de devis a été reçue',
          from: 'commande',
          react: React.createElement(QuoteRequestEmail, { prenom, quoteDetails }),
        });
        break;
      }

      case 'quote-notification': {
        const { customerName, customerEmail, customerPhone, quoteDetails } = data;
        const { QuoteNotificationEmail } = await import('@/emails/QuoteNotificationEmail');
        result = await sendEmail({
          type,
          to: process.env.ADMIN_EMAIL!,
          subject: `Nouvelle demande de devis de ${customerName}`,
          from: 'commande',
          react: React.createElement(QuoteNotificationEmail, { 
            customerName, 
            customerEmail, 
            customerPhone, 
            quoteDetails 
          }),
        });
        break;
      }

      case 'stock-alert': {
        const { productName, productId } = data;
        const { StockAlertEmail } = await import('@/emails/StockAlertEmail');
        result = await sendEmail({
          type,
          to: process.env.ADMIN_EMAIL!,
          subject: `Rupture de stock : ${productName}`,
          from: 'commande',
          react: React.createElement(StockAlertEmail, { productName, productId }),
        });
        break;
      }

      case 'abandoned-cart': {
        const { prenom, items, cartUrl } = data;
        const { AbandonedCartEmail } = await import('@/emails/AbandonedCartEmail');
        result = await sendEmail({
          type,
          to: `${prenom.toLowerCase().replace(' ', '.')}@example.com`, // À adapter avec vrai email client
          subject: 'Vous avez oublié quelque chose ? 🛒',
          from: 'commande',
          react: React.createElement(AbandonedCartEmail, { prenom, items, cartUrl }),
        });
        break;
      }

      default:
        return NextResponse.json(
          { success: false, error: `Type d'email non supporté: ${type}` },
          { status: 400 }
        );
    }

    console.log(`✅ Email traité - Type: ${type}, Success: ${result.success}`);

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
    });

  } catch (error) {
    console.error('❌ Erreur API emails:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur serveur' 
      },
      { status: 500 }
    );
  }
}
