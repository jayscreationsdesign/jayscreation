import React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { Button, Text } from '@react-email/components';

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
  return (
    <EmailLayout preview={`Commande ${orderNumber} confirmée ✨`}>
      <Text style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '0 0 16px 0' }}>
        Commande confirmée ! 🎉
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Merci {prenom} pour votre confiance !
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Votre commande #{orderNumber} a bien été enregistrée et est en cours de préparation. Nous mettons tout notre savoir-faire artisanal pour que chaque détail soit parfait.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        <strong>Récapitulatif de votre commande :</strong>
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
            padding: '8px 0',
            borderBottom: index < items.length - 1 ? '1px solid #E8E4DD' : 'none'
          }}>
            <div>
              <div style={{ fontWeight: '500' }}>{item.name}</div>
              <div style={{ fontSize: '14px', color: '#666666' }}>Quantité: {item.quantity}</div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#C8A96E' }}>
              {(item.price * item.quantity).toFixed(2)} €
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
          <div style={{ color: '#C8A96E' }}>{total.toFixed(2)} €</div>
        </div>
      </div>
      
      {shippingAddress && (
        <>
          <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '24px 0 8px 0' }}>
            <strong>Adresse de livraison :</strong>
          </Text>
          <div style={{
            backgroundColor: '#F5F3EF',
            padding: '16px',
            borderRadius: '8px',
            margin: '0 0 24px 0',
            fontFamily: 'Inter, sans-serif',
            color: '#333333'
          }}>
            {shippingAddress}
          </div>
        </>
      )}
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Vous recevrez un email dès que votre commande sera expédiée.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 32px 0' }}>
        Une question sur votre commande ? Répondez simplement à cet email, nous vous répondrons dans les plus brefs délais.
      </Text>
      
      <Button
        href={`${process.env.NEXT_PUBLIC_SITE_URL}/compte/commandes/${orderNumber}`}
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
        Suivre ma commande →
      </Button>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '32px 0 0 0' }}>
        Merci de faire confiance à Jay's Creations Design.<br />
        À très bientôt ! ✨
      </Text>
    </EmailLayout>
  );
}

export default OrderConfirmationEmail;
