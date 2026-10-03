"use client";

import { useState, type FormEvent } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactResponse = {
  success?: boolean;
  message?: string;
  code?: string;
};

const destinationEmail = "kushagrapandey102@gmail.com";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [fallbackHref, setFallbackHref] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");
    setStatusMessage("");
    setFallbackHref("");

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      pageUrl: window.location.href,
    };

    const mailtoFallback =
      `mailto:${destinationEmail}?subject=${encodeURIComponent(
        `Portfolio message from ${payload.name || "website visitor"}`,
      )}&body=${encodeURIComponent(
        `Hi Kushagra,\n\n${payload.message}\n\nFrom: ${payload.name} (${payload.email})`,
      )}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (!response.ok || !result?.success) {
        setSubmitState("error");
        setFallbackHref(mailtoFallback);
        setStatusMessage(
          result?.code === "EMAIL_NOT_CONFIGURED"
            ? "Direct delivery needs one final server setting. You can still open a pre-filled email below."
            : result?.message || "Message could not be sent right now.",
        );
        return;
      }

      form.reset();
      setMessageLength(0);
      setSubmitState("success");
      setStatusMessage("Message sent successfully. It is now in my inbox.");
    } catch {
      setSubmitState("error");
      setFallbackHref(mailtoFallback);
      setStatusMessage(
        "The contact service could not be reached. You can still open a pre-filled email below.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={submitState === "submitting"}>
      <div className="contact-form-head">
        <div>
          <p className="contact-form-kicker">DIRECT MESSAGE / SECURE ROUTE</p>
          <h3>Send a note straight to my inbox.</h3>
        </div>
        <span className="contact-form-signal">
          <span className="contact-form-signal-dot" aria-hidden="true" />
          Inbox route
        </span>
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form-row">
        <label className="form-field">
          <span>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            placeholder="Your name"
            required
          />
        </label>
        <label className="form-field">
          <span>Email address</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <label className="form-field">
        <span className="form-label-row">
          <span>Short message</span>
          <small>{messageLength}/700</small>
        </span>
        <textarea
          name="message"
          rows={6}
          maxLength={700}
          placeholder="Role, project, collaboration or a quick hello..."
          onChange={(event) => setMessageLength(event.currentTarget.value.length)}
          required
        />
      </label>

      <div className="form-submit-row">
        <button
          className="button button-primary contact-submit-button"
          type="submit"
          disabled={submitState === "submitting"}
        >
          <span>{submitState === "submitting" ? "Sending..." : "Send message"}</span>
          <span className="contact-submit-arrow" aria-hidden="true">↗</span>
        </button>
        <p className="delivery-note">
          Server-side delivery to <strong>{destinationEmail}</strong>
        </p>
      </div>

      <p
        className={`form-status form-status-${submitState}`}
        role={submitState === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        <span>{statusMessage}</span>
        {submitState === "error" && fallbackHref ? (
          <a className="form-status-link" href={fallbackHref}>
            Open email app <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </p>
    </form>
  );
}
