import React from 'react';
import { Button, Heading, Text, Row, Column } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

interface WelcomeEmailProps {
  prenom: string;
  email: string;
}

export function WelcomeEmail({ prenom, email }: WelcomeEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreationsdesign.fr';

  return (
    <EmailLayout preview={`Bienvenue ${prenom} ✨`}>
      <Heading style={{ color: '#333333', fontSize: '28px', fontFamily: 'Playfair Display, serif' }}>
        Bienvenue {prenom} ✨
      </Heading>
      
      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
        Merci de rejoindre la famille Jay's Creations Design ! Votre compte a été créé avec succès.
      </Text>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '16px' }}>
        <strong>Email du compte :</strong> {email}
      </Text>

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
            Découvrir la boutique →
          </Button>
        </Column>
      </Row>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '24px', fontStyle: 'italic' }}>
        Une question ? Répondez directement à cet email.
      </Text>
    </EmailLayout>
  );
}

export default WelcomeEmail;
