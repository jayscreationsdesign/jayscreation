import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HowToOrder from "@/components/home/HowToOrder";
import TendancesClient from "@/components/home/TendancesClient";

export const metadata: Metadata = {
  title: "Jay's Créations Design - Papeterie Événementielle Premium",
  description: "Créations artisanales uniques pour vos événements : faire-part, invitations, menus et marque-places personnalisés.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowToOrder />
      <TendancesClient />
    </>
  );
}
