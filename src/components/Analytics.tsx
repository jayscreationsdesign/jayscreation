'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

interface AnalyticsProps {
  gaId?: string;
}

export default function Analytics({ gaId = process.env.NEXT_PUBLIC_GA_ID }: AnalyticsProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if consent was already given
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'accepted') {
      setHasConsent(true);
    }

    // Listen for consent event
    const handleConsentGiven = () => {
      setHasConsent(true);
    };

    window.addEventListener('consentGiven', handleConsentGiven);
    
    return () => {
      window.removeEventListener('consentGiven', handleConsentGiven);
    };
  }, []);

  // Don't render anything on server or without GA ID
  if (!isClient || !gaId || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
            // Set consent mode for GDPR compliance
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
            gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
          `,
        }}
      />
    </>
  );
}
