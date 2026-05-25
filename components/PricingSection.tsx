import Link from "next/link"

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-100 py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Tarifs PI-PROJECT - Solution BTP Tunisie
        </h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
          Choisissez la solution qui correspond parfaitement à vos besoins
          et à la taille de votre entreprise BTP. Toutes nos offres incluent
          un support technique complet et des mises à jour régulières.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte Gratuit */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
          <h2 className="text-xl font-bold text-center text-slate-800">
            Projet Gratuit BTP
          </h2>
          <p className="text-sm text-center text-gray-500 mt-1">
            Pour découvrir notre solution
          </p>
          <p className="text-5xl font-bold text-center text-slate-800 mt-4">
            Gratuit
          </p>
          <div className="mt-1 mb-6 h-5" />
          <ul className="space-y-3 flex-1">
            {[
              "Un seul utilisateur",
              "Fonctionnalités de base",
              "Support par email",
              "1 projet actif",
            ].map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <CheckIcon /> {f}
              </li>
            ))}
          </ul>

          <Link href="/signup/free" className="mt-6 w-full py-3 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition text-center">
            Continuer gratuitement
          </Link>

        </div>

        {/* Carte Populaire */}
        <div className="bg-white rounded-2xl border-2 border-orange-400 p-8 flex flex-col relative">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-semibold px-4 py-1 rounded-full">
            Populaire
          </span>
          <h2 className="text-xl font-bold text-center text-slate-800">
            Entreprise Cloud BTP
          </h2>
          <p className="text-sm text-center text-gray-500 mt-1">
            Pour les équipes en croissance
          </p>
          <p className="text-5xl font-bold text-center text-orange-400 mt-4">
            30 TND
          </p>
          <p className="text-sm text-center text-gray-500 mt-1 mb-6">
            par mois / utilisateur
          </p>
          <ul className="space-y-3 flex-1">
            {[
              "Projets illimités",
              "Jusqu'à 5 utilisateurs",
              "Support prioritaire",
              "Rapports avancés et analytics",
              "Intégrations API",
            ].map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <CheckIcon /> {f}
              </li>
            ))}
          </ul>

          <Link href="/signup/pro" className="mt-6 w-full py-3 rounded-lg bg-orange-400 text-white text-sm font-medium hover:bg-orange-500 transition text-center !text-white">
            Payer seulement
          </Link>

        </div>

        {/* Carte On Premise */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
          <h2 className="text-xl font-bold text-center text-slate-800">
            On Premise BTP
          </h2>
          <p className="text-sm text-center text-gray-500 mt-1">
            Pour les grandes entreprises
          </p>
          <p className="text-5xl font-bold text-center text-slate-800 mt-4">
            5000 TND
          </p>
          <p className="text-sm text-center text-gray-500 mt-1 mb-6">
            par an
          </p>
          <ul className="space-y-3 flex-1">
            {[
              "Projets illimités",
              "Utilisateurs illimités",
              "Installation sur vos serveurs",
              "Support dédié 24/7",
              "Personnalisation complète",
            ].map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <CheckIcon /> {f}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full py-3 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition">
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="1.5" />
      <path
        d="M6 10l3 3 5-5"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
