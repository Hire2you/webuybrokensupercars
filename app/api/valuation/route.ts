import { sendValuationEmails } from "@/lib/email/send-valuation";
import {
  normalizeValuationSubmission,
  parseValuationBody,
  validateValuationSubmission,
} from "@/lib/valuation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseValuationBody(body);

    if (!parsed) {
      return Response.json(
        { ok: false, error: "Invalid submission payload." },
        { status: 400 },
      );
    }

    const fieldErrors = validateValuationSubmission(parsed);
    if (Object.keys(fieldErrors).length > 0) {
      return Response.json(
        {
          ok: false,
          error: "Please check the form and try again.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    const values = normalizeValuationSubmission(parsed);
    await sendValuationEmails(values);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Valuation submission failed:", error);

    const message =
      error instanceof Error ? error.message : "Unable to send valuation.";

    if (message.includes("RESEND_API_KEY")) {
      return Response.json(
        { ok: false, error: "Email service is not configured." },
        { status: 503 },
      );
    }

    if (message.includes("domain is not verified")) {
      return Response.json(
        {
          ok: false,
          error:
            "Our email system is still being set up. Please call us and we will help with your valuation.",
        },
        { status: 503 },
      );
    }

    return Response.json(
      { ok: false, error: "Unable to send your valuation. Please try again." },
      { status: 500 },
    );
  }
}
