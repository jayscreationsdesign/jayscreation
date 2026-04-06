'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import JaysClubHero from '@/components/loyalty/JaysClubHero';
import HowItWorks from '@/components/loyalty/HowItWorks';
import LoyaltyTabs from '@/components/loyalty/LoyaltyTabs';
import TierCard from '@/components/loyalty/TierCard';
import RewardCard from '@/components/loyalty/RewardCard';
import EarnPointCard from '@/components/loyalty/EarnPointCard';
import Testimonials from '@/components/loyalty/Testimonials';
import LoyaltyFaq from '@/components/loyalty/LoyaltyFaq';
import LoyaltyCtaFooter from '@/components/loyalty/LoyaltyCtaFooter';
import { COLORS, FONTS, TIERS, REWARDS, EARN_METHODS } from '@/components/loyalty/constants';

type TabType = 'tiers' | 'rewards' | 'earn';

export default function JaysClubClient() {
  const [user, setUser] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [userTier, setUserTier] = useState<keyof typeof TIERS>('petale');
  const [totalEarned, setTotalEarned] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('tiers');
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    checkUser();
    loadLoyaltyData();
  }, []);
  
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };
  
  const loadLoyaltyData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Charger les points
        const pointsResponse = await fetch('/api/loyalty/points');
        if (pointsResponse.ok) {
          const pointsData = await pointsResponse.json();
          setUserPoints(pointsData.points);
          setUserTier(pointsData.tier);
          setTotalEarned(pointsData.total_earned);
        }
      }
    } catch (error) {
      console.error('Erreur chargement données fidélité:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRedeemReward = async (rewardId: string) => {
    if (isRedeeming) return;
    
    setIsRedeeming(rewardId);
    try {
      const response = await fetch('/api/loyalty/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rewardId }),
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Modal élégante
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center" style="border: 2px solid ${COLORS.gold}">
            <div class="text-5xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold mb-4" style="font-family: ${FONTS.playfair}; color: ${COLORS.chocolat}">
              Félicitations !
            </h3>
            <p class="text-gray-600 mb-6">
              Votre récompense a été échangée avec succès
            </p>
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <p class="text-sm text-gray-500 mb-1">Votre code de réduction :</p>
              <p class="text-xl font-bold" style="color: ${COLORS.gold}">${result.couponCode}</p>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="px-6 py-3 rounded-full text-white font-medium transition-colors hover:opacity-90" style="background-color: ${COLORS.gold}">
              Super !
            </button>
          </div>
        `;
        document.body.appendChild(modal);
        
        loadLoyaltyData(); // Recharger les données
      } else {
        const error = await response.json();
        
        // Modal d'erreur
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center" style="border: 2px solid #ef4444">
            <div class="text-5xl mb-4">😞</div>
            <h3 class="text-2xl font-bold mb-4" style="font-family: ${FONTS.playfair}; color: #ef4444">
              Oups...
            </h3>
            <p class="text-gray-600 mb-6">
              ${error.error || 'Une erreur est survenue lors de l\'échange'}
            </p>
            <button onclick="this.closest('.fixed').remove()" class="px-6 py-3 rounded-full text-white font-medium transition-colors hover:opacity-90" style="background-color: #ef4444">
              Fermer
            </button>
          </div>
        `;
        document.body.appendChild(modal);
      }
    } catch (error) {
      console.error('Erreur échange récompense:', error);
    } finally {
      setIsRedeeming(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A96E] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl font-medium mb-2" style={{ color: COLORS.chocolat }}>Chargement de votre espace...</p>
          <p className="text-sm text-gray-600">Préparation de votre Jay's Club</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a 
                href="/"
                className="text-2xl font-bold flex items-center gap-2"
                style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
              >
                <span className="text-3xl">🌸</span>
                Jay's Creations Design
              </a>
              <div className="hidden md:flex items-center gap-6">
                <a href="/boutique" className="text-gray-600 hover:text-[#3C2415] transition-colors font-medium">
                  Boutique
                </a>
                <a href="/compte" className="text-gray-600 hover:text-[#3C2415] transition-colors font-medium">
                  Mon compte
                </a>
              </div>
            </div>
            
            {/* Badge de statut si connecté */}
            {user && (
              <div className="flex items-center gap-3">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                    color: COLORS.white
                  }}
                >
                  {userPoints} pts
                </span>
                <span className="text-sm text-gray-600">
                  {TIERS[userTier].icon} {TIERS[userTier].name}
                </span>
              </div>
            )}
          </nav>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <JaysClubHero 
          userPoints={userPoints}
          userTier={userTier}
          totalEarned={totalEarned}
          isLoggedIn={!!user}
        />
        
        {/* Comment ça marche */}
        <HowItWorks />
        
        {/* Onglets */}
        <div className="flex justify-center mb-8">
          <LoyaltyTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* Contenu des onglets */}
        <div className="mb-12">
          {activeTab === 'tiers' && (
            <div>
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {(Object.keys(TIERS) as Array<keyof typeof TIERS>).map((tier) => (
                  <TierCard
                    key={tier}
                    tier={tier}
                    isActive={tier === userTier}
                    onClick={() => setActiveTab('tiers')}
                  />
                ))}
              </div>
              
              {/* Astuce */}
              <div className="max-w-2xl mx-auto">
                <div 
                  className="p-4 rounded-xl text-center"
                  style={{
                    backgroundColor: `${COLORS.gold}15`,
                    border: `1px solid ${COLORS.gold}40`
                  }}
                >
                  <p className="text-sm">
                    <span style={{ color: COLORS.gold }}>💡</span>
                    <strong style={{ color: COLORS.chocolat }}> Astuce :</strong> 
                    Avec le niveau Diamant, une commande de 50€ vous rapporte 
                    <strong style={{ color: COLORS.gold }}> 100 points </strong>
                    au lieu de 50.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'rewards' && (
            <div className="max-w-3xl mx-auto space-y-4">
              {REWARDS.map((reward: any) => (
                <RewardCard
                  key={reward.id}
                  rewardId={reward.id}
                  userPoints={userPoints}
                  onRedeem={handleRedeemReward}
                  isRedeeming={isRedeeming === reward.id}
                />
              ))}
            </div>
          )}
          
          {activeTab === 'earn' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {EARN_METHODS.map((method: any, index: number) => (
                <EarnPointCard key={index} method={method} index={index} />
              ))}
            </div>
          )}
        </div>
        
        {/* Témoignages */}
        <Testimonials />
        
        {/* FAQ */}
        <LoyaltyFaq />
        
        {/* CTA final si non connecté */}
        {!user && <LoyaltyCtaFooter />}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-16" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <span 
                className="text-lg font-medium"
                style={{ fontFamily: FONTS.playfair, color: COLORS.chocolat }}
              >
                Jay's Club
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="/cgv" className="hover:text-[#3C2415] transition-colors">CGV</a>
              <a href="/mentions-legales" className="hover:text-[#3C2415] transition-colors">Mentions légales</a>
              <a href="/contact" className="hover:text-[#3C2415] transition-colors">Contact</a>
            </div>
            
            <div className="text-sm text-gray-600">
              Programme de fidélité Jay's Creations Design © 2024
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
