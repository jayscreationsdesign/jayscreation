import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Pour l'instant, nous allons simuler les devis
    // car nous n'avons pas encore de table devis
    const mockDevis = [
      {
        id: '1',
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        telephone: '0612345678',
        message: 'Je souhaiterais un devis pour une composition florale pour mon mariage.',
        produits: ['Bouquet de mariage', 'Centre de table'],
        statut: 'nouveau',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        nom: 'Marie Martin',
        email: 'marie.martin@email.com',
        telephone: '0698765432',
        message: 'Demande de devis pour une décoration anniversaire.',
        produits: ['Décoration anniversaire'],
        statut: 'en_cours',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        nom: 'Pierre Bernard',
        email: 'pierre.bernard@email.com',
        telephone: '0611223344',
        message: 'Devis pour composition florale entreprise.',
        produits: ['Composition entreprise'],
        statut: 'accepte',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    return NextResponse.json(mockDevis);
  } catch (error) {
    console.error('Erreur devis:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des devis' },
      { status: 500 }
    );
  }
}
