export default function Home() {
  return (
    <div id="contact" className="flex flex-col">

      {/* HERO SECTION */}
      <section className="bg-orange-400 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Révolutionner le BTP tunisien avec PI-PROJECT
        </h1>

        <p className="max-w-3xl mx-auto text-lg mb-8">
          Rejoignez la révolution numérique du secteur BTP en Tunisie et découvrez
          comment PI-PROJECT peut transformer votre entreprise dès maintenant.
          Nos experts sont à votre disposition pour une démonstration personnalisée.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-orange-400 px-6 py-3 rounded-lg font-medium">
            Demander une démo gratuite
          </button>
          <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium">
            En savoir plus
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-300 px-10 py-12">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo + desc */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">
              PI-PROJECT
            </h2>
            <p className="text-sm mb-4">
              Révolutionner le suivi des inspections dans la construction en Tunisie
              grâce à l'innovation technologique et l'expertise locale.
            </p>
            <p className="text-sm">Support disponible 24/7</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solution BTP</h3>
            <ul className="space-y-2 text-sm">
              <li>Fonctionnalités inspection</li>
              <li>Intégrations BTP</li>
              <li>Sécurité données</li>
              <li>API Documentation</li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-white font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li>À propos PI-PROJECT</li>
              <li>Carrières BTP</li>
              <li>Blog construction</li>
              <li>Partenaires Tunisie</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Sfax</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 Sfax, Tunisie</li>
              <li>📧 contact@pi-project.tn</li>
              <li>📞 +216 99 999 999</li>
              <li>⏰ Lun-Ven: 8h-18h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © 2026 PI-PROJECT. Tous droits réservés. | Politique de confidentialité | Conditions d'utilisation
        </div>
      </footer>

    </div>
  );
}
