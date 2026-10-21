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
    address: "Essaouira, Maroc",
  },
  {
    id: "marouan-khadiri",
    name: "Marouan Khadiri",
    role: "Chief Technology Officer & Architecte Systèmes",
    department: "Deep Tech & Intelligence Artificielle",
    email: "contact@skemalab.com",
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
    address: "Essaouira, Maroc",
  },
];

export const BRAND_CONFIG = {
  logoUrl: "https://i.imgur.com/GR4uc50.png",
};

const DEFAULT_AVATAR_URL = "https://i.imgur.com/t5DqN7J.jpeg";
const DEFAULT_WEBSITE_URL = "https://www.skemalab.com";

function escapeHtml( value ) {
  return String( value ?? "" ).replace( /[&<>"']/g, ( character ) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[ character ];
  } );
}

function safeHttpUrl( value, fallback ) {
  try {
    const url = new URL( value );
    if ( url.protocol === "http:" || url.protocol === "https:" ) {
      return escapeHtml( url.href );
    }
  } catch {
    // Invalid or unsupported URLs fall back to a trusted default.
  }

  return fallback;
}

function sanitizeSignatureData( data ) {
  const escapedData = Object.fromEntries(
    Object.entries( data ).map( ( [ key, value ] ) => [ key, escapeHtml( value ) ] ),
  );

  return {
    ...escapedData,
    avatar: safeHttpUrl( data.avatar, DEFAULT_AVATAR_URL ),
    websiteUrl: safeHttpUrl( data.websiteUrl, DEFAULT_WEBSITE_URL ),
    linkedinUrl: safeHttpUrl( data.linkedinUrl, DEFAULT_WEBSITE_URL ),
    whatsappClean: String( data.whatsappClean ?? "" ).replace( /\D/g, "" ),
  };
}

/**
 * Template 1: Executive Prestige (Official CEO & Executive Board Signature)
 * A structured, email-client-safe executive signature using inline styles and tables.
 */
