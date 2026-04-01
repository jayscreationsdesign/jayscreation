import { MapPin, Phone, Mail, Clock, Camera, Music2 } from "lucide-react";

const subjects = [
  "Devis personnalisé",
  "Question sur une commande",
  "Collaboration",
  "Autre",
] as const;

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl text-foreground">Contactez-nous</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        Parlez-nous de votre événement et de vos envies. Nous revenons vers
        vous avec une proposition sur-mesure.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form className="rounded-3xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Nom</label>
              <input
                name="name"
                placeholder="Votre nom"
                className="h-11 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                name="email"
                placeholder="vous@exemple.fr"
                className="h-11 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Sujet</label>
            <select
              name="subject"
              className="h-11 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <textarea
              name="message"
              placeholder="Décrivez votre projet (thème, quantités, délais, finitions...)"
              rows={6}
              className="resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>

          <button
            type="button"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
          >
            Envoyer
          </button>

          <p className="mt-3 text-xs text-muted-foreground">
            Formulaire de démonstration (envoi non activé pour le moment).
          </p>
        </form>

        <aside className="rounded-3xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur">
          <div className="font-heading text-2xl text-foreground">Informations</div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Vous pouvez également nous joindre directement via email ou sur les réseaux.
          </p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground">Adresse</div>
                  <div className="mt-1 text-sm font-medium text-foreground">
                    15 Quai d&apos;Asnières<br />92390 Villeneuve-la-Garenne
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Téléphone</div>
                  <a
                    href="tel:+33763920823"
                    className="mt-1 block text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    +33 7 63 92 08 23
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <a
                    href="mailto:jayscreations.d@gmail.com"
                    className="mt-1 block text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    jayscreations.d@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Horaires</div>
                  <div className="mt-1 text-sm font-medium text-foreground">
                    Lun – Ven : 7h – 19h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Week-end : 10h – 17h
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="text-xs text-muted-foreground mb-3">Réseaux sociaux</div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/jays_creations_design/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  <Camera className="h-4 w-4 text-accent" />
                  @jays_creations_design
                </a>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href="https://www.tiktok.com/@jayscreationsdesign"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  <Music2 className="h-4 w-4 text-accent" />
                  @jayscreationsdesign
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
