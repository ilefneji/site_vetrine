export function ChallengesSection() {
  const problems = [
    {
      title: "Méthodes d'inspection obsolètes",
      text: "Les inspections sur papier ou Excel sont difficiles à centraliser, suivre et analyser, créant des silos d'information et des risques de perte de données critiques.",
    },
    {
      title: "Processus de validation longs",
      text: "La validation manuelle des travaux sans historique structuré ralentit considérablement les projets et complique la prise de décisions basées sur des données fiables.",
    },
    {
      title: "Communication défaillante chantier",
      text: "La communication défaillante entre les équipes génère des malentendus, des retards et une coordination inefficace qui impacte la qualité finale du projet.",
    },
    {
      title: "Coût des erreurs BTP",
      text: "Les retouches et réparations dues à des défauts non détectés à temps augmentent significativement les délais et budgets, réduisant la marge bénéficiaire.",
    },
  ]

  const stats = [
    {
      value: "30%",
      text: "Des retards de chantier sont dus à des problèmes de qualité non détectés à temps",
    },
    {
      value: "5%",
      text: "Du budget d'un projet est perdu à cause des défauts et reprises de travaux",
    },
    {
      value: "80%",
      text: "Des entreprises du BTP utilisent encore des processus manuels inefficaces",
    },
  ]

  return (
    <section className="bg-[#FDE8D8] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Défis du contrôle qualité dans le BTP tunisien
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Le secteur de la construction en Tunisie fait face à des défis majeurs en matière de contrôle qualité. 
            Les méthodes traditionnelles ne répondent plus aux exigences modernes de traçabilité, 
            de rapidité et de collaboration efficace entre les différents intervenants du chantier.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-[#DC2626] mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {problem.text}
              </p>
            </div>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8 text-center"
            >
              <p className="text-5xl font-bold text-[#DC2626] mb-3">
                {stat.value}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
