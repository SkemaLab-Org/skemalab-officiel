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
    shortRole: "Fondateur & CEO",
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
    shortRole: "CTO & Systèmes",
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
    avatar: "https://www.skemalab.com/team/marouan_khadiri.webp",
    localAvatar: "/team/marouan_khadiri.webp",
    address: "Essaouira, Maroc",
  },
  {
    id: "adam-khairi",
    name: "Adam Khairi",
    shortRole: "Lead Engineer & IA",
    role: "Lead Software Engineer",
    department: "Développement Full-Stack, Mobile & Solutions IA",
    email: "contact@skemalab.com",
    phone: "+212 6 99 99 57 54",
    whatsapp: "+212 6 99 99 57 54",
    whatsappClean: "212699995754",
    website: "www.skemalab.com",
    websiteUrl: "https://www.skemalab.com",
    linkedin: "adam-khairi",
    linkedinUrl: "https://www.linkedin.com/in/adam-khairi/",
    github: "github.com/adamkhairi",
    githubUrl: "https://github.com/adamkhairi",
    tagline: "Build · Grow · Automate",
    avatar: "https://www.skemalab.com/team/adam-khairi.jpg",
    localAvatar: "/team/adam-khairi.jpg",
    address: "Essaouira, Maroc",
  },
];

export const BRAND_CONFIG = {
  logoUrl: "https://i.imgur.com/10bcsyJ.png",
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
  const raw = String( value ?? "" ).trim();

  // Root-relative paths are used by the on-page preview so local assets render
  // before deployment. They can never leave the current origin.
  if ( raw.startsWith( "/" ) && !raw.startsWith( "//" ) ) {
    return escapeHtml( raw );
  }

  try {
    const url = new URL( raw );
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
    githubUrl: data.githubUrl ? safeHttpUrl( data.githubUrl, "" ) : "",
    whatsappClean: String( data.whatsappClean ?? "" ).replace( /\D/g, "" ),
  };
}

const FONT_SANS = "Arial, Helvetica, sans-serif";
const FONT_SERIF = "Georgia, 'Times New Roman', Times, serif";

function phoneHref( value ) {
  return String( value ?? "" ).replace( /[^\d+]/g, "" );
}

/**
 * Builds the labelled contact list shared by the editorial templates.
 * Each entry is dropped entirely when its field is missing, so no empty
 * label, stray separator or blank row can reach the output.
 */
function buildContactItems( data, palette ) {
  const linkStyle = `color: ${ palette.link }; text-decoration: none;`;
  const items = [];

  if ( data.email ) {
    items.push( {
      label: "Email",
      html: `<a href="mailto:${ data.email }" style="${ linkStyle }">${ data.email }</a>`,
    } );
  }

  if ( data.phone ) {
    items.push( {
      label: "Tél",
      html: `<a href="tel:${ phoneHref( data.phone ) }" style="${ linkStyle } white-space: nowrap;">${ data.phone }</a>`,
    } );
  }

  if ( data.website ) {
    items.push( {
      label: "Web",
      html: `<a href="${ data.websiteUrl }" target="_blank" style="color: ${ palette.strong }; text-decoration: none; font-weight: 700;">${ data.website }</a>`,
    } );
  }

  if ( data.linkedin ) {
    items.push( {
      label: "LinkedIn",
      html: `<a href="${ data.linkedinUrl }" target="_blank" style="${ linkStyle }">${ data.linkedin }</a>`,
    } );
  }

  if ( data.github && data.githubUrl ) {
    items.push( {
      label: "GitHub",
      html: `<a href="${ data.githubUrl }" target="_blank" style="${ linkStyle }">${ data.github }</a>`,
    } );
  }

  if ( data.address ) {
    items.push( {
      label: "Adresse",
      html: `<span style="color: ${ palette.muted };">${ data.address }</span>`,
    } );
  }

  return items;
}

/**
 * Two-column contact grid: a fixed-width micro-label column followed by its
 * value, so every entry fits on a single line (up to three rows). A lone
 * trailing entry spans the remaining columns instead of leaving a gap.
 */
