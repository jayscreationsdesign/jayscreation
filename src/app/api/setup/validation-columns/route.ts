import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Tenter d'ajouter les colonnes manquantes une par une
    const results = [];

    // 1. Ajout de admin_token
    try {
      const { error: tokenError } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE commandes ADD COLUMN IF NOT EXISTS admin_token TEXT UNIQUE;`
      });
      
      if (tokenError) {
        // Alternative: utiliser SQL direct si RPC n'est pas disponible
        console.log('RPC non disponible, tentative alternative...');
      }
      results.push({ column: 'admin_token', status: 'tenté' });
    } catch (e) {
      results.push({ column: 'admin_token', status: 'erreur', error: e instanceof Error ? e.message : 'Erreur inconnue' });
    }

    // 2. Ajout de payment_intent_id
    try {
      const { error: paymentError } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE commandes ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;`
      });
      results.push({ column: 'payment_intent_id', status: 'tenté' });
    } catch (e) {
      results.push({ column: 'payment_intent_id', status: 'erreur', error: e instanceof Error ? e.message : 'Erreur inconnue' });
    }

    // 3. Ajout de token_used
    try {
      const { error: usedError } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE commandes ADD COLUMN IF NOT EXISTS token_used BOOLEAN DEFAULT FALSE;`
      });
      results.push({ column: 'token_used', status: 'tenté' });
    } catch (e) {
      results.push({ column: 'token_used', status: 'erreur', error: e instanceof Error ? e.message : 'Erreur inconnue' });
    }

    // 4. Mise à jour des contraintes de statut
    try {
      const { error: statusError } = await supabase.rpc('exec_sql', {
        sql: `
          ALTER TABLE commandes DROP CONSTRAINT IF EXISTS commandes_statut_check;
          ALTER TABLE commandes ADD CONSTRAINT commandes_statut_check 
          CHECK (statut IN ('en_attente', 'payee', 'annulee', 'pending', 'confirmed', 'cancelled'));
        `
      });
      results.push({ column: 'statut_constraint', status: 'tenté' });
    } catch (e) {
      results.push({ column: 'statut_constraint', status: 'erreur', error: e instanceof Error ? e.message : 'Erreur inconnue' });
    }

    return NextResponse.json({
      message: 'Tentative d\'ajout des colonnes de validation',
      results,
      note: 'Si les colonnes n\'existent toujours pas, appliquez manuellement la migration SQL dans le dashboard Supabase'
    });

  } catch (error) {
    console.error('Erreur setup colonnes:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la configuration des colonnes',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
