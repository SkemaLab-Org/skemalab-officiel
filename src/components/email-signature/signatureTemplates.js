/**
 * Email Signature Templates & HTML Generators for SkemaLab
 * Designed for High-End Executive & Enterprise Business Standards (Top Consulting / Tech Agencies)
 * Cross-client email compatible (Gmail, Apple Mail, Outlook 2016-365, Thunderbird, Webmail)
 * Uses strict HTML tables, inline styles, explicit dimensions, web-safe system font stacks.
 */

export const TEAM_MEMBERS = [
  {
    id: "feissal-tarkaoui",
    name: "Feissal Tarkaoui",
    role: "Chief Executive Officer & Stratégie Business",
    department: "Executive Board & Growth Strategy",
    email: "contact@skemalab.com",
    directEmail: "feissal@skemalab.com",
    phone: "+212 6 99 99 57 54",
    whatsapp: "+212 6 99 99 57 54",
    whatsappClean: "212699995754",
    website: "www.skemalab.com",
    websiteUrl: "https://www.skemalab.com",
    linkedin: "feissal-tarkaoui",
    linkedinUrl: "https://www.linkedin.com/in/faissalt/",
    tagline: "Build · Grow · Automate",
    avatar: "https://i.imgur.com/t5DqN7J.jpeg",
    localAvatar: "https://i.imgur.com/t5DqN7J.jpeg",
    bookingUrl: "https://calendly.com",
    bookingLabel: "Réserver un échange stratégique",
    address: "Essaouira, Maroc",
  },
  {
    id: "marouan-khadiri",
    name: "Marouan Khadiri",
    role: "Chief Technology Officer & Architecte Systèmes",
    department: "Deep Tech & Intelligence Artificielle",
    email: "contact@skemalab.com",
    directEmail: "marouan@skemalab.com",
    phone: "+212 6 99 99 57 54",
    whatsapp: "+212 6 99 99 57 54",
    whatsappClean: "212699995754",
    website: "www.skemalab.com",
    websiteUrl: "https://www.skemalab.com",
    linkedin: "marouan-khadiri",
    linkedinUrl: "https://www.linkedin.com/in/marouan-khadiri/",
    tagline: "Build · Grow · Automate",
    avatar: "https://www.skemalab.com/team/marouan_khadiri.jpg",
    localAvatar: "/team/marouan_khadiri.jpg",
    bookingUrl: "https://calendly.com",
    bookingLabel: "Réserver un point technique",
    address: "Essaouira, Maroc",
  },
];

export const BRAND_CONFIG = {
  name: "SkemaLab Agency",
  tagline: "Build · Grow · Automate",
  logoUrl: "https://i.imgur.com/NSFMNT7.png",
  localLogoUrl: "/first-logo.png",
  brandColor: "#089587",
  brandAccent: "#0d655c",
  brandDark: "#0b0f0e",
  brandLightTeal: "#e6f6f4",
  brandBorder: "#d1e7e4",
  textMuted: "#526e69",
};

/**
 * Template 1: Executive Prestige (Official CEO & Executive Board Signature)
 * Redesigned for luxury aesthetics: larger logo under avatar, refined typography, elegant contact grid, tagline banner & same-line CTA.
 */
