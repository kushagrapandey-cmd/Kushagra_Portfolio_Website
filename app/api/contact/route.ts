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

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
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

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid name, email and message." },
      { status: 400 },
    );
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
