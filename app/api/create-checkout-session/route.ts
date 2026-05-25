import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY manquante." },
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

    const firstName = body?.firstName?.trim?.() || ""
    const lastName = body?.lastName?.trim?.() || ""
    const companyName = body?.companyName?.trim?.() || ""
    const jobTitle = body?.jobTitle?.trim?.() || ""
    const email = body?.email?.trim?.().toLowerCase?.() || ""
    const phone = body?.phone?.trim?.() || ""
    const seats = Number(body?.seats || 0)

    const invalid = {
      firstName: !firstName,
      lastName: !lastName,
      companyName: !companyName,
      jobTitle: !jobTitle,
      email: !email,
      phone: !phone,
      seats: !Number.isFinite(seats) || seats < 1,
    }

    if (Object.values(invalid).some(Boolean)) {
      return NextResponse.json(
        { error: "Champs invalides.", missingOrInvalid: invalid },
        { status: 400 }
      )
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3005"

    // IMPORTANT:
    // If you really charge in TND and your Stripe setup supports it,
    // TND uses 3 decimals, so 30 TND = 30000 millimes.
    const currency = "usd"
    const unitAmount = 3000

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Plan Pro BTP — ${companyName}`,
              description: `${seats} licence(s) · Facturation mensuelle`,
            },
            recurring: { interval: "month" },
            unit_amount: unitAmount,
          },
          quantity: seats,
        },
      ],
      success_url: `${origin}/signup/pro/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/signup/pro?canceled=true`,
      metadata: {
        firstName,
        lastName,
        companyName,
        jobTitle,
        email,
        phone,
        seats: String(seats),
        plan: "pro",
      },
      subscription_data: {
        metadata: {
          firstName,
          lastName,
          companyName,
          jobTitle,
          email,
          phone,
          seats: String(seats),
          plan: "pro",
        },
      },
      billing_address_collection: "auto",
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("🔴 [create-checkout-session] Error:", error)
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de la session Stripe." },
      { status: 500 }
    )
  }
}
