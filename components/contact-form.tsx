"use client";

import { useState, type FormEvent } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const endpoint = "https://formsubmit.co/ajax/kushagrapandey102@gmail.com";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitState("submitting");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    payload._url = window.location.href;
    payload._subject = "Portfolio contact - Kushagra Pandey";
    payload._template = "table";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean | string; message?: string }
        | null;

      const rejected =
        !response.ok ||
        result?.success === false ||
        result?.success === "false";

      if (rejected) throw new Error(result?.message || "Form submission failed");

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form
      className="contact-form"
      action="https://formsubmit.co/kushagrapandey102@gmail.com"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="form-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
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
        {submitState === "success"
          ? "Message sent successfully. Thanks for reaching out."
          : submitState === "error"
            ? "Message could not be sent right now. Please use the email link instead."
            : ""}
      </p>
    </form>
  );
}
