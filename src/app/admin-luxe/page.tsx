'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';

export default function AdminLuxeLogin() {
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (credentials.login === 'anais' && credentials.password === 'Anais-Admin-2026!') {
        const token = btoa(JSON.stringify({
          id: 'admin-123',
          login: 'anais',
          role: 'super_admin',
          timestamp: Date.now()
        }));
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify({
          id: 'admin-123',
          email: 'contact@jayscreationsdesign.fr',
          login: 'anais',
          nom: 'Manne',
          prenom: 'Anais',
          role: 'super_admin'
        }));
        
        router.push('/admin-luxe/dashboard');
      } else {
        setError('Identifiants incorrects');
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
      background: 'linear-gradient(135deg, #f5f5f4 0%, #faf9f7 50%, #fef3e2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
          padding: '48px',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              borderRadius: '16px',
              marginBottom: '24px',
              boxShadow: '0 8px 16px rgba(139,69,19,0.2)'
            }}>
              <span style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>JD</span>
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '8px',
              lineHeight: '1.2'
            }}>
              Jay's Creations
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              marginBottom: '32px'
            }}>
              Espace Administrateur
            </p>
          </div>

          <div style={{
            backgroundColor: '#fef3e2',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '32px',
            border: '1px solid #fbbf24'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#92400e',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <Sparkles style={{ width: '20px', height: '20px', marginRight: '12px' }} />
              Bienvenue dans votre espace de gestion professionnelle
            </div>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Identifiant
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  paddingLeft: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <Mail style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                </div>
                <input
                  type="text"
                  required
                  value={credentials.login}
                  onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 52px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    backgroundColor: '#fafafa'
                  }}
                  placeholder="anais"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  paddingLeft: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <Lock style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '16px 52px 16px 52px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    backgroundColor: '#fafafa'
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: 0,
                  bottom: 0,
                    right: 0,
                    paddingRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                  ) : (
                    <Eye style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                backgroundColor: '#8B4513',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
                border: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(139,69,19,0.3)'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    animation: 'spin 1s linear infinite',
                    width: '20px',
                    height: '20px',
                    border: '2px solid #ffffff',
                    borderRightColor: 'transparent',
                    borderRadius: '50%',
                    marginRight: '12px'
                  }}></div>
                  Connexion en cours...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span>Se connecter</span>
                  <Sparkles style={{ width: '20px', height: '20px', marginLeft: '12px' }} />
                </div>
              )}
            </button>
          </form>

          <div style={{
            marginTop: '40px',
            padding: '24px',
            backgroundColor: '#f9fafb',
            borderRadius: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '16px'
            }}>
              Informations de connexion
            </h3>
            <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
              <p><strong>Identifiant :</strong> anais</p>
              <p><strong>Mot de passe :</strong> Anais-Admin-2026!</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '12px' }}>
                Ces identifiants sont temporaires. Vous pourrez les modifier dans les paramètres de sécurité.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link 
              href="/" 
              style={{
                color: '#8B4513',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7 7m-7-7h18M9 9l-3-3m0 0l3 3m-3-3h9" />
              </svg>
              Retour au site public
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
