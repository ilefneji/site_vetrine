import { ShieldCheck, FileText, Zap, Smartphone } from "lucide-react"

export function SolutionsSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Précision Inspection",
      description:
        "Inspections détaillées avec photos haute résolution, annotations précises et géolocalisation pour une documentation complète et irréfutable de chaque contrôle.",
      bgColor: "bg-[#DCFCE7]",
      accentColor: "text-[#16A34A]",
    },
    {
      icon: FileText,
      title: "Traçabilité Complète",
      description:
        "Suivi complet et chronologique de toutes les vérifications, corrections et validations avec un historique détaillé accessible à tout moment.",
      bgColor: "bg-[#FFEDD5]",
      accentColor: "text-[#EA580C]",
    },
    {
      icon: Zap,
      title: "Efficacité Chantier",
      description:
        "Réduction drastique des retards grâce à une meilleure coordination, des alertes automatiques et une communication fluide entre toutes les parties prenantes.",
      bgColor: "bg-[#F3E8FF]",
      accentColor: "text-[#9333EA]",
    },
    {
      icon: Smartphone,
      title: "Interface Simple",
      description:
        "Interface intuitive et ergonomique conçue pour une adoption rapide par les équipes, même sans formation technique approfondie.",
      bgColor: "bg-[#FEF3C7]",
      accentColor: "text-[#D97706]",
    },
  ]

  return (
    <section id="solution" className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Solution numérique pour l&apos;inspection BTP en Tunisie
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            PI-PROJECT propose une solution digitale complète pour la gestion des inspections
            dans le secteur du bâtiment et travaux publics en Tunisie. Notre plateforme
            révolutionne la manière dont les professionnels documentent, suivent et valident
            leurs contrôles qualité sur chantier.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`${feature.bgColor} rounded-xl p-6`}
              >
                <Icon className={`w-6 h-6 ${feature.accentColor} mb-4`} />
                <h3 className={`font-bold text-base ${feature.accentColor} mb-3`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
