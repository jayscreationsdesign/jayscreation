"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

interface AvisTabProps {
  showOnMobile?: boolean; // Afficher sur mobile
  className?: string;
}

interface Avis {
  id: number;
  auteur: string;
  note: number;
  date: string;
  commentaire: string;
  verified: boolean;
}

export default function AvisTab({ 
  showOnMobile = false,
  className = "" 
}: AvisTabProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Données d'exemple pour les avis
  const avis: Avis[] = [
    {
      id: 1,
      auteur: "Marie L.",
      note: 5,
      date: "15 mars 2024",
      commentaire: "Produit magnifique ! Qualité impeccable et livraison rapide. Je recommande vivement !",
      verified: true
    },
    {
      id: 2,
      auteur: "Thomas B.",
      note: 4,
      date: "2 mars 2024",
      commentaire: "Très beau produit, correspond parfaitement à la description. Un peu cher mais qualité au rendez-vous.",
      verified: true
    },
    {
      id: 3,
      auteur: "Sophie M.",
      note: 5,
      date: "18 février 2024",
      commentaire: "J'adore ! C'est exactement ce que je cherchais. Le packaging est superbe et le produit est sublime.",
      verified: true
    },
    {
      id: 4,
      auteur: "Lucas D.",
      note: 4,
      date: "5 février 2024",
      commentaire: "Bon produit, belle finition. Délai de livraison un peu long mais ça en vaut la peine.",
      verified: false
    }
  ];

  const handleClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderStars = (note: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= note ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const noteMoyenne = avis.reduce((sum, a) => sum + a.note, 0) / avis.length;

  return (
    <>
      {/* CSS intégré */}
      <style jsx>{`
        .avis-tab {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center center;
          background: linear-gradient(135deg, #3C2415, #8B4513);
          color: #FAF7F2;
          padding: 12px 24px;
          border-radius: 25px;
          box-shadow: 2px 4px 15px rgba(60, 36, 21, 0.3);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          text-align: center;
          letter-spacing: 2px;
          z-index: 9999;
          transition: all 0.3s ease;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
          border: none;
          outline: none;
        }

        .avis-tab:hover {
          background: linear-gradient(135deg, #8B4513, #C8A96E);
          transform: translateY(-50%) rotate(-90deg) translateX(5px);
          box-shadow: 4px 6px 20px rgba(139, 69, 19, 0.4);
        }

        .avis-tab-text {
          display: block;
          font-size: 12px;
        }

        .avis-tab-etoiles {
          display: flex;
          gap: 2px;
          font-size: 10px;
          color: #FAF7F2;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-body {
          padding: 24px;
        }

        .avis-summary {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          padding: 20px;
          background: #FAF7F2;
          border: 1px solid #D4A574;
          border-radius: 12px;
        }

        .avis-note-moyenne {
          text-align: center;
        }

        .avis-note-chiffre {
          font-size: 32px;
          font-weight: 700;
          color: #3C2415;
        }

        .avis-note-texte {
          font-size: 14px;
          color: #8B4513;
        }

        .avis-repartition {
          flex: 1;
        }

        .avis-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .avis-bar-label {
          font-size: 12px;
          color: #666;
          width: 40px;
        }

        .avis-bar-container {
          flex: 1;
          height: 8px;
          background: #E8E8E8;
          border-radius: 4px;
          overflow: hidden;
        }

        .avis-bar-fill {
          height: 100%;
          background: #C8A96E;
          transition: width 0.3s ease;
        }

        .avis-bar-count {
          font-size: 12px;
          color: #666;
          width: 30px;
          text-align: right;
        }

        .avis-item {
          padding: 16px;
          border: 1px solid #D4A574;
          border-radius: 8px;
          margin-bottom: 12px;
          background: white;
        }

        .avis-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .avis-auteur {
          font-weight: 600;
          color: #3C2415;
        }

        .avis-date {
          font-size: 12px;
          color: #8B4513;
        }

        .avis-commentaire {
          color: #3C2415;
          line-height: 1.5;
          margin-top: 8px;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #EAF5E9;
          color: #2d7d2d;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          ${!showOnMobile ? `.avis-tab { display: none; }` : `
            .avis-tab {
              left: 10px;
              top: auto;
              bottom: 80px;
              transform: none;
              padding: 8px 16px;
              font-size: 12px;
              border-radius: 20px;
            }
            
            .avis-tab:hover {
              transform: translateX(3px);
            }
          `}

          .modal-overlay {
            padding: 10px;
          }

          .modal-content {
            max-height: 90vh;
          }

          .avis-summary {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>

      {/* Onglet AVIS */}
      <button 
        className={`avis-tab ${className}`}
        onClick={handleClick}
        aria-label="Voir les avis clients"
      >
        <span className="avis-tab-text">AVIS</span>
        <div className="avis-tab-etoiles">
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} />
        </div>
      </button>

      {/* Modal des avis */}
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header du modal */}
            <div className="modal-header">
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#333', margin: 0 }}>
                  Avis clients
                </h2>
                <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0 0' }}>
                  {avis.length} avis
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} color="#666" />
              </button>
            </div>

            {/* Body du modal */}
            <div className="modal-body">
              {/* Résumé des avis */}
              <div className="avis-summary">
                <div className="avis-note-moyenne">
                  <div className="avis-note-chiffre">{noteMoyenne.toFixed(1)}</div>
                  <div className="avis-note-texte">sur 5</div>
                  {renderStars(Math.round(noteMoyenne))}
                </div>
                
                <div className="avis-repartition">
                  {[5, 4, 3, 2, 1].map((note) => {
                    const count = avis.filter(a => a.note === note).length;
                    const percentage = (count / avis.length) * 100;
                    return (
                      <div key={note} className="avis-bar">
                        <div className="avis-bar-label">{note} stars</div>
                        <div className="avis-bar-container">
                          <div 
                            className="avis-bar-fill" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="avis-bar-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Liste des avis */}
              <div>
                {avis.map((avi) => (
                  <div key={avi.id} className="avis-item">
                    <div className="avis-header">
                      <div>
                        <div className="avis-auteur">{avi.auteur}</div>
                        <div className="avis-date">{avi.date}</div>
                        {renderStars(avi.note)}
                      </div>
                    </div>
                    <div className="avis-commentaire">{avi.commentaire}</div>
                    {avi.verified && (
                      <div className="verified-badge">
                        <span>â</span> Achat vérifié
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
