/**
 * Calendly helpers — iframe embed (no widget.js on critical path).
 */

const PRECONNECT_ORIGINS = [
  "https://calendly.com",
  "https://assets.calendly.com",
];

export function getCalendlyUrl() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "";
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return "";
    if (
      parsed.hostname !== "calendly.com" &&
      !parsed.hostname.endsWith(".calendly.com")
    ) {
      return "";
    }
    parsed.hash = "";
    parsed.search = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
}

/** Inline embed URL with lighter UI flags */
export function getCalendlyEmbedUrl() {
  const base = getCalendlyUrl();
  if (!base || typeof window === "undefined") return "";

  const embed = new URL(base);
  embed.searchParams.set("embed_type", "Inline");
  embed.searchParams.set("embed_domain", window.location.host);
  embed.searchParams.set("hide_gdpr_banner", "1");
  embed.searchParams.set("hide_landing_page_details", "1");
  embed.searchParams.set("hide_event_type_details", "1");
  return embed.toString();
}

function ensureLink(rel, href, extra = {}) {
  if (typeof document === "undefined") return;
  const key = `${rel}:${href}`;
  if (document.querySelector(`link[data-calendly-hint="${key}"]`)) return;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  link.dataset.calendlyHint = key;
  if (extra.crossOrigin) link.crossOrigin = extra.crossOrigin;
  document.head.appendChild(link);
}

/** Warm DNS/TLS to Calendly (hover / idle) — cheap, no JS download */
export function preconnectCalendly() {
  for (const origin of PRECONNECT_ORIGINS) {
    ensureLink("dns-prefetch", origin);
    ensureLink("preconnect", origin, { crossOrigin: "anonymous" });
  }
}

/** Idle warm-up after first paint — does not load Calendly JS */
let warmupScheduled = false;

export function scheduleCalendlyWarmup() {
  if (typeof window === "undefined" || warmupScheduled || !getCalendlyUrl()) {
    return;
  }
  warmupScheduled = true;
  const run = () => preconnectCalendly();
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 4000 });
  } else {
    window.setTimeout(run, 2500);
  }
}
