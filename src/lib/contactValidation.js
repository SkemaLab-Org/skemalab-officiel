const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  name: 120,
  company: 160,
  phone: 40,
  service: 120,
  message: 2000,
  messageMin: 10,
  phoneMin: 8,
};

/**
 * @returns {{ ok: boolean, errors: Record<string, string>, values: object }}
 */
export function validateContactInput(body, { withMessages = false } = {}) {
  const errors = {};
  const name = String(body.name || "").trim();
  const company = String(body.company || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const service = String(body.service || "").trim();
  const message = String(body.message || "").trim();

  // `withMessages` returns i18n codes (see `contactErrors` in the dictionaries);
  // callers render them in the active locale.
  const msg = (key, code) => {
    if (withMessages) errors[key] = code;
    else errors[key] = true;
  };

  if (!name) msg("name", "nameRequired");
  else if (name.length > CONTACT_LIMITS.name) msg("name", "nameTooLong");

  if (!company) msg("company", "companyRequired");
  else if (company.length > CONTACT_LIMITS.company)
    msg("company", "companyTooLong");

  if (!email) msg("email", "emailRequired");
  else if (!EMAIL_RE.test(email) || email.length > 200)
    msg("email", "emailInvalid");

  if (!phone) msg("phone", "phoneRequired");
  else if (phone.length < CONTACT_LIMITS.phoneMin)
    msg("phone", "phoneTooShort");
  else if (phone.length > CONTACT_LIMITS.phone) msg("phone", "phoneTooLong");

  if (!service) msg("service", "serviceRequired");
  else if (service.length > CONTACT_LIMITS.service)
    msg("service", "serviceInvalid");

  if (!message) msg("message", "messageRequired");
  else if (message.length < CONTACT_LIMITS.messageMin)
    msg("message", "messageTooShort");
  else if (message.length > CONTACT_LIMITS.message)
    msg("message", "messageTooLong");

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    values: { name, company, email, phone, service, message },
  };
}
