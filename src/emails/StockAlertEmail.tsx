import React from 'react';
import { Button, Heading, Text, Row, Column } from '@react-email/components';
import EmailLayout from './EmailLayout';

interface StockAlertEmailProps {
  productName: string;
  productId: string;
}

export function StockAlertEmail({ productName, productId }: StockAlertEmailProps) {
  const supabaseUrl = 'https://rtttjmonchffqqaafxh.supabase.co';

  return (
    <EmailLayout preview={`⚠️ Rupture de stock`}>
      <Heading style={{ color: '#D32F2F', fontSize: '28px', fontFamily: 'Playfair Display, serif' }}>
        ⚠️ Rupture de stock
      </Heading>
      
      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
        Le produit <strong>{productName}</strong> (ID: {productId}) est en rupture de stock.
      </Text>

      {/* Bloc d'alerte */}
      <div style={{ 
        backgroundColor: '#FFEBEE', 
        border: '1px solid #F44336',
        padding: '16px', 
        borderRadius: '8px', 
        marginTop: '24px'
      }}>
        <Text style={{ color: '#D32F2F', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>
          Action requise :
        </Text>
        <Text style={{ color: '#D32F2F', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          Ce produit ne peut plus être vendu tant que le stock n'est pas réapprovisionné. 
          Veuillez mettre à jour le stock ou désactiver temporairement le produit.
        </Text>
      </div>

      <Text style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6', marginTop: '24px' }}>
        Conséquences :
      </Text>
      <ul style={{ color: '#666666', fontSize: '14px', lineHeight: '1.6', marginTop: '8px' }}>
        <li>Le produit n'est plus visible sur la boutique</li>
        <li>Les clients ne peuvent plus l'ajouter au panier</li>
        <li>Les commandes en cours ne sont pas affectées</li>
      </ul>

      {/* Bouton pour gérer le stock */}
      <Row style={{ marginTop: '32px', textAlign: 'center' }}>
        <Column>
          <Button
            href={`${supabaseUrl}/project/default/editor`}
            style={{
              backgroundColor: '#D32F2F',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Gérer le stock →
          </Button>
        </Column>
      </Row>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '24px' }}>
        Cette alerte est générée automatiquement lorsque le stock d'un produit atteint 0.
      </Text>
    </EmailLayout>
  );
}

export default StockAlertEmail;
