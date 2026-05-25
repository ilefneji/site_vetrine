import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50/30 pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-[#E07B2A]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#E07B2A]/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E07B2A]/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#E07B2A]" />
              <span className="text-sm font-medium text-[#E07B2A]">
                Plateforme BTP Tunisie
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-balance">
              Révolutionner la gestion des projets de construction en{" "}
              <span className="text-[#E07B2A]">Tunisie</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              PI-PROJECT est la solution tout-en-un qui digitalise et optimise la gestion 
              de vos chantiers. Suivi en temps réel, inspections automatisées et 
              collaboration simplifiée pour tous les acteurs du BTP.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="bg-[#E07B2A] text-white hover:bg-[#c96a22] gap-2"
              >
                Découvrir la solution BTP
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2"
              >
                <Play className="h-4 w-4" />
                Voir la démo inspection
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-4 flex flex-wrap gap-8 border-t border-gray-200 pt-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">150+</p>
                <p className="text-sm text-gray-500">Projets gérés</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-500">Entreprises clientes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-500">Satisfaction client</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl bg-white p-2 shadow-2xl shadow-gray-200/50 ring-1 ring-gray-100">
              <Image
                src="/images/hero-construction.jpg"
                alt="Dashboard de gestion de projet de construction PI-PROJECT"
                width={800}
                height={600}
                className="rounded-xl"
                priority
              />
              
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-100 sm:-bottom-6 sm:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Inspection terminée</p>
                    <p className="text-xs text-gray-500">Chantier Tunis Centre</p>
                  </div>
                </div>
              </div>

              {/* Floating card right */}
              <div className="absolute -right-4 top-8 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-100 sm:-right-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E07B2A]/10">
                    <span className="text-lg font-bold text-[#E07B2A]">87%</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Avancement</p>
                    <p className="text-xs text-gray-500">Phase 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
