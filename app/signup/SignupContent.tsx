"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type Step = "loading" | "success" | "error"

export default function SignupSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [step, setStep] = useState<Step>("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    async function finalize() {
      try {
        if (!sessionId) {
          throw new Error("Session Stripe manquante.")
        }

        const response = await fetch("/api/finalize-signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(
            data?.error || "Impossible de finaliser l'inscription."
          )
        }

        setStep("success")

        setTimeout(() => {
          router.replace("/dashboard")
        }, 3000)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue."
        )

        setStep("error")
      }
    }

    finalize()
  }, [router, sessionId])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">

        {step === "loading" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Validation en cours
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              Nous finalisons votre inscription...
            </p>
          </>
        )}

        {step === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center shadow-inner">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Inscription réussie 🎉
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              Redirection vers votre dashboard...
            </p>
          </>
        )}

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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-red-600">
              Une erreur est survenue
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              {error}
            </p>

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
 