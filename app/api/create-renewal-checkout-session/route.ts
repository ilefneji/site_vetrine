import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Accept, Origin, X-Requested-With",
}

function json(data: any, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders,
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const stripePriceId = process.env.STRIPE_PRICE_ID || process.env.STRIPE_PRICE_PRO_MONTHLY_ID
    const authorization = req.headers.get("authorization")
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL

    if (!stripeSecretKey) {
      return json({ error: "STRIPE_SECRET_KEY manquante." }, 500)
    }

    if (!stripePriceId) {
      return json({ error: "STRIPE_PRICE_ID manquante." }, 500)
    }

    if (!siteUrl) {
      return json({ error: "NEXT_PUBLIC_SITE_URL manquante." }, 500)
    }

    if (!apiBaseUrl) {
      return json({ error: "API_BASE_URL manquante." }, 500)
    }

    const body = await req.json().catch(() => null)
    const subscriptionId = Number(body?.subscriptionId)

    if (!Number.isFinite(subscriptionId) || subscriptionId <= 0) {
      return json({ error: "subscriptionId invalide." }, 400)
    }

    const renewalDataResponse = await fetch(
      `${apiBaseUrl}/subscriptions/${subscriptionId}/renewal-data`,
      {
        cache: "no-store",
        headers: {
          ...(authorization
            ? { Authorization: authorization }
            : {}),
        },
      }
    )

    const renewalRawText = await renewalDataResponse.text()

    if (!renewalDataResponse.ok) {
      return json(
        {
          error: "Impossible de récupérer les données de renouvellement.",
          backendStatus: renewalDataResponse.status,
          backendResponse: renewalRawText.slice(0, 500),
        },
        renewalDataResponse.status
      )
    }

    let renewalData: any = null

    try {
      renewalData = JSON.parse(renewalRawText)
    } catch {
      return json(
        {
          error: "Réponse backend invalide.",
          raw: renewalRawText.slice(0, 500),
        },
        500
      )
    }

    const user = renewalData?.user
    const subscription = renewalData?.subscription

    if (!user?.email) {
      return json({ error: "Email utilisateur manquant." }, 400)
    }

    const stripe = new Stripe(stripeSecretKey)

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: subscription?.stripeCustomerId || undefined,
      customer_email: subscription?.stripeCustomerId ? undefined : user.email,
      line_items: [
        {
          price: stripePriceId,
          quantity: subscription?.seats || 1,
        },
      ],
      success_url:
        `${siteUrl}/renewal/success` +
        `?subscriptionId=${subscriptionId}` +
        `&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/dashboard?renewal=canceled`,
      metadata: {
        action: "renewal",
        subscriptionId: String(subscriptionId),
        userId: String(user?.id || ""),
      },
    })

    return json({ url: session.url }, 200)
  } catch (error: any) {
    console.error("🔴 [create-renewal-checkout-session]", {
      message: error?.message,
      type: error?.type,
      code: error?.code,
      raw: error,
    })

    return json(
      {
        error: error?.message || "Erreur serveur.",
        type: error?.type || null,
        code: error?.code || null,
      },
      500
    )
  }
}