import {
  SITE_EMAIL,
  SITE_OPENING_HOURS,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/components/siteContact";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://webuybrokenjaguars.com";

export const SITE_NAME = "We Buy Broken Jaguars";

export const SITE_TAGLINE = "Sell Your Broken Jaguar Today";

export const SITE_DESCRIPTION =
  "We buy broken, non-running and damaged Jaguar cars across the UK. Engine faults, gearbox problems and accident damage accepted. Free nationwide collection, same-day payment, no obligation.";

export const SITE_OG_IMAGE = "/jaguar-hero.webp";

export const SITE_CONTACT = {
  phoneDisplay: SITE_PHONE_DISPLAY,
  phoneTel: SITE_PHONE_TEL,
  email: SITE_EMAIL,
  openingHours: SITE_OPENING_HOURS,
  areaServed: "Mainland United Kingdom",
} as const;
