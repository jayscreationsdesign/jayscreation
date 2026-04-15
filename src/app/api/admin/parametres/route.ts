import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pour l'instant, nous retournons les paramètres par défaut
    // En production, ces paramètres seraient stockés dans une table Supabase
    const defaultSettings = {
      boutique: {
        nom: "Jay's Creations Design",
        description: "Créations artisanales uniques et personnalisées",
        email_contact: 'contact@jayscreationsdesign.fr',
        telephone: '+33 6 12 34 56 78',
        adresse: '123 Rue de la Création, 75001 Paris',
        siret: '12345678901234',
        devise: 'EUR',
        pays: 'FR'
      },
      
      emails: {
        expediteur_general: 'contact@jayscreationsdesign.fr',
        expediteur_commandes: 'commande@jayscreationsdesign.fr',
        notification_admin: 'contact@jayscreationsdesign.fr',
        smtp_host: 'smtp.gmail.com',
        smtp_port: 587,
        smtp_user: '',
        smtp_password: ''
      },
      
      notifications: {
        nouveau_compte: true,
        validation_commande: true,
        demande_devis: true,
        rupture_stock: true,
        paiement_non_finalise: true,
        nouvelle_commande: true,
        message_chat: true
      },
      
      paiements: {
        stripe_enabled: true,
        stripe_public_key: '',
        stripe_secret_key: '',
        paypal_enabled: false,
        paypal_client_id: '',
        paypal_secret: '',
        mode_sandbox: true
      },
      
      livraison: {
        frais_livraison_national: 5.99,
        frais_livraison_international: 15.99,
        livraison_gratite_minimum: 50.00,
        delai_standard: '3-5 jours ouvrés',
        delai_express: '24-48h',
        transporteur_par_defaut: 'Colissimo'
      },
      
      taxes: {
        tva_par_defaut: 20.0,
        tva_reduite: 5.5,
        produit_tva_reduite: false,
        afficher_taxes: true,
        calcul_tva_automatique: true
      },
      
      stock: {
        seuil_stock_bas: 5,
        gestion_stock_activee: true,
        vente_stock_epuise: false,
        notification_rupture: true
      },
      
      securite: {
        double_authentification: false,
        session_timeout: 3600,
        log_actions: true,
        backup_automatic: true,
        backup_frequency: 'daily'
      },
      
      apparence: {
        theme_couleur: '#8B4513',
        theme_couleur_secondaire: '#D4A574',
        police_principale: 'Playfair Display',
        police_secondaire: 'Inter',
        logo_url: '',
        favicon_url: '',
        maintenance_mode: false
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
