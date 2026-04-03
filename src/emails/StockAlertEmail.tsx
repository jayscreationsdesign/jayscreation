import React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { Button, Text } from '@react-email/components';

interface StockAlertEmailProps {
  productName: string;
  productId: string;
}

export function StockAlertEmail({ productName, productId }: StockAlertEmailProps) {
  return (
    <EmailLayout preview="⚠️ Rupture de stock">
      <Text style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '0 0 16px 0' }}>
        Alerte stock ⚠️
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Attention, un produit est en rupture de stock sur la boutique :
      </Text>
      
      <div style={{
        backgroundColor: '#F5F3EF',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
        fontFamily: 'Inter, sans-serif',
        color: '#333333'
      }}>
        <p style={{ margin: '0 0 8px 0' }}><strong>Produit :</strong> {productName}</p>
        <p style={{ margin: '0 0 0 0' }}><strong>ID :</strong> {productId}</p>
      </div>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Ce produit n'est plus disponible à la vente. Les clients ne pourront plus le commander tant que le stock ne sera pas réapprovisionné.
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        <strong>Actions recommandées :</strong>
      </Text>
      
      <ul style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 32px 0', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '8px' }}>Réapprovisionner le stock dans Supabase</li>
        <li style={{ marginBottom: '8px' }}>Ou masquer temporairement le produit de la boutique</li>
        <li style={{ marginBottom: '0' }}>Vérifier si des commandes en attente sont impactées</li>
      </ul>
      
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
        Gérer le stock →
      </Button>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999999', lineHeight: '1.5', margin: '32px 0 0 0', borderTop: '1px solid #F5F3EF', paddingTop: '16px' }}>
        Cet email est une notification automatique du site jayscreationsdesign.fr
      </Text>
    </EmailLayout>
  );
}

export default StockAlertEmail;
