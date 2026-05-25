export function RoiStatsSection() {
  const stats = [
    {
      percentage: "40%",
      subtitle: "Réduction des coûts BTP",
      description:
        "Diminution significative des dépenses liées aux inspections manuelles, reprises de travaux et gestion administrative.",
      bgColor: "bg-[#DCFCE7]",
      textColor: "text-[#16A34A]",
    },
    {
      percentage: "50%",
      subtitle: "Accélération projets",
      description:
        "Réduction drastique du délai entre inspection et validation grâce à la digitalisation complète du processus.",
      bgColor: "bg-[#FFEDD5]",
      textColor: "text-[#EA580C]",
    },
    {
      percentage: "30%",
      subtitle: "Gain de temps inspection",
      description:
        "Diminution du temps consacré aux rapports et à la documentation administrative grâce à l'automatisation.",
      bgColor: "bg-[#F3E8FF]",
      textColor: "text-[#9333EA]",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-8 text-center`}
            >
              <p className={`text-5xl font-bold ${stat.textColor} mb-2`}>
                {stat.percentage}
              </p>
              <p className={`text-lg font-bold ${stat.textColor} mb-4`}>
                {stat.subtitle}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
