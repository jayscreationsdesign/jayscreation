'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DebugAdminLogin() {
  const [debug, setDebug] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    // Vérifier les variables d'environnement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const jwtSecret = process.env.JWT_SECRET;

    setDebug({
      supabaseUrl: supabaseUrl ? '✅ Configurée' : '❌ Manquante',
      supabaseAnonKey: supabaseAnonKey ? '✅ Configurée' : '❌ Manquante',
      jwtSecret: jwtSecret ? '✅ Configuré' : '❌ Manquant',
      supabaseUrlValue: supabaseUrl || 'NON',
      supabaseAnonKeyValue: supabaseAnonKey ? 'PRÉSENTE' : 'NON'
    });
  }, []);

  const testConnection = async () => {
    try {
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

      const data = await response.json();
      
      setDebug((prev: any) => ({
        ...prev,
        apiResponse: {
          status: response.status,
          ok: response.ok,
          data: data,
          headers: Object.fromEntries(response.headers.entries())
        }
      }));

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      }
    } catch (error) {
      setDebug((prev: any) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔍 DEBUG ADMIN LOGIN</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Variables d'environnement</h2>
            <div className="space-y-2 font-mono text-sm">
              <p>NEXT_PUBLIC_SUPABASE_URL: {debug.supabaseUrl}</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {debug.supabaseAnonKey}</p>
              <p>JWT_SECRET: {debug.jwtSecret}</p>
            </div>
          </div>

          {debug.supabaseUrlValue && (
            <div>
              <h2 className="text-lg font-semibold mb-2">URL Supabase</h2>
              <p className="font-mono text-sm break-all">{debug.supabaseUrlValue}</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-2">Test API</h2>
            <button
              onClick={testConnection}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tester la connexion admin
            </button>
          </div>

          {debug.apiResponse && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Réponse API</h2>
              <div className="bg-gray-100 p-4 rounded text-sm font-mono">
                <p>Status: {debug.apiResponse.status}</p>
                <p>OK: {debug.apiResponse.ok ? '✅' : '❌'}</p>
                <pre className="mt-2 overflow-auto max-h-64">
                  {JSON.stringify(debug.apiResponse.data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {debug.error && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-red-600">Erreur</h2>
              <p className="text-red-600">{debug.error}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <a 
              href="/admin/login" 
              className="text-blue-500 hover:underline"
            >
              ← Retour à la page de login normale
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
