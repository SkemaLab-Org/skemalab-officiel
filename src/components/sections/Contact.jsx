"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
import {
  CONTACT_LIMITS,
  validateContactInput,
} from "@/lib/contactValidation";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function Contact() {
  const { t } = useI18n();
  const copy = t.contactSection;
  const serviceOptions = [
    ...t.servicesList.map((s) => ({ value: s.id, label: s.title })),
    { value: "global", label: copy.globalService },
  ];
  const formId = useId();
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const form = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
    };

    const parsed = validateContactInput(form, { withMessages: true });
    setErrors(
      Object.fromEntries(
        Object.entries(parsed.errors).map(([field, code]) => [
          field,
          t.contactErrors[code] || code,
        ]),
      ),
    );
    if (!parsed.ok) return;

    const serviceLabel =
      serviceOptions.find((o) => o.value === form.service)?.label || form.service;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.values.name,
          company: parsed.values.company,
          email: parsed.values.email,
          phone: parsed.values.phone,
          service: serviceLabel,
          message: parsed.values.message,
          website: form.website,
        }),
      });

      if (res.status === 429) {
        setStatus("rate_limit");
        return;
      }
      if (res.status === 503) {
        setStatus("unavailable");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }

      formEl.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:gap-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
              <ContactRow
                icon={Mail}
                label={copy.emailLabel}
                href={`mailto:${contactInfo.email}`}
                value={contactInfo.email}
              />
              <ContactRow
                icon={Phone}
                label={copy.phoneLabel}
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                value={contactInfo.phone}
              />
              <ContactRow
                icon={MapPin}
                label={copy.locationLabel}
                value={contactInfo.locations.join(" · ")}
              />
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative overflow-hidden rounded-[3px] border border-line bg-surface p-5 shadow-[0_6px_20px_rgba(11,14,20,0.03)] sm:p-7 md:p-9 dark:shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-brand" />

            {status === "success" ? (
              <StatusPanel
                variant="success"
                title={copy.successTitle}
                eyebrow={copy.successEyebrow}
                text={copy.successText}
                onReset={() => setStatus("idle")}
                resetLabel={copy.resetSuccess}
              />
            ) : status === "rate_limit" ? (
              <StatusPanel
                variant="error"
                title={copy.rateLimitTitle}
                eyebrow={copy.rateLimitEyebrow}
                text={copy.rateLimitText}
                onReset={() => setStatus("idle")}
                resetLabel={copy.backBtn}
              />
            ) : status === "error" || status === "unavailable" ? (
              <StatusPanel
                variant="error"
                title={copy.errorTitle}
                eyebrow={copy.errorEyebrow}
                text={copy.errorText}
                onReset={() => setStatus("idle")}
                resetLabel={copy.retryBtn}
              />
            ) : (
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <p className="text-sm text-muted md:col-span-2">
                  {copy.fieldsRequirement}
                </p>

                {/* Honeypot anti-bot — ne pas remplir */}
                <div
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                  aria-hidden="true"
                >
                  <label htmlFor={`${formId}-website`}>Site web</label>
                  <input
                    id={`${formId}-website`}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Field
                  id={`${formId}-name`}
                  label={copy.nameInput}
                  name="name"
                  required
                  maxLength={CONTACT_LIMITS.name}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  id={`${formId}-company`}
                  label={copy.companyInput}
                  name="company"
                  required
                  maxLength={CONTACT_LIMITS.company}
                  error={errors.company}
                  autoComplete="organization"
                />
                <Field
                  id={`${formId}-email`}
                  label={copy.emailInput}
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id={`${formId}-phone`}
                  label={copy.phoneInput}
                  name="phone"
                  type="tel"
                  required
                  maxLength={CONTACT_LIMITS.phone}
                  error={errors.phone}
                  autoComplete="tel"
                />
                <div className="md:col-span-2">
                  <label
                    htmlFor={`${formId}-service`}
                    className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted"
                  >
                    {copy.serviceInput} *
                  </label>
                  <select
                    id={`${formId}-service`}
                    name="service"
                    required
                    defaultValue=""
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? `${formId}-service-error` : undefined
                    }
                    className="field appearance-none pr-10"
                  >
                    <option value="" disabled>
                      {copy.servicePlaceholder}
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p
                      id={`${formId}-service-error`}
                      className="mt-1.5 text-xs text-accent"
                      role="alert"
                    >
                      {errors.service}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor={`${formId}-message`}
                    className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted"
                  >
                    {copy.messageInput} *
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    rows={5}
                    maxLength={CONTACT_LIMITS.message}
                    placeholder={copy.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? `${formId}-message-error` : undefined
                    }
                    className="field resize-none"
                  />
                  {errors.message && (
                    <p
                      id={`${formId}-message-error`}
                      className="mt-1.5 text-xs text-accent"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="pt-1 md:col-span-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? copy.submitting : copy.submitBtn}
                    {status !== "sending" && <ArrowUpRight size={16} />}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function StatusPanel({ title, eyebrow, text, onReset, resetLabel, variant = "success" }) {
  const Icon = variant === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div className="flex flex-col items-start justify-center py-10 sm:min-h-[280px] sm:py-12">
      <Icon
        className={variant === "success" ? "text-brand" : "text-accent"}
        size={36}
        strokeWidth={1.5}
      />
      <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:mt-4">{text}</p>
      <button
        type="button"
        className="mt-6 text-sm text-muted underline-offset-2 hover:text-brand hover:underline"
        onClick={onReset}
      >
        {resetLabel}
      </button>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-line bg-page text-brand transition-all duration-300 group-hover:border-brand/50 group-hover:bg-brand group-hover:text-white sm:h-12 sm:w-12">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-[0.2em] text-muted">
          {label}
        </span>
        <span className="mt-1.5 inline-flex max-w-full items-center gap-2 text-sm text-fg transition-colors group-hover:text-brand sm:text-[0.95rem]">
          <span className="truncate break-all">{value}</span>
          {href && <ArrowUpRight size={14} className="shrink-0 opacity-60" />}
        </span>
      </span>
    </>
  );

  const className =
    "group flex min-h-14 items-center gap-3 rounded-[3px] border border-line bg-surface p-3.5 transition-all duration-300 hover:border-brand/35 sm:gap-4 sm:p-4";

  if (href) {
    return (
      <li>
        <a href={href} className={className}>
          {inner}
        </a>
      </li>
    );
  }

  return <li className={className}>{inner}</li>;
}

function Field({
  id,
  label,
  name,
  type = "text",
  required = false,
  maxLength,
  error,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
