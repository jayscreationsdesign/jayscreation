import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    // Validation des données
    if (!email || !firstName) {
      return NextResponse.json(
        { error: 'Email et prénom requis' },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }

    // Envoi de l'email de bienvenue
    const result = await sendWelcomeEmail(email, firstName);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email de bienvenue envoyé avec succès',
        messageId: result.clientEmail.messageId
      });
    } else {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email", details: result.clientEmail.error || result.adminNotification.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur API welcome email:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API Email de Bienvenue - Jay\'s Creations Design',
    usage: {
      method: 'POST',
      body: {
        email: 'string (requis)',
        firstName: 'string (requis)'
      }
    }
  });
}
