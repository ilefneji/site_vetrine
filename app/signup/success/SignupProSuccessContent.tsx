"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignupProSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [error, setError] = useState("")
  const [message, setMessage] = useState("Validation du paiement...")

  useEffect(() => {
    async function finalize() {
      try {
        if (!sessionId) {
          throw new Error("Session Stripe manquante.")
        }

        const pendingSignup = sessionStorage.getItem("pendingProSignup")
        if (!pendingSignup) {
          throw new Error("Aucune inscription Pro en attente.")
        }

        const signupData = JSON.parse(pendingSignup)

        const response = await fetch("/api/finalize-pro-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            ...signupData,
          }),
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(
            data?.error || "Impossible de finaliser l'inscription Pro."
          )
        }

        sessionStorage.removeItem("pendingProSignup")
        setMessage("Paiement confirmé. Redirection...")

        router.replace("/dashboard?plan=pro")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue.")
      }
    }

    finalize()
  }, [router, sessionId])

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        {!error ? (
          <>
            <h1 className="text-2xl font-bold text-slate-800">
              Finalisation en cours
            </h1>
            <p className="text-slate-500 mt-3">{message}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600">Erreur</h1>
            <p className="text-slate-600 mt-3">{error}</p>
          </>
        )}
      </div>
    </main>
  )
}