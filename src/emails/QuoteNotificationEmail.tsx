import React from 'react';
import { Button, Heading, Text, Row, Column } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

interface QuoteNotificationEmailProps {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  quoteDetails: string;
}

export function QuoteNotificationEmail({ 
  customerName, 
  customerEmail, 
  customerPhone, 
  quoteDetails 
}: QuoteNotificationEmailProps) {
  return (
    <EmailLayout preview={`🔔 Nouvelle demande de devis`}>
      <Heading style={{ color: '#333333', fontSize: '28px', fontFamily: 'Playfair Display, serif' }}>
        🔔 Nouvelle demande de devis
      </Heading>
      
      {/* Info client */}
      <div style={{ 
        backgroundColor: '#F8F8F8', 
        padding: '16px', 
        borderRadius: '8px', 
        marginTop: '16px' 
      }}>
        <Text style={{ color: '#333333', fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0' }}>
          Informations client :
        </Text>
        <Text style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>
          <strong>Nom :</strong> {customerName}
        </Text>
        <Text style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>
          <strong>Email :</strong> {customerEmail}
        </Text>
        {customerPhone && (
          <Text style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>
            <strong>Téléphone :</strong> {customerPhone}
          </Text>
        )}
      </div>

      {/* Bloc détails de la demande */}
      <div style={{ 
        backgroundColor: '#F0F0F0', 
        padding: '20px', 
        borderRadius: '8px', 
        marginTop: '24px',
        border: '1px solid #E0E0E0'
      }}>
        <Text style={{ color: '#333333', fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0' }}>
          Détails de la demande :
        </Text>
        <Text style={{ color: '#666666', fontSize: '14px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
          {quoteDetails}
        </Text>
      </div>

      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6', marginTop: '24px' }}>
        Cette demande nécessite une réponse sous 24 à 48h selon nos standards de service.
      </Text>

      {/* Bouton pour répondre au client */}
      <Row style={{ marginTop: '32px', textAlign: 'center' }}>
        <Column>
          <Button
            href={`mailto:${customerEmail}?subject=Re: Demande de devis - Jay's Creations Design`}
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
            Répondre au client →
          </Button>
        </Column>
      </Row>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '24px' }}>
        Pensez à consulter le dossier des devis pour suivre cette demande.
      </Text>
    </EmailLayout>
  );
}

export default QuoteNotificationEmail;
