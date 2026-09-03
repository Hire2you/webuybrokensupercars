"use client";

import type { ReactNode } from "react";
import Container from "@/components/Container";
import ValuationForm from "@/components/ValuationForm";
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/components/siteContact";
import CarShowcase from "./CarShowcase";
import HeroRoad from "./HeroRoad";
import { HeroEntrance, RevealGroup, RevealItem } from "@/components/motion";

function CallNowBar() {
  const compactNumber = SITE_PHONE_DISPLAY.replace(/\s/g, "");

  return (
    <a
      href={`tel:${SITE_PHONE_TEL}`}
      className="motion-btn-primary flex w-full items-center justify-between gap-2 rounded-sm bg-red-primary px-3 py-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plate-yellow md:hidden"
    >
      <span aria-hidden="true" className="phone-tilt-left">
        <span className="phone-shake text-4xl leading-none">☎️</span>
      </span>
      <span className="min-w-0 text-center text-base font-bold uppercase tracking-[0.06em] underline sm:text-lg">
        Call now: {compactNumber}
      </span>
      <span aria-hidden="true" className="phone-tilt-right">
        <span className="phone-shake phone-shake-delayed text-4xl leading-none">
          ☎️
        </span>
      </span>
    </a>
  );
}

type HeroProps = {
  children?: ReactNode;
};

export default function Hero({ children }: HeroProps) {
  return (
    <section
      id="valuation"
      className="hero-section relative overflow-hidden scroll-mt-28 bg-bg-dark"
    >
      <HeroRoad />

      <Container>
        <div className="relative z-10 pb-4 pt-5 sm:pb-6 sm:pt-8 lg:pt-12">
          <CallNowBar />

          <RevealGroup
            trigger="mount"
            className="relative mx-auto mt-6 max-w-3xl text-center md:mt-0"
          >
            <RevealItem>
              <h1 className="font-sans text-4xl font-extrabold uppercase leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[clamp(3rem,5vw,4.625rem)]">
                <span className="text-text-primary">Sell Your Broken</span>{" "}
                <span className="text-red-primary">Jaguar Today</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:mt-5 sm:text-lg">
                Running or non-running. Engine faults, gearbox problems and
                accident damage accepted.
              </p>
            </RevealItem>
          </RevealGroup>

          <HeroEntrance
            variant="scale-in"
            delay={0.2}
            className="relative mt-8 sm:mt-10"
          >
            {children ?? <ValuationForm />}
          </HeroEntrance>

          <HeroEntrance variant="car-rise" delay={0.35}>
            <CarShowcase />
          </HeroEntrance>
        </div>
      </Container>
    </section>
  );
}
