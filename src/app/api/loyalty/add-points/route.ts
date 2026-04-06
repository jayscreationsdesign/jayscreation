import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { addLoyaltyTransaction } from '@/lib/loyalty';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification et le secret
    const body = await request.json();
    const apiSecret = request.headers.get('x-api-secret');
    
    if (apiSecret !== process.env.LOYALTY_API_SECRET) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }
    
    const { userId, type, points, description, referenceId } = body;
    
    if (!userId || !type || points === undefined || !description) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }
    
    // Ajouter les points
    const result = await addLoyaltyTransaction(userId, type, points, description, referenceId);
    
    return NextResponse.json({
      success: true,
      result
    });
    
  } catch (error) {
    console.error('Erreur API add points:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
