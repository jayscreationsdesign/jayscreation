import React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { Button, Text } from '@react-email/components';

interface AbandonedCartNotificationEmailProps {
  customerName: string;
  customerEmail: string;
  cartDate: string;
  timeElapsed: string;
  items: Array<{ name: string; price: number }>;
  total: number;
}

export function AbandonedCartNotificationEmail({ customerName, customerEmail, cartDate, timeElapsed, items, total }: AbandonedCartNotificationEmailProps) {
  return (
    <EmailLayout preview="🔔 Panier abandonné">
      <Text style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '0 0 16px 0' }}>
        Panier abandonné 🔔
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Un client n'a pas finalisé sa commande.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        <strong>Informations du client :</strong>
      </Text>
      
      <div style={{
        backgroundColor: '#F5F3EF',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
        fontFamily: 'Inter, sans-serif',
        color: '#333333'
      }}>
        <p style={{ margin: '0 0 8px 0' }}><strong>Nom :</strong> {customerName}</p>
        <p style={{ margin: '0 0 8px 0' }}><strong>Email :</strong> {customerEmail}</p>
        <p style={{ margin: '0 0 8px 0' }}><strong>Panier créé le :</strong> {cartDate}</p>
        <p style={{ margin: '0 0 0 0' }}><strong>Temps écoulé :</strong> {timeElapsed}</p>
      </div>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        <strong>Articles dans le panier :</strong>
      </Text>
      
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        margin: '16px 0',
        fontFamily: 'Inter, sans-serif',
        color: '#333333'
      }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#F5F3EF', padding: '12px', textAlign: 'left', fontWeight: '500' }}>Produit</th>
            <th style={{ backgroundColor: '#F5F3EF', padding: '12px', textAlign: 'right', fontWeight: '500' }}>Prix</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '12px', borderBottom: '1px solid #F5F3EF' }}>{item.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #F5F3EF', textAlign: 'right' }}>{item.price.toFixed(2)} €</td>
            </tr>
          ))}
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Total potentiel</td>
            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', fontSize: '18px', color: '#C8A96E' }}>
              {total.toFixed(2)} €
            </td>
          </tr>
        </tbody>
      </table>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Un email de relance automatique a été envoyé au client. Vous pouvez aussi le contacter directement pour conclure la vente.
      </Text>
      
      <Button
        href={`mailto:${customerEmail}`}
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
        Contacter le client →
      </Button>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999999', lineHeight: '1.5', margin: '32px 0 0 0', borderTop: '1px solid #F5F3EF', paddingTop: '16px' }}>
        Cet email est une notification automatique du site jayscreationsdesign.fr
      </Text>
    </EmailLayout>
  );
}

export default AbandonedCartNotificationEmail;
