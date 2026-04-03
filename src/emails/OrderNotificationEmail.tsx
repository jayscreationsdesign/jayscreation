import React from 'react';
import { Button, Heading, Text, Row, Column, Table, Td, Tr } from '@react-email/components';
import EmailLayout from './EmailLayout';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
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
  const supabaseUrl = 'https://rtttjmonchffqqaafxh.supabase.co';

  return (
    <EmailLayout preview={`🔔 Nouvelle commande ${orderNumber}`}>
      <Heading style={{ color: '#333333', fontSize: '28px', fontFamily: 'Playfair Display, serif' }}>
        🔔 Nouvelle commande #{orderNumber}
      </Heading>
      
      {/* Info client */}
      <div style={{ 
        backgroundColor: '#F8F8F8', 
        padding: '16px', 
        borderRadius: '8px', 
        marginTop: '16px' 
      }}>
        <Text style={{ color: '#333333', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>
          Informations client :
        </Text>
        <Text style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>
          <strong>Nom :</strong> {customerName}
        </Text>
        <Text style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>
          <strong>Email :</strong> {customerEmail}
        </Text>
      </div>

      {/* Tableau des articles */}
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

      {/* Bouton vers Supabase */}
      <Row style={{ marginTop: '32px', textAlign: 'center' }}>
        <Column>
          <Button
            href={`${supabaseUrl}/project/default/editor`}
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
            Voir dans Supabase →
          </Button>
        </Column>
      </Row>

      <Text style={{ color: '#666666', fontSize: '14px', marginTop: '24px' }}>
        Cette commande nécessite votre attention pour la préparation et l'expédition.
      </Text>
    </EmailLayout>
  );
}

export default OrderNotificationEmail;
