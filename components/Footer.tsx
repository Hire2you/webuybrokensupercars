import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "./navLinks";
import { COUNTIES, getCountyPath } from "@/lib/locations";
import {
  SITE_EMAIL,
  SITE_OPENING_HOURS,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "./siteContact";

const footerLinkClassName =
  "text-sm text-[#8E8E8E] transition-colors hover:text-red-primary";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-28 border-t border-[#181818] bg-bg-dark"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo.webp"
            alt="We Buy Broken Supercars"
            width={2000}
            height={1200}
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
            The UK&apos;s specialist buyer of broken, damaged and non-running
            supercars.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary">
            Quick links
          </h2>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClassName}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[#8E8E8E]">
            <li>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="transition-colors hover:text-red-primary"
              >
                {SITE_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="transition-colors hover:text-red-primary"
              >
                {SITE_EMAIL}
              </a>
            </li>
            <li>{SITE_OPENING_HOURS}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary">
            Coverage
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#8E8E8E]">
            Buying supercars across mainland UK.
          </p>
          <ul className="mt-4 space-y-2">
            {COUNTIES.map((county) => (
              <li key={county.slug}>
                <Link
                  href={getCountyPath(county)}
                  className={footerLinkClassName}
                >
                  {county.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#181818]">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs leading-relaxed text-text-muted">
          <p>© 2026 We Buy Broken Supercars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
