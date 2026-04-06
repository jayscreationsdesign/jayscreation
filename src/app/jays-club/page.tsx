import { Metadata } from 'next';
import JaysClubClient from './JaysClubClient';

export const metadata: Metadata = {
  title: "Jay's Club — Programme de fidélité | Jay's Creations Design",
  description: "Cumulez des points, montez de niveau et profitez de récompenses exclusives sur Jay's Creations Design.",
  openGraph: {
    title: "Jay's Club — Programme de fidélité",
    description: "Cumulez des points, montez de niveau et profitez de récompenses exclusives sur Jay's Creations Design.",
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jay's Club — Programme de fidélité",
    description: "Cumulez des points, montez de niveau et profitez de récompenses exclusives sur Jay's Creations Design.",
  },
  alternates: {
    canonical: '/jays-club',
  },
};

export default function JaysClubPage() {
  return <JaysClubClient />;
}
