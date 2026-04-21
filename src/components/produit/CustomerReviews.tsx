"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface CustomerReviewsProps {
  product?: any;
}

export default function CustomerReviews({ product }: CustomerReviewsProps) {
  const [activeTab, setActiveTab] = useState<"reviews" | "write" | "all">("reviews");

  // Données d'exemple pour les avis
  const reviews = [
    {
      id: 1,
      name: "Sophie L.",
      rating: 5,
      date: "15 mars 2024",
      text: "Excellent kit de papeterie ! Très complet et facile à personnaliser. Les fichiers sont de grande qualité et le service client est très réactif."
    },
    {
      id: 2,
      name: "Marie D.",
      rating: 4,
      date: "8 mars 2024",
      text: "Très satisfait de ma commande. La personnalisation est magnifique et les délais ont été respectés. Je recommande vivement !"
    },
    {
      id: 3,
      name: "Julie M.",
      rating: 5,
      date: "2 mars 2024",
      text: "Parfait pour l'anniversaire de ma fille ! Les designs sont adorables et la qualité d'impression est excellente. Merci beaucoup !"
    },
    {
      id: 4,
      name: "Camille R.",
      rating: 5,
      date: "25 février 2024",
      text: "Superbe kit ! Tout était personnalisé selon mes souhaits. La communication avec le designer était très agréable. Je referai appel à eux sans hésiter."
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 72 },
    { stars: 4, count: 22, percentage: 18 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 }
  ];

  const averageRating = 4.9;
  const totalReviews = 124;

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-center text-xl font-semibold mb-8"
          style={{ color: '#3C2415' }}
        >
          Avis clients
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Colonne gauche : Note globale */}
          <div className="lg:col-span-1">
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#FAF7F2', border: '1px solid #D4A574' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: '#3C2415' }}>
                {averageRating}
              </div>
              
              {/* Étoiles */}
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    className={star <= Math.floor(averageRating) ? "fill-current" : ""}
                    style={{ color: '#C8A96E' }}
                  />
                ))}
              </div>
              
              <div className="text-sm mb-4" style={{ color: '#8B4513' }}>
                {totalReviews} avis
              </div>
              
              {/* Barres de progression */}
              <div className="space-y-2">
                {ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: '#8B4513' }}>{rating.stars}</span>
                    <Star size={12} style={{ color: '#C8A96E' }} />
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8E0D0' }}>
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${rating.percentage}%`,
                          backgroundColor: '#C8A96E'
                        }}
                      />
                    </div>
                    <span className="text-xs" style={{ color: '#8B4513' }}>{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Colonne droite : Grille d'avis */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reviews.map((review) => (
                <div 
                  key={review.id}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#FAF7F2', border: '1px solid #D4A574' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm" style={{ color: '#3C2415' }}>
                      {review.name}
                    </span>
                    <span className="text-xs" style={{ color: '#8B4513' }}>
                      {review.date}
                    </span>
                  </div>
                  
                  {/* Étoiles */}
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={12} 
                        className={star <= review.rating ? "fill-current" : ""}
                        style={{ color: '#C8A96E' }}
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm leading-relaxed" style={{ color: '#8B4513' }}>
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="px-6 py-2 text-sm font-medium rounded transition-all hover:opacity-90"
                style={{ 
                  border: '1px solid #D4A574', 
                  color: '#8B4513',
                  backgroundColor: 'white'
                }}
              >
                Voir tous les avis
              </button>
              
              <button 
                className="px-6 py-2 text-sm font-medium rounded transition-all hover:opacity-90"
                style={{ 
                  border: '1px solid #C8A96E', 
                  color: '#C8A96E',
                  backgroundColor: 'white'
                }}
              >
                Laisser un avis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
