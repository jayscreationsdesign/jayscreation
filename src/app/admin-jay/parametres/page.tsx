'use client';

import { useState, useEffect } from 'react';
import { Settings, Mail, Bell, Shield, Users, Save, Download, RefreshCw, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';

export default function AdminJayParametres() {
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

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: 'admin'
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

  const handleAddAdmin = () => {
    if (newAdmin.nom && newAdmin.prenom && newAdmin.email) {
      const newAdminData = {
        id: userSettings.admins.length + 1,
        ...newAdmin
      };
      setUserSettings({
        ...userSettings,
        admins: [...userSettings.admins, newAdminData]
      });
      setNewAdmin({ nom: '', prenom: '', email: '', role: 'admin' });
      setShowAddAdmin(false);
    }
  };

  const handleDeleteAdmin = (id: number) => {
    if (id !== 1) {
      setUserSettings({
        ...userSettings,
        admins: userSettings.admins.filter(admin => admin.id !== id)
      });
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e2e8f0',
            borderTopColor: '#6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '24px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '500' }}>
            Chargement de la configuration...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Paramètres
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Gestion des paramètres de votre plateforme
          </p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div style={{
            backgroundColor: '#dcfce7',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            padding: '16px 24px',
            borderRadius: '8px',
            marginBottom: '24px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            {savedMessage}
          </div>
        )}

        {/* Email Settings */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Mail style={{ width: '24px', height: '24px', color: '#6366f1', marginRight: '12px' }} />
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Configuration Emails
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Adresse expéditeur générale
              </label>
              <input
                type="email"
                value={emailSettings.expediteurGeneral}
                onChange={(e) => setEmailSettings({...emailSettings, expediteurGeneral: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  outline: 'none'
                }}
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
                Adresse expéditeur commandes
              </label>
              <input
                type="email"
                value={emailSettings.expediteurCommandes}
                onChange={(e) => setEmailSettings({...emailSettings, expediteurCommandes: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  outline: 'none'
                }}
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
                Email notification admin
              </label>
              <input
                type="email"
                value={emailSettings.notificationAdmin}
                onChange={(e) => setEmailSettings({...emailSettings, notificationAdmin: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Bell style={{ width: '20px', height: '20px', color: '#6366f1', marginRight: '8px' }} />
              Notifications par email
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr)', gap: '16px' }}>
              {Object.entries(emailSettings.notifications).map(([key, value]) => (
                <label key={key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
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
                      width: '16px',
                      height: '16px',
                      marginRight: '12px',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {key === 'nouveauCompte' ? 'Email admin lors de la création d\'un compte client' :
                     key === 'validationCommande' ? 'Email admin lors de la validation d\'une commande' :
                     key === 'nouveauDevis' ? 'Email admin lors d\'une nouvelle demande de devis' :
                     key === 'ruptureStock' ? 'Email admin lors d\'une rupture de stock ou stock bas' :
                     key === 'paiementNonFinalise' ? 'Email admin lors d\'un paiement non finalisé / commande abandonnée' : key}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Stock Settings */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Shield style={{ width: '24px', height: '24px', color: '#6366f1', marginRight: '12px' }} />
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Gestion des Stocks
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr)', gap: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Seuil d'alerte stock bas
              </label>
              <input
                type="number"
                value={stockSettings.seuilBas}
                onChange={(e) => setStockSettings({...stockSettings, seuilBas: parseInt(e.target.value)})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  outline: 'none'
                }}
              />
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Alertes envoyées quand le stock atteint ce niveau
              </p>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Seuil critique (rupture)
              </label>
              <input
                type="number"
                value={stockSettings.seuilCritique}
                onChange={(e) => setStockSettings({...stockSettings, seuilCritique: parseInt(e.target.value)})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  outline: 'none'
                }}
              />
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Niveau de stock considéré comme rupture
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
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
                    width: '16px',
                    height: '16px',
                    marginRight: '12px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  Activer les alertes automatiques
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Users style={{ width: '24px', height: '24px', color: '#6366f1', marginRight: '12px' }} />
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1e293b'
              }}>
                Utilisateurs Administrateurs
              </h2>
            </div>
            <button
              onClick={() => setShowAddAdmin(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Ajouter un admin
            </button>
          </div>

          {/* Add Admin Form */}
          {showAddAdmin && (
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                Ajouter un nouvel administrateur
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Nom"
                  value={newAdmin.nom}
                  onChange={(e) => setNewAdmin({...newAdmin, nom: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  value={newAdmin.prenom}
                  onChange={(e) => setNewAdmin({...newAdmin, prenom: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                />
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                >
                  <option value="admin">Administrateur</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAddAdmin}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: '#10b981',
                    color: 'white'
                  }}
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setShowAddAdmin(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: '#6b7280',
                    color: 'white'
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Admins Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Nom</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Rôle</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userSettings.admins.map((admin, index) => (
                  <tr key={admin.id} style={{
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                  }}>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                        {admin.prenom} {admin.nom}
                      </p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '14px', color: '#64748b' }}>
                        {admin.email}
                      </p>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: admin.role === 'super_admin' ? '#dbeafe' : '#f3f4f6',
                        color: admin.role === 'super_admin' ? '#1e40af' : '#6b7280',
                        border: admin.role === 'super_admin' ? '1px solid #bfdbfe' : '1px solid #e5e7eb'
                      }}>
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Administrateur'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: '#f3f4f6',
                          color: '#374151'
                        }}>
                          <Edit style={{ width: '14px', height: '14px' }} />
                        </button>
                        {admin.id !== 1 && (
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '500',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: '#fee2e2',
                              color: '#dc2626'
                            }}
                          >
                            <Trash2 style={{ width: '14px', height: '14px' }} />
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
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
          >
            <Save style={{ width: '20px', height: '20px' }} />
            Sauvegarder les paramètres
          </button>

          <button style={{
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Download style={{ width: '20px', height: '20px' }} />
            Exporter la configuration
          </button>

          <button style={{
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
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
