'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminSuper() {
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Vérification simple en dur
      if (credentials.login === 'anais' && credentials.password === 'Anais-Admin-2026!') {
        // Créer un token simple
        const token = btoa(JSON.stringify({
          id: 'admin-123',
          login: 'anais',
          role: 'super_admin',
          timestamp: Date.now()
        }));
        
        // Stocker et rediriger
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify({
          id: 'admin-123',
          email: 'contact@jayscreationsdesign.fr',
          login: 'anais',
          nom: 'Manne',
          prenom: 'Anais',
          role: 'super_admin'
        }));
        
        setSuccess('✅ Connexion réussie ! Redirection...');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        setError('❌ Identifiants incorrects');
      }
    } catch (err: any) {
      setError('Erreur: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #8B4513, #6b3410)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        padding: '32px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#8B4513',
            marginBottom: '8px'
          }}>
            Jay's Creations Design
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Espace d'administration (Ultra Simple)
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '8px' 
            }}>
              Identifiant
            </label>
            <input
              type="text"
              required
              value={credentials.login}
              onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="anais"
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '8px' 
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: '#8B4513',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
              border: 'none',
              boxSizing: 'border-box'
            }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Infos de connexion */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#FAF7F2',
          borderRadius: '8px',
          border: '1px solid #E8E4DF'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#8B4513',
            marginBottom: '8px'
          }}>
            Identifiants de test :
          </h3>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
            <p><strong>Identifiant :</strong> anais</p>
            <p><strong>Mot de passe :</strong> Anais-Admin-2026!</p>
          </div>
        </div>

        {/* Lien vers le site */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link 
            href="/" 
            style={{
              color: '#8B4513',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
