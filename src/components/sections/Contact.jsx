"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
import { CONTACT_LIMITS } from "@/lib/contactValidation";
import { createContactSchema } from "@/lib/contactSchema";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/motion";

export default function Contact() {
  const { t } = useI18n();
  const copy = t.contactSection;
  const [ status, setStatus ] = useState( "idle" );

  const serviceOptions = useMemo(
    () => [
      ...t.servicesList.map( ( service ) => ( {
        value: service.id,
        label: service.title,
      } ) ),
      { value: "global", label: copy.globalService },
    ],
    [ t.servicesList, copy.globalService ],
  );

  const resolver = useMemo(
    () => zodResolver( createContactSchema( t.contactErrors ) ),
    [ t.contactErrors ],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm( {
    resolver,
    mode: "onSubmit",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      website: "",
    },
  } );

  const onSubmit = async ( values ) => {
    const serviceLabel =
      serviceOptions.find( ( option ) => option.value === values.service )?.label ||
      values.service;

    setStatus( "sending" );
    try {
      const response = await fetch( "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {
          name: values.name,
          company: values.company,
          email: values.email,
          phone: values.phone,
          service: serviceLabel,
          message: values.message,
          website: values.website,
        } ),
      } );

      if ( response.status === 429 ) {
        setStatus( "rate_limit" );
        return;
      }
      if ( response.status === 503 ) {
        setStatus( "unavailable" );
        return;
      }
      if ( !response.ok ) {
        setStatus( "error" );
        return;
      }

      reset();
      setStatus( "success" );
    } catch {
      setStatus( "error" );
    }
  };

  const busy = isSubmitting || status === "sending";

  return (
    <section id="contact" className="section-y bg-page zellige-spot zellige-spot--bottom-end zellige-spot--large">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <div className="flex min-h-4 items-center gap-3">
              <div className="label-mono flex items-center gap-3 shrink-0 text-accent">
                <span className="section-index" aria-hidden="true">08</span>
                <span className="h-4 w-px bg-accent/50" aria-hidden="true" />
                <span className="text-fg/75">{ copy.eyebrow }</span>
              </div>
            </div>

            <h2 className="section-title mt-7 max-w-[16ch] text-fg">
              { copy.title }
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-muted">
              { copy.description }
            </p>
          </Reveal>

          <Reveal delay={ 0.1 }>
            <ul className="mt-10 space-y-0">
              <ContactRow
                icon={ Mail }
                label={ copy.emailLabel }
                value={ contactInfo.email }
                href={ `mailto:${ contactInfo.email }` }
              />
              <ContactRow
                icon={ Phone }
                label={ copy.phoneLabel }
                value={ contactInfo.phone }
                href={ `tel:${ contactInfo.phone.replace( /\s/g, "" ) }` }
              />
              <ContactRow
                icon={ MapPin }
                label={ copy.locationLabel }
                value={ contactInfo.locations.join( " · " ) }
              />
            </ul>
          </Reveal>
        </div>

        <Reveal delay={ 0.12 }>
          <form
            onSubmit={ handleSubmit( onSubmit ) }
            noValidate
            aria-busy={ busy }
            className="pt-2 sm:pt-6"
          >
            { status === "success" ? (
              <StatusPanel
                variant="success"
                eyebrow={ copy.successEyebrow }
                title={ copy.successTitle }
                text={ copy.successText }
                resetLabel={ copy.resetSuccess }
                onReset={ () => setStatus( "idle" ) }
              />
            ) : status === "rate_limit" ? (
              <StatusPanel
                variant="error"
                eyebrow={ copy.rateLimitEyebrow }
                title={ copy.rateLimitTitle }
                text={ copy.rateLimitText }
                resetLabel={ copy.backBtn }
                onReset={ () => setStatus( "idle" ) }
              />
            ) : status === "error" || status === "unavailable" ? (
              <StatusPanel
                variant="error"
                eyebrow={ copy.errorEyebrow }
                title={ copy.errorTitle }
                text={ copy.errorText }
                resetLabel={ copy.retryBtn }
                onReset={ () => setStatus( "idle" ) }
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <p className="text-sm text-muted sm:col-span-2">
                  { copy.fieldsRequirement }
                </p>

                {/* Honeypot — hidden from people, visible to naive bots */ }
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                  <label htmlFor="contact-website">Site web</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={ -1 }
                    autoComplete="off"
                    { ...register( "website" ) }
                  />
                </div>

                <Field
                  id="contact-name"
                  label={ copy.nameLabel }
                  autoComplete="name"
                  maxLength={ CONTACT_LIMITS.name }
                  error={ errors.name?.message }
                  { ...register( "name" ) }
                />

                <Field
                  id="contact-company"
                  label={ copy.companyLabel }
                  autoComplete="organization"
                  maxLength={ CONTACT_LIMITS.company }
                  error={ errors.company?.message }
                  { ...register( "company" ) }
                />

                <Field
                  id="contact-email"
                  label={ copy.emailLabel }
                  type="email"
                  autoComplete="email"
                  maxLength={ 200 }
                  error={ errors.email?.message }
                  { ...register( "email" ) }
                />

                <Field
                  id="contact-phone"
                  label={ copy.phoneLabel }
                  type="tel"
                  autoComplete="tel"
                  maxLength={ CONTACT_LIMITS.phone }
                  error={ errors.phone?.message }
                  { ...register( "phone" ) }
                />

                <div className="sm:col-span-2">
                  <label htmlFor="contact-service" className="label-mono mb-1 block text-muted">
                    { copy.serviceLabel }
                  </label>
                  <select
                    id="contact-service"
                    aria-invalid={ errors.service ? "true" : undefined }
                    aria-describedby={ errors.service ? "contact-service-error" : undefined }
                    className="field cursor-pointer"
                    { ...register( "service" ) }
                  >
                    <option value="" disabled>
                      { copy.servicePlaceholder }
                    </option>
                    { serviceOptions.map( ( option ) => (
                      <option key={ option.value } value={ option.value }>
                        { option.label }
                      </option>
                    ) ) }
                  </select>
                  <FieldError id="contact-service-error" message={ errors.service?.message } />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="label-mono mb-1 block text-muted">
                    { copy.messageLabel }
                  </label>
                  <textarea
                    id="contact-message"
                    rows={ 4 }
                    aria-invalid={ errors.message ? "true" : undefined }
                    aria-describedby={ errors.message ? "contact-message-error" : undefined }
                    maxLength={ CONTACT_LIMITS.message }
                    className="field resize-none"
                    { ...register( "message" ) }
                  />
                  <FieldError id="contact-message-error" message={ errors.message?.message } />
                </div>

                <div className="pt-2 sm:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    loading={ busy }
                    disabled={ busy }
                  >
                    { busy ? copy.submitting : copy.submitBtn }
                    { !busy ? <ArrowUpRight size={ 16 } className="rtl-flip" /> : null }
                  </Button>
                </div>
              </div>
            ) }
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field( { id, label, type = "text", error, ...props } ) {
  return (
    <div>
      <label htmlFor={ id } className="label-mono mb-1 block text-muted">
        { label }
      </label>
      <input
        id={ id }
        type={ type }
        aria-invalid={ error ? "true" : undefined }
        aria-describedby={ error ? `${ id }-error` : undefined }
        className="field"
        { ...props }
      />
      <FieldError id={ `${ id }-error` } message={ error } />
    </div>
  );
}

function FieldError( { id, message } ) {
  return (
    <AnimatePresence initial={ false }>
      { message ? (
        <motion.p
          id={ id }
          role="alert"
          initial={ { opacity: 0, y: -4 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0 } }
          transition={ { duration: DURATION.fast, ease: EASE.out } }
          className="mt-1 text-xs text-danger"
        >
          { message }
        </motion.p>
      ) : null }
    </AnimatePresence>
  );
}

function ContactRow( { icon: Icon, label, value, href } ) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-none border border-line-strong text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5">
        <Icon size={ 17 } strokeWidth={ 1.75 } aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="label-mono block text-muted">{ label }</span>
        <span className="mt-1 block break-all text-sm font-medium text-fg transition-colors group-hover:text-accent">
          { value }
        </span>
      </span>
      { href ? (
        <ArrowUpRight
          size={ 16 }
          aria-hidden="true"
          className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl-flip"
        />
      ) : null }
    </>
  );

  const className =
    "group flex min-h-16 items-center gap-3.5 border-b border-line px-2 py-3.5 transition-colors duration-200 hover:bg-surface-2/25";

  if ( href ) {
    return (
      <li>
        <a href={ href } className={ className }>
          { content }
        </a>
      </li>
    );
  }

  return <li className={ className }>{ content }</li>;
}

function StatusPanel( { variant = "success", eyebrow, title, text, resetLabel, onReset } ) {
  const Icon = variant === "success" ? CheckCircle2 : AlertCircle;

  return (
    <motion.div
      initial={ { opacity: 0, y: 10 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { duration: DURATION.base, ease: EASE.out } }
      className="flex min-h-[22rem] flex-col items-start justify-center py-6"
      role="status"
    >
      <Icon
        size={ 34 }
        strokeWidth={ 1.5 }
        aria-hidden="true"
        className={ variant === "success" ? "text-accent" : "text-danger" }
      />
      <p className="label-mono mt-6 text-muted">{ eyebrow }</p>
      <h3 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">{ title }</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{ text }</p>
      <button
        type="button"
        onClick={ onReset }
        className="link-underline mt-7 min-h-11 text-sm text-muted transition-colors hover:text-fg"
      >
        { resetLabel }
      </button>
    </motion.div>
  );
}
