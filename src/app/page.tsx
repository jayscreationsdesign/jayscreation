import { Metadata } from "next";
import { supabase } from "@/lib/supabase"
import { Hero } from "@/components/home/Hero"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { Categories } from "@/components/home/Categories"
import { About } from "@/components/home/About"
import { Testimonials } from "@/components/home/Testimonials"
import { Contact } from "@/components/home/Contact"

export const metadata: Metadata = {
  title: "Jay's Créations Design - Papeterie Événementielle Premium",
  description: "Créations artisanales uniques pour vos événements : faire-part, invitations, menus et marque-places personnalisés.",
};

export default async function Home() {
  // Test de connexion Supabase (optionnel pour le déploiement)
  try {
    const { data, error } = await (supabase as any).from("products")?.select("*")?.limit(1) || { data: null, error: null };
    console.log("Supabase test:", data, error);
  } catch (error) {
    console.log("Supabase non configuré - utilisation des données statiques");
  }

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <About />
      <Testimonials />
      <Contact />
    </main>
  )
}
