const features = [
  {
    image: "/mobile-btp.png",
    title: "Application Mobile BTP",
    description:
      "Interface spécialement optimisée pour les inspections sur terrain avec fonctionnalités hors-ligne et synchronisation automatique.",
  },
  {
    image: "/equipe-btp.png",
    title: "Collaboration d'Équipe BTP",
    description:
      "Coordination parfaite entre tous les acteurs du projet avec partage d'informations en temps réel et communication centralisée.",
  },
]

export default function DemoSection() {
  return (
    <section id="demo" className="bg-[#fdf6f0] py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-3">
        Démo PI-PROJECT - Solution BTP Tunisie
      </h2>
      <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed mb-10">
        Visionnez notre démonstration interactive pour voir comment notre solution transforme
        concrètement vos inspections et améliore votre productivité au quotidien.
      </p>

      {/* Image container 
     <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden bg-amber-700">
        <img
          src="/demo-mockup.png"
          alt="Démo PI-PROJECT"
          className="w-full object-cover"
        />
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition">
            <PlayIcon />
            Voir la Démo Interactive
          </button>
        </div>
      </div>*/}


      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            <img
              src={f.image}
              alt={f.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polygon points="4,2 13,8 4,14" fill="white" />
    </svg>
  )
}
