import { expect, test } from "@playwright/test";
import { POST } from "../app/api/contact/route";

const payload = {
  name: "Test Visitor",
  email: "visitor@example.com",
  message: "A contact message",
  requestId: "ea1c055b-362e-48f9-b0c0-3216b0561ea1",
};
const submission = () => new Request("https://portfolio.example/api/contact", {
  method: "POST",
  body: JSON.stringify(payload),
});

test("contact sends only to the configured owner and deduplicates retries", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "test-server-key";
  const requests: RequestInit[] = [];
  try {
    globalThis.fetch = async (url, init) => {
      expect(url).toBe("https://api.resend.com/emails");
      requests.push(init!);
      return Response.json({ id: "provider-message-id" });
    };
    expect((await POST(submission())).status).toBe(200);
    expect((await POST(submission())).status).toBe(200);
    const sent = JSON.parse(requests[0].body as string);
    expect(sent.to).toEqual([process.env.CONTACT_TO_EMAIL?.trim() || "kushagrapandey102@gmail.com"]);
    expect(sent.reply_to).toBe(payload.email);
    expect(sent.text).toContain(payload.message);
    expect(new Headers(requests[0].headers).get("Idempotency-Key")).toBe(new Headers(requests[1].headers).get("Idempotency-Key"));
    expect(requests[0].signal).toBeTruthy();
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  }
});

test("contact reports provider rejection and network timeout without leaking provider details", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "test-server-key";
  try {
    globalThis.fetch = async () => Response.json({ message: "Private provider detail" }, { status: 403 });
    const rejected = await POST(submission());
    expect(rejected.status).toBe(502);
    expect(await rejected.text()).not.toContain("Private provider detail");
    globalThis.fetch = async () => { throw new DOMException("Timeout", "TimeoutError"); };
    const timedOut = await POST(submission());
    expect(timedOut.status).toBe(502);
    expect((await timedOut.json()).code).toBe("EMAIL_PROVIDER_UNREACHABLE");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  }
});

test("contact explicitly fails when no delivery credential is configured", async () => {
  const originalKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const response = await POST(submission());
    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("EMAIL_NOT_CONFIGURED");
  } finally {
    if (originalKey !== undefined) process.env.RESEND_API_KEY = originalKey;
  }
});
