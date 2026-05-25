import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const apiBaseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL

    if (!apiBaseUrl) {
      return NextResponse.json(
        { error: "API_BASE_URL manquante." },
        { status: 500 }
      )
    }

    let body: any
    try {
      body = await request.json()
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
    const password = body?.password || ""
    const confirmPassword = body?.confirmPassword || ""
    const seats = Number(body?.seats || 1)
    const plan = body?.plan || ""

    if (!firstName || !lastName || !companyName || !jobTitle || !email || !phone) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Les mots de passe ne correspondent pas." },
        { status: 400 }
      )
    }

    if (!Number.isFinite(seats) || seats < 1) {
      return NextResponse.json(
        { error: "Le nombre d'utilisateurs doit être au minimum de 1." },
        { status: 400 }
      )
    }

    if (plan !== "free") {
      return NextResponse.json(
        { error: "Plan invalide pour cette route." },
        { status: 400 }
      )
    }

    const payload = {
      firstname: firstName,
      lastname: lastName,
      function: jobTitle,
      email,
      phone,
      password,
      companyName,
      seats,
      subscriptionData: {
        plan: "free",
        type: "free",
        status: "active",
      },
    }

    const backendResponse = await fetch(`${apiBaseUrl}/users/register-free`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const rawText = await backendResponse.text()
    const contentType = backendResponse.headers.get("content-type") || ""

    let backendData: any = null

    if (contentType.includes("application/json")) {
      try {
        backendData = JSON.parse(rawText)
      } catch {
        return NextResponse.json(
          { error: "JSON invalide depuis le backend.", raw: rawText.slice(0, 300) },
          { status: 500 }
        )
      }
    } else {
      return NextResponse.json(
        { error: "Le backend ne retourne pas du JSON.", raw: rawText.slice(0, 300) },
        { status: 500 }
      )
    }

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          error:
            backendData?.message ||
            backendData?.error ||
            "Impossible de créer le compte gratuit.",
          backendResponse: backendData,
        },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json({
      success: true,
      data: backendData,
    })
  } catch (error) {
    console.error("🔴 [register-free] Unexpected error:", error)
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    )
  }
}
