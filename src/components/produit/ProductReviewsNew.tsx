"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, ThumbsDown, CheckCircle, Search, ChevronDown, User } from "lucide-react";
import { type Product } from "@/data/products";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  verified_purchase: boolean;
  created_at: string;
  approved: boolean;
}

// Utilitaires pour les étoiles
function StarRow({ filled, size = 14, interactive = false, onRatingChange }: { 
  filled: number; 
  size?: number; 
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={`${
            i < Math.round(filled)
              ? "fill-[#8B4513] text-[#8B4513]"
              : "fill-transparent text-[#8B4513]"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
        />
      ))}
    </div>
  );
}

export default function ProductReviewsNew({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    customer_name: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Charger les avis et l'utilisateur
  useEffect(() => {
    loadReviews();
    loadUser();
  }, [product.id]);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Erreur chargement avis:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setNewReview(prev => ({
          ...prev,
          customer_name: user.user_metadata?.prenom || user.email?.split('@')[0] || ""
        }));
      }
    } catch (error) {
      console.error('Erreur chargement utilisateur:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newReview.comment.trim()) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: product.id,
          customer_name: newReview.customer_name,
          rating: newReview.rating,
          comment: newReview.comment,
          verified_purchase: true, // Pour l'instant, on considère tout comme vérifié
          approved: false // En attente de modération
        })
        .select()
        .single();

      if (error) throw error;

      // Réinitialiser le formulaire
      setNewReview({ rating: 5, comment: "", customer_name: newReview.customer_name });
      setShowForm(false);
      
      // Message de confirmation
      alert('Merci pour votre avis ! Il sera visible après validation.');
      
    } catch (error) {
      console.error('Erreur soumission avis:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculer la note moyenne
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  const ratingBreakdown = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length
  }));

  if (loading) {
    return (
      <section className="bg-[#FAF7F2] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513] mx-auto"></div>
          <p className="mt-2 text-[#6B6B6B]">Chargement des avis...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl text-[#2C2C2C] md:text-3xl">
          Avis clients
        </h2>

        {/* Résumé global */}
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">
          <div className="flex flex-col items-center gap-2 sm:min-w-[160px]">
            <span className="font-heading text-6xl font-bold text-[#2C2C2C]">
              {averageRating.toFixed(1)}
            </span>
            <StarRow filled={averageRating} />
            <span className="text-sm text-[#6B6B6B]">
              Basé sur {reviews.length} avis
            </span>
          </div>

          {/* Barres de répartition */}
          <div className="w-full max-w-md flex flex-col gap-2.5">
            {ratingBreakdown.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-8 shrink-0">
                  <span className="text-xs text-[#6B6B6B]">{stars}</span>
                  <Star size={11} className="fill-[#8B4513] text-[#8B4513]" />
                </div>
                <div className="flex-1 h-2 rounded-full bg-[#E8E4DF] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#8B4513]"
                    style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs text-[#6B6B6B] w-8 text-right shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Bouton rédiger */}
          <div className="sm:min-w-[160px] flex sm:justify-end items-start">
            {user ? (
              <button 
                onClick={() => setShowForm(!showForm)}
                className="rounded-full border-2 border-[#2C2C2C] px-5 py-2.5 text-sm font-medium text-[#2C2C2C] transition-colors hover:bg-[#2C2C2C] hover:text-white"
              >
                {showForm ? 'Annuler' : 'Rédiger un avis'}
              </button>
            ) : (
              <button 
                onClick={() => alert('Veuillez vous connecter pour laisser un avis')}
                className="rounded-full border-2 border-[#2C2C2C] px-5 py-2.5 text-sm font-medium text-[#2C2C2C] transition-colors hover:bg-[#2C2C2C] hover:text-white"
              >
                Se connecter pour avis
              </button>
            )}
          </div>
        </div>

        {/* Formulaire d'avis */}
        {showForm && user && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-[#E8E4DF]">
            <h3 className="text-lg font-bold text-[#2C2C2C] mb-4">Laisser un avis</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Note</label>
                <StarRow 
                  filled={newReview.rating} 
                  size={20}
                  interactive={true}
                  onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Nom</label>
                <input
                  type="text"
                  value={newReview.customer_name}
                  onChange={(e) => setNewReview(prev => ({ ...prev, customer_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#E8E4DF] rounded-lg focus:outline-none focus:border-[#8B4513]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Commentaire</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#E8E4DF] rounded-lg focus:outline-none focus:border-[#8B4513] min-h-[100px]"
                  placeholder="Partagez votre expérience..."
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#8B4513] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6B3410] disabled:opacity-50"
                >
                  {submitting ? 'Envoi...' : 'Envoyer l\'avis'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-[#E8E4DF] px-6 py-2 rounded-lg font-medium hover:bg-[#FAF7F2]"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des avis */}
        <div className="mt-8 flex flex-col divide-y divide-[#E8E4DF]">
          {reviews.map((review) => (
            <div key={review.id} className="py-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#E8E4DF] text-sm font-semibold text-[#8B4513]">
                  {review.customer_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-[#2C2C2C]">{review.customer_name}</span>
                    {review.verified_purchase && (
                      <span className="flex items-center gap-1 text-xs text-[#6B6B6B]">
                        <CheckCircle size={12} className="text-[#8B4513]" />
                        Acheteur vérifié
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <StarRow filled={review.rating} />
                    <span className="text-xs text-[#6B6B6B]">
                      {new Date(review.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">{review.comment}</p>
                  <p className="mt-2 text-xs text-[#6B6B6B]">
                    Produit évalué : <span className="font-medium">{product.name}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <p className="py-10 text-center text-sm text-[#6B6B6B]">
              Soyez le premier à donner votre avis !
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
