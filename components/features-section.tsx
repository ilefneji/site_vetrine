import Image from "next/image"

const features = [
  {
    image: "/images/inspection-tablet.jpg",
    title: "Inspection Numérique BTP",
    description:
      "Modernisez vos processus d'inspection avec des outils numériques intuitifs qui permettent une documentation précise et en temps réel de tous vos contrôles qualité.",
  },
  {
    image: "/images/team-blueprints.jpg",
    title: "Collaboration d'Équipe BTP",
    description:
      "Améliorez la communication et la coordination entre tous les acteurs du projet grâce à une plateforme centralisée qui facilite le partage d'informations en temps réel.",
  },
  {
    image: "/images/clipboard-interface.jpg",
    title: "Rapports Inspection Automatisés",
    description:
      "Générez instantanément des rapports détaillés et professionnels qui documentent chaque inspection avec photos, annotations et recommandations personnalisées.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-[#F8FAFC] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-balance">
            Transformez votre gestion de chantier BTP
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-balance">
            Découvrez comment PI-PROJECT révolutionne chaque aspect de la gestion de projets de construction en Tunisie
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Image */}
              <div className="w-full h-[250px] relative rounded-xl overflow-hidden mb-4">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-base font-bold text-gray-800 text-center mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-500 text-center text-pretty">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
