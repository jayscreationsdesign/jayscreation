import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteRequestEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const quoteData = await request.json();

    // Validation des données requises
    const requiredFields = ['prenom', 'nom', 'email', 'telephone'];
    const missingFields = requiredFields.filter(field => !quoteData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Champs requis manquants: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quoteData.email)) {
      return NextResponse.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }

    // Validation téléphone basique (français)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (quoteData.telephone && !phoneRegex.test(quoteData.telephone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Format téléphone invalide' },
        { status: 400 }
      );
    }

    // Nettoyage et formatage des données
    const cleanData = {
      prenom: quoteData.prenom.trim(),
      nom: quoteData.nom.trim(),
      email: quoteData.email.trim().toLowerCase(),
      telephone: quoteData.telephone.trim(),
      typeProduit: quoteData.typeProduit || 'Non spécifié',
      dimensions: quoteData.dimensions || 'Non spécifié',
      theme: quoteData.theme || 'Non spécifié',
      budget: quoteData.budget || 'Non spécifié',
      delai: quoteData.delai || 'Non spécifié',
      message: quoteData.message || 'Aucun message personnalisé',
      date: new Date().toISOString()
    };

    // Envoi de l'email de demande de devis
    const emailData = {
      customerName: `${cleanData.prenom} ${cleanData.nom}`,
      customerEmail: cleanData.email,
      projectType: cleanData.typeProduit,
      projectDescription: `Dimensions: ${cleanData.dimensions}\nThème: ${cleanData.theme}\nMessage: ${cleanData.message}`,
      budget: cleanData.budget,
      urgency: cleanData.delai
    };
    const result = await sendQuoteRequestEmail(emailData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Demande de devis envoyée avec succès',
        quoteId: `DEVIS-${Date.now()}`
      });
    } else {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la demande de devis", details: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur API devis:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API Demande de Devis - Jay\'s Creations Design',
    usage: {
      method: 'POST',
      body: {
        prenom: 'string (requis)',
        nom: 'string (requis)',
        email: 'string (requis)',
        telephone: 'string (requis)',
        typeProduit: 'string (optionnel)',
        dimensions: 'string (optionnel)',
        theme: 'string (optionnel)',
        budget: 'string (optionnel)',
        delai: 'string (optionnel)',
        message: 'string (optionnel)'
      }
    }
  });
}
