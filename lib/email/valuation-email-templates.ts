import { SITE_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/components/siteContact";
import type { ValuationSubmission } from "@/lib/valuation";

const BRAND = {
  green: "#0a3d2a",
  greenDark: "#04211a",
  jetBlack: "#0a0a0a",
  offWhite: "#f5f6f5",
  white: "#ffffff",
  ink: "#141414",
  slate: "#5b5b5b",
  greySecondary: "#66716f",
  greyBorder: "#dde3e1",
  plateYellow: "#ffd200",
  plateBlue: "#003399",
} as const;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://webuybrokensupercars.co.uk";

const FONT = "Arial,Helvetica,sans-serif";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function phoneTelHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("44")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+44${digits.slice(1)}`;
  return `tel:+${digits}`;
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(new Date());
}

function emailShell(title: string, body: string) {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${escapeHtml(title)}</title>
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <style>
      body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.offWhite};width:100%;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
      ${escapeHtml(title)}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${BRAND.offWhite}" style="background-color:${BRAND.offWhite};border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:16px 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:480px;border-collapse:collapse;">
            ${body}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

function sectionLabel(title: string) {
  return `
    <p style="margin:0 0 12px;font-family:${FONT};font-size:11px;font-weight:700;line-height:1.4;color:${BRAND.green};text-transform:uppercase;letter-spacing:0.18em;">
      ${escapeHtml(title)}
    </p>
  `;
}

function detailField(label: string, value: string, href?: string) {
  const safeValue = escapeHtml(value);
  const valueHtml = href
    ? `<a href="${href}" style="color:${BRAND.green};text-decoration:none;font-weight:700;">${safeValue}</a>`
    : safeValue;

  return `
    <tr>
      <td style="padding:0 0 14px 0;font-family:${FONT};">
        <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:${BRAND.greySecondary};text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">
          ${escapeHtml(label)}
        </p>
        <p style="margin:0;font-size:18px;line-height:1.35;font-weight:700;color:${BRAND.ink};word-break:break-word;">
          ${valueHtml}
        </p>
      </td>
    </tr>
  `;
}

function cardBlock(title: string, rows: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-bottom:16px;border:1px solid ${BRAND.greyBorder};background-color:${BRAND.white};">
      <tr>
        <td style="padding:16px 18px;font-family:${FONT};">
          ${sectionLabel(title)}
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            ${rows}
          </table>
        </td>
      </tr>
    </table>
  `;
}

function emailHeader() {
  return `
    <tr>
      <td bgcolor="${BRAND.jetBlack}" style="background-color:${BRAND.jetBlack};padding:18px 20px;border:2px solid ${BRAND.green};border-bottom:none;">
        <img
          src="${SITE_URL}/logo.webp"
          alt="We Buy Broken Supercars"
          width="200"
          height="120"
          style="display:block;width:200px;max-width:100%;height:auto;border:0;"
        />
      </td>
    </tr>
  `;
}

function emailHero(title: string, subtitle: string) {
  return `
    <tr>
      <td bgcolor="${BRAND.green}" style="background-color:${BRAND.green};padding:20px;border-left:2px solid ${BRAND.green};border-right:2px solid ${BRAND.green};">
        <p style="margin:0 0 6px;font-family:${FONT};font-size:11px;font-weight:700;line-height:1.4;color:#ffffff;text-transform:uppercase;letter-spacing:0.18em;opacity:0.85;">
          Valuation form
        </p>
        <h1 style="margin:0 0 8px;font-family:${FONT};font-size:24px;font-weight:700;line-height:1.15;color:#ffffff;text-transform:uppercase;">
          ${escapeHtml(title)}
        </h1>
        <p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.5;color:#ffffff;opacity:0.9;">
          ${escapeHtml(subtitle)}
        </p>
      </td>
    </tr>
  `;
}

function emailFooter(note: string) {
  return `
    <tr>
      <td bgcolor="${BRAND.greenDark}" style="background-color:${BRAND.greenDark};padding:18px 20px;border:2px solid ${BRAND.green};border-top:none;font-family:${FONT};">
        <p style="margin:0 0 6px;font-size:12px;line-height:1.6;color:#ffffff;opacity:0.85;">
          ${escapeHtml(note)}
        </p>
        <p style="margin:0;font-size:12px;line-height:1.6;color:#ffffff;opacity:0.65;">
          We Buy Broken Supercars · ${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}
        </p>
      </td>
    </tr>
  `;
}