function renderContactGrid( items, palette ) {
  if ( !items.length ) {
    return "";
  }

  const rows = [];

  for ( let index = 0; index < items.length; index += 2 ) {
    const left = items[ index ];
    const right = items[ index + 1 ];
    const gap = index + 2 >= items.length ? "0" : "3px";

    const label = ( item ) => `<td valign="top" width="60" style="width: 60px; padding: 0 8px ${ gap } 0; font-family: ${ FONT_SANS }; font-size: 8.5px; line-height: 15px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; color: ${ palette.label }; white-space: nowrap; mso-line-height-rule: exactly;">${ item.label }</td>`;

    const value = ( item, rightPadding, attributes = "" ) => `<td valign="top"${ attributes } style="padding: 0 ${ rightPadding } ${ gap } 0; font-family: ${ FONT_SANS }; font-size: 11.5px; line-height: 15px; color: ${ palette.value }; mso-line-height-rule: exactly;">${ item.html }</td>`;

    if ( right ) {
      rows.push( `<tr>
                ${ label( left ) }${ value( left, "18px" ) }${ label( right ) }${ value( right, "0" ) }
              </tr>` );
    } else {
      rows.push( `<tr>
                ${ label( left ) }${ value( left, "0", ' colspan="3"' ) }
              </tr>` );
    }
  }

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
              ${ rows.join( "\n              " ) }
            </table>`;
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
                    ` : "" }${ data.github && data.githubUrl ? `
                    <tr>
                      <td colspan="2" style="padding: 4px 0 0; color: #52645F;">
                        <span aria-hidden="true" style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; color: #0D655C; background-color: #E8F1EE; border: 1px solid #DCD5C7;">&#9670;</span>
                        <a href="${ data.githubUrl }" target="_blank" style="padding-left: 6px; color: #263B37; text-decoration: none;">${ data.github }</a>
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
 * Template 2: Consulting Editorial (letterhead, not a card)
 * Compact white canvas: serif name, hairline rule with an inline brand
 * segment, single-line labelled contact grid, quiet letterspaced tagline.
 */
function generateModernStudioTemplate( data ) {
  data = sanitizeSignatureData( data );
  const avatarSrc = data.avatar;
  const logoSrc = BRAND_CONFIG.logoUrl;
  const websiteUrl = data.websiteUrl;
  const palette = {
    label: "#089587",
    value: "#1B2B28",
    link: "#1B2B28",
    strong: "#089587",
    muted: "#5A6B67",
  };
  const contacts = buildContactItems( data, palette );

  return `<table cellpadding="0" cellspacing="0" border="0" width="600" bgcolor="#FFFFFF" style="width: 100%; max-width: 600px; background-color: #FFFFFF; border-collapse: collapse; font-family: ${ FONT_SANS }; font-size: 13px; line-height: 1.5; color: #1B2B28; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  <tr>
    <td style="padding: 15px 22px 14px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td valign="top" width="70" style="width: 70px; padding: 0 16px 0 0;">
            <img src="${ avatarSrc }" alt="${ data.name }" width="50" height="50" style="display: block; width: 50px; height: 50px; max-width: none; border: 2px solid #089587; object-fit: cover;" />
          </td>
          <td valign="top" style="padding: 0;">
            <div style="font-family: ${ FONT_SERIF }; font-size: 19px; line-height: 22px; font-weight: 700; color: #0F2E2A; mso-line-height-rule: exactly;">${ data.name }</div>
            <div style="padding-top: 3px; font-family: ${ FONT_SANS }; font-size: 10.5px; line-height: 13px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: #089587; mso-line-height-rule: exactly;">${ data.role }</div>
            ${ data.department ? `<div style="padding-top: 2px; font-family: ${ FONT_SANS }; font-size: 11px; line-height: 14px; color: #5A6B67; mso-line-height-rule: exactly;">${ data.department }</div>` : "" }
          </td>
          <td valign="top" width="84" align="right" style="width: 84px; padding: 5px 0 0;">
            <a href="${ websiteUrl }" target="_blank" style="text-decoration: none;">
              <img src="${ logoSrc }" alt="SkemaLab" width="84" height="23" style="display: block; width: 84px; height: 23px; border: 0;" />
            </a>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 11px 0 0; font-size: 0; line-height: 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td width="56" height="1" bgcolor="#089587" style="width: 56px; height: 1px; background-color: #089587; font-size: 1px; line-height: 1px;">&nbsp;</td>
                <td height="1" bgcolor="#DCD5C7" style="height: 1px; background-color: #DCD5C7; font-size: 1px; line-height: 1px;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        ${ contacts.length ? `<tr>
          <td colspan="3" style="padding: 9px 0 0;">
            ${ renderContactGrid( contacts, palette ) }
          </td>
        </tr>` : "" }
        ${ data.tagline ? `<tr>
          <td colspan="3" style="padding: 9px 0 0; font-family: ${ FONT_SANS }; font-size: 9.5px; line-height: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #7A8884; mso-line-height-rule: exactly;">${ data.tagline }</td>
        </tr>` : "" }
      </table>
    </td>
  </tr>
</table>`;
}