function generateExecutiveTemplate(data, options = {}) {
  const isProd = options.useProdUrls !== false;
  const avatarSrc = data.avatar || "https://i.imgur.com/t5DqN7J.jpeg";
  const logoSrc = isProd ? (options.logoUrl || "https://i.imgur.com/NSFMNT7.png") : "https://i.imgur.com/NSFMNT7.png";
  const showAddress = options.showAddress ?? true;
  const showDisclaimer = options.showDisclaimer ?? false;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.4; color: #111827; background-color: transparent; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; max-width: 650px;">
  <tr>
    <td style="padding: 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
          <!-- AVATAR & LOGO COLUMN -->
          <td valign="top" style="padding-right: 22px; text-align: center; width: 130px;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; width: 100%;">
              <!-- AVATAR PHOTO -->
              <tr>
                <td style="padding: 0; text-align: center;">
                  <a href="${data.linkedinUrl || 'https://www.skemalab.com'}" target="_blank" style="text-decoration: none; display: inline-block;">
                    <img src="${avatarSrc}" alt="${data.name}" width="96" height="96" style="display: block; width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 3px solid #089587; box-shadow: 0 4px 14px rgba(8, 149, 135, 0.22); margin: 0 auto;" />
                  </a>
                </td>
              </tr>
              <!-- SKEMALAB LOGO UNDER AVATAR -->
              <tr>
                <td style="padding-top: 14px; text-align: center;">
                  <a href="${data.websiteUrl || 'https://www.skemalab.com'}" target="_blank" style="text-decoration: none; display: inline-block;">
                    <img src="${logoSrc}" alt="SkemaLab Agency" width="128" style="display: block; width: 128px; max-width: 135px; height: auto; margin: 0 auto;" />
                  </a>
                </td>
              </tr>
            </table>
          </td>

          <!-- VERTICAL BRAND DIVIDER -->
          <td valign="top" style="width: 2px; padding: 0 20px 0 0;">
            <table cellpadding="0" cellspacing="0" border="0" style="height: 100%; border-collapse: collapse;">
              <tr>
                <td style="width: 2px; height: 165px; background-color: #089587; border-radius: 2px;"></td>
              </tr>
            </table>
          </td>

          <!-- EXECUTIVE DETAILS COLUMN -->
          <td valign="top" style="padding: 0;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
              
              <!-- NAME & TITLE BLOCK -->
              <tr>
                <td style="padding-bottom: 6px;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td valign="middle">
                        <span style="font-size: 19px; font-weight: 800; color: #0b0f0e; letter-spacing: -0.4px; line-height: 1.2;">
                          ${data.name}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 4px; padding-bottom: 4px;">
                        <span style="font-size: 12.5px; font-weight: 700; color: #089587; text-transform: uppercase; letter-spacing: 0.5px;">
                          ${data.role}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 10px;">
                        <span style="font-size: 11px; font-weight: 600; color: #526e69;">
                          ${data.department || 'Direction Générale'}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- CONTACT DETAILS GRID WITH LUXURY CHIPS -->
              <tr>
                <td style="padding-bottom: 12px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12px; color: #374151; line-height: 1.65;">
                    <tr>
                      <td style="padding-right: 60px; padding-bottom: 4px; white-space: nowrap;">
                        <span style="display: inline-block; background-color: #e6f6f4; color: #089587; font-weight: 800; font-size: 10.5px; width: 19px; height: 19px; line-height: 19px; text-align: center; border-radius: 5px; margin-right: 6px; border: 1px solid #c9e8e3;">✉</span>
                        <a href="mailto:${data.email}" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          ${data.email}
                        </a>
                      </td>
                      <td style="padding-right: 60px; padding-bottom: 4px; white-space: nowrap;">
                        <span style="display: inline-block; background-color: #e6f6f4; color: #089587; font-weight: 800; font-size: 10.5px; width: 19px; height: 19px; line-height: 19px; text-align: center; border-radius: 5px; margin-right: 6px; border: 1px solid #c9e8e3;">📞</span>
                        <a href="tel:${data.phone.replace(/\\s+/g, '')}" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          ${data.phone}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-right: 18px; padding-bottom: 4px; white-space: nowrap;">
                        <span style="display: inline-block; background-color: #e6f6f4; color: #8de073ff; font-weight: 800; font-size: 10.5px; width: 19px; height: 19px; line-height: 19px; text-align: center; border-radius: 5px; margin-right: 6px; border: 1px solid #c9e8e3;">💬</span>
                        <a href="https://wa.me/${data.whatsappClean || '212699995754'}" target="_blank" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          WhatsApp: ${data.whatsapp}
                        </a>
                      </td>
                      <td style="padding-right: 18px; padding-bottom: 4px; white-space: nowrap;">
                        <span style="display: inline-block; background-color: #e6f6f4; color: #089587; font-weight: 800; font-size: 10.5px; width: 19px; height: 19px; line-height: 19px; text-align: center; border-radius: 5px; margin-right: 6px; border: 1px solid #c9e8e3;">🌐</span>
                        <a href="${data.websiteUrl || 'https://www.skemalab.com'}" target="_blank" style="color: #089587; text-decoration: none; font-weight: 700;">
                          ${data.website}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding-top: 2px;">
                        <span style="display: inline-block; background-color: #e0f2fe; color: #0284c7; font-weight: 800; font-size: 10.5px; width: 19px; height: 19px; line-height: 19px; text-align: center; border-radius: 5px; margin-right: 6px; border: 1px solid #bae6fd;">in</span>
                        <a href="${data.linkedinUrl}" target="_blank" style="padding-right:75px; color: #1f2937; text-decoration: none; font-weight: 600;">
                          ${data.linkedin}
                        </a>
                        ${showAddress ? `
                        <span style="color: #cbd5e1; margin: 0 8px;">•</span>
                        <span style="color: #64748b; font-size: 11px; font-weight: 500;">📍 ${data.address}</span>
                        ` : ''}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- BRAND SLOGAN & BOOKING CTA (SAME LINE) -->
              <tr>
                <td style="padding-top: 12px; border-top: 1.5px solid #d5e5e2;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td>
                        <div style="display: inline-block; background-color: #089587; padding: 6px 14px; border-radius: 6px; box-shadow: 0 2px 6px rgba(8, 149, 135, 0.2);">
                          <span style="font-size: 11px; font-weight: 800; color: #ffffff; letter-spacing: 0.8px; text-transform: uppercase;">
                            ${data.tagline || 'Build · Grow · Automate'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${showDisclaimer ? `
              <!-- CONFIDENTIALITY NOTICE -->
              <tr>
                <td style="padding-top: 14px; font-size: 9.5px; color: #94a3b8; line-height: 1.35; border-top: 1px dotted #e2e8f0; margin-top: 10px;">
                  <em>Ce message électronique et tous les fichiers transmis sont confidentiels et réservés à l'usage exclusif du destinataire. Si vous avez reçu cet email par erreur, merci de le notifier immédiatement et de le supprimer.</em>
                </td>
              </tr>
              ` : ''}

            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

/**
 * Template 2: Fortune 500 Corporate (Clean Silicon Valley / Consulting Architecture)
 */
function generateModernStudioTemplate(data, options = {}) {
  const isProd = options.useProdUrls !== false;
  const avatarSrc = data.avatar || "https://i.imgur.com/t5DqN7J.jpeg";
  const logoSrc = isProd ? (options.logoUrl || "https://i.imgur.com/NSFMNT7.png") : "https://i.imgur.com/NSFMNT7.png";
  const showBooking = options.showBooking ?? true;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.4; color: #0b0f0e; border-collapse: collapse; max-width: 600px; background-color: #ffffff; border: 1px solid #d5e5e2; border-radius: 12px; box-shadow: 0 4px 16px rgba(15, 46, 42, 0.06);">
  <tr>
    <td style="padding: 18px 22px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <!-- TOP BRAND STRIP WITH LARGER LOGO -->
        <tr>
          <td valign="middle" style="padding-bottom: 14px; border-bottom: 1px solid #e2ecea;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td valign="middle">
                  <a href="${data.websiteUrl || 'https://www.skemalab.com'}" target="_blank" style="text-decoration: none;">
                    <img src="${logoSrc}" alt="SkemaLab" width="140" style="display: block; width: 140px; height: auto;" />
                  </a>
                </td>
                <td valign="middle" align="right">
                  <span style="background-color: #089587; color: #ffffff; font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.9px; padding: 4px 12px; border-radius: 20px;">
                    ${data.tagline || 'Build · Grow · Automate'}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- MAIN BODY: AVATAR + INFO -->
        <tr>
          <td style="padding-top: 16px; padding-bottom: 14px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <!-- SQUIRCLE AVATAR -->
                <td valign="top" style="width: 90px; padding-right: 18px;">
                  <img src="${avatarSrc}" alt="${data.name}" width="90" height="90" style="display: block; width: 90px; height: 90px; border-radius: 14px; object-fit: cover; border: 2px solid #089587; box-shadow: 0 4px 12px rgba(8, 149, 135, 0.15);" />
                </td>

                <!-- INFO & CONTACTS -->
                <td valign="top">
                  <div style="font-size: 17.5px; font-weight: 800; color: #0b0f0e; line-height: 1.2;">
                    ${data.name}
                  </div>
                  <div style="font-size: 12px; font-weight: 700; color: #089587; margin-top: 3px; margin-bottom: 8px;">
                    ${data.role}
                  </div>

                  <!-- CONTACT CHIPS -->
                  <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12px; color: #374151;">
                    <tr>
                      <td style="padding-right: 14px; padding-bottom: 4px;">
                        <a href="mailto:${data.email}" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          ✉ ${data.email}
                        </a>
                      </td>
                      <td style="padding-bottom: 4px;">
                        <a href="tel:${data.phone.replace(/\\s+/g, '')}" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          📞 ${data.phone}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-right: 14px;">
                        <a href="https://wa.me/${data.whatsappClean || '212699995754'}" target="_blank" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          💬 WhatsApp
                        </a>
                      </td>
                      <td>
                        <a href="${data.linkedinUrl}" target="_blank" style="color: #0077b5; text-decoration: none; font-weight: 700;">
                          in LinkedIn Profile
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER BAR WITH CTA -->
        <tr>
          <td style="padding-top: 12px; border-top: 1px solid #e2ecea; font-size: 11px; color: #64748b;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <span>🌐 <a href="${data.websiteUrl || 'https://www.skemalab.com'}" target="_blank" style="color: #089587; font-weight: 700; text-decoration: none;">www.skemalab.com</a></span>
                  
                  <span>📍 ${data.address || 'Essaouira, Maroc'}</span>
                </td>
                ${showBooking ? `
                <td align="right">
                  <a href="${data.bookingUrl || 'https://www.skemalab.com'}" target="_blank" style="color: #089587; font-weight: 800; text-decoration: underline;">
                    Planifier un rendez-vous →
                  </a>
                </td>
                ` : ''}
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

/**
 * Template 3: Luxury Dark Titanium (Deep Tech & AI Agency Edition)
 */
function generateDarkExecutiveTemplate(data, options = {}) {
  const isProd = options.useProdUrls !== false;
  const avatarSrc = data.avatar || "https://i.imgur.com/t5DqN7J.jpeg";
  const logoSrc = isProd ? (options.logoUrl || "https://i.imgur.com/NSFMNT7.png") : "https://i.imgur.com/NSFMNT7.png";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.4; color: #ffffff; background-color: #0b0f0e; border: 1px solid #0f2e2a; border-radius: 12px; max-width: 600px; border-collapse: collapse; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);">
  <tr>
    <td style="padding: 20px 22px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <!-- AVATAR -->
          <td valign="top" style="width: 92px; padding-right: 18px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <img src="${avatarSrc}" alt="${data.name}" width="92" height="92" style="display: block; width: 92px; height: 92px; border-radius: 50%; object-fit: cover; border: 2.5px solid #089587; box-shadow: 0 0 16px rgba(8, 149, 135, 0.35);" />
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 6px;">
                  <span style="color: #2dd4bf; font-size: 9.5px; font-weight: 800; letter-spacing: 0.8px;">EXECUTIVE</span>
                </td>
              </tr>
            </table>
          </td>

          <!-- CONTENT -->
          <td valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <div style="font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                    ${data.name}
                  </div>
                  <div style="font-size: 12px; font-weight: 700; color: #2dd4bf; margin-top: 2px; margin-bottom: 8px; letter-spacing: 0.3px;">
                    ${data.role}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12px; color: #94a3b8; line-height: 1.6;">
                    <tr>
                      <td style="padding-right: 14px;">
                        <span style="color: #2dd4bf;">✉</span>
                        <a href="mailto:${data.email}" style="color: #f1f5f9; text-decoration: none; font-weight: 500;">${data.email}</a>
                      </td>
                      <td>
                        <span style="color: #2dd4bf;">📞</span>
                        <a href="tel:${data.phone.replace(/\\s+/g, '')}" style="color: #f1f5f9; text-decoration: none; font-weight: 500;">${data.phone}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-right: 14px;">
                        <span style="color: #2dd4bf;">💬</span>
                        <a href="https://wa.me/${data.whatsappClean || '212699995754'}" target="_blank" style="color: #f1f5f9; text-decoration: none; font-weight: 500;">WhatsApp</a>
                      </td>
                      <td>
                        <span style="color: #2dd4bf;">in</span>
                        <a href="${data.linkedinUrl}" target="_blank" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${data.linkedin}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding-top: 8px; border-top: 1px solid #1a3834;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td valign="middle">
                        <span style="font-size: 10.5px; font-weight: 800; color: #2dd4bf; letter-spacing: 1px; text-transform: uppercase;">
                          ${data.tagline || 'Build · Grow · Automate'}
                        </span>
                      </td>
                      <td valign="middle" align="right">
                        <a href="${data.websiteUrl || 'https://www.skemalab.com'}" target="_blank" style="text-decoration: none;">
                          <img src="${logoSrc}" alt="SkemaLab" width="135" style="display: block; width: 135px; height: auto;" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

/**
 * Template 4: Compact C-Level (Streamlined for rapid email threads)
 */
function generateCompactCleanTemplate(data) {
  const avatarSrc = data.avatar || "https://i.imgur.com/t5DqN7J.jpeg";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.35; color: #111827; border-collapse: collapse; max-width: 560px;">
  <tr>
    <td valign="middle" style="padding-right: 14px; width: 68px;">
      <img src="${avatarSrc}" alt="${data.name}" width="68" height="68" style="display: block; width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 2px solid #089587;" />
    </td>
    <td valign="middle" style="border-left: 2.5px solid #089587; padding-left: 14px;">
      <div style="font-size: 16px; font-weight: 800; color: #0b0f0e;">
        ${data.name}
      </div>
      <div style="font-size: 11.5px; font-weight: 700; color: #089587; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px;">
        ${data.role} • SkemaLab Agency
      </div>
      <div style="color: #4b5563; font-size: 11px;">
        <a href="mailto:${data.email}" style="color: #111827; text-decoration: none; font-weight: 600;">${data.email}</a> | 
        <a href="tel:${data.phone.replace(/\\s+/g, '')}" style="color: #111827; text-decoration: none; font-weight: 600;">${data.phone}</a> | 
        <a href="${data.websiteUrl || 'https://www.skemalab.com'}" target="_blank" style="color: #089587; text-decoration: none; font-weight: 700;">skemalab.com</a>
      </div>
      <div style="margin-top: 4px; font-size: 10.5px; font-weight: 800; color: #089587;">
        ${data.tagline || 'Build · Grow · Automate'}
      </div>
    </td>
  </tr>
</table>`;
}

export const TEMPLATES = [
  {
    id: "executive",
    name: "Executive Prestige (CEO & Board)",
    description: "Design de luxe haute couture pour dirigeants : photo HD, séparateur vertical teal, puces de contact raffinées, badge slogan et logo élargi.",
    badge: "Prestige",
    generator: generateExecutiveTemplate,
  },
  {
    id: "modern-studio",
    name: "Corporate Tech Studio",
    description: "Format d'agence internationale encadrée avec logo en tête, portrait squircle et barre d'action.",
    badge: "Corporate",
    generator: generateModernStudioTemplate,
  },
  {
    id: "dark-executive",
    name: "Luxury Dark Titanium",
    description: "Design sombre prestige avec accents turquoise néon, spécialement conçu pour les écosystèmes IA & Deep Tech.",
    badge: "Dark Mode",
    generator: generateDarkExecutiveTemplate,
  },
  {
    id: "compact-clean",
    name: "Compact Partner Edition",
    description: "Format ultra-optimisé avec hauteur réduite pour les échanges quotidiens à haute fréquence.",
    badge: "Minimal",
    generator: generateCompactCleanTemplate,
  },
];