function registrationPlate(reg: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border:2px solid #000000;background-color:${BRAND.plateYellow};">
      <tr>
        <td bgcolor="${BRAND.plateBlue}" width="34" style="background-color:${BRAND.plateBlue};padding:0 8px;text-align:center;vertical-align:middle;">
          <span style="display:block;font-family:${FONT};font-size:10px;font-weight:700;line-height:1;color:#ffffff;">GB</span>
        </td>
        <td style="padding:10px 16px;text-align:center;">
          <span style="display:block;font-family:${FONT};font-size:26px;font-weight:700;line-height:1;color:#000000;letter-spacing:0.12em;text-transform:uppercase;">
            ${escapeHtml(reg)}
          </span>
        </td>
      </tr>
    </table>
  `;
}

function conditionBadge(condition: string) {
  return `
    <span style="display:inline-block;padding:8px 14px;background-color:${BRAND.offWhite};border:1px solid ${BRAND.greyBorder};font-family:${FONT};font-size:14px;font-weight:700;line-height:1.3;color:${BRAND.green};text-transform:uppercase;">
      ${escapeHtml(condition)}
    </span>
  `;
}

function actionButton(label: string, href: string, primary: boolean) {
  const bg = primary ? BRAND.green : BRAND.white;
  const color = primary ? "#ffffff" : BRAND.green;
  const border = primary ? BRAND.green : BRAND.green;

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-bottom:12px;">
      <tr>
        <td align="center" bgcolor="${bg}" style="background-color:${bg};border:2px solid ${border};">
          <a href="${href}" style="display:block;padding:16px 20px;font-family:${FONT};font-size:14px;font-weight:700;line-height:1.2;color:${color};text-decoration:none;text-transform:uppercase;letter-spacing:0.08em;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function buildLeadEmailHtml(values: ValuationSubmission) {
  const submittedAt = formatSubmittedAt();
  const telHref = phoneTelHref(values.phone);
  const mailtoHref = `mailto:${encodeURIComponent(values.email)}?subject=${encodeURIComponent(`Re: Your supercar valuation (${values.reg})`)}`;

  const vehicleRows = [
    detailField("Registration", values.reg),
    detailField("Mileage", `${values.mileage} miles`),
    detailField("Postcode", values.postcode),
    detailField("Make", values.make),
    detailField("Model", values.model),
    detailField("Condition", values.condition),
  ].join("");

  const contactRows = [
    detailField("Name", values.name),
    detailField("Email", values.email, `mailto:${values.email}`),
    detailField("Phone", values.phone, telHref),
  ].join("");

  const body = `
    ${emailHeader()}
    ${emailHero(
      "New valuation request",
      `Submitted ${submittedAt} via webuybrokensupercars.co.uk`,
    )}
    <tr>
      <td bgcolor="${BRAND.white}" style="background-color:${BRAND.white};padding:20px 18px;border-left:2px solid ${BRAND.green};border-right:2px solid ${BRAND.green};font-family:${FONT};">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td align="center" style="padding-bottom:18px;">
              ${registrationPlate(values.reg)}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="margin:0 0 4px;font-size:20px;font-weight:700;line-height:1.2;color:${BRAND.green};text-transform:uppercase;">
                ${escapeHtml(values.make)} ${escapeHtml(values.model)}
              </p>
              <p style="margin:0;font-size:14px;line-height:1.5;color:${BRAND.greySecondary};">
                ${escapeHtml(values.mileage)} miles · ${escapeHtml(values.postcode)}
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-bottom:16px;border:1px solid ${BRAND.greyBorder};background-color:${BRAND.offWhite};">
          <tr>
            <td style="padding:16px 18px;">
              ${sectionLabel("Vehicle condition")}
              ${conditionBadge(values.condition)}
            </td>
          </tr>
        </table>

        ${cardBlock("Vehicle details", vehicleRows)}
        ${cardBlock("Contact details", contactRows)}

        ${actionButton("Reply to customer", mailtoHref, true)}
        ${actionButton("Call customer", telHref, false)}

        <p style="margin:4px 0 0;font-size:12px;line-height:1.6;color:${BRAND.greySecondary};text-align:center;">
          Reply directly to this email to reach ${escapeHtml(values.name)}.
        </p>
      </td>
    </tr>
    ${emailFooter("This notification was generated from the website valuation form.")}
  `;

  return emailShell(`New valuation: ${values.reg}`, body);
}

export function buildConfirmationEmailHtml(values: ValuationSubmission) {
  const submissionRows = [
    detailField("Registration", values.reg),
    detailField("Mileage", `${values.mileage} miles`),
    detailField("Postcode", values.postcode),
    detailField("Condition", values.condition),
  ].join("");

  const body = `
    ${emailHeader()}
    ${emailHero(
      "We have your details",
      "Thanks for requesting a valuation with We Buy Broken Supercars.",
    )}
    <tr>
      <td bgcolor="${BRAND.white}" style="background-color:${BRAND.white};padding:20px 18px;border-left:2px solid ${BRAND.green};border-right:2px solid ${BRAND.green};font-family:${FONT};">
        <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:${BRAND.ink};">
          Hi ${escapeHtml(values.name)},
        </p>
        <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:${BRAND.slate};">
          We have received your valuation request for your
          <strong style="color:${BRAND.green};">${escapeHtml(values.make)} ${escapeHtml(values.model)}</strong>.
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-bottom:18px;">
          <tr>
            <td align="center">
              ${registrationPlate(values.reg)}
            </td>
          </tr>
        </table>

        ${cardBlock("Your submission", submissionRows)}

        <p style="margin:0;font-size:16px;line-height:1.6;color:${BRAND.slate};">
          Our team will review your details and be in touch shortly with a no-obligation offer.
          Free nationwide collection and same-day payment when you accept.
        </p>

        <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:${BRAND.greySecondary};">
          Questions? Call
          <a href="${SITE_PHONE_TEL}" style="color:${BRAND.green};text-decoration:none;font-weight:700;">${escapeHtml(SITE_PHONE_DISPLAY)}</a>
          or email
          <a href="mailto:${SITE_EMAIL}" style="color:${BRAND.green};text-decoration:none;font-weight:700;">${escapeHtml(SITE_EMAIL)}</a>.
        </p>
      </td>
    </tr>
    ${emailFooter("No obligation. Free collection. Payment same day.")}
  `;

  return emailShell("We received your supercar valuation request", body);
}
