import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
//app/api/finalize-pro-signup/route.ts
export const runtime = "nodejs"

// ──────────────────────────────────────────────────────────
//  USD → TND conversion rate
//  Update this value periodically to match real exchange rate
//  Current rate: 1 USD ≈ 3.100 TND (April 2026)
// ──────────────────────────────────────────────────────────
const USD_TO_TND_RATE = 1.0

function convertToTND(amountInUsdCents: number): number {
  const usd = amountInUsdCents / 100
  const tnd = usd * USD_TO_TND_RATE
  return Number(tnd.toFixed(3)) // TND always 3 decimals
}

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY manquante." },
        { status: 500 }
      )
    }

    if (!apiBaseUrl) {
      return NextResponse.json(
        { error: "API_BASE_URL manquante." },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeSecretKey)

    let body: any
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: "Body JSON invalide." },
        { status: 400 }
      )
    }

    const sessionId   = body?.sessionId?.trim?.()           || ""
    const firstName   = body?.firstName?.trim?.()           || ""
    const lastName    = body?.lastName?.trim?.()            || ""
    const companyName = body?.companyName?.trim?.()         || ""
    const jobTitle    = body?.jobTitle?.trim?.()            || ""
    const email       = body?.email?.trim?.().toLowerCase?.() || ""
    const phone       = body?.phone?.trim?.()               || ""
    const password    = body?.password                      || ""
    const seats       = Number(body?.seats || 1)

    const missingFields: string[] = []
    if (!sessionId)   missingFields.push("sessionId")
    if (!firstName)   missingFields.push("firstName")
    if (!lastName)    missingFields.push("lastName")
    if (!companyName) missingFields.push("companyName")
    if (!jobTitle)    missingFields.push("jobTitle")
    if (!email)       missingFields.push("email")
    if (!phone)       missingFields.push("phone")
    if (!password)    missingFields.push("password")

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Données incomplètes.", missingFields },
        { status: 400 }
      )
    }

    // ── Retrieve Stripe Session ───────────────────────────
    let session: Stripe.Checkout.Session
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["subscription", "invoice"],
      })
    } catch (error) {
      console.error("🔴 [finalize] Stripe retrieve error:", error)
      return NextResponse.json(
        { error: "Impossible de récupérer la session Stripe." },
        { status: 500 }
      )
    }

    if (!["paid", "no_payment_required"].includes(session.payment_status)) {
      return NextResponse.json(
        {
          error: "Paiement non confirmé.",
          paymentStatus: session.payment_status,
        },
        { status: 400 }
      )
    }

    // ── Extract IDs ───────────────────────────────────────
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

    const stripePaymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : null

    // ── Retrieve Subscription ─────────────────────────────
    let stripeSubscription: Stripe.Subscription | null = null

    if (session.subscription && typeof session.subscription !== "string") {
      stripeSubscription = session.subscription as Stripe.Subscription
    } else if (stripeSubscriptionId) {
      try {
        stripeSubscription =
          await stripe.subscriptions.retrieve(stripeSubscriptionId)
      } catch (error) {
        console.error("🔴 [finalize] Subscription retrieve error:", error)
      }
    }

    const subscriptionStatus = stripeSubscription?.status || "active"
    const cancelAtPeriodEnd  = stripeSubscription?.cancel_at_period_end ?? false
    const billingInterval    =
      stripeSubscription?.items?.data?.[0]?.price?.recurring?.interval || "month"
    const stripePriceId      =
      stripeSubscription?.items?.data?.[0]?.price?.id || null
    const quantityFromStripe =
      stripeSubscription?.items?.data?.[0]?.quantity ?? seats

    // ── Currency: Stripe uses USD, we display TND ─────────
    const stripeAmountTotal   = session.amount_total ?? 0      // in cents (USD)
    const unitAmountRaw       =
      stripeSubscription?.items?.data?.[0]?.price?.unit_amount ?? null

    // Raw USD values (what Stripe actually charged)
    const amountPaidUSD   = Number((stripeAmountTotal / 100).toFixed(2))
    const pricePerSeatUSD = unitAmountRaw !== null
      ? Number((unitAmountRaw / 100).toFixed(2))
      : null

    // Converted TND values (for display & storage)
    const amountPaidTND   = convertToTND(stripeAmountTotal)
    const pricePerSeatTND = unitAmountRaw !== null
      ? convertToTND(unitAmountRaw)
      : null

    // ── Periods ───────────────────────────────────────────
    const currentPeriodStart =
      // @ts-ignore
      stripeSubscription?.current_period_start
        // @ts-ignore
        ? new Date(stripeSubscription.current_period_start * 1000).toISOString()
        : null

    const currentPeriodEnd =
      // @ts-ignore
      stripeSubscription?.current_period_end
        // @ts-ignore
        ? new Date(stripeSubscription.current_period_end * 1000).toISOString()
        : null

    const trialEndsAt = stripeSubscription?.trial_end
      ? new Date(stripeSubscription.trial_end * 1000).toISOString()
      : null

    const paymentDate = new Date(
      (session.created ?? Math.floor(Date.now() / 1000)) * 1000
    ).toISOString()

    // ── Billing Address ───────────────────────────────────
    const rawAddress     = session.customer_details?.address
    const billingAddress = rawAddress
      ? {
          line1      : rawAddress.line1       || null,
          line2      : rawAddress.line2       || null,
          city       : rawAddress.city        || null,
          state      : rawAddress.state       || null,
          postalCode : rawAddress.postal_code || null,
          country    : rawAddress.country     || null,
        }
      : null

    const billingCountry = billingAddress?.country || null
    const billingEmail   = session.customer_details?.email?.toLowerCase() || email

    const now   = new Date()
    const month = now.getMonth() + 1
    const year  = now.getFullYear()

    // ── Build Payload ─────────────────────────────────────
    const registerPayload = {
      firstname  : firstName,
      lastname   : lastName,
      function   : jobTitle,
      email,
      phone,
      password,
      companyName,
      seats,
      stripeCustomerId,
      stripeSessionId: session.id,
      subscriptionData: {
        plan              : "pro",
        type              : "stripe",
        status            : subscriptionStatus,
        seats             : quantityFromStripe,
        month,
        year,
        billingInterval,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd,
        trialEndsAt,

        // ✅ Store TND as display currency
        currency          : "TND",
        amountPaid        : amountPaidTND,        // e.g. 93.000 TND
        pricePerSeat      : pricePerSeatTND,      // e.g. 93.000 TND
        priceTotal        : amountPaidTND,

        // ✅ Also store original USD for accounting
        currencyStripe    : "USD",
        amountPaidUSD,                            // e.g. 30.00 USD
        pricePerSeatUSD,                          // e.g. 30.00 USD
        conversionRate    : USD_TO_TND_RATE,      // e.g. 3.1

        paymentDate,
        paymentStatus     : session.payment_status,
        stripeSubscriptionId,
        stripeSessionId   : session.id,
        stripeCustomerId,
        stripeInvoiceId,
        stripePriceId,
        stripePaymentIntentId,
        billingEmail,
        billingCountry,
        billingAddress,
      },
    }

    // ── Call Backend ──────────────────────────────────────
    const registerResponse = await fetch(`${apiBaseUrl}/users/register-pro`, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify(registerPayload),
      cache  : "no-store",
    })

    const rawText     = await registerResponse.text()
    const contentType = registerResponse.headers.get("content-type") || ""

    let registerData: any = null

    if (contentType.includes("application/json")) {
      try {
        registerData = JSON.parse(rawText)
      } catch {
        return NextResponse.json(
          {
            error: "JSON invalide depuis le backend.",
            raw  : rawText.slice(0, 300),
          },
          { status: 500 }
        )
      }
    } else {
      return NextResponse.json(
        {
          error: "Le backend ne retourne pas du JSON.",
          raw  : rawText.slice(0, 300),
        },
        { status: 500 }
      )
    }

    if (!registerResponse.ok) {
      return NextResponse.json(
        {
          error:
            registerData?.message ||
            registerData?.error    ||
            "Inscription impossible.",
          backendResponse: registerData,
        },
        { status: registerResponse.status }
      )
    }

    return NextResponse.json({ success: true, data: registerData })

  } catch (error) {
    console.error("🔴 [finalize] Unexpected error:", error)
    return NextResponse.json(
      { error: "Erreur serveur lors de la finalisation." },
      { status: 500 }
    )
  }
}
