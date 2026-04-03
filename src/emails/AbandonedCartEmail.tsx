import React from 'react';
import { Button, Heading, Text, Row, Column, Table, Td, Tr } from '@react-email/components';
import EmailLayout from './EmailLayout';

interface CartItem {
  name: string;
  price: number;
  image?: string;
}

interface AbandonedCartEmailProps {
  prenom: string;
  items: CartItem[];
  cartUrl: string;
}

export function AbandonedCartEmail({ prenom, items, cartUrl }: AbandonedCartEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreationsdesign.fr';

  // Calculer le total
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <EmailLayout preview={`Vous avez oublié quelque chose ? 🛒`}>
      <Heading style={{ color: '#333333', fontSize: '28px', fontFamily: 'Playfair Display, serif' }}>
        Vous avez oublié quelque chose ? 🛒
      </Heading>
      
      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
        Bonjour {prenom}, il semblerait que vous n'ayez pas finalisé votre commande.
      </Text>

      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6', marginTop: '16px' }}>
        Votre panier contient les magnifiques créations suivantes :
      </Text>

      {/* Liste des articles */}
      <Table style={{ width: '100%', marginTop: '24px', borderCollapse: 'collapse' }}>
        {items.map((item, index) => (
          <Tr key={index} style={{ borderBottom: '1px solid #EEEEEE' }}>
            <Td style={{ padding: '12px 0', verticalAlign: 'top' }}>
              <Text style={{ color: '#333333', fontSize: '14px', fontWeight: '600' }}>
                {item.name}
              </Text>
            </Td>
            <Td style={{ padding: '12px 0', textAlign: 'right', verticalAlign: 'top' }}>
              <Text style={{ color: '#333333', fontSize: '14px' }}>
                {item.price.toFixed(2)} €
              </Text>
            </Td>
          </Tr>
        ))}
        <Tr>
          <Td style={{ padding: '16px 0 0 0', verticalAlign: 'top' }}>
            <Text style={{ color: '#333333', fontSize: '16px', fontWeight: 'bold' }}>
              Total
            </Text>
          </Td>
          <Td style={{ padding: '16px 0 0 0', textAlign: 'right', verticalAlign: 'top' }}>
            <Text style={{ color: '#333333', fontSize: '16px', fontWeight: 'bold' }}>
              {total.toFixed(2)} €
            </Text>
          </Td>
        </Tr>
      </Table>

      {/* Message d'urgence */}
      <div style={{ 
        backgroundColor: '#FFF3CD', 
        border: '1px solid #FFC107',
        padding: '16px', 
        borderRadius: '8px', 
        marginTop: '24px'
      }}>
        <Text style={{ color: '#856404', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>
          ⏰ Ne tardez pas trop !
        </Text>
        <Text style={{ color: '#856404', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          Ce lien expire dans 48h. Après ce délai, votre panier pourrait être vidé automatiquement.
        </Text>
      </div>

      {/* Bouton CTA principal */}
      <Row style={{ marginTop: '32px', textAlign: 'center' }}>
        <Column>
          <Button
            href={cartUrl}
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
            Finaliser ma commande →
          </Button>
        </Column>
      </Row>

      {/* Bouton secondaire */}
      <Row style={{ marginTop: '16px', textAlign: 'center' }}>
        <Column>
          <Button
            href={`${siteUrl}/boutique`}
            style={{
              backgroundColor: 'transparent',
              color: '#C8A96E',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              border: '1px solid #C8A96E',
            }}
          >
            Continuer mes achats
          </Button>
        </Column>
      </Row>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '24px', fontStyle: 'italic' }}>
        Besoin d'aide ? Contactez-nous au 07 49 07 28 61 ou par email à contact@jayscreationsdesign.fr
      </Text>
    </EmailLayout>
  );
}

export default AbandonedCartEmail;