function generateExecutiveTemplate( data, options = {} ) {
  data = sanitizeSignatureData( data );
  const avatarSrc = data.avatar;
  const logoSrc = BRAND_CONFIG.logoUrl;
  const showAddress = options.showAddress ?? true;
  const showDisclaimer = options.showDisclaimer ?? false;
  const phoneNumber = data.phone.replace( /\s+/g, "" );
  const websiteUrl = data.websiteUrl;

  return `<table cellpadding="0" cellspacing="0" border="0" width="620" bgcolor="#F7F5F0" style="width: 100%; max-width: 620px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.5; color: #18312E; background-color: #F7F5F0; border: 1px solid #DCD5C7; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  <tr>
    <td height="5" bgcolor="#089587" style="height: 5px; padding: 0; background-color: #089587; font-size: 1px; line-height: 1px;">&nbsp;</td>
  </tr>
  <tr>
    <td bgcolor="#F7F5F0" style="padding: 20px 22px; background-color: #F7F5F0;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
        <tr>
          <!-- PROFILE AND BRAND -->
          <td valign="top" width="112" style="width: 112px; padding: 2px 18px 0 0; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" width="94" align="center" style="width: 94px; margin: 0 auto; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 0;">
                  <a href="${ data.linkedinUrl || websiteUrl }" target="_blank" style="text-decoration: none;">
                    <img src="${ avatarSrc }" alt="${ data.name }" width="88" height="88" style="display: block; width: 88px; height: 88px; border: 3px solid #089587; border-radius: 50%; margin: 0 auto;" />
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 38px 0 4px;">
                  <a href="${ websiteUrl }" target="_blank" style="text-decoration: none;">
                    <img src="${ logoSrc }" alt="SkemaLab" width="94" style="display: block; width: 94px; max-width: 94px; height: auto; margin: 0 auto;" />
                  </a>
                </td>
              </tr>
            </table>
          </td>

          <!-- BRAND DIVIDER -->
          <td width="1" bgcolor="#DCD5C7" style="width: 1px; padding: 0; background-color: #DCD5C7; font-size: 1px;">&nbsp;</td>

          <!-- EXECUTIVE DETAILS -->
          <td valign="top" style="padding: 0 0 0 20px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0 0 10px;">
                  <div style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; line-height: 1.2; font-weight: 700; letter-spacing: 0.1px; color: #0D655C;">
                    ${ data.name }
                  </div>
                  <div style="padding-top: 4px; font-size: 12px; line-height: 1.4; font-weight: 700; letter-spacing: 0.55px; text-transform: uppercase; color: #089587;">
                    ${ data.role }
                  </div>
                  <div style="padding-top: 3px; font-size: 11px; line-height: 1.4; color: #52645F;">
                    ${ data.department || "Direction Générale" }
                  </div>
                </td>
              </tr>

              <!-- CONTACT DETAILS -->
              <tr>
                <td style="padding: 9px 0 10px; border-top: 1px solid #DCD5C7;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.55;">
                    <tr>
                      <td valign="top" width="52%" style="width: 52%; padding: 0 12px 5px 0;">
                        <span aria-hidden="true" style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; color: #0D655C; background-color: #E8F1EE; border: 1px solid #DCD5C7;">&#9993;</span>
                        <a href="mailto:${ data.email }" style="padding-left: 6px; color: #263B37; text-decoration: none;">${ data.email }</a>
                      </td>
                      <td valign="top" style="padding: 0 0 5px;">
                        <span aria-hidden="true" style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; color: #0D655C; background-color: #E8F1EE; border: 1px solid #DCD5C7;">&#9742;</span>
                        <a href="tel:${ phoneNumber }" style="padding-left: 6px; color: #263B37; text-decoration: none;">${ data.phone }</a>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" style="padding: 0 12px 5px 0;">
                        <span aria-hidden="true" style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; color: #0D655C; background-color: #E8F1EE; border: 1px solid #DCD5C7;">&#9678;</span>
                        <a href="${ websiteUrl }" target="_blank" style="padding-left: 6px; color: #0D655C; text-decoration: none; font-weight: 700;">${ data.website }</a>
                      </td>
                      <td valign="top" style="padding: 0 0 5px;">
                        <span aria-hidden="true" style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; color: #0D655C; background-color: #E8F1EE; border: 1px solid #DCD5C7;">&#8599;</span>
                        <a href="${ data.linkedinUrl }" target="_blank" style="padding-left: 6px; color: #263B37; text-decoration: none;">${ data.linkedin }</a>
                      </td>
                    </tr>
                    ${ showAddress ? `
                    <tr>
                      <td colspan="2" style="padding: 0; color: #52645F;">
                        <span aria-hidden="true" style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; color: #0D655C; background-color: #E8F1EE; border: 1px solid #DCD5C7;">&#9678;</span>
                        <span style="padding-left: 6px;">${ data.address || "Essaouira, Maroc" }</span>
                      </td>
                    </tr>
                    ` : "" }
                  </table>
                </td>
              </tr>

              <!-- BRAND FOOTER -->
              <tr>
                <td bgcolor="#0D655C" style="padding: 8px 10px; background-color: #0D655C;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td valign="middle" style="font-size: 10px; line-height: 1.4; font-weight: 700; letter-spacing: 0.8px; color: #FFFFFF;">
                        ${ data.tagline || "BUILD · GROW · AUTOMATE" }
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${ showDisclaimer ? `
              <tr>
                <td style="padding: 9px 0 0; font-size: 9px; line-height: 1.4; color: #52645F;">
                  <em>Ce message électronique et tous les fichiers transmis sont confidentiels et réservés à l'usage exclusif du destinataire. Si vous avez reçu cet email par erreur, merci de le notifier immédiatement et de le supprimer.</em>
                </td>
              </tr>
              ` : "" }
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
function generateModernStudioTemplate( data ) {
  data = sanitizeSignatureData( data );
  const avatarSrc = data.avatar;
  const logoSrc = BRAND_CONFIG.logoUrl;
  const websiteUrl = data.websiteUrl;

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
                  <a href="${ websiteUrl }" target="_blank" style="text-decoration: none;">
                    <img src="${ logoSrc }" alt="SkemaLab" width="140" style="display: block; width: 140px; height: auto;" />
                  </a>
                </td>
                <td valign="middle" align="right">
                  <span style="background-color: #089587; color: #ffffff; font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.9px; padding: 4px 12px; border-radius: 20px;">
                    ${ data.tagline || 'Build · Grow · Automate' }
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
                  <img src="${ avatarSrc }" alt="${ data.name }" width="90" height="90" style="display: block; width: 90px; height: 90px; border-radius: 14px; object-fit: cover; border: 2px solid #089587; box-shadow: 0 4px 12px rgba(8, 149, 135, 0.15);" />
                </td>

                <!-- INFO & CONTACTS -->
                <td valign="top">
                  <div style="font-size: 17.5px; font-weight: 800; color: #0b0f0e; line-height: 1.2;">
                    ${ data.name }
                  </div>
                  <div style="font-size: 12px; font-weight: 700; color: #089587; margin-top: 3px; margin-bottom: 8px;">
                    ${ data.role }
                  </div>

                  <!-- CONTACT CHIPS -->
                  <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12px; color: #374151;">
                    <tr>
                      <td style="padding-right: 14px; padding-bottom: 4px;">
                        <a href="mailto:${ data.email }" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          ✉ ${ data.email }
                        </a>
                      </td>
                      <td style="padding-bottom: 4px;">
                        <a href="tel:${ data.phone.replace( /\s+/g, '' ) }" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          📞 ${ data.phone }
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-right: 14px;">
                        <a href="https://wa.me/${ data.whatsappClean || '212699995754' }" target="_blank" style="color: #1f2937; text-decoration: none; font-weight: 600;">
                          💬 WhatsApp
                        </a>
                      </td>
                      <td>
                        <a href="${ data.linkedinUrl }" target="_blank" style="color: #0077b5; text-decoration: none; font-weight: 700;">
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
                  <span>🌐 <a href="${ websiteUrl }" target="_blank" style="color: #089587; font-weight: 700; text-decoration: none;">www.skemalab.com</a></span>
                  
                  <span>📍 ${ data.address || 'Essaouira, Maroc' }</span>
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
 * Template 3: Luxury Dark Titanium (Deep Tech & AI Agency Edition)
 */
function generateDarkExecutiveTemplate( data ) {
  data = sanitizeSignatureData( data );
  const avatarSrc = data.avatar;
  const logoSrc = BRAND_CONFIG.logoUrl;
  const websiteUrl = data.websiteUrl;

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
                  <img src="${ avatarSrc }" alt="${ data.name }" width="92" height="92" style="display: block; width: 92px; height: 92px; border-radius: 50%; object-fit: cover; border: 2.5px solid #089587; box-shadow: 0 0 16px rgba(8, 149, 135, 0.35);" />
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
                    ${ data.name }
                  </div>
                  <div style="font-size: 12px; font-weight: 700; color: #2dd4bf; margin-top: 2px; margin-bottom: 8px; letter-spacing: 0.3px;">
                    ${ data.role }
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12px; color: #94a3b8; line-height: 1.6;">
                    <tr>
                      <td style="padding-right: 14px;">
                        <span style="color: #2dd4bf;">✉</span>
                        <a href="mailto:${ data.email }" style="color: #f1f5f9; text-decoration: none; font-weight: 500;">${ data.email }</a>
                      </td>
                      <td>
                        <span style="color: #2dd4bf;">📞</span>
                        <a href="tel:${ data.phone.replace( /\s+/g, '' ) }" style="color: #f1f5f9; text-decoration: none; font-weight: 500;">${ data.phone }</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-right: 14px;">
                        <span style="color: #2dd4bf;">💬</span>
                        <a href="https://wa.me/${ data.whatsappClean || '212699995754' }" target="_blank" style="color: #f1f5f9; text-decoration: none; font-weight: 500;">WhatsApp</a>
                      </td>
                      <td>
                        <span style="color: #2dd4bf;">in</span>
                        <a href="${ data.linkedinUrl }" target="_blank" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${ data.linkedin }</a>
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
                          ${ data.tagline || 'Build · Grow · Automate' }
                        </span>
                      </td>
                      <td valign="middle" align="right">
                        <a href="${ websiteUrl }" target="_blank" style="text-decoration: none;">
                          <img src="${ logoSrc }" alt="SkemaLab" width="135" style="display: block; width: 135px; height: auto;" />
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
function generateCompactCleanTemplate( data ) {
  data = sanitizeSignatureData( data );
  const avatarSrc = data.avatar;
  const websiteUrl = data.websiteUrl;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.35; color: #111827; border-collapse: collapse; max-width: 560px;">
  <tr>
    <td valign="middle" style="padding-right: 14px; width: 68px;">
      <img src="${ avatarSrc }" alt="${ data.name }" width="68" height="68" style="display: block; width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 2px solid #089587;" />
    </td>
    <td valign="middle" style="border-left: 2.5px solid #089587; padding-left: 14px;">
      <div style="font-size: 16px; font-weight: 800; color: #0b0f0e;">
        ${ data.name }
      </div>
      <div style="font-size: 11.5px; font-weight: 700; color: #089587; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px;">
        ${ data.role } • SkemaLab Agency
      </div>
      <div style="color: #4b5563; font-size: 11px;">
        <a href="mailto:${ data.email }" style="color: #111827; text-decoration: none; font-weight: 600;">${ data.email }</a> |
        <a href="tel:${ data.phone.replace( /\s+/g, '' ) }" style="color: #111827; text-decoration: none; font-weight: 600;">${ data.phone }</a> |
        <a href="${ websiteUrl }" target="_blank" style="color: #089587; text-decoration: none; font-weight: 700;">skemalab.com</a>
      </div>
      <div style="margin-top: 4px; font-size: 10.5px; font-weight: 800; color: #089587;">
        ${ data.tagline || 'Build · Grow · Automate' }
      </div>
    </td>
  </tr>
</table>`;
}

export const TEMPLATES = [
  {
    id: "executive",
    name: "Executive Prestige (CEO & Board)",
    description: "Signature de direction structurée, avec fond ivoire, palette SkemaLab, portrait et coordonnées professionnelles.",
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
