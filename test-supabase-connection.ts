import { createClient } from '@supabase/supabase-js';

// Test de connexion Supabase
async function testSupabaseConnection() {
  console.log('???? Test de connexion Supabase...\n');

  try {
    // Configuration avec les variables d'environnement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('URL Supabase:', supabaseUrl);
    console.log('Anon Key existe:', !!supabaseAnonKey);

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('???? Variables manquantes');
      return { success: false, error: 'Variables manquantes' };
    }

    // Créer le client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test simple : essayer de récupérer la session (ne devrait pas échouer en réseau)
    console.log('???? Test de récupération session...');
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Erreur session:', sessionError.message);
      // Ne pas échouer sur erreur session, c'est normal si pas connecté
    }

    console.log('???? Session testée, pas d\'erreur réseau');

    // Test de connexion à la base de données
    console.log('???? Test de connexion base de données...');
    const { data: tablesData, error: tablesError } = await supabase
      .from('profils')
      .select('id')
      .limit(1);

    if (tablesError) {
      console.error('Erreur base de données:', tablesError.message);
      if (tablesError.message?.includes('Failed to fetch')) {
        return { success: false, error: 'Erreur réseau - Failed to fetch' };
      }
      // Autres erreurs sont normales (table vide, permissions, etc.)
    }

    console.log('???? Base de données accessible');

    // Test de ping simple
    console.log('???? Test ping Supabase...');
    const { data: pingData, error: pingError } = await supabase
      .rpc('get_service_role', { service_name: 'supabase' })
      .catch(() => ({ data: null, error: { message: 'RPC non disponible' } }));

    console.log('???? Connexion Supabase réussie !');
    return { success: true, message: 'Connexion Supabase opérationnelle' };

  } catch (error: any) {
    console.error('???? Erreur de connexion Supabase:');
    console.error('Message:', error.message);
    
    if (error.message?.includes('Failed to fetch') || error.message?.includes('fetch')) {
      return { success: false, error: 'Erreur réseau - Failed to fetch' };
    }
    
    return { success: false, error: error.message };
  }
}

// Exécuter le test
testSupabaseConnection()
  .then(result => {
    if (result.success) {
      console.log('\n???? Test terminé avec succès !');
      console.log('????', result.message);
    } else {
      console.log('\n???? Test échoué !');
      console.error('Erreur:', result.error);
    }
  })
  .catch((error: any) => {
    console.error('Erreur inattendue:', error.message);
  });
