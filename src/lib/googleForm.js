/**
 * Google Form → Sheets (serveur uniquement).
 * Variables : GOOGLE_FORM_ACTION, GF_ENTRY_* (jamais NEXT_PUBLIC_).
 */

function normalizeFormActionUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url.trim());
    parsed.pathname = parsed.pathname
      .replace(/\/viewform\/?$/, "/formResponse")
      .replace(/\/formResponse\/?$/, "/formResponse");
    if (!parsed.pathname.endsWith("/formResponse")) {
      parsed.pathname = `${parsed.pathname.replace(/\/$/, "")}/formResponse`;
    }
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url.trim().replace(/\/viewform.*/, "/formResponse");
  }
}

function env(name) {
  return process.env[name]?.trim() || "";
}

export function getGoogleFormConfig() {
  return {
    actionUrl: normalizeFormActionUrl(env("GOOGLE_FORM_ACTION")),
    entries: {
      name: env("GF_ENTRY_NAME"),
      company: env("GF_ENTRY_COMPANY"),
      email: env("GF_ENTRY_EMAIL"),
      phone: env("GF_ENTRY_PHONE"),
      service: env("GF_ENTRY_SERVICE"),
      message: env("GF_ENTRY_MESSAGE"),
    },
  };
}

export function isGoogleFormConfigured() {
  const { actionUrl, entries } = getGoogleFormConfig();
  return Boolean(
    actionUrl &&
      entries.name &&
      entries.company &&
      entries.email &&
      entries.phone &&
      entries.service &&
      entries.message,
  );
}

export async function submitToGoogleForm(values) {
  if (!isGoogleFormConfigured()) {
    throw new Error("Google Form non configuré");
  }

  const { actionUrl, entries } = getGoogleFormConfig();
  const params = new URLSearchParams();
  params.append(entries.name, values.name);
  params.append(entries.company, values.company);
  params.append(entries.email, values.email);
  params.append(entries.phone, values.phone);
  params.append(entries.service, values.service);
  params.append(entries.message, values.message);

  const res = await fetch(actionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    redirect: "manual",
  });

  if (res.status >= 400) {
    throw new Error(`Google Form HTTP ${res.status}`);
  }
}
