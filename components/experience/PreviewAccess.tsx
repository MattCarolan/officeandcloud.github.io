"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { APP_SIGN_IN_URL, PREVIEW_APPLICATION_URL } from "@/lib/config";
import styles from "./PreviewAccess.module.css";

const fields = [
  ["name", "Your name", "text", "name", 160],
  ["email", "Work email", "email", "email", 254],
  ["organization", "Organization", "text", "organization", 160],
] as const;

const requestError = "Your request could not be submitted. Please try again.";

export function PreviewAccess() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const requestRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);
  const mountedRef = useRef(false);
  const formDisabled = startedAt === null || busy || submitted;

  useEffect(() => {
    mountedRef.current = true;
    setStartedAt(Date.now());
    return () => {
      mountedRef.current = false;
      requestRef.current?.abort();
    };
  }, []);

  async function requestPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (startedAt === null || inFlightRef.current || submitted) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const application = Object.fromEntries(new FormData(form));
    const controller = new AbortController();
    requestRef.current = controller;
    inFlightRef.current = true;
    setBusy(true);
    setError("");

    try {
      const response = await fetch(PREVIEW_APPLICATION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...application, startedAt }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!mountedRef.current || controller.signal.aborted) return;
      if (!response.ok || result?.accepted !== true) {
        setError(
          typeof result?.error === "string" && result.error
            ? result.error
            : requestError,
        );
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch {
      if (mountedRef.current && !controller.signal.aborted)
        setError(requestError);
    } finally {
      inFlightRef.current = false;
      if (requestRef.current === controller) requestRef.current = null;
      if (mountedRef.current && !controller.signal.aborted) setBusy(false);
    }
  }

  return (
    <section
      id="preview"
      className={styles.preview}
      aria-labelledby="preview-heading"
    >
      <div className={styles.lightLine} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Request preview access</p>
          <h2 id="preview-heading">
            Know your AI agents.
            <br />
            <span>Own the decisions.</span>
          </h2>
          <p className={styles.intro}>
            Start with an enrolled device or a use case your team already knows
            about. Bring its purpose, owner, policies, risk and spend into view.
          </p>
          <p className={styles.signIn}>
            Already have access?{" "}
            <a href={APP_SIGN_IN_URL}>
              Sign in <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </p>
          <div className={styles.architecture} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={styles.formSurface}>
          <form
            method="post"
            onSubmit={requestPreview}
            className={styles.form}
            aria-busy={busy}
            aria-describedby="preview-form-purpose"
          >
            <p id="preview-form-purpose" className={styles.formPurpose}>
              Tell us a little about your team.
            </p>
            {fields.map(([name, label, type, autoComplete, maxLength]) => (
              <label key={name} className={styles.field}>
                <span>{label}</span>
                <input
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  required
                  disabled={formDisabled}
                />
              </label>
            ))}
            <label aria-hidden="true" className={styles.honeypot}>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <p className={styles.privacy}>
              We use these details to contact you about your preview request.
              Read the <Link href="/privacy/">Privacy Notice</Link> and{" "}
              <Link href="/terms/">Preview Terms</Link>.
            </p>
            <button
              type="submit"
              disabled={formDisabled}
              className={styles.submit}
            >
              <span>
                {busy
                  ? "Sending…"
                  : submitted
                    ? "Request received"
                    : "Request preview access"}
              </span>
              {busy ? (
                <LoaderCircle
                  className={styles.spinner}
                  size={18}
                  aria-hidden="true"
                />
              ) : submitted ? (
                <Check size={18} aria-hidden="true" />
              ) : (
                <ArrowUpRight size={18} aria-hidden="true" />
              )}
            </button>
            <div role="status" aria-live="polite" aria-atomic="true">
              {submitted && (
                <p className={styles.success}>
                  Thanks for requesting early access. Check your inbox for a
                  confirmation that we received your request.
                </p>
              )}
            </div>
            {error && (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            )}
            <noscript>
              <p className={styles.privacy}>
                Enable JavaScript to submit the form.
              </p>
            </noscript>
          </form>
        </div>
      </div>
    </section>
  );
}
