"use client";

import ValuationForm from "./ValuationForm";
import { Reveal, RevealGroup, RevealItem } from "./motion";

type CTAbandProps = {
  id?: string;
};

export default function CTAband({ id }: CTAbandProps) {
  return (
    <section
      id={id}
      className={`cta-banner-section py-20 md:py-28 ${id ? "scroll-mt-28" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <RevealGroup>
          <RevealItem>
            <h2 className="font-sans text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              Get your free Jaguar valuation today
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              It takes less than a minute. No obligation, no fees, no hassle.
            </p>
          </RevealItem>
        </RevealGroup>
        <Reveal className="mt-10">
          <ValuationForm />
        </Reveal>
      </div>
    </section>
  );
}
