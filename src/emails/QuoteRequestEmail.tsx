import React from 'react';
import { Button, Heading, Text, Row, Column } from '@react-email/components';
import EmailLayout from './EmailLayout';

interface QuoteRequestEmailProps {
  prenom: string;
  quoteDetails: string;
}

export function QuoteRequestEmail({ prenom, quoteDetails }: QuoteRequestEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreationsdesign.fr';

  return (
    <EmailLayout preview={`Demande de devis reçue ✨`}>
      <Heading style={{ color: '#333333', fontSize: '28px', fontFamily: 'Playfair Display, serif' }}>
        Demande de devis reçue ✨
      </Heading>
      
      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
        Merci {prenom}, nous avons bien reçu votre demande.
      </Text>

      {/* Bloc détails du devis */}
      <div style={{ 
        backgroundColor: '#F0F0F0', 
        padding: '20px', 
        borderRadius: '8px', 
        marginTop: '24px',
        border: '1px solid #E0E0E0'
      }}>
        <Text style={{ color: '#333333', fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0' }}>
          Détails de votre demande :
        </Text>
        <Text style={{ color: '#666666', fontSize: '14px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
          {quoteDetails}
        </Text>
      </div>

      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6', marginTop: '24px' }}>
        Notre équipe reviendra vers vous sous 24 à 48h pour étudier votre projet et vous proposer un devis personnalisé.
      </Text>

      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6', marginTop: '16px' }}>
        N'hésitez pas à nous contacter si vous avez des questions entre-temps.
      </Text>

      {/* Bouton CTA */}
      <Row style={{ marginTop: '32px', textAlign: 'center' }}>
        <Column>
          <Button
            href={`${siteUrl}/boutique`}
            style={{
              backgroundColor: '#C8A96E',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Voir nos créations →
          </Button>
        </Column>
      </Row>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '24px', fontStyle: 'italic' }}>
        Une question ? Répondez directement à cet email ou appelez-nous au 07 49 07 28 61.
      </Text>
    </EmailLayout>
  );
}

export default QuoteRequestEmail;
