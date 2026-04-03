import React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { Button, Text } from '@react-email/components';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderNotificationEmailProps {
  orderNumber: string;
  items: OrderItem[];
  total: number;
  customerEmail: string;
  customerName: string;
}

export function OrderNotificationEmail({ 
  orderNumber, 
  items, 
  total, 
  customerEmail, 
  customerName 
}: OrderNotificationEmailProps) {
  return (
    <EmailLayout preview={`Nouvelle commande #${orderNumber}`}>
      <Text style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '0 0 16px 0' }}>
        Nouvelle commande reçue ! 🔔
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Une nouvelle commande vient d'être passée sur la boutique.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        <strong>Détails de la commande :</strong>
      </Text>
      
      <div style={{
        backgroundColor: '#F5F3EF',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
        fontFamily: 'Inter, sans-serif',
        color: '#333333'
      }}>
        <p style={{ margin: '0 0 8px 0' }}><strong>Numéro :</strong> #{orderNumber}</p>
        <p style={{ margin: '0 0 8px 0' }}><strong>Client :</strong> {customerName}</p>
        <p style={{ margin: '0 0 0 0' }}><strong>Email :</strong> {customerEmail}</p>
      </div>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        <strong>Articles commandés :</strong>
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
      
      <Button
        href="https://supabase.com/dashboard/project/rtttjmonchffqqaafxh/editor"
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
        Voir la commande dans Supabase →
      </Button>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999999', lineHeight: '1.5', margin: '32px 0 0 0', borderTop: '1px solid #F5F3EF', paddingTop: '16px' }}>
        Cet email est une notification automatique du site jayscreationsdesign.fr
      </Text>
    </EmailLayout>
  );
}

export default OrderNotificationEmail;
