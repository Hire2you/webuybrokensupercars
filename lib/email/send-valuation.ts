import { Resend } from "resend";
import { SITE_EMAIL } from "@/components/siteContact";
import {
  buildConfirmationEmailHtml,
  buildLeadEmailHtml,
} from "@/lib/email/valuation-email-templates";
import type { ValuationSubmission } from "@/lib/valuation";

const VERIFIED_SEND_DOMAIN = "webuybrokenjaguars.com";
const DEFAULT_FROM =
  "We Buy Broken Jaguars <valuations@webuybrokenjaguars.com>";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(apiKey);
}

function extractEmailAddress(from: string) {
  const match = from.match(/<([^>]+)>/);
  return (match?.[1] ?? from).trim();
}

function getFromAddress() {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();

  if (!configured) {
    return DEFAULT_FROM;
  }

  const email = extractEmailAddress(configured).toLowerCase();
  const domain = email.split("@")[1];

  if (domain !== VERIFIED_SEND_DOMAIN) {
    console.warn(
      `RESEND_FROM_EMAIL uses "${email}" but only @${VERIFIED_SEND_DOMAIN} is verified. Using default sender.`,
    );
    return DEFAULT_FROM;
  }

  return configured;
}

function getLeadRecipients(): string[] {
  const configured = process.env.RESEND_TO_EMAIL?.trim();
  const primary = configured
    ? extractEmailAddress(configured).toLowerCase()
    : SITE_EMAIL;
  const recipients = [primary];

  const backup = process.env.RESEND_BACKUP_TO_EMAIL?.trim();
  if (backup) {
    const backupEmail = extractEmailAddress(backup).toLowerCase();
    if (!recipients.includes(backupEmail)) {
      recipients.push(backupEmail);
    }
  }

  return recipients;
}

function getLeadReplyToAddress() {
  return SITE_EMAIL;
}

export async function sendValuationEmails(values: ValuationSubmission) {
  const resend = getResendClient();
  const from = getFromAddress();
  const leadRecipients = getLeadRecipients();
  const leadReplyTo = getLeadReplyToAddress();

  const leadResult = await resend.emails.send({
    from,
    to: leadRecipients,
    replyTo: values.email,
    subject: `New valuation: ${values.reg} — ${values.make} ${values.model}`,
    html: buildLeadEmailHtml(values),
  });

  if (leadResult.error) {
    throw new Error(leadResult.error.message);
  }

  const confirmationResult = await resend.emails.send({
    from,
    to: values.email,
    replyTo: leadReplyTo,
    subject: "We received your Jaguar valuation request",
    html: buildConfirmationEmailHtml(values),
  });

  if (confirmationResult.error) {
    console.error(
      "Valuation confirmation email failed:",
      confirmationResult.error.message,
    );
  }

  return {
    leadId: leadResult.data?.id,
    confirmationId: confirmationResult.data?.id ?? null,
  };
}
