import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Créer le client Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insérer l'email dans la table newsletter_subscribers
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        { 
          email: email.toLowerCase().trim(),
          source: 'footer',
          subscribed_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      // Si l'email existe déjà, c'est ok
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'Vous êtes déjà inscrit à notre newsletter !' },
          { status: 200 }
        );
      }
      
      console.error('Newsletter subscription error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'inscription' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Merci pour votre inscription !', data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
