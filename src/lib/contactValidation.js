export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const msg = (key, text) => {
    if (withMessages) errors[key] = text;
    else errors[key] = true;
  };

  if (!name) msg("name", "Le nom est requis.");
  else if (name.length > CONTACT_LIMITS.name) msg("name", "Nom trop long.");

  if (!company) msg("company", "L’entreprise est requise.");
  else if (company.length > CONTACT_LIMITS.company)
    msg("company", "Entreprise trop longue.");

  if (!email) msg("email", "L’email est requis.");
  else if (!EMAIL_RE.test(email) || email.length > 200)
    msg("email", "Format d’email invalide.");

  if (!phone) msg("phone", "Le téléphone est requis.");
  else if (phone.length < CONTACT_LIMITS.phoneMin)
    msg("phone", "Numéro trop court.");
  else if (phone.length > CONTACT_LIMITS.phone)
    msg("phone", "Numéro trop long.");

  if (!service) msg("service", "Choisissez un service.");
  else if (service.length > CONTACT_LIMITS.service)
    msg("service", "Service invalide.");

  if (!message) msg("message", "Le message est requis.");
  else if (message.length < CONTACT_LIMITS.messageMin)
    msg("message", "Message trop court (10 caractères min.).");
  else if (message.length > CONTACT_LIMITS.message)
    msg("message", "Message trop long.");

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    values: { name, company, email, phone, service, message },
  };
}
