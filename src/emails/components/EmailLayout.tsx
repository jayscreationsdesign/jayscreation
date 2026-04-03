import React from 'react';
import { Head, Html, Body, Container, Section, Text, Row, Column } from '@react-email/components';

// Configuration des styles
const styles = {
  body: {
    backgroundColor: '#FAF7F2',
    margin: '0',
    padding: '0',
    fontFamily: 'Inter, sans-serif',
  },
  container: {
    backgroundColor: '#FFFFFF',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '32px',
    borderRadius: '0',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  logo: {
    height: '60px',
    marginBottom: '16px',
  },
  title: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
    margin: '0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666666',
    margin: '8px 0 0 0',
  },
  footer: {
    borderTop: '1px solid #C8A96E',
    paddingTop: '24px',
    marginTop: '32px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#999999',
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '4px 0',
  },
  footerLink: {
    color: '#999999',
    textDecoration: 'underline',
  },
  socialLinks: {
    marginTop: '16px',
  },
  socialLink: {
    color: '#999999',
    textDecoration: 'none',
    margin: '0 8px',
    fontSize: '12px',
  },
};

interface EmailLayoutProps {
  children: React.ReactNode;
  preview?: string;
}

export function EmailLayout({ children, preview }: EmailLayoutProps) {
  return (
    <Html>
      <Head>
        <title>Jay's Creations Design</title>
        {preview && <meta name="preview" content={preview} />}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <img
              src="https://jayscreationsdesign.fr/logo.png"
              alt="Jay's Creations Design"
              width={60}
              height={60}
              style={styles.logo}
            />
            <h1 style={styles.title}>Jay's Creations Design</h1>
            <p style={styles.subtitle}>Papeterie Personnalisée</p>
          </Section>

          {/* Body */}
          <Section>
            {children}
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>Jay's Creations Design</Text>
            <Text style={styles.footerText}>Papeterie Personnalisée</Text>
            <Text style={styles.footerText}>15 Quai d'Asnières, 92390 Villeneuve-la-Garenne</Text>
            <Text style={styles.footerText}>📞 07 49 07 28 61</Text>
            <Text style={styles.footerText}>
              🌐{' '}
              <a href="https://jayscreationsdesign.fr" style={styles.footerLink}>
                jayscreationsdesign.fr
              </a>
            </Text>
            
            <Row style={styles.socialLinks}>
              <Column>
                <a 
                  href="https://instagram.com/jays_creations_design" 
                  style={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram @jays_creations_design
                </a>
              </Column>
              <Column>
                <a 
                  href="https://tiktok.com/@jayscreationsdesign" 
                  style={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok @jayscreationsdesign
                </a>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default EmailLayout;
