import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
async function createTNDPrice() {
  // Step 1 — Get your existing price to copy product info
  const existingPrice = await stripe.prices.retrieve(
    process.env.STRIPE_PRICE_PRO_MONTHLY_ID || "price_1TNgjYK6pPTHGbrzXSB5aMSj"
  )

  console.log("✅ Existing price found:")
  console.log("   Currency   :", existingPrice.currency)
  console.log("   Amount     :", existingPrice.unit_amount)
  console.log("   Product    :", existingPrice.product)
  console.log("   Interval   :", existingPrice.recurring?.interval)

  // Step 2 — Create a new price in TND on the same product
  const tndPrice = await stripe.prices.create({
    currency: "tnd",
    unit_amount: 29000,          // ⚠️ 29.000 TND (TND uses 3 decimals × 1000)
    recurring: {
      interval: existingPrice.recurring?.interval || "month",
    },
    product: existingPrice.product as string,
    nickname: "Pro Monthly TND",
    metadata: {
      currency: "TND",
      plan: "pro",
      interval: "monthly",
    },
  })

  console.log("\n🎉 New TND Price created!")
  console.log("   Price ID   :", tndPrice.id)
  console.log("   Currency   :", tndPrice.currency)
  console.log("   Amount     :", tndPrice.unit_amount, "→", (tndPrice.unit_amount! / 1000).toFixed(3), "TND")
  console.log("\n📋 Add this to your .env:")
  console.log(`   STRIPE_PRICE_PRO_MONTHLY_TND_ID=${tndPrice.id}`)
}

createTNDPrice().catch(console.error)
