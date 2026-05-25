import Image from "next/image"
import { CheckCircle } from "lucide-react"

const checklist = [
  "Compatible smartphone, tablette et ordinateur avec synchronisation automatique",
  "Fonctionnement hors connexion avec synchronisation dès le retour du réseau",
  "Sauvegarde automatique et sécurisée de toutes les données",
  "Interface multilingue (Français, Arabe) adaptée au marché tunisien",
]

export function InterfaceSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT column - Image */}
          <div className="w-full">
            <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
              <Image
                src="/images/worker-tablet-tech.jpg"
                alt="Professionnel BTP utilisant une tablette avec interface digitale"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT column - Text content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Interface Intuitive pour Professionnels BTP
            </h2>
            
            <p className="text-gray-600 leading-relaxed">
              Notre interface a été méticuleusement conçue en collaboration 
              avec des professionnels du BTP pour garantir une expérience 
              utilisateur optimale. Chaque fonctionnalité est pensée pour 
              simplifier le travail quotidien tout en offrant des capacités 
              avancées pour les utilisateurs expérimentés.
            </p>

            <ul className="flex flex-col gap-4">
              {checklist.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#16A34A] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
