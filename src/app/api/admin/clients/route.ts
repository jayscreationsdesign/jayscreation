import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Pour l'instant, nous allons simuler les clients depuis les commandes
    // car nous n'avons pas de table clients dédiée
    const { data: commandes, error } = await supabase
      .from('commandes')
      .select('client_nom, client_email, client_telephone, created_at, total')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Grouper par client pour avoir des statistiques
    const clientsMap = new Map();
    
    (commandes || []).forEach((commande: any) => {
      const key = commande.client_email || 'unknown';
      if (!clientsMap.has(key)) {
        clientsMap.set(key, {
          id: key,
          nom: commande.client_nom || 'Client',
          email: commande.client_email,
          telephone: commande.client_telephone,
          created_at: commande.created_at,
          commandes_count: 0,
          total_depense: 0
        });
      }
      
      const client = clientsMap.get(key);
      client.commandes_count += 1;
      client.total_depense += commande.total || 0;
    });

    const clients = Array.from(clientsMap.values());

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Erreur clients:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des clients' },
      { status: 500 }
    );
  }
}
