"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary"
      data-state={pending ? "loading" : undefined}
      disabled={pending}
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);

  // Stamp when the form became interactive, so the action can reject
  // submissions that arrive impossibly fast. Written after mount because
  // Date.now() is impure and must not run during render.
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div className="notice" data-tone="accent" role="status">
        <p className="notice-title">Message sent</p>
        <p style={{ margin: 0 }}>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate style={{ display: "grid", gap: "var(--space-md)" }}>
      <input type="hidden" name="startedAt" ref={startedAt} defaultValue="" />

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p className="field-error" role="alert">
          {state.message}
        </p>
      )}

      <div className="field">
        <label className="field-label" htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          name="name"
          className="field-input"
          autoComplete="name"
          required
          aria-invalid={state.fieldErrors?.name ? "true" : undefined}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
        />
        {state.fieldErrors?.name && (
          <p className="field-error" id="name-error">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="field-input"
          autoComplete="email"
          required
          aria-invalid={state.fieldErrors?.email ? "true" : undefined}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <p className="field-error" id="email-error">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="message">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          className="field-input"
          rows={5}
          required
          style={{ resize: "vertical", minHeight: "8rem", lineHeight: 1.5 }}
          aria-invalid={state.fieldErrors?.message ? "true" : undefined}
          aria-describedby={
            state.fieldErrors?.message ? "message-error message-note" : "message-note"
          }
        />
        {state.fieldErrors?.message && (
          <p className="field-error" id="message-error">
            {state.fieldErrors.message}
          </p>
        )}
        <p className="field-note" id="message-note">
          Please don&rsquo;t include medical details, diagnoses or claim numbers here — email
          isn&rsquo;t a secure channel for health information. Call us for anything clinical.
        </p>
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
