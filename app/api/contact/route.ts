import { NextResponse } from "next/server";
import { createHash, randomUUID } from "node:crypto";

export const runtime = "nodejs";

const destinationEmail =
  process.env.CONTACT_TO_EMAIL?.trim() || "kushagrapandey102@gmail.com";

const fromEmail =
  process.env.RESEND_FROM_EMAIL?.trim() || "Kushagra Portfolio <onboarding@resend.dev>";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" && value.length <= maxLength ? value.trim() : "";
}

// A bounded per-instance delivery budget. Serverless instances do not share this
// state; this is defense in depth, not a distributed bot/rate-limit service.
let budget = { start: 0, used: 0 };
const MAX_BODY_BYTES = 8192;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ success: false, message: "Cross-site submission rejected." }, { status: 403 });
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ success: false, message: "Send JSON content." }, { status: 415 });
  }
  const declaredSize = Number(request.headers.get("content-length"));
  if (declaredSize > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, message: "Submission too large." }, { status: 413 });
  }
  let body: Record<string, unknown>;

  try {
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > MAX_BODY_BYTES) {
            await reader.cancel();
            return NextResponse.json({ success: false, message: "Submission too large." }, { status: 413 });
          }
          chunks.push(value);
        }
      } finally { reader.releaseLock(); }
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, unknown>;
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid form submission." },
      { status: 400 },
    );
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const message = clean(body.message, 700);
  const website = typeof body.website === "string" ? body.website.trim() : "";
  const pageUrl = clean(body.pageUrl, 500);
  const requestId = clean(body.requestId, 36);

  if (requestId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestId)) {
    return NextResponse.json({ success: false, message: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without sending anything.
  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message || !isValidEmail(email) || /[\r\n\x00]/.test(name + email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid name, email and message." },
      { status: 400 },
    );
  }

  const now = Date.now();
  if (now - budget.start >= 60_000) budget = { start: now, used: 0 };
  if (budget.used >= 20) {
    return NextResponse.json({ success: false, message: "Too many messages. Please try again shortly." }, { status: 429, headers: { "Retry-After": "60", "Cache-Control": "no-store" } });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        code: "EMAIL_NOT_CONFIGURED",
        message:
          "Direct email delivery is not configured on the server yet.",
      },
      { status: 503 },
    );
  }

  budget.used += 1;

  const emailBody = [
    "New portfolio contact message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    pageUrl ? `Page: ${pageUrl}` : "",
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Keep retries safe if the provider accepted a request before its response was lost.
        "Idempotency-Key": `contact-${requestId || randomUUID()}-${createHash("sha256").update(JSON.stringify({ name, email, message, pageUrl })).digest("hex")}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [destinationEmail],
        subject: `Portfolio message from ${name}`,
        text: emailBody,
        reply_to: email,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!providerResponse.ok) {
      console.error(
        "Contact email provider rejected the request:",
        providerResponse.status,
      );

      return NextResponse.json(
        {
          success: false,
          code: "EMAIL_PROVIDER_ERROR",
          message:
            "Email delivery is temporarily unavailable. Please try the email fallback.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("Contact email request failed or timed out.");

    return NextResponse.json(
      {
        success: false,
        code: "EMAIL_PROVIDER_UNREACHABLE",
        message:
          "Email delivery is temporarily unavailable. Please try the email fallback.",
      },
      { status: 502 },
    );
  }
}
