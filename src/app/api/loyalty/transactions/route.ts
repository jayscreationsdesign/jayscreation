import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTransactionHistory } from '@/lib/loyalty';

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }
    
    // Obtenir l'historique des transactions
    const transactions = await getTransactionHistory(user.id);
    
    return NextResponse.json({
      success: true,
      transactions
    });
    
  } catch (error) {
    console.error('Erreur API loyalty transactions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