// Dark templates use the light logo asset (/logo2.png); light templates use BRAND_CONFIG.logoUrl.
const DARK_LOGO_URL = "https://www.skemalab.com/logo2.png";

/**
 * Template 3: Midnight Ink
 * Deep ink canvas, hairline frame, teal micro-labels and a tagline on its own
 * row — no glow, no chip, no text wordmark.
 */
function generateDarkExecutiveTemplate( data ) {
  data = sanitizeSignatureData( data );
  const avatarSrc = data.avatar;
  const websiteUrl = data.websiteUrl;
  const palette = {
    label: "#46AC9E",
    value: "#E6F2EF",
    link: "#E6F2EF",
    strong: "#FFFFFF",
    muted: "#8CA6A0",
  };
  const contacts = buildContactItems( data, palette );

  return `<table cellpadding="0" cellspacing="0" border="0" width="600" bgcolor="#0B1F1C" style="width: 100%; max-width: 600px; background-color: #0B1F1C; border: 1px solid #1F3D38; border-collapse: collapse; font-family: ${ FONT_SANS }; font-size: 13px; line-height: 1.5; color: #E6F2EF; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  <tr>
    <td style="padding: 15px 22px 14px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td valign="top" width="70" style="width: 70px; padding: 0 16px 0 0;">
            <img src="${ avatarSrc }" alt="${ data.name }" width="50" height="50" style="display: block; width: 50px; height: 50px; max-width: none; border: 2px solid #089587; border-radius: 50%; object-fit: cover;" />
          </td>
          <td valign="top" style="padding: 0;">
            <div style="font-family: ${ FONT_SERIF }; font-size: 19px; line-height: 22px; font-weight: 700; color: #F4FAF8; mso-line-height-rule: exactly;">${ data.name }</div>
            <div style="padding-top: 3px; font-family: ${ FONT_SANS }; font-size: 10.5px; line-height: 13px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: #46AC9E; mso-line-height-rule: exactly;">${ data.role }</div>
            ${ data.department ? `<div style="padding-top: 2px; font-family: ${ FONT_SANS }; font-size: 11px; line-height: 14px; color: #8CA6A0; mso-line-height-rule: exactly;">${ data.department }</div>` : "" }
          </td>
          <td valign="top" width="96" align="right" style="width: 96px; padding: 0;">
            <a href="${ websiteUrl }" target="_blank" style="text-decoration: none;">
              <img src="${ DARK_LOGO_URL }" alt="SkemaLab" width="96" height="26" style="display: block; width: 96px; height: 26px; border: 0;" />
            </a>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 11px 0 0; font-size: 0; line-height: 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td width="56" height="1" bgcolor="#089587" style="width: 56px; height: 1px; background-color: #089587; font-size: 1px; line-height: 1px;">&nbsp;</td>
                <td height="1" bgcolor="#1F3D38" style="height: 1px; background-color: #1F3D38; font-size: 1px; line-height: 1px;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        ${ contacts.length ? `<tr>
          <td colspan="3" style="padding: 8px 0 0;">
            ${ renderContactGrid( contacts, palette ) }
          </td>
        </tr>` : "" }
        ${ data.tagline ? `<tr>
          <td colspan="3" style="padding: 8px 0 0; font-size: 0; line-height: 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td colspan="2" height="1" bgcolor="#1F3D38" style="height: 1px; background-color: #1F3D38; font-size: 1px; line-height: 1px;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 5px 0 0; font-family: ${ FONT_SANS }; font-size: 9.5px; line-height: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #7E9A94; mso-line-height-rule: exactly;">${ data.tagline }</td>
        </tr>` : "" }
      </table>
    </td>
  </tr>
</table>`;
}

