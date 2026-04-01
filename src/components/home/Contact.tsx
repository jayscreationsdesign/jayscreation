"use client"
import { Mail, Phone, MapPin } from "lucide-react"
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";

export function Contact() {
  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-jc-text mb-8">
          Contactez-nous
        </h2>
        <p className="text-lg text-[#6B6B6B] mb-12">
          Une question ? Un projet en tête ? Notre équipe est là pour vous accompagner
          dans la création de vos événements inoubliables.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-14 h-14 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#2C2C2C] mb-2">Email</h3>
            <p className="text-[#6B6B6B]">contact@jayscreations.fr</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#2C2C2C] mb-2">Téléphone</h3>
            <p className="text-[#6B6B6B]">+33 7 63 92 08 23</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#2C2C2C] mb-2">Localisation</h3>
            <p className="text-[#6B6B6B]">France</p>
          </div>
        </div>
        <PrimaryCtaButton onClick={() => console.log('Contact form')}>
          Envoyer un message
        </PrimaryCtaButton>
      </div>
    </section>
  );
}
