import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pour l'instant, nous retournons les paramètres par défaut
    // En production, ces paramètres seraient stockés dans une table Supabase
    const defaultSettings = {
      emails: {
        expediteur_general: 'contact@jayscreationsdesign.fr',
        expediteur_commandes: 'commande@jayscreationsdesign.fr',
        notification_admin: 'contact@jayscreationsdesign.fr'
      },
      notifications: {
        nouveau_compte: true,
        validation_commande: true,
        demande_devis: true,
        rupture_stock: true,
        paiement_non_finalise: true
      },
      stock: {
        seuil_stock_bas: 5
      }
    };

    return NextResponse.json(defaultSettings);
  } catch (error) {
    console.error('Erreur paramètres:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const settings = await request.json();
    
    // Pour l'instant, nous simulons la sauvegarde
    // En production, ces paramètres seraient sauvegardés dans une table Supabase
    console.log('Sauvegarde des paramètres:', settings);

    return NextResponse.json({ success: true, message: 'Paramètres sauvegardés' });
  } catch (error) {
    console.error('Erreur sauvegarde paramètres:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde des paramètres' },
      { status: 500 }
    );
  }
}
