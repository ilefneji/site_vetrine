import { Users, Building2, Target, CheckCircle } from "lucide-react"

const beneficiaries = [
  {
    icon: Users,
    title: "Inspecteurs BTP",
    description:
      "Planification structurée, suivi efficace et décisions mieux informées grâce à des outils professionnels qui valorisent leur expertise technique.",
    checklist: [
      "Interface mobile optimisée pour le terrain",
      "Génération automatique de rapports professionnels",
      "Historique complet des inspections précédentes",
    ],
  },
  {
    icon: Building2,
    title: "Chefs de Chantier",
    description:
      "Coordination améliorée et visibilité en temps réel sur l'avancement avec des tableaux de bord personnalisés et des alertes intelligentes.",
    checklist: [
      "Dashboard en temps réel de l'avancement",
      "Communication centralisée avec toutes les équipes",
      "Alertes automatiques pour les points critiques",
    ],
  },
  {
    icon: Target,
    title: "Équipes de Terrain",
    description:
      "Moins d'erreurs, instructions claires et meilleure exécution des tâches grâce à des consignes précises et un feedback immédiat.",
    checklist: [
      "Instructions détaillées avec supports visuels",
      "Feedback immédiat sur la qualité du travail",
      "Formation continue via la plateforme",
    ],
  },
]

export function BeneficiariesSection() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#FDF6EC" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bénéficiaires de la solution BTP
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Notre solution s&apos;adapte parfaitement à tous les acteurs du chantier,
            de l&apos;inspecteur sur le terrain au directeur de projet, en passant
            par les équipes techniques et les clients finaux.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beneficiaries.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              {/* Icon */}
              <item.icon
                className="w-9 h-9 mb-4"
                style={{ color: "#E07B2A" }}
              />

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Checklist */}
              <ul className="space-y-2">
                {item.checklist.map((checkItem, checkIndex) => (
                  <li key={checkIndex} className="flex items-start gap-2">
                    <CheckCircle
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "#16A34A" }}
                    />
                    <span className="text-xs text-gray-500">{checkItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
