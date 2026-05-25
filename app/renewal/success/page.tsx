import Stripe from "stripe"

type Props = {
  searchParams: Promise<{
    subscriptionId?: string
    session_id?: string
  }>
}

const USD_TO_TND_RATE = 1

function convertToTND(amountInUsdCents: number): number {
  const usd = amountInUsdCents / 100
  const tnd = usd * USD_TO_TND_RATE
  return Number(tnd.toFixed(3))
}

export default async function RenewalSuccessPage({ searchParams }: Props) {
  const params = await searchParams

  const subscriptionId = Number(params.subscriptionId)
  const sessionId = params.session_id || ""

  let success = false
  let message = "Votre paiement n’a pas pu être confirmé."

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL

    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY manquante.")
    }

    if (!apiBaseUrl) {
      throw new Error("API_BASE_URL manquante.")
    }

    if (!Number.isFinite(subscriptionId) || !sessionId) {
      throw new Error("Paramètres de renouvellement manquants.")
    }

    const stripe = new Stripe(stripeSecretKey)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "invoice"],
    })

    if (!["paid", "no_payment_required"].includes(session.payment_status)) {
      throw new Error("Paiement non confirmé.")
    }

    const stripeCustomerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id || null

    const stripeSubscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id || null

    const stripeInvoiceId =
      typeof session.invoice === "string"
        ? session.invoice
        : session.invoice?.id || null

    let stripeSubscription: Stripe.Subscription | null = null

    if (session.subscription && typeof session.subscription !== "string") {
      stripeSubscription = session.subscription as Stripe.Subscription
    } else if (stripeSubscriptionId) {
      stripeSubscription =
        await stripe.subscriptions.retrieve(stripeSubscriptionId)
    }

    const billingInterval =
      stripeSubscription?.items?.data?.[0]?.price?.recurring?.interval || "month"

    const stripePriceId =
      stripeSubscription?.items?.data?.[0]?.price?.id || null

    const currentPeriodStart =
      // @ts-ignore
      stripeSubscription?.current_period_start
        // @ts-ignore
        ? new Date(stripeSubscription.current_period_start * 1000).toISOString()
        : new Date().toISOString()

    const currentPeriodEnd =
      // @ts-ignore
      stripeSubscription?.current_period_end
        // @ts-ignore
        ? new Date(stripeSubscription.current_period_end * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    const amountPaidTND = convertToTND(session.amount_total ?? 0)

    const confirmResponse = await fetch(
      `${apiBaseUrl}/subscriptions/public/${subscriptionId}/confirm-renewal`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-secret":
            process.env.INTERNAL_API_SECRET || "",
        },
        cache: "no-store",
        body: JSON.stringify({
          plan: "pro",
          type: "stripe",
          status: "active",
          paymentStatus: session.payment_status,
          billingInterval,
          currentPeriodStart,
          currentPeriodEnd,
          paymentDate: new Date().toISOString(),

          currency: "TND",
          amountPaid: amountPaidTND,
          priceTotal: amountPaidTND,
          pricePerSeat: amountPaidTND,

          stripeSessionId: session.id,
          stripeCustomerId,
          stripeSubscriptionId,
          stripeInvoiceId,
          stripePriceId,
        }),
      }
    )

    if (!confirmResponse.ok) {
      const raw = await confirmResponse.text()
      throw new Error(raw)
    }

    success = true
    message = "Votre abonnement a été renouvelé avec succès."
  } catch (error) {
    console.error("🔴 [renewal success]", error)
    message =
      error instanceof Error
        ? error.message
        : "Erreur lors de la confirmation du paiement."
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-800">
          {success ? "Paiement confirmé" : "Paiement non finalisé"}
        </h1>

        <p className="text-slate-500 mt-3">{message}</p>

        <a
          href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "/dashboard"}
          className="inline-flex mt-6 rounded-xl bg-orange-400 px-5 py-3 text-white font-semibold hover:bg-orange-500"
        >
          Retour au tableau de bord
        </a>
      </div>
    </main>
  )
}