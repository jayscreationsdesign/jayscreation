import React from 'react';
import { Button, Heading, Text, Row, Column, Table, Td, Tr } from '@react-email/components';
import EmailLayout from './EmailLayout';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderConfirmationEmailProps {
  prenom: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  shippingAddress?: string;
}

export function OrderConfirmationEmail({ 
  prenom, 
  orderNumber, 
  items, 
  total, 
  shippingAddress 
}: OrderConfirmationEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreationsdesign.fr';

  return (
    <EmailLayout preview={`Commande confirmée ! 🎉`}>
      <Heading style={{ color: '#333333', fontSize: '28px', fontFamily: 'Playfair Display, serif' }}>
        Commande confirmée ! 🎉
      </Heading>
      
      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
        Merci {prenom}, votre commande #{orderNumber} a bien été enregistrée.
      </Text>

      {/* Tableau récapitulatif des articles */}
      <Table style={{ width: '100%', marginTop: '24px', borderCollapse: 'collapse' }}>
        {items.map((item, index) => (
          <Tr key={index} style={{ borderBottom: '1px solid #EEEEEE' }}>
            <Td style={{ padding: '12px 0', verticalAlign: 'top' }}>
              <Text style={{ color: '#333333', fontSize: '14px', fontWeight: '600' }}>
                {item.name}
              </Text>
              <Text style={{ color: '#666666', fontSize: '12px' }}>
                Quantité: {item.quantity}
              </Text>
            </Td>
            <Td style={{ padding: '12px 0', textAlign: 'right', verticalAlign: 'top' }}>
              <Text style={{ color: '#333333', fontSize: '14px' }}>
                {(item.price * item.quantity).toFixed(2)} €
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

      {/* Adresse de livraison */}
      {shippingAddress && (
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#F8F8F8', borderRadius: '8px' }}>
          <Text style={{ color: '#333333', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>
            Adresse de livraison :
          </Text>
          <Text style={{ color: '#666666', fontSize: '14px', margin: 0 }}>
            {shippingAddress}
          </Text>
        </div>
      )}

      {/* Bouton CTA */}
      <Row style={{ marginTop: '32px', textAlign: 'center' }}>
        <Column>
          <Button
            href={`${siteUrl}/compte/commandes/${orderNumber}`}
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
            Suivre ma commande →
          </Button>
        </Column>
      </Row>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '24px', fontStyle: 'italic' }}>
        Une question ? Répondez directement à cet email.
      </Text>
    </EmailLayout>
  );
}

export default OrderConfirmationEmail;
