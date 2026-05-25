import Image from "next/image"

export function RoiSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ROI et bénéfices mesurables BTP
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Des résultats mesurables et immédiats qui transforment votre rentabilité.
            Nos clients constatent des améliorations significatives dès les premières
            semaines d&apos;utilisation.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-[70%] relative h-[380px] rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/roi-chart.jpg"
              alt="Graphique à barres empilées montrant les bénéfices ROI"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
