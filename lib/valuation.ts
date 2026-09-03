export const VALUATION_CONDITIONS = [
  "BRAND NEW",
  "GOOD CONDITION",
  "AGE RELATED MARKS",
  "BAD CONDITION",
  "MOT FAILURE",
  "NON-RUNNING",
  "CRASH DAMAGED",
] as const;

export type ValuationSubmission = {
  reg: string;
  mileage: string;
  postcode: string;
  make: string;
  model: string;
  condition: string;
  name: string;
  email: string;
  phone: string;
};

export type ValuationFieldErrors = Partial<
  Record<keyof ValuationSubmission, string>
>;

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function isUkPhone(value: string) {
  const digits = digitsOnly(value);
  if (digits.startsWith("44")) {
    return digits.length >= 11 && digits.length <= 13;
  }
  return digits.length >= 10 && digits.length <= 11;
}

export function parseValuationBody(body: unknown): ValuationSubmission | null {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const fields: (keyof ValuationSubmission)[] = [
    "reg",
    "mileage",
    "postcode",
    "make",
    "model",
    "condition",
    "name",
    "email",
    "phone",
  ];

  const parsed = {} as ValuationSubmission;

  for (const field of fields) {
    if (typeof record[field] !== "string") return null;
    parsed[field] = record[field].trim();
  }

  return parsed;
}

export function validateValuationSubmission(
  values: ValuationSubmission,
): ValuationFieldErrors {
  const errors: ValuationFieldErrors = {};

  const reg = values.reg.replace(/\s+/g, "");
  if (reg.length < 2) {
    errors.reg = "Enter the vehicle registration.";
  }

  if (!/^\d+$/.test(values.mileage)) {
    errors.mileage = "Enter the mileage as a number.";
  } else if (Number(values.mileage) > 999999) {
    errors.mileage = "Check the mileage and try again.";
  }

  if (!UK_POSTCODE.test(values.postcode.trim())) {
    errors.postcode = "Enter a valid UK postcode.";
  }

  if (values.make.trim().length < 2) {
    errors.make = "Enter the make.";
  }

  if (values.model.trim().length < 1) {
    errors.model = "Enter the model.";
  }

  if (
    !values.condition ||
    !(VALUATION_CONDITIONS as readonly string[]).includes(values.condition)
  ) {
    errors.condition = "Select the condition.";
  }

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }

  if (!EMAIL.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!isUkPhone(values.phone)) {
    errors.phone = "Enter a valid UK phone number.";
  }

  return errors;
}

export function normalizeValuationSubmission(
  values: ValuationSubmission,
): ValuationSubmission {
  return {
    reg: values.reg.replace(/\s+/g, "").toUpperCase(),
    mileage: digitsOnly(values.mileage),
    postcode: values.postcode.trim().toUpperCase(),
    make: values.make.trim(),
    model: values.model.trim(),
    condition: values.condition,
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
  };
}
