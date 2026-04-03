'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SimpleTest() {
  const [result, setResult] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Afficher les variables d'environnement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NON CONFIGURÉ';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'CONFIGURÉE' : 'NON CONFIGURÉE';
    const jwtSecret = process.env.JWT_SECRET ? 'CONFIGURÉ' : 'NON CONFIGURÉ';

    setResult(`Variables:
NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey}
JWT_SECRET: ${jwtSecret}`);
  }, []);

  const testDirect = async () => {
    try {
      setResult('Test de connexion en cours...');
      
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: 'anais',
          password: 'Anais-Admin-2026!'
        }),
      });

      const data = await response.text();
      
      setResult(`Réponse API (${response.status}):
${data}`);
      
      if (response.ok) {
        const parsed = JSON.parse(data);
        localStorage.setItem('admin_token', parsed.token);
        localStorage.setItem('admin_user', JSON.stringify(parsed.user));
        router.push('/admin/dashboard');
      }
    } catch (error: any) {
      setResult(`ERREUR: ${error.message}`);
    }
  };

  const checkTable = async () => {
    try {
      const response = await fetch('/api/test-admin-table');
      const data = await response.text();
      setResult(`Vérification table:
${data}`);
    } catch (error: any) {
      setResult(`ERREUR TABLE: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 TEST ADMIN - DIAGNOSTIC</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="font-bold mb-2">Résultat:</h2>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded">
              {result}
            </pre>
          </div>

          <div className="flex gap-4">
            <button
              onClick={testDirect}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              🧪 Tester Connexion Admin
            </button>
            
            <button
              onClick={checkTable}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              🗃️ Vérifier Table Admin
            </button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <a href="/admin/login" className="text-blue-500 hover:underline">
              ← Retour à la page de login normale
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
