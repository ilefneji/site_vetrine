"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

type PlanType = "free" | "pro"

type Props = {
  plan: PlanType
}

const plans = {
  free: {
    title      : "Projet Gratuit BTP",
    price      : "Gratuit",
    description: "Idéal pour découvrir la plateforme",
    buttonText : "Continuer gratuitement",
  },
  pro: {
    title      : "Entreprise Cloud BTP",
    price      : "30 TND / mois / utilisateur",
    description: "Pour les équipes en croissance",
    buttonText : "Payer",
  },
}

export default function SignupForm({ plan }: Props) {
  const router      = useRouter()
  const selectedPlan = plans[plan]

  const [formData, setFormData] = useState({
    firstName      : "",
    lastName       : "",
    companyName    : "",
    jobTitle       : "",
    email          : "",
    phone          : "",
    password       : "",
    confirmPassword: "",
  })

  const [loading,  setLoading ] = useState(false)
  const [error,    setError   ] = useState("")
  const [canceled, setCanceled] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const url = new URL(window.location.href)
    setCanceled(url.searchParams.get("canceled") === "true")

    if (plan !== "pro") return

    const pendingSignup = sessionStorage.getItem("pendingProSignup")
    if (!pendingSignup) return

    try {
      const parsed = JSON.parse(pendingSignup)
      setFormData((prev) => ({
        ...prev,
        firstName      : parsed.firstName   || "",
        lastName       : parsed.lastName    || "",
        companyName    : parsed.companyName || "",
        jobTitle       : parsed.jobTitle    || "",
        email          : parsed.email       || "",
        phone          : parsed.phone       || "",
        password       : parsed.password    || "",
        confirmPassword: parsed.password    || "",
      }))
    } catch {
      console.error("Invalid pendingProSignup in sessionStorage")
    }
  }, [plan])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit() {
    if (loading) return

    setError("")
    setLoading(true)

    try {
      const firstName   = formData.firstName.trim()
      const lastName    = formData.lastName.trim()
      const companyName = formData.companyName.trim()
      const jobTitle    = formData.jobTitle.trim()
      const email       = formData.email.trim().toLowerCase()
      const phone       = formData.phone.trim()

      // ── Validations ─────────────────────────────────────────────────────
      if (!firstName)   throw new Error("Veuillez saisir le prénom.")
      if (!lastName)    throw new Error("Veuillez saisir le nom.")
      if (!companyName) throw new Error("Veuillez saisir le nom de l'entreprise.")
      if (!jobTitle)    throw new Error("Veuillez saisir votre fonction.")
      if (!email)       throw new Error("Veuillez saisir un email valide.")
      if (!phone)       throw new Error("Veuillez saisir un numéro de téléphone.")
      if (!formData.password || formData.password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères.")
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas.")
      }

      // ── Free Plan ────────────────────────────────────────────────────────
      if (plan === "free") {
        const response = await fetch("/api/register-free", {
          method : "POST",
          headers: { "Content-Type": "application/json" },
          body   : JSON.stringify({
            firstName,
            lastName,
            companyName,
            jobTitle,
            email,
            phone,
            password       : formData.password,
            confirmPassword: formData.confirmPassword,
            plan           : "free",
          }),
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(data?.error || "Impossible de créer le compte gratuit.")
        }

        router.push("/dashboard?plan=free")
        return
      }

      // ── Pro Plan → Save pending signup ───────────────────────────────────
      sessionStorage.setItem(
        "pendingProSignup",
        JSON.stringify({
          firstName,
          lastName,
          companyName,
          jobTitle,
          email,
          phone,
          password: formData.password,
          plan    : "pro",
        })
      )

      // ── Pro Plan → Create Stripe Checkout ────────────────────────────────
      const checkoutResponse = await fetch("/api/create-checkout-session", {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({
          firstName,
          lastName,
          companyName,
          jobTitle,
          email,
          phone,
          seats: 1,       // ✅ Always 1 — silent, not from form
          plan : "pro",
        }),
      })

      const checkoutData = await checkoutResponse.json().catch(() => null)

      if (!checkoutResponse.ok) {
        throw new Error(
          checkoutData?.error || "Impossible de lancer le paiement."
        )
      }

      if (!checkoutData?.url) {
        throw new Error("URL Stripe manquante.")
      }

      window.location.assign(checkoutData.url)

    } catch (err) {
      console.error("Signup submit error:", err)
      setError(err instanceof Error ? err.message : "Une erreur est survenue.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Back link ───────────────────────────────────────────────────── */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700 transition"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Form ──────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-slate-800">
              {plan === "free" ? "Accès gratuit" : "Finaliser votre inscription"}
            </h1>

            <p className="text-slate-500 mt-2">
              Renseignez vos informations pour continuer avec PI-PROJECT.
            </p>

            {canceled && plan === "pro" && (
              <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
                Le paiement a été annulé. Vous pouvez réessayer.
              </div>
            )}

            <div className="mt-8 space-y-5">

              {/* Prénom + Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="..."
                  />
                </div>
              </div>

              {/* Entreprise */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                 Organisme
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="..."
                />
              </div>

              {/* Fonction */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Poste 
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="..."
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email professionnel
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="..."
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="..."
                />
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Minimum 6 caractères"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Retapez le mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-xl bg-orange-400 text-white py-3 font-semibold hover:bg-orange-500 transition disabled:opacity-70"
              >
                {loading ? "Chargement..." : selectedPlan.buttonText}
              </button>

            </div>
          </div>

          {/* ── Right: Plan Summary ──────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <span className="inline-flex px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
              Plan sélectionné
            </span>

            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              {selectedPlan.title}
            </h2>

            <p className="text-slate-500 mt-2">{selectedPlan.description}</p>

            <div className="mt-6 text-4xl font-bold text-slate-800">
              {selectedPlan.price}
            </div>

            {plan === "pro" && (
              <div className="mt-4 text-sm text-slate-600">
                Total estimé :
                <span className="font-semibold text-slate-800 ml-1">
                  30 TND / mois
                </span>
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-6">
              <ul className="space-y-3 text-sm text-slate-600">
                <li>✓ Formulaire complet avant paiement</li>
                <li>✓ Mot de passe saisi avant Stripe</li>
                <li>✓ Collecte des infos entreprise + contact principal</li>
                <li>✓ Flux séparé entre gratuit et pro</li>
              </ul>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
              {plan === "free"
                ? "Le plan gratuit crée directement un compte."
                : "Le plan Pro redirige vers Stripe après validation du formulaire."}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
