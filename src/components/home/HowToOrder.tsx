import {
  ShoppingCart,
  Palette,
  Type,
  ClipboardCheck,
  Clock,
  Mail,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: ShoppingCart,
    title: "Je choisis mes produits",
    description: "Je sélectionne les produits qui me conviennent et je les ajoute au panier.",
    centerText: true,
  },
  {
    number: 2,
    icon: Palette,
    title: "Je choisis un thème",
    description: "Si nécessaire, je sélectionne un thème pour ma personnalisation et je l'ajoute au panier.",
    centerText: true,
  },
  {
    number: 3,
    icon: Type,
    title: "Je choisis la police",
    description: "Si je souhaite changer la police d'écriture, je la sélectionne parmi celles disponibles.",
    centerText: true,
  },
  {
    number: 4,
    icon: ClipboardCheck,
    title: "Je vérifie mon panier",
    description: "Dans le panier, je vérifie et renseigne toutes mes informations de personnalisation.",
    centerText: true,
  },
  {
    number: 5,
    icon: Clock,
    title: "Je valide ma commande",
    description: "Je confirme ma commande. Le délai de réalisation est de 15 à 25 jours ouvrés selon la date de l'événement.",
    centerText: true,
  },
  {
    number: 6,
    icon: Mail,
    title: "Je reçois mon colis",
    description: "Dès l'expédition, je reçois un e-mail avec mon numéro de suivi pour suivre mon colis.",
    centerText: true,
  },
];

export default function HowToOrder() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
            Comment commander ?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-7 text-muted-foreground sm:text-base text-center" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>
            Passer commande chez Jay&apos;s Creations Design est simple et rapide — suivez ces 6 étapes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-3xl border border-border bg-background p-6 shadow-sm"
              >
                {/* Numéro */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-heading font-bold text-base">
                    {step.number}
                  </div>
                  <div className="h-px flex-1 bg-accent/20" />
                  <Icon className="h-5 w-5 text-accent" />
                </div>

                {/* Contenu */}
                <h3 className="font-heading text-base font-semibold text-foreground text-left">
                  {step.title}
                </h3>
                <p className={`mt-2 text-sm leading-6 text-muted-foreground ${step.centerText ? 'text-center font-medium' : ''}`} style={step.centerText ? {} : { textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
