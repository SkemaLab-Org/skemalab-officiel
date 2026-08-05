import { NextResponse } from "next/server";
import {
  isGoogleFormConfigured,
  submitToGoogleForm,
} from "@/lib/googleForm";
import { validateContactInput } from "@/lib/contactValidation";
import { checkRateLimit } from "@/lib/rateLimit";

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!host) return false;

  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  // Same-origin navigations / some clients n’envoient que Referer
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return new URL(referer).host === host;
  } catch {
    return false;
  }
}

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origine non autorisée" }, { status: 403 });
  }

  if (!isGoogleFormConfigured()) {
    return NextResponse.json(
      { error: "Service temporairement indisponible" },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  // Honeypot anti-bot
  if (String(body.website || "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(request);
  const limit = checkRateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "Trop de demandes. Réessayez plus tard.",
        retryAfterSec: limit.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      },
    );
  }

  const parsed = validateContactInput(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: "Champs invalides", fields: parsed.errors },
      { status: 400 },
    );
  }

  try {
    await submitToGoogleForm(parsed.values);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Échec de l’envoi" }, { status: 502 });
  }
}
