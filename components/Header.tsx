"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { HEADER_LINKS } from "./navLinks";

function QuotePromiseBadge() {
  return (
    <p className="min-w-0 rounded-md border-2 border-white bg-[#e30613] px-3.5 py-2.5 text-center text-[13px] font-extrabold uppercase leading-[1.15] tracking-wide text-white sm:px-4 sm:py-3 sm:text-sm md:hidden">
      We Will Beat Any
      <br />
      Genuine Quote
    </p>
  );
}

function isNavLinkActive(pathname: string, href: string) {
  const [path] = href.split("#");
  if (path === "/") {
    return pathname === "/";
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

function navLinkClassName(isActive: boolean, layout: "desktop" | "mobile") {
  const base =
    layout === "desktop"
      ? "text-sm font-medium"
      : "block py-2.5 text-sm font-medium";

  return `${base} transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-primary ${
    isActive
      ? "text-red-primary"
      : "text-[#D2D2D2] hover:text-white"
  }`;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#171717] bg-[#050505] py-3 md:py-5">
      <Container>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            aria-label="We Buy Broken Supercars — home"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-primary"
          >
            <Image
              src="/logo.webp"
              alt="We Buy Broken Supercars"
              width={1000}
              height={500}
              priority
              className="h-14 w-auto sm:h-16 md:h-20"
            />
          </Link>

          <div className="flex min-w-0 flex-1 justify-center md:hidden">
            <QuotePromiseBadge />
          </div>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 justify-end md:flex"
          >
            <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
              {HEADER_LINKS.map((link) => {
                const isActive = isNavLinkActive(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={navLinkClassName(isActive, "desktop")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-[#D2D2D2] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-primary md:hidden"
          >
            {open ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {open ? (
          <nav
            id="site-nav"
            aria-label="Primary"
            className="mt-5 border-t border-[#171717] pt-3 md:hidden"
          >
            <ul className="flex flex-col">
              {HEADER_LINKS.map((link) => {
                const isActive = isNavLinkActive(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={navLinkClassName(isActive, "mobile")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
