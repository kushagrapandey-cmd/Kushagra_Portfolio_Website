"use client";

import { useState, type FormEvent } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactResponse = {
  success?: boolean;
  message?: string;
};

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");
    setStatusMessage("");

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      pageUrl: window.location.href,
    };

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
        throw new Error(result?.message || "Message could not be sent.");
      }

      form.reset();
      setSubmitState("success");
      setStatusMessage("Message sent successfully. Thanks for reaching out.");
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(
        error instanceof Error && error.message
          ? error.message
          : "Message could not be sent right now. Please use the email link instead.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form-row">
        <label className="form-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" maxLength={80} required />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={120} required />
        </label>
      </div>

      <label className="form-field">
        <span>Short message</span>
        <textarea
          name="message"
          rows={6}
          maxLength={700}
          placeholder="Role, project, collaboration or a quick hello..."
          required
        />
      </label>

      <div className="form-submit-row">
        <button
          className="button button-primary"
          type="submit"
          disabled={submitState === "submitting"}
        >
          {submitState === "submitting" ? "Sending..." : "Send message"}
        </button>
        <p>Your message goes to <strong>kushagrapandey102@gmail.com</strong>.</p>
      </div>

      <p
        className={`form-status form-status-${submitState}`}
        role={submitState === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {statusMessage}
      </p>
    </form>
  );
}
