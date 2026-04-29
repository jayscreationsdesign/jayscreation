'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      // If consent was previously given, dispatch event to load analytics
      if (consent === 'accepted') {
        window.dispatchEvent(new CustomEvent('consentGiven'));
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
    // Dispatch event to load analytics
    window.dispatchEvent(new CustomEvent('consentGiven'));
  };

  const handleRefuse = () => {
    localStorage.setItem('cookie_consent', 'refused');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FAF7F2] border-t-2 border-[#C8A96E] z-[9999] animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Text content */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-inter text-[#3C2415] mb-2">
              Nous utilisons des cookies pour analyser notre trafic et améliorer votre expérience.
            </p>
            <a 
              href="/politique-de-confidentialite" 
              className="text-sm text-[#C8A96E] underline hover:text-[#8B4513] transition-colors"
            >
              En savoir plus
            </a>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-[#C8A96E] text-[#FAF7F2] rounded-lg font-inter text-sm font-medium hover:bg-[#8B4513] transition-colors order-2 sm:order-1"
            >
              Accepter
            </button>
            <button
              onClick={handleRefuse}
              className="px-6 py-2 bg-transparent border border-[#C8A96E] text-[#3C2415] rounded-lg font-inter text-sm font-medium hover:bg-[#FAF7F2] transition-colors order-1 sm:order-2"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}
