"use client";

import Image from "next/image";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
  RevealGroup,
  RevealItem,
  RevealNumeral,
  SettleImage,
} from "@/components/motion";

const STEPS = [
  {
    number: "01",
    title: "Enter your details",
    body: "Pop in your reg, mileage and postcode, and tell us what is wrong with it. It takes less than a minute.",
    tone: "active" as const,
  },
  {
    number: "02",
    title: "Get your offer",
    body: "We come back to you with a fair, no-obligation offer for your supercar, whatever condition it is in.",
    tone: "surface" as const,
  },
  {
    number: "03",
    title: "We collect and pay",
    body: "Happy with the offer? We arrange free collection anywhere in the UK and pay you the same day.",
    tone: "surface" as const,
  },
] as const;

const ACTIVE_STEP_CLASS =
  "border border-red-primary/40 bg-[linear-gradient(90deg,rgba(226,27,22,0.75),rgba(120,0,0,0.45))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_22px_40px_-24px_rgba(157,13,10,0.45)]";

const SURFACE_STEP_CLASS =
  "border border-border-primary bg-bg-surface text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

export default function HowItWorks() {
  return (
    <Section id="how-it-works" background="black">
      <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="flex min-w-0 flex-col">
          <SectionHeading
            align="left"
            theme="dark"
            eyebrow="SIMPLE PROCESS"
            title="Sell your supercar in three easy steps"
            intro="No auctions, no tyre-kickers, no waiting around. Tell us about the car, get an offer, we come to you."
          />

          <RevealGroup as="ol" className="mt-8 flex flex-col gap-2.5">
            {STEPS.map((step) => {
              const isActive = step.tone === "active";

              return (
                <RevealItem as="li" key={step.number}>
                  <div
                    className={`motion-card-hover relative h-full overflow-hidden rounded-md px-5 py-5 sm:px-6 sm:py-5 ${
                      isActive ? ACTIVE_STEP_CLASS : SURFACE_STEP_CLASS
                    }`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_-10%,rgba(255,255,255,0.12),transparent_48%)]"
                      />
                    ) : null}

                    <div className="relative flex items-center justify-between gap-5">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                          {step.title}
                        </h3>
                        <p
                          className={`mt-1.5 max-w-[38ch] text-sm leading-snug ${
                            isActive ? "text-white/80" : "text-text-secondary"
                          }`}
                        >
                          {step.body}
                        </p>
                      </div>
                      <RevealNumeral className="shrink-0 font-numeral text-[2.5rem] font-medium italic leading-none tracking-tight text-white/30 sm:text-[3.125rem]">
                        {step.number}
                      </RevealNumeral>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <SettleImage className="relative aspect-[16/10] rounded-md bg-bg-dark ring-1 ring-red-primary/20 lg:aspect-auto lg:h-full">
          <figure className="relative h-full w-full">
            <Image
              src="/Smashed_Aston.png"
              alt="Damaged Aston Martin with front-end collision damage — we buy every model, in any condition"
              fill
              sizes="(max-width: 1024px) 100vw, 580px"
              quality={90}
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/15 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Every model
              </p>
              <p className="mt-1 font-sans text-lg font-semibold tracking-tight text-white sm:text-xl">
                Running or not, we still want it.
              </p>
            </figcaption>
          </figure>
        </SettleImage>
      </div>
    </Section>
  );
}
