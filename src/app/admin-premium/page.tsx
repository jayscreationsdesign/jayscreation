'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Sparkles, Crown } from 'lucide-react';

export default function AdminPremiumLogin() {
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
        
        router.push('/admin-premium/dashboard');
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
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #8B4513 50%, #D4A574 75%, #F5E6D3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Georgia, serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139,69,19,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)'
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: '520px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,165,116,0.2)',
          padding: '64px',
          border: '1px solid rgba(212,165,116,0.3)',
          position: 'relative'
        }}>
          {/* Gold accent border */}
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '2px',
            bottom: '2px',
            borderRadius: '30px',
            border: '1px solid rgba(212,165,116,0.5)',
            pointerEvents: 'none',
            zIndex: -1
          }}></div>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              borderRadius: '24px',
              marginBottom: '24px',
              boxShadow: '0 20px 40px rgba(139,69,19,0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                transform: 'translateX(-100%)',
                animation: 'shimmer 3s infinite'
              }}></div>
              <Crown style={{ width: '40px', height: '40px', color: 'white', position: 'relative', zIndex: 1 }} />
            </div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 50%, #8B4513 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
              lineHeight: '1.2',
              fontFamily: 'Georgia, serif'
            }}>
              Jay's Creations
            </h1>
            <p style={{
              color: '#666',
              fontSize: '18px',
              marginBottom: '32px',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic'
            }}>
              Espace Administrateur Premium
            </p>
          </div>

          {/* Welcome Message */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,165,116,0.1) 0%, rgba(139,69,19,0.1) 100%)',
            padding: '24px',
            borderRadius: '20px',
            marginBottom: '32px',
            border: '1px solid rgba(212,165,116,0.3)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8B4513',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              <Sparkles style={{ width: '24px', height: '24px', marginRight: '12px', color: '#D4A574' }} />
              Bienvenue dans votre espace de gestion d'exception
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: '#dc2626',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '24px',
              fontSize: '16px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '12px',
                fontFamily: 'Georgia, serif'
              }}>
                Identifiant Administrateur
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20px',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <Mail style={{ width: '24px', height: '24px', color: '#D4A574' }} />
                </div>
                <input
                  type="text"
                  required
                  value={credentials.login}
                  onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '20px 20px 20px 60px',
                    border: '2px solid rgba(212,165,116,0.3)',
                    borderRadius: '16px',
                    fontSize: '18px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    fontFamily: 'Georgia, serif',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B4513';
                    e.target.style.boxShadow = '0 0 0 4px rgba(139,69,19,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212,165,116,0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="anais"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '12px',
                fontFamily: 'Georgia, serif'
              }}>
                Mot de Passe Sécurisé
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20px',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <Lock style={{ width: '24px', height: '24px', color: '#D4A574' }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '20px 60px 20px 60px',
                    border: '2px solid rgba(212,165,116,0.3)',
                    borderRadius: '16px',
                    fontSize: '18px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    fontFamily: 'Georgia, serif',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B4513';
                    e.target.style.boxShadow = '0 0 0 4px rgba(139,69,19,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212,165,116,0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '20px',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212,165,116,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: '24px', height: '24px', color: '#8B4513' }} />
                  ) : (
                    <Eye style={{ width: '24px', height: '24px', color: '#8B4513' }} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 50%, #8B4513 100%)',
                color: 'white',
                padding: '24px',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                border: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
                boxShadow: '0 8px 24px rgba(139,69,19,0.4)',
                fontFamily: 'Georgia, serif',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(139,69,19,0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,69,19,0.4)';
                }
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '16px'
                  }}></div>
                  Connexion en cours...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span>Accéder à l'Espace Premium</span>
                  <Crown style={{ width: '24px', height: '24px', marginLeft: '12px' }} />
                </div>
              )}
            </button>
          </form>

          {/* Login Info */}
          <div style={{
            marginTop: '48px',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(245,230,211,0.8) 0%, rgba(212,165,116,0.2) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(212,165,116,0.3)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#8B4513',
              marginBottom: '20px',
              textAlign: 'center',
              fontFamily: 'Georgia, serif'
            }}>
              Accès Administrateur
            </h3>
            <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8', fontFamily: 'Georgia, serif' }}>
              <p style={{ marginBottom: '8px' }}><strong>Identifiant :</strong> anais</p>
              <p style={{ marginBottom: '16px' }}><strong>Mot de passe :</strong> Anais-Admin-2026!</p>
              <p style={{ fontSize: '14px', color: '#8B4513', textAlign: 'center', fontStyle: 'italic' }}>
                Accès sécurisé à votre interface de gestion premium
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link 
              href="/" 
              style={{
                color: '#8B4513',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: 'Georgia, serif',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#D4A574';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#8B4513';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              <svg style={{ width: '18px', height: '18px', marginRight: '10px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7 7m-7-7h18M9 9l-3-3m0 0l3 3m-3-3h9" />
              </svg>
              Retour au site Jay's Creations
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
