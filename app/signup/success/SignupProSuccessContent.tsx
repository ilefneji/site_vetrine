"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type Step = "loading" | "success" | "error"

export default function SignupProSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [step, setStep] = useState<Step>("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    async function finalize() {
      try {
        if (!sessionId) throw new Error("Session Stripe manquante.")

        const pendingSignup = sessionStorage.getItem("pendingProSignup")
        if (!pendingSignup) throw new Error("Aucune inscription Pro en attente.")

        const signupData = JSON.parse(pendingSignup)

        const response = await fetch("/api/finalize-pro-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // ✅ fixed typo (was Content--Type)
          body: JSON.stringify({ sessionId, ...signupData }),
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(data?.error || "Impossible de finaliser l'inscription Pro.")
        }

        sessionStorage.removeItem("pendingProSignup")
        setStep("success")

        // ✅ Redirect after 3s so user sees the success screen
        setTimeout(() => {
          router.replace("/dashboard?plan=pro")
        }, 3000)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue.")
        setStep("error")
      }
    }

    finalize()
  }, [router, sessionId])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">

        {/* ── LOADING ── */}
        {step === "loading" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Validation en cours</h1>
            <p className="text-slate-500 mt-2 text-sm">
              Nous finalisons votre inscription, veuillez patienter…
            </p>
          </>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && (
          <>
            {/* Animated checkmark circle */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center shadow-inner">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Paiement confirmé
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Bienvenue sur PI-PROJECT Pro 🎉
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Votre abonnement est actif. Redirection vers votre dashboard dans quelques secondes…
            </p>

            {/* Progress bar */}
            <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 rounded-full animate-[grow_3s_linear_forwards]" />
            </div>

            <style jsx>{`
              @keyframes grow {
                from { width: 0% }
                to   { width: 100% }
              }
            `}</style>
          </>
        )}

        {/* ── ERROR ── */}
        {step === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center shadow-inner">
                <svg
                  className="w-10 h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-red-600">Une erreur est survenue</h1>
            <p className="text-slate-500 mt-2 text-sm">{error}</p>

            <button
              onClick={() => router.replace("/")}
              className="mt-6 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
            >
              ← Retour à l'accueil
            </button>
          </>
        )}

      </div>
    </main>
  )
}
