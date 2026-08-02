"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { contactInfo, services } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 2000;
const MAX_NAME = 120;

const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "global", label: "Accompagnement global" },
];

function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Le nom est requis.";
  else if (name.length > MAX_NAME) errors.name = "Nom trop long.";

  if (!email) errors.email = "L’email est requis.";
  else if (!EMAIL_RE.test(email)) errors.email = "Format d’email invalide.";

  if (!message) errors.message = "Le message est requis.";
  else if (message.length < 10) errors.message = "Message trop court (10 caractères min.).";
  else if (message.length > MAX_MESSAGE) errors.message = "Message trop long.";

  return errors;
}

export default function Contact() {
  const formId = useId();
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const form = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
    };

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const serviceLabel =
      serviceOptions.find((o) => o.value === form.service)?.label || form.service;

    const subject = encodeURIComponent(
      `Demande Skemalab — ${serviceLabel} — ${form.name.trim()}`,
    );
    const body = encodeURIComponent(
      [
        `Nom : ${form.name.trim()}`,
        form.company.trim() ? `Entreprise : ${form.company.trim()}` : null,
        `Email : ${form.email.trim()}`,
        form.phone.trim() ? `Téléphone : ${form.phone.trim()}` : null,
        `Service : ${serviceLabel}`,
        "",
        form.message.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:gap-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Parlons de votre prochain levier de croissance."
              description="Décrivez votre besoin — site, produit, acquisition ou automation. Nous revenons vers vous sous 24h ouvrées."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
              <ContactRow
                icon={Mail}
                label="Email"
                href={`mailto:${contactInfo.email}`}
                value={contactInfo.email}
              />
              <ContactRow
                icon={Phone}
                label="Téléphone"
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                value={contactInfo.phone}
              />
              <ContactRow
                icon={MapPin}
                label="Localisation"
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

            {status === "opened" ? (
              <div className="flex flex-col items-start justify-center py-10 sm:min-h-[280px] sm:py-12">
                <CheckCircle2 className="text-brand" size={36} strokeWidth={1.5} />
                <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-accent">
                  Client mail
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl md:text-3xl">
                  Votre client mail va s’ouvrir…
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:mt-4">
                  Vérifiez le message prérempli, puis envoyez-le. Si rien ne
                  s’ouvre, écrivez-nous directement à{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  className="mt-6 text-sm text-muted underline-offset-2 hover:text-brand hover:underline"
                  onClick={() => setStatus("idle")}
                >
                  Modifier le formulaire
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <p className="text-sm text-muted md:col-span-2">
                  Remplissez le formulaire — votre client mail s’ouvrira pour
                  l’envoi (réponse sous 24h ouvrées).
                </p>
                <Field
                  id={`${formId}-name`}
                  label="Nom"
                  name="name"
                  required
                  error={errors.name}
                />
                <Field
                  id={`${formId}-company`}
                  label="Entreprise"
                  name="company"
                />
                <Field
                  id={`${formId}-email`}
                  label="Email"
                  name="email"
                  type="email"
                  required
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id={`${formId}-phone`}
                  label="Téléphone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />
                <div className="md:col-span-2">
                  <label
                    htmlFor={`${formId}-service`}
                    className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted"
                  >
                    Service concerné
                  </label>
                  <select
                    id={`${formId}-service`}
                    name="service"
                    className="field appearance-none pr-10"
                    defaultValue={services[0]?.id || "dev"}
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor={`${formId}-message`}
                    className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted"
                  >
                    Votre besoin
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    rows={5}
                    maxLength={MAX_MESSAGE}
                    placeholder="Objectifs, délais, contexte..."
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
                  <Button type="submit" variant="primary" className="w-full sm:w-auto">
                    Ouvrir mon client mail
                    <ArrowUpRight size={16} />
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
