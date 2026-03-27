import { Metadata } from "next";
import BoutiqueClient from "./BoutiqueClient";

export const metadata: Metadata = {
  title: "Boutique - Jay's Créations Design",
  description: "Découvrez notre boutique de papeterie événementielle : faire-part, invitations, menus et marque-places personnalisés.",
};

export default function BoutiquePage() {
  return <BoutiqueClient />;
}
