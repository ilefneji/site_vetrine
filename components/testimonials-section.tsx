import { Star } from "lucide-react"

const testimonials = [
  {
    title: "Révolution pour notre entreprise BTP",
    quote:
      "PI-PROJECT a complètement transformé notre façon de gérer les inspections. Nous avons réduit nos délais de 40% et éliminé pratiquement toutes les erreurs de documentation.",
    author: "Ahmed Ben Salem",
    role: "Directeur Technique, BTP Construct Sfax",
  },
  {
    title: "Interface intuitive pour BTP",
    quote:
      "Nos équipes ont adopté PI-PROJECT en quelques jours seulement. L'interface est si intuitive que même nos ouvriers les moins familiers avec la technologie l'utilisent sans problème.",
    author: "Fatma Trabelsi",
    role: "Chef de Projet, Méditerranée Construction",
  },
  {
    title: "ROI impressionnant construction",
    quote:
      "L'investissement dans PI-PROJECT s'est amorti en moins de 3 mois. La réduction des reprises et l'amélioration de la qualité ont considérablement augmenté notre rentabilité.",
    author: "Karim Mansouri",
    role: "PDG, Tunisie Bâtiment Plus",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Témoignages clients BTP Tunisie
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez comment PI-PROJECT transforme concrètement le quotidien
            des professionnels du BTP en Tunisie
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#E07B2A] text-[#E07B2A]"
                  />
                ))}
              </div>

              {/* Quote Title */}
              <h3 className="text-base font-bold text-gray-900 mb-3">
                {testimonial.title}
              </h3>

              {/* Quote */}
              <p className="text-sm text-gray-600 italic mb-6 flex-grow">
                {`"${testimonial.quote}"`}
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
