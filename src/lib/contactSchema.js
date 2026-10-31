import { z } from "zod";
import { CONTACT_LIMITS } from "@/lib/contactValidation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Client-side schema mirroring `validateContactInput` (same limits, same
 * message keys) so the browser and the API agree on what a valid lead is.
 */
export function createContactSchema(errors) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, errors.nameRequired)
      .max(CONTACT_LIMITS.name, errors.nameTooLong),
    company: z
      .string()
      .trim()
      .min(1, errors.companyRequired)
      .max(CONTACT_LIMITS.company, errors.companyTooLong),
    email: z
      .string()
      .trim()
      .min(1, errors.emailRequired)
      .max(200, errors.emailInvalid)
      .regex(EMAIL_RE, errors.emailInvalid),
    phone: z
      .string()
      .trim()
      .min(1, errors.phoneRequired)
      .min(CONTACT_LIMITS.phoneMin, errors.phoneTooShort)
      .max(CONTACT_LIMITS.phone, errors.phoneTooLong),
    service: z
      .string()
      .min(1, errors.serviceRequired)
      .max(CONTACT_LIMITS.service, errors.serviceInvalid),
    message: z
      .string()
      .trim()
      .min(1, errors.messageRequired)
      .min(CONTACT_LIMITS.messageMin, errors.messageTooShort)
      .max(CONTACT_LIMITS.message, errors.messageTooLong),
    website: z.string().optional(),
  });
}
