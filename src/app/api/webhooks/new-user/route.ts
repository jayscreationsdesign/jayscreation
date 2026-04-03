import { NextRequest, NextResponse } from 'next/server';
import { triggerWelcomeEmail } from '@/lib/email-triggers';

export async function POST(request: NextRequest) {
  // Gérer CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  try {
    const user = await request.json();
    
    console.log('👤 Nouvel utilisateur inscrit:', user);

    // Email de bienvenue
    await triggerWelcomeEmail({
      email: user.email,
      name: user.name || user.user_metadata?.prenom || 'Cher client'
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email de bienvenue envoyé avec succès',
      user_email: user.email
    });

  } catch (error) {
    console.error('❌ Erreur webhook new-user:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email de bienvenue' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook new-user - POST requis pour envoyer l\'email de bienvenue' 
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 200 });
}
