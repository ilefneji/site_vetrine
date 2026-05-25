import { Award, TrendingUp, Users } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Excellence Technique BTP",
    description:
      "Notre équipe combine une expertise technique de pointe avec une connaissance approfondie des réalités du terrain dans le secteur BTP tunisien.",
  },
  {
    icon: TrendingUp,
    title: "Innovation Construction Continue",
    description:
      "Nous investissons constamment dans la recherche et développement pour anticiper les besoins futurs de l'industrie et proposer des solutions avant-gardistes.",
  },
  {
    icon: Users,
    title: "Approche Collaborative BTP",
    description:
      "Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs défis spécifiques et adapter notre solution à leurs besoins exacts.",
  },
]

export function ValuesSection() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nos <span className="text-[#E07B2A]">Valeurs</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Les principes qui guident notre mission
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-6 py-10 text-center transition-shadow hover:shadow-lg"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E07B2A]/10">
                <value.icon className="h-8 w-8 text-[#E07B2A]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">{value.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
