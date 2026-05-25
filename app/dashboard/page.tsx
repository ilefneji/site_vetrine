export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-6">

        {/* ── Header card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
          {/* Logo / Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-orange-400 flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
            Compte Pro activé
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard PI-PROJECT
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-sm mx-auto">
            Votre compte a bien été créé. Vous pouvez maintenant accéder à la plateforme.
          </p>
        </div>

        {/* ── App links ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Return / Landing */}
          <a
            href="http://localhost:3005"
            className="group bg-white hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-2xl shadow-sm p-6 flex flex-col items-center gap-3 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7m-9 5v6h4v-6m-4 0H7m6 0h2" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-800 text-sm">Site principal</p>
              {/* ✅ port hidden — no raw URL shown */}
            </div>
            <span className="w-full rounded-xl bg-orange-400 text-white py-2.5 font-semibold hover:bg-orange-500 transition text-sm text-center">
              Accéder →
            </span>
          </a>

          {/* Dashboard app */}
          <a
            href="http://localhost:3003"
            className="group bg-white hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-2xl shadow-sm p-6 flex flex-col items-center gap-3 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-800 text-sm">Application Dashboard</p>
              {/* ✅ port hidden — no raw URL shown */}
            </div>
            <span className="w-full rounded-xl bg-orange-400 text-white py-2.5 font-semibold hover:bg-orange-500 transition text-sm text-center">
              Ouvrir →
            </span>
          </a>

        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-slate-400">
          PI-PROJECT © {new Date().getFullYear()} — Plateforme de gestion de projets
        </p>

      </div>
    </main>
  )
}
