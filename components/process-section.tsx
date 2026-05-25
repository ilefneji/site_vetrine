export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Création du projet BTP",
      description:
        "Le pilote crée un projet et définit toutes les données essentielles : nom, localisation, responsables, échéances et objectifs qualité.",
    },
    {
      number: "02",
      title: "Création des lots construction",
      description:
        "Le projet est intelligemment divisé en lots techniques (gros œuvre, second œuvre, finitions) pour une gestion optimisée.",
    },
    {
      number: "03",
      title: "Définition des activités chantier",
      description:
        "Chaque lot est associé à des activités spécifiques avec critères de validation et points de contrôle prédéfinis.",
    },
    {
      number: "04",
      title: "Ajout des plans techniques",
      description:
        "Intégration des plans techniques, spécifications et références normatives directement dans la plateforme.",
    },
    {
      number: "05",
      title: "Planification inspection",
      description:
        "L'inspecteur planifie ses interventions, réserve les créneaux et informe automatiquement toutes les équipes concernées.",
    },
    {
      number: "06",
      title: "Inspection qualité terrain",
      description:
        "Validation ou rejet avec preuves visuelles (photos, vidéos), commentaires détaillés et recommandations d'amélioration.",
    },
    {
      number: "07",
      title: "Rapport inspection automatisé",
      description:
        "Génération instantanée d'un rapport professionnel détaillé, partagé en temps réel avec tous les intervenants du projet.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Processus d&apos;inspection BTP en 7 étapes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Notre processus en 7 étapes simples transforme votre gestion de projet
            de la planification à la livraison, en passant par chaque phase
            d&apos;inspection et de validation.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              {/* Orange Badge */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-10 h-7 bg-[#E07B2A] text-white font-bold text-sm rounded-md">
                  {step.number}
                </span>
              </div>
              {/* Text Content */}
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
