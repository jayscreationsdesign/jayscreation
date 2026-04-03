import React from 'react';
import { EmailLayout } from './components/EmailLayout';
import { Button, Text } from '@react-email/components';

interface SignupNotificationEmailProps {
  prenom: string;
  nom: string;
  email: string;
  date: string;
}

export function SignupNotificationEmail({ prenom, nom, email, date }: SignupNotificationEmailProps) {
  return (
    <EmailLayout preview="🔔 Nouveau compte client">
      <Text style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 'bold', color: '#333333', margin: '0 0 16px 0' }}>
        Nouveau compte client 🔔
      </Text>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Un nouveau client vient de créer un compte sur la boutique.
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
        <p style={{ margin: '0 0 8px 0' }}><strong>Prénom :</strong> {prenom}</p>
        <p style={{ margin: '0 0 8px 0' }}><strong>Nom :</strong> {nom}</p>
        <p style={{ margin: '0 0 8px 0' }}><strong>Email :</strong> {email}</p>
        <p style={{ margin: '0 0 0 0' }}><strong>Date d'inscription :</strong> {date}</p>
      </div>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#333333', lineHeight: '1.6', margin: '0 0 32px 0' }}>
        C'est le moment idéal pour suivre son parcours et l'accompagner vers sa première commande.
      </Text>
      
      <Button
        href="https://supabase.com/dashboard/project/rtttjmonchffqqaafxh/auth/users"
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
        Voir les clients dans Supabase →
      </Button>
      
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999999', lineHeight: '1.5', margin: '32px 0 0 0', borderTop: '1px solid #F5F3EF', paddingTop: '16px' }}>
        Cet email est une notification automatique du site jayscreationsdesign.fr
      </Text>
    </EmailLayout>
  );
}

export default SignupNotificationEmail;