/**
 * Template 4: Minimal Card
 * Portrait + vertical brand rule, three lines of text, one middot-separated
 * contact line, small-caps tagline. No border, no shadow. The card keeps an
 * explicit white canvas so its dark text stays legible on dark surfaces
 * (dark-mode inboxes) instead of inheriting the background behind it.
 */
function generateCompactCleanTemplate( data ) {
  data = sanitizeSignatureData( data );
  const avatarSrc = data.avatar;
  const websiteUrl = data.websiteUrl;

  const contactParts = [];

  if ( data.email ) {
    contactParts.push( `<a href="mailto:${ data.email }" style="color: #1B2B28; text-decoration: none;">${ data.email }</a>` );
  }

  if ( data.phone ) {
    contactParts.push( `<a href="tel:${ phoneHref( data.phone ) }" style="color: #1B2B28; text-decoration: none; white-space: nowrap;">${ data.phone }</a>` );
  }

  if ( data.website ) {
    contactParts.push( `<a href="${ websiteUrl }" target="_blank" style="color: #089587; text-decoration: none; font-weight: 700;">${ data.website }</a>` );
  }

  if ( data.github && data.githubUrl ) {
    contactParts.push( `<a href="${ data.githubUrl }" target="_blank" style="color: #1B2B28; text-decoration: none;">${ data.github }</a>` );
  }

  return `<table cellpadding="0" cellspacing="0" border="0" width="600" bgcolor="#FFFFFF" style="width: 100%; max-width: 600px; background-color: #FFFFFF; border-collapse: collapse; font-family: ${ FONT_SANS }; font-size: 12px; line-height: 1.45; color: #1B2B28; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  <tr>
    <td valign="middle" width="76" style="width: 76px; padding: 12px 16px 12px 14px;">
      <img src="${ avatarSrc }" alt="${ data.name }" width="56" height="56" style="display: block; width: 56px; height: 56px; max-width: none; border: 2px solid #089587; border-radius: 50%; object-fit: cover;" />
    </td>
    <td valign="middle" style="border-left: 2px solid #089587; padding: 12px 0 12px 16px;">
      <div style="font-family: ${ FONT_SANS }; font-size: 17px; line-height: 21px; font-weight: 700; color: #0F2E2A; mso-line-height-rule: exactly;">${ data.name }</div>
      <div style="padding-top: 3px; font-family: ${ FONT_SANS }; font-size: 10.5px; line-height: 14px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: #089587; mso-line-height-rule: exactly;">${ data.role }</div>
      ${ contactParts.length ? `<div style="padding-top: 6px; font-family: ${ FONT_SANS }; font-size: 11px; line-height: 16px; color: #1B2B28; mso-line-height-rule: exactly;">${ contactParts.join( ` <span style="color: #BFCAC6; padding: 0 2px;">&middot;</span>&nbsp;` ) }</div>` : "" }
      ${ data.tagline ? `<div style="padding-top: 5px; font-family: ${ FONT_SANS }; font-size: 9.5px; line-height: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #8A9691; mso-line-height-rule: exactly;">${ data.tagline }</div>` : "" }
    </td>
    <td valign="middle" width="84" align="right" style="width: 84px; padding: 12px 14px 12px 14px;">
      <a href="${ websiteUrl }" target="_blank" style="text-decoration: none;">
        <img src="${ BRAND_CONFIG.logoUrl }" alt="SkemaLab" width="76" height="21" style="display: block; width: 76px; height: 21px; border: 0;" />
      </a>
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
    name: "Consulting Editorial",
    description: "Mise en page de lettre de cabinet : portrait discret, nom de marque à droite, filet d'accent et coordonnées étiquetées sur deux colonnes.",
    badge: "Corporate",
    generator: generateModernStudioTemplate,
  },
  {
    id: "dark-executive",
    name: "Midnight Ink",
    description: "Fond encre profonde, filets fins et libellés turquoise. Nom de marque en lettres espacées, sans visuel coloré sur fond sombre.",
    badge: "Dark",
    generator: generateDarkExecutiveTemplate,
  },
  {
    id: "compact-clean",
    name: "Minimal Card",
    description: "Version la plus courte : portrait 56 px, filet vertical de marque, une ligne de coordonnées séparées par des points médians.",
    badge: "Minimal",
    generator: generateCompactCleanTemplate,
  },
];
