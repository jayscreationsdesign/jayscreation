import React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { Button, Text } from '@react-email/components';

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
  return (
    <EmailLayout preview="Vous avez oublié quelque chose ? 🛒">
      <Text style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '0 0 16px 0' }}>
        Votre panier vous attend 🛒
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Bonjour {prenom},
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Il semblerait que vous n'ayez pas finalisé votre commande... et nous ne voudrions pas que vous passiez à côté de ces belles créations !
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Voici ce que vous aviez sélectionné :
      </Text>
      
      <div style={{
        backgroundColor: '#F5F3EF',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
        fontFamily: 'Inter, sans-serif',
        color: '#333333'
      }}>
        {items.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: index < items.length - 1 ? '1px solid #E8E4DD' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
                />
              )}
              <div>
                <div style={{ fontWeight: '500' }}>{item.name}</div>
              </div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#C8A96E' }}>
              {item.price.toFixed(2)} €
            </div>
          </div>
        ))}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '12px 0 0 0',
          marginTop: '8px',
          borderTop: '2px solid #C8A96E',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          <div>Total</div>
          <div style={{ color: '#C8A96E' }}>
            {items.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €
          </div>
        </div>
      </div>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Chaque produit Jay's Creations Design est conçu artisanalement et personnalisé rien que pour vous. Ne tardez pas, certains articles sont en édition limitée !
      </Text>
      
      <Button
        href={cartUrl}
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
        Finaliser ma commande →
      </Button>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', lineHeight: '1.5', margin: '16px 0 0 0' }}>
        Ce lien est valable pendant 48 heures.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '24px 0 0 0' }}>
        Besoin d'aide pour finaliser votre commande ? Répondez à cet email ou contactez-nous au 07 49 07 28 61.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '32px 0 0 0' }}>
        À très vite,<br />
        L'équipe Jay's Creations Design
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999999', lineHeight: '1.5', margin: '24px 0 0 0', borderTop: '1px solid #F5F3EF', paddingTop: '16px' }}>
        Vous recevez cet email car un panier a été créé sur jayscreationsdesign.fr.<br />
        Si vous ne souhaitez plus recevoir ces rappels, ignorez simplement ce message.
      </Text>
    </EmailLayout>
  );
}

export default AbandonedCartEmail;
