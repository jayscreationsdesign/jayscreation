import React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { Button, Text } from '@react-email/components';

interface QuoteRequestEmailProps {
  prenom: string;
  quoteDetails: string;
}

export function QuoteRequestEmail({ prenom, quoteDetails }: QuoteRequestEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreationsdesign.fr';

  return (
    <EmailLayout preview="Votre demande de devis a bien été reçue ✨">
      <Text style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '0 0 16px 0' }}>
        Demande de devis reçue ✨
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Bonjour {prenom},
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Nous avons bien reçu votre demande de devis et nous vous en remercions !
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Voici un récapitulatif de votre demande :
      </Text>
      
      <div style={{
        backgroundColor: '#F5F3EF',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
        fontFamily: 'Inter, sans-serif',
        color: '#333333',
        whiteSpace: 'pre-wrap'
      }}>
        {quoteDetails}
      </div>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Notre équipe étudie votre demande avec attention. Nous reviendrons vers vous sous 24 à 48 heures avec une proposition personnalisée.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Chez Jay's Creations Design, chaque projet est unique. Nous prendrons le temps de créer quelque chose qui vous ressemble, avec des finitions soignées et un design sur-mesure.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 32px 0' }}>
        En attendant, n'hésitez pas à parcourir nos collections pour découvrir d'autres inspirations.
      </Text>
      
      <Button
        href={`${siteUrl}/boutique`}
        style={{
          backgroundColor: '#C8A96E',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          display: 'inline-block'
        }}
      >
        Voir nos créations →
      </Button>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '32px 0 0 0' }}>
        À très vite,<br />
        L'équipe Jay's Creations Design
      </Text>
    </EmailLayout>
  );
}

export default QuoteRequestEmail;
