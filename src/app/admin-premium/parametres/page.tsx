'use client';

import { useState, useEffect } from 'react';
import { Settings, Mail, Bell, Shield, Users, Crown, Save, Download, RefreshCw } from 'lucide-react';

export default function AdminPremiumParametres() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState('');

  const [emailSettings, setEmailSettings] = useState({
    expediteurGeneral: 'contact@jayscreationsdesign.fr',
    expediteurCommandes: 'commande@jayscreationsdesign.fr',
    notificationAdmin: 'contact@jayscreationsdesign.fr',
    notifications: {
      nouveauCompte: true,
      validationCommande: true,
      nouveauDevis: true,
      ruptureStock: true,
      paiementNonFinalise: true
    }
  });

  const [stockSettings, setStockSettings] = useState({
    seuilBas: 5,
    seuilCritique: 0,
    alerteAutomatique: true
  });

  const [userSettings, setUserSettings] = useState({
    admins: [
      { id: 1, nom: 'Manne', prenom: 'Anais', email: 'contact@jayscreationsdesign.fr', role: 'super_admin' }
    ]
  });

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSave = () => {
    setSavedMessage('Paramètres sauvegardés avec succès !');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #8B4513 50%, #D4A574 75%, #F5E6D3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '4px solid rgba(212,165,116,0.3)',
            borderTopColor: '#D4A574',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '32px'
          }}></div>
          <h2 style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            fontFamily: 'Georgia, serif'
          }}>
            Chargement de la configuration...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #8B4513 50%, #D4A574 75%, #F5E6D3 100%)',
      padding: '48px',
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <Settings style={{ width: '48px', height: '48px', color: '#D4A574', marginRight: '20px' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #D4A574 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif'
            }}>
              Configuration
            </h1>
            <Crown style={{ width: '48px', height: '48px', color: '#D4A574', marginLeft: '20px' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Gestion des paramètres de votre plateforme
          </p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            color: '#16a34a',
            padding: '16px 24px',
            borderRadius: '12px',
            marginBottom: '32px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            {savedMessage}
          </div>
        )}

        {/* Email Settings */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          border: '1px solid rgba(212,165,116,0.3)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Mail style={{ width: '32px', height: '32px', color: '#8B4513', marginRight: '16px' }} />
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#8B4513',
              fontFamily: 'Georgia, serif'
            }}>
              Configuration Emails
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '24px', marginBottom: '32px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#8B4513',
                marginBottom: '8px',
                fontFamily: 'Georgia, serif'
              }}>
                Adresse expéditeur générale
              </label>
              <input
                type="email"
                value={emailSettings.expediteurGeneral}
                onChange={(e) => setEmailSettings({...emailSettings, expediteurGeneral: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(212,165,116,0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  color: '#8B4513',
                  fontFamily: 'Georgia, serif',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#8B4513',
                marginBottom: '8px',
                fontFamily: 'Georgia, serif'
              }}>
                Adresse expéditeur commandes
              </label>
              <input
                type="email"
                value={emailSettings.expediteurCommandes}
                onChange={(e) => setEmailSettings({...emailSettings, expediteurCommandes: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(212,165,116,0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  color: '#8B4513',
                  fontFamily: 'Georgia, serif',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#8B4513',
                marginBottom: '8px',
                fontFamily: 'Georgia, serif'
              }}>
                Email notification admin
              </label>
              <input
                type="email"
                value={emailSettings.notificationAdmin}
                onChange={(e) => setEmailSettings({...emailSettings, notificationAdmin: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(212,165,116,0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  color: '#8B4513',
                  fontFamily: 'Georgia, serif',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#8B4513',
              marginBottom: '20px',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Bell style={{ width: '24px', height: '24px', color: '#8B4513', marginRight: '12px' }} />
              Notifications par email
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr)', gap: '16px' }}>
              {Object.entries(emailSettings.notifications).map(([key, value]) => (
                <label key={key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  background: 'rgba(212,165,116,0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212,165,116,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setEmailSettings({
                      ...emailSettings,
                      notifications: {
                        ...emailSettings.notifications,
                        [key]: e.target.checked
                      }
                    })}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '12px',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{
                    fontSize: '14px',
                    color: '#8B4513',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {key === 'nouveauCompte' ? 'Nouveau compte client' :
                     key === 'validationCommande' ? 'Validation commande' :
                     key === 'nouveauDevis' ? 'Nouveau devis' :
                     key === 'ruptureStock' ? 'Rupture de stock' :
                     key === 'paiementNonFinalise' ? 'Paiement non finalisé' : key}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Stock Settings */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          border: '1px solid rgba(212,165,116,0.3)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Shield style={{ width: '32px', height: '32px', color: '#8B4513', marginRight: '16px' }} />
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#8B4513',
              fontFamily: 'Georgia, serif'
            }}>
              Gestion des Stocks
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr)', gap: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#8B4513',
                marginBottom: '8px',
                fontFamily: 'Georgia, serif'
              }}>
                Seuil d'alerte stock bas
              </label>
              <input
                type="number"
                value={stockSettings.seuilBas}
                onChange={(e) => setStockSettings({...stockSettings, seuilBas: parseInt(e.target.value)})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(212,165,116,0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  color: '#8B4513',
                  fontFamily: 'Georgia, serif',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#8B4513',
                marginBottom: '8px',
                fontFamily: 'Georgia, serif'
              }}>
                Seuil critique (rupture)
              </label>
              <input
                type="number"
                value={stockSettings.seuilCritique}
                onChange={(e) => setStockSettings({...stockSettings, seuilCritique: parseInt(e.target.value)})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(212,165,116,0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  color: '#8B4513',
                  fontFamily: 'Georgia, serif',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '32px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={stockSettings.alerteAutomatique}
                  onChange={(e) => setStockSettings({...stockSettings, alerteAutomatique: e.target.checked})}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '12px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  fontSize: '16px',
                  color: '#8B4513',
                  fontFamily: 'Georgia, serif'
                }}>
                  Activer les alertes automatiques
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          border: '1px solid rgba(212,165,116,0.3)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Users style={{ width: '32px', height: '32px', color: '#8B4513', marginRight: '16px' }} />
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#8B4513',
                fontFamily: 'Georgia, serif'
              }}>
                Utilisateurs Administrateurs
              </h2>
            </div>
            <button style={{
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
              color: 'white',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Users style={{ width: '16px', height: '16px' }} />
              Ajouter un admin
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(212,165,116,0.3)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Nom</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Rôle</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#8B4513', fontWeight: '600', fontFamily: 'Georgia, serif' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userSettings.admins.map((admin, index) => (
                  <tr key={admin.id} style={{
                    borderBottom: '1px solid rgba(212,165,116,0.1)',
                    backgroundColor: index % 2 === 0 ? 'rgba(212,165,116,0.05)' : 'transparent'
                  }}>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#8B4513' }}>
                        {admin.prenom} {admin.nom}
                      </p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#666', fontFamily: 'Georgia, serif' }}>
                        {admin.email}
                      </p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: admin.role === 'super_admin' ? 'rgba(212,165,116,0.2)' : 'rgba(139,69,19,0.2)',
                        color: admin.role === 'super_admin' ? '#8B4513' : '#D4A574',
                        border: admin.role === 'super_admin' ? '1px solid rgba(212,165,116,0.3)' : '1px solid rgba(139,69,19,0.3)',
                        fontFamily: 'Georgia, serif',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        {admin.role === 'super_admin' && <Crown style={{ width: '12px', height: '12px' }} />}
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Administrateur'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          background: 'rgba(212,165,116,0.1)',
                          color: '#8B4513',
                          fontFamily: 'Georgia, serif'
                        }}>
                          Modifier
                        </button>
                        {admin.id !== 1 && (
                          <button style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            background: 'rgba(239,68,68,0.1)',
                            color: '#dc2626',
                            fontFamily: 'Georgia, serif'
                          }}>
                            Supprimer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '48px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '16px 32px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #8B4513 0%, #D4A574 100%)',
              color: 'white',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 24px rgba(139,69,19,0.4)',
              transition: 'all 0.3s'
            }}
          >
            <Save style={{ width: '20px', height: '20px' }} />
            Sauvegarder les paramètres
          </button>

          <button style={{
            padding: '16px 32px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            background: 'rgba(212,165,116,0.2)',
            color: '#8B4513',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Download style={{ width: '20px', height: '20px' }} />
            Exporter la configuration
          </button>

          <button style={{
            padding: '16px 32px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            background: 'rgba(107,114,128,0.2)',
            color: '#6b7280',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <RefreshCw style={{ width: '20px', height: '20px' }} />
            Réinitialiser par défaut
          </button>
        </div>
      </div>
    </div>
  );
}
