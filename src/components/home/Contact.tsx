"use client"
import { Mail, Phone, MapPin } from "lucide-react"
import PrimaryCtaButton from "@/components/ui/PrimaryCtaButton";
import { useRouter } from "next/navigation";

export function Contact() {
  const router = useRouter();

  return (
    <section className="py-8 sm:py-12 lg:py-16" style={{
      background: "linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 50%, #F5E6D3 100%)"
    }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-jc-text mb-6 sm:mb-8">
          Contactez-nous
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#6B6B6B] mb-8 sm:mb-12 leading-relaxed">
          Une question ? Un projet en tête ? Notre équipe est là pour vous accompagner
          dans la création de vos événements inoubliables.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#2C2C2C] mb-2 text-sm sm:text-base">Email</h3>
            <p className="text-[#6B6B6B] text-xs sm:text-sm break-words">contact@jayscreationsdesign.fr</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#2C2C2C] mb-2 text-sm sm:text-base">Téléphone</h3>
            <p className="text-[#6B6B6B] text-xs sm:text-sm">+33 7 49 07 28 61</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#2C2C2C] mb-2 text-sm sm:text-base">Localisation</h3>
            <p className="text-[#6B6B6B] text-xs sm:text-sm">France</p>
          </div>
        </div>
        <PrimaryCtaButton onClick={() => router.push('/contact')} className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
          Envoyer un message
        </PrimaryCtaButton>
      </div>
    </section>
  );
}
