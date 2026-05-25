import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 px-4 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            À propos de PI-PROJECT - Startup BTP Tunisienne
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Fondée à Sfax, PI-PROJECT est une startup tunisienne dédiée à la transformation digitale 
            du secteur de la construction. Notre équipe passionnée combine expertise technique et 
            connaissance approfondie du marché local pour offrir des solutions adaptées aux besoins 
            spécifiques des entreprises BTP tunisiennes.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Notre Mission : Digitaliser le BTP Tunisien
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nous croyons fermement que la modernisation du secteur de la construction en Tunisie 
              passe par l&apos;adoption d&apos;outils numériques performants. PI-PROJECT développe des 
              solutions innovantes qui permettent aux entreprises BTP de gérer efficacement leurs 
              chantiers, d&apos;optimiser leurs ressources et d&apos;améliorer la qualité de leurs 
              livrables. Notre objectif est de rendre la technologie accessible à tous les acteurs 
              du secteur, des grandes entreprises aux artisans indépendants.
            </p>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FFF3E0] rounded-lg p-6 text-center">
                <span className="block text-3xl md:text-4xl font-bold text-[#E07B2A] mb-1">
                  2026
                </span>
                <span className="text-gray-600 text-sm md:text-base">
                  Année de création
                </span>
              </div>
              <div className="bg-[#FFF3E0] rounded-lg p-6 text-center">
                <span className="block text-3xl md:text-4xl font-bold text-[#E07B2A] mb-1">
                  100%
                </span>
                <span className="text-gray-600 text-sm md:text-base">
                  Made in Tunisia
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/construction-team.jpg"
                alt="Équipe de construction PI-PROJECT examinant des plans"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
